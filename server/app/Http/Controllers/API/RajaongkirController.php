<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\City;
use App\Models\Province;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class RajaongkirController extends Controller
{
    public function migration()
    {
        $responseProvinces = Http::withHeader('key', env('RAJAONGKIR_API_KEY'))
            ->get('https://rajaongkir.komerce.id/api/v1/destination/province');

        foreach ($responseProvinces->json()['data'] as $province) {
            $provinceData = Province::find($province["id"]);
            if (!$provinceData) {
                Province::create([
                    'id' => $province['id'],
                    'province' => $province['name'],
                ]);
            }
        }

        return response()->json([
            'message' => 'Migration success',
        ], 200);
    }

    public function provinces()
    {
        try {
            $provinces = Province::all();
            return $this->sendResponse($provinces, 'Provinces retrieved successfully');
        } catch (\Throwable $th) {
            return $this->sendError('Internal server error', [], 500);
        }
    }

    public static function city($provinceId)
    {
        try {
            $path = 'https://rajaongkir.komerce.id/api/v1/destination/city/' . $provinceId;
            $responseCity = Http::withHeader('key', env('RAJAONGKIR_API_KEY'))
                ->get($path);
            return parent::sendResponseStatic($responseCity->json()['data'], 'Cities retrieved successfully');
        } catch (\Throwable $th) {
            return parent::sendErrorStatic('Internal server error', [], 500);
        }
    }
}
