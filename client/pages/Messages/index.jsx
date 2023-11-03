import axios from 'axios';
import React, { useState } from 'react'

const Messages = () => {

	const [formData, setFormData] = useState({
		username: "",
		content: ""
	});

	const [message, setMessage] = useState("");

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData(prevState => ({
			...prevState,
			[name]: value
		}))
	};

	const handleForm = async (e) => {
		e.preventDefault();

		const token = localStorage.getItem("user_token");

		if (!formData.username || !formData.content) {
			setMessage("Please enter a username and a message")
			return;
		}

		try {
			const response = await axios({
				method: "POST",
				url: "/server/messages/create",
				headers: {
					Authorization: token
				},
				data: formData
			});

			setMessage(response.data.message || "Message sent successfully!");
		} catch (err) {
			// user tried to send message to another username which is invalid
			// user tried to send message but the token has expired between them entering this page & sending the message

			setMessage(err.response.data.message);
		}
	}
	return (
		<div className='page'>
			<h1>Messages</h1>
			<form onSubmit={handleForm}>
				{/* TODO: auto-populate with dropdown list of usernames */}
				<label htmlFor="username">Send to: </label><input type="text" onChange={(e) => handleChange(e)} name="username" id="username" value={formData.username} />
				<label htmlFor="content">Message: </label><input type="text" onChange={(e) => handleChange(e)} name="content" id="content" value={formData.content} />
				<button>Send message!</button>
			</form>
			<h2>{message}</h2>

			<h3>Display messages to user below</h3>
		</div>
	)
}

export default Messages