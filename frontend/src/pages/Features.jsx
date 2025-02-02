import React, { useState, useEffect } from "react";
import LoadingSpinner from "../components/LoadingSpinner";

const Features = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }
  const features = [
    {
      id: 1,
      title: "Real-Time Market Data",
      description:
        "Access real-time prices, charts, and market trends for thousands of cryptocurrencies.",
      icon: "📊",
    },
    {
      id: 2,
      title: "Secure Transactions",
      description:
        "Enjoy peace of mind with our state-of-the-art security measures and encryption protocols.",
      icon: "🔒",
    },
    {
      id: 3,
      title: "User-Friendly Interface",
      description:
        "Our intuitive platform makes it easy for anyone to buy, sell, and manage their crypto assets.",
      icon: "🖥️",
    },
    {
      id: 4,
      title: "24/7 Customer Support",
      description:
        "Get help whenever you need it with our round-the-clock customer support team.",
      icon: "📞",
    },
    {
      id: 5,
      title: "Advanced Trading Tools",
      description:
        "Take your trading to the next level with advanced tools like limit orders, stop-loss, and more.",
      icon: "⚙️",
    },
    {
      id: 6,
      title: "Educational Resources",
      description:
        "Learn everything you need to know about cryptocurrency with our comprehensive guides and tutorials.",
      icon: "📚",
    },
  ];

  return (
    <div className='min-h-screen  text-white'>
      <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <h1 className='text-4xl sm:text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 text-center mb-8'>
          Features
        </h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {features.map((feature) => (
            <div
              key={feature.id}
              className='p-6 bg-white/10 rounded-lg backdrop-blur-md shadow-lg hover:shadow-xl transition-shadow duration-200'
            >
              <div className='text-4xl mb-4'>{feature.icon}</div>
              <h2 className='text-2xl font-bold text-purple-400 mb-2'>
                {feature.title}
              </h2>
              <p className='text-gray-300'>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
