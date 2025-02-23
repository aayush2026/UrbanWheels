import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

interface ChatProps {
  poolId: string;
}

const socket = io('http://localhost:3001'); 

const Chat: React.FC<ChatProps> = ({ poolId }) => { 
  const [messages, setMessages] = useState<{ text: string; poolId: string; timestamp: Date; userId: string }[]>([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    // Load stored messages from localStorage
    const storedMessages = localStorage.getItem('chatMessages');
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }

    // Listen for incoming messages
    socket.on('receiveMessage', (message) => {
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages, message];
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
      const message = { text: input, poolId, timestamp: new Date(), userId: 'user1' };
      socket.emit('sendMessage', message);
      setInput('');
    }
  };

  return (
    <div className="chat-container bg-white shadow-md rounded-lg p-4">
      <div className="messages max-h-60 overflow-y-auto mb-4">
        {messages.map((msg, index) => (
          <div key={index} className="message mb-2">
            <span className="text-gray-500 text-xs">{msg.timestamp.toLocaleString()} - {msg.userId}:</span>
            <span className="text-gray-900">{msg.text}</span>
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
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