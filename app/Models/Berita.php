<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Berita extends Model
{
    use HasFactory;

    protected $table = 'news'; // Arahkan ke tabel 'news'
    protected $fillable = ['judul', 'isi', 'created_at', 'updated_at'];
}