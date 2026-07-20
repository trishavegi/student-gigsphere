import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import api from "../services/api";

function ChatList() {
    const { id } = useParams();

const receiverId = id;
const navigate = useNavigate();
  const [chats, setChats] = useState([]);

  useEffect(() => {

    fetchChats();

  }, []);

  const fetchChats = async () => {

    try {

      const response = await api.get(
        "/chat",
        {
          headers: {
            Authorization:
              `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      setChats(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="max-w-md mx-auto bg-white shadow rounded">

      <h1 className="text-2xl font-bold p-4 border-b">

        Chats

      </h1>

      {

        chats.map((chat) => (

          <div
  key={chat._id}
  className="p-4 border-b hover:bg-gray-100 cursor-pointer"
  onClick={() =>
    navigate(
      `/chat/${
        chat.sender._id === localStorage.getItem("userId")
          ? chat.receiver._id
          : chat.sender._id
      }`
    )
  }
>

            <div className="font-bold">

              {chat.sender?.name}

            </div>

            <div className="text-gray-500">

              {chat.message}

            </div>

            <div className="text-xs text-gray-400">

              {new Date(chat.createdAt).toLocaleTimeString()}

            </div>

          </div>

        ))

      }

    </div>

  );

}

export default ChatList;