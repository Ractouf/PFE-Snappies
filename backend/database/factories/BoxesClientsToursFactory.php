<?php

namespace Database\Factories;

use App\Models\Boxes;
use App\Models\BoxesClientsTours;
use App\Models\ClientsTours;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<BoxesClientsTours>
 */
class BoxesClientsToursFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'client_tour_id' => ClientsTours::inRandomOrder()->value('id'),
            'box_id' => Boxes::inRandomOrder()->value('id'),
            'quantity_box' => $this->faker->numberBetween(1, 10),
        ];
    }
}
