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

      console.log(response.data);

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

  return (
    <div className="flex bg-gray-100 min-h-screen">

      <Sidebar />

      <div className="ml-64 flex-1 p-8">

        <h1 className="text-3xl font-bold mb-6">
          Manage Bookings
        </h1>
        <input
  type="text"
  placeholder="Search Customer, Provider or Service..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="w-full border p-3 rounded-lg mb-6"
/>

        <table className="w-full bg-white rounded-lg shadow">

          <thead>

            <tr className="border-b">

              <th className="p-3 text-left">Customer</th>

              <th className="p-3 text-left">Provider</th>

              <th className="p-3 text-left">Service</th>

              <th className="p-3 text-left">Price</th>

              <th className="p-3 text-left">Status</th>

            </tr>

          </thead>

          <tbody>

            {bookings
  .filter((booking) => {
  const customer = booking.customer?.name?.toLowerCase() || "";
  const provider = booking.provider?.name?.toLowerCase() || "";
  const service = booking.service?.title?.toLowerCase() || "";

  const searchText = search.toLowerCase();

  return (
    customer.includes(searchText) ||
    provider.includes(searchText) ||
    service.includes(searchText)
  );
})
  .map((booking) => (

              <tr key={booking._id} className="border-b">

                <td className="p-3">
                  {booking.customer?.name}
                </td>

                <td className="p-3">
                  {booking.provider?.name}
                </td>

                <td className="p-3">
                  {booking.service?.title || "Deleted Service"}
                </td>

                <td className="p-3">
                  ₹{booking.service?.price || 0}
                </td>

               <td className="p-3">

  <select
    value={booking.status}
    onChange={(e) =>
      updateStatus(booking._id, e.target.value)
    }
    className="border rounded px-3 py-2"
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

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Bookings;