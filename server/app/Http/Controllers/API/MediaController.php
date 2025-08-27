<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Media;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class MediaController extends Controller
{
    public function index()
    {
        try {
            $media = Media::latest()->get();
            return $this->sendResponse($media, "Media retrieved successfully");
        } catch (\Throwable $th) {
            return $this->sendError('Internal server error!', []);
        }
    }

    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'file' => 'required|mimes:jpeg,png,jpg,gif,svg|max:1024',
                'role' => 'required|in:admin,user',
                'user_id' => 'required|exists:users,id',
            ]);

            if ($validator->fails()) {
                return $this->sendError('Validation error!', $validator->errors(), 422);
            }

            $file = $request->file('file');
            $originalFileName = $file->getClientOriginalName();
            $file_name = Str::slug(pathinfo($originalFileName, PATHINFO_FILENAME)) . '-' . time() . '.' . $file->getClientOriginalExtension();
            $file_path = $file->storeAs('uploads/user-' . $request->user_id, $file_name, 'public');
            $media = Media::create([
                'user_id' => $request->user_id,
                'filename' => $file_name,
                'filepath' => $file_path,
                'role' => $request->role,
                'url' => asset('storage/' . $file_path),
                'ext' => $file->getClientOriginalExtension(),
            ]);

            return $this->sendResponse($media, "Media uploaded successfully");
        } catch (\Throwable $th) {
            return $this->sendError('Internal server error!', []);
        }
    }

    public function destroy($id)
    {
        try {
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

            return $this->sendResponse($media, "Media deleted successfully");
        } catch (\Throwable $th) {
            return $this->sendError('Internal server error!', []);
        }
    }
}
