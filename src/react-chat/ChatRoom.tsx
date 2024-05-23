import React, { useEffect, useRef, useState, KeyboardEvent, ChangeEvent } from 'react';
import { useMutation } from '@tanstack/react-query';

interface Message {
  role: string;
  content: string;
  s?: number;
}

interface MessageListProps {
  messages: Message[];
  userMessage: boolean;
}

interface InputMessageProps {
  onSendMessage: (message: string) => void;
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

const MessageList: React.FC<MessageListProps> = ({ messages, userMessage }) => {
  const endOfMessagesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (userMessage) {
      endOfMessagesRef.current?.scrollIntoView();
    }
  }, [messages, userMessage]);

  return (
    <div className="max-w-md mx-auto bg-white p-4">
      {messages.map((messageItem, index) => (
        <MessageItem key={index} {...messageItem} />
      ))}
      <div ref={endOfMessagesRef} />
    </div>
  );
};

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
    <div className="max-w-md mx-auto p-4">
      <div className="flex items-center p-4">
        <input
          type="text"
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
    </div>
  );
};

interface ChatRoomProps {
  initialMessages: Message[];
}

const ChatRoom: React.FC<ChatRoomProps> = ({initialMessages}) => {
  const [messages, setMessages] = useState(initialMessages);
  const [userMessage, setUserMessage] = useState(false);

  const mutation = useMutation({
    mutationFn: (message: string) =>
      fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "messages": messages,
          "model": "gpt-4o"
        })
      }).then(res => res.json())
  });

  const handleSendMessage = async(message: string) => {
    setMessages([...messages, { role: "user", content: message, s: false }]);
    setUserMessage(true);
  
    try {
      const response = await mutation.mutateAsync(message);
  
      if (response.choices && response.choices.length > 0) {
        const chatGPTMessage = response.choices[0].message.content.trim();
        setMessages(prevMessages => [...prevMessages, { role: "assistant", content: chatGPTMessage, s: false }]);
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
    <div>
      <MessageList messages={messages} userMessage={userMessage} />
      <InputMessage onSendMessage={handleSendMessage}/>
    </div>
  );
};

export default ChatRoom;
