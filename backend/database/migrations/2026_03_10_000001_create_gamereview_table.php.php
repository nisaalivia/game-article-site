<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('gamereview', function (Blueprint $table) {
            $table->id('ReviewID');
            $table->string('Judul', 100);
            $table->text('Deskripsi');
            $table->text('Kelebihan');
            $table->text('Kekurangan');
            $table->text('Kesimpulan');
            $table->decimal('Rating', 3, 1);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('gamereview');
    }
};