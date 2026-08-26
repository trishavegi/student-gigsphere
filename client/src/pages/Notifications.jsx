import { useEffect, useState } from "react";
import api from "../services/api";

function Notifications() {

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
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

      console.log("Response:", response.data);

      setNotifications(response.data);

      // Mark unread notifications as read
      response.data.forEach(async (notification) => {

        if (!notification.isRead) {

          await api.put(
            `/notifications/${notification._id}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
              }
            }
          );

        }

      });

    } catch (error) {

      console.log(error);

    }

  };


   return (
  <div className="min-h-screen bg-slate-50 py-10 px-4">

    <div className="max-w-3xl mx-auto">

      <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-teal-800 text-white rounded-3xl p-8 mb-6 shadow-lg">

        <p className="text-teal-300 font-semibold uppercase tracking-wider text-sm">
          Student GigSphere
        </p>

        <h1 className="text-3xl md:text-4xl font-bold mt-2">
          Notifications 🔔
        </h1>

        <p className="text-slate-300 mt-2">
          Stay updated about your bookings and services.
        </p>

      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

        {notifications.length === 0 ? (

          <div className="p-12 text-center">

            <div className="text-5xl mb-4">
              🔔
            </div>

            <h2 className="text-xl font-bold text-slate-700">
              No notifications
            </h2>

            <p className="text-slate-500 mt-2">
              You're all caught up!
            </p>

          </div>

        ) : (

          notifications.map((notification) => (

            <div
              key={notification._id}
              className={`p-5 border-b last:border-b-0
              hover:bg-slate-50 transition ${
                notification.isRead
                  ? "bg-white"
                  : "bg-teal-50"
              }`}
            >

              <div className="flex gap-4">

                <div className="w-10 h-10 rounded-full bg-teal-100
                  flex items-center justify-center shrink-0">
                  🔔
                </div>

                <div>

                  <p className="text-slate-800 font-medium">
                    {notification.message}
                  </p>

                  {!notification.isRead && (
                    <span className="inline-block mt-2
                      text-xs font-semibold text-teal-700
                      bg-teal-100 px-2 py-1 rounded-full">
                      New
                    </span>
                  )}

                </div>

              </div>

            </div>

          ))

        )}

      </div>

    </div>

  </div>
);
} export default Notifications;