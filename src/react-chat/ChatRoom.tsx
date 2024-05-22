import React, { useEffect, useRef, useState, KeyboardEvent, ChangeEvent } from 'react';

interface Message {
  d: number;
  m: string;
  s: boolean;
}

interface MessageItemProps {
  d: number;
  m: string;
  s: boolean;
}

const MessageItem: React.FC<MessageItemProps> = ({ d, m, s }) => {
  const messagePosition = d === 1 ? 'flex-row-reverse' : 'flex-row';
  const senderAvatar = d === 1 ? '/starlaxverse_avatar.png' : '/flamey_avatar.png';

  return (
    <div className={`flex ${messagePosition} mb-4 message-animation`}>
      <img src={senderAvatar} alt="Avatar" className="w-10 h-10 rounded-full" />
      <div className={`ml-4 mr-4 p-2 rounded-lg ${d === 1 ? 'bg-gray-200' : 'bg-blue-500 text-white'}`}>
        {s ? (
          <pre>
            {m.split('\n').map((line, i) => (
              <React.Fragment key={i}>
                {line}
                <br/>
              </React.Fragment>
            ))}
          </pre>
        ) : (
          m
        )}
      </div>
    </div>
  );
};

interface MessageListProps {
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <div className="max-w-md mx-auto bg-white p-4">
      {messages.map((messageItem, index) => (
        <MessageItem
          key={index}
          d={messageItem.d}
          m={messageItem.m}
          s={messageItem.s}
        />
      ))}
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

  const handleSendMessage = (message: string) => {
    setMessages([...messages, { d: 0, m: message, s: false }]);
  };

  return (
    <div className="">
      <MessageList messages={messages} />
      <InputMessage onSendMessage={handleSendMessage}/>
    </div>
  );
};

export default ChatRoom;
