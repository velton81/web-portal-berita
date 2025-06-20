<?php

namespace App\Console\Commands;

use App\Models\News;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;

class ImportNewsDataCommand extends Command
{
    protected $signature = 'news:import {category?} {--limit=10}';
    protected $description = 'Import news from NewsData.io API';

    // Kata kunci untuk kategorisasi otomatis yang lebih lengkap
    protected $categoryKeywords = [
        'olahraga' => [
            'sport', 'liga', 'pertandingan', 'atletik', 'sepakbola', 'bola',
            'piala', 'turnamen', 'pemain', 'stadion', 'gol'
        ],
        'business' => [
            'ekonomi', 'bisnis', 'saham', 'investasi', 'pasar', 'rupiah',
            'ekspor', 'impor', 'bank', 'keuangan', 'perdagangan', 'industri',
            'umkm', 'pengusaha', 'produksi'
        ],
        'lifestyle' => [
            'gaya hidup', 'fashion', 'kuliner', 'wisata', 'entertainment',
            'makanan', 'restoran', 'hotel', 'travel', 'liburan', 'film',
            'musik', 'seni', 'budaya'
        ],
        'terkini' => [
            'teknologi', 'digital', 'inovasi', 'aplikasi', 'startup',
            'politik', 'pemerintah', 'pendidikan', 'kesehatan', 'riset',
            'penelitian', 'internasional', 'nasional'
        ]
    ];

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Starting news import from NewsData.io...');
        Log::info('Starting NewsData.io import', [
            'category' => $this->argument('category'),
            'limit' => $this->option('limit')
        ]);
        
        $category = $this->argument('category');
        $limit = $this->option('limit');
        
        try {
            $response = Http::withoutVerifying()
                ->get('https://newsdata.io/api/1/news', [
                    'apikey' => config('services.newsdata.key', env('NEWSDATA_API_KEY')),
                    'language' => 'id',
                    'country' => 'id',
                    'category' => $category,
                    'size' => $limit
                ]);

            if (!$response->successful()) {
                $this->error('Failed to fetch news from API: ' . $response->status());
                return 1;
            }

            $data = $response->json();
            $imported = 0;
            $skipped = 0;
            $failed = 0;

            foreach ($data['results'] ?? [] as $article) {
                try {
                    // Cek apakah berita sudah ada
                    $existingNews = News::where('title', $article['title'])->first();
                    
                    if ($existingNews) {
                        $this->info("Skipped (already exists): {$article['title']}");
                        $skipped++;
                        continue;
                    }

                    // Deteksi kategori dan page berdasarkan konten
                    $detectedPage = $this->detectPageFromContent(
                        $article['title'] . ' ' . ($article['description'] ?? '')
                    );

                    // Handle thumbnail URL
                    $thumbnail = null;
                    if (!empty($article['image_url'])) {
                        $thumbnail = $article['image_url'];
                        // Jika URL terlalu panjang, ambil path-nya saja
                        if (strlen($thumbnail) > 255) {
                            $parsed = parse_url($thumbnail);
                            $thumbnail = $parsed['path'] ?? null;
                        }
                    }

                    $newsData = [
                        'title' => $article['title'],
                        'slug' => Str::slug($article['title']),
                        'content' => $this->formatContent($article),
                        'thumbnail' => $thumbnail,
                        'author_id' => 1,
                        'news_category_id' => $this->getCategoryId($detectedPage),
                        'is_published' => true,
                        'page' => $detectedPage,
                        'source_url' => $article['link'] ?? '',
                        'source_name' => $article['source_id'] ?? ''
                    ];

                    News::create($newsData);

                    $imported++;
                    $this->info("Imported ({$detectedPage}): {$article['title']}");
                } catch (\Exception $e) {
                    $this->error("Failed to import article: {$article['title']}");
                    $this->error($e->getMessage());
                    $failed++;
                }
            }

            $this->info("\nImport summary:");
            $this->info("Successfully imported: {$imported} articles");
            $this->info("Skipped (duplicates): {$skipped} articles");
            $this->info("Failed to import: {$failed} articles");

            // Di akhir import
            Log::info('Import completed', [
                'imported' => $imported,
                'skipped' => $skipped,
                'failed' => $failed
            ]);

            return 0;
        } catch (\Exception $e) {
            $this->error('Error: ' . $e->getMessage());
            return 1;
        }
    }

    protected function formatContent($article)
    {
        $content = $article['content'] ?? $article['description'] ?? '';
        
        // Tambahkan sumber berita di akhir konten
        if (!empty($article['link'])) {
            $content .= "\n\nSumber: " . ($article['source_id'] ?? 'NewsData.io');
            $content .= "\nLink: " . $article['link'];
        }

        return $content;
    }

    protected function detectPageFromContent($content)
    {
        $content = strtolower($content);
        
        foreach ($this->categoryKeywords as $page => $keywords) {
            foreach ($keywords as $keyword) {
                if (str_contains($content, strtolower($keyword))) {
                    return $page;
                }
            }
        }

        return 'terkini'; // default page
    }

    protected function getCategoryId($page)
    {
        $categoryMap = [
            'olahraga' => 1,
            'business' => 2,
            'lifestyle' => 3,
            'terkini' => 4
        ];

        return $categoryMap[$page] ?? 4; // default ke terkini
    }
}
