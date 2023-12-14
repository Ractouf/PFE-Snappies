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
        Schema::create('boxes_clients_tours', function (Blueprint $table) {
            $table->id();
            $table->double('quantity_box');
            $table->unsignedBigInteger('client_tour_id')->nullable();
            $table->foreign('client_tour_id')->references('id')->on('clients_tours');
            $table->unsignedBigInteger('typical_tour_id')->nullable();
            $table->foreign('typical_tour_id')->references('id')->on('typical_tours');
            $table->unsignedBigInteger('box_id');
            $table->foreign('box_id')->references('id')->on('boxes');
            $table->timestamps();
            $table->unique(['typical_tour_id', 'box_id', 'client_tour_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('boxes_clients_tours');
    }
};
