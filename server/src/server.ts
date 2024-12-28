const { createServer } = require("http");
const express = require("express");
const { Server } = require("socket.io");
const mongoose = require("mongoose");

const PORT = 4001;

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

io.on("connection", () => {
  console.log("User connected");
});

mongoose.connect("mongodb://localhost:27018/eltrello").then(() => {
  console.log("Connected to MongoDB");

  httpServer.listen(PORT, () => {
    console.log(`API is listening on port ${PORT}`);
  });
});
