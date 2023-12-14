import {createSignal} from "solid-js";

const ArticleRow = ({ article, setArticles }) => {
    const [inputValue, setInputValue] = createSignal(article.name);
    const [isFormHidden, setFormHidden] = createSignal(true);
    const [isSubmitting, setSubmitting] = createSignal(false);

    function modifyArticle() {
        setFormHidden(!isFormHidden());
    }

    async function formSubmit(e) {
        e.preventDefault();
        setSubmitting(true);

        const response = await fetch(`http://localhost:8000/api/articles/${article.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
            body: JSON.stringify({ name: inputValue() })
        });

        if (!response.ok) {
            console.log(`HTTP error! status: ${response.status}`);
        } else {
            await response.json();
            setArticles(articles => articles.map(a => a.id === article.id ? {...a, name: inputValue()} : a));
        }

        setSubmitting(false);
    }

    async function deleteArticle() {
        setArticles(articles => articles.filter(a => a.id !== article.id));

        await fetch(`http://localhost:8000/api/articles/${article.id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        });
    }

    return (
        <div class="article-row">
            <div class="article-content">
                <di class="modifier-div">
                    <button onClick={modifyArticle}>Modifier</button>
                </di>
                <h2>{article.name}</h2>
            </div>

            <form hidden={isFormHidden()} onSubmit={formSubmit}>
                {!isSubmitting() &&
                    <input className="articles-add-confirm" type="submit" disabled={isSubmitting()} value="→"/>}

                {isSubmitting() && <img src="/src/assets/loading.gif" alt="chargement" class="load"/>}

                <input class="articles-text-input" type="text" value={inputValue()} oninput={(e) => setInputValue(e.target.value)}/>

                <button class = "remove-btn" onClick={deleteArticle}>X</button>
            </form>
        </div>
    );
}

export default ArticleRow;