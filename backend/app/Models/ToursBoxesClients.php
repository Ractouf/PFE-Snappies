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
        'quantity_box'
    ];

    public function tour()
    {
        return $this->belongsTo(Tours::class, "tour_id");
    }

    public function client()
    {
        return $this->belongsTo(Clients::class, "client_id");
    }

    public function box()
    {
        return $this->belongsTo(Boxes::class, "box_id");
    }
}
