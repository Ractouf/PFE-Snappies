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
        Schema::create('tours', function (Blueprint $table) {
            $table->increments('id');
            $table->dateTime('date');
            $table->unsignedBigInteger('delivery_driver_id');
            $table->foreign('delivery_driver_id')->references('id')->on('users');
            $table->unsignedBigInteger('typical_tour_id');
            $table->foreign('typical_tour_id')->references('id')->on('typical_tours');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tours');
    }
};
