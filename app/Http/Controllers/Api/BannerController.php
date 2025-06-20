<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Banner;
use Illuminate\Support\Facades\Log;

class BannerController extends Controller
{
    public function index()
    {
        try {
            $banners = Banner::all()->map(function ($item) {
                $item->image = $item->image ?? null;
                return $item;
            });
            Log::info('Banner data:', $banners->toArray()); // Debugging
            return response()->json($banners);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}