import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Message from '../../components/Message';

const Messages = () => {

	const [formData, setFormData] = useState({
		username: "",
		content: ""
	});

	const [submitMessage, setSubmitMessage] = useState("");

	const [receivedMessages, setReceivedMessages] = useState([]);

	useEffect(() => {
		const token = localStorage.getItem("user_token");

		axios({
			method: "GET",
			url: '/server/messages/read',
			headers: {
				Authorization: token
			}
		}).then((response) => {
			// console.log(response);
			setReceivedMessages(response.data);
		})
			.catch(err => console.error("Error getting messages data", err));
	}, []);

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
			setSubmitMessage("Please enter a username and a message")
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

			setSubmitMessage(response.data.message || "Message sent successfully!");
		} catch (err) {
			// user tried to send message to another username which is invalid
			// user tried to send message but the token has expired between them entering this page & sending the message

			setSubmitMessage(err.response.data.message);
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
			<h2>{submitMessage}</h2>

			<h3>Messages to user</h3>
			{receivedMessages.map((message) => {
				return <Message key={message._id} messageObj={message} />
			})}

		</div>
	)
}

export default Messages