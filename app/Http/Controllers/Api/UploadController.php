<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class UploadController extends Controller
{
    public function uploadImage(Request $request)
    {
        // Validasi file gambar
        $validator = Validator::make($request->all(), [
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => $validator->messages()->first(),
                'messageType' => 'error'
            ], 422);
        }

        // Folder penyimpanan gambar di storage/app/public/images
        $uploadFolder = 'images';

        // Ambil file gambar dari request
        $image = $request->file('image');

        // Simpan gambar di disk 'public'
        $imagePath = $image->store($uploadFolder, 'public');

        // Dapatkan URL gambar yang bisa diakses publik
        $imageUrl = asset('storage/' . $imagePath);

        // Kembalikan response JSON dengan nama file dan URL
        return response()->json([
            'message' => 'File Uploaded Successfully',
            'messageType' => 'success',
            'status' => 200,
            'data' => [
                'image_name' => basename($imagePath),
                'image_url' => $imageUrl,
                'mime' => $image->getClientMimeType(),
            ]
        ]);
    }
}
