
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

      const response = await api.get("/bookings/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBookings(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchFavorites = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/favorites", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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
            Authorization: `Bearer ${token}`,
          },
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
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Booking Cancelled Successfully");
      fetchBookings();
    } catch (error) {
      console.log(error.response);

      alert(
        error.response?.data?.message ||
          error.message
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ================= HEADER ================= */}

      <section className="bg-gradient-to-br from-slate-950 via-slate-900 to-teal-900 text-white">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">

          <p className="text-teal-300 font-semibold uppercase tracking-wider text-xs sm:text-sm">
            Student GigSphere
          </p>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-2 leading-tight">
            Customer Dashboard
          </h1>

          <p className="text-slate-300 mt-3 text-sm sm:text-base max-w-2xl">
            Manage your bookings and favorite services
            in one place.
          </p>

        </div>

      </section>


      {/* ================= MAIN CONTENT ================= */}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">


        {/* ================= WELCOME ================= */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">

          <div>

            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">
              Welcome back! 👋
            </h2>

            <p className="text-slate-500 mt-1 text-sm sm:text-base">
              Find services, manage your bookings and
              save your favorites.
            </p>

          </div>


          <Link
            to="/"
            className="w-full md:w-auto bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-xl font-semibold transition text-center shadow-sm active:scale-[0.98]"
          >
            🔎 Browse Services
          </Link>

        </div>


        {/* ================= STATISTICS ================= */}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-10 sm:mb-12">

          {/* BOOKINGS */}

          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5 sm:p-6">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-slate-500 font-medium text-sm sm:text-base">
                  Total Bookings
                </p>

                <p className="text-3xl sm:text-4xl font-bold text-slate-800 mt-2">
                  {bookings.length}
                </p>

              </div>

              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-teal-50 rounded-full flex items-center justify-center text-xl sm:text-2xl">
                📅
              </div>

            </div>

          </div>


          {/* FAVORITES */}

          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5 sm:p-6">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-slate-500 font-medium text-sm sm:text-base">
                  Favorite Services
                </p>

                <p className="text-3xl sm:text-4xl font-bold text-teal-600 mt-2">
                  {favorites.length}
                </p>

              </div>

              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-teal-50 rounded-full flex items-center justify-center text-xl sm:text-2xl">
                ❤️
              </div>

            </div>

          </div>

        </div>


        {/* ================= BOOKINGS ================= */}

        <section>

          <div className="mb-5 sm:mb-6">

            <p className="text-teal-600 font-semibold uppercase text-xs sm:text-sm tracking-wide">
              Your Activity
            </p>

            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mt-1">
              My Bookings
            </h2>

          </div>


          {/* NO BOOKINGS */}

          {bookings.length === 0 ? (

            <div className="bg-white border border-slate-200 rounded-2xl p-8 sm:p-10 text-center">

              <div className="text-4xl sm:text-5xl mb-4">
                📅
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-slate-700">
                No bookings yet
              </h3>

              <p className="text-slate-500 mt-2 text-sm sm:text-base">
                Explore services and book your first
                service.
              </p>

            </div>

          ) : (

            <div className="space-y-4 sm:space-y-5">

              {bookings.map((booking) => (

                <div
                  key={booking._id}
                  className={`bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm ${
                    booking.status === "cancelled"
                      ? "opacity-70"
                      : ""
                  }`}
                >

                  {/* BOOKING INFORMATION */}

                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

                    <div className="min-w-0">

                      <h3 className="text-lg sm:text-xl font-bold text-slate-800 break-words">
                        {booking.service?.title ||
                          "Service unavailable"}
                      </h3>

                      <p className="text-slate-500 mt-2 text-sm sm:text-base">
                        👤 Provider:{" "}
                        <span className="font-semibold text-slate-700">
                          {booking.provider?.name ||
                            "Provider unavailable"}
                        </span>
                      </p>

                      <p className="text-slate-500 mt-1 text-sm">
                        📅 Booked on{" "}
                        {new Date(
                          booking.createdAt
                        ).toLocaleDateString()}
                      </p>

                    </div>


                    {/* PRICE + STATUS */}

                    <div className="flex flex-row sm:flex-col lg:text-right items-center sm:items-end justify-between gap-3">

                      <p className="text-xl sm:text-2xl font-bold text-teal-600">
                        ₹{booking.service?.price ?? "N/A"}
                      </p>

                      <span
                        className={`px-3 py-1 rounded-full text-xs sm:text-sm font-semibold capitalize whitespace-nowrap ${
                          booking.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : booking.status === "cancelled"
                            ? "bg-red-100 text-red-700"
                            : booking.status === "accepted"
                            ? "bg-teal-100 text-teal-700"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {booking.status}
                      </span>

                    </div>

                  </div>


                  {/* CANCEL */}

                  {booking.status === "pending" && (

                    <button
                      onClick={() =>
                        cancelBooking(booking._id)
                      }
                      className="mt-5 w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white px-5 py-3 sm:py-2 rounded-xl font-semibold transition active:scale-[0.98]"
                    >
                      Cancel Booking
                    </button>

                  )}


                  {booking.status === "cancelled" && (

                    <button
                      disabled
                      className="mt-5 w-full sm:w-auto bg-slate-200 text-slate-500 px-5 py-3 sm:py-2 rounded-xl cursor-not-allowed"
                    >
                      Booking Cancelled
                    </button>

                  )}

                </div>

              ))}

            </div>

          )}

        </section>


        {/* ================= FAVORITES ================= */}

        <section className="mt-12 sm:mt-14">

          <div className="mb-5 sm:mb-6">

            <p className="text-teal-600 font-semibold uppercase text-xs sm:text-sm tracking-wide">
              Saved Services
            </p>

            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mt-1">
              My Favorite Services
            </h2>

          </div>


          {/* NO FAVORITES */}

          {favorites.length === 0 ? (

            <div className="bg-white border border-slate-200 rounded-2xl p-8 sm:p-10 text-center">

              <div className="text-4xl sm:text-5xl mb-4">
                🤍
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-slate-700">
                No favorite services
              </h3>

              <p className="text-slate-500 mt-2 text-sm sm:text-base max-w-lg mx-auto">
                Save services you are interested in
                to find them easily later.
              </p>

            </div>

          ) : (

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">

              {favorites.map((fav) => (

                <div
                  key={fav._id}
                  className="relative bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-lg transition"
                >

                  {/* REMOVE FAVORITE */}

                  <button
                    onClick={() =>
                      removeFavorite(
                        fav.service?._id
                      )
                    }
                    disabled={!fav.service}
                    className="absolute top-4 right-4 text-xl sm:text-2xl hover:scale-110 transition disabled:opacity-50 p-1"
                    title="Remove from favorites"
                  >
                    ❤️
                  </button>


                  {/* ICON */}

                  <div className="w-11 h-11 sm:w-12 sm:h-12 bg-teal-50 rounded-xl flex items-center justify-center text-lg sm:text-xl mb-4">
                    ⭐
                  </div>


                  {/* TITLE */}

                  <h3 className="text-lg sm:text-xl font-bold text-slate-800 pr-8 break-words">
                    {fav.service?.title ||
                      "Service unavailable"}
                  </h3>


                  {/* LOCATION */}

                  <p className="text-slate-500 mt-3 text-sm sm:text-base break-words">
                    📍{" "}
                    {fav.service?.location ||
                      "Location unavailable"}
                  </p>


                  {/* PRICE */}

                  <p className="text-xl sm:text-2xl font-bold text-teal-600 mt-4">
                    ₹{fav.service?.price ?? "N/A"}
                  </p>

                </div>

              ))}

            </div>

          )}

        </section>

      </main>

    </div>
  );
}

export default CustomerDashboard;

