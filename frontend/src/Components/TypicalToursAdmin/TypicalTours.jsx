import { useParams } from "@solidjs/router";
import {createSignal, For, onMount} from "solid-js";
import ClientTour from "./ClientTour";

const TypicalTours = () => {
    const [tour, setTour] = createSignal([]);
    const [loading, setLoading] = createSignal(true);
    const [boxes, setBoxes] = createSignal([]);
    const [formHidden, setFormHidden] = createSignal(true);
    const [rabQuandity, setRabQuandity] = createSignal("0");
    const [boxId, setBoxId] = createSignal("0");
    const [currentRab, setCurrentRab] = createSignal([]);

    const params = useParams();

    async function fetchTour(id) {
        const response = await fetch(`http://localhost:8000/api/typicalTours/${id}`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        });

        if (response.ok) {
            const res = await response.json();
            setCurrentRab(res.rab);
            setTour(res);
        } else {
            throw new Error("Something went wrong");
        }
    }

    async function fetchBoxes ()  {
        const response = await fetch("http://localhost:8000/api/boxes", {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        })

        if (response.ok) {
            const res = await response.json();
            setBoxes(res);
        } else {
            throw new Error("Something went wrong");
        }
    }

    async function fetchData() {
        await fetchBoxes();
        await fetchTour(params.id);
        setLoading(false);
    }

    onMount(fetchData);

    async function toggleForm() {
        setFormHidden(!formHidden());
    }

    async function addRab(e) {
        e.preventDefault();

        if (rabQuandity() !== "0" || boxId() !== "0") {
            setCurrentRab([...currentRab(), {
                typical_tour_id: params.id,
                quantity_box: rabQuandity(),
                box_id: boxId(),
                box: boxes().find(b => parseInt(b.id) === parseInt(boxId()))
            }]);

            await fetch("http://localhost:8000/api/boxesClientsTours/rab", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({
                    'typical_tour_id': params.id,
                    'quantity_box': rabQuandity(),
                    'box_id': boxId(),
                })
            })
        }
    }

    async function deleteRab(e) {
        e.preventDefault();

        setCurrentRab(currentRab().filter(r => r.id.toString() !== e.target.value.toString()));

        await fetch(`http://localhost:8000/api/boxesClientsTours/${e.target.value.toString()}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
        });
    }

    return (
        <>
            {loading() ?
                <h1>Loading...</h1>
                :
                <>
                    <For each={tour().clients}>
                        {clientTourBox =>
                            <ClientTour
                                tourId = {clientTourBox.id}
                                client = {clientTourBox.client}
                                clientBoxes = {clientTourBox.client.boxes}
                                clientExtras = {clientTourBox.client.extras}
                                existingBoxes= {boxes()}/>
                        }
                    </For>

                    <h1>RAB</h1>

                    <For each = {currentRab()}>
                        {rab =>
                            <>
                                <p>{rab.box.quantity_article}x {rab.box.article.name} : {rab.quantity_box}</p>
                                <button onClick = {deleteRab} value = {rab.id}>Supprimer</button>
                            </>
                        }
                    </For>

                    <button onClick = {toggleForm}>rab</button>

                    <form hidden ={formHidden()}>
                        <input onClick = {addRab} type = "submit" />

                        <input type = "number" onInput = {(e) => setRabQuandity(e.target.value)} />

                        <select onchange={(e) => setBoxId(e.target.value)}>
                            <option value = "0">Choisir une boite</option>
                            <For each = {boxes()}>
                                {box => <option value = {box.id}>{box.quantity_article}x {box.article.name}</option>}
                            </For>
                        </select>
                    </form>
                </>
            }
        </>
    )
}

export default TypicalTours;