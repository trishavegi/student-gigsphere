import { useState } from "react";
import api from "../services/api";

function EditService({ service }) {

  const [title, setTitle] = useState(service.title);
  const [description, setDescription] = useState(service.description);
  const [price, setPrice] = useState(service.price);
  const [location, setLocation] = useState(service.location || "");
const [latitude, setLatitude] = useState(service.latitude || "");
const [longitude, setLongitude] = useState(service.longitude || "");

  const handleSubmit = async () => {

    const token = localStorage.getItem("token");

    await api.put(
      `/services/${service._id}`,
      {
  title,
  description,
  price,
  location,
  latitude,
  longitude
},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    alert("Service Updated");

  };

  return (
    <div>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <br /><br />

      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <br /><br />

      <input
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <br /><br />

<input
  placeholder="Location"
  value={location}
  onChange={(e) => setLocation(e.target.value)}
/>

<br /><br />

<input
  placeholder="Latitude"
  value={latitude}
  onChange={(e) => setLatitude(e.target.value)}
/>

<br /><br />

<input
  placeholder="Longitude"
  value={longitude}
  onChange={(e) => setLongitude(e.target.value)}
/>

      <br /><br />

      <button onClick={handleSubmit}>
        Save
      </button>

    </div>
  );
}

export default EditService;