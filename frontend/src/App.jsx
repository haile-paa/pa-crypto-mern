import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CoinDetail from "./pages/CoinDetail";
import Features from "./pages/Features";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Footer from "./components/Footer";

import video from "./assets/68189-525363710.mp4";

const App = () => {
  return (
    <div className='relative min-h-screen overflow-hidden'>
      {/* Toast Notifications */}
      <ToastContainer position='top-right' autoClose={3000} />

      {/* Video Background for larger screens */}
      <video
        autoPlay
        loop
        muted
        className='absolute top-0 left-0 w-full h-full object-cover z-0 hidden sm:block'
        style={{ minWidth: "100%", minHeight: "100%" }}
      >
        <source src={video} type='video/mp4' />
        Your browser does not support the video tag.
      </video>

      {/* Black Background for small screens */}
      <div className='absolute top-0 left-0 w-full h-full bg-black sm:hidden z-10'></div>

      {/* Navbar and Routes */}
      <div className='relative z-20'>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/features' element={<Features />} />
          <Route path='/about' element={<About />} />
          <Route path='/blog' element={<Blog />} />
          <Route path='/coin/:id' element={<CoinDetail />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
};

export default App;
