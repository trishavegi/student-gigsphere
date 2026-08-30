import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

function ProviderDashboard() {
  const [bookings, setBookings] = useState([]);
  const [services, setServices] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchBookings();
    fetchServices();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await api.get("/bookings/provider", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setBookings(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchServices = async () => {
    try {
      const response = await api.get("/services/my", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

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
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      fetchBookings();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (service) => {
    const newTitle = prompt("Enter new title", service.title);

    if (!newTitle) return;

    const newPrice = prompt("Enter new price", service.price);

    if (!newPrice) return;

    try {
      await api.put(
        `/services/${service._id}`,
        {
          title: newTitle,
          price: newPrice,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert("Service Updated Successfully!");
      fetchServices();
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Failed to update service"
      );
    }
  };

  const pendingBookings = bookings.filter(
    (booking) => booking.status === "pending"
  ).length;

  const acceptedBookings = bookings.filter(
    (booking) => booking.status === "accepted"
  ).length;

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ================= HEADER ================= */}

      <header className="bg-gradient-to-br from-slate-950 via-slate-900 to-teal-900 text-white">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">

          <p className="text-teal-300 font-semibold text-sm sm:text-base">
            Provider Dashboard
          </p>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-2 leading-tight">
            Welcome, {user?.name || "Provider"} 👋
          </h1>

          <p className="text-slate-300 mt-3 text-sm sm:text-base max-w-2xl">
            Manage your services, booking requests, and grow your
            student gig business.
          </p>

        </div>

      </header>


      {/* ================= MAIN ================= */}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">


        {/* ================= STATISTICS ================= */}

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-10">

          {/* SERVICES */}

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6 hover:shadow-md transition">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-slate-500 text-sm font-medium">
                  My Services
                </p>

                <h2 className="text-3xl font-bold text-slate-900 mt-2">
                  {services.length}
                </h2>

              </div>

              <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center text-2xl">
                🛠️
              </div>

            </div>

          </div>


          {/* PENDING */}

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6 hover:shadow-md transition">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-slate-500 text-sm font-medium">
                  Pending Requests
                </p>

                <h2 className="text-3xl font-bold text-amber-500 mt-2">
                  {pendingBookings}
                </h2>

              </div>

              <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-2xl">
                📋
              </div>

            </div>

          </div>


          {/* ACCEPTED */}

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6 hover:shadow-md transition">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-slate-500 text-sm font-medium">
                  Accepted Bookings
                </p>

                <h2 className="text-3xl font-bold text-teal-600 mt-2">
                  {acceptedBookings}
                </h2>

              </div>

              <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center text-2xl">
                ✅
              </div>

            </div>

          </div>

        </section>


        {/* ================= MY SERVICES HEADER ================= */}

        <section className="mb-6">

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

            <div>

              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                My Services
              </h2>

              <p className="text-slate-500 mt-1 text-sm sm:text-base">
                Manage the services you offer.
              </p>

            </div>


            <Link
              to="/create-service"
              className="w-full sm:w-auto"
            >

              <button className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white px-5 py-3 rounded-xl font-semibold shadow-sm hover:shadow-md transition">

                + Create Service

              </button>

            </Link>

          </div>

        </section>


        {/* ================= SERVICES ================= */}

        {services.length === 0 ? (

          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 text-center mb-12 shadow-sm">

            <div className="w-16 h-16 mx-auto rounded-2xl bg-teal-50 flex items-center justify-center text-3xl mb-5">
              🛠️
            </div>

            <h3 className="text-xl font-bold text-slate-800">
              No services posted yet
            </h3>

            <p className="text-slate-500 mt-2 mb-6 text-sm sm:text-base">
              Create your first service and start earning.
            </p>

            <Link to="/create-service">

              <button className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-xl font-semibold transition">

                Create Your First Service

              </button>

            </Link>

          </div>

        ) : (

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12">

            {services.map((service) => (

              <div
                key={service._id}
                className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5 sm:p-6 hover:shadow-lg hover:-translate-y-0.5 transition duration-200"
              >

                {/* CATEGORY */}

                <span className="inline-block bg-teal-50 text-teal-700 text-xs font-bold px-3 py-1.5 rounded-full mb-4">

                  {service.category || "Service"}

                </span>


                {/* TITLE */}

                <h3 className="text-xl font-bold text-slate-900 leading-snug">

                  {service.title}

                </h3>


                {/* DESCRIPTION */}

                <p className="text-slate-500 mt-2 text-sm leading-relaxed line-clamp-3">

                  {service.description}

                </p>


                {/* PRICE */}

                <p className="text-2xl font-bold text-teal-600 mt-5">

                  ₹{service.price}

                </p>


                {/* EDIT BUTTON */}

                <div className="mt-5">

                  <button
                    onClick={() => handleEdit(service)}
                    className="w-full bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white px-4 py-3 rounded-xl font-semibold transition"
                  >
                    Edit Service
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}


        {/* ================= BOOKING HEADER ================= */}

        <section className="mb-6">

          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Booking Requests
          </h2>

          <p className="text-slate-500 mt-1 text-sm sm:text-base">
            Review and manage requests from students.
          </p>

        </section>


        {/* ================= BOOKINGS ================= */}

        {bookings.length === 0 ? (

          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 text-center shadow-sm">

            <div className="w-16 h-16 mx-auto rounded-2xl bg-slate-100 flex items-center justify-center text-3xl mb-5">
              📭
            </div>

            <h3 className="text-xl font-bold text-slate-800">
              No booking requests
            </h3>

            <p className="text-slate-500 mt-2 text-sm sm:text-base">
              New booking requests will appear here.
            </p>

          </div>

        ) : (

          <div className="space-y-4">

            {bookings.map((booking) => (

              <div
                key={booking._id}
                className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition"
              >

                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

                  {/* BOOKING INFORMATION */}

                  <div className="min-w-0">

                    <h3 className="text-lg sm:text-xl font-bold text-slate-900">

                      {booking.service?.title || "Service"}

                    </h3>

                    <p className="text-slate-500 mt-2 text-sm sm:text-base">

                      Customer:{" "}

                      <span className="font-semibold text-slate-700">
                        {booking.customer?.name || "Unknown"}
                      </span>

                    </p>


                    {/* STATUS */}

                    <div className="mt-3">

                      <span className="text-sm text-slate-500">
                        Status:
                      </span>{" "}

                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold capitalize ${
                          booking.status === "pending"
                            ? "bg-amber-50 text-amber-700"
                            : booking.status === "accepted"
                            ? "bg-teal-50 text-teal-700"
                            : "bg-red-50 text-red-700"
                        }`}
                      >

                        {booking.status}

                      </span>

                    </div>

                  </div>


                  {/* ACTION BUTTONS */}

                  {booking.status === "pending" && (

                    <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">

                      <button
                        onClick={() =>
                          updateStatus(
                            booking._id,
                            "accepted"
                          )
                        }
                        className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white px-5 py-3 rounded-xl font-semibold transition"
                      >
                        ✓ Accept
                      </button>

                      <button
                        onClick={() =>
                          updateStatus(
                            booking._id,
                            "rejected"
                          )
                        }
                        className="w-full sm:w-auto bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-red-600 border border-slate-200 hover:border-red-200 px-5 py-3 rounded-xl font-semibold transition"
                      >
                        ✕ Reject
                      </button>

                    </div>

                  )}

                </div>

              </div>

            ))}

          </div>

        )}

      </main>

    </div>
  );
}

export default ProviderDashboard;