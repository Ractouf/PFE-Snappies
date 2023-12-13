import { createEffect, createResource, createSignal } from 'solid-js';
import { useNavigate, useParams } from '@solidjs/router';

const ModifyClient = () => {
  const navigate = useNavigate();
  const { clientId } = useParams();


  const [name, setName] = createSignal('');
  const [address, setAddress] = createSignal('');
  const [phone, setPhone] = createSignal('');
  const [selectedTour, setSelectedTour] = createSignal('');

  const [hasClientsTours, setHasClientsTours] = createSignal(false);

  const fetchTypicalTours = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:8000/api/clientsTours/getByClientId/${clientId}`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        setHasClientsTours(true);
        return data;
      } else if (response.status === 404) {
        
        return null;
      } else {
        console.error(`HTTP error! status: ${response.status}`);
        throw new Error('Error checking ClientsTours data');
      }
    } catch (error) {
      console.error('Error checking ClientsTours data:', error);
      throw error;
    }
  };
  

  const fetchClientData = async () => {
    try {
      const token = localStorage.getItem('token');
      const clientResponse = await fetch(`http://localhost:8000/api/clients/${clientId}`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
      });
  
      if (!clientResponse.ok) {
        throw new Error(`HTTP error! status: ${clientResponse.status}`);
      }
  
      const clientData = await clientResponse.json();
      setName(clientData.name);
      setAddress(clientData.address);
      setPhone(clientData.phone);
  
      const dataTours = await fetchTypicalTours();
  
      if (hasClientsTours) {
        setHasClientsTours(true);
      } else {
        const toursResponse = await fetchTypicalToursData();
        const toursData = await toursResponse.json();
        console.log(toursData);
      }
    } catch (error) {
      console.error('Error fetching client data:', error);
    }
  };
  
  const fetchTypicalToursData = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/typicalTours`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        }
      });
  
      if (!response.ok) {
        console.error(`HTTP error! status: ${response.status}`);
        throw new Error('Error fetching typical tours data');
      }
  
      return response;
    } catch (error) {
      console.error('Error fetching typical tours data:', error);
      throw error;
    }
  };

  const bool = fetchTypicalTours(clientId);
  setHasClientsTours(bool);

  let tours;

  createEffect(() => {
    fetchClientData();
    if (hasClientsTours) {
        tours = createResource(fetchTypicalTours);
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const clientData = {
      name: name(),
      address: address(),
      phone: phone(),
    };

    try {
      const response = await fetch(`http://localhost:8000/api/clients/${clientId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
        body: JSON.stringify(clientData),
      });

      if (!response.ok) {
        console.log(`HTTP error! status: ${response.status}`);
        throw new Error('Error updating client');
      }

      const updatedClient = await response.json();
      console.log('Client updated successfully:', updatedClient);

      if (selectedTour() !== '') {
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
          throw new Error('Error creating client tours');
        }
  
        console.log('Client tour created successfully');
      }
      navigate('/clients');
    } catch (error) {
      console.error('Error updating client:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name()}
          onInput={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="address">Address:</label>
        <input
          type="text"
          id="address"
          value={address()}
          onInput={(e) => setAddress(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="phone">Phone:</label>
        <input
          type="text"
          id="phone"
          value={phone()}
          onInput={(e) => setPhone(e.target.value)}
        />
      </div>

      {!hasClientsTours() && (
        <div>
          <label htmlFor="tour">Select a Typical Tour (Optional): </label>
          <select
            id="tour"
            value={selectedTour()}
            onChange={(e) => setSelectedTour(e.target.value)}
          >
            <option value="">Select a tour</option>
            {tours()?.map((tour) => (
              <option key={tour.id} value={tour.id}>
                {tour.name}
              </option>
            ))}
          </select>
        </div>
      )}

      <button type="submit">Update Client</button>
    </form>
  );
};

export default ModifyClient;
