import React, { useContext, useEffect } from 'react'
import { primaryContext } from '../../context/primaryContext'
import axios from 'axios'
import './index.css'
import Post from '../Post'

const PostsDisplay = () => {
	const { posts, setPosts } = useContext(primaryContext);

	// functions to handle edit and delete

	useEffect(() => {
		// fill the posts within Context
		try {
			axios({
				method: "GET",
				url: "/server/posts/read"
			}).then((response) => {
				//console.log(response.data);
				setPosts(response.data);
			})
		} catch (err) {
			console.error(err);
		}
	}, []);

	return (
		<div className="page">
			<h1>Posts</h1>
			<ul>
				{posts.map((post) =>
					<div key={JSON.stringify(post)}>
						<img src="../src/assets/profile.png" alt="profile" />
						<div key={post._id} className="post">
							<Post post={post} />
						</div>
						<button>Edit</button>
						<button>Delete</button>
					</div>
				)}
			</ul>
		</div>

	)
}

export default PostsDisplay