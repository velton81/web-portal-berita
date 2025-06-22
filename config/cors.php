<?php

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie', 'storage/*', '*'],
    'allowed_methods' => ['*'],
    'allowed_origins' => ['http://localhost:5173', 'https://frontend-anda.vercel.app'], // Dalam production, ganti dengan domain frontend yang spesifik
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => false,

    'paths' => ['*'], // Izinkan semua path
    'allowed_methods' => [
        'GET',
        'POST',
        'PUT',
        'PATCH',
        'DELETE',
        'OPTIONS'
    ],
];

header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
