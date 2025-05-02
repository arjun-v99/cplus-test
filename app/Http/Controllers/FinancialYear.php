<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class FinancialYear extends Controller
{
    public function index(Request $request)
    {
        try {
            // Getting Years from 10 years ago
            $years = [];

            // Current Year
            $currentYear = (int) date("Y");

            // 10 years ago
            $yearLimit = $currentYear - 10;

            // Looping till we get all years
            for ($i = $currentYear; $i >= $yearLimit; $i--) {
                array_push($years, $i);
            }


            return view('index', ['years' => $years]);
        } catch (Exception $e) {
            Log::error('Error while saving fabric. Error: ' . $e->getMessage());
        }
    }
}
