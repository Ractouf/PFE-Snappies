import {createSignal, createResource} from "solid-js";
import "./Login.css";

const loginUser = async (email, password) => {
    const requestBody = JSON.stringify({email, password});

    const response = await fetch("http://localhost:8000/api/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: requestBody,
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
    }

    return response.json();
};

const Login = () => {
    const [email, setEmail] = createSignal('');
    const [password, setPassword] = createSignal('');
    const [data, {refetch}] = createResource(() => loginUser(email(), password()));

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await refetch();
            localStorage.setItem('user', JSON.stringify(data().user));
            localStorage.setItem('token', data().token);
        } catch (error) {
            console.error('Login failed:', error.message);
        } finally {
            setEmail('');
            setPassword('');
        }
    };

    return (
        <div class = "login">
            <form class="login-form" onSubmit={handleSubmit}>
                <h2>Login</h2>

                <label>
                    <input placeholder = "E-mail" type="text" value={email()} onInput={(e) => setEmail(e.target.value)}/>
                </label>
                <label>
                    <input placeholder = "Password" type="password" value={password()} onInput={(e) => setPassword(e.target.value)}/>
                </label>

                <input type="submit" />
            </form>
        </div>
    );
};

export default Login;
