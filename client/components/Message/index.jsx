import React from 'react'

const Message = ({ message }) => {

	// a message inside an array
	// has message.content & message.createdAt, sender (which is... id still sigh)
	// TODO: styling
	return (
		<div>
			<li>{message.message.createdAt}</li>
			<li>{message.message.content}</li>
			<li>Sent by: {message.sender}</li>
		</div>
	)
}

export default Message