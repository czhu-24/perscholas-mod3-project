import React from 'react'

const Post = ({ post }) => {
	return (
		<div>
			<li>{post.content}</li>
			<li>Author: {post.author}</li>
			<li>Created: {post.formattedCreatedAt}</li>
			<li>Is This Public? {post.isPublic ? "Yes" : "No"}</li>
		</div>
	)
}

export default Post