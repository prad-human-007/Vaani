// app/page.tsx
"use client";

import React, { useState } from 'react';
import Image from 'next/image'; // Import NextImage for the HIPAA badge

// Helper component for icons
const Icon = ({ name, className = '' }: { name: string, className?: string }) => {
  if (name === 'chevron-down') return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-4 h-4 ${className}`}><path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" /></svg>;
  if (name === 'arrow-right') return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-4 h-4 ${className}`}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>;
  if (name === 'check') return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={`w-5 h-5 ${className}`}><path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" /></svg>;
  // Changed YC icon to blue theme
  if (name === 'yc') return <div className={`w-5 h-5 bg-orange-500 text-white text-xs font-bold flex items-center justify-center rounded-sm ${className}`}>Y</div>;
  // Adjusted heart icon colors
  if (name === 'heart') return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={`w-5 h-5 ${className}`}><path d="m9.653 16.915-.005-.003-.019-.01a20.759 20.759 0 0 1-1.162-.682 22.045 22.045 0 0 1-2.582-1.9-19.306 19.306 0 0 1-2.138-2.31 2.507 2.507 0 0 1-.665-1.47V9.634a2.507 2.507 0 0 1 .665-1.472A19.305 19.305 0 0 1 3.93 5.838a22.049 22.049 0 0 1 2.582-1.901 20.758 20.758 0 0 1 1.162-.682q.008-.004.019-.01l.005-.003aq.002 0 .004.001l.008.001.01.002.01.004.012.005.012.005.014.006.015.007.014.006.012.005.012.005.01.004.01.002.008.001.004-.001Zm2.692-1.256a20.836 20.836 0 0 0 1.162.682 22.048 22.048 0 0 0 2.582 1.9 19.304 19.304 0 0 0 2.138 2.311 2.507 2.507 0 0 0 .665 1.47V9.634a2.507 2.507 0 0 0-.665-1.472A19.303 19.303 0 0 0 16.07 5.84a22.052 22.052 0 0 0-2.582-1.9c-.426-.3-.868-.57-1.162-.681V15.66Z" /></svg>;
  // Adjusted other icon colors
  if (name === 'concern') return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={`w-5 h-5 ${className}`}><path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm0-2.5a.75.75 0 0 1 .75.75v.01a.75.75 0 0 1-1.5 0v-.01a.75.75 0 0 1 .75-.75Zm.25-6.5a.75.75 0 0 0-1.5 0v4.5a.75.75 0 0 0 1.5 0v-4.5Z" clipRule="evenodd" /></svg>;
  if (name === 'anxious') return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={`w-5 h-5 ${className}`}><path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm0-2.5a.75.75 0 0 1 .75.75v.01a.75.75 0 0 1-1.5 0v-.01a.75.75 0 0 1 .75-.75Zm-1-6a.75.75 0 0 1 .75-.75h.5a.75.75 0 0 1 0 1.5h-.5a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" /></svg>;
  if (name === 'sigh') return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={`w-5 h-5 ${className}`}><path fillRule="evenodd" d="M4.5 2A1.5 1.5 0 0 0 3 3.5v13A1.5 1.5 0 0 0 4.5 18h11a1.5 1.5 0 0 0 1.5-1.5V7.621a1.5 1.5 0 0 0-.44-1.06l-4.12-4.122A1.5 1.5 0 0 0 11.378 2H4.5Zm2.75 7.5a.75.75 0 0 1 .75.75v.01a.75.75 0 0 1-1.5 0V10.25a.75.75 0 0 1 .75-.75Zm3.5-.75a.75.75 0 0 0-1.5 0v2.5a.75.75 0 0 0 1.5 0v-2.5Z" clipRule="evenodd" /></svg>;
  if (name === 'pause') return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={`w-5 h-5 ${className}`}><path d="M5.75 3.75a.75.75 0 0 0-.75.75v11a.75.75 0 0 0 1.5 0V4.5a.75.75 0 0 0-.75-.75Zm8.5 0a.75.75 0 0 0-.75.75v11a.75.75 0 0 0 1.5 0V4.5a.75.75 0 0 0-.75-.75Z" /></svg>;
  if (name === 'plus') return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={`w-5 h-5 ${className}`}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>;
  if (name === 'minus') return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={`w-5 h-5 ${className}`}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" /></svg>;
  return <span className={className}>?</span>;
};

// Roark Logo Component
const RoarkLogo = () => (
  <div className="w-8 h-8">
    <Image
      src="/images/logo8.png" // Ensure this path is correct in your public folder
      alt="Roark Logo"
      width={50}
      height={50}
      className="object-contain"
    />
  </div>
);

const Navbar = () => {
  const navLinks = [
    { name: 'Product', dropdown: true, href: "#" }, // Keep existing href or update if Product section exists
    { name: 'Integration', href: "#integration" }, // Updated href
    { name: 'Pricing', href: "#" }, // Keep existing href or update if Pricing section exists
    { name: 'Faq', href: "#faq" }, // Updated href
    { name: 'About', href: "#" } // Keep existing href or update if About section exists
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <RoarkLogo />
            <div className="hidden md:flex items-baseline space-x-6 ml-10">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center"
                >
                  {link.name}
                  {link.dropdown && <Icon name="chevron-down" className="ml-1" />}
                </a>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="bg-white text-black px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-200 transition-colors">Book a demo</button>
            <a href="/sign-up" className="text-gray-300 hover:text-white text-sm font-medium">Sign up <Icon name="arrow-right" className="inline-block ml-1" /></a>
          </div>
        </div>
      </div>
    </nav>
  );
};

const HeroSection = () => { /* ... HeroSection component code ... */ return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center pt-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Changed radial gradient to blueish */}
      <div className="absolute inset-0 z-[-1]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(14, 165, 233, 0.1) 1px, transparent 0)', backgroundSize: '20px 20px', opacity: 0.7 }} />
      {/* Changed gradient to blueish */}
      <div className="absolute inset-0 z-[-2] bg-gradient-to-b from-blue-700/50 via-black/80 to-black" />
      <div className="mb-6 inline-flex items-center bg-gray-800/70 backdrop-blur-sm text-sm text-gray-300 px-3 py-1.5 rounded-full shadow-md">Backed by <Icon name="yc" className="ml-2 mr-1" /> Combinator</div>
      <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-tight">Ship Voice AI That <br /> Work in the Real World</h1>
      <p className="mt-6 max-w-2xl text-lg text-gray-400">Simulations miss what real users reveal. Vocal puts your voice agents in front of real people so you can ship with confidence.</p>
      <div className="mt-10 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
        <button className="bg-white text-black px-6 py-3 rounded-lg text-base font-semibold hover:bg-gray-200 transition-colors w-full sm:w-auto">Book a demo</button>
        <a href="#" className="text-white hover:text-gray-300 px-6 py-3 text-base font-medium flex items-center group">Learn more <Icon name="arrow-right" className="ml-2 group-hover:translate-x-1 transition-transform" /></a>
      </div>
    </section>
  );};

const MonitoringSection = () => { /* ... MonitoringSection component code ... */ return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          {/* Changed heading color to blueish */}
          <p className="text-sm font-semibold text-sky-400 uppercase tracking-wider">MONITORING & EVALUATION</p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-white">Real-time Insights to Catch Failures and Optimize Conversations</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gray-900 p-6 sm:p-8 rounded-xl shadow-2xl">
            <h3 className="text-xl font-semibold text-white mb-3">Enterprise-Grade Transcription</h3>
            <p className="text-gray-400 text-sm mb-6">More accurate than Deepgram, supporting 50+ languages with a word error rate of just 8.8%.</p>
            <div className="bg-gray-800 p-4 rounded-lg">
              {/* Changed text color to blueish */}
              <p className="text-xs text-sky-400 mb-2">• Post Call Transcription</p>
              <div className="space-y-3">
                {/* Changed patient bubble color to blueish */}
                <div className="bg-blue-600 text-white p-3 rounded-lg rounded-bl-none text-sm shadow">Hi, I've been having some tingling in my hands and feeling short of breath lately. My doctor mentioned something about anxiety?<p className="text-xs text-blue-200 mt-1">Patient</p></div>
                <div className="bg-gray-700 text-gray-300 p-3 rounded-lg rounded-br-none text-sm shadow">I understand your concerns. Let's talk about your symptoms and what your doctor found. Have you noticed any patterns with when these symptoms occur?<p className="text-xs text-gray-500 mt-1">Healthcare Provider</p></div>
              </div>
            </div>
          </div>
          <div className="bg-gray-900 p-6 sm:p-8 rounded-xl shadow-2xl">
            <h3 className="text-xl font-semibold text-white mb-3">Sentiment & Emotion Analysis</h3>
            <p className="text-gray-400 text-sm mb-6">Detect customer sentiment, emotions, and vocal cues in real-time.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <h4 className="text-gray-400 mb-2 font-medium">Sentiment</h4>
                <div className="space-y-2">
                  {/* Adjusted icon colors */}
                  <div className="flex items-center justify-between bg-gray-800 p-2.5 rounded-md"><span className="flex items-center text-gray-300"><Icon name="heart" className="mr-2 text-sky-400"/> Positive</span><span className="text-gray-300">-0.7</span></div>
                  <div className="flex items-center justify-between bg-gray-800 p-2.5 rounded-md"><span className="flex items-center text-gray-300"><Icon name="heart" className="mr-2 text-red-400 rotate-180"/> Negative</span><span className="text-gray-300">+0.8</span></div>
                </div>
              </div>
              <div>
                <h4 className="text-gray-400 mb-2 font-medium">Emotion</h4>
                <div className="space-y-2">
                  {/* Adjusted icon colors */}
                  <div className="flex items-center justify-between bg-gray-800 p-2.5 rounded-md"><span className="flex items-center text-gray-300"><Icon name="concern" className="mr-2 text-cyan-400"/> Concerned</span><span className="text-gray-300">85%</span></div>
                  <div className="flex items-center justify-between bg-gray-800 p-2.5 rounded-md"><span className="flex items-center text-gray-300"><Icon name="anxious" className="mr-2 text-sky-400"/> Anxious</span><span className="text-gray-300">60%</span></div>
                </div>
              </div>
              <div>
                <h4 className="text-gray-400 mb-2 font-medium">Vocal Cues</h4>
                <div className="space-y-2">
                  {/* Adjusted icon colors */}
                  <div className="flex items-center justify-between bg-gray-800 p-2.5 rounded-md"><span className="flex items-center text-gray-300"><Icon name="sigh" className="mr-2 text-cyan-400"/> Sigh</span><span className="text-gray-300">2</span></div>
                  <div className="flex items-center justify-between bg-gray-800 p-2.5 rounded-md"><span className="flex items-center text-gray-300"><Icon name="pause" className="mr-2 text-cyan-400"/> Pauses</span><span className="text-gray-300">3</span></div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-900 p-6 sm:p-8 rounded-xl shadow-2xl">
            <h3 className="text-xl font-semibold text-white mb-3">Event Tracking</h3>
            <p className="text-gray-400 text-sm mb-6">Monitor key conversation events and set custom alerts.</p>
            <div className="space-y-3">
              {/* Adjusted icon color */}
              <div className="flex items-center justify-between bg-gray-800 p-3 rounded-md text-sm"><span className="text-gray-300">Call Forwarded</span><Icon name="check" className="text-sky-400" /></div>
              <div className="flex items-center justify-between bg-gray-800 p-3 rounded-md text-sm"><span className="text-gray-300">Identity Verified</span><Icon name="check" className="text-sky-400" /></div>
            </div>
          </div>
          <div className="bg-gray-900 p-6 sm:p-8 rounded-xl shadow-2xl">
            <h3 className="text-xl font-semibold text-white mb-3">Goal Evaluation</h3>
            <p className="text-gray-400 text-sm mb-6">Automatically detect if key conversation goals were met.</p>
            <div className="space-y-3">
              {/* Adjusted text colors */}
              <div className="flex items-center justify-between bg-gray-800 p-3 rounded-md text-sm"><div className="text-gray-300"><p className="text-xs text-sky-400 mb-1">• Goals Completed</p>Insurance Verification</div><span className="text-sky-400 font-semibold">Pass</span></div>
              <div className="flex items-center justify-between bg-gray-800 p-3 rounded-md text-sm"><span className="text-gray-300">Goals Completed</span><span className="text-gray-300">2/3</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );};

const IntegrationSection = () => { /* ... IntegrationSection component code ... */ return (
    // Added id="integration"
    <section id="integration" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            {/* Changed heading color to blueish */}
            <p className="text-sm font-semibold text-sky-400 uppercase tracking-wider mb-2">Integration</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Integrate in Minutes, No Code Needed</h2>
            <p className="text-gray-400 text-lg mb-8">Connect Voc-al to your voice agent in minutes—no setup headaches. Use our SDK for full control, or instantly integrate with VAPI and Retell for a no-code experience.</p>
            <div className="flex space-x-3 mb-8">
              {/* Changed button color to blueish */}
              <button className="bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors">No-Code Integration</button>
              <button className="bg-gray-700 text-gray-300 px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-600 transition-colors">SDK Integration</button>
            </div>
          </div>
          {/* Changed gradient border to blueish */}
          <div className="relative p-1 bg-gradient-to-br from-blue-600 via-sky-500 to-blue-700 rounded-xl shadow-2xl">
            <div className="bg-gray-900 p-8 rounded-lg space-y-8">
              {/* Updated VAPI color to blueish */}
              {[{ logo: "V Λ P I", name: "VAPI", description: "Connect your VAPI agent directly to Voc-al for instant analytics and insights.", link: "#", color: "text-sky-400" }, { logo: "Retell AI", name: "Retell AI", description: "Integrate your Retell AI voice assistant with Voc-al in just a few clicks.", link: "#", color: "text-gray-300" /* Retell AI's ":::" will use text-gray-300 from h3 */ }].map((integ) => (
                <div key={integ.name}>
                  {integ.name === "VAPI" ? ( <h3 className={`text-3xl font-bold ${integ.color} mb-2 tracking-widest`}>{integ.logo}</h3> ) : ( <h3 className={`text-2xl font-bold text-gray-300 mb-2 flex items-center`}><span className="text-3xl mr-2">:::</span> {integ.name}</h3> )}
                  <p className="text-gray-400 text-sm mb-3">{integ.description}</p>
                  {/* Changed link color to blueish */}
                  <a href={integ.link} className="text-sky-400 hover:text-sky-300 text-sm font-medium flex items-center group">View Documentation <Icon name="arrow-right" className="ml-1.5 group-hover:translate-x-1 transition-transform" /></a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );};

const FaqItem = ({ faq, isOpen, onToggle }: { faq: { question: string; answer: string; }; isOpen: boolean; onToggle: () => void; }) => { /* ... FaqItem component code ... */ return (
    <div className="border-b border-gray-800">
      <button
        onClick={onToggle}
        className="flex justify-between items-center w-full py-6 text-left hover:bg-gray-900/30 focus:outline-none focus-visible:bg-gray-900/30 transition-colors duration-150 px-2 rounded-md"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${faq.question.replace(/\s+/g, '-').toLowerCase()}`}
      >
        <span className="text-lg text-white font-medium">{faq.question}</span>
        <Icon name={isOpen ? "minus" : "plus"} className="text-white flex-shrink-0 transition-transform duration-200 ease-in-out" />
      </button>
      {isOpen && (
        <div
          id={`faq-answer-${faq.question.replace(/\s+/g, '-').toLowerCase()}`}
          className="pb-6 pr-6 pt-2 text-gray-400 text-left"
        >
          {faq.answer}
        </div>
      )}
    </div>
  );};

const FaqSection = () => { /* ... FaqSection component code ... */
  const faqData = [
    { question: "What does Voc-al do?", answer: "Voc-al provides tools to simulate, track, and debug voice AI applications, enabling developers to ship reliable voice AI faster. Our platform allows you to replay production calls, analyze performance metrics, identify transcription errors, and evaluate conversation goals." },
    { question: "What are simulated replays?", answer: "Simulated replays allow you to test your voice AI with real production call data in a controlled environment to identify issues before they affect users. You can see how changes to your AI model or logic perform against historical interactions." },
    { question: "What kind of sentiment analysis does Voc-al offer?", answer: "Voc-al offers real-time sentiment and emotion analysis, detecting customer sentiment (positive, negative, neutral), specific emotions like concern or anxiety, and vocal cues such as sighs or pauses during conversations." },
    { question: "How difficult is it to integrate Voc-al?", answer: "Voc-al can be integrated in minutes. We offer no-code integrations with popular platforms like VAPI and Retell AI, allowing you to connect your existing voice agents quickly. For more custom setups, our SDK provides full control and flexibility." },
  ];
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const handleToggle = (index: number) => { setOpenIndex(openIndex === index ? null : index); };
 return (
    // Added id="faq"
    <section id="faq" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl font-bold text-white">Frequently Asked Questions</h2>
        <p className="mt-4 text-lg text-gray-400">Got Questions? We've Got Answers.</p>
      </div>
      <div className="mt-12 max-w-2xl mx-auto">
        <div className="border-t border-gray-800">
          {faqData.map((faq, index) => (
            <FaqItem key={index} faq={faq} isOpen={openIndex === index} onToggle={() => handleToggle(index)} />
          ))}
        </div>
      </div>
    </section>
  );};

// Placeholder for the Cekura specific icon in the footer
const CekuraLogoIcon = () => (
  <div className="w-10 h-10 bg-gray-700/50 backdrop-blur-sm rounded-lg flex items-center justify-center mr-3 shadow-md">
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
      <path d="M12 3C13.0733 3 14.0943 3.28118 15 3.79007C13.9057 4.30005 12.9267 4.71882 12 5C11.0733 4.71882 10.0943 4.30005 9 3.79007C9.90573 3.28118 10.9267 3 12 3Z" />
      <path d="M12 6C14.2067 6 16.2633 6.76882 18 8.08007C16.2633 7.23118 14.2067 6.5 12 6.5C9.79333 6.5 7.73667 7.23118 6 8.08007C7.73667 6.76882 9.79333 6 12 6Z" />
      <path d="M12 9C15.3133 9 18.172 10.2565 20 12.3701C18.172 10.7435 15.3133 9.5 12 9.5C8.68667 9.5 5.828 10.7435 4 12.3701C5.828 10.2565 8.68667 9 12 9Z" />
      <path d="M12 12C16.42 12 20 13.7435 20 16.1501C20 14.2565 16.42 12.5 12 12.5C7.58 12.5 4 14.2565 4 16.1501C4 13.7435 7.58 12 12 12Z" />
    </svg>
  </div>
);

const FooterSection = () => {
  const footerLinks = {
    cekura: [
      { name: "How we work", href: "#" }, { name: "Guides", href: "#" },
      { name: "Use Cases", href: "#" }, { name: "Testimonials", href: "#" },
      { name: "Careers", href: "#" },
    ],
    partners: [ { name: "Retell AI", href: "#" } ],
    legal: [
      { name: "Terms of Service", href: "#" }, { name: "Privacy Policy", href: "#" },
    ],
  };

  return (
    <footer className="bg-gray-950 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4 xl:col-span-5">
            <div className="flex items-center mb-4">
              <CekuraLogoIcon />
              <span className="text-2xl font-semibold text-white">Cekura</span>
            </div>
            <p className="text-sm text-gray-400 mb-1">
              Tatva Labs Inc. © 2025.
            </p>
            <div className="mt-6">
              <Image
                src="/img/hipaa-badge.png" // Ensure this path is correct in your public folder
                alt="HIPAA Compliant"
                width={96}
                height={96}
                className="object-contain"
              />
            </div>
          </div>

          <div className="lg:col-span-2 xl:col-span-2">
            <h3 className="text-md font-semibold text-white mb-4">Cekura</h3>
            <ul className="space-y-2">
              {footerLinks.cekura.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-sm hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2 xl:col-span-1">
            <h3 className="text-md font-semibold text-white mb-4">Partners</h3>
            <ul className="space-y-2">
              {footerLinks.partners.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-sm hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="lg:col-span-2 xl:col-span-2">
            <h3 className="text-md font-semibold text-white mb-4">Contact</h3>
            <address className="not-italic text-sm space-y-1">
              <a href="mailto:founders@cekura.ai" className="block hover:text-white transition-colors">founders@cekura.ai</a>
              <p>710 Lakeway Drive,</p>
              <p>Suite 200 Sunnyvale,</p>
              <p>CA 94085</p>
            </address>
          </div>

          <div className="lg:col-span-2 xl:col-span-2">
            <h3 className="text-md font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-sm hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};


export default function LandingPage() {
  // For smooth scrolling, it's best to apply this to the <html> tag in your global CSS (e.g., globals.css or layout.tsx)
  // html { scroll-behavior: smooth; }
  // As a workaround for this single file, we can add styles to the main div or use inline style for the html element via useEffect.
  // However, direct DOM manipulation or global styles are preferred for `scroll-behavior`.
  // Here, we'll rely on the browser's default behavior for anchor links,
  // but for optimal experience, `scroll-behavior: smooth;` in global CSS is recommended.

  React.useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = ''; // Clean up on unmount
    };
  }, []);


  return (
    // Applying scroll-pt (scroll-padding-top) to account for the fixed navbar height
    // The h-20 navbar is 5rem, so we add padding top for scrolling.
    // This ensures the section title is not hidden behind the fixed navbar when scrolled to.
    // Note: This is applied to the scroll container. If your <html> or <body> is the scroller,
    // you'd apply it there via global CSS: html { scroll-padding-top: 5rem; }
    // For this example, if this div is the primary scroller, it works.
    // But typically `<html>` is.
    <div className="bg-black text-white min-h-screen font-sans" style={{ scrollPaddingTop: '5rem' /* 80px for h-20 navbar */ }}>
      <Navbar />
      <main>
        <HeroSection />
        <MonitoringSection />
        <IntegrationSection />
        <FaqSection />
      </main>
      <FooterSection />
    </div>
  );
}