// Start of Selection
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);

// CORS configuration
const io = new Server(server, {
  cors: {
    origin: "https://urban-wheels.localhost:44352", // Removed trailing slash
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true // Allow credentials if needed
  }
});

// Serve static files if needed (optional)
// app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('sendMessage', (message) => {
    console.log('Message sent:', message); // Debug log
    // Broadcast the message to all connected clients
    io.emit('receiveMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
