import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-64 h-screen bg-slate-900 text-white fixed">

      <h1 className="text-3xl font-bold p-6 border-b border-gray-700">
        GigSphere
      </h1>

      <div className="flex flex-col mt-6">

        <NavLink
  to="/admin"
  className={({ isActive }) =>
    `flex items-center gap-3 p-3 rounded-lg ${
      isActive ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-800"
    }`
  }
>
  📊 Dashboard
</NavLink>

<NavLink
  to="/admin/users"
  className={({ isActive }) =>
    `flex items-center gap-3 p-3 rounded-lg ${
      isActive ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-800"
    }`
  }
>
  👥 Users
</NavLink>

<NavLink
  to="/admin/services"
  className={({ isActive }) =>
    `flex items-center gap-3 p-3 rounded-lg ${
      isActive ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-800"
    }`
  }
>
  🛠 Services
</NavLink>

<NavLink
  to="/admin/bookings"
  className={({ isActive }) =>
    `flex items-center gap-3 p-3 rounded-lg ${
      isActive ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-800"
    }`
  }
>
  📅 Bookings
</NavLink>

<NavLink
  to="/admin/analytics"
  className={({ isActive }) =>
    `flex items-center gap-3 p-3 rounded-lg ${
      isActive ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-800"
    }`
  }
>
  📈 Analytics
</NavLink>

<NavLink
  to="/admin/reports"
  className={({ isActive }) =>
    `flex items-center gap-3 p-3 rounded-lg ${
      isActive ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-800"
    }`
  }
>
  📄 Reports
</NavLink>
<NavLink
  to="/admin/complaints"
  className={({ isActive }) =>
    `flex items-center gap-3 p-3 rounded-lg ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-gray-300 hover:bg-gray-800"
    }`
  }
>
  🚨 Complaints
</NavLink>
<NavLink
  to="/admin/providers"
  className={({ isActive }) =>
    `flex items-center gap-3 p-3 rounded-lg ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-gray-300 hover:bg-gray-800"
    }`
  }
>
  👨‍💼 Providers
</NavLink>

<NavLink
  to="/admin/settings"
  className={({ isActive }) =>
    `flex items-center gap-3 p-3 rounded-lg ${
      isActive ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-800"
    }`
  }
>
  ⚙ Settings
</NavLink>

      </div>

    </div>
  );
}

export default Sidebar;