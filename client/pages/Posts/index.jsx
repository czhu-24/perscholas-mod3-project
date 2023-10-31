import React from 'react'

const Posts = () => {
	return (
		<div className="page">
			<h1>Create a post!</h1>
			<form>
				<div>
					<label htmlFor="content">Content:</label>
					<textarea name="content" id="content" />
				</div>

				<div>
					<label for="isPublic">Public Post:</label>
					<input type="checkbox" id="isPublic" name="isPublic" />
				</div>

				<button type="submit">Submit post</button>
			</form>
		</div>
	)
}

export default Posts