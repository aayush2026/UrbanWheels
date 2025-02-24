import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

interface ChatProps {
  poolId: string;
  userId: string;
  currentUsername: string;
}

const socket = io('http://localhost:3001'); 

interface User {
  username: string;
}

interface Users {
  [key: string]: User;
}

const Chat: React.FC<ChatProps> = ({ poolId, userId, currentUsername }) => { 
  const [messages, setMessages] = useState<{ text: string; poolId: string; timestamp: Date; userId: string }[]>([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const storedMessages = localStorage.getItem('chatMessages');
    if (storedMessages) {
      const parsedMessages = JSON.parse(storedMessages).map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp),
      }));
      setMessages(parsedMessages);
    }

    socket.on('receiveMessage', (message) => {
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages, { ...message, timestamp: new Date(message.timestamp) }];
        localStorage.setItem('chatMessages', JSON.stringify(updatedMessages));
        return updatedMessages;
      });
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, []);

  const sendMessage = () => {
    if (input) {
      const message = { text: input, poolId, timestamp: new Date(), userId };
      socket.emit('sendMessage', message);
      setInput('');
    }
  };

  const getUserDetails = (userId: string): User => {
    const users: Users = {
      'user1': { username: 'Alice' },
      'user2': { username: 'Bob' },
    };
    return users[userId] || { username: 'Unknown User' };
  };

  return (
    <div className="chat-container shadow-lg shadow-gray-300 dark:shadow-gray-700 rounded-lg p-4 mt-4 bg-white dark:bg-gray-800">
      <div className="messages max-h-60 overflow-y-auto mb-4">
        {messages.map((msg, index) => {
          const timeString = msg.timestamp.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

          return (
            <div key={index} className={`message mb-2 ${msg.userId === userId ? 'self-end' : 'self-start'}`}>
              <div className={`chat-bubble ${msg.userId === userId ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-black dark:text-white'} p-2 rounded-lg`}>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 dark:text-gray-300 text-xs">{msg.userId === userId ? currentUsername : getUserDetails(msg.userId).username}:</span>
                  <span className="text-gray-500 dark:text-gray-300 text-xs">{timeString}</span>
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
          onKeyDown={(e) => { if (e.key === 'Enter') sendMessage(); }}
          placeholder="Type a message..."
          className="flex-grow border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white rounded-md p-2 mr-2"
        />
        <button 
          onClick={sendMessage} 
          className="bg-indigo-600 text-white rounded-md px-4 py-2 hover:bg-indigo-700 dark:hover:bg-indigo-500"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;