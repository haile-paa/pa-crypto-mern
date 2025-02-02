import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const SignUpModal = ({ onClose, onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false); // Track if in login mode

  // Reset form fields when switching between sign-up and login
  const resetForm = () => {
    setUsername("");
    setEmail("");
    setPassword("");
  };

  // Handle sign-up
  const handleSignUp = async (e) => {
    e.preventDefault();

    const user = { username, email, password };

    try {
      const response = await fetch(`${backendUrl}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Successfully registered! Logging you in...");
        resetForm(); // Reset form fields

        // Automatically log in the user after signup
        const loginResponse = await fetch(`${backendUrl}/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        const loginData = await loginResponse.json();

        if (loginResponse.ok) {
          localStorage.setItem("token", loginData.token); // Save token to localStorage
          onLoginSuccess(); // Notify parent component of successful login
          onClose(); // Close the modal
          window.location.href = "/"; // Refresh and navigate to home page
        } else {
          toast.error(loginData.error || "Failed to log in after signup.");
        }
      } else {
        toast.error(data.error || "An error occurred during registration.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();

    const user = { email, password };

    try {
      const response = await fetch(`${backendUrl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Login successful!");
        localStorage.setItem("token", data.token); // Save token to localStorage
        onLoginSuccess(); // Notify parent component of successful login
        onClose(); // Close the modal
        window.location.href = "/"; // Refresh and navigate to home page
      } else {
        toast.error(data.error || "Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  // Handle logout
  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      localStorage.removeItem("token"); // Remove token from localStorage
      onLoginSuccess(); // Notify parent component of logout
      onClose(); // Close the modal
      window.location.href = "/"; // Refresh and navigate to home page
    }
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50'>
      <div className='bg-white/10 p-6 rounded-lg shadow-lg w-96'>
        <h2 className='text-2xl font-bold text-white mb-4'>
          {isLoggingIn ? "Login" : "Sign Up"}
        </h2>
        <form
          onSubmit={isLoggingIn ? handleLogin : handleSignUp}
          className='space-y-4'
        >
          {!isLoggingIn && (
            <input
              type='text'
              placeholder='Username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className='w-full px-4 py-2 rounded-lg bg-transparent text-white border border-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500'
              required
            />
          )}
          <input
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='w-full px-4 py-2 rounded-lg bg-transparent text-white border border-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500'
            required
          />
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='w-full px-4 py-2 rounded-lg bg-transparent text-white border border-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500'
            required
          />
          <button
            type='submit'
            className='w-full flex items-center justify-center px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-transform transform hover:scale-105'
          >
            {isLoggingIn ? "Login" : "Sign Up"}
            <ArrowRight className='ml-2 -rotate-45' size={16} />
          </button>
        </form>

        {!isLoggingIn && (
          <button
            onClick={() => setIsLoggingIn(true)} // Switch to login mode
            className='mt-4 text-purple-400 hover:text-purple-500 font-semibold w-full text-center'
          >
            Already have an account? Login
          </button>
        )}

        <button
          onClick={onClose} // Close the modal
          className='mt-4 text-gray-300 hover:text-purple-400 cursor-pointer block'
        >
          Close
        </button>

        {/* Logout Button (Visible when logged in) */}
        {localStorage.getItem("token") && (
          <button
            onClick={handleLogout} // Handle logout
            className='mt-4 w-full flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-transform transform hover:scale-105'
          >
            Logout
            <ArrowRight className='ml-2 -rotate-45' size={16} />
          </button>
        )}
      </div>
    </div>
  );
};

export default SignUpModal;
