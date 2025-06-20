<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/storage/{file}', function ($file) {
    $path = storage_path('app/public/' . $file);

    if (!file_exists($path)) {
        abort(404); // Jika file tidak ditemukan, kembalikan error 404
    }

    return response()->file($path);
})->where('file', '.*');
