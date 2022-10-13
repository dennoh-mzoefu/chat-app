const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/chats", require("./Routes/chatRoutes.js"));

// app.use("/chats", (req, res) => {
//   res.send("hello");
// });

const server = http.createServer(app);

const CONNECTION__URL =
  "mongodb+srv://deno1804:deno1804@cluster0.76w4jft.mongodb.net/?retryWrites=true&w=majority";

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User connected ${socket.id}`);

  socket.on("join-room", (data) => {
    socket.join(data);
    console.log(`user ${socket.id} joined room ${data}`);
  });
  socket.on("send-message", (data) => {
    console.log(data);
    socket.to(data.room).emit("receive-message", data);
  });
  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
  });
});
const PORT = 3001;
mongoose
  .connect(CONNECTION__URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    // server.listen(3001, () => {
    //   console.log("Server Running");
    // })

    app.listen(PORT, () => {
      console.log(`Server Is Running on port: ${PORT} `);
    })
  )
  .catch((error) => console.log(error.message));

// app.listen(3005, () => {
//   console.log("express server running on port 3005");
// });
