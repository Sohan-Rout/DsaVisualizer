import React from 'react';

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="group bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition duration-300 transform hover:scale-105 hover:shadow-xl hover:border-purple-700 hover:ring-2 hover:ring-purple-200 dark:hover:ring-purple-500 hover:ring-opacity-50 perspective-1000">
      <div className="relative w-full h-48 transition-transform duration-500 transform-style-3d group-hover:rotate-y-180">
        {/* Front Face (Title) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white dark:bg-gray-800 backface-hidden">
          <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center mb-4 transition duration-300 transform hover:scale-110">
            {icon}
          </div>
          <h3 className="text-xl text-center font-semibold text-gray-900 dark:text-white">
            {title}
          </h3>
        </div>
        {/* Back Face (Info) */}
        <div className="absolute inset-0 flex items-center justify-center bg-white dark:bg-gray-800 backface-hidden rotate-y-180">
          <p className="text-gray-600 dark:text-gray-300 text-center px-4">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

const FeaturesSection = () => {
  const features = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Interactive Visualizations",
      description: "See algorithms and data structures come to life with real-time, step-by-step animations."
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5s3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18s-3.332.477-4.5 1.253" />
        </svg>
      ),
      title: "Comprehensive Learning",
      description: "Explore a wide range of DSA topics with detailed explanations and examples."
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Fast & Intuitive",
      description: "Quickly grasp concepts with a user-friendly interface and smooth performance."
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-black text-gray-800 dark:text-gray-200 relative overflow-hidden">
      {/* Dotted Background */}
      <div className="absolute inset-0 dotted-background pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            <span className="text-blue-500">Why</span> Choose DSA Visualizer?
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover powerful features to enhance your learning and understanding of data structures and algorithms.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>

        {/* Divider */}
        <div className="w-auto h-[1px] border-gray-600 rounded-xl mt-14 bg-gray-600 z-10"></div>
      </div>
    </section>
  );
};

export default FeaturesSection;