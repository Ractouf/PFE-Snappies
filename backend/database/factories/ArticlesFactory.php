<?php

namespace Database\Factories;

use App\Models\Articles;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Articles>
 */
class ArticlesFactory extends Factory
{
    protected $model = Articles::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->colorName(),
            'size' => $this->faker->randomElement(['small', 'medium', 'large', null]),
        ];
    }
}
