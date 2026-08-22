import { useEffect, useState, useRef } from "react";
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

  console.log("RECEIVED MESSAGE:", data);

  const senderId =
    data.sender?._id || data.sender;

  const receiver =
    data.receiver?._id || data.receiver;

  // Only add messages belonging to this conversation
  if (
    (senderId === receiverId && receiver === currentUserId) ||
    (senderId === currentUserId && receiver === receiverId)
  ) {

    setMessages((prev) => [
      ...prev,
      data
    ]);

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


}, [receiverId, currentUserId]);

// ===============================
// ONLINE USERS
// ===============================
useEffect(() => {


if (!currentUserId) return;

socket.emit(
  "user_online",
  currentUserId
);

const handleOnlineUsers = (users) => {

  setOnlineUsers(users);

};

socket.on(
  "online_users",
  handleOnlineUsers
);

return () => {

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


<div className="h-screen bg-gray-100 flex justify-center items-center">

  <div className="w-full max-w-md h-[600px] bg-white rounded-lg shadow-lg flex flex-col">


    {/* HEADER */}

    <div className="bg-green-600 text-white p-4 rounded-t-lg">

      <h1 className="text-xl font-bold">
        Chat
      </h1>

      <p className="text-sm">

        {onlineUsers.includes(receiverId)
          ? "🟢 Online"
          : "⚫ Offline"}

      </p>

    </div>


    {/* MESSAGES */}

    <div className="flex-1 overflow-y-auto p-4 bg-gray-100">

      {messages.length === 0 ? (

        <div className="text-center text-gray-500 mt-10">

          No messages yet.

          <p className="text-sm mt-2">
            Start the conversation.
          </p>

        </div>

      ) : (

        messages.map((msg, index) => {

          const senderId =
            msg.sender?._id || msg.sender;

          const isMine =
            senderId === currentUserId;

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
                className={`px-4 py-2 rounded-lg max-w-xs ${
                  isMine
                    ? "bg-green-500 text-white"
                    : "bg-white text-gray-800 shadow"
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

      <p className="text-gray-500 text-sm px-3 py-1">
        Typing...
      </p>

    )}


    {/* INPUT */}

    <div className="flex p-3 border-t">

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
        className="flex-1 border rounded-full px-4 py-2 outline-none"
      />

      <button
        onClick={sendMessage}
        className="ml-2 bg-green-600 text-white px-5 py-2 rounded-full hover:bg-green-700"
      >
        Send
      </button>

    </div>

  </div>

</div>


);

}

export default Chat;
