const { Server } = require("socket.io");
const cors = require("cors");
const express = require("express");
const http = require("http");
const app = express();

app.use(
  cors({
    origin: ["http://localhost:5174/"],
    methods: ["GET", "PUT", "POST", "PATCH", "DELETE"],
  })
);
const emailtoSocketIdmap=new Map()
const socketidtoemailmap=new Map()
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "PUT", "POST", "PATCH", "DELETE"],
  },
});
io.on("connection", (socket) => {
  socket.emit("hello", socket.id);

  socket.emit("ready", (args) => {
    console.log(args);
  });
  socket.on("room:joined",(data)=>{
    const {email,room}=data
    emailtoSocketIdmap.set(email,socket.id)
    socketidtoemailmap.set(socket.id,email)

    // io will emimt an event (userjoined) with provided data to whole room members except who is joining
    io.to(room).emit('userjoined',{email,id:socket.id})
    // console.log(data)
    // console.log(room,"room")
    socket.join(room)
    // console.log(socket.id,"socket.id")
    io.to(socket.id).emit("room:joined",data)
  })
});
server.listen(8080, async () => {
  try {
    console.log("server is running localhost:8080");
  } catch {
    console.log("not able to connect");
  }
});
