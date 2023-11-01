import { Route, Routes } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Messages from '../pages/Messages'
import Posts from '../pages/Posts'
import Profile from '../pages/Profile'
import Home from '../pages/Home'
import Login from '../pages/Login'
import './App.css'
import Footer from '../components/Footer'

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
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
