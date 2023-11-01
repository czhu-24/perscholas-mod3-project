import React from 'react'

const Messages = () => {
	const handleForm = () => {

	}
	return (
		<div className='page'>
			<h1>Messages</h1>
			<form onSubmit={handleForm}>
				<label htmlFor="username">Sent to: </label><input type="text" name="username" id="username" />
				<label htmlFor="content">Message: </label><input type="text" name="content" id="content" />
				<button>Send message!</button>
			</form>
		</div>
	)
}

export default Messages