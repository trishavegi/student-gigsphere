import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import AdminCharts from "../../components/AdminCharts";
import AdminHeader from "../../components/AdminHeader";
import api from "../../services/api";

function AdminDashboard() {

  const [stats, setStats] = useState({
    users: 0,
    services: 0,
    bookings: 0,
    reviews: 0,
  });
  const [bookings, setBookings] = useState([]);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchDashboard();
    fetchUsers();
    fetchBookings();
  }, []);

  const fetchDashboard = async () => {
    try {

      const response = await api.get("/admin/dashboard");

      setStats(response.data);

    } catch (error) {

      console.log("Dashboard Error:", error);

    }
  };

  const fetchUsers = async () => {
    try {

      const response = await api.get("/admin/users");

      setUsers(response.data);

    } catch (error) {

      console.log("Users Error:", error);

    }
  };
  const fetchBookings = async () => {
  try {

    const response = await api.get("/admin/bookings");

    setBookings(response.data);

  } catch (error) {

    console.log("Bookings Error:", error);

  }
};

  return (

    <div className="flex bg-gray-100 min-h-screen">

      <Sidebar />

      <div className="ml-64 flex-1 p-8 space-y-8">

        <AdminHeader />

        {/* SUMMARY CARDS */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
    <p className="text-sm text-gray-500">
      Total Users
    </p>

    <h2 className="text-3xl font-bold text-gray-900 mt-3">
      {stats.users}
    </h2>

    <p className="text-sm text-green-600 mt-2">
      Registered users
    </p>
  </div>


          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
    <p className="text-sm text-gray-500">
      Total Services
    </p>

    <h2 className="text-3xl font-bold text-gray-900 mt-3">
      {stats.services}
    </h2>

    <p className="text-sm text-blue-600 mt-2">
      Services listed
    </p>
  </div>


          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
    <p className="text-sm text-gray-500">
      Total Bookings
    </p>

    <h2 className="text-3xl font-bold text-gray-900 mt-3">
      {stats.bookings}
    </h2>

    <p className="text-sm text-orange-600 mt-2">
      Platform bookings
    </p>
  </div>


           <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
    <p className="text-sm text-gray-500">
      Total Revenue
    </p>

    <h2 className="text-3xl font-bold text-gray-900 mt-3">
      ₹{stats.revenue || 0}
    </h2>

    <p className="text-sm text-purple-600 mt-2">
      From completed bookings
    </p>
  </div>
        </div>


        {/* CHARTS */}

        <div className="bg-white rounded-xl shadow-sm p-6">

          <h2 className="text-xl font-bold mb-6">
            Platform Analytics
          </h2>

          <AdminCharts
            analytics={{
              users: stats.users,
              services: stats.services,
              bookings: stats.bookings,
              accepted: 0,
              pending: 0,
              rejected: 0,
              cancelled: 0,
            }}
            monthlyData={[]}
          />

        </div>


        {/* RECENT DATA */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">


          {/* RECENT USERS */}

          <div className="bg-white rounded-xl shadow-sm p-6">

            <div className="flex justify-between items-center mb-5">

              <h2 className="text-xl font-bold">
                Recent Users
              </h2>

              <span className="text-sm text-blue-600">
                View All
              </span>

            </div>


            <table className="w-full">

              <thead>

                <tr className="border-b text-gray-500">

                  <th className="text-left py-3">
                    Name
                  </th>

                  <th className="text-left py-3">
                    Role
                  </th>

                </tr>

              </thead>


              <tbody>

                {users.slice(0, 5).map((user) => (

                  <tr
                    key={user._id}
                    className="border-b last:border-none"
                  >

                    <td className="py-4 font-medium">
                      {user.name}
                    </td>

                    <td className="py-4 capitalize text-gray-500">
                      {user.role}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>


          {/* RECENT BOOKINGS */}

          <div className="bg-white rounded-xl shadow-sm p-6">

            <div className="flex justify-between items-center mb-5">

              <h2 className="text-xl font-bold">
                Recent Bookings
              </h2>

              <span className="text-sm text-blue-600">
                View All
              </span>

            </div>


            <table className="w-full">

              <thead>

                <tr className="border-b text-gray-500">

                  <th className="text-left py-3">
                    Service
                  </th>

                  <th className="text-left py-3">
                    Status
                  </th>

                </tr>

              </thead>


              <tbody>

  {bookings.slice(0, 5).map((booking) => (

    <tr
      key={booking._id}
      className="border-b last:border-none"
    >

      <td className="py-4">

        {booking.service?.title || "Unknown Service"}

      </td>

      <td className="py-4 capitalize">

        <span
          className={
            booking.status === "completed"
              ? "text-green-600"
              : booking.status === "pending"
              ? "text-yellow-600"
              : booking.status === "accepted"
              ? "text-blue-600"
              : "text-red-600"
          }
        >

          {booking.status}

        </span>

      </td>

    </tr>

  ))}

</tbody>

            </table>

          </div>

        </div>

      </div>

    </div>

  );

}

export default AdminDashboard;