import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const MapFavorite = ({ realts }) => {
  const [markers, setMarkers] = useState([]);

  const fetchCoordinates = async (realt) => {
    const { country, city, street, house } = realt;
    const address = country + ', ' + city + ', ул.' + street + ' ' + house;

    try {
      const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
        params: {
          q: address,
          format: 'json',
        },
      });

      if (response.data.length > 0) {
        const { lat, lon } = response.data[0];
        return [lat, lon];
      } else {
        console.warn(`Координаты не найдены для адреса: ${address}`);
        return null;
      }
    } catch (error) {
      console.error("Ошибка при геокодировании:", error);
      return null;
    }
  };

  useEffect(() => {
    const loadMarkers = async () => {
      const newMarkers = await Promise.all(
        realts.map(async (realt) => {
          const coords = await fetchCoordinates(realt);
          if (coords) {
            return { ...realt, coordinates: coords };
          }
          return null;
        })
      );
      setMarkers(newMarkers.filter(marker => marker !== null));
    };

    loadMarkers();
  }, [realts]);

  return (
      <MapContainer center={[53.9045, 27.5590]} zoom={12} style={{ height: '450px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {markers.map((realt) => (
          <Marker key={realt.id} position={realt.coordinates}>
            <Popup>
              <div >
                <div style={{ position: 'relative' }}>
                  <img 
                    src={`data:image/jpeg;base64,${realt.images[0].bytes}`} 
                    alt={realt.name} 
                    style={{ width: '200px', height: 'auto' }} 
                  />
                  <div 
                    style={{
                      position: 'absolute', 
                      top: '5px', 
                      left: '5px',                  
                      backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                      padding: '5px 10px', 
                      borderRadius: '5px'
                    }}
                  >
                    { realt.dealType.id === 1 ? <>{realt.price}$/мес.</> 
                    : realt.dealType.id === 2 ? <>{realt.price}$</> 
                    : realt.dealType.id === 1 ? <>{realt.price}$/сутки</>
                    : null
                    }
                  </div>
                </div>
                {realt.city}, {realt.street} {realt.house}<br />
                {realt.type.typeName}: {realt.area} м²<br/>
                Количество комнат: {realt.roomsCount}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
  );
};

export default MapFavorite;