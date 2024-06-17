<?php

namespace Database\Factories;

use App\Models\testexam;
use Illuminate\Database\Eloquent\Factories\Factory;

class testexamFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = testexam::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->name(),
            'age' => $this->faker->numberBetween(18, 65),
        ];
    }
}
