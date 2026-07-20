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

const [users, setUsers] = useState([]);
const [search, setSearch] = useState("");
useEffect(() => {
  fetchDashboard();
  fetchUsers();
}, []);

const fetchDashboard = async () => {
  try {
    console.log("Calling dashboard API...");

    const response = await api.get("/admin/dashboard");

    console.log("Dashboard Response:", response.data);

    setStats(response.data);

  } catch (error) {

    console.log("Dashboard Error:", error);

  }
};

const fetchUsers = async () => {
  try {
    const response = await api.get("/admin/users");

    console.log("Users Data:", response.data);

    setUsers(response.data);

  } catch (error) {
    console.log(error);
  }
};
const deleteUser = async (id) => {
  try {

    await api.delete(`/admin/users/${id}`);

    alert("User Deleted Successfully");

    fetchUsers();

  } catch (error) {

    console.log(error);

    alert("Unable to delete user");

  }
};
  return (
    <div className="flex bg-gray-100 min-h-screen">

      <Sidebar />

      <div className="ml-64 flex-1 p-8 space-y-8">
<AdminHeader />

        
        {/* Cards */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">

  <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-2xl shadow-lg p-6 hover:scale-105 duration-300">
    <div className="text-4xl">👥</div>
    <h2 className="text-lg mt-3">Total Users</h2>
    <p className="text-4xl font-bold mt-2">{stats.users}</p>
  </div>

  <div className="bg-gradient-to-r from-green-500 to-green-700 text-white rounded-2xl shadow-lg p-6 hover:scale-105 duration-300">
    <div className="text-4xl">🛠</div>
    <h2 className="text-lg mt-3">Services</h2>
    <p className="text-4xl font-bold mt-2">{stats.services}</p>
  </div>

  <div className="bg-gradient-to-r from-orange-500 to-orange-700 text-white rounded-2xl shadow-lg p-6 hover:scale-105 duration-300">
    <div className="text-4xl">📅</div>
    <h2 className="text-lg mt-3">Bookings</h2>
    <p className="text-4xl font-bold mt-2">{stats.bookings}</p>
  </div>

  <div className="bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-2xl shadow-lg p-6 hover:scale-105 duration-300">
    <div className="text-4xl">💰</div>
    <h2 className="text-lg mt-3">Revenue</h2>
    <p className="text-4xl font-bold mt-2">₹0</p>
  </div>

</div>
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

<div className="grid grid-cols-2 gap-6 mt-10"></div>
        <div className="grid grid-cols-2 gap-6 mt-10">

  {/* Recent Users */}

  <div className="bg-white rounded-xl shadow-lg p-6">

    <h2 className="text-2xl font-semibold mb-4">
      Recent Users
    </h2>
    <input
  type="text"
  placeholder="Search user by name..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="w-full border p-3 rounded-lg mb-4"
/>

    <table className="w-full">

      <thead>

        <tr className="border-b">

          <th className="text-left py-2">Name</th>

          <th className="text-left py-2">Role</th>
<th className="text-left py-2">Action</th>
        </tr>

      </thead>

      <tbody>

       {users
  .filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  )
  .map((user) => (
  <tr key={user._id} className="border-b">

    <td className="py-3">
      {user.name}
    </td>

    <td className="py-3">
      {user.role}
    </td>
    <td className="py-3">

  <button
    onClick={() => deleteUser(user._id)}
    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
  >
    Delete
  </button>

</td>

  </tr>
))}

      </tbody>

    </table>

  </div>

  {/* Recent Bookings */}

  <div className="bg-white rounded-xl shadow-lg p-6">

    <h2 className="text-2xl font-semibold mb-4">
      Recent Bookings
    </h2>

    <table className="w-full">

      <thead>

        <tr className="border-b">

          <th className="text-left py-2">Service</th>

          <th className="text-left py-2">Status</th>

        </tr>

      </thead>

      <tbody>

        <tr className="border-b">
          <td className="py-3">Web Design</td>
          <td className="text-green-600">Completed</td>
        </tr>

        <tr className="border-b">
          <td className="py-3">Java Project</td>
          <td className="text-yellow-600">Pending</td>
        </tr>

        <tr>
          <td className="py-3">Logo Design</td>
          <td className="text-blue-600">Accepted</td>
        </tr>

      </tbody>

    </table>

  </div>

</div>

      </div>

    </div>
  );
}

export default AdminDashboard;