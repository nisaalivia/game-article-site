<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class gamereview extends Model
{
    protected $table = "gamereview";
    protected $primaryKey = "ReviewID";
    public $timestamps = true;

    public function comments(): HasMany
    {
        return $this->hasMany(comment::class, 'ReviewID', 'ReviewID');
    }
}
