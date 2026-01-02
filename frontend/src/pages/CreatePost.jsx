import React, { useState, useContext } from 'react';
import { IoCloudUploadOutline } from "react-icons/io5";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext.jsx';

const CreatePost = () => {

const { backendUrl, token } = useContext(AppContext);

  const [postData, setPostData] = useState({
    title: '',
    description: '',
    image: '' 
  });
  const [preview, setPreview] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const base64 = await convertToBase64(file);
      setPostData({ ...postData, image: base64 });
      setPreview(base64);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post(`${backendUrl}/api/posts/create`, postData, {
        headers: {
            token: token 
        }
      });
    
      if (data.success) {
        alert("Post Published Successfully!");
        navigate('/');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error publishing post:", error);
      alert(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-[calc(100vh-72px)] flex flex-col items-center p-6 md:p-12'>
      <div className='w-full max-w-3xl '>
        <h2 className='text-3xl font-bold mb-8 text-white'>Create New Post</h2>

        <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
          <div className='flex flex-col gap-2'>
            <label className='text-zinc-400 text-sm font-medium'>Upload Image</label>
            <label className='w-full h-72 border-2 border-dashed border-zinc-800 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-zinc-900/50 transition-all overflow-hidden'>
              {preview ? (
                <img src={preview} alt="Preview" className='w-full h-full object-cover' />
              ) : (
                <div className='flex flex-col items-center gap-2 text-zinc-500'>
                  <IoCloudUploadOutline size={40} />
                  <span>Click to upload image</span>
                </div>
              )}
              <input type="file" accept="image/*" className='hidden' onChange={handleImageChange}  required  />
            </label>
          </div>

          <div className='flex flex-col gap-2'>
            <label className='text-zinc-400 text-sm font-medium'>Title</label>
            <input  type="text" required placeholder="Give your post a catchy title" className='bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-600 text-white' value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })}/>
          </div>

          <div className='flex flex-col gap-2'>
            <label className='text-zinc-400 text-sm font-medium'>Description</label>
            <textarea required rows="5" placeholder="What's on your mind?" className='bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-600 text-white resize-none' value={postData.description} onChange={(e) => setPostData({ ...postData, description: e.target.value })}/>
          </div>

          <button type="submit"  disabled={loading} className={`bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all active:scale-[0.98] ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}>
            {loading ? 'Publishing...' : 'Publish Post'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;