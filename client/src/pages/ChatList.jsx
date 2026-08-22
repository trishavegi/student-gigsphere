import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function ChatList() {
  const navigate = useNavigate();

  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);

  const currentUserId = localStorage.getItem("userId");

  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.log("No login token found");
        setLoading(false);
        return;
      }

      const response = await api.get("/chat", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log("CHAT RESPONSE:", response.data);

      setChats(response.data);
    } catch (error) {
      console.error(
        "CHAT LIST ERROR:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  const getOtherUser = (chat) => {
    if (!chat.sender || !chat.receiver) {
      return null;
    }

    const senderId =
      chat.sender._id?.toString() ||
      chat.sender.toString();

    const receiverId =
      chat.receiver._id?.toString() ||
      chat.receiver.toString();

    if (senderId === currentUserId) {
      return chat.receiver;
    }

    return chat.sender;
  };

  if (loading) {
    return (
      <div className="max-w-md mx-auto mt-10 bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-5">
          Chats
        </h1>

        <p className="text-gray-500 text-center">
          Loading chats...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow rounded-lg">

      <h1 className="text-2xl font-bold p-5 border-b">
        Chats
      </h1>

      {chats.length === 0 ? (

        <div className="p-10 text-center text-gray-500">

          <p className="text-lg">
            No chats yet.
          </p>

          <p className="text-sm mt-2">
            Start a conversation with a provider.
          </p>

        </div>

      ) : (

        chats.map((chat) => {

          const otherUser = getOtherUser(chat);

          if (!otherUser) {
            return null;
          }

          const otherUserId =
            otherUser._id?.toString();

          return (

            <div
              key={chat._id}

              onClick={() =>
                navigate(`/chat/${otherUserId}`)
              }

              className="p-4 border-b hover:bg-gray-100 cursor-pointer"
            >

              <div className="flex items-center gap-3">

                {/* Avatar */}

                <div className="w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center text-lg font-bold">

                  {otherUser.name
                    ? otherUser.name
                        .charAt(0)
                        .toUpperCase()
                    : "U"}

                </div>

                {/* Chat information */}

                <div className="flex-1 min-w-0">

                  <div className="font-bold text-lg">

                    {otherUser.name || "Unknown User"}

                  </div>

                  <div className="text-gray-500 truncate">

                    {chat.message}

                  </div>

                  <div className="text-xs text-gray-400 mt-1">

                    {chat.createdAt
                      ? new Date(
                          chat.createdAt
                        ).toLocaleTimeString()
                      : ""}

                  </div>

                </div>

                {/* Unread indicator */}

                {!chat.isRead &&
                  chat.receiver?._id?.toString() ===
                    currentUserId && (

                    <div className="w-3 h-3 bg-red-500 rounded-full">
                    </div>

                  )}

              </div>

            </div>

          );
        })

      )}

    </div>
  );
}

export default ChatList;