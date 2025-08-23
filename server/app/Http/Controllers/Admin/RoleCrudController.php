<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Role;

class RoleCrudController extends Controller
{
    public function index(Request $request)
    {
        $roleQuery = Role::query();
        $roleQuery->when($request->search, function ($query, $search) {
            $query->where('name', 'LIKE', '%' . $search . '%')->orWhere('display_name', 'LIKE', '%' . $search . '%');
        });
        $roles = $roleQuery->paginate(2);

        return Inertia::render('Admin/Roles/Index', [
            'roles' => $roles,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Roles/Manage');
    }

    public function store(Request $request)
    {
        // validate
        $request->validate([
            'name' => 'required|max:255|unique:roles,name',
            'display_name' => 'required|max:255',
        ]);

        // store to db
        Role::create($request->all());

        // show flash message
        session()->flash('success', 'Role has been created successfully');

        return redirect()->route('dashboard.roles.index');
    }

    public function edit(string $id)
    {
        $role = Role::findOrFail($id);
        return Inertia::render('Admin/Roles/Manage', [
            'role' => $role,
        ]);
    }

    public function update(Request $request, string $id)
    {
        $request->validate([
            'name' => 'max:255|unique:roles,name,' . $id,
            'display_name' => 'max:255',
        ]);

        $role = Role::findOrFail($id);
        $role->fill($request->all());
        $role->save();

        // show flash message
        session()->flash('success', 'Role has been updated successfully');
        return redirect()->route('dashboard.roles.index');
    }

    public function destroy(string $id)
    {
        $role = Role::findOrFail($id);
        $role->delete();

        session()->flash('success', 'Role has been deleted');
        return redirect()->route('dashboard.roles.index');
    }
}
