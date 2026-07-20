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

    <div>

      <h1>Notifications</h1>

      {
        notifications.length === 0 ? (

          <p>No notifications found</p>

        ) : (

          notifications.map((notification) => (

            <div key={notification._id}>

              <p>{notification.message}</p>

              <hr />

            </div>

          ))

        )
      }

    </div>

  );

}

export default Notifications;