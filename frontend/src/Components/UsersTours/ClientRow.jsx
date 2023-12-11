import {createResource} from "solid-js";
import Client from "./Client";

const ClientRow = ({ client }) => {
    async function fetchArticles() {
        const response = await fetch("http://localhost:8000/api/articles", {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        });

        if (!response.ok) {
            console.log(`HTTP error! status: ${response.status}`);
        } else {
            return await response.json();
        }
    }

    const [articles] = createResource(fetchArticles);

    function removeArticle(event) {
        const article = event.target.parentNode;
        const boxes = event.target.parentNode.parentNode;

        boxes.removeChild(article);
    }

    function addArticle(e) {
        e.preventDefault();
        const boxes = document.querySelector(`.boxes`);

        boxes.appendChild(
            <div class = "article">
                <input type= "number" min = "0" value = "0"/>
                {addSelect()}
                <button onclick = {removeArticle}>-</button>
            </div>
        )
    }

    function addSelect(article) {
        const select = document.createElement("select");

        articles().forEach(article => {
            const option = document.createElement("option");
            option.value = article.name;
            option.innerHTML = article.name;
            select.appendChild(option);
        });

        if (article)
            select.value = article.name;

        return select;
    }

    function hide(event) {
        event.preventDefault();
        if (event.target === event.currentTarget) {
            const element = document.querySelector(`.validate`);
            element.classList.add("hidden");
        }
    }

    function validateClient(client) {
        const element = document.querySelector(`.validate`);
        const boxes = document.createElement("div");
        boxes.classList.add("boxes");

        element.innerHTML = "";

        const content = client.boxes.map(box => {
            return (
                <div class = "article">
                    <input type= "number" min = "0" value = {box.quantity}/>
                    {addSelect(box.article)}
                    <button onclick = {removeArticle}>-</button>
                </div>
            );
        });
        content.forEach(item => boxes.appendChild(item));

        const form = document.createElement("form");
        form.classList.add("validate-form");
        form.appendChild(boxes);
        form.appendChild(<button onclick = {addArticle}>Ajouter un article</button>);
        form.appendChild(
            <div class = "confirm">
                <button onClick={hide}>Annuler</button>
                <button onClick={addArticle}>Confirmer</button>
            </div>
        );

        element.appendChild(form);
        element.classList.remove("hidden");
    }

    return (
        <li class = "client-row">
            <div onClick = {() => validateClient(client)} class = "client-row-item">
                <Client client = {client} />
            </div>
        </li>
    )
};

export default ClientRow;
