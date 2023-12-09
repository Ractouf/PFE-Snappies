import { createSignal } from 'solid-js';
import {API_BASE_URL} from "../../config";

const fetchTours = async () => {
    const tours = await fetch(`${API_BASE_URL}/typicalTours`, {
        headers: {
            'Authorization': `bearer ${localStorage.getItem('token')}`,
        },
    })

    if (!tours.ok) {
        const errorData = await tours.json();
        throw new Error(errorData.message);
    }

    return tours.json();
}
const TypicalTour = async () => {

    const tours = await fetchTours();
    console.log(tours);

    return (
        <div>
            <h2>Choix tournée</h2>
            <ul>
                {tours().map((item, index) => (
                    <li key={index}>
                        {item}
                        <button onClick={() => removeItem(index)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default TypicalTour;