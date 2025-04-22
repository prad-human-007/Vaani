import React from "react";

const TestimonialSection = () => {
  // Replace with actual data or props
  const testimonial = {
    quote:
      "Vocalitycs's simulation and evaluation platform has been the game changer for us. Before Coval, we were spending countless hours pulling our hair out trying to make sure our voice agents behaved the way our customers wanted. Now, with a few tests we can deploy production ready voice AI agents in a fraction of the time.”",
    avatarUrl: "https://via.placeholder.com/100", // Replace with actual image URL
    name: "Will Bodewes",
    title: "CEO, Phonely",
    caseStudyUrl: "#", // Replace with actual link
  };

  return (
    <div className="bg-black text-white font-gilroy py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <h2 className="text-4xl sm:text-5xl font-bold text-center mb-12 sm:mb-16">
          Listen to what our customers say
        </h2>

        {/* Testimonial Card */}
        <div className="bg-[#161618] rounded-2xl p-8 sm:p-10 lg:p-12 shadow-lg">
          {/* Quote */}
          <blockquote className="text-lg lg:text-xl text-gray-300 leading-relaxed text-center">
            {testimonial.quote}
          </blockquote>

          {/* Divider */}
          <hr className="border-t border-gray-700 my-8" />

          {/* Attribution */}
          <div className="flex flex-col items-center text-center">
            {/* Avatar */}
            <img
              src={testimonial.avatarUrl}
              alt={`Avatar of ${testimonial.name}`}
              className="h-16 w-16 rounded-full object-cover mb-4"
            />
            {/* Name & Title */}
            <div className="font-semibold text-gray-100">
              {testimonial.name} | {testimonial.title}
            </div>
            {/* Case Study Link */}
            <a
              href={testimonial.caseStudyUrl}
              className="text-sm text-gray-400 mt-2 hover:text-gray-200 transition-colors duration-200"
              target="_blank" // Optional: Open in new tab
              rel="noopener noreferrer" // Optional: Security best practice
            >
              Read Case Study
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;
