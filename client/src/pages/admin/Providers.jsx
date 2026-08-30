import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import AdminHeader from "../../components/AdminHeader";
import api from "../../services/api";

function Providers() {
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    fetchProviders();
  }, []);

  const fetchProviders = async () => {
    try {
      const response = await api.get("/admin/providers");
      setProviders(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateProvider = async (id, status) => {
    try {
      await api.put(`/admin/providers/${id}/approve`, {
        status,
      });

      alert("Provider Updated");
      fetchProviders();
    } catch (error) {
      console.log(error);
      alert("Unable to update provider");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <div className="flex-1 min-w-0 md:ml-64">

        {/* CONTENT WRAPPER */}
        <div className="p-4 sm:p-6 md:p-8">

          {/* HEADER */}
          <AdminHeader />

          {/* PAGE HEADING */}
          <div className="mt-6 mb-6">
            <p className="text-teal-600 font-semibold text-sm uppercase tracking-wide">
              Admin Panel
            </p>

            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              Provider Verification
            </h1>

            <p className="text-slate-500 mt-2 text-sm sm:text-base">
              Review and manage student service providers.
            </p>
          </div>

          {/* PROVIDER COUNT */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-4 sm:p-5 mb-6">
            <div className="flex items-center gap-3">

              <div className="w-11 h-11 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center text-xl">
                👥
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Total Providers
                </p>

                <p className="text-2xl font-bold text-slate-900">
                  {providers.length}
                </p>
              </div>

            </div>
          </div>

          {/* MOBILE-FRIENDLY TABLE */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

            {/* TABLE SCROLL CONTAINER */}
            <div className="overflow-x-auto">

              <table className="w-full min-w-[750px]">

                <thead className="bg-slate-900 text-white">

                  <tr>

                    <th className="p-4 text-left text-sm font-semibold">
                      Name
                    </th>

                    <th className="p-4 text-left text-sm font-semibold">
                      Email
                    </th>

                    <th className="p-4 text-left text-sm font-semibold">
                      Verification
                    </th>

                    <th className="p-4 text-left text-sm font-semibold">
                      Actions
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {providers.length === 0 ? (

                    <tr>

                      <td
                        colSpan="4"
                        className="p-10 text-center text-slate-500"
                      >
                        No providers found.
                      </td>

                    </tr>

                  ) : (

                    providers.map((provider) => (

                      <tr
                        key={provider._id}
                        className="border-b border-slate-100 hover:bg-slate-50 transition"
                      >

                        {/* NAME */}
                        <td className="p-4">

                          <div className="flex items-center gap-3">

                            <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center font-bold">
                              {provider.name
                                ?.charAt(0)
                                .toUpperCase()}
                            </div>

                            <div>
                              <p className="font-semibold text-slate-800">
                                {provider.name}
                              </p>

                              <p className="text-xs text-slate-400">
                                Provider
                              </p>
                            </div>

                          </div>

                        </td>

                        {/* EMAIL */}
                        <td className="p-4 text-slate-600">
                          {provider.email}
                        </td>

                        {/* STATUS */}
                        <td className="p-4">

                          <span
                            className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                              provider.verificationStatus === "approved"
                                ? "bg-green-100 text-green-700"
                                : provider.verificationStatus === "rejected"
                                ? "bg-red-100 text-red-700"
                                : provider.verificationStatus === "suspended"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            {provider.verificationStatus || "pending"}
                          </span>

                        </td>

                        {/* ACTIONS */}
                        <td className="p-4">

                          <div className="flex flex-wrap gap-2">

                            <button
                              onClick={() =>
                                updateProvider(
                                  provider._id,
                                  "approved"
                                )
                              }
                              className="bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white px-3 py-2 rounded-lg text-sm font-semibold transition shadow-sm"
                            >
                              ✓ Approve
                            </button>

                            <button
                              onClick={() =>
                                updateProvider(
                                  provider._id,
                                  "rejected"
                                )
                              }
                              className="bg-red-600 hover:bg-red-700 active:bg-red-800 text-white px-3 py-2 rounded-lg text-sm font-semibold transition shadow-sm"
                            >
                              ✕ Reject
                            </button>

                            <button
                              onClick={() =>
                                updateProvider(
                                  provider._id,
                                  "suspended"
                                )
                              }
                              className="bg-slate-700 hover:bg-slate-800 active:bg-slate-900 text-white px-3 py-2 rounded-lg text-sm font-semibold transition shadow-sm"
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

        </div>

      </div>

    </div>
  );
}

export default Providers;