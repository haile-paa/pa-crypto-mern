import React, { useState, useEffect } from "react";
import LoadingSpinner from "../components/LoadingSpinner";

const About = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <div className='min-h-screen  text-white'>
      <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <h1 className='text-4xl sm:text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 text-center mb-8'>
          About Us
        </h1>
        <div className='space-y-6 text-lg text-gray-300 bg-white/10 rounded-lg backdrop-blur-md shadow-lg hover:shadow-xl transition-shadow duration-200'>
          <p>
            Welcome to <span className='font-bold'>Pa Crypto Marketplace</span>,
            the world's largest and most trusted platform for cryptocurrency
            trading and exploration. Our mission is to empower individuals and
            businesses to navigate the exciting world of digital currencies with
            ease and confidence.
          </p>
          <p>
            Founded in 2023, we have grown to become a global leader in the
            crypto space, offering a wide range of tools and resources to help
            you make informed decisions. Whether you're a seasoned trader or
            just getting started, our platform is designed to meet your needs.
          </p>
          <p>
            At Pa Crypto Marketplace, we believe in transparency, security, and
            innovation. Our team of experts is dedicated to providing you with
            the latest market insights, real-time data, and cutting-edge
            technology to ensure you stay ahead in the fast-paced world of
            cryptocurrency.
          </p>
          <p>
            Join us today and be part of the future of finance. Together, we can
            build a more decentralized and inclusive financial ecosystem.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
