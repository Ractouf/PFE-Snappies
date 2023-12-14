import {createSignal, For, onMount} from "solid-js";
import BoxRow from "./BoxRow";

const Boxes = () => {
    const [loading, setLoading] = createSignal(true);
    const [boxes, setBoxes] = createSignal([]);
    const [articles, setArticles] = createSignal([]);
    const [isFormVisible, setFormVisible] = createSignal(true);
    const [isSubmitting, setSubmitting] = createSignal(false);
    const [quantiteArticle, setQuantiteArticle] = createSignal('1');
    const [idArticle, setIdArticle] = createSignal('1');

    async function fetchBoxes() {
        const response = await fetch(`http://localhost:8000/api/boxes`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        });

        if (!response.ok) {
            console.log(`HTTP error! status: ${response.status}`);
        } else {
            const res = await response.json();
            setBoxes(res);
        }
    }
    async function fetchArticles() {
        const response = await fetch(`http://localhost:8000/api/articles`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        });

        if (!response.ok) {
            console.log(`HTTP error! status: ${response.status}`);
        } else {
            const res = await response.json();
            setArticles(res);
        }
    }

    async function fetchContent() {
        await fetchBoxes();
        await fetchArticles();

        setLoading(false);
    }

    onMount(fetchContent);

    function toggleForm() {
        setFormVisible(!isFormVisible());
    }

    async function addBox(e) {
        e.preventDefault();

        setSubmitting(true);

        const response = await fetch(`http://localhost:8000/api/boxes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
            body: JSON.stringify({
                quantity_article: quantiteArticle(),
                article_id: idArticle()
            })
        });

        if (!response.ok) {
            console.log(`HTTP error! status: ${response.status}`);
        } else {
            await response.json();
        }

        await fetchBoxes();
        setIdArticle("1");
        setQuantiteArticle("1");
        setSubmitting(false);
    }

    return (
        <div class="boxes">
            {loading() ?
                <p>chargement...</p>
                :
                boxes().length > 0 ?
                    <>
                        <For each={boxes()}>
                            {box => <BoxRow box={box} articles={articles} setBoxes={setBoxes}/>}
                        </For>
                    </>
                    : <p>Vous n'avez pas encore de boites</p>
            }

            <button onClick={toggleForm}>+</button>

            <form hidden={isFormVisible()} onSubmit = {addBox}>
                <input type = "submit" disabled = {isSubmitting()}/>

                {isSubmitting() && <p>Chargement...</p>}
                <input type = "number" min = "1" value = {quantiteArticle()} onInput={(e) => setQuantiteArticle(e.target.value)}/>

                <select disabled = {isSubmitting()} value = {idArticle()} onchange={(e) => setIdArticle(e.target.value)}>
                    <For each = {articles()}>
                        {article => <option value = {article.id}>{article.name}</option>}
                    </For>
                </select>
            </form>
        </div>
    );
};

export default Boxes;