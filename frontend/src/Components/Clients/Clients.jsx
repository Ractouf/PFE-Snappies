import { createSignal, createResource } from 'solid-js';
import './Client.css';

const Client = () => {
  const [name, setName] = createSignal('');
  const [address, setAddress] = createSignal('');
  const [phone, setPhone] = createSignal('');
  const [selectedTour, setSelectedTour] = createSignal('');

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
      const data = await response.json();
      console.log(data);
      return data;
    }
  }

  const fetchClient = async (clientData) => {
    try {
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
          const responseData = await response.json();
          console.log('Client created successfully:', responseData);
          return responseData;
        }
      } catch (error) {
        console.error('Error submitting form:', error);
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
  
    try {
      const res = await fetchClient(clientData);
      const clientId = res.id;
  
      console.log(res.id);
  
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

        console.log("fdsfsdf");
        if (!toursResponse.ok) {
          console.log(`HTTP error! status: ${toursResponse.status}`);
          throw new Error('Error creating client tours');
        }
        
        const toursData = await toursResponse.json();
        
        console.log('Clients Tours created successfully:', toursData);
      }
  
      // Reset form fields
      setName('');
      setAddress('');
      setPhone('');
      setSelectedTour('');
  
    } catch (error) {
      console.error('Error creating client:', error);
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
        <label htmlFor="tour">Select a Typical Tour (Optional): </label>
        {toursResource.loading ? (
          <span>Loading...</span>
        ) : (
          <select
            id="tour"
            value={selectedTour()}
            onChange={(e) => setSelectedTour(e.target.value)}
          >
            <option value="">Select a tour</option>
            {toursResource().map((tour) => (
              <option key={tour.id} value={tour.id}>
                {tour.name}
              </option>
            ))}
          </select>
        )}
      </div>
      <div>
        <button type="submit">Create Client</button>
      </div>
    </form>
  );
};

export default Client;