<?php

namespace Database\Factories;

use App\Models\Boxes;
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
        return [
            'is_delivered' => $this->faker->boolean(),
            'quantity' => $this->faker->numberBetween(1, 10),
            'client' => $this->faker->numberBetween(1, 10),
            'tour' => $this->faker->numberBetween(1, 10),
            'article' => $this->faker->numberBetween(1, 10),
        ];
    }
}
