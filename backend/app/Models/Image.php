<?php

namespace App\Models;

use Database\Factories\ImageFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Image extends Model
{
    use HasFactory;

    protected $table = 'images';
    public $timestamps = false;

    protected $fillable = [
        'url'
    ];

    protected static function newFactory(): Factory
    {
        return ImageFactory::new();
    }

    public function memos(): BelongsToMany
    {
        return $this->belongsToMany(Memo::class, 'memo_images', 'image_id', 'memo_id');
    }
}
