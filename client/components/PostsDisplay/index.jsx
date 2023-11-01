import React, { useContext, useEffect, useState } from 'react'
import { primaryContext } from '../../context/primaryContext'
import axios from 'axios'
import './index.css'
import Post from '../Post'
import ReactModal from 'react-modal';

const PostsDisplay = () => {
	const { posts, setPosts } = useContext(primaryContext);

	const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
	const [deleteId, setDeleteId] = useState(null);

	const [isEditModalOpen, setEditModalOpen] = useState(false);
	const [editId, setEditId] = useState(null);

	// for accessibility reasons for ReactModal
	ReactModal.setAppElement('#root');

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

	const handleEdit = async (editId) => {
		try {

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
				onRequestClose={() => { setEdit(null); setEditModalOpen(false); }} // Close modal if you click outside
				contentLabel="Edit Post">
				<h2>Edit Post Below</h2>
				<div>
					<button onClick={() => { handleEdit(editId); setEditModalOpen(false); }}>Save Edit</button>
					<button onClick={() => setEditModalOpen(false)}>No, Go Back</button>
				</div>
			</ReactModal>

			<ul className="list-grid-parent">
				{posts.map((post) =>
					<div key={JSON.stringify(post)} className="list-grid">
						<img src="../src/assets/profile.png" alt="profile" />
						<div key={post._id} className="post">
							<Post post={post} />
						</div>
						<button onClick={() => {
							setEditId(post._id);
							setEditModalOpen(true);
						}} className="edit-btn">Edit</button>
						<button onClick={() => {
							setDeleteId(post._id);
							setDeleteModalOpen(true);
						}} className="delete-btn">Delete</button>
					</div>
				)}
			</ul>
		</div>

	)
}

export default PostsDisplay