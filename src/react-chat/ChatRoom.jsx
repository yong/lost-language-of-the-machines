import React, { useState } from 'react';

const MessageItem = ({ d, m, s }) => {
	const messagePosition = d === 1 ? 'flex-row-reverse' : 'flex-row';
	const senderAvatar = d === 1 ? '/starlaxverse_avatar.png' : '/flamey_avatar.png';

	return (
		<div className={`flex ${messagePosition} mb-4`}>
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

const MessageList = ({ messages }) => {
	return (
		<div className="max-w-md mx-auto bg-yellow-300 p-4">
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
		<div className="p-4">
			<MessageList messages={messages} />
		</div>
	);
};

export default ChatRoom;
