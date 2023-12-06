<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Boxes extends Model
{
    use HasFactory;
    protected $fillable = [
        'is_delivered',
        'quantity',
        'client',
        'tour',
        'article',
    ];
}
