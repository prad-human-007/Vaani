import React from 'react';

// Data for the right-side points
const pointsData = [
  {
    title: 'Built on Proven Foundations',
    description: 'Our systems are based on years of developing and scaling testing infrastructure at Waymo.',
  },
  {
    title: 'Metrics that Matter',
    description: 'We work closely with you to define the evaluation metrics that drive your business outcomes.',
  },
  {
    title: 'Developer-First Design',
    description: 'Seamless integrations & intuitive workflows help you focus on shipping reliable agents faster.',
  },
];

const WhyUsSection = () => {
  return (
    <div className="bg-black font-gilroy text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 xl:gap-24 items-center">

        {/* Left Column: Headline */}
        <div className="md:pr-8">
          <span className="inline-block bg-gray-800 text-gray-300 px-4 py-1 rounded-full text-sm mb-4">
            Why us?
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
          Vocalitycs brings a decade of research in self-driving to conversational AI
          </h2>
        </div>

        {/* Right Column: Points with Divider */}
        <div className="relative border-l border-gray-700 pl-8 lg:pl-12">
          <div className="flex flex-col space-y-8 lg:space-y-10">
            {pointsData.map((point, index) => (
              <div key={index}>
                <h3 className="text-xl lg:text-2xl font-semibold mb-2 text-gray-100">
                  {point.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {point.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default WhyUsSection;