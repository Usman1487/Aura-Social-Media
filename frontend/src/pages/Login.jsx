import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios'
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser, setToken, backendUrl } = useContext(AppContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const { data } = await axios.post(`${backendUrl}/api/user/login`, { email, password });

      if (data.success) {
        setToken(data.token);
        setUser(data.user);
        localStorage.setItem('token', data.token);
        toast.success("Login Successful!");
        navigate('/');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className='min-h-[calc(100vh-72px)] flex items-center justify-center px-4'>
      <div className='bg-zinc-900 border border-zinc-800 p-8 rounded-2xl w-full max-w-md shadow-xl'>
        <h2 className='text-3xl font-bold mb-2 text-center'>Welcome Back</h2>
        <p className='text-zinc-400 text-center mb-8'>Please enter your details to login</p>

        <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
          <div className='flex flex-col gap-2'>
            <label className='text-sm font-medium text-zinc-300'>Email Address</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" className='bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-600 transition-colors' />
          </div>

          <div className='flex flex-col gap-2'>
            <label className='text-sm font-medium text-zinc-300'>Password</label>
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className='bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-600 transition-colors' />
          </div>

          <div className='flex items-center justify-between text-sm'>
            <label className='flex items-center gap-2 cursor-pointer'>
              <input type="checkbox" className='accent-blue-600' />
              <span className='text-zinc-400'>Remember me</span>
            </label>
            <span className='text-blue-500 hover:underline cursor-pointer'>Forgot password?</span>
          </div>

          <button type="submit" className='bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg mt-2 transition-all active:scale-[0.98]' >
            Login
          </button>
        </form>

        <p className='text-center text-zinc-400 mt-8 text-sm'>
          Don't have an account?{' '}
          <span onClick={() => navigate('/register')} className='text-blue-500 hover:underline cursor-pointer' >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;