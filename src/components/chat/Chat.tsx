import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

interface ChatProps {
  poolId: string;
  userId: string;
  currentUsername: string;
}

const socket = io('http://localhost:3001'); 

// Define a type for user details
interface User {
  username: string;
}

// Define a type for the users object with an index signature
interface Users {
  [key: string]: User; // Allow any string as a key
}

const Chat: React.FC<ChatProps> = ({ poolId, userId, currentUsername }) => { 
  const [messages, setMessages] = useState<{ text: string; poolId: string; timestamp: Date; userId: string }[]>([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    // Load stored messages from localStorage
    const storedMessages = localStorage.getItem('chatMessages');
    if (storedMessages) {
      const parsedMessages = JSON.parse(storedMessages).map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp), // Convert timestamp to Date object
      }));
      setMessages(parsedMessages);
    }

    // Listen for incoming messages
    socket.on('receiveMessage', (message) => {
      console.log('Message received:', message); // Debug log
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages, { ...message, timestamp: new Date(message.timestamp) }]; // Convert timestamp to Date object
        localStorage.setItem('chatMessages', JSON.stringify(updatedMessages)); // Save to localStorage
        return updatedMessages;
      });
    });

    // Clean up the socket connection on unmount
    return () => {
      socket.off('receiveMessage');
    };
  }, []);

  const sendMessage = () => {
    if (input) {
      const message = { text: input, poolId, timestamp: new Date(), userId }; // Ensure timestamp is a Date object
      console.log('Sending message:', message); // Debug log
      socket.emit('sendMessage', message);
      setInput('');
    }
  };

  // Mock function to simulate fetching user details
  const getUserDetails = (userId: string): User => {
    const users: Users = {
      'user1': { username: 'Alice' },
      'user2': { username: 'Bob' },
      // Add more users as needed
    };
    return users[userId] || { username: 'Unknown User' };
  };

  return (
    <div className="chat-container shadow-lg shadow-gray-300 rounded-lg p-4 mt-4 bg-white">
      <div className="messages max-h-60 overflow-y-auto mb-4">
        {messages.map((msg, index) => {
          const timeString = msg.timestamp.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }); // Format time

          return (
            <div key={index} className={`message mb-2 ${msg.userId === userId ? 'self-end' : 'self-start'}`}>
              <div className={`chat-bubble ${msg.userId === userId ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'} p-2 rounded-lg`}>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 text-xs">{msg.userId === userId ? currentUsername : getUserDetails(msg.userId).username}:</span>
                  <span className="text-gray-500 text-xs">{timeString}</span>
                </div>
                <span className="block">{msg.text}</span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') sendMessage(); }} // Send message on Enter key press
          placeholder="Type a message..."
          className="flex-grow border border-gray-300 rounded-md p-2 mr-2"
        />
        <button 
          onClick={sendMessage} 
          className="bg-indigo-600 text-white rounded-md px-4 py-2 hover:bg-indigo-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;