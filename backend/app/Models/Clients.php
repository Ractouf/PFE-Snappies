<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Clients extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'address',
        'phone',
    ];

    public function toursBoxesClients()
    {
        return $this->hasMany(ToursBoxesClients::class, 'client_id');
    }
}
