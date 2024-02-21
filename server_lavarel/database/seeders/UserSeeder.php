<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;


class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // tuong tac vs table "users"
          DB::table('users')->insert([
            "username"=> "admin",
            "name"=>"Admin",
            "email"=> "admin@gmail.com",
            'password' => Hash::make("admin"),
            "departments_id"=>"1",
            "status_id"=>"1",
        ]);  
    }
}
