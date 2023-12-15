import {useNavigate, useParams} from "@solidjs/router";
import {createSignal, onMount} from "solid-js";
import users from "./Users";
import "./ModifyUser.css"

const ModifyUser = () => {
    const parmas = useParams();
    const navigate = useNavigate();
    const [user, setUser] = createSignal([]);
    const [loading, setLoading] = createSignal(true);
    const [firstname, setFirstname] = createSignal(user().firstname);
    const [lastname, setLastname] = createSignal(user().lastname);
    const [email, setEmail] = createSignal(user().email);
    const [phone, setPhone] = createSignal(user().phone);
    const [password, setPassword] = createSignal('');

    async function fetchUser(id) {
        const resp = await fetch(`http://localhost:8000/api/users/${id}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });

        const data = await resp.json();
        setUser(data);
        console.log(user())
        setFirstname(data.firstname);
        setLastname(data.lastname);
        setEmail(data.email);
        setPhone(data.phone);

        setLoading(false);
    }

    onMount(() => fetchUser(parmas.id));

    async function formSubmit(e) {
        e.preventDefault();

        let requestBody;
        if (password() !== '') {
            requestBody = JSON.stringify({
                firstname: firstname(),
                lastname: lastname(),
                email: email(),
                phone: phone(),
                password: password()
            });
        } else {
            requestBody = JSON.stringify({
                firstname: firstname(),
                lastname: lastname(),
                email: email(),
                phone: phone(),
            });
        }

        const resp = await fetch(`http://localhost:8000/api/users/${parmas.id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
            body: requestBody,
        });

        const res = await resp.json();
        console.log(res)

        navigate('/users');
    }

    async function deleteUser(e) {
        e.preventDefault();

        await fetch(`http://localhost:8000/api/users/${parmas.id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            }
        });

        navigate('/users');
    }

    return (
        <>
            {loading() ?
                <div className="load-page"><img src="/src/assets/loading.gif" alt="chargement..." className="load"/></div>
                :
                <form class = "clients-add" onSubmit={formSubmit}>
                    <input placeholder="prénom" value={user().firstname} type = "text" onInput = {(e) => setFirstname(e.target.value)}/>
                    <input placeholder="nom de famille" value = {user().lastname} type = "text" onInput = {(e) => setLastname(e.target.value)}/>
                    <input placeholder="téléphone" value = {user().phone} type = "text" onInput = {(e) => setPhone(e.target.value)}/>
                    <input placeholder="email" value = {user().email} type = "email" onInput = {(e) => setEmail(e.target.value)}/>
                    <input placeholder="mot de passe" type = "password" onInput = {(e) => setPassword(e.target.value)}/>

                    <input id = "confirm-add" type = "submit" value = "confirmer"/>
                    <input id = "delete-user" type = "submit" onClick = {deleteUser} value = "supprimer"/>
                </form>
            }
        </>
    );
}

export default ModifyUser