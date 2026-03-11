<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class gamedev extends Model
{
    protected $table = "gamedev";
    protected $primaryKey = "DevID";
    public $timestamps = true;
}
