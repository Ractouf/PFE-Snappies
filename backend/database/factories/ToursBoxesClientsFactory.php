<?php

namespace Database\Factories;

use App\Models\Boxes;
use App\Models\Clients;
use App\Models\Tours;
use App\Models\ToursBoxesClients;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<ToursBoxesClients>
 */
class ToursBoxesClientsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'is_delivered' => $this->faker->boolean(),
            'client_id' => Clients::inRandomOrder()->value('id'),
            'tour_id' => Tours::inRandomOrder()->value('id'),
            'box_id' => Boxes::inRandomOrder()->value('id'),
        ];
    }
}
