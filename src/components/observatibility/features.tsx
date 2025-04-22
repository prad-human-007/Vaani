import React from "react";

// Data for the feature cards (makes it easier to manage)
const features = [
  {
    id: 1,
    title: "Monitor production calls",
    description: "Log all production calls & evaluate live-performance.",
    // In a real app, you'd put image URLs here
    imageUrl:
      "https://framerusercontent.com/images/5HmNUOlezSsoylmMvnHYUmU6jS0.png?scale-down-to=512", // Replace with actual image path or URL
    altText: "Dashboard showing production call monitoring graphs",
  },
  {
    id: 2,
    title: "Define your alerts",
    description:
      "Get instant alerts for performance thresholds or off-path behavior.",
    imageUrl:
      "https://framerusercontent.com/images/Fb73SMhqw0EX6gctVGRJ0dNjeE.png?scale-down-to=512", // Replace with actual image path or URL
    altText: "Dashboard showing alert definition and workflow summary",
  },
  {
    id: 3,
    title: "Analyze performance",
    description:
      "Review your runs & trace workflows to optimize your AI agents.",
    imageUrl:
      "https://framerusercontent.com/images/Ro2nQW9T8vREvkij5ckm0s5wkoM.png?scale-down-to=512", // Replace with actual image path or URL
    altText: "Dashboard showing performance evaluation and analysis graphs",
  },
];

// Placeholder component for the images until you have the real ones
const ImagePlaceholder = ({ alt, className }) => (
  <div className={`bg-gray-700 flex items-center justify-center ${className}`}>
    <span className="text-gray-400 text-sm">{alt} (Placeholder)</span>
  </div>
);

const ObservabilityFeatures = () => {
  return (
    <div className="bg-black font-gilroy text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center mb-12 sm:mb-16">
          From development to production observability
        </h1>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="bg-[#141417] rounded-xl overflow-hidden flex flex-col"
            >
              <img
                src={feature.imageUrl}
                alt={feature.altText}
                className="h-56 w-full object-cover" // Adjust height as needed
              />

              {/* Content Area */}
              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-xl lg:text-2xl font-semibold mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-300 text-base leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ObservabilityFeatures;
