import {useParams} from "@solidjs/router";
import {createSignal, For, onMount} from "solid-js";
import "./UsersTours.css";
import ClientRow from "./ClientRow";

const UsersTours = () => {
    const [tour, setTour] = createSignal([]);
    const [extraBoxes, setExtraBoxes] = createSignal([]);
    const [isLoading, setIsLoading] = createSignal(true);

    async function fetchTours(tour) {
        const response = await fetch(`http://localhost:8000/api/toursBoxes/${tour}`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        });

        if (!response.ok) {
            console.log(`HTTP error! status: ${response.status}`);
        } else {
            const res = await response.json();
            setTour(res);

            if (res.rab)
                setExtraBoxes(res.rab);
            else
                setExtraBoxes([]);

            setIsLoading(false);
        }
    }

    const params = useParams();
    onMount(() => fetchTours(params.tourId));

    return (
        <div class = "clients">
            {isLoading() ?
                <div class = "loading">Chargement...</div>
                :
                <For each = {tour().clients}>
                    {client => <ClientRow client = {client} extra = {extraBoxes} setExtra = {setExtraBoxes} tour = {tour()} fetchTours = {fetchTours}/>}
                </For>
            }
        </div>
    );
}

export default UsersTours;
