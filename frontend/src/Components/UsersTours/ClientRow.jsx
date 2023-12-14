import {createSignal, For} from "solid-js";
import Client from "./Client";
import Box from "./Box";

const ClientRow = ({ client, extra, setExtra, tour, fetchTours }) => {
    const [boxes, setBoxes] = createSignal(client.boxes);
    const [showArticles, setShowArticles] = createSignal(false);
    const [isSubmitted, setIsSubmitted] = createSignal(false);

    const toggleArticles = () => {
        setShowArticles(!showArticles());
    };

    const addArticle = () => {
        if (extra().length !== 0) {
            setBoxes([...boxes(), {
                box_id: extra()[0].box_id,
                article: extra()[0].article,
                quantity_article: extra()[0].quantity_article,
                quantity_box: "0"
            }]);
        }
    };

    const removeArticle = (index) => {
        const removedBox = boxes()[index];
        console.log(removedBox)

        if (removedBox.article !== undefined) {
            const extraBox = extra().find(box => box.article === removedBox.article);
            if (extraBox) {
                extraBox.quantity_box = parseInt(extraBox.quantity_box, 10) + parseInt(removedBox.quantity_box, 10);
            } else {
                setExtra([...extra(), removedBox]);
            }
        }
        console.log(extra())

        setBoxes(boxes().filter((_, i) => i !== index));
    };

    const allBoxesDelivered = client.boxes.every(box => box.is_delivered);

    async function deliverClient() {
        setIsSubmitted(true);
        const combinedArray = [...boxes(), ...client.extras];

        const boxesToDeliver = combinedArray.map(box => {
            return {
                box_id: box.box_id,
                quantity_box: parseInt(box.quantity_box, 10),
            }
        });

        const requestBody = {
            boxesDelivered: boxesToDeliver
        };

        const response = await fetch(`http://localhost:8000/api/toursBoxes/${tour.tour_id}/${client.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
            body: JSON.stringify(requestBody)
        });

        await response.json();
        await fetchTours(tour.tour_id);

        setIsSubmitted(false);
    }

    return (
        <div class = "nth">
            <div onClick={toggleArticles} >
                <Client client={client} />
            </div>

            {showArticles() && (
                <div class = "client-details">
                    <div class = "client-articles">
                        <For each = {client.extras}>
                            {extra => <h4 class = "extra">{extra.quantity_box}x {extra.article}</h4>}
                        </For>
                        <For each = {boxes()}>
                            {(box, index) => !allBoxesDelivered ?
                                <Box box = {box} extra = {extra} setExtra = {setExtra} removeArticle = {removeArticle} index = {index} setBoxes = {setBoxes}/>
                                :
                                <h4>{box.quantity_box}x {box.article}</h4>
                            }
                        </For>
                    </div>

                    <div class = "client-confirmation">
                        {!allBoxesDelivered &&
                            <>
                                <button class="add" onClick={addArticle}>+</button>
                                <button class="confirm-add" onClick={deliverClient} disabled = {isSubmitted()}>Confirmer</button>
                                {isSubmitted() && <div class = "loading">Chargement...</div>}
                            </>
                        }
                    </div>
                </div>
            )}
        </div>
    );
};

export default ClientRow;