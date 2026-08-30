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
          Authorization: `Bearer ${token}`,
        },
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

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-6 sm:py-10">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 sm:p-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
              Chats
            </h1>

            <p className="text-slate-500 text-center py-12">
              Loading chats...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-3 sm:px-4 py-5 sm:py-10">

      <div className="max-w-2xl mx-auto">

        {/* =========================
            HEADER
        ========================= */}

        <div
          className="
            bg-gradient-to-br
            from-slate-950
            via-slate-900
            to-teal-800
            text-white
            rounded-2xl
            sm:rounded-3xl
            px-5
            py-6
            sm:p-8
            mb-4
            sm:mb-6
            shadow-lg
          "
        >

          <p className="text-teal-300 text-xs sm:text-sm font-semibold uppercase tracking-wider">
            Student GigSphere
          </p>

          <h1 className="text-2xl sm:text-3xl font-bold mt-2">
            Messages 💬
          </h1>

          <p className="text-slate-300 text-sm sm:text-base mt-2">
            Continue your conversations.
          </p>

        </div>


        {/* =========================
            CHAT LIST
        ========================= */}

        <div
          className="
            bg-white
            rounded-2xl
            shadow-sm
            border
            border-slate-200
            overflow-hidden
          "
        >

          {chats.length === 0 ? (

            /* EMPTY STATE */

            <div className="px-5 py-14 sm:p-12 text-center">

              <div className="text-5xl mb-4">
                💬
              </div>

              <p className="text-lg font-bold text-slate-700">
                No chats yet
              </p>

              <p className="text-sm sm:text-base text-slate-500 mt-2">
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

                <button
                  key={chat._id}
                  type="button"
                  onClick={() =>
                    navigate(`/chat/${otherUser._id}`)
                  }
                  className="
                    w-full
                    text-left
                    px-4
                    py-4
                    sm:px-5
                    sm:py-5
                    border-b
                    last:border-b-0
                    hover:bg-teal-50
                    active:bg-teal-100
                    transition
                    focus:outline-none
                    focus:bg-teal-50
                  "
                >

                  <div className="flex items-center gap-3 sm:gap-4">

                    {/* AVATAR */}

                    <div
                      className="
                        w-11
                        h-11
                        sm:w-12
                        sm:h-12
                        rounded-full
                        bg-teal-600
                        text-white
                        flex
                        items-center
                        justify-center
                        text-base
                        sm:text-lg
                        font-bold
                        shrink-0
                      "
                    >

                      {otherUser.name
                        ? otherUser.name
                            .charAt(0)
                            .toUpperCase()
                        : "U"}

                    </div>


                    {/* CHAT INFORMATION */}

                    <div className="flex-1 min-w-0">

                      <div className="font-bold text-slate-800 text-sm sm:text-base truncate">
                        {otherUser.name || "Unknown User"}
                      </div>

                      <div className="text-slate-500 text-sm truncate mt-1">
                        {chat.message || "No message"}
                      </div>

                      <div className="text-xs text-slate-400 mt-1">
                        {chat.createdAt
                          ? new Date(
                              chat.createdAt
                            ).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : ""}
                      </div>

                    </div>


                    {/* UNREAD */}

                    {!chat.isRead && (
                      <div
                        className="
                          w-2.5
                          h-2.5
                          sm:w-3
                          sm:h-3
                          bg-teal-600
                          rounded-full
                          shrink-0
                        "
                      />
                    )}

                    {/* ARROW */}

                    <span className="text-slate-400 text-lg shrink-0">
                      ›
                    </span>

                  </div>

                </button>

              );
            })

          )}

        </div>

      </div>

    </div>
  );
}

export default ChatList;