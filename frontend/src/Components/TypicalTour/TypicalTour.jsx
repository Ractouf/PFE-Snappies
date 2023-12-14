import {createResource, createSignal} from 'solid-js';
import {useNavigate} from "@solidjs/router";
import {API_BASE_URL} from "../../config";
import button from "../Button/Button";

const TypicalTour = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    const [isFormVisible, setFormVisible] = createSignal(false);
    const [tourName, setTourName] = createSignal();

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

    const toggleForm = () => {
        setFormVisible(!isFormVisible());
    }

    const createTour = async () => {
        const requestBody = JSON.stringify({name: tourName()});

        const createTypicalTour = await fetch(`${API_BASE_URL}/typicalTours`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: requestBody,
        })

        if (!createTypicalTour.ok) {
            const errorData = await createTypicalTour.json();
            throw new Error(errorData.message);
        }

        const rep = await createTypicalTour.json();
        navigate(`/UpdateTypicalTour/${rep.id}`)
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
            navigate(`/UpdateTypicalTour/${rep.id}`)
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
            {user.is_admin && (
                <div>
                    <button onClick={toggleForm}>Ajouter tournée</button>
                    <form hidden={!isFormVisible()}>
                        <input id="nameTour" type="text" placeholder="Nom de la tournée" onInput={(e) => setTourName(e.target.value)}
                        />
                        <button onClick={() => createTour()}>Confirmer</button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default TypicalTour;