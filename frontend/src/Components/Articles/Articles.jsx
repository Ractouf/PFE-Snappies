import {createSignal, For, onMount} from "solid-js";
import ArticleRow from "./ArticleRow";
import "./Articles.css";

const Articles = () => {
    const [inputValue, setInputValue] = createSignal("");
    const [articles, setArticles] = createSignal([]);
    const [loading, setLoading] = createSignal(true);
    const [isSubmitting, setSubmitting] = createSignal(false);

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

    return (
        <div class="articles">
            {loading() ?
                <h2>Chargement ...</h2>
                :
                articles().length > 0 ?
                    <>
                        <For each={articles()}>
                            {article => <ArticleRow article={article} setArticles = {setArticles}></ArticleRow>}
                        </For>
                    </>
                    :
                    <h2>Aucun article, voulez vous en ajouter ?</h2>
            }
            <form>
                <input type="text" value={inputValue()} onInput={(e) => setInputValue(e.target.value)}/>
                <input onClick={addArticle} type="submit" value="Ajouter un article" disabled={isSubmitting()}/>
                {isSubmitting() && <p>Envoi...</p>}
            </form>
        </div>
    );
}

export default Articles;