<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class News extends Model
{
    use HasFactory;

    protected $table = 'news'; // Nama tabel di database
    protected $fillable = [
        'author_id',
        'news_category_id',
        'title',
        'slug',
        'thumbnail',
        'content',
        'page',
        'is_published',
        'source_url',
        'source_name'
    ];

    public function author()
    {
        return $this->belongsTo(Author::class);
    }

    public function newsCategory()
    {
        return $this->belongsTo(\App\Models\NewsCategory::class, 'news_category_id');
    }

    public function Banner()
    {
        return $this->hasOne(Banner::class);
    }
}
