<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ISOController extends Controller
{
    public function search(Request $request)
{
    try {
        $requestData = $request->json()->all();

        if (isset($requestData['code_or_number'])) {
            $queryParam = $requestData['code_or_number'];
            $pythonScript = base_path('app/python_scripts/crawler.py');
            $output = shell_exec("python3 $pythonScript \"$queryParam\"");

            if ($output !== null) {
                $result = json_decode($output, true);
// debug
                if (is_array($result)) {
                    if (!empty($result)) {
                        return response()->json($result[0]);
                    } else {
                        return response()->json(['error' => 'Moeda não encontrada.'], 404);
                    }
                } else {
                    return response()->json(['error' => 'O script Python não retornou dados válidos.'], 500);
                }
            } else {
                return response()->json(['error' => 'O script Python não retornou dados válidos.'], 500);
            }
        } else {
            return response()->json(['error' => 'O campo "code_or_number" não foi fornecido no JSON da solicitação.'], 400);
        }
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
  }
}