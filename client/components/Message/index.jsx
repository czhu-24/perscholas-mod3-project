import React from 'react'

const Message = ({ messageObj }) => {

	// a message inside an array
	// has message.content & message.createdAt, sender (which is... id still sigh)
	// TODO: styling
	return (
		<div>
			<li>{messageObj.message.createdAt}</li>
			<li>{messageObj.message.content}</li>
			<li>Sent by: {messageObj.sender.username}</li>
			<br />
		</div>
	)
}

export default Message