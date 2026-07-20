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

    <div className="flex bg-gray-100 min-h-screen">

      <Sidebar />

      <div className="ml-64 flex-1 p-8">

        <AdminHeader />

        <h1 className="text-3xl font-bold mb-6">
          Manage Complaints
        </h1>

        <table className="w-full bg-white rounded-lg shadow">

          <thead>

            <tr className="border-b">

              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-left">Service</th>
              <th className="p-3 text-left">Reason</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Action</th>

            </tr>

          </thead>

          <tbody>

            {complaints.map((complaint) => (

              <tr key={complaint._id} className="border-b">

                <td className="p-3">
                  {complaint.user?.name}
                </td>

                <td className="p-3">
                  {complaint.service?.title}
                </td>

                <td className="p-3">
                  {complaint.reason}
                </td>

                <td className="p-3">
                  {complaint.status}
                </td>

                <td className="p-3">

  <div className="flex gap-2">

    {complaint.status === "pending" ? (

      <button
        onClick={() => resolveComplaint(complaint._id)}
        className="bg-green-600 text-white px-3 py-2 rounded"
      >
        Resolve
      </button>

    ) : (

      <span className="text-green-600 font-semibold">
        Resolved
      </span>

    )}

    <button
      onClick={() => deleteService(complaint.service?._id)}
      className="bg-red-600 text-white px-3 py-2 rounded"
    >
      Delete Service
    </button>
    <button
  onClick={() => suspendProvider(complaint.service?.user)}
  className="bg-orange-600 text-white px-3 py-2 rounded"
>
  Suspend Provider
</button>

  </div>

</td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default Complaints;