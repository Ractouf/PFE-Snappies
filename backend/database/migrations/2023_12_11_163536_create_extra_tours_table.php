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
        Schema::create('extra_tours', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedBigInteger('boxes');
            $table->foreign('boxes')->references('id')->on('boxes');
            $table->unsignedBigInteger('clientsTours');
            $table->foreign('clientsTours')->references('id')->on('clients_tours');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('extra_tours');
    }
};
