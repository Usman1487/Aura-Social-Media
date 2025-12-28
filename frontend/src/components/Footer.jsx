import React from 'react'
import logo from '../assets/logo.png'
import { FaFacebook, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className='w-full border-t border-gray-800 py-10 px-4 md:px-20'>
      <div className='max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8'>
        
        <div className='flex flex-col items-center md:items-start gap-4'>
          <img src={logo} className='w-28 md:w-32' />
          <p className='text-gray-400 text-sm max-w-xs text-center md:text-left'>
            Share your thoughts, connect with others, and explore the world through stories.
          </p>
        </div>

        <div className='flex flex-col items-center md:items-start gap-4'>
          <h4 className='font-semibold text-lg'>Quick Links</h4>
          <ul className='text-gray-400 text-sm flex flex-col items-center md:items-start gap-2'>
            <li className='hover:text-white cursor-pointer transition-colors'>Privacy Policy</li>
            <li className='hover:text-white cursor-pointer transition-colors'>Terms of Service</li>
            <li className='hover:text-white cursor-pointer transition-colors'>Contact Us</li>
          </ul>
        </div>

        <div className='flex flex-col items-center md:items-start gap-4'>
          <h4 className='font-semibold text-lg'>Follow Us</h4>
          <div className='flex gap-4 text-gray-400'>
            <FaFacebook size={22} className='hover:text-blue-600 cursor-pointer transition-colors' />
            <FaTwitter size={22} className='hover:text-blue-400 cursor-pointer transition-colors' />
            <FaInstagram size={22} className='hover:text-pink-500 cursor-pointer transition-colors' />
            <FaGithub size={22} className='hover:text-white cursor-pointer transition-colors' />
          </div>
        </div>

      </div>

      <div className='mt-10 pt-6 border-t border-gray-900 text-center text-gray-500 text-xs'>
        © {new Date().getFullYear()} AURA. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer