<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryCrudController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $categoryQuery = Category::query();
        $categoryQuery->when($request->search, function ($query, $search) {
            $query->where('title', 'LIKE', '%' . $search . '%');
        });
        $categories = $categoryQuery->paginate(2);

        return Inertia::render('Admin/Categories/Index', [
            'categories' => $categories,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Categories/Manage');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|max:50',
            'slug' => 'required|max:50',
            'media_url' => 'required',
        ]);

        Category::create($request->all());

        session()->flash('success', 'Category created successfully');

        return redirect()->route('dashboard.categories.index');
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
        $category = Category::findOrFail($id);

        return Inertia::render('Admin/Categories/Manage', [
            'category' => $category,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'title' => 'required|max:50',
            'slug' => 'required|max:50',
            'media_url' => 'required',
        ]);

        $category = Category::findOrFail($id);
        $category->fill($request->all());
        $category->save();

        session()->flash('success', 'Category updated successfully');

        return redirect()->route('dashboard.categories.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $category = Category::findOrFail($id);
        $category->delete();

        session()->flash('success', 'Category deleted successfully');

        return redirect()->route('dashboard.categories.index');
    }
}
