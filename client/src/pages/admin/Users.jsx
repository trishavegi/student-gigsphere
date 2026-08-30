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
    <div className="min-h-screen bg-slate-50">

      <Sidebar />

      {/* MAIN CONTENT */}
<div className="lg:ml-64 px-4 sm:px-6 lg:px-8 pt-20 lg:pt-8 pb-8">
        <AdminHeader />

        {/* PAGE HEADER */}
        <div className="mt-6 lg:mt-2 mb-6">

          <p className="text-teal-600 font-semibold text-sm uppercase tracking-wide">
            Administration
          </p>

          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
            Manage Users
          </h1>

          <p className="text-slate-500 mt-2 text-sm sm:text-base">
            View and manage registered students and service providers.
          </p>

        </div>

        {/* USER COUNT */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5 mb-6">

          <div className="flex items-center gap-4">

            <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center text-2xl">
              👥
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Total Users
              </p>

              <p className="text-2xl font-bold text-slate-900">
                {users.length}
              </p>
            </div>

          </div>

        </div>

        {/* TABLE CARD */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

          {/* MOBILE SCROLL */}
          <div className="overflow-x-auto">

            <table className="w-full min-w-[600px]">

              <thead className="bg-gradient-to-r from-slate-950 to-teal-900 text-white">

                <tr>

                  <th className="px-5 py-4 text-left text-sm font-semibold">
                    Name
                  </th>

                  <th className="px-5 py-4 text-left text-sm font-semibold">
                    Email
                  </th>

                  <th className="px-5 py-4 text-left text-sm font-semibold">
                    Role
                  </th>

                </tr>

              </thead>

              <tbody>

                {users.length === 0 ? (

                  <tr>

                    <td
                      colSpan="3"
                      className="text-center py-10 text-slate-500"
                    >
                      No users found.
                    </td>

                  </tr>

                ) : (

                  users.map((user) => (

                    <tr
                      key={user._id}
                      className="border-b border-slate-100 hover:bg-teal-50/40 transition"
                    >

                      {/* NAME */}
                      <td className="px-5 py-4">

                        <div className="flex items-center gap-3">

                          <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center font-bold">

                            {user.name
                              ? user.name.charAt(0).toUpperCase()
                              : "U"}

                          </div>

                          <span className="font-semibold text-slate-800 whitespace-nowrap">
                            {user.name}
                          </span>

                        </div>

                      </td>

                      {/* EMAIL */}
                      <td className="px-5 py-4 text-slate-600">
                        {user.email}
                      </td>

                      {/* ROLE */}
                      <td className="px-5 py-4">

                        <span
                          className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                            user.role === "provider"
                              ? "bg-teal-100 text-teal-700"
                              : user.role === "admin"
                              ? "bg-slate-200 text-slate-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {user.role}
                        </span>

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
  );
}

export default Users;