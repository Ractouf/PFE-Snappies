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
        Schema::create('boxes', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('quantity');
            $table->unsignedBigInteger('client_id')->nullable();
            $table->unsignedBigInteger('tour_id');
            $table->foreign(['client_id', 'tour_id'])->references(['client_id', 'tour_id'])->on('clients_tours');
            $table->unsignedBigInteger('article_id');
            $table->foreign('article_id')->references('id')->on('articles');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('boxes');
    }
};
