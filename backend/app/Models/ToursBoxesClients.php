<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ToursBoxesClients extends Model
{
    use HasFactory;

    protected $fillable = [
        'is_delivered',
        'tour_id',
        'client_id',
        'box_id',
    ];
}
