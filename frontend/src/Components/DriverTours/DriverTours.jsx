import {useNavigate, useParams} from "@solidjs/router";
import {createSignal, For, onMount} from "solid-js";

const DriverTours = () => {
    const params = useParams();
    const [tours, setTours] = createSignal([]);
    const [loading, setLoading] = createSignal(true);
    const navigate = useNavigate();

    async function fetchTours() {
        const response = await fetch(`http://localhost:8000/api/tours/${params.date}/${params.driver}`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        });

        const res = await response.json();
        setTours(res);
        setLoading(false);
    }

    onMount(fetchTours);

    function goToTour(id) {
        navigate(`/tours/${id}`);
    }

    return (
        <>
            {loading() ?
                <div>Loading...</div>
                :
                <For each = {tours()}>
                    {tour =>
                        <>
                            <button onClick = {() => goToTour(tour.id)}>Consulter</button>
                            <h3>{tour.name}</h3>
                        </>
                    }
                </For>
            }
        </>
    );
}

export default DriverTours;