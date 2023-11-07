import React, { useContext, useEffect, useState } from 'react'
import { primaryContext } from '../../context/primaryContext'
import axios from 'axios'
import './index.css'
import Post from '../Post'
import ReactModal from 'react-modal';
import validator from 'validator'
import Select from 'react-select'
//import path from 'path';

const PostsDisplay = () => {
	//const distPath = path.join(__dirname, "../client/src/assets");

	const { user, posts, setPosts, editPost, setEditPost } = useContext(primaryContext);

	const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
	const [deleteId, setDeleteId] = useState(null);

	const [isEditModalOpen, setEditModalOpen] = useState(false);
	const [formData, setFormData] = useState({
		content: editPost.content,
		isPublic: editPost.isPublic,
		isAnonymous: editPost.isAnonymous
	});
	const [filteredPosts, setFilteredPosts] = useState([]);

	// console.log(filteredPosts);

	const options = [
		{ value: 'All', label: 'All' },
		{ value: 'Anonymous', label: 'Anonymous' },
		{ value: 'My Posts', label: 'My Posts' }
	]

	const [selectedValue, setSelectedValue] = useState(options[0]);

	// for accessibility reasons for ReactModal
	ReactModal.setAppElement('#root');

	// change edit form everytime the edit button is clicked on
	useEffect(() => {
		setFormData({
			content: editPost.content,
			isPublic: editPost.isPublic,
			isAnonymous: editPost.isAnonymous
		})
	}, [editPost]) // not 100% sure why it needs to be dependent on editPost and i can't use the empty dependency array

	useEffect(() => {
		setFilteredPosts([...posts]);
	}, [posts]);

	// to handle the react-select element
	const handleOptionChange = (selectedOption) => {
		console.log(selectedOption.value);
		setSelectedValue(selectOption);

		// TODO... what about first render... nah, it should be fine
		const postsCopy = [...posts];
		switch (selectedOption.value) {
			case "All":
				setFilteredPosts([...posts]);
				break;
			case "Anonymous":
				const filteredAnon = postsCopy.filter((post) => post.isAnonymous);
				setFilteredPosts(filteredAnon);
				break;
			case "My Posts":
				const filteredByUser = postsCopy.filter((post) => post.author._id === user._id);
				setFilteredPosts(filteredByUser);
				break;
		}
	};


	// functions to handle edit and delete calls
	const handleDelete = async (postId) => {
		try {
			const response = await axios({
				method: "DELETE",
				url: `/server/posts/delete/${postId}`
			})

			// update the front end
			const newPosts = posts.filter((post) => post._id !== postId);
			setPosts(newPosts);

		} catch (err) {
			console.error(err);
		}

	}

	const handleEdit = async (e) => {
		setEditModalOpen(false);
		e.preventDefault();

		if (!formData.content) {
			return;
		}

		//console.log(formData);

		// sanitize form data
		const sanitizedInput = validator.escape(editPost.content);
		setFormData({ ...editPost, content: sanitizedInput });

		try {
			const response = await axios({
				method: "PUT",
				url: `/server/posts/edit/${editPost._id}`,
				// because editPost is not being updated as you type in the modal form
				data: formData
			})

			// update front end 
			const postsCopy = [...posts];
			const indexToChange = postsCopy.findIndex((post) => post._id === editPost._id);
			postsCopy[indexToChange] = { ...postsCopy[indexToChange], ...formData };
			setPosts(postsCopy);

		} catch (err) {
			console.error(err);
		}
	}

	return (
		<div className="page post-display">
			<h1>Posts</h1>

			{/* Modal to confirm deletion of post */}
			<ReactModal
				isOpen={isDeleteModalOpen}
				// Close modal if you click outside
				onRequestClose={() => { setDeleteId(null); setDeleteModalOpen(false); }}
				contentLabel="Delete Confirmation">
				<h2>Are you sure you want to delete this post?</h2>
				<div>
					<button onClick={() => { handleDelete(deleteId); setDeleteModalOpen(false); }}>Yes, delete this post</button>
					<button onClick={() => setDeleteModalOpen(false)}>No, go back</button>
				</div>
			</ReactModal>

			{/* Modal to edit post */}
			<ReactModal
				isOpen={isEditModalOpen}
				onRequestClose={() => { setEditModalOpen(false); }}
				contentLabel="Edit Post">
				<h2>Edit Post Below</h2>
				<form onSubmit={handleEdit}>
					<div>
						<label htmlFor="content">Content:</label>
						<textarea onChange={(e) => setFormData((prevState) => {
							return { ...prevState, content: e.target.value }
						})} name="content" id="content" value={formData.content} />
					</div>

					<div>
						<label htmlFor="isPublic">Public Post:</label>
						<input onChange={() => setFormData((prevState) => ({ ...prevState, isPublic: !formData.isPublic }))} type="checkbox" id="isPublic" name="isPublic" defaultChecked={formData.isPublic} />
					</div>

					<div>
						<label htmlFor="isAnonymous">Anonymous Post?</label>
						<input onChange={() => setFormData((prevState) => ({ ...prevState, isAnonymous: !formData.isAnonymous }))} type="checkbox" id="isAnonymous" name="isAnonymous" defaultChecked={formData.isAnonymous} />
					</div>

					<button>Save Edit</button>
					<button onClick={() => setEditModalOpen(false)}>No, Go Back</button>
				</form>
				<div>


				</div>
			</ReactModal>

			<div className="list-grid-parent">
				{user._id && <Select options={options} defaultValue={options[0]} onChange={handleOptionChange}
					styles={{
						input: (baseStyles) => ({
							...baseStyles,
							width: '25vw',
						}),
						control: (baseStyles) => ({
							...baseStyles,
							width: '25vw',
						}),
					}}
				/>}
				{filteredPosts.map((post) =>
					<div key={JSON.stringify(post)} className="list-grid">
						<img src=".\client\src\assets\profile.png" alt="profile" />
						<div key={post._id} className="post">
							<Post post={post} />
						</div>
						<button onClick={() => {
							setEditPost(post);
							setEditModalOpen(true);
						}} className="edit-btn">Edit</button>
						<button onClick={() => {
							setDeleteId(post._id);
							setDeleteModalOpen(true);
						}} className="delete-btn">Delete</button>
					</div>
				)}
			</div>
		</div>

	)
}

export default PostsDisplay