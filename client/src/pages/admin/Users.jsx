import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import AdminHeader from "../../components/AdminHeader";
import api from "../../services/api";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get("/admin/users");
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="ml-64 flex-1 p-8">
        <AdminHeader />

        <h1 className="text-3xl font-bold mb-6">
          Manage Users
        </h1>

        <table className="w-full bg-white shadow rounded-lg">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b text-center">
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
}

export default Users;
