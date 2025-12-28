import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios'
import { toast } from 'react-toastify';

const Register = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser, setToken, backendUrl } = useContext(AppContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(`${backendUrl}/api/user/register`, { name, email, password })

      if (data.success) {
        setToken(data.token)
        setUser(data.user)
        localStorage.setItem('token', data.token);
        toast.success("Register Successfully!");
        navigate('/')
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className='min-h-[calc(100vh-72px)] flex items-center justify-center px-4'>
      <div className='bg-zinc-900 border border-zinc-800 p-8 rounded-2xl w-full max-w-md'>

        <div className='text-center mb-8'>
          <h2 className='text-3xl font-bold text-white'>Create Account</h2>
          <p className='text-zinc-400 mt-2'>Join our community today</p>
        </div>

        <form onSubmit={handleSubmit} className='flex flex-col gap-5'>

          <div className='flex flex-col gap-1.5'>
            <label className='text-xs font-semibold text-zinc-500 ml-1'>FULL NAME</label>
            <input type="text" required placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} className='bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:border-blue-600 outline-none transition-all' />
          </div>

          <div className='flex flex-col gap-1.5'>
            <label className='text-xs font-semibold text-zinc-500 ml-1'>EMAIL ADDRESS</label>
            <input type="email" required placeholder="john@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className='bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:border-blue-600 outline-none transition-all' />
          </div>

          <div className='flex flex-col gap-1.5'>
            <label className='text-xs font-semibold text-zinc-500 ml-1'>PASSWORD</label>
            <input type="password" required minLength={8} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className='bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:border-blue-600 outline-none transition-all' />
          </div>

          <button type="submit" className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl mt-4 transition-all'>
            Sign Up
          </button>
        </form>

        <p className='mt-8 text-center text-zinc-400 text-sm'>
          Already have an account?{' '}
          <span onClick={() => navigate('/login')} className='text-blue-500 cursor-pointer hover:underline'>
            Login
          </span>
        </p>

      </div>
    </div>
  );
};

export default Register;