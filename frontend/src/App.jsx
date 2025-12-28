import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import CreatePost from './pages/CreatePost'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Post from './pages/Post'

const App = () => {
  return (
    <div className='min-h-screen bg-black text-white'>
      <Navbar/>
      <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/profile' element={<Profile/>} />
          <Route path='/createpost' element={<CreatePost/>} />
          <Route path='/post' element={<Post/>} />
      </Routes>
      <Footer/>
    </div>
  )
}

export default App