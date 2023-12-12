import {createSignal, For} from "solid-js";
import Client from "./Client";
import Box from "./Box";

const ClientRow = ({ client, extra, setExtra }) => {
    const [boxes, setBoxes] = createSignal(client.boxes);
    const [showArticles, setShowArticles] = createSignal(false);

    const toggleArticles = () => {
        setShowArticles(!showArticles());
    };

    const addArticle = () => {
        if (extra().length !== 0) {
            setBoxes([...boxes(), {
                article: extra()[0].article,
                quantity_article: "0",
                quantity_box: "0"
            }]);
        }
    };

    const removeArticle = (index) => {
        const removedBox = boxes()[index];
        setBoxes(boxes().filter((_, i) => i !== index));

        if (removedBox.article !== undefined) {
            const extraBox = extra().find(box => box.article === removedBox.article);
            if (extraBox) {
                extraBox.quantity_box = parseInt(extraBox.quantity_box, 10) + parseInt(removedBox.quantity_box, 10);
            } else {
                setExtra([...extra(), removedBox]);
            }
        }
    };

    const allBoxesDelivered = client.boxes.every(box => box.is_delivered);

    return (
        <div class = "nth">
            <div onClick={toggleArticles} >
                <Client client={client} />
            </div>

            {showArticles() && (
                <div class = "client-details">
                    <div class = "client-articles">
                        <For each = {boxes()}>
                            {(box, index) => !allBoxesDelivered ?
                                <Box box = {box} extra = {extra} setExtra = {setExtra} removeArticle = {removeArticle} index = {index}/>
                                :
                                <h4>{box.quantity_box}x {box.article}</h4>
                            }
                        </For>
                    </div>

                    <div class = "client-confirmation">
                        {!allBoxesDelivered &&
                            <>
                                <button onClick={addArticle}>Ajouter un article</button>
                                <button>Confirmer</button>
                            </>
                        }
                    </div>
                </div>
            )}
        </div>
    );
};

export default ClientRow;