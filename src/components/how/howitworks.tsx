// src/components/HowItWorks.jsx
import React from "react";
// import chatImage from '../assets/coval-chat.png'; // Adjust path to your image

function HowItWorks() {
  return (
    <div className="bg-black text-white min-h-screen py-16 px-4 sm:px-6 lg:px-8 flex flex-col items-center font-gilroy">
      {/* Main Title */}
      <h1 className="text-4xl md:text-5xl font-semibold mb-12 md:mb-16 text-center">
        How Coval works
      </h1>

      {/* Content Container */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-16 max-w-6xl w-full">
        {/* Left Column - Animated Card */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
          {/* --- The Card Wrapper --- */}
          <div className="relative p-1 rounded-2xl overflow-hidden bg-gray-900 animated-border-card max-w-md w-full">
            {/* Apply the custom class 'animated-border-card' here */}
            {/* p-1 controls the border thickness */}
            {/* rounded-2xl sets the outer corner radius */}
            {/* overflow-hidden clips the pseudo-element */}
            {/* bg-gray-900 is the inner background of the card */}
            <img
              src="https://framerusercontent.com/images/WGMheK9igaNhGCD3XKVrHwGS5Q.png?scale-down-to=1024"
              alt="Coval chat conversation example"
              className="block w-full h-auto rounded-xl relative z-10"
              // rounded-xl is slightly smaller than parent's rounded-2xl
              // relative z-10 puts image above the ::before pseudo-element
            />
          </div>
        </div>

        {/* Right Column - Text Content */}
        <div className="w-full md:w-1/2 flex flex-col justify-center text-center md:text-left">
          <h2 className="text-3xl lg:text-4xl font-semibold mb-4 md:mb-6">
            Simulate conversations
          </h2>
          <p className="text-lg text-gray-500 leading-relaxed max-w-md mx-auto md:mx-0">
            Simulate agent conversations using scenario prompts, transcripts,
            workflows, or audio inputs, with customizable voices and
            environments for advanced testing.
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center mt-20 gap-12 md:gap-16 max-w-6xl w-full">
        {/* Left Column - Animated Card */}

        <div className="w-full md:w-1/2 flex flex-col justify-center text-center md:text-left">
          <h2 className="text-3xl lg:text-4xl font-semibold mb-4 md:mb-6">
            Simulate conversations
          </h2>
          <p className="text-lg text-gray-500 leading-relaxed max-w-md mx-auto md:mx-0">
            Evaluate agent performance with a range of built-in metrics (e.g.,
            latency, accuracy, tool-call effectiveness, instruction compliance)
            or custom-built metrics tailored to your needs.
          </p>
        </div>

        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
          {/* --- The Card Wrapper --- */}
          <div className="relative p-1 rounded-2xl overflow-hidden bg-gray-900 animated-border-card max-w-md w-full">
            {/* Apply the custom class 'animated-border-card' here */}
            {/* p-1 controls the border thickness */}
            {/* rounded-2xl sets the outer corner radius */}
            {/* overflow-hidden clips the pseudo-element */}
            {/* bg-gray-900 is the inner background of the card */}
            <img
              src="https://framerusercontent.com/images/n0CH2ZEXAEnmopfQ1qPnZ8KY5qc.png?scale-down-to=1024"
              alt="Coval chat conversation example"
              className="block w-full h-auto rounded-xl relative z-10"
              // rounded-xl is slightly smaller than parent's rounded-2xl
              // relative z-10 puts image above the ::before pseudo-element
            />
          </div>
        </div>

        {/* Right Column - Text Content */}
      </div>
    </div>
  );
}

export default HowItWorks;
