<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tours extends Model
{
    use HasFactory;
    protected $fillable = [
        'date',
        'delivery_driver_id',
        'typical_tour_id',
    ];

    public function toursBoxesClients()
    {
        return $this->hasMany(ToursBoxesClients::class, "tour_id");
    }

    public function typicalTour()
    {
        return $this->belongsTo(TypicalTours::class, "typical_tour_id");
    }
}
