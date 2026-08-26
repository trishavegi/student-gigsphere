import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function ChatList() {
  const navigate = useNavigate();

  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.log("NO TOKEN FOUND");
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
  <div className="min-h-screen bg-slate-50 py-10 px-4">

    <div className="max-w-2xl mx-auto">

      <div className="bg-gradient-to-r from-slate-900 to-teal-800
        text-white rounded-3xl p-7 mb-6 shadow-lg">

        <p className="text-teal-300 text-sm font-semibold uppercase tracking-wider">
          Student GigSphere
        </p>

        <h1 className="text-3xl font-bold mt-2">
          Messages 💬
        </h1>

        <p className="text-slate-300 mt-2">
          Continue your conversations.
        </p>

      </div>

      <div className="bg-white rounded-2xl shadow-sm
        border border-slate-200 overflow-hidden">

        {chats.length === 0 ? (

          <div className="p-12 text-center">

            <div className="text-5xl mb-4">
              💬
            </div>

            <p className="text-lg font-bold text-slate-700">
              No chats yet
            </p>

            <p className="text-slate-500 mt-2">
              Start a conversation with a provider.
            </p>

          </div>

        ) : (

          chats.map((chat) => {

            const otherUser = chat.user;

            if (!otherUser) {
              return null;
            }

            return (
              <div
                key={chat._id}
                onClick={() =>
                  navigate(`/chat/${otherUser._id}`)
                }
                className="p-5 border-b last:border-b-0
                hover:bg-teal-50 cursor-pointer transition"
              >

                <div className="flex items-center gap-4">

                  <div className="w-12 h-12 rounded-full
                    bg-teal-600 text-white
                    flex items-center justify-center
                    text-lg font-bold shrink-0">

                    {otherUser.name
                      ? otherUser.name
                          .charAt(0)
                          .toUpperCase()
                      : "U"}

                  </div>

                  <div className="flex-1 min-w-0">

                    <div className="font-bold text-slate-800">
                      {otherUser.name || "Unknown User"}
                    </div>

                    <div className="text-slate-500 truncate mt-1">
                      {chat.message}
                    </div>

                    <div className="text-xs text-slate-400 mt-1">
                      {chat.createdAt
                        ? new Date(
                            chat.createdAt
                          ).toLocaleTimeString()
                        : ""}
                    </div>

                  </div>

                  {!chat.isRead && (
                    <div className="w-3 h-3 bg-teal-600 rounded-full">
                    </div>
                  )}

                </div>

              </div>
            );

          })

        )}

      </div>

    </div>

  </div>
);
}

export default ChatList;