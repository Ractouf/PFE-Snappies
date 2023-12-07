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
        Schema::create('clients_tours', function (Blueprint $table) {
            $table->increments('id');
            $table->boolean('is_delivered')->default(false);
            $table->unsignedBigInteger('client_id');
            $table->unsignedBigInteger('tour_id');
            $table->foreign('client_id')->references('id')->on('clients');
            $table->foreign('tour_id')->references('id')->on('tours');
            $table->unique(['client_id', 'tour_id']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('clients_tours');
    }
};
