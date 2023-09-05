<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Symfony\Component\DomCrawler\Crawler;
use App\Http\Controllers\Controller;

class ISOController extends Controller
{
    public function search(Request $request)
    {
        try {
            $requestData = $request->json()->all();

            if (isset($requestData['code_or_number'])) {
                $codeOrNumber = $requestData['code_or_number'];

                $currencyData = DB::table('currency_data')
                    ->where('code', '=', $codeOrNumber)
                    ->orWhere('number', '=', $codeOrNumber)
                    ->first();

                if ($currencyData) {
                    return response()->json($currencyData);
                } else {
                    $wikipediaData = $this->getCurrencyDataFromWikipedia($codeOrNumber);
                    if ($wikipediaData) {
                        return response()->json($wikipediaData);
                    } else {
                        return response()->json(['error' => 'Moeda não encontrada.'], 404);
                    }
                }
            } else {
                return response()->json(['error' => 'O campo "code_or_number" não foi fornecido no JSON da solicitação.'], 400);
            }
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    private function getCurrencyDataFromWikipedia($codeOrNumber)
    {
        $wikipediaURL = 'https://pt.wikipedia.org/wiki/ISO_4217_' . $codeOrNumber;

        $response = Http::get($wikipediaURL);

        if ($response->successful()) {
            $html = $response->body();
            $crawler = new Crawler($html);
            $code = $crawler->filter('.wikitable .sorttable tbody tr:nth-child(2) td:nth-child(1)')->text();
            $number = (int)$crawler->filter('.wikitable .sorttable tbody tr:nth-child(2) td:nth-child(2)')->text();
            $decimal = (int)$crawler->filter('.wikitable .sorttable tbody tr:nth-child(2) td:nth-child(3)')->text();
            $currency = $crawler->filter('.wikitable .sorttable tbody tr:nth-child(2) td:nth-child(4)')->text();
            $currencyData = [
                'code' => $code,
                'number' => $number,
                'decimal' => $decimal,
                'currency' => $currency,
            ];

            return $currencyData;
        }

        return null;
    }
}
