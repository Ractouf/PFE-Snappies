<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Articles;
use App\Models\Boxes;
use App\Models\BoxesClientsTours;
use App\Models\Clients;
use App\Models\ClientsTours;
use App\Models\Tours;
use App\Models\TypicalTours;
use App\Models\Users;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        TypicalTours::factory(10)->create();
        Users::factory(100)->create();
        Tours::factory(50)->create();
        Clients::factory(10)->create();
        ClientsTours::factory(10)->create();
        Articles::factory(4)->create();
        Boxes::factory(4)->create();
        BoxesClientsTours::factory(10)->create();

        Users::create([
            'is_admin' => true,
            'firstname' => 't',
            'lastname' => 't',
            'phone' => "0495204190",
            'email' => "t@t.t",
            'password' => bcrypt("t"),
        ]);
    }
}
