import {createResource} from 'solid-js';
import {useNavigate} from "@solidjs/router";
import {API_BASE_URL} from "../../config";

const TypicalTour = () => {
    const navigate = useNavigate();

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
        const user = JSON.parse(localStorage.getItem('user'));

        const userId = user.id

        if (user.is_admin) {
            navigate(`${API_BASE_URL}/${idTournee}`);
        } else {
            const requestBody = JSON.stringify({userId, idTournee});

            const linkDeliveryDriverTours = await fetch(`${API_BASE_URL}/tours`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: requestBody,
            })

            if (!linkDeliveryDriverTours.ok) {
                const errorData = await linkDeliveryDriverTours.json();
                throw new Error(errorData.message);
            }

            navigate(`${API_BASE_URL}/${idTournee}/${userId}/${Date.now()}`)
        }
    }

    const [tours] = createResource(fetchTours);

    return (
        <div>
            <h2>Choix tournée</h2>
            {!tours.loading ?
                <ul>
                    {tours().map((item) => (
                        <li>
                            <a href="#" onClick={() => handleClick(item.id)}>
                                {item.name}
                            </a>
                        </li>
                    ))}
                </ul>
                :
                <h1 class = "loading"> Chargement...</h1>
            }
        </div>
    )
}

export default TypicalTour;