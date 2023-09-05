<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Memo extends Model
{
    use HasFactory;

    protected $table = 'memo';
    public $timestamps = false;

    protected $fillable = [
        'url'
    ];

    public function images(): BelongsToMany
    {
        return $this->belongsToMany(Image::class, 'memo_images', 'memo_id', 'image_id');
    }

    public function gameSessions(): HasMany
    {
        return $this->hasMany(GameSession::class);
    }
}
