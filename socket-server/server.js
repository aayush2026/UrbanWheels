// Start of Selection
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const server = http.createServer(app);

// CORS configuration
const io = new Server(server, {
  cors: {
    origin: process.env.SOCKET_URL, // Removed trailing slash
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true // Allow credentials if needed
  }
});

// Serve static files if needed (optional)
// app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('sendMessage', (message) => {
    console.log('Message sent:', message); // Debug log
    io.emit('receiveMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
