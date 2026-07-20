import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import AdminHeader from "../../components/AdminHeader";
import AdminCharts from "../../components/AdminCharts";
import api from "../../services/api";
function Analytics() {
  const [analytics, setAnalytics] = useState({
  users: 0,
  services: 0,
  bookings: 0,
  accepted: 0,
  pending: 0,
  rejected: 0,
  cancelled: 0,
});
const [monthlyData, setMonthlyData] = useState([]);
useEffect(() => {
  fetchAnalytics();
  fetchMonthlyAnalytics();
}, []);

const fetchAnalytics = async () => {
  try {
    const response = await api.get("/admin/analytics");

    console.log(response.data);

    setAnalytics(response.data);

  } catch (error) {
    console.log(error);
  }
};
const fetchMonthlyAnalytics = async () => {
  try {

    const response = await api.get("/admin/monthly-analytics");

    console.log(response.data);

    setMonthlyData(response.data);

  } catch (error) {

    console.log(error);

  }
};
  return (
  <div className="flex bg-gray-100 min-h-screen">

    <Sidebar />

    <div className="ml-64 flex-1 p-8">

      <AdminHeader />

      <h1 className="text-3xl font-bold">
        Analytics
      </h1>

      <p className="text-gray-500 mb-6">
        Platform Statistics
      </p>

      {/* Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="bg-blue-600 text-white rounded-xl p-6 shadow-lg">
          <h2 className="text-lg">👥 Users</h2>
          <p className="text-4xl font-bold mt-3">
            {analytics.users}
          </p>
        </div>

        <div className="bg-green-600 text-white rounded-xl p-6 shadow-lg">
          <h2 className="text-lg">🛠 Services</h2>
          <p className="text-4xl font-bold mt-3">
            {analytics.services}
          </p>
        </div>

        <div className="bg-orange-500 text-white rounded-xl p-6 shadow-lg">
          <h2 className="text-lg">📅 Bookings</h2>
          <p className="text-4xl font-bold mt-3">
            {analytics.bookings}
          </p>
        </div>

        <div className="bg-purple-600 text-white rounded-xl p-6 shadow-lg">
          <h2 className="text-lg">✅ Accepted</h2>
          <p className="text-4xl font-bold mt-3">
            {analytics.accepted}
          </p>
        </div>

      </div>

      {/* Chart */}

      <AdminCharts analytics={analytics} monthlyData={monthlyData}/>

      {/* Booking Status */}

      <div className="bg-white rounded-xl shadow-lg p-6 mt-8">

        <h2 className="text-2xl font-bold mb-4">
          Booking Status
        </h2>

        <table className="w-full">

          <thead>

            <tr className="border-b">
              <th className="text-left py-3">Status</th>
              <th className="text-left py-3">Count</th>
            </tr>

          </thead>

          <tbody>

            <tr className="border-b">
              <td className="py-3">Accepted</td>
              <td>{analytics.accepted}</td>
            </tr>

            <tr className="border-b">
              <td className="py-3">Pending</td>
              <td>{analytics.pending}</td>
            </tr>

            <tr className="border-b">
              <td className="py-3">Rejected</td>
              <td>{analytics.rejected}</td>
            </tr>

            <tr>
              <td className="py-3">Cancelled</td>
              <td>{analytics.cancelled}</td>
            </tr>

          </tbody>

        </table>

      </div>

    </div>

  </div>
);
}

export default Analytics;