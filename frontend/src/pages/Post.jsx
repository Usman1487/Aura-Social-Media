import React, { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { IoArrowBackOutline, IoHeartOutline, IoChatbubbleOutline, IoShareOutline } from "react-icons/io5";
import { AppContext } from '../context/AppContext';
import axios from 'axios';

const Post = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { backendUrl } = useContext(AppContext);

  const [postData, setPostData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSinglePost = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/posts/${id}`);
            if(data.success){
                setPostData(data.post);
            } else {
                alert("Post not found");
                navigate('/');
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }
    fetchSinglePost();
  }, [id, backendUrl, navigate])

  if (loading) return <div className='text-white text-center mt-20'>Loading Post...</div>
  if (!postData) return null;

  return (
    <div className='min-h-screen bg-black text-white p-4 md:p-10'>
      <div className='max-w-4xl mx-auto'>
        
        <button 
          onClick={() => navigate(-1)} 
          className='flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-6'
        >
          <IoArrowBackOutline size={20} /> Back to Feed
        </button>

        <div className='w-full h-[300px] md:h-[500px] rounded-3xl overflow-hidden border border-zinc-800 mb-8'>
          <img 
            src={postData.image} 
            alt={postData.title} 
            className='w-full h-full object-cover'
          />
        </div>

        <div className='flex items-center justify-between mb-6'>
          <div className='flex items-center gap-3'>
            <div className='w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold'>
              {postData.userId?.name ? postData.userId.name[0] : "U"}
            </div>
            <div>
              <p className='font-medium'>{postData.userId?.name}</p>
              <p className='text-xs text-zinc-500'>
                {new Date(postData.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className='flex items-center gap-4 text-zinc-400'>
            <button className='flex items-center gap-1 hover:text-red-500 transition-colors'>
              <IoHeartOutline size={22} /> <span>124</span>
            </button>
            <button className='flex items-center gap-1 hover:text-blue-500 transition-colors'>
              <IoChatbubbleOutline size={22} /> <span>12</span>
            </button>
            <IoShareOutline size={22} className='hover:text-white cursor-pointer' />
          </div>
        </div>

        <h1 className='text-3xl md:text-5xl font-bold mb-6'>{postData.title}</h1>
        
        <div className='prose prose-invert max-w-none'>
          <p className='text-zinc-300 leading-relaxed text-lg whitespace-pre-wrap'>
            {postData.description}
          </p>
        </div>

   
        <div className='mt-12 pt-8 border-t border-zinc-800'>
          <h3 className='text-xl font-semibold mb-6'>Comments</h3>
          <div className='flex gap-4'>
            <div className='w-10 h-10 rounded-full bg-zinc-800 shrink-0'></div>
            <div className='flex-1'>
              <textarea 
                placeholder='Add a comment...' 
                className='w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 focus:outline-none focus:border-blue-600 resize-none text-sm text-white'
                rows="2"
              ></textarea>
              <button className='mt-2 bg-blue-600 px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-all'>
                Post Comment
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Post