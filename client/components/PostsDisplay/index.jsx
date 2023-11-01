import React, { useContext, useEffect } from 'react'
import { primaryContext } from '../../context/primaryContext'
import axios from 'axios'
import './index.css'
import Post from '../Post'

const PostsDisplay = () => {
	const { posts, setPosts } = useContext(primaryContext);

	// functions to handle edit and delete
	const handleDelete = () => {

	}



	return (
		<div className="page">
			<h1>Posts</h1>
			<ul className="list-grid-parent">
				{posts.map((post) =>
					<div key={JSON.stringify(post)} className="list-grid">
						<img src="../src/assets/profile.png" alt="profile" />
						<div key={post._id} className="post">
							<Post post={post} />
						</div>
						<button className="edit-btn">Edit</button>
						<button onClick={() => handleDelete(post._id)} className="delete-btn">Delete</button>
					</div>
				)}
			</ul>
		</div>

	)
}

export default PostsDisplay