<?php

namespace Database\Factories;

use App\Models\Tours;
use App\Models\TypicalTours;
use App\Models\Users;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Tours>
 */
class ToursFactory extends Factory
{
    protected $model = Tours::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'date' => $this->faker->dateTimeBetween('-1 years'),
            'delivery_driver_id' => Users::inRandomOrder()->value('id'),
            'typical_tour_id' => TypicalTours::inRandomOrder()->value('id'),
        ];
    }
}
