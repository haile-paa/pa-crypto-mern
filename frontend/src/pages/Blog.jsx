import React, { useState, useEffect } from "react";
import LoadingSpinner from "../components/LoadingSpinner";

const Blog = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }
  const posts = [
    {
      id: 1,
      title: "The Future of Cryptocurrency",
      description:
        "Explore how blockchain technology is revolutionizing the financial industry and what it means for the future of money.",
      date: "February 1, 2025",
    },
    {
      id: 2,
      title: "Top 5 Cryptocurrencies to Watch in 2025",
      description:
        "Discover the most promising cryptocurrencies of 2025 and why they are worth your attention.",
      date: "January 25, 2025",
    },
    {
      id: 3,
      title: "Understanding Decentralized Finance (DeFi)",
      description:
        "Learn about the rise of DeFi and how it is transforming traditional financial systems.",
      date: "January 15, 2025",
    },
  ];

  return (
    <div className='min-h-screen  text-white'>
      <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <h1 className='text-4xl sm:text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 text-center mb-8'>
          Blog
        </h1>
        <div className='space-y-8'>
          {posts.map((post) => (
            <div
              key={post.id}
              className='p-6 bg-white/10 rounded-lg backdrop-blur-md shadow-lg hover:shadow-xl transition-shadow duration-200'
            >
              <h2 className='text-2xl font-bold text-purple-400 mb-2'>
                {post.title}
              </h2>
              <p className='text-gray-300 mb-4'>{post.description}</p>
              <p className='text-sm text-gray-400'>{post.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
