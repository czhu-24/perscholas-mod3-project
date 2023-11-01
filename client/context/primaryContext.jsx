import { createContext, useEffect, useState } from "react";

export const primaryContext = createContext();

export const PrimaryProvider = ({ children }) => {

	const [user, setUser] = useState([]);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [posts, setPosts] = useState([]);
	const [editPost, setEditPost] = useState({});

	useEffect(() => {
		//console.log(`user is ${user} and isLoggedIn is ${isLoggedIn}`);
	}, []);

	return (
		<primaryContext.Provider value={{
			user, setUser,
			isLoggedIn, setIsLoggedIn,
			posts, setPosts,
			editPost, setEditPost
		}}>
			{children}
		</primaryContext.Provider>
	)
}

