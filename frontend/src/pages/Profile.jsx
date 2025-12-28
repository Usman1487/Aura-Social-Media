import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { CgProfile } from "react-icons/cg";
import { IoSettingsOutline, IoLogOutOutline } from "react-icons/io5";

const Profile = () => {
  const { user, setUser, logout } = useContext(AppContext);



  return (
    <div className='min-h-[calc(100vh-72px)] bg-black text-white p-6 md:p-12'>
      <div className='max-w-4xl mx-auto'>
        
        <div className='flex flex-col md:flex-row items-center gap-8 bg-zinc-900/50 p-8 rounded-3xl border border-zinc-800'>
          <div className='relative'>
            <div className='w-32 h-32 rounded-full bg-zinc-800 flex items-center justify-center overflow-hidden border-2 border-blue-600'>
              <CgProfile size={80} className='text-zinc-600' />
            </div>
          </div>

          <div className='flex-1 text-center md:text-left'>
            <h1 className='text-3xl font-bold'>Usman Kamran</h1>
            <p className='text-zinc-400'>usman@example.com</p>
            <div className='flex flex-wrap justify-center md:justify-start gap-4 mt-4'>
              <div className='bg-zinc-800 px-4 py-1 rounded-full text-sm'>
                <span className='font-bold text-blue-500'>38</span> Posts
              </div>
              <div className='bg-zinc-800 px-4 py-1 rounded-full text-sm'>
                <span className='font-bold text-blue-500'>1M</span> Followers
              </div>
            </div>
          </div>

          <div className='flex flex-col gap-2 w-full md:w-auto'>
            <button className='flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 px-6 py-2 rounded-xl transition-all text-sm'>
              <IoSettingsOutline /> Edit Profile
            </button>
            <button onClick={()=>{logout();}} className='flex items-center justify-center gap-2 bg-red-900/20 hover:bg-red-900/40 text-red-500 px-6 py-2 rounded-xl transition-all text-sm' >
              <IoLogOutOutline/> Logout
            </button>
          </div>
        </div>

        <div className='mt-12'>
          <div className='flex items-center justify-between mb-6 border-b border-zinc-800 pb-2'>
            <h2 className='text-xl font-semibold text-blue-500'>My Posts</h2>
            <button className='text-sm text-zinc-400 hover:text-white'>View All</button>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
            {[1, 2, 3].map((item) => (
              <div key={item} className='aspect-square bg-zinc-900 rounded-xl border border-zinc-800 flex items-center justify-center group cursor-pointer overflow-hidden'>
                <div className='text-zinc-700 group-hover:scale-110 transition-transform'>
                  No Image
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;