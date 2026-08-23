const Chat = require("../models/Chat");
const Notification = require("../models/Notification");
const User = require("../models/User");

// ===============================
// SEND MESSAGE
// ===============================
// ===============================
// SEND MESSAGE
// ===============================
const sendMessage = async (req, res) => {
  try {
    console.log("========== SEND MESSAGE ==========");

    console.log("REQ.USER:", req.user);
    console.log("BODY:", req.body);

    const { receiver, message } = req.body;

    if (!receiver || !message || !message.trim()) {
      return res.status(400).json({
        message: "Receiver and message are required"
      });
    }

    // Get sender from database
    const senderUser = await User.findById(req.user);

    if (!senderUser) {
      console.log("SENDER USER NOT FOUND:", req.user._id);

      return res.status(401).json({
        message: "Your user account was not found. Please login again."
      });
    }

    // Get receiver from database
    const receiverUser = await User.findById(receiver);

    if (!receiverUser) {
      console.log("RECEIVER USER NOT FOUND:", receiver);

      return res.status(404).json({
        message: "Receiver user not found."
      });
    }

    console.log("SENDER:", senderUser.name, senderUser._id);
    console.log("RECEIVER:", receiverUser.name, receiverUser._id);

    // Create chat
    const chat = await Chat.create({
      sender: senderUser._id,
      receiver: receiverUser._id,
      message: message.trim()
    });

    console.log("CHAT CREATED:", chat._id);

    // Populate sender and receiver
    const populatedChat = await Chat.findById(chat._id)
      .populate("sender", "name email")
      .populate("receiver", "name email");

    console.log("POPULATED CHAT:", populatedChat);

    // Make sure population worked
    if (!populatedChat.sender || !populatedChat.receiver) {
      console.error("SENDER OR RECEIVER POPULATION FAILED");

      return res.status(500).json({
        message: "Unable to load sender or receiver information."
      });
    }

    // Create notification
    try {
      await Notification.create({
        user: receiverUser._id,
        message: `${senderUser.name} sent you a new message`
      });

      console.log("NOTIFICATION CREATED");

    } catch (notificationError) {

      console.error(
        "NOTIFICATION ERROR:",
        notificationError
      );

      // Notification failure should NOT break chat
    }

    console.log("MESSAGE SUCCESS");

    res.status(201).json(populatedChat);

  } catch (error) {

    console.error(
      "========== SEND MESSAGE ERROR =========="
    );

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
const currentUser = req.user;
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
    console.log("========== GET RECENT CHATS ==========");

    console.log("CURRENT USER ID:", req.user);

    // Find the logged-in user
    const currentUser = await User.findById(req.user);

    if (!currentUser) {
      console.log("CURRENT USER NOT FOUND:", req.user);

      return res.status(401).json({
        message: "User not found. Please login again."
      });
    }

    console.log(
      "CURRENT USER:",
      currentUser.name,
      currentUser.email,
      currentUser._id.toString()
    );

    // Find all chats involving this user
    const chats = await Chat.find({
      $or: [
        { sender: currentUser._id },
        { receiver: currentUser._id }
      ]
    })
      .populate("sender", "name email")
      .populate("receiver", "name email")
      .sort({ createdAt: -1 });

    console.log("TOTAL CHATS FOUND:", chats.length);

    const uniqueChats = [];
    const seenUsers = new Set();

    for (const chat of chats) {

      console.log("CHECKING CHAT:", chat._id);

      if (!chat.sender || !chat.receiver) {
        console.log(
          "SKIPPING BROKEN CHAT:",
          chat._id.toString()
        );
        continue;
      }

      const senderId = chat.sender._id.toString();
      const receiverId = chat.receiver._id.toString();
      const currentUserId = currentUser._id.toString();

      console.log("SENDER:", senderId);
      console.log("RECEIVER:", receiverId);
      console.log("CURRENT USER:", currentUserId);

      let otherUser = null;

      if (senderId === currentUserId) {
        otherUser = chat.receiver;
      }

      if (receiverId === currentUserId) {
        otherUser = chat.sender;
      }

      if (!otherUser) {
        console.log("NO OTHER USER FOUND");
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

          user: {
            _id: otherUser._id,
            name: otherUser.name,
            email: otherUser.email
          }
        });
      }
    }

    console.log("========== FINAL RECENT CHATS ==========");
    console.log(uniqueChats);

    res.status(200).json(uniqueChats);

  } catch (error) {

    console.error("========== GET RECENT CHATS ERROR ==========");
    console.error(error);
    console.error(error.stack);

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
  receiver: req.user,
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
    receiver: req.user,
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
