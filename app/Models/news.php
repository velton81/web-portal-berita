<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class news extends Model
{
    protected $fillable = [
        'author_id',
        'news_category_id',
        'title',
        'slug',
        'thumbnail',
        'content'
    ];

    public function author()
    {
        return $this->belongsTo(Author::class);
    }

    public function newsCategory()
    {
        return $this->belongsTo(NewsCategory::class);
    }

    public function Banner()
    {
        return $this->hasOne(Banner::class);
    }
}
