import {useParams} from "@solidjs/router";
import {createSignal, For, onMount} from "solid-js";
import "./UsersTours.css";
import ClientRow from "./ClientRow";

const UsersTours = () => {
    const [tour, setTour] = createSignal([]);
    const [extraBoxes, setExtraBoxes] = createSignal([]);

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
            console.log(res)
            setTour(res);

            if (res.rab)
                setExtraBoxes(res.rab);
            else
                setExtraBoxes([]);
        }
    }

    const params = useParams();
    onMount(() => fetchTours(params.tourId));

    return (
        <div class = "clients">
            <For each = {tour().clients}>
                {client => <ClientRow client = {client} extra = {extraBoxes} setExtra = {setExtraBoxes} tour = {tour()} fetchTours = {fetchTours}/>}
            </For>
        </div>
    );
}

export default UsersTours;
