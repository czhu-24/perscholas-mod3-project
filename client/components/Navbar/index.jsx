import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import './index.css'
import { primaryContext } from '../../context/primaryContext'
import Logout from '../../pages/Logout'

const Navbar = () => {

	const { user, setUser, checkedToken, setCheckedToken } = useContext(primaryContext);

	return (
		<nav>
			<div>{(checkedToken && user.username) && `You're logged in!, ${user.username}`}</div>
			<img src="https://www.adaptivewfs.com/wp-content/uploads/2020/07/logo-placeholder-image.png" alt="placeholder logo" />
			<Link to="/">Home</Link>
			{checkedToken && user.username && <Link to="/messages">Messages</Link>}
			<Link to="/posts">Posts</Link>
			{checkedToken && user.username && <Link to="/profile">Profile</Link>}
			{!checkedToken || !user.username && <Link to="/signup">Sign Up</Link>}
			{!checkedToken || !user.username && <Link to="/login">Log In</Link>}
			{checkedToken && user.username && <Logout />}

		</nav>
	)
}

export default Navbar