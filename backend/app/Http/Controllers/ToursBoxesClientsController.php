<?php

namespace App\Http\Controllers;

use App\Models\ClientsTours;
use App\Models\Tours;
use App\Models\ToursBoxesClients;
use App\Models\TypicalTours;
use Illuminate\Http\Request;

class ToursBoxesClientsController extends Controller
{
    public function index()
    {
        return ToursBoxesClients::all();
    }

    public function store(Request $request)
    {
        $fields = $request->validate([
            'client_id' => 'required|string',
            'box_id' => 'required|string',
            'quantity_box' => 'required|integer',
        ]);

        return ToursBoxesClients::create($fields);
    }

    public function show(string $id)
    {
        return ClientsToursController::find($id);
    }

    public function update(Request $request, string $id)
    {
        return ClientsToursController::find($id)->update($request->all());
    }

    public function destroy(string $id)
    {
        return ClientsToursController::destroy($id);
    }

    public function getTour(string $tourId)
    {
        $tour = Tours::find($tourId);

        if (!$tour) {
            return response()->json(['message' => 'Tour not found'], 404);
        }

        $toursBoxesClients = $tour->toursBoxesClients;

        $res = ['clients' => []];
        $res['tour_id'] = $tourId;
        foreach ($toursBoxesClients as $tourBoxClient) {
            $client = $tourBoxClient->client;

            if ($client) {
                $clientId = $client->id;

                if (!isset($res['clients'][$clientId])) {
                    $clients[] = $clientId;

                    $res['clients'][$clientId] = [
                        'id' => $clientId,
                        'name' => $client->name,
                        'address' => $client->address,
                        'phone' => $client->phone,
                        'boxes' => [],
                        'extras' => [],
                    ];
                }

                $res['clients'][$clientId]['boxes'][] = [
                    'box_id' => $tourBoxClient->box_id,
                    'is_delivered' => $tourBoxClient->is_delivered,
                    'quantity_box' => $tourBoxClient->quantity_box,
                    'quantity_article' => $tourBoxClient->boxes->quantity_article,
                    'article' => $tourBoxClient->boxes->article->name,
                ];
            } else {
                $res['rab'][] = [
                    'box_id' => $tourBoxClient->box_id,
                    'is_delivered' => $tourBoxClient->is_delivered,
                    'quantity_box' => $tourBoxClient->quantity_box,
                    'quantity_article' => $tourBoxClient->boxes->quantity_article,
                    'article' => $tourBoxClient->boxes->article->name,
                ];
            }
        }

        foreach ($clients as $clientId) {
            $extrasTours = ToursBoxesClients::where('client_id', $clientId)->where('tour_id', null)->where('is_delivered', false)->get();

            foreach ($extrasTours as $extraTour) {
                $res['clients'][$clientId]['extras'][] = [
                    'box_id' => $extraTour->box_id,
                    'is_delivered' => $extraTour->is_delivered,
                    'quantity_box' => $extraTour->quantity_box,
                    'quantity_article' => $extraTour->boxes->quantity_article,
                    'article' => $extraTour->boxes->article->name,
                ];
            }
        }

        $res['clients'] = array_values($res['clients']);
        return response()->json($res);
    }

    public function markBoxesAsDelivered(Request $request, string $tourId, string $clientId)
    {
        $boxesDelivered = $request->input('boxesDelivered');

        // pour chaque boite réellement livrée
        foreach ($boxesDelivered as $boxes) {
            // trouve la ligne client boite
            $tourBoxClient = ToursBoxesClients::where('client_id', $clientId)
                ->where('box_id', $boxes['box_id'])
                ->where('tour_id', $tourId)
                ->orWhere('tour_id', null)
                ->where('is_delivered', false)
                ->first();

            // si elle existe
            if ($tourBoxClient) {
                // regarde si la quantité a changé
                $diff = $tourBoxClient->quantity_box - $boxes['quantity_box'];

                // si oui, met à jour la quantité
                if ($diff != 0) {
                    $rab = ToursBoxesClients::where('client_id', null)
                        ->where('box_id', $boxes['box_id'])
                        ->where('tour_id', $tourId)
                        ->where('is_delivered', false)
                        ->first();

                    // si la ligne rab existe, met à jour la quantité
                    if ($rab) {
                        $calc = $rab->quantity_box + $diff;

                        // si la quantité est nulle, supprime la ligne rab
                        if ($calc == 0) {
                            $rab->delete();

                            // sinon, met à jour la quantité
                        } else {
                            $rab->update(['quantity_box' => $calc]);
                        }
                        // sinon, crée la ligne rab si la quantité est positive
                    } else if ($diff > 0) {
                        ToursBoxesClients::create([
                            'box_id' => $boxes['box_id'],
                            'tour_id' => $tourId,
                            'quantity_box' => $diff,
                            'is_delivered' => false
                        ]);

                        // sinon, erreur
                    } else {
                        return response()->json(['message' => 'Rab not found'], 404);
                    }
                }

                // met à jour la ligne client boite
                $tourBoxClient->update(['quantity_box' => $boxes['quantity_box']]);
                $tourBoxClient->update(['is_delivered' => true]);
                $tourBoxClient->update(['tour_id' => $tourId]);
            } else {
                // client demande une NOUVELLE boite en plus
                $clientDelivered = ToursBoxesClients::where('client_id', $clientId)
                    ->where('box_id', $boxes['box_id'])
                    ->where('tour_id', $tourId)
                    ->where('is_delivered', true)
                    ->first();

                if ($clientDelivered) {
                    return response()->json(['message' => 'Box already delivered'], 409);
                }

                // regarde si la boite existe dans le rab
                $rab = ToursBoxesClients::where('client_id', null)
                    ->where('box_id', $boxes['box_id'])
                    ->where('tour_id', $tourId)
                    ->where('is_delivered', false)
                    ->first();

                // si elle n'existe pas, erreur
                if (!$rab) {
                    return response()->json(['message' => 'Rab not found'], 404);
                }

                $diff = $rab->quantity_box - $boxes['quantity_box'];

                // si la quantité est nulle, supprime la ligne rab
                if ($diff == 0) {
                    $rab->delete();
                    // sinon, met à jour la quantité
                } else {
                    $rab->update(['quantity_box' => $diff]);
                }

                // crée la ligne client boite
                ToursBoxesClients::create([
                    'client_id' => $clientId,
                    'tour_id' => $tourId,
                    'box_id' => $boxes['box_id'],
                    'quantity_box' => $boxes['quantity_box'],
                    'is_delivered' => true
                ]);
            }
        }

        // client a demandé une boite en moins
        $nonDelivered = ToursBoxesClients::where('client_id', $clientId)
            ->where('tour_id', $tourId)
            ->where('is_delivered', false)
            ->get();

        foreach ($nonDelivered as $box) {
            // regarde si la boite existe dans le rab
            $rab = ToursBoxesClients::where('client_id', null)
                ->where('box_id', $box->box_id)
                ->where('tour_id', $tourId)
                ->where('is_delivered', false)
                ->first();

            // si elle n'existe pas, crée la ligne rab, sinon met à jour la quantité
            if ($rab) {
                $rab->update(['quantity_box' => $rab->quantity_box + $box->quantity_box]);
            } else {
                ToursBoxesClients::create([
                    'box_id' => $box->box_id,
                    'tour_id' => $tourId,
                    'quantity_box' => $box->quantity_box,
                    'is_delivered' => false
                ]);
            }

            // supprime la ligne client boite
            $box->update([
                'is_delivered' => true,
                'quantity_box' => 0
            ]);
        }

        return response()->json(['message' => 'Boxes marked as delivered']);
    }
}
