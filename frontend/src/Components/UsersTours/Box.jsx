import {createSignal, createEffect, For} from "solid-js";

const Box = ({ box, extra, setExtra,removeArticle, index }) => {
    const [totalBox, setTotalBox] = createSignal(0);
    const [boxQuantity, setboxQuantity] = createSignal(box.quantity_box);
    const [article, setArticle] = createSignal(box.article);

    createEffect(() => {
        let total = parseInt(boxQuantity(), 10);
        if (extra()) {
            const extraBox = extra().find(ex => ex.article === article());
            if (extraBox) {
                total += parseInt(extraBox.quantity_box, 10);
            }
        }

        setTotalBox(total);
    });

    const handleQuantityChange = (event) => {
        const newQuantity = parseInt(event.target.value, 10);
        const oldQuantity = parseInt(boxQuantity(), 10);
        const difference = newQuantity - oldQuantity;

        setboxQuantity(newQuantity.toString());

        const extraBox = extra().find(ex => ex.article === article());
        if (extraBox) {
            const res = parseInt(extraBox.quantity_box, 10) - difference;
            extraBox.quantity_box = res.toString();

            if (res === 0) {
                setExtra(extra().filter(ex => ex.article !== article()));
            }
        } else {
            const res = 0 - difference;
            setExtra([...extra(), { article: article(), quantity_box: res.toString(), quantity_article: box.quantity_article }]);
        }
    };

    const handleSelectChange = (event) => {
        const selectedArticle = event.target.value;

        const newBox = extra().find(ex => ex.article === selectedArticle);
        if (newBox) {
            const existingBox = extra().find(ex => ex.article === article());
            if (existingBox) {
                existingBox.quantity_box = (parseInt(existingBox.quantity_box, 10) + parseInt(boxQuantity(), 10)).toString();
                existingBox.quantity_article = (parseInt(existingBox.quantity_article, 10) + parseInt(box.quantity_article, 10)).toString();
            } else {
                setExtra([...extra(), { ...box }]);
            }

            setArticle(newBox.article);
            setboxQuantity("0");
            box.quantity_article = newBox.quantity_article;
        }
    };

    return (
        <div class = "article">
            <input type="number" min="0" max={totalBox()} value={boxQuantity()} onChange={handleQuantityChange}/>
            <select onChange={handleSelectChange}>
                <option value={article()}>{article()}</option>
                <For each = {extra()}>
                    {b => b.article !== article() && <option value={b.article}>{b.article}</option>}
                </For>
            </select>
            <button onClick={() => removeArticle(index())}>-</button>
        </div>
    )
};

export default Box;