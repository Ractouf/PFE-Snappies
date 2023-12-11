<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClientsTours extends Model
{
    use HasFactory;
    protected $fillable = [
        'client_id',
        'tour_id',
    ];

    public function client()
    {
        return $this->belongsTo(Clients::class, 'client_id');
    }
    public function boxes()
    {
        return $this->hasMany(Boxes::class, 'clients_tours_id');
    }

    public function extras()
    {
        return $this->hasMany(ExtraTours::class, 'clientsTours');
    }
}
