import React, { useContext } from 'react'
import { primaryContext } from '../../context/primaryContext'
import { Link } from 'react-router-dom';

const Logout = () => {

    const { setUser } = useContext(primaryContext);

    const handleLogout = () => {
        localStorage.removeItem('user_token');
        setUser({});
    }

    return (
        <Link to="/" onClick={handleLogout}>
            Log out
        </Link>
    )
}

export default Logout