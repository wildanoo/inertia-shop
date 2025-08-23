<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserCrudController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $userQuery = User::query();
        $userQuery->when($request->search, function ($query, $search) {
            $query->where('name', 'LIKE', '%' . $search . '%')->orWhere('email', 'LIKE', '%' . $search . '%');
        });

        $userQuery->when($request->sortField, function ($query, $sortField) use ($request) {
            $query->orderBy($sortField, $request->sortDirection ? $request->sortDirection : 'asc');
        });
        $users = $userQuery->with('roles')->paginate(2);

        return Inertia::render('Admin/Users/Index', [
            'users' => $users,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $roles = Role::all();
        return Inertia::render('Admin/Users/Manage', ['roles' => $roles]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|max:255|unique:users,email|email',
            'password' => 'required|min:8',
            'password_confirmation' => 'required|same:password',
        ]);


        $user = User::create(array_merge($request->only('name', 'email'), [
            'password' => bcrypt($request->password),
        ]));

        $user->syncRoles($request->roles);

        session()->flash('success', 'User has been created successfully');
        return redirect()->route('dashboard.users.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {

        $user = User::with('roles')->findOrFail($id);
        $roles = Role::all();
        return Inertia::render('Admin/Users/Manage', [
            'user' => $user,
            'roles' => $roles,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'name' => 'max:255',
            // 'email' => 'max:255|email|unique:users,email,' . $id,
            'password' => 'nullable|min:8',
            'password_confirmation' => 'nullable|same:password',
        ]);

        $user = User::findOrFail($id);
        $password = $user->password;

        if ($request->password && $request->password_confirmation) {
            $password = bcrypt($request->password);
        }

        $user->fill(array_merge($request->only('name'), [
            'password' => $password
        ]));

        $user->save();

        $user->syncRoles($request->roles);

        session()->flash('success', 'User has been updated successfully');

        return redirect()->route('dashboard.users.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        session()->flash('success', 'User has been deleted successfully');
        return redirect(route('dashboard.users.index'));
    }
}
