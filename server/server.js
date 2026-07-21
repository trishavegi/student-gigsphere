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
      "http://localhost:5173",
      "http://localhost:5177",
      "http://localhost:5180"
    ],
    methods: ["GET", "POST"]
  }
});

const onlineUsers = {};

io.on("connection", (socket) => {

  console.log("User connected:", socket.id);

  socket.on("user_online", (userId) => {

    onlineUsers[userId] = socket.id;

    io.emit(
      "online_users",
      Object.keys(onlineUsers)
    );

  });

  socket.on("send_message", (data) => {

    socket.broadcast.emit(
      "receive_message",
      data
    );

  });

  socket.on("typing", () => {

    socket.broadcast.emit("typing");

  });

  socket.on("disconnect", () => {

    console.log("User disconnected:", socket.id);

    for (let userId in onlineUsers) {

      if (onlineUsers[userId] === socket.id) {

        delete onlineUsers[userId];

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