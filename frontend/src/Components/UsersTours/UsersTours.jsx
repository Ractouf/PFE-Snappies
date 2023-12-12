import {useParams} from "@solidjs/router";
import {createSignal, For, onMount} from "solid-js";
import "./UsersTours.css";
import ClientRow from "./ClientRow";

const UsersTours = () => {
    const [tour, setTour] = createSignal([]);
    const [extraBoxes, setExtraBoxes] = createSignal([]);

    async function fetchTours(tour, driver, date) {
        const response = await fetch(`http://localhost:8000/api/tours/${tour}/${driver}/${date}`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        });

        if (!response.ok) {
            console.log(`HTTP error! status: ${response.status}`);
        } else {
            const res = await response.json()
            console.log(res)
            setTour(res);
            setExtraBoxes(res.extra);
        }
    }

    const params = useParams();
    onMount(() => fetchTours(params.typicalTour, params.driver, params.date));

    return (
        <div class = "clients">
            <For each = {tour().clients}>
                {client => <ClientRow client = {client} extra = {extraBoxes} setExtra = {setExtraBoxes}/>}
            </For>
        </div>
    );
}

export default UsersTours;
