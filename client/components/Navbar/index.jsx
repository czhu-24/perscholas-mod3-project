import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import './index.css'
import { primaryContext } from '../../context/primaryContext'
import Logout from '../../pages/Logout'

const Navbar = () => {

	const { user, checkedToken } = useContext(primaryContext);

	return (
		<nav>
			<div>{(checkedToken && user.username) && `You're logged in, ${user.username}`}</div>
			<Link to="/">Home</Link>
			{checkedToken && user.username && <Link to="/messages">Messages</Link>}
			<Link to="/posts">Posts</Link>
			{checkedToken && user.username && <Link to="/profile">Profile</Link>}
			{!user.username && <Link to="/signup">Sign Up</Link>}
			{!user.username && <Link to="/login">Log In</Link>}
			{checkedToken && user.username && <Logout />}

		</nav>
	)
}

export default Navbar