const dotenv = require("dotenv");
dotenv.config();

const io = require("socket.io")(process.env.SOCKET_PORT, {
  cors: {
    origin: process.env.FRONTEND_URL,
  },
});

let activeUsers = [];

// Log when the server starts
console.log(`Socket server running on port ${process.env.SOCKET_PORT}`);

io.on("connection", (socket) => {
  console.log("New client connected", socket.id);

  // add new User
  socket.on("new-user-add", (newUserId) => {
    console.log("New user trying to connect:", newUserId);
    // if user is not added previously
    if (!activeUsers.some((user) => user.userId === newUserId)) {
      activeUsers.push({ userId: newUserId, socketId: socket.id });
      console.log("New User Connected", activeUsers);
    }
    // console.log("connected users", activeUsers);
    io.emit("get-users", activeUsers);
  });

  // send message to a specific user
  socket.on("send-message", (data) => {
    const { receiverId } = data;
    const user = activeUsers.find((user) => user.userId === receiverId);
    console.log("Sending from socket to:", receiverId);
    console.log("Data:", data);
    if (user) {
      io.to(user.socketId).emit("recieve-message", data);
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected", socket.id);
    // remove user from active users
    activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
    console.log("User Disconnected", activeUsers);
    // send all active users to all users
    io.emit("get-users", activeUsers);
  });
});
