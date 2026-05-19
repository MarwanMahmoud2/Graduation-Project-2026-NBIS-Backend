<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        $email    = env('ADMIN_EMAIL');
        $name     = env('ADMIN_NAME');
        $password = env('ADMIN_PASSWORD');

        if (!$email || !$password || !$name) {
            $this->command->warn('AdminUserSeeder skipped: ADMIN_EMAIL, ADMIN_NAME or ADMIN_PASSWORD missing in .env');
            return;
        }

        User::updateOrCreate(
            ['email' => $email],
            [
                'name'     => $name,
                'role'     => 'admin',
                'password' => Hash::make($password),
            ]
        );
    }
}
