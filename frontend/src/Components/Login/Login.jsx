import { createSignal, createResource } from "solid-js";

const loginUser = async (email, password) => {
  const requestBody = JSON.stringify({ email, password });
  const response = await fetch("http://localhost:8000/api/login", {
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
};

const Login = () => {
  const [email, setEmail] = createSignal('');
  const [password, setPassword] = createSignal('');
  const [data, { refetch }] = createResource(() => loginUser(email(), password()));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await refetch();
      console.log('Login successful:', data());
      localStorage.setItem('token', data().token);
    } catch (error) {
      console.error('Login failed:', error.message);
    } finally {
      setEmail('');
      setPassword('');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="text" value={email()} onInput={(e) => setEmail(e.target.value)} />
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
};

export default Login;
