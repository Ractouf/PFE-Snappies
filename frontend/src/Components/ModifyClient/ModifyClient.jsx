import {createEffect, createResource, createSignal, For} from 'solid-js';
import { useNavigate, useParams } from '@solidjs/router';

const ModifyClient = () => {
  const navigate = useNavigate();
  const { clientId } = useParams();

  const [name, setName] = createSignal('');
  const [address, setAddress] = createSignal('');
  const [phone, setPhone] = createSignal('');
  const [selectedTour, setSelectedTour] = createSignal(0);
  const [clientTours, setClientTours] = createSignal(0);
  const [isSubmitting, setIsSubmitting] = createSignal(false);

  const fetchData = async (url, errorMessage) => {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(errorMessage, error);
    }
  };

  const fetchTypicalTourByClient = async () => {
      const data = await fetchData(`http://localhost:8000/api/clientsTours/getByClientId/${clientId}`, 'Error checking ClientsTours data');

      if (data.data) {
        setClientTours(data[0].id);
        setSelectedTour(data[0].typical_tour_id);
      }

      return data[0];
  };
  

  const fetchTypicalToursData = async () => {
    return await fetchData('http://localhost:8000/api/typicalTours', 'Error fetching typical tours data');
  };

  const fetchClientData = async () => {
      const clientData =  await fetchData(`http://localhost:8000/api/clients/${clientId}`, 'Error fetching clients data');

      setName(clientData.name);
      setAddress(clientData.address);
      setPhone(clientData.phone);
  };

  createEffect(() => {
    fetchClientData();
  });

  const [tours, { mutate }] = createResource(fetchTypicalToursData);
  const [toursByClient] = createResource(fetchTypicalTourByClient);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const clientData = {
      name: name(),
      address: address(),
      phone: phone(),
    };

    const response = await fetch(`http://localhost:8000/api/clients/${clientId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify(clientData),
    });

    if (!response.ok) {
      console.log(`HTTP error! status: ${response.status}`);
    }

    await response.json();

    if (parseInt(selectedTour()) !== 0) {
      if (clientTours() === 0) {
        try {
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
      } catch (error) {
        console.error(errorMessage || 'Error in API request:', error);
      }
      } else {
      const bodyContent = JSON.stringify({
        client_id: clientId.toString(),
        typical_tour_id: selectedTour().toString(),
      });

      await fetch(`http://localhost:8000/api/clientsTours/${clientTours()}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
        body: bodyContent,
      });
    }
    } else 
    {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch (`http://localhost:8000/api/clientsTours/${clientId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': 'Bearer ' + token,
          },
        });

        if (response.ok) {
          return await response.json();
        } else {
          console.error('HTTP Error');
        }
      } catch (error) {
        console.error(errorMessage || 'Error in API request:', error);
      }
    }

    setIsSubmitting(false);
    navigate('/clients');
  };

  return (
    <form onSubmit={handleSubmit}>

      <input placeholder="nom" type="text" value={name()} onInput={(e) => setName(e.target.value)}/>


      <input placeholder="adresse" type="text" value={address()} onInput={(e) => setAddress(e.target.value)}/>


      <input placeholder="téléphone" type="text" value={phone()} onInput={(e) => setPhone(e.target.value)}/>


      <div>
        {!toursByClient.loading ?
            <>
              <label for="tour">Tournée: </label>
              {tours.loading ?
                <span>Loading...</span>
              :
                <>
                  <select value={selectedTour()} onChange={(e) => setSelectedTour(e.target.value)}>
                    <option value = {0}>Aucune</option>
                    <For each = {tours()}>
                      {tour => <option value={tour.id}>{tour.name}</option>}
                    </For>
                  </select>
                </>
              }
          </>
        :
          <span>Chargement...</span>
        }
      </div>

      <button type = "submit" disabled = {isSubmitting()}>Envoyer</button>
      {isSubmitting() && <span>Envoi...</span>}
    </form>
  );
};

export default ModifyClient;
