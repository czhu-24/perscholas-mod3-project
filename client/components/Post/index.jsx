import React from 'react'
import './index.css'

const Post = ({ post }) => {
	return (
		<div>
			<li>{post.content}</li>
			{<li>Author: {post.isAnonymous ? "Anonymous" : post.author.username}</li>}
			<li>Created: {post.formattedCreatedAt}</li>
			<li>Is This Public? {post.isPublic ? "Yes" : "No"}</li>
		</div>
	)
}

export default Post