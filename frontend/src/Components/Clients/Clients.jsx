import {createResource, createSignal, For} from 'solid-js';
import { useNavigate } from '@solidjs/router';
import './Client.css';

const Client = () => {
  const [name, setName] = createSignal('');
  const [address, setAddress] = createSignal('');
  const [phone, setPhone] = createSignal('');
  const [selectedTour, setSelectedTour] = createSignal(0);
  const [isSubmitting, setIsSubmitting] = createSignal(false);

  const navigate = useNavigate();

  const fetchTours = async () => {
    const response = await fetch(`http://localhost:8000/api/typicalTours`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      }
    });

    if (!response.ok) {
      console.log(`HTTP error! status: ${response.status}`);
    } else {
      return await response.json();
    }
  }

  const fetchClient = async (clientData) => {
    const response = await fetch('http://localhost:8000/api/clients', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify(clientData),
    });

    if (!response.ok) {
      console.log(`HTTP error! status: ${response.status}`);
    } else {
      return await response.json();
    }
  }

  const [toursResource] = createResource(fetchTours);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const clientData = {
      name: name(),
      address: address(),
      phone: phone(),
    };

    const res = await fetchClient(clientData);
    const clientId = res.id;

    if (parseInt(selectedTour()) !== 0) {
      const bodyContent = JSON.stringify({
        client_id: clientId.toString(),
        typical_tour_id: selectedTour().toString(),
      });

      console.log(bodyContent);
      const toursResponse = await fetch('http://localhost:8000/api/clientsTours', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
        body: bodyContent,
      });

      if (!toursResponse.ok) {
        console.log(`HTTP error! status: ${toursResponse.status}`);
      }

      const toursData = await toursResponse.json();

      console.log('Clients Tours created successfully:', toursData);
    }

    // Reset form fields
    setName('');
    setAddress('');
    setPhone('');
    setSelectedTour('');

    navigate('/clients');
  };

  return (
    <form class = "clients-add" onSubmit={handleSubmit}>

      <input placeholder = "nom" type="text" value={name()} onInput={(e) => setName(e.target.value)}/>


      <input placeholder = "adresse" type="text" value={address()} onInput={(e) => setAddress(e.target.value)}/>


      <input placeholder = "téléphone" type="text" value={phone()} onInput={(e) => setPhone(e.target.value)}/>


      <div>
        {toursResource.loading ?
            <div class = "client-tours-load"><img src="/src/assets/loading.gif" alt="chargement..." className="load"/></div>
            :
            <select value={selectedTour()} onChange={(e) => setSelectedTour(e.target.value)}>
            <option value = {0}>Select a Typical Tour (Optional)</option>
            <For each = {toursResource()}>
              {tour => <option value={tour.id}>{tour.name}</option>}
            </For>
          </select>
        }
      </div>
      {!isSubmitting() &&
          <button class = "confirm-add" type="submit" disabled = {isSubmitting()}>Ajouter Client</button>}
      {isSubmitting() &&
          <div class="client-tours-load"><img src="/src/assets/loading.gif" alt="envoie..." className="load"/>
          </div>}
    </form>
  );
};

export default Client;