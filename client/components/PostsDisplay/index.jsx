import React, { useContext, useEffect } from 'react'
import { primaryContext } from '../../context/primaryContext'
import axios from 'axios'
import './index.css'

const PostsDisplay = () => {
	const { posts, setPosts } = useContext(primaryContext);

	useEffect(() => {
		// fill the posts within Context
		try {
			axios({
				method: "GET",
				url: "/server/posts/read"
			}).then((response) => {
				// console.log(response.data);
				setPosts(response.data);
			})
		} catch (err) {
			console.error(err);
		}
	}, [])

	return (
		<div className="page">
			<h1>Posts</h1>
			<ul className="list-container">
				{posts.map((post) =>
					<div key={post._id} className="post">
						<li>{post.content}</li>
						<li>Created: {post.createdAt}</li>
						<li>Is This Public? {post.isPublic ? "Yes" : "No"}</li>
					</div>
				)}
			</ul>
		</div>

	)
}

export default PostsDisplay