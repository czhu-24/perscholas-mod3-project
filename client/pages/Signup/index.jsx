import React, { useState } from 'react'
import axios from 'axios'
import validator from 'validator'

const Signup = () => {

	const [formData, setFormData] = useState({
		username: "",
		password: ""
	})

	const [errors, setErrors] = useState({
		username: null,
		password: null
	})

	const [messages, setMessages] = useState("");

	const handleForm = async (e) => {
		e.preventDefault();
		const newErrors = { username: '', password: '' };

		// handle validation 
		if (!validator.isLength(formData.username, { min: 5, max: 20 })) {
			newErrors.username += "Username must be between 5 and 20 characters. ";
		}

		if (!validator.isAlphanumeric(formData.username.replace(/[-_]/g, ''))) {
			newErrors.username += "Username can only contain alphanumeric characters, dashes, and underscores. "
		}

		if (!validator.isStrongPassword(formData.password)) {
			newErrors.password = 'Password must be stronger. Must have min of 8 characters, 1 uppercase, 1 number, and 1 symbol at least. ';
		}

		setErrors(newErrors);

		// we use newErrors because errors state var won't be updated til the next render
		if (newErrors.username.length !== 0 || newErrors.password.length !== 0) {
			return;
		}

		//console.log(formData);

		// api call
		try {
			await axios({
				method: "POST",
				url: "/server/signup",
				data: formData
			});
			setMessages("successful sign up!");
			setFormData({
				username: "",
				password: ""
			})

		} catch (err) {
			// check if a duplicate username was used & then show error on front end			
			// IF the status code of the response is 400, it'll always go to this catch block

			setMessages(err.response.data.message);
		}
	}

	return (
		<div className="page">
			<h1>Sign Up</h1>

			<form onSubmit={handleForm}>
				<div>
					<label htmlFor="username">Username:</label>
					<input onChange={(e) => setFormData((prevState) => {
						return { ...prevState, username: e.target.value }
					})} name="username" id="username" value={formData.username} />
					<br />
					{errors.username && <span>{errors.username}</span>}
				</div>

				<div>
					<label htmlFor="password">Password:</label>
					<input onChange={(e) => setFormData((prevState) => {
						return { ...prevState, password: e.target.value }
					})} name="password" id="password" value={formData.password} />
					<br />
					{errors.password && <span>{errors.password}</span>}
				</div>
				<button>Log In</button>
			</form>
			<h2>{messages ? messages : ""}</h2>
		</div>
	)
}

export default Signup