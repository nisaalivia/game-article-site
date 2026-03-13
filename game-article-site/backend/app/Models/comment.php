<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class comment extends Model
{
    protected $table = 'comment';
    protected $primaryKey = 'CommentID';
    protected $fillable = ['ReviewID', 'Name', 'Comment'];
    public $timestamps = true;

    public function review(): BelongsTo
    {
        return $this->belongsTo(gamereview::class, 'ReviewID', 'ReviewID');
    }
}
