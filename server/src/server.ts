const { createServer } = require("http");
const express = require("express");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const PORT = 4001;

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

// MIDDLEWARE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// SOCKET.IO
io.on("connection", () => {
  console.log("User connected");
});

// ROUTES
app.use("/api/v1", require("./routes/users.routes"));

mongoose.connect("mongodb://root:123456@localhost:27018/eltrello?authSource=admin").then(() => {
  console.log("Connected to MongoDB");

  httpServer.listen(PORT, () => {
    console.log(`API is listening on port ${PORT}`);
  });
});
