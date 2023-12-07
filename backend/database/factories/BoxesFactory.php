<?php

namespace Database\Factories;

use App\Models\Articles;
use App\Models\Boxes;
use App\Models\Clients;
use App\Models\ClientsTours;
use App\Models\Tours;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Boxes>
 */
class BoxesFactory extends Factory
{
    protected $model = Boxes::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $randomClientsTour = ClientsTours::inRandomOrder()->first();

        return [
            'quantity' => $this->faker->numberBetween(1, 10),
            'client_id' => $randomClientsTour ? $randomClientsTour->client_id : null,
            'tour_id' => $randomClientsTour ? $randomClientsTour->tour_id : null,
            'article_id' => Articles::inRandomOrder()->value('id'),
        ];
    }
}
