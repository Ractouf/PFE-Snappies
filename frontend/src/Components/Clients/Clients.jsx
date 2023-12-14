import {createResource, createSignal, For} from 'solid-js';
import './Client.css';

const Client = () => {
  const [name, setName] = createSignal('');
  const [address, setAddress] = createSignal('');
  const [phone, setPhone] = createSignal('');
  const [selectedTour, setSelectedTour] = createSignal(0);
  const [isSubmitting, setIsSubmitting] = createSignal(false);

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
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Client:
        <input type="text" value={name()} onInput={(e) => setName(e.target.value)}/>
      </label>
      <label>
        Adresse:
        <input type="text" value={address()} onInput={(e) => setAddress(e.target.value)}/>
      </label>
      <label>
        Téléphone:
        <input type="text" value={phone()} onInput={(e) => setPhone(e.target.value)}/>
      </label>

      <div>
        <label for = "tour">Select a Typical Tour (Optional): </label>
        {toursResource.loading ?
            <span>Loading...</span>
        :
          <select value={selectedTour()} onChange={(e) => setSelectedTour(e.target.value)}>
            <option value = {0}>Aucun tour</option>
            <For each = {toursResource()}>
              {tour => <option value={tour.id}>{tour.name}</option>}
            </For>
          </select>
        }
      </div>

      <button type="submit" disabled = {isSubmitting()}>Create Client</button>
      {isSubmitting() && <span>Envoi...</span>}
    </form>
  );
};

export default Client;