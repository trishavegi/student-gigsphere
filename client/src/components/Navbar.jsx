import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

function Navbar() {

  const [unreadCount, setUnreadCount] = useState(0);
  useEffect(() => {

  const token = localStorage.getItem("token");

  if (token) {
    fetchUnread();
  }

}, []);

const fetchUnread = async () => {

  try {

    const response = await api.get(
      "/chat",
      {
        headers: {
          Authorization:
            `Bearer ${localStorage.getItem("token")}`
        }
      }
    );

    setUnreadCount(response.data.length);

  } catch (error) {

    console.log(error);

  }

};

  useEffect(() => {

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

    <nav className="bg-blue-600 p-4 text-white flex justify-between">

      <h1 className="text-2xl font-bold">
        GigSphere
      </h1>

      <div className="space-x-4">

        <Link to="/">Home</Link>

        <Link to="/login">Login</Link>

        <Link to="/register">Register</Link>

        <Link to="/customer-dashboard">
          Customer Dashboard
        </Link>

        <Link to="/provider-dashboard">
          Provider Dashboard
        </Link>

        <Link to="/notifications" className="relative text-2xl">
          🔔

          {unreadCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 text-xs">
              {unreadCount}
            </span>
          )}

        </Link>
        <Link
  to="/chats"
  className="relative text-xl"
>

  💬

  <span
    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 text-xs"
  >

    {unreadCount}

  </span>

</Link>



      </div>

    </nav>

  );

}

export default Navbar;