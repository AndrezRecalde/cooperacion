<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Contracts\View\View;


class HomeController extends Controller
{
    function __invoke(): View
    {
        return view('welcome');
    }
}
