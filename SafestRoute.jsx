import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, DirectionsRenderer, DirectionsService } from '@react-google-maps/api';
import axios from 'axios';

const SafestRoute = () => {
  const [destination, setDestination] = useState('');
  const [crimeData, setCrimeData] = useState(null);
  const [directions, setDirections] = useState(null);
  const [routeColor, setRouteColor] = useState('green');
  const [loading, setLoading] = useState(false);

  const crimeometerApiKey = 'YOUR_CRIMEOMETER_API_KEY';
  const googleMapsApiKey = 'YOUR_GOOGLE_MAPS_API_KEY';

  const handleDestinationChange = (e) => setDestination(e.target.value);

  const fetchCrimeData = async (start, end) => {
    try {
      const response = await axios.get(
        `https://api.crimeometer.com/v1/crimes?start_lat=${start.lat}&start_lng=${start.lng}&end_lat=${end.lat}&end_lng=${end.lng}`,
        {
          headers: {
            'Authorization': `Bearer ${crimeometerApiKey}`,
          },
        }
      );
      setCrimeData(response.data);
      assessCrimeLevels(response.data);
    } catch (error) {
      console.error('Error fetching crime data:', error);
    }
  };

  const assessCrimeLevels = (data) => {
    let highestCrimeLevel = 'green'; // default is safest
    if (data && data.crimes.length > 0) {
      const totalCrimes = data.crimes.length;
      if (totalCrimes > 50) highestCrimeLevel = 'red'; // dangerous
      else if (totalCrimes > 20) highestCrimeLevel = 'yellow'; // less crimes
    }
    setRouteColor(highestCrimeLevel);
  };

  const getRoute = async (start, end) => {
    setLoading(true);
    const directionsService = new google.maps.DirectionsService();
    try {
      const result = await directionsService.route({
        origin: start,
        destination: end,
        travelMode: google.maps.TravelMode.DRIVING,
      });
      setDirections(result);
      fetchCrimeData(start, end); // Fetch crime data after route is available
    } catch (error) {
      console.error('Error fetching route:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Assume you have predefined current location, or fetch it dynamically
    const currentLocation = { lat: 40.7128, lng: -74.0060 }; // Example: New York
    const destinationLocation = { lat: parseFloat(destination.split(',')[0]), lng: parseFloat(destination.split(',')[1]) };
    getRoute(currentLocation, destinationLocation);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={destination}
          onChange={handleDestinationChange}
          placeholder="Enter destination (lat,lng)"
        />
        <button type="submit">Get Safest Route</button>
      </form>

      <LoadScript googleMapsApiKey={googleMapsApiKey}>
        <GoogleMap
          mapContainerStyle={{ height: '400px', width: '100%' }}
          center={{ lat: 40.7128, lng: -74.0060 }} // Center map on New York
          zoom={14}
        >
          {directions && (
            <DirectionsRenderer
              directions={directions}
              polylineOptions={{
                strokeColor: routeColor === 'red' ? 'red' : routeColor === 'yellow' ? 'yellow' : 'green',
                strokeWeight: 5,
              }}
            />
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default SafestRoute;
