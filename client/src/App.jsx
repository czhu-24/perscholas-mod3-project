import { Route, Routes } from 'react-router-dom'
import Navbar from '../components/Navbar'
import PostsDisplay from '../components/PostsDisplay'
import Messages from '../pages/Messages'
import Posts from '../pages/Posts'
import Profile from '../pages/Profile'
import Login from '../pages/Login'
import './App.css'
import Footer from '../components/Footer'

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<PostsDisplay />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
