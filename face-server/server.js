/**
 * @fileoverview
 * Setup and management of the Express server with Socket.IO for real-time interaction.
 * This file configures the HTTP and WebSocket server, handling routes to manage
 * facial expression changes through a web interface.
 *
 * @requires express: Framework for handling HTTP server functionalities.
 * @requires http: Module to create HTTP server.
 * @requires socket.io: Enables real-time, bidirectional communication.
 * @requires cors: Middleware to enable CORS (Cross-Origin Resource Sharing).
 */

const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

// Initialize express application
const app = express();
const server = http.createServer(app);

// Middleware to parse JSON and enable CORS
app.use(express.json());
app.use(cors());

/**
 * WebSocket configuration allowing connections from any origin and handling
 * GET and POST methods.
 */
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

/**
 * Handles WebSocket connections, logging when clients connect and disconnect.
 */
io.on("connection", (socket) => {
  console.log("New client connected");
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

/**
 * Route to change facial expressions. Accepts expression data via POST request
 * and broadcasts it to all connected clients.
 *
 * @route POST /express
 * @param req - HTTP request object containing expression data.
 * @param res - HTTP response object for sending back status.
 */
app.post("/express", (req, res) => {
  const requestData = req.body;
  const expression = requestData.expression;
  console.log("sending: ", expression);
  io.emit("change-expression", expression);
  res.send({ status: "expression changed" });
});

/**
 * Route to execute a function received as a string. Evaluates and executes the function,
 * emitting results to clients. This route is used for dynamic expression adjustments.
 *
 * @route POST /exec-func
 * @param req - HTTP request object containing the function as a string.
 * @param res - HTTP response object for sending back execution status.
 */
app.post("/exec-func", async (req, res) => {
  programData = req.body;
  console.log("executing: ", programData);
  io.emit("execute-expression", programData);
  res.send({ status: "completed" });
});

// Server listening on port 3001
const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

/**
 * Future Considerations:
 * - Implement error handling for both routes to manage erroneous or malicious input.
 * - Review and address potential security implications of executing functions received from the network.
 */
