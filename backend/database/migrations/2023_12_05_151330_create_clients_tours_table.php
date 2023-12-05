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
        Schema::create('clients_tour', function (Blueprint $table) {
            $table->increments('id');
            $table->boolean('is_delivered')->default(false);
            $table->unsignedBigInteger('client');
            $table->unsignedBigInteger('tour');
            $table->foreign('client')->references('id')->on('clients');
            $table->foreign('tour')->references('id')->on('tours');
            $table->unique(['client', 'tour']);
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
