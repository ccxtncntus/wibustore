<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\testexam;

class examsee extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        testexam::factory()->count(5)->create();
    }
}
