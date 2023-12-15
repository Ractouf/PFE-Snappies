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
                <div class="load-page"><img src="/src/assets/loading.gif" alt="chargement..." class="load"/></div>
                :
                <>
                    <For each={users()}>
                        {user =>
                            <div class = "article-row">
                                <div class = "article-content">
                                <div class = 'modifier-div'>
                                <button onClick = {() => goToModify(user.id)}>Modifier</button>
                                </div>
                                    <div class = "client-info">
                                        <p>{user.lastname} {user.firstname}</p>
                                        <p class = "adress">{user.phone}</p>
                                    </div>
                                </div>

                            </div>
                        }
                    </For>

                    <button class="add-article" onClick = {goToRegisterUser}>+</button>
                </>
            }
        </>
    );
}

export default Users;