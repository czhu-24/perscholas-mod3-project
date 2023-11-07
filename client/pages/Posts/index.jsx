import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import validator from 'validator'
import { primaryContext } from '../../context/primaryContext'

const Posts = () => {

	const { user, checkedToken } = useContext(primaryContext);

	// where we CREATE posts

	const [formData, setFormData] = useState({
		content: "",
		isPublic: true,
		isAnonymous: true,
		author: ""
	});

	const [message, setMessage] = useState("");

	const [formError, setFormError] = useState("");

	useEffect(() => {
		// handle author, id of the user that's the author, of the formData when loggedIn
		if (user && checkedToken) {
			setFormData(prevState =>
				({ ...prevState, author: user._id })
			)
		}
	}, [])

	const handleForm = async (e) => {
		e.preventDefault();

		if (!formData.content) {
			return;
		}

		// sanitize form data
		const sanitizedInput = validator.escape(formData.content);
		setFormData({ ...formData, content: sanitizedInput });

		//console.log(formData);

		try {
			// add new post to mongodb
			const response = await axios({
				method: "POST",
				url: "/server/posts/create",
				data: formData
			});

			//console.log(response);

			setFormData({
				content: "",
				isPublic: true,
				isAnonymous: true
			})

			setMessage("post submitted successfully!");

		} catch (err) {
			console.error(err);
		}

	}

	return (
		<div className="page">
			<h1>Create a post!</h1>
			<form onSubmit={handleForm}>
				<div>
					<label htmlFor="content">Content:</label>
					<textarea onChange={(e) => setFormData((prevState) => {
						return { ...prevState, content: e.target.value }
					})} name="content" id="content" value={formData.content} />
				</div>

				{user._id &&
					<div>
						<label htmlFor="isPublic">Public Post:</label>
						<input onChange={() => setFormData((prevState) => ({ ...prevState, isPublic: !formData.isPublic }))} type="checkbox" id="isPublic" name="isPublic" defaultChecked={formData.isPublic} />
					</div>
				}

				{user._id &&
					<div>
						<label htmlFor="isAnonymous">Post as Anonymous?</label>
						<input onChange={() => setFormData((prevState) => ({ ...prevState, isAnonymous: !formData.isAnonymous }))} type="checkbox" id="isAnonymous" name="isAnonymous" defaultChecked={formData.isAnonymous} />
					</div>
				}



				<button type="submit">Submit post</button>
				<div>{message}</div>
			</form>
		</div>
	)
}

export default Posts