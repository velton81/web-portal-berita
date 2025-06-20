<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\NewsCategory;

class NewsCategoryController extends Controller
{
    public function index()
    {
        return response()->json(NewsCategory::select('id', 'title', 'slug')->get());
    }

    public function show($slug)
    {
        $category = NewsCategory::where('slug', $slug)->firstOrFail();
        return response()->json($category);
    }
}
