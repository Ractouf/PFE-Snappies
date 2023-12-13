import { createResource, createEffect } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import './ClientsList.css';

const ClientList = () => {
  const fetchClients = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8000/api/clients', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching clients:', error);
      throw error; // Re-throw the error to let the calling code handle it
    }
  };

  const [clients] = createResource(fetchClients);

  // Use createEffect to fetch data before mounting
  createEffect(() => {
    clients(); // Trigger the data fetching
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
        <button
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            padding: '5px 10px',
            cursor: 'pointer',
          }}
          onClick={handleAddClientClick}
        >
          Add Client
        </button>

        <ul>
          {clients()?.map((client) => (
            <li key={client.id}>
              <strong>Name:</strong> {client.name}, <strong>Address:</strong> {client.address},{' '}
              <strong>Phone:</strong> {client.phone}
              <button
                style={{
                  marginLeft: '10px',
                  padding: '5px 10px',
                  cursor: 'pointer',
                }}
                onClick={() => handleModifyClientClick(client.id)}
              >
                Modify
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ClientList;
