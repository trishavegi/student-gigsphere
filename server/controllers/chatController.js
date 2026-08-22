const Chat = require("../models/Chat");
const Notification = require("../models/Notification");

// ===============================
// SEND MESSAGE
// ===============================
const sendMessage = async (req, res) => {
  try {
    console.log("========== SEND MESSAGE ==========");

    console.log("USER:", req.user);
    console.log("BODY:", req.body);

    const { receiver, message } = req.body;

    if (!receiver || !message || !message.trim()) {
      return res.status(400).json({
        message: "Receiver and message are required"
      });
    }

    console.log("SENDER ID:", req.user._id);
    console.log("RECEIVER ID:", receiver);
    console.log("MESSAGE:", message);

    // Create chat
    const chat = await Chat.create({
      sender: req.user._id,
      receiver: receiver,
      message: message.trim()
    });

    console.log("CHAT CREATED:", chat._id);

    // Populate chat
    const populatedChat = await Chat.findById(chat._id)
      .populate("sender", "name email")
      .populate("receiver", "name email");

    console.log("POPULATED CHAT:", populatedChat);

    // Create notification
    try {
      await Notification.create({
        user: receiver,
        message: `${populatedChat.sender.name} sent you a new message`
      });

      console.log("NOTIFICATION CREATED");

    } catch (notificationError) {

      console.error(
        "NOTIFICATION ERROR:",
        notificationError
      );

    }

    console.log("MESSAGE SUCCESS");

    res.status(201).json(populatedChat);

  } catch (error) {

    console.error("========== SEND MESSAGE ERROR ==========");
    console.error(error);
    console.error(error.message);
    console.error(error.stack);

    res.status(500).json({
      message: error.message
    });
  }
};

// ===============================
// GET MESSAGES BETWEEN TWO USERS
// ===============================
const getMessages = async (req, res) => {
try {
const currentUser = req.user._id;
const currentUserId = currentUser.toString();
const otherUser = req.params.id;

```
const chats = await Chat.find({
  $or: [
    {
      sender: currentUser,
      receiver: otherUser
    },
    {
      sender: otherUser,
      receiver: currentUser
    }
  ]
})
  .populate("sender", "name email")
  .populate("receiver", "name email")
  .sort({ createdAt: 1 });

res.status(200).json(chats);
```

} catch (error) {
console.error("GET MESSAGES ERROR:", error);

```
res.status(500).json({
  message: error.message
});
```

}
};

// ===============================
// GET RECENT CHATS
// ONE CHAT PER PERSON
// ===============================
const getRecentChats = async (req, res) => {
try {
const currentUser = req.user._id;

const chats = await Chat.find({
  $or: [
    { sender: currentUser },
    { receiver: currentUser }
  ]
})
  .populate("sender", "name email")
  .populate("receiver", "name email")
  .sort({ createdAt: -1 });

// Keep only the latest message for each person
const uniqueChats = [];
const seenUsers = new Set();
for (const chat of chats) {

  // Skip broken chat records
  if (!chat.sender || !chat.receiver) {
    console.log("Skipping invalid chat:", chat._id);
    continue;
  }

  const senderId = chat.sender._id.toString();
  const currentUserId = currentUser.toString();

  const otherUser =
    senderId === currentUserId
      ? chat.receiver
      : chat.sender;

  if (!otherUser || !otherUser._id) {
    continue;
  }

  const otherUserId = otherUser._id.toString();

  if (!seenUsers.has(otherUserId)) {


    seenUsers.add(otherUserId);

    uniqueChats.push({
      _id: chat._id,
      message: chat.message,
      createdAt: chat.createdAt,
      isRead: chat.isRead,
      user: otherUser
    });
  }
}

res.status(200).json(uniqueChats);


} catch (error) {
console.error("GET RECENT CHATS ERROR:", error);

res.status(500).json({
  message: error.message
});


}
};

// ===============================
// GET UNREAD COUNT
// ===============================
const getUnreadCount = async (req, res) => {
try {


const count = await Chat.countDocuments({
  receiver: req.user._id,
  isRead: false
});

res.status(200).json({
  count
});


} catch (error) {

console.error("GET UNREAD COUNT ERROR:", error);

res.status(500).json({
  message: error.message
});


}
};

// ===============================
// MARK MESSAGES AS READ
// ===============================
const markMessagesRead = async (req, res) => {
try {


await Chat.updateMany(
  {
    sender: req.params.id,
    receiver: req.user._id,
    isRead: false
  },
  {
    $set: {
      isRead: true
    }
  }
);

res.status(200).json({
  message: "Messages marked as read"
});


} catch (error) {


console.error("MARK READ ERROR:", error);

res.status(500).json({
  message: error.message
});


}
};

module.exports = {
sendMessage,
getMessages,
getRecentChats,
getUnreadCount,
markMessagesRead
};
