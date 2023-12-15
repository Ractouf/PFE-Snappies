import Boxes from "./Boxes";
import { createSignal, For } from "solid-js";
import Extras from "./Extras";
import "./ClientTour.css";

const ClientTour = ({ tourId, client, clientBoxes, existingBoxes, clientExtras }) => {
    const [isFormHidden, setIsFormHidden] = createSignal(true);
    const [nbBoxes, setNbBoxes] = createSignal("0");
    const [boxId, setBoxId] = createSignal("0");
    const [boxes, setBoxes] = createSignal(clientBoxes);
    const [extras, setExtras] = createSignal(clientExtras);

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
            const resp = await fetch("http://localhost:8000/api/toursBoxesClients", {
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

            setExtras([...extras(), await resp.json()]);
        }
    }

    return (
        <div class = "nth">
            <div class = "client">
                <h2 class = "box-owner">{client.name}</h2>
                <img class="google-maps-logo" onClick={() => goToMaps(client.address)} class = "google-maps-logo" src = "/src/assets/googleMaps.png" alt = "maps"/>
            </div>

            <div class = "box-owner-detail">
                <Extras extras = {extras} />
                <Boxes boxes = {boxes} setBoxes = {setBoxes} setExtras = {setExtras} clientId = {client.id}/>

                <button class = "add-article" onClick = {toggleForm}>+</button>

                <form hidden = {isFormHidden()}>
                    <div class="client">
                        <div class= "modifier-div">
                            <input onClick={boxForever} type="submit" value="toujours"/>
                            <input onClick={boxOnce} type="submit" value="une fois"/>
                        </div>
                        <div class = "pas-client-details">
                        <input class="add-box-quantity" type="number" onInput={(e) => setNbBoxes(e.target.value)}/>

                        <select class="add-box-select" onChange={(e) => setBoxId(e.target.value)}>
                            <option value="0">Choisir une boite</option>
                            <For each={existingBoxes}>
                                {box => <option value={box.id}>{box.quantity_article}x {box.article.name}</option>}
                            </For>
                        </select>
                        </div>
                    </div>
                </form>
            </div>

        </div>
    );
}

export default ClientTour;