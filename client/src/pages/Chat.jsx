import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import api from "../services/api";

const socket = io("https://student-gigsphere.onrender.com");
function Chat() {

const { id: receiverId } = useParams();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);

  const bottomRef = useRef(null);

  // Load old messages
  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {

    try {

      const response = await api.get(
        `/chat/${receiverId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      setMessages(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  // Receive new messages
  useEffect(() => {

    socket.on("receive_message", (data) => {

      setMessages((prev) => [...prev, data]);

    });

    return () => {

      socket.off("receive_message");

    };

  }, []);

  // Typing indicator
  useEffect(() => {

    socket.on("typing", () => {

      setTyping(true);

      setTimeout(() => {

        setTyping(false);

      }, 1000);

    });

    return () => {

      socket.off("typing");

    };

  }, []);
  useEffect(() => {

  const userId = localStorage.getItem("userId");

  socket.emit("user_online", userId);

  socket.on("online_users", (users) => {

    setOnlineUsers(users);

  });

  return () => {

    socket.off("online_users");

  };

}, []);

  // Auto-scroll
  useEffect(() => {

    bottomRef.current?.scrollIntoView({
      behavior: "smooth"
    });

  }, [messages]);

  // Send message
  const sendMessage = async () => {

    if (!message.trim()) return;

    try {

      const response = await api.post(
        "/chat",
        {
          receiver: receiverId,
          message
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      socket.emit("send_message", response.data);

      setMessages((prev) => [...prev, response.data]);

      setMessage("");

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="h-screen bg-gray-100 flex justify-center items-center">

      <div className="w-full max-w-md bg-white rounded-lg shadow-lg flex flex-col">

        {/* Header */}
        <div className="bg-green-600 text-white p-4 rounded-t-lg">

          <h1 className="text-xl font-bold">
            Provider Name
          </h1>

          {
onlineUsers.includes(receiverId)
?
<div className="flex items-center gap-3">

  <img
    src="https://i.pravatar.cc/150"
    className="w-12 h-12 rounded-full"
    alt=""
  />

  <div>

    <h1 className="text-xl font-bold">
      Provider Name
    </h1>

    <p className="text-sm">
      🟢 Online
    </p>

  </div>

</div>
:
<p className="text-sm text-gray-200">
  ⚫ Offline
</p>
}

        </div>

        {/* Messages */}
        <div className="flex-1 h-96 overflow-y-auto p-4 bg-gray-100">

          {

            messages.map((msg, index) => (

              <div
                key={index}
                className="mb-3 flex justify-end"
              >

                <div className="bg-green-500 text-white px-4 py-2 rounded-lg max-w-xs">

                  <p>{msg.message}</p>

                  <p className="text-xs mt-1">

                    {msg.createdAt
                      ? new Date(msg.createdAt).toLocaleTimeString()
                      : ""}

                  </p>

                </div>

              </div>

            ))

          }

          <div ref={bottomRef}></div>

        </div>

        {/* Typing */}
        {

          typing && (

            <p className="text-gray-500 text-sm px-3 py-1">

              Typing...

            </p>

          )

        }

        {/* Input */}
        <div className="flex p-3 border-t">

          <input
            type="text"
            value={message}
            onChange={(e) => {

              setMessage(e.target.value);

              socket.emit("typing");

            }}
            placeholder="Type a message..."
            className="flex-1 border rounded-full px-4 py-2 outline-none"
          />

          <button
            onClick={sendMessage}
            className="ml-2 bg-green-600 text-white px-5 py-2 rounded-full"
          >
            Send
          </button>

        </div>

      </div>

    </div>

  );

}

export default Chat;