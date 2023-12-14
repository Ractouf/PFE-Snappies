import { createSignal } from "solid-js";

const Box = ({ box, deleteBox, clientId }) => {
    const [isFormHidden, setIsFormHidden] = createSignal(true);
    const [boxQuantity, setBoxQuantity] = createSignal(box.quantity_box);
    const [currentBox, setCurrentBox] = createSignal(box);

    const toggleForm = () => {
        setIsFormHidden(!isFormHidden());
    }

    async function updateForever(e) {
        e.preventDefault();

        if (boxQuantity() !== "0") {
            setCurrentBox(b => ({...b, quantity_box: boxQuantity()}));

            await fetch(`http://localhost:8000/api/boxesClientsTours/${box.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({
                    quantity_box: boxQuantity(),
                })
            });
        }
    }

    async function updateOnce(e) {
        e.preventDefault();

        const diff = parseInt(boxQuantity()) - parseInt(currentBox().quantity_box);
        if (boxQuantity() !== "0") {
            await fetch(`http://localhost:8000/api/toursBoxesClients`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({
                    quantity_box: diff.toString(),
                    box_id: currentBox().box.id.toString(),
                    client_id: clientId.toString(),
                })
            });
        }
    }

    return (
        <>
            <button onClick = {toggleForm}>Update box</button>
            <p>
                {currentBox().box.quantity_article}x {currentBox().box.article.name} : {currentBox().quantity_box}
            </p>

            <form hidden={isFormHidden()}>
                <input type="submit" onClick = {updateForever} value = "forever"/>
                <input type="submit" onClick = {updateOnce} value = "once"/>

                <input type="number" value={boxQuantity()} onInput={(e) => setBoxQuantity(e.target.value)}/>

                <p>{currentBox().box.article.name}</p>

                <button onClick={(e) => deleteBox(e, currentBox())}>Delete box</button>
            </form>
        </>
    );
};

export default Box;