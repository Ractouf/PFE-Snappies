import {For} from "solid-js";
import Box from "./Box";

const Boxes = ({ boxes, setBoxes, clientId }) => {

    async function deleteBox(e, box) {
        e.preventDefault();

        setBoxes(boxes().filter(b => b.id !== box.id));

        await fetch(`http://localhost:8000/api/boxesClientsTours/${box.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
        });
    }

    return (
        <For each = {boxes()}>
            {box => <Box box = {box} deleteBox = {deleteBox} clientId = {clientId}/>}
        </For>
    );
}

export default Boxes;