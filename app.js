const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const createServer = () => {
  const app = express();
  const server = http.Server(app);
  const io = socketIo(server);

  app.use(
    bodyParser.urlencoded({ extended: false }),
    bodyParser.json(),
    cors(),
    express.static("static")
  );

  io.on("connection", function(socket) {
    socket.emit("socket_init");
    const state = { num: 0 };
    setInterval(() => {
      socket.emit("event", { data: state.num++ });
    }, 1000);
  });

  app.get("/stream", (req, res) => {
    res.status(200).set({
      connection: "keep-alive",
      "cache-control": "no-cache",
      "content-type": "text/event-stream"
    });
    const state = { num: 0 };
    setInterval(() => {
      res.write(`data:${JSON.stringify({ data: state.num++ })}\n\n`);
    }, 1000);
  });
  return server;
};
module.exports = createServer;
