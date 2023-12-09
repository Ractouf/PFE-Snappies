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
            $table->dateTime('day');
            $table->unsignedBigInteger('delivery_driver')->nullable();
            $table->foreign('delivery_driver')->references('id')->on('users');
            $table->unsignedBigInteger('typical_tour');
            $table->foreign('typical_tour')->references('id')->on('typical_tours');
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
