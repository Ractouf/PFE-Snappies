<?php

namespace Database\Factories;

use App\Models\Tours;
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
            'day' => $this->faker->dateTimeBetween('now', '-1 years'),
            'delivery_driver' => $this->faker->numberBetween(1, 10),
            'typical_tour' => $this->faker->numberBetween(1, 10),
        ];
    }
}
