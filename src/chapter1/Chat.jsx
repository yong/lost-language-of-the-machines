// Chat.jsx
import React from 'react';
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { MainContainer, ChatContainer, MessageList, Avatar, Message } from '@chatscope/chat-ui-kit-react';

const messages = [
    { d: 0, m: "Hi, u there?" },
    { d: 1, m: "👋" },
    { d: 0, m: "Have you seen the homework?" },
    { d: 1, m: "y" },
    { d: 0, m: "What about the questions that convert Decimal into Binary?" },
    { d: 0, m: "He did not teach us how to do that 😠" },
    { d: 1, m: "yep, don't know why he left in a hurry" }
];

const Chat = () => {
  return (
    <div className="max-w-screen-md mx-auto">
        <ChatContainer>
          <MessageList>
            {messages.map((msg, index) => (
              <Message key={index} model={{ message: msg.m, direction: msg.d }}>
                <Avatar src={msg.d === 1 ? '/starlaxverse_avatar.png' : '/flamey_avatar.png'} />
              </Message>
            ))}
          </MessageList>
        </ChatContainer>
    </div>
  );
};

export default Chat;
