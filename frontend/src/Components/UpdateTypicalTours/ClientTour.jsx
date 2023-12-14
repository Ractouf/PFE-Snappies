import Boxes from "./Boxes";
import { createSignal, For } from "solid-js";

const ClientTour = ({ tourId, client, clientBoxes, existingBoxes, fetchData }) => {
    const [isFormHidden, setIsFormHidden] = createSignal(true);
    const [nbBoxes, setNbBoxes] = createSignal("0");
    const [boxId, setBoxId] = createSignal("0");
    const [boxes, setBoxes] = createSignal(clientBoxes);

    const goToMaps = (address) => {
        window.location.href = `https://www.google.com/maps/dir/?api=1&destination=${address}&travelmode:driving`
    }

    function toggleForm() {
        setIsFormHidden(!isFormHidden());
    }

    async function boxForever(e) {
        e.preventDefault();

        if (nbBoxes() !== "0" || boxId() !== "0") {
            const resp = await fetch("http://localhost:8000/api/boxesClientsTours/box", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({
                    box_id: boxId(),
                    quantity_box: nbBoxes(),
                    client_tour_id: tourId,
                })
            });

            setBoxes([...boxes(), await resp.json()]);
        }
    }

    async function boxOnce(e) {
        e.preventDefault();

        if (nbBoxes() !== "0" || boxId() !== "0") {
            console.log(boxId(), nbBoxes(), client.id);
            await fetch("http://localhost:8000/api/toursBoxesClients", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({
                    client_id: client.id.toString(),
                    box_id: boxId().toString(),
                    quantity_box: nbBoxes().toString(),
                })
            });

            await fetchData();
        }
    }

    return (
        <div>
            <h2>{client.name}</h2>
            <img onClick={() => goToMaps(client.address)} class = "google-maps-logo" src = "/src/assets/googleMaps.png" alt = "maps"/>

            <Boxes boxes = {boxes} setBoxes = {setBoxes} clientId = {client.id}/>

            <button onClick = {toggleForm}>+</button>

            <form hidden = {isFormHidden()}>
                <input type = "number" onInput={(e) => setNbBoxes(e.target.value)}/>

                <select onChange={(e) => setBoxId(e.target.value)}>
                    <option value="0">Choisir une boite</option>
                    <For each={existingBoxes}>
                        {box => <option value={box.id}>{box.quantity_article}x {box.article.name}</option>}
                    </For>
                </select>

                <input onClick = {boxForever} type = "submit" value = "forever"/>
                <input onClick = {boxOnce} type = "submit" value = "once"/>
            </form>
        </div>
    );
}

export default ClientTour;