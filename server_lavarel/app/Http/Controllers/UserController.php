<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class UserController extends Controller
{
    /**
     * get user by id
     */
    public function getUsetById($id)
    {
        return User::findOrFail($id);
    }

    /**
     * get all users
     */
    public function getAllUsers()
    {
        // return User::get();
        $users = User::
            join('department', 'users.departments_id', '=', 'department.id')
            ->join('users_status', 'users.status_id', '=', 'users_status.id')
            ->select(
                'users.*',
                'department.name as department', 
                'users_status.name as status'
            )
            ->get();
        return response()->json($users);
    }
}
