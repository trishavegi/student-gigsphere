import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import AdminHeader from "../../components/AdminHeader";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const [stats, setStats] = useState({
    users: 0,
    services: 0,
    bookings: 0,
    reviews: 0,
  });

  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

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

  const filteredUsers = users
    .filter((user) => {
      const searchText = search.toLowerCase();

      return (
        user.name?.toLowerCase().includes(searchText) ||
        user.email?.toLowerCase().includes(searchText) ||
        user.role?.toLowerCase().includes(searchText) ||
        user.college?.toLowerCase().includes(searchText) ||
        user.department?.toLowerCase().includes(searchText)
      );
    })
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-slate-50">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT
          Mobile: no left margin
          Desktop: space for sidebar
      */}
      <main className="lg:ml-64 p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8">

        {/* HEADER */}
        <AdminHeader />

        {/* PAGE TITLE */}
        <div>
          <p className="text-sm font-semibold text-teal-600">
            Overview
          </p>

          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
            Admin Dashboard
          </h1>

          <p className="text-slate-500 mt-1 text-sm sm:text-base">
            Monitor users, services, bookings and platform activity.
          </p>
        </div>

        {/* SUMMARY CARDS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">

          {/* USERS */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6 hover:shadow-md transition">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-teal-50 flex items-center justify-center text-xl sm:text-2xl">
              👥
            </div>

            <p className="text-xs sm:text-sm text-slate-500 mt-4">
              Total Users
            </p>

            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              {stats.users}
            </h2>

            <p className="text-xs sm:text-sm text-teal-600 mt-2">
              Registered users
            </p>
          </div>

          {/* SERVICES */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6 hover:shadow-md transition">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-blue-50 flex items-center justify-center text-xl sm:text-2xl">
              🛠️
            </div>

            <p className="text-xs sm:text-sm text-slate-500 mt-4">
              Total Services
            </p>

            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              {stats.services}
            </h2>

            <p className="text-xs sm:text-sm text-blue-600 mt-2">
              Services listed
            </p>
          </div>

          {/* BOOKINGS */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6 hover:shadow-md transition">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-orange-50 flex items-center justify-center text-xl sm:text-2xl">
              📋
            </div>

            <p className="text-xs sm:text-sm text-slate-500 mt-4">
              Total Bookings
            </p>

            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              {stats.bookings}
            </h2>

            <p className="text-xs sm:text-sm text-orange-600 mt-2">
              Platform bookings
            </p>
          </div>

          {/* REVENUE */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6 hover:shadow-md transition">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-purple-50 flex items-center justify-center text-xl sm:text-2xl">
              💰
            </div>

            <p className="text-xs sm:text-sm text-slate-500 mt-4">
              Total Revenue
            </p>

            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              ₹{stats.revenue || 0}
            </h2>

            <p className="text-xs sm:text-sm text-purple-600 mt-2">
              Completed bookings
            </p>
          </div>

        </div>

        {/* RECENT DATA */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

          {/* RECENT USERS */}
          <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

            {/* SECTION HEADER */}
            <div className="p-4 sm:p-6 border-b border-slate-100">

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                    Recent Users
                  </h2>

                  <p className="text-sm text-slate-500 mt-1">
                    Latest registered users
                  </p>
                </div>

                <button
                  onClick={() => navigate("/admin/users")}
                  className="self-start sm:self-auto text-sm font-semibold text-teal-600 hover:text-teal-700 transition"
                >
                  View All →
                </button>

              </div>

              {/* SEARCH */}
              <div className="mt-4">
                <input
                  type="text"
                  placeholder="Search users..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm
                  focus:outline-none focus:ring-2 focus:ring-teal-500
                  focus:border-teal-500 transition"
                />
              </div>

            </div>

            {/* TABLE */}
            <div className="overflow-x-auto">

              <table className="w-full min-w-[420px]">

                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="text-left px-4 sm:px-6 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Name
                    </th>

                    <th className="text-left px-4 sm:px-6 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Role
                    </th>
                  </tr>
                </thead>

                <tbody>

                  {filteredUsers.length === 0 ? (

                    <tr>
                      <td
                        colSpan="2"
                        className="text-center py-8 text-slate-500 text-sm"
                      >
                        No users found
                      </td>
                    </tr>

                  ) : (

                    filteredUsers.map((user) => (

                      <tr
                        key={user._id}
                        className="border-b border-slate-100 last:border-none hover:bg-slate-50 transition"
                      >

                        <td className="px-4 sm:px-6 py-4">

                          <div className="flex items-center gap-3">

                            <div className="w-9 h-9 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center font-bold">
                              {user.name?.charAt(0).toUpperCase()}
                            </div>

                            <div>
                              <p className="font-semibold text-slate-800 text-sm">
                                {user.name}
                              </p>

                              <p className="text-xs text-slate-400 truncate max-w-[150px]">
                                {user.email}
                              </p>
                            </div>

                          </div>

                        </td>

                        <td className="px-4 sm:px-6 py-4">

                          <span className="inline-flex px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-semibold capitalize">
                            {user.role}
                          </span>

                        </td>

                      </tr>

                    ))

                  )}

                </tbody>

              </table>

            </div>

          </section>

          {/* RECENT BOOKINGS */}
          <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

            {/* HEADER */}
            <div className="p-4 sm:p-6 border-b border-slate-100">

              <div className="flex items-center justify-between gap-3">

                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                    Recent Bookings
                  </h2>

                  <p className="text-sm text-slate-500 mt-1">
                    Latest platform activity
                  </p>
                </div>

                <button
                  onClick={() => navigate("/admin/bookings")}
                  className="text-sm font-semibold text-teal-600 hover:text-teal-700 transition whitespace-nowrap"
                >
                  View All →
                </button>

              </div>

            </div>

            {/* TABLE */}
            <div className="overflow-x-auto">

              <table className="w-full min-w-[420px]">

                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">

                    <th className="text-left px-4 sm:px-6 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Service
                    </th>

                    <th className="text-left px-4 sm:px-6 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Status
                    </th>

                  </tr>
                </thead>

                <tbody>

                  {bookings.length === 0 ? (

                    <tr>
                      <td
                        colSpan="2"
                        className="text-center py-8 text-slate-500 text-sm"
                      >
                        No bookings found
                      </td>
                    </tr>

                  ) : (

                    bookings.slice(0, 5).map((booking) => {

                      let statusClass =
                        "bg-slate-100 text-slate-600";

                      if (booking.status === "completed") {
                        statusClass =
                          "bg-green-50 text-green-700";
                      } else if (booking.status === "pending") {
                        statusClass =
                          "bg-yellow-50 text-yellow-700";
                      } else if (booking.status === "accepted") {
                        statusClass =
                          "bg-blue-50 text-blue-700";
                      } else if (booking.status === "rejected") {
                        statusClass =
                          "bg-red-50 text-red-700";
                      }

                      return (
                        <tr
                          key={booking._id}
                          className="border-b border-slate-100 last:border-none hover:bg-slate-50 transition"
                        >

                          <td className="px-4 sm:px-6 py-4">

                            <p className="font-semibold text-slate-800 text-sm">
                              {booking.service?.title ||
                                "Unknown Service"}
                            </p>

                          </td>

                          <td className="px-4 sm:px-6 py-4">

                            <span
                              className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold capitalize ${statusClass}`}
                            >
                              {booking.status}
                            </span>

                          </td>

                        </tr>
                      );
                    })

                  )}

                </tbody>

              </table>

            </div>

          </section>

        </div>

      </main>

    </div>
  );
}

export default AdminDashboard;