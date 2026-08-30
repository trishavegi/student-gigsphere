import { NavLink } from "react-router-dom";
import { useState } from "react";

function Sidebar() {
  const [open, setOpen] = useState(false);

  const menuItems = [
    { to: "/admin", icon: "📊", label: "Dashboard" },
    { to: "/admin/users", icon: "👥", label: "Users" },
    { to: "/admin/services", icon: "🛠", label: "Services" },
    { to: "/admin/bookings", icon: "📅", label: "Bookings" },
    { to: "/admin/analytics", icon: "📈", label: "Analytics" },
    { to: "/admin/reports", icon: "📄", label: "Reports" },
    { to: "/admin/complaints", icon: "🚨", label: "Complaints" },
    { to: "/admin/providers", icon: "👨‍💼", label: "Providers" },
    { to: "/admin/settings", icon: "⚙", label: "Settings" },
  ];

  return (
    <>
      {/* MOBILE TOP BAR */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-slate-950 text-white h-16 flex items-center justify-between px-4 shadow-lg">

        <h1 className="text-xl font-bold">
          Gig<span className="text-teal-400">Sphere</span>
        </h1>

        <button
          onClick={() => setOpen(!open)}
          className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-xl"
        >
          {open ? "✕" : "☰"}
        </button>

      </div>


      {/* MOBILE OVERLAY */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="md:hidden fixed inset-0 bg-black/50 z-40"
        />
      )}


      {/* SIDEBAR */}
      <aside
        className={`
          fixed top-0 left-0 z-50
          h-screen w-64
          bg-slate-950 text-white
          shadow-2xl
          transform transition-transform duration-300
          md:translate-x-0
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >

        {/* LOGO */}
        <div className="h-20 flex items-center px-6 border-b border-slate-800">

          <h1 className="text-2xl font-bold">
            Gig<span className="text-teal-400">Sphere</span>
          </h1>

        </div>


        {/* MENU */}
        <nav className="p-4 space-y-2">

          {menuItems.map((item) => (

            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/admin"}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `
                flex items-center gap-3
                px-4 py-3
                rounded-xl
                font-medium
                transition-all duration-200
                ${
                  isActive
                    ? "bg-teal-600 text-white shadow-md shadow-teal-900/30"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }
                `
              }
            >

              <span className="text-lg">
                {item.icon}
              </span>

              <span>
                {item.label}
              </span>

            </NavLink>

          ))}

        </nav>

      </aside>
    </>
  );
}

export default Sidebar;