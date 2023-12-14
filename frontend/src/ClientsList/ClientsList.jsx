import {createEffect, createResource, For} from 'solid-js';
import {useNavigate} from '@solidjs/router';
import './ClientsList.css';

const ClientList = () => {
  const fetchClients = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:8000/api/clients', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.log(response.status);
    }

    return await response.json();
  };

  const [clients] = createResource(fetchClients);

  createEffect(() => {
    clients();
  });

  const navigator = useNavigate();

  const handleAddClientClick = (e) => {
    e.preventDefault();
    
    navigator('/addClient');
  };

  const handleModifyClientClick = (clientId) => {
    navigator(`/modifyClient/${clientId}`);
  };

  return (
    <>
      <div>
        <h2>Client List</h2>
        <button onClick={handleAddClientClick}>Add Client</button>

        <ul>
          {clients.loading && <p>Loading...</p>}
          <For each={clients()}>
            {(client) =>
                <li>
                  <strong>Name:</strong> {client.name}, <strong>Address:</strong> {client.address},{' '}
                  <strong>Phone:</strong> {client.phone}
                  <button onClick={() => handleModifyClientClick(client.id)}>
                    Modify
                  </button>
                </li>
            }
          </For>
        </ul>
      </div>
    </>
  );
};

export default ClientList;
