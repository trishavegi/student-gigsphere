import { useEffect, useState } from "react";
import api from "../services/api";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup
} from "react-leaflet";

function MapPage() {

  const [services, setServices] = useState([]);

  useEffect(() => {

    fetchServices();

  }, []);

  const fetchServices = async () => {

    try {

      const response = await api.get("/services");

      setServices(response.data);

    }

    catch(error){

      console.log(error);

    }

  };

  return (

    <MapContainer
      center={[17.3850,78.4867]}
      zoom={12}
      style={{
        height:"100vh",
        width:"100%"
      }}
    >

      <TileLayer
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {

        services
  .filter(service => service.latitude && service.longitude)
  .map((service) => (

    <Marker
      key={service._id}
      position={[
        service.latitude,
        service.longitude
      ]}
    >

            <Popup>

              <h2>{service.title}</h2>

              <p>{service.description}</p>

              <p>₹{service.price}</p>

              <p>{service.location}</p>

            </Popup>

          </Marker>

        ))

      }

    </MapContainer>

  );

}

export default MapPage;