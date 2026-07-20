import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

function ProviderDashboard() {

const [bookings, setBookings] = useState([]);
const [services, setServices] = useState([]);

useEffect(() => {

fetchBookings();
fetchServices();

}, []);

const fetchBookings = async () => {

try {

  const response = await api.get(
    "/bookings/provider",
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }
  );

  setBookings(response.data);

} catch (error) {

  console.log(error);

}

};

const fetchServices = async () => {

try {

  const response = await api.get(
    "/services/my",
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }
  );

  setServices(response.data);

} catch (error) {

  console.log(error);

}

};

const updateStatus = async (id, status) => {

try {

  await api.put(
    `/bookings/${id}`,
    { status },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }
  );

  fetchBookings();

} catch (error) {

  console.log(error);

}

};

const handleEdit = async (service) => {

const newTitle = prompt(
  "Enter new title",
  service.title
);

const newPrice = prompt(
  "Enter new price",
  service.price
);

if (!newTitle || !newPrice) return;

try {

  await api.put(
    `/services/${service._id}`,
    {
      title: newTitle,
      price: newPrice
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }
  );

  alert("Service Updated");

  fetchServices();

} catch (error) {

  console.log(error);

}

};

return (

<div className="p-6">

  <h1 className="text-3xl font-bold mb-4">
    Provider Dashboard
  </h1>

  <Link to="/create-service">
    <button className="bg-green-600 text-white px-4 py-2 rounded mb-6">
      Create Service
    </button>
  </Link>

  <h2 className="text-2xl font-bold mb-4">
    My Services
  </h2>

  {services.length === 0 ? (

    <p>No services posted yet</p>

  ) : (

    services.map((service) => (

      <div
        key={service._id}
        className="border p-4 mb-4 rounded shadow"
      >

        <h3 className="text-xl font-bold">
          {service.title}
        </h3>

        <p>{service.description}</p>

        <p>₹{service.price}</p>

        <button
          onClick={() => handleEdit(service)}
          className="bg-blue-500 text-white px-3 py-1 rounded mt-2"
        >
          Edit
        </button>

      </div>

    ))

  )}

  <hr className="my-6" />

  <h2 className="text-2xl font-bold mb-4">
    Booking Requests
  </h2>

  {bookings.length === 0 ? (

    <p>No bookings found</p>

  ) : (

    bookings.map((booking) => (

      <div
        key={booking._id}
        className="border p-4 mb-4 rounded shadow"
      >

        <h3 className="font-bold">
          {booking.service?.title}
        </h3>

        <p>
          Customer: {booking.customer?.name}
        </p>

        <p>
          Status: {booking.status}
        </p>

        <button
          onClick={() =>
            updateStatus(
              booking._id,
              "accepted"
            )
          }
          className="bg-green-500 text-white px-3 py-1 mr-2 rounded"
        >
          Accept
        </button>

        <button
          onClick={() =>
            updateStatus(
              booking._id,
              "rejected"
            )
          }
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Reject
        </button>

      </div>

    ))

  )}

</div>

);

}

export default ProviderDashboard;