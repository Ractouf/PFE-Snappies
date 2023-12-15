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
            $table->unsignedBigInteger('client_id');
            $table->unsignedBigInteger('typical_tour_id');
            $table->foreign('client_id')->references('id')->on('clients')->onDelete('cascade');
            $table->foreign('typical_tour_id')->references('id')->on('typical_tours');
            $table->unique(['client_id', 'typical_tour_id']);
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
