// page to update a typical tour (admin only)
// (fetch the boxes for each client of that typical tour)
// (the admin can also add new boxes for each client)
// (the admin can also delete boxes for each client)
// (the admin can also update the number of boxes for each client)

import { useParams } from "@solidjs/router";
import {createSignal, For, onMount} from "solid-js";
import ClientTour from "./ClientTour";

const UpdateTypicalTours = () => {
    const [tour, setTour] = createSignal([]);
    const [loading, setLoading] = createSignal(true);
    const [boxes, setBoxes] = createSignal([]);

    const params = useParams();

    async function fetchTour(id) {
        const response = await fetch(`http://localhost:8000/api/typicalTours/${id}`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        });

        if (response.ok) {
            const res = await response.json();
            setTour(res);
        } else {
            throw new Error("Something went wrong");
        }
    }

    async function fetchBoxes ()  {
        const response = await fetch("http://localhost:8000/api/boxes", {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        })

        if (response.ok) {
            const res = await response.json();
            setBoxes(res);
        } else {
            throw new Error("Something went wrong");
        }
    }

    async function fetchData() {
        await fetchBoxes();
        await fetchTour(params.id);
        setLoading(false);
    }

    onMount(fetchData);

    return (
        <>
            {loading() ?
                <h1>Loading...</h1>
                :
                <>
                    <For each={tour()}>
                        {clientTourBox => <ClientTour tourId = {clientTourBox.id} client = {clientTourBox.client} clientBoxes = {clientTourBox.client.boxes} existingBoxes= {boxes()} fetchData = {fetchData}/>}
                    </For>
                </>
            }
        </>
    )
}

export default UpdateTypicalTours;