import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate();

  const dummyPosts = [
    {
      id: 1,
      title: "Exploring the Mountains",
      description: "Found this amazing view during my hike today!",
      name: "Alex River",
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1000"
    },
    {
      id: 2,
      title: "My New Workspace",
      description: "Finally finished setting up my coding corner.",
      name: "Sarah Code",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1000"
    },
    {
      id: 3,
      title: "Coffee and Code",
      description: "The best way to start a Monday morning.",
      name: "CoffeeLover",
      image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&q=80&w=1000"
    }
  ];

  return (
    <div className='max-w-7xl mx-auto px-4 py-8'>
      <div className='mb-10 text-center md:text-left'>
        <h1 className='text-4xl font-bold mb-2'>Feed</h1>
        <p className='text-zinc-400'>Check out what the community is sharing today.</p>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
        {dummyPosts.map((post) => (
          <div 
            key={post.id} 
            className='bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-blue-600 transition-all group'
          >
            <div className='h-52 overflow-hidden'>
              <img 
                src={post.image} 
                alt={post.title} 
                className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
              />
            </div>
            
            <div className='p-5'>
              <div className='flex items-center gap-2 mb-3'>
                <div className='w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-[10px] font-bold'>
                  {post.name[0]}
                </div>
                <span className='text-xs text-zinc-400'>{post.name}</span>
              </div>
              
              <h3 className='text-xl font-bold mb-2 group-hover:text-blue-500 transition-colors'>
                {post.title}
              </h3>
              
              <p className='text-zinc-400 text-sm line-clamp-2 mb-4'>
                {post.description}
              </p>
              
              <button 
                onClick={() => navigate(`/post`)}
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