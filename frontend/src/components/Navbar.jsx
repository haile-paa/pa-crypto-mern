import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/pa logo for dark.png";
import { ArrowRight } from "lucide-react";
import { Menu, Transition } from "@headlessui/react";
import SignUpModal from "./SignUpModal";
import ConfirmationModal from "../context/ConfirmationModal"; // Import the custom modal

const Navbar = () => {
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false); // State for logout modal
  const navigate = useNavigate();

  // Check login status when the component mounts
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  // Handle logout
  const handleLogout = () => {
    setShowLogoutModal(true); // Show the custom logout confirmation modal
  };

  // Confirm logout
  const confirmLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setShowLogoutModal(false); // Close the modal
    window.location.href = "/"; // Refresh and navigate to home page
  };

  // Handle successful login
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setShowSignUpModal(false);
  };

  return (
    <div className='flex items-center justify-between px-4 py-5 text-[#aadddd] border-b-2 border-[#3c3c3c] sm:px-6 lg:px-20'>
      {/* Mobile Menu Toggle */}
      <div className='sm:hidden flex-1 flex justify-start'>
        <Menu as='div' className='relative'>
          <Menu.Button className='text-white text-2xl'>☰</Menu.Button>
          <Transition
            as='div'
            enter='transition ease-out duration-100'
            enterFrom='transform opacity-0 scale-95'
            enterTo='transform opacity-100 scale-100'
            leave='transition ease-in duration-75'
            leaveFrom='transform opacity-100 scale-100'
            leaveTo='transform opacity-0 scale-95'
          >
            <Menu.Items className='absolute left-0 mt-2 w-48 origin-top-left bg-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
              <div className='py-1'>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to='/'
                      className={`block px-4 py-2 text-white ${
                        active && "bg-gray-700"
                      }`}
                    >
                      Home
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to='/features'
                      className={`block px-4 py-2 text-white ${
                        active && "bg-gray-700"
                      }`}
                    >
                      Features
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to='/about'
                      className={`block px-4 py-2 text-white ${
                        active && "bg-gray-700"
                      }`}
                    >
                      About
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to='/blog'
                      className={`block px-4 py-2 text-white ${
                        active && "bg-gray-700"
                      }`}
                    >
                      Blog
                    </Link>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>

      {/* Logo - Centered on Small Screens */}
      <div className='sm:hidden flex-1 flex justify-center'>
        <Link to='/'>
          <img src={logo} alt='Logo' className='w-12 h-12' />
        </Link>
      </div>

      {/* Logo - Visible on Larger Screens */}
      <Link to='/' className='hidden sm:block'>
        <img src={logo} alt='Logo' className='w-16 h-16 sm:w-20 sm:h-20' />
      </Link>

      {/* Navbar Links - Visible on Larger Screens */}
      <ul className='hidden sm:flex space-x-8 text-lg font-medium'>
        <li>
          <Link
            to='/'
            className='hover:text-blue-400 transition-colors duration-200'
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to='/features'
            className='hover:text-blue-400 transition-colors duration-200'
          >
            Features
          </Link>
        </li>
        <li>
          <Link
            to='/about'
            className='hover:text-blue-400 transition-colors duration-200'
          >
            About
          </Link>
        </li>
        <li>
          <Link
            to='/blog'
            className='hover:text-blue-400 transition-colors duration-200'
          >
            Blog
          </Link>
        </li>
      </ul>

      {/* Buttons - Sign Up/Logout */}
      <div className='flex items-center space-x-4'>
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className='flex items-center px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-transform transform hover:scale-105 text-sm sm:text-base'
          >
            Logout
            <ArrowRight className='ml-2 -rotate-45' size={16} />
          </button>
        ) : (
          <button
            onClick={() => setShowSignUpModal(true)}
            className='flex items-center px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-transform transform hover:scale-105 text-sm sm:text-base'
          >
            Sign up
            <ArrowRight className='ml-2 -rotate-45' size={16} />
          </button>
        )}
      </div>

      {/* Render the SignUpModal */}
      {showSignUpModal && (
        <SignUpModal
          onClose={() => setShowSignUpModal(false)}
          onLoginSuccess={handleLoginSuccess}
          navigate={navigate}
        />
      )}

      {/* Render the custom Logout Confirmation Modal */}
      <ConfirmationModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={confirmLogout}
        message='Are you sure you want to log out?'
      />
    </div>
  );
};

export default Navbar;
