import {createSignal, For, onMount} from "solid-js";
import {useNavigate} from "@solidjs/router";

const Users = () => {
    const [users, setUsers] = createSignal([]);
    const [loading, setLoading] = createSignal(true);
    const navigate = useNavigate();

    async function fetchUsers() {
        const resp = await fetch('http://localhost:8000/api/users', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });

        const data = await resp.json();
        setUsers(data);
        setLoading(false);
    }

    onMount(fetchUsers);

    function goToRegisterUser() {
        navigate('/registerUser');
    }

    function goToModify(id) {
        navigate(`/users/${id}`);
    }

    return (
        <>
            {loading() ?
                <div>Loading...</div>
            :
                <>
                    <For each = {users()}>
                        {user =>
                            <>
                                <button onClick = {() => goToModify(user.id)}>Modifier</button>
                                <p>{user.lastname} {user.firstname}</p>
                                <p>{user.phone}</p>
                            </>
                        }
                    </For>

                    <button onClick = {goToRegisterUser}>Ajouter</button>
                </>
            }
        </>
    );
}

export default Users;