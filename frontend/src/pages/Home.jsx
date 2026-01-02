import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import axios from 'axios';

const Home = () => {
  const navigate = useNavigate();
  const { backendUrl } = useContext(AppContext);
  
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const fetchPosts = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/posts/all');
            if(data.success){
                setPosts(data.posts);
            }
        } catch (error) {
            console.log(error);
            alert("Error loading posts");
        } finally {
            setLoading(false);
        }
    }
    fetchPosts();
  }, [backendUrl])

  if(loading) return <div className='text-white text-center mt-20'>Loading Feed...</div>

  return (
    <div className='max-w-7xl mx-auto px-4 py-8'>
      <div className='mb-10 text-center md:text-left'>
        <h1 className='text-4xl font-bold mb-2 text-white'>Feed</h1>
        <p className='text-zinc-400'>Check out what the community is sharing today.</p>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
        {posts.map((post) => (
          <div 
            key={post._id} 
            className='bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-blue-600 transition-all group'
          >
            <div className='h-52 overflow-hidden'>
              <img 
                src={post.image || "https://via.placeholder.com/300"} 
                alt={post.title} 
                className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
              />
            </div>
            
            <div className='p-5'>
              <div className='flex items-center gap-2 mb-3'>
                <div className='w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-[10px] font-bold text-white'>
                  {post.userId?.name ? post.userId.name[0] : "U"}
                </div>
                <span className='text-xs text-zinc-400'>
                    {post.userId?.name || "Unknown User"}
                </span>
              </div>
              
              <h3 className='text-xl font-bold mb-2 text-white group-hover:text-blue-500 transition-colors'>
                {post.title}
              </h3>
              
              <p className='text-zinc-400 text-sm line-clamp-2 mb-4'>
                {post.description}
              </p>
              
              <button 
                onClick={() => navigate(`/post/${post._id}`)}
                className='text-sm font-semibold text-blue-500 hover:text-blue-400'
              >
                Read More →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home;