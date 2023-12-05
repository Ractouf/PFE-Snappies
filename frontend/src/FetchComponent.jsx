import { createSignal, createResource } from "solid-js";

const FetchComponent = () => {
  const fetchData = async () => (await fetch("http://localhost:8000/api/ping")).json();

  const [data, { mutate, refetch }] = createResource(fetchData);

  return (
    <div>
      <button onClick={refetch}>Fetch Data</button>
      <div>
        <strong>Response:</strong> {JSON.stringify(data())}
      </div>
    </div>
  );
};

export default FetchComponent;
