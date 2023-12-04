import { createSignal } from "solid-js";

const FetchComponent = () => {
  const [response, setResponse] = createSignal(null);

  const fetchData = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/ping");
      console.log(res);
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setResponse("Error fetching data");
    }
  };

  return (
    <div>
      <button onClick={fetchData}>Fetch Data</button>
      <div>
        <strong>Response:</strong> {response()}
      </div>
    </div>
  );
};

export default FetchComponent;
