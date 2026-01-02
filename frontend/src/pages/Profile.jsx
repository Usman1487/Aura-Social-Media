import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { CgProfile } from "react-icons/cg";
import { IoSettingsOutline, IoLogOutOutline } from "react-icons/io5";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, setUser, logout, backendUrl, token } = useContext(AppContext);

  const [myPosts, setMyPosts] = useState([]);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true); 

  const navigate = useNavigate();

  useEffect(() => {

    const fetchData = async () => {
      try {
        if (!token) return;

     
        const userRes = await axios.post(
          backendUrl + '/api/user/data',
          {},
          { headers: { token } }
        );

        if (userRes.data.success) {
          setUserData(userRes.data.userData);
          if (setUser) setUser(userRes.data.userData);

          const userId = userRes.data.userData._id;
          console.log("Frontend sending request for ID:", userId); 

          const postsRes = await axios.get(
            backendUrl + `/api/posts/user/${userId}`, 
            { headers: { token } }
          );

          if (postsRes.data.success) {
            setMyPosts(postsRes.data.posts);
          }
        }

      } catch (error) {
        console.error("API Error in Profile:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [token, backendUrl, setUser]);

  if (!token) {
    return (
      <div className='min-h-screen bg-black text-white flex flex-col items-center justify-center'>
        <p className='mb-4'>Please Login to view Profile</p>
        <button onClick={() => navigate('/login')} className='bg-blue-600 px-6 py-2 rounded-xl'>Go to Login</button>
      </div>
    )
  }

  const displayUser = user || userData;

  if (loading && !displayUser) {
    return <div className='min-h-screen bg-black text-white flex items-center justify-center'>Loading Profile Data... Check Console</div>
  }

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
            <h1 className='text-3xl font-bold'>
              {displayUser ? displayUser.name : "Guest"}
            </h1>
            <p className='text-zinc-400'>
              {displayUser ? displayUser.email : ""}
            </p>

            <div className='flex flex-wrap justify-center md:justify-start gap-4 mt-4'>
              <div className='bg-zinc-800 px-4 py-1 rounded-full text-sm'>
                <span className='font-bold text-blue-500'>{myPosts.length}</span> Posts
              </div>
            </div>
          </div>

          <div className='flex flex-col gap-2 w-full md:w-auto'>
            <button className='flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 px-6 py-2 rounded-xl transition-all text-sm'>
              <IoSettingsOutline /> Edit Profile
            </button>
            <button onClick={() => { logout(); navigate('/login') }} className='flex items-center justify-center gap-2 bg-red-900/20 hover:bg-red-900/40 text-red-500 px-6 py-2 rounded-xl transition-all text-sm' >
              <IoLogOutOutline /> Logout
            </button>
          </div>
        </div>

        {/* Posts Grid */}
        <div className='mt-12'>
          <div className='flex items-center justify-between mb-6 border-b border-zinc-800 pb-2'>
            <h2 className='text-xl font-semibold text-blue-500'>My Posts</h2>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
            {myPosts.length > 0 ? myPosts.map((post) => (
              <div
                key={post._id}
                onClick={() => navigate(`/post/${post._id}`)}
                className='aspect-square bg-zinc-900 rounded-xl border border-zinc-800 flex items-center justify-center group cursor-pointer overflow-hidden relative'
              >
                {post.image ? (
                  <img src={post.image} alt="" className='w-full h-full object-cover group-hover:scale-110 transition-transform' />
                ) : (
                  <div className='text-zinc-700 group-hover:scale-110 transition-transform'>No Image</div>
                )}
                <div className='absolute bottom-0 w-full bg-black/60 p-2 opacity-0 group-hover:opacity-100 transition-opacity text-center text-sm truncate'>
                  {post.title}
                </div>
              </div>
            )) : (
              <p className='text-zinc-500'>No posts yet.</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;