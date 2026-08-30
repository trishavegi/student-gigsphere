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
    <div className="min-h-screen bg-slate-50">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <main className="ml-0 md:ml-64 min-h-screen">

        <div className="px-4 sm:px-6 lg:px-8 py-5 sm:py-8">

          {/* HEADER */}
          <AdminHeader />

          {/* PAGE TITLE */}
          <div className="mt-5 sm:mt-6 mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Analytics
            </h1>

            <p className="text-sm sm:text-base text-slate-500 mt-1">
              Platform Statistics
            </p>
          </div>


          {/* STATISTICS CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">

            {/* USERS */}
            <div className="bg-gradient-to-br from-slate-950 to-slate-800 text-white rounded-2xl p-5 sm:p-6 shadow-md hover:shadow-lg transition">

              <div className="flex items-center justify-between">
                <h2 className="text-sm sm:text-base font-medium text-slate-300">
                  Users
                </h2>

                <span className="text-2xl">
                  👥
                </span>
              </div>

              <p className="text-3xl sm:text-4xl font-bold mt-4">
                {analytics.users}
              </p>

            </div>


            {/* SERVICES */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition">

              <div className="flex items-center justify-between">
                <h2 className="text-sm sm:text-base font-medium text-slate-500">
                  Services
                </h2>

                <span className="text-2xl">
                  🛠️
                </span>
              </div>

              <p className="text-3xl sm:text-4xl font-bold text-teal-600 mt-4">
                {analytics.services}
              </p>

            </div>


            {/* BOOKINGS */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition">

              <div className="flex items-center justify-between">
                <h2 className="text-sm sm:text-base font-medium text-slate-500">
                  Bookings
                </h2>

                <span className="text-2xl">
                  📅
                </span>
              </div>

              <p className="text-3xl sm:text-4xl font-bold text-teal-600 mt-4">
                {analytics.bookings}
              </p>

            </div>


            {/* ACCEPTED */}
            <div className="bg-gradient-to-br from-teal-600 to-teal-700 text-white rounded-2xl p-5 sm:p-6 shadow-md hover:shadow-lg transition">

              <div className="flex items-center justify-between">
                <h2 className="text-sm sm:text-base font-medium text-teal-100">
                  Accepted
                </h2>

                <span className="text-2xl">
                  ✅
                </span>
              </div>

              <p className="text-3xl sm:text-4xl font-bold mt-4">
                {analytics.accepted}
              </p>

            </div>

          </div>


          {/* CHARTS */}
          <div className="mt-6 sm:mt-8 overflow-hidden">
            <AdminCharts
              analytics={analytics}
              monthlyData={monthlyData}
            />
          </div>


          {/* BOOKING STATUS */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm mt-6 sm:mt-8">

            <div className="p-5 sm:p-6 border-b border-slate-200">

              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                Booking Status
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Overview of booking requests
              </p>

            </div>


            {/* TABLE SCROLL CONTAINER */}
            <div className="overflow-x-auto">

              <table className="w-full min-w-[400px]">

                <thead>

                  <tr className="border-b bg-slate-50">

                    <th className="text-left px-5 sm:px-6 py-3 text-sm font-semibold text-slate-600">
                      Status
                    </th>

                    <th className="text-left px-5 sm:px-6 py-3 text-sm font-semibold text-slate-600">
                      Count
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {/* ACCEPTED */}
                  <tr className="border-b hover:bg-slate-50 transition">

                    <td className="px-5 sm:px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-teal-500"></span>
                        <span className="font-medium text-slate-700">
                          Accepted
                        </span>
                      </div>
                    </td>

                    <td className="px-5 sm:px-6 py-4 font-bold text-teal-600">
                      {analytics.accepted}
                    </td>

                  </tr>


                  {/* PENDING */}
                  <tr className="border-b hover:bg-slate-50 transition">

                    <td className="px-5 sm:px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span>
                        <span className="font-medium text-slate-700">
                          Pending
                        </span>
                      </div>
                    </td>

                    <td className="px-5 sm:px-6 py-4 font-bold text-orange-500">
                      {analytics.pending}
                    </td>

                  </tr>


                  {/* REJECTED */}
                  <tr className="border-b hover:bg-slate-50 transition">

                    <td className="px-5 sm:px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                        <span className="font-medium text-slate-700">
                          Rejected
                        </span>
                      </div>
                    </td>

                    <td className="px-5 sm:px-6 py-4 font-bold text-red-500">
                      {analytics.rejected}
                    </td>

                  </tr>


                  {/* CANCELLED */}
                  <tr className="hover:bg-slate-50 transition">

                    <td className="px-5 sm:px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-slate-400"></span>
                        <span className="font-medium text-slate-700">
                          Cancelled
                        </span>
                      </div>
                    </td>

                    <td className="px-5 sm:px-6 py-4 font-bold text-slate-500">
                      {analytics.cancelled}
                    </td>

                  </tr>

                </tbody>

              </table>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Analytics;