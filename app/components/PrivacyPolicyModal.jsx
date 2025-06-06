import React, { useEffect } from 'react';
import { FiX } from 'react-icons/fi';

const policySections = [
  {
    id : "1",
    title : "Information We Collect",
    data : "We collect personal information like name, email address, and usage data (IP, browser, etc.) to provide and improve our services.",
  },
  {
    id : "2",
    title : "How We Use Your Information",
    points : [
      "To provide and maintain our services",
      "Improve user experience and service quality",
      "Send important updates or support emails",
    ],
  },
  {
    id : "3",
    title : "Your Rights",
    data : "You have the right to request access, correction, or deletion of your personal data at any time by contacting us.",
  },
  {
    id : "4",
    title : "Contact Information",
    data : "For any privacy-related questions, please contact us at",
    contact : "support@dsavisualizer.com",
  },
];

const PrivacyPolicyModal = ({ isOpen, onClose }) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop with fade-in animation */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Modal container with slide-up animation */}
      <div className="relative bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 max-w-3xl w-full rounded-xl shadow-2xl overflow-hidden transform transition-all duration-300 max-h-[90vh] flex flex-col">
        {/* Header with close button */}
        <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-4 flex justify-between items-center z-10">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            Privacy Policy
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            aria-label="Close"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto p-6">
          <p className="mb-6 text-gray-600 dark:text-gray-300">
            Your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
          </p>

          {/* Policy sections */}
          <div className="space-y-6">
            <ul>
              {policySections.map((item, index) => (
                <li key={index} className='mb-3'>
                  <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
                    <div className='flex'>
                    <span className="w-6 h-6 font-poppins font-semibold bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 mr-3">{item.id}</span>
                    <h3 className="text-xl font-semibold mb-2 flex items-center">
                      {item.title}
                    </h3>
                    </div>
                    {item.points && <ul className="space-y-2 text-gray-600 dark:text-gray-300 pl-9">
                      {item.points.map((subitem, subindex) => (
                        <li key={subindex} className='list-disc text-blue-500'>
                          <span className='text-gray-600 dark:text-gray-300'>{subitem}</span>
                        </li>
                      ))}
                    </ul>}
                    <p className="text-gray-600 dark:text-gray-300 pl-9">{item.data}</p>
                    <span className="font-medium pl-9 text-blue-600 dark:text-blue-400">{item.contact}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Last updated: May 17, 2025
            </p>
          </div>
        </div>

        {/* Footer with close button */}
        <div className="sticky bottom-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 p-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-300"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyModal;