import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import api from "../services/api";

const socket = io("https://student-gigsphere.onrender.com");

socket.on("connect", () => {
  console.log("🟢 SOCKET CONNECTED:", socket.id);
});

socket.on("connect_error", (error) => {
  console.error("🔴 SOCKET CONNECTION ERROR:", error.message);
});

socket.on("disconnect", () => {
  console.log("🔴 SOCKET DISCONNECTED");
});

function Chat() {

const { id: receiverId } = useParams();

const [message, setMessage] = useState("");
const [messages, setMessages] = useState([]);
const [typing, setTyping] = useState(false);
const [onlineUsers, setOnlineUsers] = useState([]);

const bottomRef = useRef(null);

const currentUserId = localStorage.getItem("userId");

// ===============================
// LOAD OLD MESSAGES
// ===============================
useEffect(() => {

const fetchMessages = async () => {

  try {

    const response = await api.get(
      `/chat/${receiverId}`,
      {
        headers: {
          Authorization:
            `Bearer ${localStorage.getItem("token")}`
        }
      }
    );

    console.log("MESSAGES:", response.data);

    setMessages(response.data);

  } catch (error) {

    console.error(
      "FETCH MESSAGES ERROR:",
      error.response?.data || error.message
    );

  }

};

fetchMessages();


}, [receiverId]);

// ===============================
// RECEIVE MESSAGE
// ===============================
useEffect(() => {

  const receiveMessage = (data) => {

    console.log("========== RECEIVED SOCKET MESSAGE ==========");
    console.log("DATA:", data);

    const senderId = String(
      data.sender?._id || data.sender || ""
    );

    const receiverIdFromMessage = String(
      data.receiver?._id || data.receiver || ""
    );

    const currentId = String(
      currentUserId || ""
    );

    const chatUserId = String(
      receiverId || ""
    );

    console.log("Sender ID:", senderId);
    console.log("Receiver ID:", receiverIdFromMessage);
    console.log("Current User ID:", currentId);
    console.log("Chat User ID:", chatUserId);

    const belongsToChat =
      (
        senderId === chatUserId &&
        receiverIdFromMessage === currentId
      ) ||
      (
        senderId === currentId &&
        receiverIdFromMessage === chatUserId
      );

    console.log(
      "BELONGS TO THIS CHAT:",
      belongsToChat
    );

    if (belongsToChat) {

      setMessages((prev) => {

        // Prevent duplicate message
        if (
          data._id &&
          prev.some(
            (msg) => msg._id === data._id
          )
        ) {
          return prev;
        }

        return [
          ...prev,
          data
        ];

      });

    }

  };
socket.on(
    "receive_message",
    receiveMessage
  );

  return () => {

    socket.off(
      "receive_message",
      receiveMessage
    );

  };

}, [
  receiverId,
  currentUserId
]);

// ===============================
// ONLINE USERS
// ===============================
useEffect(() => {

  if (!currentUserId) {
    console.log("🔴 USER ID NOT FOUND");
    return;
  }

  console.log(
    "🟢 REGISTERING USER ONLINE:",
    currentUserId
  );

  const registerUser = () => {

    console.log(
      "📡 Sending user_online:",
      currentUserId
    );

    socket.emit(
      "user_online",
      currentUserId
    );

  };

  if (socket.connected) {
    registerUser();
  } else {
    socket.on("connect", registerUser);
  }

  const handleOnlineUsers = (users) => {

    console.log(
      "👥 ONLINE USERS:",
      users
    );

    setOnlineUsers(users);

  };

  socket.on(
    "online_users",
    handleOnlineUsers
  );

  return () => {

    socket.off(
      "connect",
      registerUser
    );

    socket.off(
      "online_users",
      handleOnlineUsers
    );

  };

}, [currentUserId]);

// ===============================
// TYPING
// ===============================
useEffect(() => {


const handleTyping = (data) => {

  if (data?.sender === receiverId) {

    setTyping(true);

    setTimeout(() => {
      setTyping(false);
    }, 1000);

  }

};

socket.on(
  "typing",
  handleTyping
);

return () => {

  socket.off(
    "typing",
    handleTyping
  );

};


}, [receiverId]);

// ===============================
// AUTO SCROLL
// ===============================
useEffect(() => {


bottomRef.current?.scrollIntoView({
  behavior: "smooth"
});


}, [messages]);

// ===============================
// SEND MESSAGE
// ===============================
const sendMessage = async () => {

if (!message.trim()) {
  return;
}

try {

  const response = await api.post(
    "/chat",
    {
      receiver: receiverId,
      message: message.trim()
    },
    {
      headers: {
        Authorization:
          `Bearer ${localStorage.getItem("token")}`
      }
    }
  );

  console.log(
    "SENT MESSAGE:",
    response.data
  );

  // Add message immediately for sender
  setMessages((prev) => [
    ...prev,
    response.data
  ]);

  // Send through Socket.IO
  socket.emit(
    "send_message",
    response.data
  );

  setMessage("");

} catch (error) {

  console.error(
    "SEND MESSAGE ERROR:",
    error.response?.data || error.message
  );

  alert(
    error.response?.data?.message ||
    "Unable to send message"
  );

}


};

// ===============================
// INPUT TYPING
// ===============================
const handleTyping = (e) => {


setMessage(e.target.value);

socket.emit(
  "typing",
  {
    sender: currentUserId,
    receiver: receiverId
  }
);


};

return (
  <div className="min-h-screen bg-slate-50 flex justify-center items-center px-4 py-6">

    <div className="w-full max-w-2xl h-[650px] bg-white
      rounded-3xl shadow-xl border border-slate-200
      flex flex-col overflow-hidden">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-slate-900 to-teal-800
        text-white p-5">

        <h1 className="text-xl font-bold">
          💬 Chat
        </h1>

        <p className="text-sm text-slate-300 mt-1">
          {onlineUsers.includes(receiverId)
            ? "🟢 Online"
            : "⚫ Offline"}
        </p>

      </div>

      {/* MESSAGES */}
      <div className="flex-1 overflow-y-auto p-5 bg-slate-50">

        {messages.length === 0 ? (

          <div className="text-center text-slate-500 mt-20">

            <div className="text-5xl mb-4">
              💬
            </div>

            <p className="font-semibold">
              No messages yet
            </p>

            <p className="text-sm mt-2">
              Start the conversation.
            </p>

          </div>

        ) : (

          messages.map((msg, index) => {

            const senderId =
              msg.sender?._id || msg.sender;

            const isMine =
              String(senderId) === String(currentUserId);

            return (
              <div
                key={msg._id || index}
                className={`mb-3 flex ${
                  isMine
                    ? "justify-end"
                    : "justify-start"
                }`}
              >

                <div
                  className={`px-4 py-3 rounded-2xl max-w-xs shadow-sm ${
                    isMine
                      ? "bg-teal-600 text-white rounded-br-md"
                      : "bg-white text-slate-800 border border-slate-200 rounded-bl-md"
                  }`}
                >

                  <p>
                    {msg.message}
                  </p>

                  <p className="text-xs mt-1 opacity-70">
                    {msg.createdAt
                      ? new Date(
                          msg.createdAt
                        ).toLocaleTimeString()
                      : ""}
                  </p>

                </div>

              </div>
            );

          })

        )}

        <div ref={bottomRef}></div>

      </div>

      {/* TYPING */}
      {typing && (
        <p className="text-slate-500 text-sm px-5 py-2">
          Typing...
        </p>
      )}

      {/* INPUT */}
      <div className="flex gap-3 p-4 border-t border-slate-200 bg-white">

        <input
          type="text"
          value={message}
          onChange={handleTyping}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
          placeholder="Type a message..."
          className="flex-1 border border-slate-300
          rounded-xl px-4 py-3
          focus:outline-none focus:ring-2
          focus:ring-teal-500"
        />

        <button
          onClick={sendMessage}
          className="bg-teal-600 hover:bg-teal-700
          text-white px-6 py-3 rounded-xl
          font-semibold transition"
        >
          Send
        </button>

      </div>

    </div>

  </div>
);

}

export default Chat;
