<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClientsTours extends Model
{
    use HasFactory;
    protected $fillable = [
        'is_delivered',
        'client_id',
        'tour_id',
    ];
}
