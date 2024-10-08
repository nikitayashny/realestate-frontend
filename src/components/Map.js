import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import L from 'leaflet';
import { Container } from 'react-bootstrap';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const CenterMap = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(position, map.getZoom());
  }, [position, map]);

  return null;
};

const MyMapComponent = ({ address }) => {
  const [position, setPosition] = useState([53.9045, 27.5590]); 

  useEffect(() => {
    const fetchCoordinates = async () => {
      if (address) {
        try {
          const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
            params: {
              q: address,
              format: 'json',
            },
          });

          if (response.data.length > 0) {
            const { lat, lon } = response.data[0];
            setPosition([lat, lon]);
          }
        } catch (error) {
          console.error("Ошибка при геокодировании:", error);
        }
      }
    };

    fetchCoordinates();
  }, [address]);

  return (
    <Container className='d-flex justify-content-center p-4'>
    <MapContainer center={position} zoom={12} style={{ height: '400px', width: '80%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <CenterMap position={position} />
      <Marker position={position}>
        <Popup>
          {address}
        </Popup>
      </Marker>
    </MapContainer>
    </Container>
  );
};

export default MyMapComponent;