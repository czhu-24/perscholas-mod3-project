import React, { useState } from 'react'
import axios from 'axios'
import validator from 'validator'

const Login = () => {

	const [formData, setFormData] = useState({
		username: "",
		password: ""
	})

	const handleForm = async (e) => {
		e.preventDefault();

		// api call
		try {
			const response = await axios({
				url: "/server/login",
				method: "POST",
				data: formData
			});
			console.log(response.data.token);
			// put jwt token into local storage TODO
			//localStorage.setItem("user_token", response.data.token);
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
				</div>

				<div>
					<label htmlFor="password">Password:</label>
					<input onChange={(e) => setFormData((prevState) => {
						return { ...prevState, password: e.target.value }
					})} name="password" id="password" value={formData.password} />
					<br />

				</div>
				<button>Log In</button>
			</form>
		</div>
	)
}

export default Login