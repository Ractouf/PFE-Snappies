import {createSignal, For, onMount} from "solid-js";
import ArticleRow from "./ArticleRow";
import "./Articles.css";

const Articles = () => {
    const [inputValue, setInputValue] = createSignal("");
    const [articles, setArticles] = createSignal([]);
    const [loading, setLoading] = createSignal(true);
    const [isSubmitting, setSubmitting] = createSignal(false);
    const [isFormVisible, setFormVisible] = createSignal(true);

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
            setLoading(false);
        }
    }

    async function addArticle(e) {
        e.preventDefault();

        if (inputValue().length > 0) {
            setSubmitting(true);

            const response = await fetch(`http://localhost:8000/api/articles`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                },
                body: JSON.stringify({name: inputValue()})
            });

            if (!response.ok) {
                console.log(`HTTP error! status: ${response.status}`);
            } else {
                await response.json();
            }

            await fetchArticles();
            setInputValue("");
            setSubmitting(false);
        }
    }

    onMount(fetchArticles);

    function toggleForm() {
        setFormVisible(!isFormVisible());
    }

    return (
        <div class="articles">
            {loading() ?
                <div class="load-page"><img src="/src/assets/loading.gif" alt="chargement..." className="load"/></div>
                :
                articles().length > 0 ?
                    <>
                        <For each={articles()}>
                            {article => <ArticleRow article={article} setArticles = {setArticles}></ArticleRow>}
                        </For>
                    </>
                    :
                    <p>Aucun article, voulez vous en ajouter ?</p>
            }
            <button class = "add-article" onClick = {toggleForm}>+</button>
            <form hidden={isFormVisible()}>
                    {!isSubmitting() && <input class="articles-add-confirm" onClick={addArticle} type="submit" value="→"
                                               disabled={isSubmitting()}/>}
                    {isSubmitting() && <img class = "load" src="/src/assets/loading.gif" alt="envoie"/>}
                    <input class="articles-text-input" type="text" value={inputValue()}
                           onInput={(e) => setInputValue(e.target.value)}/>
            </form>
        </div>
);
}

export default Articles;