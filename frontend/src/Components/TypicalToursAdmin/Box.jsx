import { createSignal } from "solid-js";

const Box = ({ box, deleteBox, clientId, setExtras }) => {
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
            setExtras(extras => [...extras, {
                box: currentBox().box,
                quantity_box: diff,
            }]);

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
        <div>
            <div class = "pas-client">
                <div class = "modifier-div">
                    <button onClick = {toggleForm}>Modifier</button>
                </div>
                <p>
                    {currentBox().quantity_box}x{currentBox().box.quantity_article} {currentBox().box.article.name}
                </p>
            </div>

            <form hidden={isFormHidden()}>
                <div className="client">
                    <div className="modifier-div">
                        <input type="submit" onClick={updateForever} value="toujours"/>
                        <input type="submit" onClick={updateOnce} value="une fois"/>
                    </div>
                    <div className="pas-client-details">
                        <div class = "pas-article">
                            <div class = "pas-article-details">
                                <input type="number" value={boxQuantity()} onInput={(e) => setBoxQuantity(e.target.value)}/>
                                <p>{currentBox().box.article.name}</p>
                            </div>
                        </div>
                    </div>
                    <button class="remove-btn" onClick={(e) => deleteBox(e, currentBox())}>X</button>
                </div>
            </form>
</div>
    );
};

export default Box;