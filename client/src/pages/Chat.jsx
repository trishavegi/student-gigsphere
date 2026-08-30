import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

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
        const response = await api.get(`/chat/${receiverId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

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
      const senderId = String(
        data.sender?._id || data.sender || ""
      );

      const receiverIdFromMessage = String(
        data.receiver?._id || data.receiver || ""
      );

      const currentId = String(currentUserId || "");
      const chatUserId = String(receiverId || "");

      const belongsToChat =
        (senderId === chatUserId &&
          receiverIdFromMessage === currentId) ||
        (senderId === currentId &&
          receiverIdFromMessage === chatUserId);

      if (belongsToChat) {
        setMessages((prev) => {
          if (
            data._id &&
            prev.some((msg) => msg._id === data._id)
          ) {
            return prev;
          }

          return [...prev, data];
        });
      }
    };

    socket.on("receive_message", receiveMessage);

    return () => {
      socket.off("receive_message", receiveMessage);
    };
  }, [receiverId, currentUserId]);

  // ===============================
  // ONLINE USERS
  // ===============================
  useEffect(() => {
    if (!currentUserId) return;

    const registerUser = () => {
      socket.emit("user_online", currentUserId);
    };

    if (socket.connected) {
      registerUser();
    } else {
      socket.on("connect", registerUser);
    }

    const handleOnlineUsers = (users) => {
      setOnlineUsers(users);
    };

    socket.on("online_users", handleOnlineUsers);

    return () => {
      socket.off("connect", registerUser);
      socket.off("online_users", handleOnlineUsers);
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

    socket.on("typing", handleTyping);

    return () => {
      socket.off("typing", handleTyping);
    };
  }, [receiverId]);

  // ===============================
  // AUTO SCROLL
  // ===============================
  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  // ===============================
  // SEND MESSAGE
  // ===============================
  const sendMessage = async () => {
    if (!message.trim()) return;

    try {
      const response = await api.post(
        "/chat",
        {
          receiver: receiverId,
          message: message.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setMessages((prev) => [...prev, response.data]);

      socket.emit("send_message", response.data);

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

    socket.emit("typing", {
      sender: currentUserId,
      receiver: receiverId,
    });
  };

  const isOnline = onlineUsers.includes(receiverId);

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-100 flex justify-center">

      {/* CHAT CONTAINER */}
      <div
        className="
          w-full
          max-w-3xl
          bg-white
          shadow-xl
          border-x
          border-slate-200
          flex
          flex-col
          h-[calc(100vh-64px)]
          sm:h-[calc(100vh-80px)]
          sm:my-5
          sm:rounded-2xl
          sm:border
          overflow-hidden
        "
      >

        {/* ================= HEADER ================= */}
        <div
          className="
            bg-gradient-to-r
            from-slate-950
            via-slate-900
            to-teal-800
            text-white
            px-4
            sm:px-6
            py-4
            flex
            items-center
            gap-3
            shadow-md
          "
        >

          {/* BACK BUTTON - MOBILE */}
          <button
            onClick={() => navigate(-1)}
            className="
              sm:hidden
              w-9
              h-9
              rounded-full
              bg-white/10
              hover:bg-white/20
              flex
              items-center
              justify-center
              transition
            "
          >
            ←
          </button>

          {/* AVATAR */}
          <div
            className="
              w-10
              h-10
              sm:w-11
              sm:h-11
              rounded-full
              bg-teal-500
              flex
              items-center
              justify-center
              font-bold
              text-lg
              shadow
            "
          >
            💬
          </div>

          <div className="min-w-0">
            <h1 className="font-bold text-base sm:text-lg">
              Chat
            </h1>

            <p
              className={`text-xs sm:text-sm ${
                isOnline
                  ? "text-teal-200"
                  : "text-slate-300"
              }`}
            >
              {isOnline ? "● Online" : "● Offline"}
            </p>
          </div>

        </div>

        {/* ================= MESSAGES ================= */}
        <div
          className="
            flex-1
            overflow-y-auto
            px-3
            py-4
            sm:px-5
            sm:py-5
            bg-slate-50
          "
        >

          {messages.length === 0 ? (

            <div
              className="
                flex
                flex-col
                items-center
                justify-center
                h-full
                text-center
                text-slate-500
                px-6
              "
            >

              <div
                className="
                  w-16
                  h-16
                  rounded-full
                  bg-teal-50
                  flex
                  items-center
                  justify-center
                  text-3xl
                  mb-4
                "
              >
                💬
              </div>

              <p className="font-semibold text-slate-700">
                No messages yet
              </p>

              <p className="text-sm mt-1">
                Start the conversation.
              </p>

            </div>

          ) : (

            messages.map((msg, index) => {

              const senderId =
                msg.sender?._id || msg.sender;

              const isMine =
                String(senderId) ===
                String(currentUserId);

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
                    className={`
                      max-w-[80%]
                      sm:max-w-md
                      px-4
                      py-3
                      rounded-2xl
                      shadow-sm
                      break-words
                      ${
                        isMine
                          ? `
                            bg-teal-600
                            text-white
                            rounded-br-md
                          `
                          : `
                            bg-white
                            text-slate-800
                            border
                            border-slate-200
                            rounded-bl-md
                          `
                      }
                    `}
                  >

                    <p className="text-sm sm:text-base leading-relaxed">
                      {msg.message}
                    </p>

                    <p className="text-[10px] sm:text-xs mt-1 opacity-60 text-right">
                      {msg.createdAt
                        ? new Date(
                            msg.createdAt
                          ).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : ""}
                    </p>

                  </div>

                </div>
              );
            })

          )}

          <div ref={bottomRef} />

        </div>

        {/* ================= TYPING ================= */}
        {typing && (
          <div className="px-4 py-2 bg-white border-t border-slate-100">
            <p className="text-xs sm:text-sm text-slate-500">
              Typing...
            </p>
          </div>
        )}

        {/* ================= INPUT ================= */}
        <div
          className="
            p-3
            sm:p-4
            border-t
            border-slate-200
            bg-white
          "
        >

          <div className="flex items-center gap-2">

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
              className="
                flex-1
                min-w-0
                border
                border-slate-300
                rounded-xl
                px-3
                sm:px-4
                py-3
                text-sm
                sm:text-base
                focus:outline-none
                focus:ring-2
                focus:ring-teal-500
                focus:border-teal-500
                transition
              "
            />

            <button
              onClick={sendMessage}
              className="
                bg-teal-600
                hover:bg-teal-700
                active:scale-95
                text-white
                px-4
                sm:px-6
                py-3
                rounded-xl
                font-semibold
                text-sm
                sm:text-base
                transition
                shadow-sm
                shrink-0
              "
            >
              <span className="hidden sm:inline">
                Send
              </span>

              <span className="sm:hidden">
                ➤
              </span>
            </button>

          </div>

          <p className="hidden sm:block text-[11px] text-slate-400 mt-2 ml-1">
            Press Enter to send
          </p>

        </div>

      </div>

    </div>
  );
}

export default Chat;