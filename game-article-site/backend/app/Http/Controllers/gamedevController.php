<?php

namespace App\Http\Controllers;

use App\Models\gamedev;
use Illuminate\Http\Request;

class gamedevController extends Controller
{
    public function index()
    {
        $devs = gamedev::all();
        return view('gamedev.index', compact('devs'));
    }

    public function show($id)
    {
        $dev = gamedev::findOrFail($id);
        return view('gamedev.show', compact('dev'));
    }
}