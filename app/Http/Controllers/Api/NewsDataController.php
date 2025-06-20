<?php


namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;

class NewsDataController extends Controller
{
    protected $apiKey;
    protected $baseUrl = 'https://newsdata.io/api/1/news';

    public function __construct()
    {
        $this->apiKey = env('NEWSDATA_API_KEY');
    }

    public function getNews(Request $request)
    {
        try {
            $response = Http::get($this->baseUrl, [
                'apikey' => $this->apiKey,
                'language' => 'id',
                'country' => 'id',
                'category' => $request->category ?? null,
                'q' => $request->search ?? null,
            ]);

            if ($response->successful()) {
                $data = $response->json();
                $results = $data['results'] ?? [];
                // Normalisasi field gambar
                $results = array_map(function($item) {
                    $item['thumbnail'] = $item['image_url'] ?? null;
                    return $item;
                }, $results);
                return response()->json($results);
            }

            return response()->json([
                'error' => 'Failed to fetch news from NewsData.io'
            ], 500);
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage()
            ], 500);
        }
    }
}