
import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import AdminHeader from "../../components/AdminHeader";
import api from "../../services/api";

function Complaints() {

  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const response = await api.get("/complaints");
      setComplaints(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const resolveComplaint = async (id) => {
    try {
      await api.put(`/complaints/${id}`);

      alert("Complaint Resolved Successfully");

      fetchComplaints();
    } catch (error) {
      console.log(error);
      alert("Unable to resolve complaint");
    }
  };

  const deleteService = async (serviceId) => {
    try {
      await api.delete(`/admin/services/${serviceId}`);

      alert("Service Deleted Successfully");

      fetchComplaints();
    } catch (error) {
      console.log(error);
      alert("Unable to delete service");
    }
  };

  const suspendProvider = async (providerId) => {
    try {
      await api.put(`/admin/providers/${providerId}/suspend`);

      alert("Provider Suspended Successfully");

      fetchComplaints();
    } catch (error) {
      console.log(error);
      alert("Unable to suspend provider");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
<main className="lg:ml-64 pt-20 lg:pt-8 px-4 sm:px-6 lg:px-8 pb-8">
        {/* HEADER */}
        <AdminHeader />

        {/* PAGE TITLE */}
        <div className="mt-6 mb-6">

          <p className="text-teal-600 font-semibold text-sm uppercase tracking-wide">
            Admin Panel
          </p>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mt-1">
            Manage Complaints
          </h1>

          <p className="text-slate-500 mt-2 text-sm sm:text-base">
            Review reported services and take appropriate action.
          </p>

        </div>

        {/* COMPLAINT COUNT */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5 mb-6">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-slate-500">
                Total Complaints
              </p>

              <p className="text-3xl font-bold text-slate-900 mt-1">
                {complaints.length}
              </p>
            </div>

            <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center text-2xl">
              ⚠️
            </div>

          </div>

        </div>

        {/* DESKTOP TABLE */}
        <div className="hidden md:block bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-slate-900 text-white">

                <tr>

                  <th className="p-4 text-left text-sm font-semibold">
                    Customer
                  </th>

                  <th className="p-4 text-left text-sm font-semibold">
                    Service
                  </th>

                  <th className="p-4 text-left text-sm font-semibold">
                    Reason
                  </th>

                  <th className="p-4 text-left text-sm font-semibold">
                    Status
                  </th>

                  <th className="p-4 text-left text-sm font-semibold">
                    Action
                  </th>

                </tr>

              </thead>

              <tbody>

                {complaints.length === 0 ? (

                  <tr>

                    <td
                      colSpan="5"
                      className="text-center py-12 text-slate-500"
                    >
                      No complaints found.
                    </td>

                  </tr>

                ) : (

                  complaints.map((complaint) => (

                    <tr
                      key={complaint._id}
                      className="border-b border-slate-100 hover:bg-slate-50 transition"
                    >

                      <td className="p-4 font-semibold text-slate-800">
                        {complaint.user?.name || "Unknown"}
                      </td>

                      <td className="p-4 text-slate-700">
                        {complaint.service?.title || "Service deleted"}
                      </td>

                      <td className="p-4 text-slate-600 max-w-xs">
                        {complaint.reason}
                      </td>

                      <td className="p-4">

                        {complaint.status === "pending" ? (

                          <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-orange-50 text-orange-600">
                            Pending
                          </span>

                        ) : (

                          <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-teal-50 text-teal-700">
                            Resolved
                          </span>

                        )}

                      </td>

                      <td className="p-4">

                        <div className="flex flex-wrap gap-2">

                          {complaint.status === "pending" ? (

                            <button
                              onClick={() =>
                                resolveComplaint(complaint._id)
                              }
                              className="bg-teal-600 hover:bg-teal-700 text-white px-3 py-2 rounded-lg text-sm font-semibold transition"
                            >
                              Resolve
                            </button>

                          ) : (

                            <span className="text-teal-600 font-semibold text-sm px-2 py-2">
                              ✓ Resolved
                            </span>

                          )}

                          <button
                            onClick={() =>
                              deleteService(
                                complaint.service?._id
                              )
                            }
                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm font-semibold transition"
                          >
                            Delete
                          </button>

                          <button
                            onClick={() =>
                              suspendProvider(
                                complaint.service?.user
                              )
                            }
                            className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 rounded-lg text-sm font-semibold transition"
                          >
                            Suspend
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>

        </div>

        {/* MOBILE CARDS */}
        <div className="md:hidden space-y-4">

          {complaints.length === 0 ? (

            <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center shadow-sm">

              <div className="text-4xl mb-3">
                📭
              </div>

              <h3 className="font-bold text-slate-800">
                No complaints found
              </h3>

              <p className="text-sm text-slate-500 mt-1">
                Reported services will appear here.
              </p>

            </div>

          ) : (

            complaints.map((complaint) => (

              <div
                key={complaint._id}
                className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5"
              >

                {/* CARD HEADER */}
                <div className="flex items-start justify-between gap-3 mb-4">

                  <div className="min-w-0">

                    <p className="text-xs uppercase tracking-wide text-slate-400">
                      Customer
                    </p>

                    <h3 className="font-bold text-slate-900 truncate">
                      {complaint.user?.name || "Unknown"}
                    </h3>

                  </div>

                  {complaint.status === "pending" ? (

                    <span className="shrink-0 px-3 py-1 rounded-full text-xs font-semibold bg-orange-50 text-orange-600">
                      Pending
                    </span>

                  ) : (

                    <span className="shrink-0 px-3 py-1 rounded-full text-xs font-semibold bg-teal-50 text-teal-700">
                      Resolved
                    </span>

                  )}

                </div>

                {/* SERVICE */}
                <div className="mb-4">

                  <p className="text-xs uppercase tracking-wide text-slate-400">
                    Service
                  </p>

                  <p className="font-semibold text-slate-800 mt-1">
                    {complaint.service?.title || "Service deleted"}
                  </p>

                </div>

                {/* REASON */}
                <div className="bg-slate-50 rounded-xl p-4 mb-5">

                  <p className="text-xs uppercase tracking-wide text-slate-400 mb-1">
                    Complaint
                  </p>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {complaint.reason}
                  </p>

                </div>

                {/* ACTIONS */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">

                  {complaint.status === "pending" ? (

                    <button
                      onClick={() =>
                        resolveComplaint(complaint._id)
                      }
                      className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2.5 rounded-xl text-sm font-semibold transition"
                    >
                      ✓ Resolve
                    </button>

                  ) : (

                    <div className="flex items-center justify-center bg-teal-50 text-teal-700 py-2.5 rounded-xl text-sm font-semibold">
                      ✓ Resolved
                    </div>

                  )}

                  <button
                    onClick={() =>
                      deleteService(
                        complaint.service?._id
                      )
                    }
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-xl text-sm font-semibold transition"
                  >
                    🗑 Delete
                  </button>

                  <button
                    onClick={() =>
                      suspendProvider(
                        complaint.service?.user
                      )
                    }
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2.5 rounded-xl text-sm font-semibold transition"
                  >
                    ⛔ Suspend
                  </button>

                </div>

              </div>

            ))

          )}

        </div>

      </main>

    </div>
  );
}

export default Complaints;

