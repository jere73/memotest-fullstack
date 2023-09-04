<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GameSession extends Model
{
    use HasFactory;

    protected $table = 'game_session';
    public $timestamps = false;

    protected $fillable = [
        'memo_id',
        'retries',
        'number_of_pairs',
        'state'
    ];
}
