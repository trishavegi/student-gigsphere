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

    <div className="flex bg-gray-100 min-h-screen">

      <Sidebar />

      <div className="ml-64 flex-1 p-8">

        <AdminHeader />

        <h1 className="text-3xl font-bold mb-6">
          Provider Verification
        </h1>

        <table className="w-full bg-white rounded-lg shadow">

          <thead>

            <tr className="border-b">

              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Verified</th>
              <th className="p-3 text-left">Action</th>

            </tr>

          </thead>

          <tbody>

            {providers.map((provider) => (

              <tr key={provider._id} className="border-b">

                <td className="p-3">
                  {provider.name}
                </td>

                <td className="p-3">
                  {provider.email}
                </td>

                <td className="p-3">

  <span className="font-semibold">
    {provider.verificationStatus}
  </span>

</td>
                <td className="p-3 flex gap-2">

  <button
    onClick={() => updateProvider(provider._id, "approved")}
    className="bg-green-600 text-white px-3 py-2 rounded"
  >
    Approve
  </button>

  <button
    onClick={() => updateProvider(provider._id, "rejected")}
    className="bg-red-600 text-white px-3 py-2 rounded"
  >
    Reject
  </button>

  <button
    onClick={() => updateProvider(provider._id, "suspended")}
    className="bg-yellow-600 text-white px-3 py-2 rounded"
  >
    Suspend
  </button>

</td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default Providers;