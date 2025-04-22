import React from 'react';

export const  Navbar = () => {
  return (
    <nav className="flex font-gilroy items-center justify-between px-6 py-4 bg-black text-white w-[85%]">
      {/* Logo */}
      <div className="flex items-center">
        <a href="/" className="text-3xl font-bold">
          COV<span className="relative">A</span>L
        </a>
      </div>
      
      {/* Navigation Links */}
      <div className="hidden md:flex space-x-8 mx-4">
        <a href="/about" className="hover:text-gray-300">About Us</a>
        <a href="/careers" className="hover:text-gray-300">Careers</a>
        <a href="/docs" className="hover:text-gray-300">Docs</a>
        <a href="/blog" className="hover:text-gray-300">Blog</a>
        <a href="/partners" className="hover:text-gray-300">Partners</a>
      </div>
      
      {/* Auth Buttons */}
      <div className="flex space-x-4">
        <a href="/login" className="px-4 py-2 border border-white rounded-md hover:bg-gray-800">
          Login
        </a>
        <a href="/sign-up" className="px-4 py-2 bg-white text-black rounded-md hover:bg-gray-200">
          Sign up
        </a>
      </div>
    </nav>
  );
}