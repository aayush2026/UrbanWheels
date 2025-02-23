 // Start of Selection
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files if needed (optional)
// app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('sendMessage', (message) => {
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
