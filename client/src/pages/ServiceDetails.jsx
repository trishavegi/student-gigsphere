import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import ServiceMap from "../components/ServiceMap";

function ServiceDetails() {

  const { id } = useParams();

  const [service, setService] = useState(null);
  const [reason, setReason] = useState("");

  useEffect(() => {
    fetchService();
  }, []);

  const fetchService = async () => {

    try {

      const response = await api.get(`/services/${id}`);

      setService(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  if (!service) {

    return <h2 className="text-center mt-10">Loading...</h2>;

  }
  const openDirections = () => {

  if (!service.latitude || !service.longitude) {
    alert("Location not available");
    return;
  }

  window.open(
    `https://www.google.com/maps/dir/?api=1&destination=${service.latitude},${service.longitude}`,
    "_blank"
  );

};
const submitComplaint = async () => {
  try {

    const response = await api.post("/complaints", {
      serviceId: service._id,
      reason: reason,
    });

    console.log(response.data);

    alert("Complaint Submitted Successfully");

    setReason("");

  } catch (error) {

    console.log(error);

    console.log(error.response);

    console.log(error.response?.data);

    alert("Unable to submit");

  }
};

  return (

    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-lg rounded-xl p-8">

      <h1 className="text-4xl font-bold text-blue-700 mb-5">
        {service.title}
      </h1>

      <p className="text-gray-700 mb-4">
        {service.description}
      </p>

      <hr className="my-4"/>

      <div className="space-y-3">

        <p>
          <b>Category :</b> {service.category}
        </p>

        <p>
          <b>Price :</b> ₹{service.price}
        </p>

        <p>
          <b>Location :</b> {service.location}
        </p>
        {service.latitude && service.longitude ? (
  <ServiceMap
    latitude={service.latitude}
    longitude={service.longitude}
    title={service.title}
  />
) : (
  <p className="text-red-500 mt-3">
    Map not available for this service.
  </p>
)}
<button
  onClick={openDirections}
  className="bg-green-600 text-white px-4 py-2 rounded mt-3 hover:bg-green-700"
>
  🧭 Get Directions
</button>

        <p>
          <b>Skills :</b> {service.skills}
        </p>

        <p>
          <b>Duration :</b> {service.duration}
        </p>

        <p>
          <b>Provider :</b> {service.user?.name}
        </p>

      </div>

      <button
        className="mt-8 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
      >
        Book Service
      </button>
      <div className="mt-8">

  <h2 className="text-xl font-bold mb-3 text-red-600">
    Report this Service
  </h2>

  <textarea
    value={reason}
    onChange={(e) => setReason(e.target.value)}
    placeholder="Write your complaint..."
    className="w-full border rounded-lg p-3"
  />

  <button
    onClick={submitComplaint}
    className="mt-3 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700"
  >
    Report Service
  </button>

</div>

    </div>

  );

}

export default ServiceDetails;