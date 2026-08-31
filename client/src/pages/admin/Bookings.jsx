import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import api from "../../services/api";

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await api.get("/admin/bookings");
      setBookings(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/admin/bookings/${id}`, {
        status,
      });

      fetchBookings();
    } catch (error) {
      console.log(error);
      alert("Unable to update booking");
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    const customer =
      booking.customer?.name?.toLowerCase() || "";

    const provider =
      booking.provider?.name?.toLowerCase() || "";

    const service =
      booking.service?.title?.toLowerCase() || "";

    const searchText = search.toLowerCase();

    return (
      customer.includes(searchText) ||
      provider.includes(searchText) ||
      service.includes(searchText)
    );
  });

  const getStatusStyle = (status) => {
    switch (status) {
      case "accepted":
        return "bg-green-100 text-green-700";

      case "rejected":
        return "bg-red-100 text-red-700";

      case "cancelled":
        return "bg-slate-200 text-slate-700";

      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">

      <Sidebar />

      {/* CONTENT */}
<main className="lg:ml-64 pt-20 lg:pt-8 px-4 sm:px-6 lg:px-8 pb-8">
        {/* HEADER */}
        <div className="mb-6">

          <p className="text-teal-600 font-semibold text-sm uppercase tracking-wide">
            Admin Panel
          </p>

          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
            Manage Bookings
          </h1>

          <p className="text-slate-500 mt-2">
            View and manage all service booking requests.
          </p>

        </div>

        {/* SEARCH */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 mb-6 shadow-sm">

          <input
            type="text"
            placeholder="Search customer, provider or service..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-full
              border border-slate-300
              rounded-xl
              px-4 py-3
              text-sm sm:text-base
              text-slate-700
              placeholder:text-slate-400
              focus:outline-none
              focus:ring-2
              focus:ring-teal-500
              focus:border-teal-500
            "
          />

        </div>

        {/* RESULT COUNT */}
        <div className="flex justify-between items-center mb-4">

          <p className="text-sm text-slate-500">
            Showing{" "}
            <span className="font-semibold text-slate-700">
              {filteredBookings.length}
            </span>{" "}
            booking
            {filteredBookings.length !== 1 ? "s" : ""}
          </p>

        </div>


        {/* ============================= */}
        {/* DESKTOP TABLE */}
        {/* ============================= */}

        <div className="hidden md:block bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-slate-900 text-white">

                <tr>

                  <th className="p-4 text-left text-sm font-semibold">
                    Customer
                  </th>

                  <th className="p-4 text-left text-sm font-semibold">
                    Provider
                  </th>

                  <th className="p-4 text-left text-sm font-semibold">
                    Service
                  </th>

                  <th className="p-4 text-left text-sm font-semibold">
                    Price
                  </th>

                  <th className="p-4 text-left text-sm font-semibold">
                    Status
                  </th>

                </tr>

              </thead>

              <tbody>

                {filteredBookings.length === 0 ? (

                  <tr>

                    <td
                      colSpan="5"
                      className="p-10 text-center text-slate-500"
                    >
                      No bookings found.
                    </td>

                  </tr>

                ) : (

                  filteredBookings.map((booking) => (

                    <tr
                      key={booking._id}
                      className="
                        border-b
                        border-slate-100
                        hover:bg-slate-50
                        transition
                      "
                    >

                      <td className="p-4 font-medium text-slate-800">
                        {booking.customer?.name || "Unknown"}
                      </td>

                      <td className="p-4 text-slate-600">
                        {booking.provider?.name || "Unknown"}
                      </td>

                      <td className="p-4 text-slate-600">
                        {booking.service?.title || "Deleted Service"}
                      </td>

                      <td className="p-4 font-semibold text-teal-600">
                        ₹{booking.service?.price || 0}
                      </td>

                      <td className="p-4">

                        <select
                          value={booking.status}
                          onChange={(e) =>
                            updateStatus(
                              booking._id,
                              e.target.value
                            )
                          }
                          className="
                            border
                            border-slate-300
                            rounded-lg
                            px-3 py-2
                            text-sm
                            bg-white
                            focus:outline-none
                            focus:ring-2
                            focus:ring-teal-500
                          "
                        >

                          <option value="pending">
                            Pending
                          </option>

                          <option value="accepted">
                            Accepted
                          </option>

                          <option value="rejected">
                            Rejected
                          </option>

                          <option value="cancelled">
                            Cancelled
                          </option>

                        </select>

                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>

        </div>


        {/* ============================= */}
        {/* MOBILE CARDS */}
        {/* ============================= */}

        <div className="md:hidden space-y-4">

          {filteredBookings.length === 0 ? (

            <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center">

              <div className="text-4xl mb-3">
                📭
              </div>

              <h3 className="font-semibold text-slate-700">
                No bookings found
              </h3>

              <p className="text-sm text-slate-500 mt-1">
                Try a different search.
              </p>

            </div>

          ) : (

            filteredBookings.map((booking) => (

              <div
                key={booking._id}
                className="
                  bg-white
                  border border-slate-200
                  rounded-2xl
                  p-5
                  shadow-sm
                "
              >

                {/* SERVICE */}
                <div className="flex justify-between gap-3 mb-4">

                  <div className="min-w-0">

                    <p className="text-xs text-teal-600 font-semibold uppercase">
                      Service
                    </p>

                    <h2 className="text-lg font-bold text-slate-800 mt-1 truncate">
                      {booking.service?.title || "Deleted Service"}
                    </h2>

                  </div>

                  <span
                    className={`
                      ${getStatusStyle(booking.status)}
                      px-3 py-1
                      rounded-full
                      text-xs
                      font-semibold
                      capitalize
                      whitespace-nowrap
                      h-fit
                    `}
                  >
                    {booking.status}
                  </span>

                </div>


                {/* DETAILS */}
                <div className="space-y-3">

                  <div className="flex justify-between gap-4">

                    <span className="text-sm text-slate-500">
                      Customer
                    </span>

                    <span className="text-sm font-semibold text-slate-700 text-right">
                      {booking.customer?.name || "Unknown"}
                    </span>

                  </div>


                  <div className="flex justify-between gap-4">

                    <span className="text-sm text-slate-500">
                      Provider
                    </span>

                    <span className="text-sm font-semibold text-slate-700 text-right">
                      {booking.provider?.name || "Unknown"}
                    </span>

                  </div>


                  <div className="flex justify-between gap-4">

                    <span className="text-sm text-slate-500">
                      Price
                    </span>

                    <span className="text-lg font-bold text-teal-600">
                      ₹{booking.service?.price || 0}
                    </span>

                  </div>

                </div>


                {/* STATUS UPDATE */}
                <div className="border-t border-slate-100 mt-5 pt-4">

                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Update Status
                  </label>

                  <select
                    value={booking.status}
                    onChange={(e) =>
                      updateStatus(
                        booking._id,
                        e.target.value
                      )
                    }
                    className="
                      w-full
                      border border-slate-300
                      rounded-xl
                      px-4 py-3
                      bg-white
                      text-slate-700
                      focus:outline-none
                      focus:ring-2
                      focus:ring-teal-500
                    "
                  >

                    <option value="pending">
                      Pending
                    </option>

                    <option value="accepted">
                      Accepted
                    </option>

                    <option value="rejected">
                      Rejected
                    </option>

                    <option value="cancelled">
                      Cancelled
                    </option>

                  </select>

                </div>

              </div>

            ))

          )}

        </div>

      </main>

    </div>
  );
}

export default Bookings;