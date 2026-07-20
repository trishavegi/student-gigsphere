const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  sendMessage,
  getMessages,
  getRecentChats,
  getUnreadCount,
  markMessagesRead
} = require("../controllers/chatController");

// Send message
router.post("/", protect, sendMessage);

// Recent chats
router.get("/", protect, getRecentChats);

// Unread count
router.get(
  "/unread/count",
  protect,
  getUnreadCount
);

// Mark messages read
router.put(
  "/read/:id",
  protect,
  markMessagesRead
);

// Get messages with specific user
router.get(
  "/:id",
  protect,
  getMessages
);

module.exports = router;