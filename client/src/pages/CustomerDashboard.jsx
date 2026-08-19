import { useEffect, useState } from "react";
import api from "../services/api";

function CustomerDashboard() {

  const [bookings, setBookings] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {

    fetchBookings();
    fetchFavorites();

  }, []);

  const fetchBookings = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await api.get(
        "/bookings/my",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setBookings(response.data);

    } catch (error) {

      console.log(error);

    }

  };
  const fetchFavorites = async () => {

  try {

    const token = localStorage.getItem("token");

    const response = await api.get(
      "/favorites",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    setFavorites(response.data);

  } catch (error) {

    console.log(error);

  }

};
const removeFavorite = async (serviceId) => {

  try {

    const token = localStorage.getItem("token");

    await api.post(
      "/favorites",
      { serviceId },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    fetchFavorites();
    alert("Removed from Favorites 💔");

  } catch (error) {

    console.log(error);

  }

};
const cancelBooking = async (bookingId) => {

  try {

    const token = localStorage.getItem("token");

    await api.put(
      `/bookings/cancel/${bookingId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    alert("Booking Cancelled Successfully");

    fetchBookings();

  } catch (error) {

  console.log(error.response);

  alert(error.response?.data?.message || error.message);

}

};

  return (

<div className="p-8 bg-gray-100 min-h-screen">

<h1 className="text-3xl font-bold mb-8">
Customer Dashboard
</h1>

<div className="grid md:grid-cols-2 gap-5 mb-8">

<div className="bg-blue-500 text-white p-5 rounded-xl shadow">

<h2 className="text-xl font-bold">
📅 Bookings
</h2>

<p className="text-3xl mt-3">
{bookings.length}
</p>

</div>

<div className="bg-pink-500 text-white p-5 rounded-xl shadow">

<h2 className="text-xl font-bold">
❤️ Favorites
</h2>

<p className="text-3xl mt-3">
{favorites.length}
</p>

</div>

</div>

<h2 className="text-2xl font-bold mb-5">
📅 My Bookings
</h2>
{
  bookings.map((booking) => (

    <div
      key={booking._id}
className={`shadow rounded-xl p-5 mb-5 ${
booking.status === "cancelled"
? "bg-gray-200"
: "bg-white"
}`}    >

      <h3 className="text-xl font-bold">
  {booking.service?.title || "Service unavailable"}
</h3>

      <p>
  Provider : {booking.provider?.name || "Provider unavailable"}
</p>

      <p>
  Price : ₹{booking.service?.price ?? "N/A"}
</p>

      <p>
Status : {booking.status}
</p>
<p className="text-gray-500 text-sm">
Booked on {new Date(booking.createdAt).toLocaleDateString()}
</p>
       {
booking.status === "pending" ? (

<button
onClick={() => cancelBooking(booking._id)}
className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
>
Cancel Booking
</button>

) : booking.status === "cancelled" ? (

<button
disabled
className="mt-4 bg-gray-400 text-white px-4 py-2 rounded cursor-not-allowed"
>
Booking Cancelled
</button>

) : null
}

    </div>

  ))
}

<h2 className="text-2xl font-bold mt-10 mb-5">
  ❤️ My Favorite Services
</h2>

<div className="grid md:grid-cols-2 gap-5">

  {
    favorites.map((fav) => (

      <div
        key={fav._id}
        className="bg-white shadow rounded-xl p-5 relative"
      >

        <h3 className="text-xl font-bold">
  {fav.service?.title || "Service unavailable"}
</h3>

<p>
  📍 {fav.service?.location || "Location unavailable"}
</p>

<p>
  ₹ {fav.service?.price ?? "N/A"}
</p>

        <button
          onClick={() => removeFavorite(fav.service._id)}
          disabled={!fav.service}
          className="absolute top-4 right-4 text-red-500 text-2xl"
        >
          ❤️
        </button>

      </div>

    ))
  }

</div>


</div>

);

}

export default CustomerDashboard;