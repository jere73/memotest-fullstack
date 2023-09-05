<?php

namespace Database\Factories;

use App\Models\Image;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class ImageFactory extends Factory
{

    protected $model = Image::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $randomImageId = rand(1, 1000);
        $imageUrl = "https://picsum.photos/id/{$randomImageId}/100/100";

        return [
            'url' => $imageUrl,
        ];
    }
}
