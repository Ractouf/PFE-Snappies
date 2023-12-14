// page to update a typical tour (admin only)
// (fetch the boxes for each client of that typical tour)
// (the admin can also add new boxes for each client)
// (the admin can also delete boxes for each client)
// (the admin can also update the number of boxes for each client)

import {useParams} from "@solidjs/router";
import {createResource, For} from "solid-js";
import List from "../List/List";


const goToMaps = (address) => {
    window.location.href = `https://www.google.com/maps/dir/?api=1&destination=${address}&travelmode:driving`
}

async function fetchTour(id) {
    const response = await fetch(`http://localhost:8000/api/typicalTours/${id}`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
    });

    if (response.ok) {
        return await response.json();
    } else {
        throw new Error("Something went wrong");
    }
}

const fetchArticles = async () => {
    const response = await fetch("http://localhost:8000/api/articles", {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
    })

    if (response.ok) {
        console.log("ok")
        return await response.json();
    } else {
        throw new Error("Something went wrong");
    }
}

const buildList = (articlesResource, client) => {

    //get the boxes that are not in client.boxes

    return (
        <div>{articlesResource.loading ? <h1>Loading...</h1> :
            <select>
                <For each={articlesResource()}>
                    {article => (
                        <option value={article.name}>
                            {article.name}
                        </option>
                    )}
                </For>
            </select>
            }
        </div>
    )
}
const addBox = (client) => {

    const input = document.createElement("input");
    input.type = "number";
    input.min = 1;
    input.max = 100;
    input.value = 1;

    const button = document.createElement("button");
    button.innerHTML = "Add";

    const [articlesResource] = createResource(() => fetchArticles());

    const div = document.createElement("div");
    const listItems = document.createElement("div");
    listItems.appendChild(buildList(articlesResource, client));

    div.appendChild(listItems);

    div.appendChild(input);
    div.appendChild(button);

    document.body.appendChild(div);
}

const UpdateTypicalTours = () => {
    const params = useParams();

    const [tourResource] = createResource(() => params.id, fetchTour);

    return (
        <div>
            <ul>
                {
                    tourResource.loading ? <h1>Loading...</h1> :
                        <For each={tourResource()}>
                            {client => (
                                <div>
                                    <li>
                                        {client.name}
                                        <img onClick={() => goToMaps(client.address)} className="google-maps-logo"
                                             src="/src/assets/googleMaps.png" alt="maps"/>
                                    </li>
                                    <For each={client.boxes}>
                                        {box => (
                                            <div>
                                                <li>
                                                    {box.article.name} : {box.quantity_box}
                                                </li>
                                                <button onClick={() => updateBox(box)}>Update box</button>
                                            </div>
                                        )}
                                    </For>
                                    <button onClick={() => addBox(client)}>Add box</button>
                                    <button onClick={() => deleteBox(client)}>Delete box</button>
                                    <br/>

                                </div>

                            )}
                        </For>
                }
            </ul>
        </div>
    )
}

export default UpdateTypicalTours;