
import { useState } from "react";
import { NavLink } from "react-router-dom";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { to: "/admin", label: "Dashboard", icon: "📊" },
    { to: "/admin/users", label: "Users", icon: "👥" },
    { to: "/admin/services", label: "Services", icon: "🛠" },
    { to: "/admin/bookings", label: "Bookings", icon: "📅" },
    { to: "/admin/analytics", label: "Analytics", icon: "📈" },
    { to: "/admin/reports", label: "Reports", icon: "📄" },
    { to: "/admin/complaints", label: "Complaints", icon: "🚨" },
    { to: "/admin/providers", label: "Providers", icon: "👨‍💼" },
    { to: "/admin/settings", label: "Settings", icon: "⚙" },
  ];

  return (
    <>
      {/* MOBILE HEADER */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-slate-950 text-white shadow-lg">
        <div className="flex items-center justify-between px-4 py-4">

          <h1 className="text-xl font-bold">
            <span className="text-teal-400">Gig</span>Sphere
          </h1>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-teal-600 transition flex items-center justify-center text-xl"
          >
            {isOpen ? "✕" : "☰"}
          </button>

        </div>
      </div>

      {/* MOBILE SIDEBAR */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/40"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`
          fixed z-50 top-0 left-0 h-screen w-72
          bg-slate-950 text-white shadow-2xl
          transform transition-transform duration-300
          md:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >

        {/* LOGO */}
        <div className="h-20 flex items-center px-6 border-b border-slate-800">

          <h1 className="text-2xl font-bold">
            <span className="text-teal-400">Gig</span>Sphere
          </h1>

        </div>

        {/* NAVIGATION */}
        <nav className="px-4 py-6 space-y-2">

          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/admin"}
              onClick={() => setIsOpen(false)}
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
              <span className="text-lg w-6 text-center">
                {link.icon}
              </span>

              <span>
                {link.label}
              </span>
            </NavLink>
          ))}

        </nav>

      </aside>

      {/* DESKTOP CONTENT SPACING */}
      <div className="hidden md:block w-64 flex-shrink-0" />

      {/* MOBILE TOP SPACING */}
      <div className="md:hidden h-16" />
    </>
  );
}

export default Sidebar;

