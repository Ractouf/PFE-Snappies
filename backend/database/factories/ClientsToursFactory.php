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
        $uniquePairs = [];

        while (true) {
            $clientId = Clients::inRandomOrder()->value('id');
            $tourId = TypicalTours::inRandomOrder()->value('id');

            $pair = $clientId . '-' . $tourId;

            if (!in_array($pair, $uniquePairs)) {
                $uniquePairs[] = $pair;
                break;
            }
        }

        return [
            'client_id' => $clientId,
            'typical_tour_id' => $tourId,
        ];
    }
}
