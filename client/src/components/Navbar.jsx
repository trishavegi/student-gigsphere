import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

function Navbar() {

  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [unreadNotifications, setUnreadNotifications] = useState(0);

  // Check login status
  const loadUser = () => {

    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }

  };

  useEffect(() => {

    loadUser();

    // Listen for login/logout changes
    window.addEventListener("userChanged", loadUser);

    return () => {
      window.removeEventListener("userChanged", loadUser);
    };

  }, []);

  // Get notification count
  useEffect(() => {

    if (user) {
      fetchNotifications();
    }

  }, [user]);

  const fetchNotifications = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await api.get(
        "/notifications",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const unread = response.data.filter(
        (notification) => !notification.isRead
      );

      setUnreadNotifications(unread.length);

    } catch (error) {

      console.log(error);

    }

  };

  // Logout
  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userId");

    setUser(null);

    // Tell Navbar that user changed
    window.dispatchEvent(new Event("userChanged"));

    navigate("/login");

  };

  return (

    <nav className="bg-blue-600 text-white px-6 py-4 shadow-lg">

      <div className="flex justify-between items-center">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold"
        >
          GigSphere
        </Link>


        <div className="flex items-center gap-6">

          {/* Home - always visible */}
          <Link
            to="/"
            className="hover:text-gray-200"
          >
            Home
          </Link>


          {/* BEFORE LOGIN */}
          {!user && (
            <>
              <Link
                to="/login"
                className="hover:text-gray-200"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold"
              >
                Register
              </Link>
            </>
          )}


          {/* AFTER LOGIN */}
          {user && (
            <>

              {/* Customer Dashboard */}
              {user.role === "customer" && (
                <Link
                  to="/customer-dashboard"
                  className="hover:text-gray-200"
                >
                  Customer Dashboard
                </Link>
              )}


              {/* Provider Dashboard */}
              {user.role === "provider" && (
                <Link
                  to="/provider-dashboard"
                  className="hover:text-gray-200"
                >
                  Provider Dashboard
                </Link>
              )}


              {/* Admin Dashboard */}
              {user.role === "admin" && (
                <Link
                  to="/admin"
                  className="hover:text-gray-200"
                >
                  Admin Dashboard
                </Link>
              )}


              {/* Notifications */}
              <div className="relative group">

  <Link
    to="/notifications"
    className="relative text-xl"
  >
    🔔

    {unreadNotifications > 0 && (
      <span className="absolute -top-3 -right-3 bg-red-500 text-white text-xs rounded-full px-2">
        {unreadNotifications}
      </span>
    )}
  </Link>

  {/* Tooltip */}
  <span className="absolute hidden group-hover:block bg-gray-900 text-white text-xs rounded px-3 py-2 whitespace-nowrap top-8 right-0 z-50">
    Notifications (Coming Soon)
  </span>

</div>


              {/* Chat */}
             <div className="relative group">

  <Link
    to="/chats"
    className="relative text-xl"
  >
    💬
  </Link>

  {/* Tooltip */}
  <span className="absolute hidden group-hover:block bg-gray-900 text-white text-xs rounded px-3 py-2 whitespace-nowrap top-8 right-0 z-50">
    Chat (Coming Soon)
  </span>

</div>


              {/* User name */}
              <span className="font-semibold">
                Hi, {user.name}
              </span>


              {/* Logout */}
              <button
                onClick={handleLogout}
                className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Logout
              </button>

            </>
          )}

        </div>

      </div>

    </nav>

  );

}

export default Navbar;