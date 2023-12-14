import { createSignal, For, onMount } from "solid-js";

const Box = ({ box, fetchData }) => {
    const [isFormHidden, setIsFormHidden] = createSignal(true);
    const [boxQuantity, setBoxQuantity] = createSignal(box.quantity_box);

    const toggleForm = () => {
        setIsFormHidden(!isFormHidden());
    }

    async function updateForever(e) {
        e.preventDefault();

        if (boxQuantity() !== "0") {
            await fetch(`http://localhost:8000/api/boxesClientsTours/${box.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({
                    quantity_box: boxQuantity(),
                })
            })

            await fetchData();
        }
    }

    async function deleteBox(e) {
        e.preventDefault();

        await fetch(`http://localhost:8000/api/boxesClientsTours/${box.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
        });

        await fetchData();
    }

    return (
        <>
            <button onClick = {toggleForm}>Update box</button>
            <p>
                {box.box.quantity_article}x {box.box.article.name} : {box.quantity_box}
            </p>

            <form hidden={isFormHidden()}>
                <input type="submit" onClick = {updateForever}/>

                <input type="number" value={boxQuantity()} onInput={(e) => setBoxQuantity(e.target.value)}/>

                <p>{box.box.article.name}</p>

                <button onClick={(e) => deleteBox(e, box)}>Delete box</button>
            </form>
        </>
    );
};

export default Box;