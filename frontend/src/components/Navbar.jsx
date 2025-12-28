import React, { useContext } from 'react'
import logo from '../assets/logo.png'
import { AppContext } from '../context/AppContext';
import { CgProfile } from "react-icons/cg";
import { IoAddCircleSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const { user, token } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div className='w-full h-14 md:h-18 p-4 flex items-center justify-between md:justify-around border-b border-gray-800 sticky top-0 bg-black z-50 overflow-hidden'>
      <img onClick={() => navigate('/')} src={logo} className='w-28 md:w-32 cursor-pointer object-contain' />

      <div className='flex items-center gap-4'>
        {user || token ? (
          <div className='flex items-center gap-3 md:gap-5'>
            <button onClick={() => navigate('/createpost')} className='bg-blue-600 hover:bg-blue-700 transition-colors inline-flex items-center gap-1.5 px-3 py-1 md:px-4 md:py-1.5 rounded-full text-sm font-medium' >
              <IoAddCircleSharp size={20} />
              <span className='hidden sm:block'>Create Post</span>
            </button>
            <CgProfile size={28} className='cursor-pointer hover:text-blue-500 transition-colors' onClick={() => navigate('/profile')} />
          </div>
        ) : (
          <div className='flex items-center gap-3 md:gap-6'>
            <button onClick={() => navigate('/login')} className='text-sm font-medium hover:text-blue-500 transition-colors'>
              Login
            </button>
            <button onClick={() => navigate('/register')} className='bg-blue-600 hover:bg-blue-700 transition-colors px-4 py-1.5 md:px-5 md:py-2 rounded-full text-sm font-medium' >
              Get Started
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar