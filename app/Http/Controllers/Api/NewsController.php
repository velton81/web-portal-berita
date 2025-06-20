<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\News;
use Illuminate\Http\Request;

class NewsController extends Controller
{
    public function index(Request $request)
    {
        try {
            $query = News::with(['newsCategory', 'author'])
                        ->where('is_published', true);

            if ($request->has('category')) {
                $query->whereHas('newsCategory', function($q) use ($request) {
                    $q->where('slug', $request->category);
                });
            }

            if ($request->has('page') && $request->page !== 'all') {
                $query->where('page', $request->page);
            }

            $news = $query->latest()->get();

            return response()->json($news->map(function ($item) {
                return [
                    'id' => $item->id,
                    'title' => $item->title,
                    'slug' => $item->slug,
                    'content' => $item->content,
                    'thumbnail' => $item->thumbnail,
                    'image' => $item->image,
                    'category' => [
                        'id' => $item->newsCategory?->id,
                        'name' => $item->newsCategory?->title,
                        'slug' => $item->newsCategory?->slug
                    ],
                    'page' => $item->page,
                    'created_at' => $item->created_at
                ];
            }));
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function show($id)
    {
        try {
            $news = News::with(['author', 'newsCategory'])
                ->findOrFail($id);

            return response()->json($news);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Berita tidak ditemukan'
            ], 404);
        }
    }

    public function search(Request $request)
    {
        $query = $request->get('q');
        
        if (empty($query)) {
            return response()->json([]);
        }

        $news = News::with(['newsCategory', 'author'])
            ->where(function($q) use ($query) {
                $q->where('title', 'like', "%{$query}%")
                  ->orWhere('content', 'like', "%{$query}%")
                  ->orWhereHas('newsCategory', function($q) use ($query) {
                      $q->where('title', 'like', "%{$query}%");
                  });
            })
            ->where('is_published', true)
            ->latest()
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'title' => $item->title,
                    'thumbnail' => $item->thumbnail,
                    'image' => $item->image,
                    'category' => [
                        'name' => $item->newsCategory?->title,
                        'slug' => $item->newsCategory?->slug
                    ],
                    'created_at' => $item->created_at
                ];
            });

        return response()->json($news);
    }
}
