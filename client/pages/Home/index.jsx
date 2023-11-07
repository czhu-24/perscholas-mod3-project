import React, { useContext, useEffect } from 'react'
import PostsDisplay from '../../components/PostsDisplay'
import { primaryContext } from '../../context/primaryContext'
import axios from 'axios'

const Home = () => {

	const { user, checkedToken, posts, setPosts } = useContext(primaryContext);

	// handles context
	// the contents of posts should change when user and checkedToken changes
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
	}, [user, checkedToken]);

	return (
		<>
			<PostsDisplay />
		</>
	)
}

export default Home