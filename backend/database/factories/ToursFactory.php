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
            'day' => $this->faker->dateTimeBetween('-1 years'),
            'delivery_driver' => Users::inRandomOrder()->value('id'),
            'typical_tour' => TypicalTours::inRandomOrder()->value('id'),
        ];
    }
}
