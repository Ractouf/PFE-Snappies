import {createResource, createSignal} from "solid-js";
import { useNavigate} from "@solidjs/router";
import "./UserRegister.css";
const registerUser = async (email, password, lastname, firstname, phone, is_admin) => {
    const requestBody = JSON.stringify({email, password, lastname, firstname, phone, is_admin});
    const response = await fetch("http://localhost:8000/api/users", {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
        },
        body: requestBody,
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
    }

    return response.json();
}

const UserRegister = () => {

    const navigator = useNavigate()

    if ( JSON.parse(localStorage.getItem('user')).is_admin === false ) {
        return navigator('/login');
    }

    const [password, setPassword] = createSignal('')
    const [passwordConfirm, setPasswordConfirm] = createSignal('')
    const [email, setEmail] = createSignal('')
    const [lastname, setLastname] = createSignal('')
    const [firstname, setFirstname] = createSignal('')
    const [phone, setPhone] = createSignal('')
    const [isAdministrator, setIsAdministrator] = createSignal(false)
    const [data, {refetch}] = createResource(() => registerUser(email(), password(), lastname(), firstname(), phone(), isAdministrator()))
    const [errorMessage, setErrorMessage] = createSignal('') // New state variable for error message

    const checkInput = () => {

        //check empty fields
        if (email() === '' || password() === '' || lastname() === '' || firstname() === '' || phone() === '') {
            return "All fields are required"
        }

        //check passwords match
        if (password() !== passwordConfirm()) {
            setPassword('')
            setPasswordConfirm('')
            return "Passwords do not match"
        }

        //check mail format
        const mailformat = /\S+@\S+\.\S+/;
        if (!email().match(mailformat)) {
            return "Invalid email format"
        }

        setPhone(phone().replace(/[^0-9+]/g, ''))
        const phoneformat = /^\+?\d{11}$/;
        if (!phone().match(phoneformat)) {
            if (phone().match(/^04\d{8}$/)) {
                setPhone(`+32${phone().substring(1)}`)
            } else {
                return "Invalid phone number format"
            }
        }

        return undefined;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errorMsg = checkInput();
          if (errorMsg) {
              setErrorMessage(errorMsg)
              return;
          }

        try {
            await refetch();
            navigator('/users');
        } catch (error) {
            console.error('Register failed:', error.message);
            setErrorMessage("Register failed")
        } finally {
            setPassword('')
            setPasswordConfirm('')
            setEmail('')
            setLastname('')
            setFirstname('')
            setPhone('')
            setIsAdministrator(false)
        }

    }


    return (
        <div>
            {errorMessage() && <p>{errorMessage()}</p>} {/* Display the error message if it exists */}

            <form class="clients-add" onSubmit={handleSubmit}>
                <input placeholder="email" type="text" value={email()} onInput={(e) => setEmail(e.target.value)}/>
                <input placeholder="mot de passe" type="password" value={password()} onInput={(e) => setPassword(e.target.value)}/>
                <input placeholder="répéter mot de passe" type="password" value={passwordConfirm()}
                           onInput={(e) => setPasswordConfirm(e.target.value)}/>

                <input placeholder="nom de famille" type="text" value={lastname()} onInput={(e) => setLastname(e.target.value)}/>
                <input placeholder="prénom" type="text" value={firstname()} onInput={(e) => setFirstname(e.target.value)}/>
                <input placeholder="téléphone" type="text" value={phone()} onInput={(e) => setPhone(e.target.value)}/>

                <div class = "admin-check">
                    <div class="client-check">
                        <input type="checkbox" checked={isAdministrator()}
                               onInput={(e) => setIsAdministrator(e.target.checked)}/>
                        <span class = "checkmark" ></span>
                    </div>
                    <p>Administrateur</p>
                </div>


                <button class = "confirm-add " type="submit">Enregistrer livreur</button>
            </form>
        </div>
    );
};

export default UserRegister;