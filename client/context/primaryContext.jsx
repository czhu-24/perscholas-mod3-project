import { createContext, useEffect, useState } from "react";

export const primaryContext = createContext();

export const PrimaryProvider = ({ children }) => {

	const [user, setUser] = useState({});
	const [checkedToken, setCheckedToken] = useState(false);
	const [posts, setPosts] = useState([]);
	const [editPost, setEditPost] = useState({});

	useEffect(() => {
		//console.log(`user is ${user} and isLoggedIn is ${isLoggedIn}`);
	}, []);

	return (
		<primaryContext.Provider value={{
			user, setUser,
			checkedToken, setCheckedToken,
			posts, setPosts,
			editPost, setEditPost
		}}>
			{children}
		</primaryContext.Provider>
	)
}

