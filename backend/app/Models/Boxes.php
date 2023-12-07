<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Boxes extends Model
{
    use HasFactory;
    protected $fillable = [
        'quantity',
        'client_id',
        'tour_id',
        'article_id',
    ];
}
