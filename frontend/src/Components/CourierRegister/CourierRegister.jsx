import {createResource, createSignal} from "solid-js";
import {redirect} from "@solidjs/router";

const registerCourier = async (email, password, name, surname, phone, isAdministrator) => {
    const requestBody = JSON.stringify({email, password, name, surname, phone, isAdministrator});
    const response = await fetch("http://localhost:8000/api/registerCourier", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: requestBody,

    });
    console.log(response);
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
    }

    return response.json();
}

const CourierRegister = () => {

    //todo: check if email already exists
    //todo: check if phone already exists
    //todo: check if user is logged in as admin or redirect to login page

    const [password, setPassword] = createSignal('')
    const [email, setEmail] = createSignal('')
    const [name, setName] = createSignal('')
    const [surname, setSurname] = createSignal('')
    const [phone, setPhone] = createSignal('')
    const [isAdministrator, setIsAdministrator] = createSignal(false)
    const [data, {refetch}] = createResource(() => registerCourier(email(), password(), name(), surname(), phone(), isAdministrator()))

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await refetch();
            console.log('Register successful:', data());
            redirect(`/users/${data().id}`)
        } catch (error) {
            console.error('Register failed:', error.message);
        } finally {
            setPassword('')
            setEmail('')
            setName('')
            setSurname('')
            setPhone('')
            setIsAdministrator(false)
        }

    }


    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input type="text" value={email()} onInput={(e) => setEmail(e.target.value)}/>
                </label>
                <br/>
                <label>
                    Password:
                    <input type="password" value={password()} onInput={(e) => setPassword(e.target.value)}/>
                </label>
                <br/>
                <label>
                    Name:
                    <input type="text" value={name()} onInput={(e) => setName(e.target.value)}/>
                </label>
                <br/>
                <label>
                    Surname:
                    <input type="text" value={surname()} onInput={(e) => setSurname(e.target.value)}/>
                </label>
                <br/>
                <label>
                    Phone:
                    <input type="text" value={phone()} onInput={(e) => setPhone(e.target.value)}/>
                </label>
                <br/>
                <label>
                    Administrator:
                    <input type="checkbox" value={isAdministrator()} onInput={(e) => setIsAdministrator(e.target.value)}/>
                </label>
                <br/>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default CourierRegister;