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

    /**
     * delete user by name
     */
   public function deleteUser($name)
    {
        $user = User::where('name', $name)->first();
        if ($user) {
            $user->delete();

            return response()->json(null, 204);
        } else {
            // Trả về response không tìm thấy người dùng (HTTP 404)
            return response()->json(['error' => 'User not found'], 404);
        }
    }
}
