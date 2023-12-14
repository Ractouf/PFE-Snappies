// page to update a typical tour (admin only)
// (fetch the boxes for each client of that typical tour)
// (the admin can also add new boxes for each client)
// (the admin can also delete boxes for each client)
// (the admin can also update the number of boxes for each client)

import {useParams} from "@solidjs/router";
import {createResource, For} from "solid-js";


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

// update to fetch boxes
const fetchBoxes = async () => {
    const response = await fetch("http://localhost:8000/api/boxes", {
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

const buildList = (boxesResource, ignored) => {
    return (
        <div>{boxesResource.loading ? <h1>Loading...</h1> :
            <select>
                <For each={boxesResource()}>
                    {box => (
                        !ignored.find(b => b.box.article_id === box.article_id) &&
                        <option value={box.id}>
                            {box.article.name}
                        </option>
                    )}
                </For>
            </select>
        }
        </div>
    )
}

// id boxes_client_tour, quantity , box_id
const addBox = (clientTourBox) => {

    const input = document.createElement("input");
    input.type = "number";
    input.min = 1;
    input.max = 100;
    input.value = 1;

    const button = document.createElement("button");
    button.innerHTML = "Add";

    const [boxesResource] = createResource(() => fetchBoxes());

    const div = document.createElement("div");
    const listItems = document.createElement("div");
    listItems.appendChild(buildList(boxesResource, clientTourBox.client.boxes));

    div.appendChild(listItems);

    div.appendChild(input);
    div.appendChild(button);

    document.body.appendChild(div);

    button.addEventListener("click", async () => {
        const select = div.querySelector("select");
        const selectedBox = boxesResource().find(b => b.id === parseInt(select.value));
        const quantity = input.value;

        const response = await fetch(`http://localhost:8000/api/boxesClientsTours/box`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                quantity_box: quantity,
                box_id: selectedBox.id,
                client_tour_id: clientTourBox.id,
            })
        })

        if (response.ok) {
            window.location.reload();
        } else {
            throw new Error("Something went wrong");
        }
    })
}

const deleteBox = async (box) => {
        const response = await fetch(`http://localhost:8000/api/boxesClientsTours/${box.id}`, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        })

        if (response.ok) {
            window.location.reload();
        } else {
            throw new Error("Something went wrong");
        }
    }
;
const updateBox = (boxe) => {
    const input = document.createElement("input");
    input.type = "number";
    input.min = 1;
    input.max = 100;
    input.value = boxe.quantity_box;

    const button = document.createElement("button");
    button.innerHTML = "Update";

    const div = document.createElement("div");
    div.appendChild(input);
    div.appendChild(button);

    document.body.appendChild(div);

    button.addEventListener("click", async () => {
        const quantity = input.value;

        const response = await fetch(`http://localhost:8000/api/boxesClientsTours/${boxe.id}`, {
            method: "PATCH",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                quantity_box: quantity,
            })
        })

        if (response.ok) {
            window.location.reload();
        } else {
            throw new Error("Something went wrong");
        }
    })
};
const addExtra = (clientTourBox) => {
    const input = document.createElement("input");
    input.type = "number";
    input.min = 1;
    input.max = 100;
    input.value = 1;

    const button = document.createElement("button");
    button.innerHTML = "Add";

    const [boxesResource] = createResource(() => fetchBoxes());

    const div = document.createElement("div");
    const listItems = document.createElement("div");
    listItems.appendChild(buildList(boxesResource, []));

    div.appendChild(listItems);

    div.appendChild(input);
    div.appendChild(button);

    document.body.appendChild(div);

    button.addEventListener("click", async () => {
        const select = div.querySelector("select");
        const selectedBox = boxesResource().find(b => b.id === parseInt(select.value));
        const quantity = input.value;

        const response = await fetch(`http://localhost:8000/api/toursBoxesClients`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                client_id: clientTourBox.client.id,
                box_id: selectedBox.id,
                quantity_box: quantity,
            })
        })

        if (response.ok) {
            //console.log(await response)
            window.location.reload();
        } else {
            throw new Error("Something went wrong");
        }
    })
};
const choseAddType = (clientTourBox) => {

    // ask if user want to add a new box or an extra box
    const div = document.createElement("div");
    const button1 = document.createElement("button");
    const button2 = document.createElement("button");

    button1.innerHTML = "Ajouter un article de façon permanente";
    button2.innerHTML = "Ajouter un article pour la prochaine tournée";

    div.appendChild(button1);
    div.appendChild(button2);

    document.body.appendChild(div);

    button1.addEventListener("click", () => {
        addBox(clientTourBox);
    })

    button2.addEventListener("click", () => {
        addExtra(clientTourBox);
    })
};
const UpdateTypicalTours = () => {
    const params = useParams();

    const [tourResource] = createResource(() => params.id, fetchTour);

    return (
        <div>
            <ul>
                {
                    tourResource.loading ? <h1>Loading...</h1> :
                        <For each={tourResource()}>
                            {clientTourBox => (
                                <div>
                                    <li>
                                        {clientTourBox.client.name}
                                        <img onClick={() => goToMaps(clientTourBox.client.address)}
                                             className="google-maps-logo"
                                             src="/src/assets/googleMaps.png" alt="maps"/>
                                    </li>
                                    <For each={clientTourBox.client.boxes}>
                                        {boxe => (
                                            <div>
                                                <li>
                                                    {boxe.box.article.name} : {boxe.quantity_box}
                                                </li>
                                                <button onClick={() => updateBox(boxe)}>Update box</button>
                                                <button onClick={() => deleteBox(boxe)}>Delete box</button>
                                            </div>
                                        )}
                                    </For>
                                    <button onClick={() => choseAddType(clientTourBox)}>Add box</button>
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