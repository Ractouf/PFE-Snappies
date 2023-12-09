import { createSignal } from 'solid-js';

function Login() {
  // State for the login form
  const [username, setUsername] = createSignal('');
  const [password, setPassword] = createSignal('');

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Here, you can add your logic to handle the login
    console.log('Username:', username());
    console.log('Password:', password());

    // Reset the form fields
    setUsername('');
    setPassword('');
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username()} onInput={(e) => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password()} onInput={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
