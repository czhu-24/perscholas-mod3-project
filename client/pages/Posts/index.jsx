import React, { useState } from 'react'
import axios from 'axios'
import validator from 'validator'

const Posts = () => {

	const [formData, setFormData] = useState({
		content: "",
		isPublic: true
	});

	const [formError, setFormError] = useState("");

	const handleForm = async (e) => {
		e.preventDefault();

		if (!formData.content) {
			return;
		}

		//console.log(formData);

		// sanitize form data
		const sanitizedInput = validator.escape(formData.content);
		setFormData({ ...formData, content: sanitizedInput });

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
				isPublic: true
			})

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

				<div>
					<label htmlFor="isPublic">Public Post:</label>
					<input onChange={() => setFormData((prevState) => ({ ...prevState, isPublic: !formData.isPublic }))} type="checkbox" id="isPublic" name="isPublic" defaultChecked={formData.isPublic} />
				</div>

				<button type="submit">Submit post</button>
			</form>
		</div>
	)
}

export default Posts