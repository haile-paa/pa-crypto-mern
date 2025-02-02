import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className=' text-white py-8 mt-auto'>
      <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
          {/* About Section */}
          <div>
            <hr />
            <h3 className='text-lg font-bold mb-4'>About Us</h3>
            <p className='text-gray-400'>
              Pa Crypto Marketplace is the world's largest cryptocurrency
              platform, empowering users to explore and trade digital assets
              securely.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className='text-lg font-bold mb-4'>Quick Links</h3>
            <ul className='space-y-2'>
              <li>
                <a href='/' className='text-gray-400 hover:text-purple-400'>
                  Home
                </a>
              </li>
              <li>
                <a
                  href='/about'
                  className='text-gray-400 hover:text-purple-400'
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href='/features'
                  className='text-gray-400 hover:text-purple-400'
                >
                  Features
                </a>
              </li>
              <li>
                <a href='/blog' className='text-gray-400 hover:text-purple-400'>
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className='text-lg font-bold mb-4'>Contact Us</h3>
            <ul className='space-y-2'>
              <li className='text-gray-400'>Email: support@pacrypto.com</li>
              <li className='text-gray-400'>Phone: (+251) 985241404 </li>
              <li className='text-gray-400'>Address: Addis Ababa, Ethiopia</li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div>
            <h3 className='text-lg font-bold mb-4'>Follow Us</h3>
            <div className='flex space-x-4'>
              <a
                href='https://github.com/haile-paa/'
                target='_blank'
                rel='noopener noreferrer'
                className='text-gray-400 hover:text-purple-400'
              >
                <FaGithub size={24} />
              </a>
              <a
                href='https://www.linkedin.com/in/haileyesus-eyasu-404795264/'
                target='_blank'
                rel='noopener noreferrer'
                className='text-gray-400 hover:text-purple-400'
              >
                <FaLinkedin size={24} />
              </a>
              <a
                href='mailto:haileyesuseyasu@gmail.com'
                className='text-gray-400 hover:text-purple-400'
              >
                <FaEnvelope size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className='border-t border-gray-700 mt-8 pt-8 text-center'>
          <p className='text-gray-400'>
            &copy; {new Date().getFullYear()} Pa Dev's. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
