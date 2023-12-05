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
            $table->boolean('is_delivered')->default(false);
            $table->integer('quantity');
            $table->unsignedBigInteger('client')->nullable();
            $table->unsignedBigInteger('tour');
            $table->foreign(['client', 'tour'])->references(['client_id', 'tour_id'])->on('clients_tours');
            $table->unsignedBigInteger('article');
            $table->foreign('article')->references('id')->on('articles');
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
