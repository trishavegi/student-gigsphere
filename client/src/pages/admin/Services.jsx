import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import api from "../../services/api";

function Services() {
  const [services, setServices] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await api.get("/services");

      console.log(response.data);

      setServices(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteService = async (id) => {
  try {
    await api.delete(`/admin/services/${id}`);

    alert("Service Deleted Successfully");

    fetchServices();
  } catch (error) {
    console.log(error);

    alert("Unable to delete service");
  }
};
const updateStatus = async (id, status) => {
  try {

    await api.put(`/admin/services/${id}`, {
      status,
    });

    alert("Status Updated Successfully");

    fetchServices();

  } catch (error) {

    console.log(error);

    alert("Unable to update status");

  }
};

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="ml-64 flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">
          Manage Services
        </h1>
        <input
  type="text"
  placeholder="Search Service..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="w-full border p-3 rounded-lg mb-6"
/>

        <table className="w-full bg-white rounded-lg shadow">
          <thead>
            <tr className="border-b">
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Action</th>
              
            </tr>
          </thead>

          <tbody>
            {services
  .filter((service) =>
    service.title.toLowerCase().includes(search.toLowerCase())
  )
  .map((service) => (
              <tr key={service._id} className="border-b">
                <td className="p-3">{service.title}</td>
                <td className="p-3">{service.category}</td>
                <td className="p-3">₹{service.price}</td>
                <td className="p-3">{service.status}</td>
                <td className="p-3">
  <div className="flex gap-2">

  <button
    onClick={() => updateStatus(service._id, "Approved")}
    className="bg-green-600 text-white px-3 py-2 rounded"
  >
    Approve
  </button>

  <button
    onClick={() => updateStatus(service._id, "Rejected")}
    className="bg-yellow-500 text-white px-3 py-2 rounded"
  >
    Reject
  </button>

  <button
    onClick={() => deleteService(service._id)}
    className="bg-red-600 text-white px-3 py-2 rounded"
  >
    Delete
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

export default Services;