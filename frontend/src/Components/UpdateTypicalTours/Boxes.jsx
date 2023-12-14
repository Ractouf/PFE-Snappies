import {createSignal, For} from "solid-js";
import Box from "./Box";

const Boxes = ({ clientBoxes, fetchData }) => {

    /*const deleteBox = async (e, box) => {
        // delete pour ce tour pour ce client cette boite
        e.preventDefault();
        console.log(box)
        /!*const response = await fetch(`http://localhost:8000/api/boxesClientsTours/${box.id}`, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        })

        if (response.ok) {
            window.location.reload();
        } else {
            throw new Error("Something went wrong");
        }*!/
    };
    const updateBox = (box) => {
        // update pour ce tour pour ce client cette boite
        console.log(box);
        /!*const input = document.createElement("input");
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
        })*!/
    };*/

    return (
        <For each = {clientBoxes}>
            {box => <Box box = {box} fetchData = {fetchData}/>}
        </For>
    );
}

export default Boxes;