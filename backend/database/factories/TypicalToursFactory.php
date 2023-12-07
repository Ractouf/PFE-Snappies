<?php

namespace Database\Factories;

use App\Models\TypicalTours;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<TypicalTours>
 */
class TypicalToursFactory extends Factory
{
    protected $model = TypicalTours::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'day' => $this->faker->dayOfWeek(),
            'name' => $this->faker->city(),
        ];
    }
}
