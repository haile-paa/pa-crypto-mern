import React, { useState } from "react";
import Coin from "../context/Coin";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState(""); // State to store search query

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Update state when the search input changes
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen text-white '>
      {/* Hero Section */}
      <div className='text-center space-y-6 max-w-2xl px-4 py-12'>
        <h1 className='text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600'>
          Pa <br />
          Crypto MarketPlace
        </h1>
        <p className='text-lg sm:text-xl text-gray-300'>
          Welcome to the world's largest cryptocurrency marketplace. Sign up to
          explore more about cryptos.
        </p>
        <form className='flex items-center justify-center space-x-4 mt-8'>
          <div className='relative w-full max-w-md'>
            <input
              type='text'
              placeholder='Search crypto...'
              className='w-full px-4 sm:px-6 py-2 sm:py-3 text-black rounded-full border border-gray-500 bg-white focus:ring-2 focus:ring-purple-500 focus:outline-none'
              value={searchQuery}
              onChange={handleSearchChange} // Update search query
            />
            <button
              type='submit'
              className='absolute right-0 top-0 px-4 sm:px-6 py-2 sm:py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-transform transform hover:scale-105'
            >
              Search
            </button>
          </div>
        </form>
      </div>

      {/* Crypto Table Section */}
      <div className='w-full max-w-6xl mx-auto mt-8 sm:mt-12 p-4 sm:p-6 rounded-xl backdrop-blur-md bg-white/10 shadow-2xl'>
        {/* Table Header */}
        <div className='grid grid-cols-2 sm:grid-cols-5 gap-4 text-white font-medium text-sm sm:text-lg py-4 border-b-2 border-gray-400'>
          <p className='hidden sm:block'>#</p> {/* Hide # on small screens */}
          <p>Coins</p>
          <p className='sm:hidden'>Price / 24H Change</p>{" "}
          {/* Combined for small screens */}
          <p className='hidden sm:block'>Price</p>
          <p className='hidden sm:block text-center'>24H Change</p>
          <p className='text-right'>Market Cap</p>
        </div>
        {/* Pass searchQuery as a prop to Coin component */}
        <Coin searchQuery={searchQuery} />
      </div>
    </div>
  );
};

export default Home;
