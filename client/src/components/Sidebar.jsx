
import { useState } from "react";
import { NavLink } from "react-router-dom";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

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
<div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-slate-950 text-white h-16 flex items-center justify-between px-4 border-b border-slate-800 shadow-lg">
        <h1 className="text-xl font-bold">
          Gig<span className="text-teal-400">Sphere</span>
        </h1>

       <button
  onClick={() => setIsOpen(true)}
  className="p-2.5 rounded-xl bg-slate-800 hover:bg-teal-600 active:scale-95 transition-all"
  aria-label="Open menu"
>
  ☰
</button>

      </div>


      {/* MOBILE OVERLAY */}

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
        />
      )}


      {/* SIDEBAR */}

      <aside
        className={`
          fixed top-0 left-0 z-50
          w-64 h-screen
          bg-slate-950 text-white
          shadow-2xl
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >

        {/* LOGO */}

        <div className="h-20 flex items-center justify-between px-6 border-b border-slate-800">

          <h1 className="text-2xl font-bold">
            Gig<span className="text-teal-400">Sphere</span>
          </h1>

          {/* CLOSE BUTTON - MOBILE */}

          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden text-slate-400 hover:text-white text-2xl"
          >
            ✕
          </button>

        </div>


        {/* MENU */}

        <nav className="p-4 space-y-2 overflow-y-auto h-[calc(100vh-80px)]">

          {menuItems.map((item) => (

            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setIsOpen(false)}
              end={item.to === "/admin"}
              className={({ isActive }) =>
                `
                flex items-center gap-3
                px-4 py-3
                rounded-xl
                font-medium
                transition-all duration-200
                ${
                  isActive
                    ? "bg-teal-600 text-white shadow-md"
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

