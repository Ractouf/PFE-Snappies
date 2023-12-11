import {useParams} from "@solidjs/router";
import {createResource} from "solid-js";
import "./UsersTours.css";
import ClientRow from "./ClientRow";

const UsersTours = () => {
    const params = useParams();

    async function fetchTours(tour) {
        const response = await fetch(`http://localhost:8000/api/typicalTours/${tour}`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        });

        if (!response.ok) {
            console.log(`HTTP error! status: ${response.status}`);
        } else {
            const res = await response.json()
            console.log(res);
            return res;
        }
    }

    const [clients] = createResource(() => params.typicalTour, fetchTours);

    function hide(event) {
        event.preventDefault();
        if (event.target === event.currentTarget) {
            const element = document.querySelector(`.validate`);
            element.classList.add("hidden");
        }
    }

    return (
        <>
            <ul>
                {!clients.loading ?
                    clients().map(client => <ClientRow client={client}/>)
                    :
                    <h1 class = "loading">Chargement...</h1>
                }
            </ul>

            <div onclick = {hide} class = "validate hidden">
            </div>
        </>
    );
}

export default UsersTours;
