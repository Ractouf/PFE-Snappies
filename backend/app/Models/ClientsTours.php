<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClientsTours extends Model
{
    use HasFactory;
    protected $fillable = [
        'client_id',
        'typical_tour_id',
    ];

    public function client()
    {
        return $this->belongsTo(Clients::class, 'client_id');
    }
    public function boxesClientsTours()
    {
        return $this->hasMany(BoxesClientsTours::class, 'client_tour_id');
    }
}
