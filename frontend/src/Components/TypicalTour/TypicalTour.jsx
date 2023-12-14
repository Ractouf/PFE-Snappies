import {createResource} from 'solid-js';
import {useNavigate} from "@solidjs/router";
import {API_BASE_URL} from "../../config";
import button from "../Button/Button";

const TypicalTour = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const fetchTours = async () => {
        const tours = await fetch(`${API_BASE_URL}/typicalTours`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        })

        if (!tours.ok) {
            const errorData = await tours.json();
            throw new Error(errorData.message);
        } else {
            return await tours.json();
        }
    }

    const handleClick = async (idTournee) => {

        const userId = user.id

        if (user.is_admin) {
            navigate(`/UpdateTypicalTour/${idTournee}`);
        } else {
            const requestBody = JSON.stringify({delivery_driver_id: userId, typical_tour_id: idTournee});

            const linkDeliveryDriverTours = await fetch(`${API_BASE_URL}/tours`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: requestBody,
            })

            if (!linkDeliveryDriverTours.ok) {
                const errorData = await linkDeliveryDriverTours.json();
                throw new Error(errorData.message);
            }

            const rep = await linkDeliveryDriverTours.json();
            navigate(`/tours/${rep.id}`)
        }
    }

    const [tours] = createResource(fetchTours);

    return (
        <div>
            <h2>Choix tournée</h2>
            {!tours.loading ?
                <ul>
                    {tours().map((item) => (
                        <li onClick={() => handleClick(item.id)}>
                            <h4>{item.name}</h4>
                            {user.is_admin ?
                                <button> modfier </button> :
                                <button> selectionner </button>}
                        </li>
                    ))}
                </ul>
                :
                <h1 class="loading"> Chargement...</h1>
            }
        </div>
    )
}

export default TypicalTour;