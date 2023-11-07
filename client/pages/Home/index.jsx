import React, { useContext, useEffect } from 'react'
import PostsDisplay from '../../components/PostsDisplay'
import { primaryContext } from '../../context/primaryContext'
import axios from 'axios'

const Home = () => {

	const { posts, setPosts } = useContext(primaryContext);

	// handles context
	useEffect(() => {
		const token = localStorage.getItem("user_token");
		// fill the posts within Context
		try {
			axios({
				method: "GET",
				url: "/server/posts/read",
				headers: {
					Authorization: token
				}
			}).then((response) => {
				console.log(response.data);
				setPosts(response.data);
			})
		} catch (err) {
			console.error(err);
		}
	}, []);

	return (
		<>
			<PostsDisplay />
		</>
	)
}

export default Home