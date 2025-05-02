<?php

use App\Http\Controllers\FinancialYear;
use Illuminate\Support\Facades\Route;

Route::get('/', [FinancialYear::class, 'index'])->name('index');
