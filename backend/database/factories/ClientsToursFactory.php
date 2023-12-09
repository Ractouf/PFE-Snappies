<?php

namespace Database\Factories;

use App\Models\Clients;
use App\Models\ClientsTours;
use App\Models\TypicalTours;
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
            'client_id' => Clients::inRandomOrder()->value('id'),
            'tour_id' => TypicalTours::inRandomOrder()->value('id'),
        ];
    }
}
