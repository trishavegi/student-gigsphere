import { useEffect, useState } from "react";
import api from "../services/api";

function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/notifications", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setNotifications(response.data);

      // Mark unread notifications as read
      response.data.forEach(async (notification) => {
        if (!notification.isRead) {
          try {
            await api.put(
              `/notifications/${notification._id}`,
              {},
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
          } catch (error) {
            console.log("Unable to mark notification as read");
          }
        }
      });
    } catch (error) {
      console.log(
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-3 sm:px-4 py-5 sm:py-8 md:py-10">

      <div className="max-w-3xl mx-auto">

        {/* HEADER */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-teal-900 text-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 md:p-8 mb-5 sm:mb-6 shadow-lg">

          <p className="text-teal-300 font-semibold uppercase tracking-wider text-xs sm:text-sm">
            Student GigSphere
          </p>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-2">
            Notifications 🔔
          </h1>

          <p className="text-slate-300 text-sm sm:text-base mt-2 leading-relaxed">
            Stay updated about your bookings and services.
          </p>

        </div>


        {/* NOTIFICATIONS CARD */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

          {notifications.length === 0 ? (

            <div className="p-8 sm:p-12 text-center">

              <div className="text-4xl sm:text-5xl mb-4">
                🔔
              </div>

              <h2 className="text-lg sm:text-xl font-bold text-slate-700">
                No notifications
              </h2>

              <p className="text-sm sm:text-base text-slate-500 mt-2">
                You're all caught up!
              </p>

            </div>

          ) : (

            notifications.map((notification) => (

              <div
                key={notification._id}
                className={`p-4 sm:p-5 border-b last:border-b-0
                hover:bg-slate-50 transition
                ${
                  notification.isRead
                    ? "bg-white"
                    : "bg-teal-50"
                }`}
              >

                <div className="flex items-start gap-3 sm:gap-4">

                  {/* ICON */}
                  <div
                    className="w-9 h-9 sm:w-10 sm:h-10
                    rounded-full bg-teal-100
                    flex items-center justify-center
                    shrink-0 text-sm sm:text-base"
                  >
                    🔔
                  </div>


                  {/* CONTENT */}
                  <div className="flex-1 min-w-0">

                    <p className="text-sm sm:text-base text-slate-800 font-medium leading-relaxed break-words">
                      {notification.message}
                    </p>

                    {!notification.isRead && (

                      <span
                        className="inline-block mt-2
                        text-[11px] sm:text-xs
                        font-semibold text-teal-700
                        bg-teal-100 px-2 py-1 rounded-full"
                      >
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
}

export default Notifications;