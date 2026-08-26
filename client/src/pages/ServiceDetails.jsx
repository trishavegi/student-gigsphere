import { useEffect, useState } from "react";
import { useParams, useNavigate  } from "react-router-dom";
import api from "../services/api";
import ServiceMap from "../components/ServiceMap";

function ServiceDetails() {

  const { id } = useParams();
  const navigate = useNavigate();
  
  const [service, setService] = useState(null);
  const [reason, setReason] = useState("");
  const providerId =
  service?.user?._id || service?.user;


  useEffect(() => {
    fetchService();
  }, []);

  const fetchService = async () => {

    try {

      const response = await api.get(`/services/${id}`);
      console.log("SERVICE DATA:", response.data);
console.log("PROVIDER DATA:", response.data.user);

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
const handleBooking = async () => {

  const token = localStorage.getItem("token");

  if (!token) {
    alert("Please login to book a service.");
    return;
  }

  try {

    await api.post(
      "/bookings",
      {
        serviceId: service._id
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    alert("Booking Request Sent Successfully!");

  } catch (error) {

    alert(
      error.response?.data?.message ||
      "Booking failed"
    );

  }

};

  return (

    <div className="max-w-4xl mx-auto my-10 bg-white border border-slate-200 shadow-xl rounded-2xl p-6 md:p-8">
      <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-5">
        {service.title}
      </h1>

      <p className="text-slate-600 text-lg leading-relaxed mb-6">
        {service.description}
      </p>

      <hr className="my-4"/>

      <div className="space-y-4 text-slate-700">

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
  className="mt-4 bg-teal-600 text-white px-5 py-3 rounded-xl font-semibold hover:bg-teal-700 transition shadow-sm"
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
       {providerId && (
  <button
  onClick={() => navigate(`/chat/${providerId}`)}
  className="mt-4 bg-slate-800 text-white px-6 py-3 rounded-xl font-semibold hover:bg-slate-900 transition shadow-sm"
>
  💬 Chat with Provider
</button>
       )}

      </div>

     <button
     onClick={handleBooking}
  className="mt-8 w-full bg-teal-600 text-white py-3 rounded-xl font-semibold hover:bg-teal-700 transition shadow-sm"
>
  📅 Book Service
</button>
      <div className="mt-8">

  <h2 className="text-xl font-bold mb-3 text-slate-800">
    Report this Service
  </h2>

  <textarea
    value={reason}
    onChange={(e) => setReason(e.target.value)}
    placeholder="Write your complaint..."
    className="w-full border border-slate-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-red-400"
  />

  <button
    onClick={submitComplaint}
    className="mt-3 bg-red-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-600 transition">
    Report Service
  </button>

</div>

    </div>

  );

}

export default ServiceDetails;