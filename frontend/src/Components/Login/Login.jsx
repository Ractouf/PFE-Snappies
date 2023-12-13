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
        <div class="login">
            <img src="/src/assets/logo.png" alt="Logo" className="logo"/>
            <form class="login-form" onSubmit={handleSubmit}>
                <label>
                    <input class="login-input" placeholder="E-MAIL" type="text" value={email()}
                           onInput={(e) => setEmail(e.target.value)}/>
                </label>
                <label>
                    <input class="login-input" placeholder="MOT DE PASSE" type="password" value={password()}
                           onInput={(e) => setPassword(e.target.value)}/>
                </label>

                <input class="submit" type="submit" value="CONNEXION"/>
            </form>
            <footer className="footer-container">
                <p>&copy; {new Date().getFullYear()} Snappies. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Login;
