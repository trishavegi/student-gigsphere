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

    if (!newTitle) return;

    const newPrice = prompt(
      "Enter new price",
      service.price
    );

    if (!newPrice) return;

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

      {/* HEADER */}

      <div className="bg-gradient-to-r from-slate-900 to-blue-900 text-white">

        <div className="max-w-7xl mx-auto px-6 py-10">

          <p className="text-blue-300 font-semibold">
            Provider Dashboard
          </p>

          <h1 className="text-4xl font-bold mt-2">
            Welcome, {user?.name || "Provider"} 👋
          </h1>

          <p className="text-slate-300 mt-3">
            Manage your services and booking requests.
          </p>

        </div>

      </div>


      {/* MAIN */}

      <div className="max-w-7xl mx-auto px-6 py-10">


        {/* STATISTICS */}

        <div className="grid md:grid-cols-3 gap-6 mb-10">


          <div className="bg-white rounded-2xl shadow-sm border p-6">

            <div className="text-3xl">
              🛠️
            </div>

            <p className="text-slate-500 mt-3">
              My Services
            </p>

            <h2 className="text-3xl font-bold text-slate-800">
              {services.length}
            </h2>

          </div>


          <div className="bg-white rounded-2xl shadow-sm border p-6">

            <div className="text-3xl">
              📋
            </div>

            <p className="text-slate-500 mt-3">
              Pending Requests
            </p>

            <h2 className="text-3xl font-bold text-orange-500">
              {pendingBookings}
            </h2>

          </div>


          <div className="bg-white rounded-2xl shadow-sm border p-6">

            <div className="text-3xl">
              ✅
            </div>

            <p className="text-slate-500 mt-3">
              Accepted Bookings
            </p>

            <h2 className="text-3xl font-bold text-green-600">
              {acceptedBookings}
            </h2>

          </div>

        </div>


        {/* CREATE SERVICE */}

        <div className="flex justify-between items-center mb-6">

          <div>

            <h2 className="text-2xl font-bold text-slate-800">
              My Services
            </h2>

            <p className="text-slate-500">
              Manage the services you offer.
            </p>

          </div>

          <Link to="/create-service">

            <button className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-3 rounded-xl font-semibold">

              + Create Service

            </button>

          </Link>

        </div>


        {/* SERVICES */}

        {services.length === 0 ? (

          <div className="bg-white border rounded-2xl p-10 text-center mb-12">

            <div className="text-5xl mb-4">
              🛠️
            </div>

            <h3 className="text-xl font-bold text-slate-700">
              No services posted yet
            </h3>

            <p className="text-slate-500 mt-2 mb-5">
              Create your first service and start earning.
            </p>

            <Link to="/create-service">

              <button className="bg-blue-600 text-white px-5 py-2 rounded-lg">
                Create Your First Service
              </button>

            </Link>

          </div>

        ) : (

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">

            {services.map((service) => (

              <div
                key={service._id}
                className="bg-white border rounded-2xl shadow-sm p-6 hover:shadow-md transition"
              >

                <span className="inline-block bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">

                  {service.category || "Service"}

                </span>

                <h3 className="text-xl font-bold text-slate-800">
                  {service.title}
                </h3>

                <p className="text-slate-500 mt-2 line-clamp-2">
                  {service.description}
                </p>

                <p className="text-2xl font-bold text-teal-600 mt-4">
                  ₹{service.price}
                </p>

                <div className="flex gap-3 mt-5">

                  <button
                    onClick={() => handleEdit(service)}
                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Edit
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}


        {/* BOOKING REQUESTS */}

        <div className="mb-6">

          <h2 className="text-2xl font-bold text-slate-800">
            Booking Requests
          </h2>

          <p className="text-slate-500">
            Review requests from students.
          </p>

        </div>


        {bookings.length === 0 ? (

          <div className="bg-white border rounded-2xl p-10 text-center">

            <div className="text-5xl mb-4">
              📭
            </div>

            <h3 className="text-xl font-bold text-slate-700">
              No booking requests
            </h3>

            <p className="text-slate-500 mt-2">
              New booking requests will appear here.
            </p>

          </div>

        ) : (

          <div className="space-y-4">

            {bookings.map((booking) => (

              <div
                key={booking._id}
                className="bg-white border rounded-2xl p-6 shadow-sm"
              >

                <div className="flex flex-col md:flex-row md:justify-between gap-4">

                  <div>

                    <h3 className="text-xl font-bold text-slate-800">
                      {booking.service?.title}
                    </h3>

                    <p className="text-slate-500 mt-2">
                      Customer:{" "}
                      <span className="font-semibold text-slate-700">
                        {booking.customer?.name}
                      </span>
                    </p>

                    <p className="mt-2">

                      Status:{" "}

                      <span className="font-semibold capitalize">
                        {booking.status}
                      </span>

                    </p>

                  </div>


                  {booking.status === "pending" && (

                    <div className="flex gap-3 items-center">

                      <button
                        onClick={() =>
                          updateStatus(
                            booking._id,
                            "accepted"
                          )
                        }
                        className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700"
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
                        className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600"
                      >
                        Reject
                      </button>

                    </div>

                  )}

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>

  );

}

export default ProviderDashboard;