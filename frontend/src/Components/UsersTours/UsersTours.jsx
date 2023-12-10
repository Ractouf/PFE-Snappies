import {useParams} from "@solidjs/router";
import {createResource} from "solid-js";
import "./UsersTours.css";

const UsersTours = () => {
    const params = useParams();

    async function fetchData(tour) {
        const response = await fetch(`http://localhost:8000/api/typicalTours/${tour}`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        });

        if (!response.ok) {
            console.log(`HTTP error! status: ${response.status}`);
        } else {
            return await response.json();
        }
    }

    const [clients] = createResource(() => params.typicalTour, fetchData);

    function goToMaps(address) {
        window.location.href = `https://www.google.com/maps/dir/?api=1&destination=${address}&travelmode:driving`
    }

    function validateClient(client) {
        const element = document.querySelector(`.validate`);
        const boxes = document.createElement("div");
        boxes.classList.add("boxes");

        element.innerHTML = "";

        const content = client.boxes.map(box => {
            return (
                    <h3>{box.quantity}x {box.article.name}</h3>
            );
        });
        content.forEach(item => boxes.appendChild(item));

        element.appendChild(boxes);
        element.classList.remove("hidden");
    }

    function hide(event) {
        if (event.target !== event.currentTarget) {
            event.stopPropagation();
        } else {
            const element = document.querySelector(`.validate`);
            element.classList.add("hidden");
        }
    }

    return (
        <>
            <ul>
                {!clients.loading ?
                    clients().map(client => {
                        return (
                            <li class = "client-row">
                                <div onClick = {() => validateClient(client)} class = "client-row-item">
                                    <input type="checkbox"/>
                                    <div>
                                        <h3>{client.name}</h3>
                                        <h4>{client.address}</h4>
                                    </div>
                                    <img onClick = {() => goToMaps(client.address)} class = "google-maps-logo"
                                         src = "/src/assets/googleMaps.png" alt = "maps"/>
                                </div>
                            </li>
                        );
                    }) : <h1 class = "loading">Chargement...</h1>
                }
            </ul>

            <div onclick = {hide} class = "validate hidden">
            </div>
        </>
    );
}

export default UsersTours