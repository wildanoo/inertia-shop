<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Media;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MediaCrudController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Media/Index', [
            'media' => Media::latest()->paginate(10),
        ]);
    }
    public function destroy($id)
    {
        $media = Media::find($id);

        if (!$media) {
            return $this->sendError('Media not found', [], 404);
        }

        $file_path = $media->filepath;
        $file_path = str_replace('storage/', '', $file_path);
        $file_path = storage_path('app/public/' . $file_path);
        if (file_exists($file_path)) {
            unlink($file_path);
        }

        $media->delete();

        session()->flash('success', 'Media deleted successfully');

        return redirect(route('dashboard.media.index'));
    }
}
