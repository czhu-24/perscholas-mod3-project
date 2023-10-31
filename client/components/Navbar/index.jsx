import React from 'react'
import { Link } from 'react-router-dom'
import './index.css'

const Navbar = () => {
	return (
		<nav>
			<img src="https://www.adaptivewfs.com/wp-content/uploads/2020/07/logo-placeholder-image.png" alt="placeholder logo" />
			<Link to="/">Home</Link>
			<Link to="/messages">Messages</Link>
			<Link to="/posts">Posts</Link>
			<Link to="/profile">Profile</Link>
			<Link to="/login">Log In</Link>
			<Link to="/logout">Log Out</Link>
		</nav>
	)
}

export default Navbar