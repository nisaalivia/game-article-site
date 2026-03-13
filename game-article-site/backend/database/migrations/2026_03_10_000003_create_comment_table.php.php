<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('comment', function (Blueprint $table) {
            $table->id('CommentID');
            // Remove the manual column definition if using foreignId
            $table->foreignId('ReviewID')->constrained('gamereview', 'ReviewID')->onDelete('cascade');
            $table->string('Name', 50);
            $table->string('Comment', 250);
            $table->timestamps();
        }); // Added the missing semicolon here
    }

    public function down(): void
    {
        Schema::dropIfExists('comment');
    }
};