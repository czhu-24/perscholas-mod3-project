import React, { useContext } from 'react'
import { primaryContext } from '../../context/primaryContext'

const Profile = () => {

	const { user } = useContext(primaryContext);

	return (
		<div className="page">
			<h1>Profile</h1>
			<div>
				<h2>Description</h2>
				{user.profileDescription ? user.profileDescription : "Your description is empty. Add anything!"}
				<h2>Change your username here</h2>
			</div>
		</div>
	)
}

export default Profile