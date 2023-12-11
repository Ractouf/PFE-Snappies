<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BoxesClientsTours extends Model
{
    use HasFactory;

    protected $fillable = [
        'client_tour_id',
        'typical_tour_id',
        'quantity_box',
        'box_id',
    ];

    public function box()
    {
        return $this->belongsTo(Boxes::class, 'box_id');
    }
}
