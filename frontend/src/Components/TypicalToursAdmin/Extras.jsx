import {For} from "solid-js";

const Extras = ({ extras }) => {

    return (
        <>
            <For each = {extras()}>
                {extra =>
                    <>
                        <p>EXTRA {extra.quantity_box}x {extra.box.article.name} : {extra.box.quantity_article}</p>
                        <button>Supprimer</button>
                    </>
                }
            </For>
        </>
    );
}

export default Extras;