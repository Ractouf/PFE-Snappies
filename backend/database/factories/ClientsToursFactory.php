<?php

namespace Database\Factories;

use App\Models\ClientsTours;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<ClientsTours>
 */
class ClientsToursFactory extends Factory
{
    protected $model = ClientsTours::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'is_delivered' => $this->faker->boolean(),
            'client_id' => $this->faker->numberBetween(1, 10),
            'tour_id' => $this->faker->numberBetween(1, 10),
        ];
    }
}
