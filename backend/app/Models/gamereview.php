<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class gamereview extends Model
{
    protected $table = "gamereview";
    protected $primaryKey = "ReviewID";
    public $timestamps = true;
}
