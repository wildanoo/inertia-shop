<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();
        $superAdmin = Role::create(['name' => 'super_admin']);
        $user = User::create([
            'name' => 'Super Admin',
            'email' => 'super_admin@inertiashop.dev',
            'password' => bcrypt('12345678'),
        ]);

        $user->assignRole($superAdmin);
    }
}
