import React from 'react';
import { MessageSquare, Volume2 } from 'lucide-react';

export default function AutonomousTestingComponent() {
  return (
    <div className="bg-black font-gilroy text-white min-h-screen flex flex-col items-center">
      <div className="w-full max-w-6xl px-4">
        {/* Header */}
        <div className="py-4 text-center">
          <p className="text-gray-400 text-sm">Built by experts in autonomous testing</p>
        </div>

        {/* Logos */}
        <div className="flex justify-center space-x-16 py-8">
          <div className="w-12 h-12 bg-gray-700 opacity-70 rounded-md"></div>
          <div className="w-12 h-12 bg-gray-700 opacity-70 rounded-md"></div>
          <div className="w-12 h-12 bg-gray-700 opacity-70 rounded-md"></div>
          <div className="w-12 h-12 bg-gray-700 opacity-70 rounded-md"></div>
        </div>

        {/* Main Content */}
        <div className="py-16 text-center">
          <h1 className="text-5xl font-bold mb-4">
            Tired of manually<br />testing your AI agents?
          </h1>
          
          <p className="max-w-3xl mx-auto text-gray-400 mt-8">
            Simulate thousands of scenarios from a few test cases. You create the
            prompts, we simulate environments to test your agents from all directions.
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 gap-12 py-8">
          <div className="text-center flex flex-col items-center">
            <div className="bg-gray-800 rounded-full p-4 mb-6">
              <MessageSquare size={32} className="text-gray-300" />
            </div>
            <h2 className="text-xl font-bold mb-4">AI-Powered Simulations</h2>
            <p className="text-gray-400">
              We chat with your agent to generate<br />test cases.
            </p>
          </div>
          
          <div className="text-center flex flex-col items-center">
            <div className="bg-gray-800 rounded-full p-4 mb-6">
              <Volume2 size={32} className="text-gray-300" />
            </div>
            <h2 className="text-xl font-bold mb-4">Voice AI Compatible</h2>
            <p className="text-gray-400">
              We can call your agent via voice just as<br />easily as text.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}