<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('news', function (Blueprint $table) {
            // Ubah kolom thumbnail menjadi text dan nullable
            $table->text('thumbnail')->nullable()->change();
            
            // Tambah kolom baru
            $table->text('source_url')->nullable();
            $table->string('source_name')->nullable();
            $table->boolean('is_published')->default(true);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('news', function (Blueprint $table) {
            $table->string('thumbnail')->nullable(false)->change();
            $table->dropColumn(['source_url', 'source_name', 'is_published']);
        });
    }
};
