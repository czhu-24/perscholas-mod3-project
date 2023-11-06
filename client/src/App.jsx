import { Route, Routes } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Messages from '../pages/Messages'
import Posts from '../pages/Posts'
import Profile from '../pages/Profile'
import Home from '../pages/Home'
import Login from '../pages/Login'
import './App.css'
import Footer from '../components/Footer'
import Signup from '../pages/Signup'
import { useContext, useEffect } from 'react'
import { primaryContext } from '../context/primaryContext'
import axios from 'axios'


function App() {

  const { user, setUser, checkedToken, setCheckedToken } = useContext(primaryContext);

  useEffect(() => {
    const token = localStorage.getItem("user_token");
    // verify token with server
    if (token) {
      axios({
        method: "GET",
        url: "/server/check_token",
        headers: {
          Authorization: token
        }
      }).then((res) => {
        setCheckedToken(true);
        //console.log(res);
        if (res.status === 200 && res.data) {
          setUser(res.data);
        }
      }).catch((err) => {
        setCheckedToken(true);
        console.error("Something's wrong with the token", err);
      })
    } else {
      setCheckedToken(true);
    }
  }, [])

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
