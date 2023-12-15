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
    <div class = "clients">
      {clients.loading &&
          <div className="load-page"><img src="/src/assets/loading.gif" alt="chargement..." className="load"/></div>}
      <For each={clients()}>
        {(client) =>
            <div class="article-row">
            <div class = "article-content">
              <div class="modifier-div">
                <button onClick={() => handleModifyClientClick(client.id)}>
                  Modify
                </button>
              </div>
              <div class="client-info">
                <p>{client.name}</p>
                <p class = "adress">{client.address}</p>
                <p>{client.phone}</p>
              </div>
            </div>
          </div>
        }
      </For>

      <button className="add-article" onClick={handleAddClientClick}>+</button>
    </div>
);
};

export default ClientList;
