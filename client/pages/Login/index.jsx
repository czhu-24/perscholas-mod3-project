import React, { useState } from 'react'
import axios from 'axios'
import validator from 'validator'

const Login = () => {

	const [formData, setFormData] = useState({
		username: "",
		password: ""
	})

	const [errors, setErrors] = useState({
		username: null,
		password: null
	})

	const handleForm = async (e) => {
		const newErrors = { username: '', password: '' };
		e.preventDefault();

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

		// api call
		try {

		} catch (err) {
			console.error(err.response?.data?.message || 'Error during login.');
		}
	}

	return (
		<div className="page">
			<h1>Log In</h1>

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
		</div>
	)
}

export default Login