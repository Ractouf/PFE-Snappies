<?php

namespace Database\Factories;

use App\Models\Clients;
use App\Models\ClientsTours;
use App\Models\Tours;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<ClientsTours>
 */
class ClientsToursFactory extends Factory
{
    private static $order = 1;
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
            'client_id' => Clients::inRandomOrder()->value('id'),
            'tour_id' => Tours::inRandomOrder()->value('id'),
        ];
    }
}
