import React, { useState } from 'react';
import './ChatRoom.css';

const MessageItem = ({ d, m, s }) => {
	const messagePosition = d === 1
		? 'chatApp__convMessageItem--right'
		: 'chatApp__convMessageItem--left';

	const senderAvatar = d === 1
		? '/starlaxverse_avatar.png'
		: '/flamey_avatar.png';

	return (
		<div className={`chatApp__convMessageItem ${messagePosition} clearfix`}>
			<img src={senderAvatar} alt="Avatar" className="chatApp__convMessageAvatar" />
			<div className="chatApp__convMessageValue">
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

const MessageList = ({ messages }) => {
	return (
		<div className="max-w-screen-md mx-auto bg-yellow-300">
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

const ChatRoom = ({initialMessages}) => {
	const [messages, setMessages] = useState(initialMessages);

	return (
		<div className="chatApp__room">
			<MessageList messages={messages} />
		</div>
	);
};

export default ChatRoom;