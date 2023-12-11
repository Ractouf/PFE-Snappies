import {createResource, createSignal} from "solid-js";
import {redirect} from "@solidjs/router";
import Button from "../Button/Button";

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
    console.log(response);
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
    }

    return response.json();
}

const UserRegister = () => {

    //todo: check if user is logged in as admin or redirect to login page

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
            console.log('All fields are required')
            return "All fields are required"
        }

        //check passwords match
        if (password() !== passwordConfirm()) {
            console.log('Passwords do not match')
            setPassword('')
            setPasswordConfirm('')
            return "Passwords do not match"
        }

        //check mail format
        const mailformat = /\S+@\S+\.\S+/;
        if (!email().match(mailformat)) {
            console.log('Invalid email format')
            return "Invalid email format"
        }

        setPhone(phone().replace(/[^0-9+]/g, ''))
        const phoneformat = /^\+?\d{11}$/;
        if (!phone().match(phoneformat)) {
            if (phone().match(/^04\d{8}$/)) {
                setPhone(`+32${phone().substring(1)}`)
            } else {
                console.log('Invalid phone number format')
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
            console.log('Register successful:', data());
            redirect(`/users/${data().id}`)
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
            <h2>Register</h2>

            {errorMessage() && <p>{errorMessage()}</p>} {/* Display the error message if it exists */}

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
                    Confirm the Password:
                    <input type="password" value={passwordConfirm()}
                           onInput={(e) => setPasswordConfirm(e.target.value)}/>
                </label>
                <br/>
                <label>
                    Name:
                    <input type="text" value={lastname()} onInput={(e) => setLastname(e.target.value)}/>
                </label>
                <br/>
                <label>
                    Surname:
                    <input type="text" value={firstname()} onInput={(e) => setFirstname(e.target.value)}/>
                </label>
                <br/>
                <label>
                    Phone:
                    <input type="text" value={phone()} onInput={(e) => setPhone(e.target.value)}/>
                </label>
                <br/>
                <label>
                    Administrator:
                    <input type="checkbox" checked={isAdministrator()}
                           onInput={(e) => setIsAdministrator(e.target.checked)}/>
                </label>
                <br/>

                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default UserRegister;