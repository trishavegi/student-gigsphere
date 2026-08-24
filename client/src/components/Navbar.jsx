import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

function Navbar() {

  const [unreadCount, setUnreadCount] = useState(0);
  const [user, setUser] = useState(null);

  useEffect(() => {

    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const token = localStorage.getItem("token");

    if (token) {
      fetchNotifications();
    }

  }, []);

  const fetchNotifications = async () => {

    try {

      const response = await api.get(
        "/notifications",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      const unread = response.data.filter(
        (notification) => !notification.isRead
      );

      setUnreadCount(unread.length);

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <nav className="bg-blue-600 px-6 py-4 text-white flex justify-between items-center">

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


        {/* ========================= */}
        {/* BEFORE LOGIN */}
        {/* ========================= */}

        {!user && (
          <>
            <Link
              to="/login"
              className="hover:text-gray-200 font-medium"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100"
            >
              Register
            </Link>
          </>
        )}


        {/* ========================= */}
        {/* AFTER LOGIN */}
        {/* ========================= */}

        {user && user.role === "customer" && (
          <Link
            to="/customer-dashboard"
            className="hover:text-gray-200"
          >
            Dashboard
          </Link>
        )}

        {user && user.role === "provider" && (
          <Link
            to="/provider-dashboard"
            className="hover:text-gray-200"
          >
            Dashboard
          </Link>
        )}

        {user && user.role === "admin" && (
          <Link
            to="/admin"
            className="hover:text-gray-200"
          >
            Dashboard
          </Link>
        )}


        {/* Notifications */}
        {user && (
          <Link
            to="/notifications"
            className="relative text-2xl"
          >
            🔔

            {unreadCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 text-xs">
                {unreadCount}
              </span>
            )}

          </Link>
        )}


        {/* Chat */}
        {user && (
          <Link
            to="/chats"
            className="text-xl"
          >
            💬
          </Link>
        )}

      </div>

    </nav>

  );
}

export default Navbar;

