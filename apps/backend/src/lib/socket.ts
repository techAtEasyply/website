import { Server } from "socket.io";
import http from "http";
import express from "express";
import { introduction , evaluateAns  } from '../controllers/socket.controller';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*"
  }
})

io.on("connection", (socket) => {
  console.log("A user connected", socket.id)

  socket.on("introduction", introduction)
  socket.on("evaluate" , evaluateAns)
  socket.on("disconnect", () => {
    console.log("a user disconnected", socket.id)
  })
})

export { io, app, server }


