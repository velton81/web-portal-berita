<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NewsCategory extends Model
{
    protected $fillable = [
        'title',
        'slug'
    ];

    public function news()
    {
        return $this_>hasmany(News::class);
    }
}
