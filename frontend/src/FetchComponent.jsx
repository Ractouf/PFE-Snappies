import { createResource } from "solid-js";

const FetchComponent = () => {
  const fetchData = async () => (await fetch("http://localhost:8000/api/users")).json();

  const [data, { refetch }] = createResource(fetchData);

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
