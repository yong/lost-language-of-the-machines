import React, { useEffect, useRef, useState, KeyboardEvent, ChangeEvent } from 'react';
import { useMutation } from '@tanstack/react-query';
import TypingIndicator from './TypingIndicator'

interface Message {
  role: string;
  content: string;
  s?: number;
}

const MessageItem: React.FC<Message> = ({ role, content, s }) => {
  if (role === 'system') {
    return null;
  }

  const messagePosition = role === "assistant" ? 'flex-row-reverse' : 'flex-row';
  const senderAvatar = role === "assistant" ? '/starlaxverse_avatar.png' : '/flamey_avatar.png';

  return (
    <div className={`flex ${messagePosition} mb-4 message-animation`}>
      <img src={senderAvatar} alt="Avatar" className="w-10 h-10 rounded-full" />
      <div className={`ml-4 mr-4 p-2 rounded-lg ${role === "assistant" ? 'bg-gray-200' : 'bg-blue-500 text-white'}`}>
        {s ? (
          <pre>
            {content.split('\n').map((line, i) => (
              <React.Fragment key={i}>
                {line}
                <br/>
              </React.Fragment>
            ))}
          </pre>
        ) : (
          content
        )}
      </div>
    </div>
  );
};

interface MessageListProps {
  messages: Message[];
  interactiveMode: boolean;
}

const MessageList: React.FC<MessageListProps> = ({ messages, interactiveMode }) => {
  const endOfMessagesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (interactiveMode) {
      endOfMessagesRef.current?.scrollIntoView();
    }
  }, [messages, interactiveMode]);

  return (
    <div className="max-w-md mx-auto bg-white p-4">
      {messages.map((messageItem, index) => (
        <MessageItem key={index} {...messageItem} />
      ))}
      <div ref={endOfMessagesRef} />
    </div>
  );
};

interface InputMessageProps {
  onSendMessage: (message: string) => void;
}

const InputMessage: React.FC<InputMessageProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const sendMessage = () => {
    if (message.trim() !== '') {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      sendMessage();
      event.preventDefault(); // Prevents the addition of a new line in the input when pressing 'Enter'
    }
  };

  return (
      <div className="flex items-center p-4">
        <input
          type="text"
          maxLength={280}
          placeholder="Type a message"
          className="flex-grow h-10 px-4 rounded-full bg-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={message}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className="ml-4 w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center hover:bg-blue-700 transition-colors duration-150 ease-in-out"
          onClick={sendMessage}
        >
          <i className="fa fa-send-o"></i>
        </button>
      </div>
  );
};

interface ChatRoomProps {
  initialMessages: Message[];
}

const ChatRoom: React.FC<ChatRoomProps> = ({initialMessages}) => {
  const [messages, setMessages] = useState(initialMessages);
  const [interactiveMode, setInteractiveMode] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);

  const fetchToken = useMutation({
    mutationFn: async () => {
      const res = await fetch('/api/token', { method: 'POST' });
      const data = await res.json();
      setToken(data.token);
      return data.token;
    },
    onError: (error) => {
      console.error("Error fetching token:", error);
      setError("Connection error");
    }
  });

  const chatMutation = useMutation({
    mutationFn: async (message: string) => {
      setIsTyping(true);

      let currentToken = token; // Capture the token value
      if (!currentToken) {
        // If no token yet, optimistically send the chat request
        currentToken = await fetchToken.mutateAsync(); 
      }

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${currentToken}` 
        },
        body: JSON.stringify(messages)
      });

      if (!res.ok) {
        throw new Error("Chat request failed"); // Throw an error for handling
      }
      return res.json();
    },
    onError: (error) => {
      console.error("Error to chat mutation:", error);
      setError("Connection is lost");
      setIsTyping(false);
    },
    onSuccess: () => {
      setIsTyping(false);
    }
  });

  const handleSendMessage = async(message: string) => {
    setMessages([...messages, { role: "user", content: message }]);
    setInteractiveMode(true);

    try {
      const response = await chatMutation.mutateAsync(message);
  
      if (response.choices && response.choices.length > 0) {
        const chatGPTMessage = response.choices[0].message.content.trim();
        setMessages(prevMessages => [...prevMessages, { role: "assistant", content: chatGPTMessage, s: 0 }]);
      } else {
        // Handle the error when there's no choices in the response
        console.error("No choices in the response");
      }
    } catch (error) {
      // Handle the error when the mutation fails
      console.error("An error occurred while sending the message:", error);
    }
  };
  
  return (
    <div className='max-w-md mx-auto bg-white'>
      <MessageList messages={messages} interactiveMode={interactiveMode} />
      {isTyping && <TypingIndicator/>}
      {error ? (
        <div className="flex items-center justify-center text-red-500">
          {error}
        </div>
      ) : messages.length - initialMessages.length <= 10 ? (
        <InputMessage onSendMessage={handleSendMessage}/>
      ) : (
        <div className="flex items-center justify-center text-gray-500">
          Starlax has left the conversation
        </div>
      )}
    </div>
  );
};

export default ChatRoom;
