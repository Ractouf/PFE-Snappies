<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExtraTours extends Model
{
    use HasFactory;

    protected $fillable = [
        'quantity_box',
        'box_client_tour_id'
    ];
}
