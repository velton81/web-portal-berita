<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UploadController;
use App\Http\Controllers\Api\NewsController;
use App\Http\Controllers\Api\BannerController;

Route::post('/upload-image', [UploadController::class, 'uploadImage']);

// Route untuk berita
Route::get('/news', [NewsController::class, 'index']);
Route::get('/news/{id}', [NewsController::class, 'show']); // Tambahkan route untuk detail berita
Route::get('/news/search', [NewsController::class, 'search']); // Route untuk pencarian berita

// Route untuk banner
Route::get('/banner', [BannerController::class, 'index']);

// Route untuk kategori berita
Route::get('/news-categories', [\App\Http\Controllers\Api\NewsCategoryController::class, 'index']);
Route::get('/news-categories/{slug}', [\App\Http\Controllers\Api\NewsCategoryController::class, 'show']);
Route::get('/newsdata', [\App\Http\Controllers\Api\NewsDataController::class, 'getNews']);
