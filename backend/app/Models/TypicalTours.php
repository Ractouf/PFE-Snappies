<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TypicalTours extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
    ];

    public function clientsTours()
    {
        return $this->hasMany(ClientsTours::class, 'typical_tour_id');
    }
}
