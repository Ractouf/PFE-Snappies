<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Boxes extends Model
{
    use HasFactory;
    protected $fillable = [
        'quantity',
        'clients_tours_id',
        'article_id',
    ];

    public function article()
    {
        return $this->belongsTo(Articles::class, 'article_id');
    }
}
