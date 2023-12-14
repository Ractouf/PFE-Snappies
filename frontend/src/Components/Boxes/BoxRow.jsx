import {createSignal, For} from "solid-js";

const BoxRow = ({ box, articles, setBoxes }) => {
    const [quantity, setQuantity] = createSignal(box.quantity_article);
    const [name, setName] = createSignal(box.article.id);
    const [articleName, setArticleName] = createSignal(box.article.name);
    const [isFormHidden, setFormHidden] = createSignal(true);
    const [isSubmitting, setSubmitting] = createSignal(false);

    function modifyBox() {
        setFormHidden(!isFormHidden());
    }

    async function formSubmit(e) {
        e.preventDefault();

        setSubmitting(true);

        const response = await fetch(`http://localhost:8000/api/boxes/${box.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
            body: JSON.stringify({
                quantity_article: quantity(),
                article_id: name()
            })
        });

        if (!response.ok) {
            console.log(`HTTP error! status: ${response.status}`);
        } else {
            await response.json();

            setBoxes(boxes => boxes.map(b => b.id === box.id ? {...b, quantity_article: quantity(), article_id: name(), article: {...b.article, name: articleName(), id: name()}} : b));
        }

        setSubmitting(false);
    }

    async function deleteBox() {
        setBoxes(boxes => boxes.filter(b => b.id !== box.id));

        await fetch(`http://localhost:8000/api/boxes/${box.id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        });
    }

    return (
        <div class = "box-row">
            <div class = "box-content">
                <div class="modify-box">
                    <button onClick = {modifyBox}>Modifier</button>
                </div>

                <h2>{box.quantity_article}</h2>
                <h2>{box.article.name}</h2>
            </div>

            <form hidden = {isFormHidden()} onSubmit = {formSubmit}>
                {!isSubmitting() && <input type = "submit" disabled = {isSubmitting()} value="→"/>}

                {isSubmitting() && <p>Chargement...</p>}

                <input min = "0" type = "number" value={quantity()} oninput={(e) => setQuantity(e.target.value)}/>

                <select value = {name()} onchange={(e) => { setName(e.target.value); setArticleName(e.target.options[e.target.selectedIndex].text) }}>
                    <For each = {articles()}>
                        {article => <option value = {article.id}>{article.name}</option>}
                    </For>
                </select>

                <button onClick = {deleteBox}>X</button>
            </form>
        </div>
    )
};

export default BoxRow;