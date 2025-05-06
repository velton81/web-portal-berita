<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BeritaSeeder extends Seeder
{
    public function run()
    {
        DB::table('news')->insert([ // Arahkan ke tabel 'news'
            [
                'judul' => 'Berita Pertama',
                'isi' => 'Ini adalah isi berita pertama.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'judul' => 'Berita Kedua',
                'isi' => 'Ini adalah isi berita kedua.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
