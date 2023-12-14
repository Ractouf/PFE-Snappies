import { createEffect, createResource, createSignal } from 'solid-js';
import { useNavigate, useParams } from '@solidjs/router';

const ModifyClient = () => {
  const navigate = useNavigate();
  const { clientId } = useParams();

  const [name, setName] = createSignal('');
  const [address, setAddress] = createSignal('');
  const [phone, setPhone] = createSignal('');
  const [selectedTour, setSelectedTour] = createSignal('');

  const fetchData = async (url, errorMessage) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(errorMessage, error);
      throw error;
    }
  };

  const fetchTypicalTours = async () => {
    const url = `http://localhost:8000/api/clientsTours/getByClientId/${clientId}`;
    try {
      const data = await fetchData(url, 'Error checking ClientsTours data');
      return data.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return null;
      }
      throw error;
    }
  };
  

  const fetchTypicalToursData = async () => {
    const url = 'http://localhost:8000/api/typical-tours';
    return await fetchData(url, 'Error fetching typical tours data');
  };

  createEffect(() => {
    fetchClientData();
  });

  const [tours, { mutate }] = createResource(fetchTypicalToursData);
  const [bool] = createResource(fetchTypicalTours);
  console.log(bool());

  const fetchClientData = async () => {
    try {
      const token = localStorage.getItem('token');
      const url = `http://localhost:8000/api/clients/${clientId}`;
      const clientResponse = await fetch(url, {
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
    } catch (error) {
      console.error('Error fetching client data:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const clientData = {
      name: name(),
      address: address(),
      phone: phone(),
    };

    try {
      const token = localStorage.getItem('token');
      const url = `http://localhost:8000/api/clients/${clientId}`;
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
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
      <div>
  {bool && typeof bool.loading !== 'undefined' ? (
    !bool.loading ? (
      <>
        <label htmlFor="tour">Select a Typical Tour (Optional): </label>
        {tours.loading ? (
          <span>Loading...</span>
        ) : (
          <select
            id="tour"
            value={selectedTour()}
            onChange={(e) => setSelectedTour(e.target.value)}
          >
            <option value="">Select a tour</option>
            {tours().map((tour) => (
              <option key={tour.id} value={tour.id}>
                {tour.name}
              </option>
            ))}
          </select>
        )}
      </>
    ) : (
      <span>Loading...</span>
    )
  ) : (
    <span>Client with id {clientId} already has a typicalTour</span>
  )}
</div>


      <button type="submit">Update Client</button>
    </form>
  );
};

export default ModifyClient;
