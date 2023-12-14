<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Boxes extends Model
{
    use HasFactory;
    protected $fillable = [
        'quantity_article',
        'article_id',
    ];

    public function article()
    {
        return $this->belongsTo(Articles::class, 'article_id');
    }
}
