const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const chatRoutes = require("./routes/chatRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const complaintRoutes = require("./routes/complaintRoutes");

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Student GigSphere Backend Running...");
});
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/complaints", complaintRoutes);


const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [
      "https://student-gigsphere-frontend.onrender.com",
      "http://localhost:5173",
      "http://localhost:5177",
      "http://localhost:5180"
    ],
    methods: ["GET", "POST"],
    credentials: true
  }
});

const onlineUsers = {};

io.on("connection", (socket) => {

  console.log("User connected:", socket.id);

  socket.on("user_online", (userId) => {

    if (!userId) {
      console.log("No userId received");
      return;
    }

    onlineUsers[userId] = socket.id;

    // Put user into their own room
    socket.join(userId.toString());

    console.log("USER ONLINE:", userId);
    console.log("SOCKET ID:", socket.id);
    console.log("ONLINE USERS:", onlineUsers);

    io.emit(
      "online_users",
      Object.keys(onlineUsers)
    );

  });
 socket.on("send_message", (data) => {

    try {

      console.log("========== SOCKET MESSAGE ==========");

      console.log("DATA:", data);

      const receiverId =
        data.receiver?._id || data.receiver;

      console.log("RECEIVER ID:", receiverId);

      if (!receiverId) {

        console.log("No receiver ID found");

        return;
      }

      // Send directly to receiver's room
      io.to(receiverId.toString()).emit(
        "receive_message",
        data
      );

      console.log(
        "MESSAGE SENT TO RECEIVER ROOM:",
        receiverId
      );

    } catch (error) {

      console.error(
        "SOCKET MESSAGE ERROR:",
        error
      );

    }

  });
  socket.on("typing", (data) => {

    const receiverId =
      data?.receiver;

    if (!receiverId) {
      return;
    }

    io.to(receiverId.toString()).emit(
      "typing",
      data
    );

  });
 socket.on("disconnect", () => {

    console.log(
      "User disconnected:",
      socket.id
    );

    for (const userId in onlineUsers) {

      if (
        onlineUsers[userId] === socket.id
      ) {

        delete onlineUsers[userId];

        console.log(
          "USER OFFLINE:",
          userId
        );

      }

    }

    io.emit(
      "online_users",
      Object.keys(onlineUsers)
    );

  });
});


const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {

  console.log(`Server running on port ${PORT}`);

});

server.on("error", (err) => {

  if (err.code === "EADDRINUSE") {

    console.log(`Port ${PORT} is already in use`);

  }

});