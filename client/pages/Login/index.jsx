import React, { useState } from 'react'

const Login = () => {

	const [formData, setFormData] = useState({
		username: "",
		password: ""
	})

	const handleForm = () => {

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
				</div>

				<div>
					<label htmlFor="password">Password:</label>
					<input onChange={(e) => setFormData((prevState) => {
						return { ...prevState, password: e.target.value }
					})} name="password" id="password" value={formData.password} />
				</div>
				<button>Log In</button>
			</form>
		</div>
	)
}

export default Login