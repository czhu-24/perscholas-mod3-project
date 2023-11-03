import React, { useContext, useState } from 'react'
import axios from 'axios'
import validator from 'validator'
import { primaryContext } from '../../context/primaryContext'

const Login = () => {

	const { user, setUser } = useContext(primaryContext);

	const [formData, setFormData] = useState({
		username: "",
		password: ""
	})

	const [message, setMessage] = useState(null);
	const handleForm = async (e) => {
		e.preventDefault();

		if (!formData.username || !formData.password) {
			setMessage("Please enter a username and a password");
			return;
		}

		// api call
		try {
			const response = await axios({
				url: "/server/login",
				method: "POST",
				data: formData
			});
			console.log(response.data.token);
			// put jwt token into local storage 
			localStorage.setItem("user_token", response.data.token);
			if (response.data.dbUser) {
				setUser(response.data.dbUser);
			}
			setMessage(response.data.message || "Login successful");
		} catch (err) {
			setMessage(err.response?.data?.message);
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
				<h2>{message}</h2>
			</form>
		</div>
	)
}

export default Login