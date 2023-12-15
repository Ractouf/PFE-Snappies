import {For} from "solid-js";

const Extras = ({ extras }) => {

    return (

        <div class = "box-owner">
            <For each = {extras()}>
                {extra =>
                    <div class = "pas-client">
                        <p class = "modify-extra">{extra.quantity_box}x{extra.box.quantity_article} {extra.box.article.name}</p>
                        <button class = "remove-btn">X</button>
                    </div>
                }
            </For>
        </div>
    );
}

export default Extras;