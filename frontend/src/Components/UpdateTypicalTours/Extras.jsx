import {For} from "solid-js";


const Extras = ({ extras }) => {

    return (
        <>
            <For each = {extras()}>
                {extra => <p style = "color:red;">{extra.quantity_box}x {extra.box.article.name}</p>}
            </For>
        </>
    );
}

export default Extras;