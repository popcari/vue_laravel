<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class UserController extends Controller
{
    /**
     * get all users
     */
    public function index()
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
     * create new user
     */
    public function create(){
        // get all data from table users_status and department in DB
        $users_status = \DB::table("users_status")->get();
        $department = \DB::table("department")->get();
        return response()->json([
            'users_status' => $users_status,
            'department' => $department
        ]);
    }

    /**
     * delete user by name
     */
    public function delete($name)
    {
        $user = User::where('name', $name)->first();

        if ($user) {
            try {
                $user->delete();
                return response()->json(null, 204);
            } catch (\Exception $e) {
                // Xử lý lỗi xóa và trả về response lỗi
                return response()->json(['error' => 'Could not delete user'], 500);
            }
        } else {
            // Trả về response không tìm thấy người dùng (HTTP 404)
            return response()->json(['error' => 'User not found'], 404);
        }
    }

}
