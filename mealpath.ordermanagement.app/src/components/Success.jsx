// Success.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { MdCheckCircle } from 'react-icons/md';

const Success = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center mt-[-400px]"> {/* Use negative top margin */}
        <div className="bg-green-500 text-white rounded-full p-8 mb-4 inline-block">
          <MdCheckCircle className="text-6xl" />
        </div>
        <h1 className="text-4xl font-bold text-green-600 mb-4">Order Successful!</h1>
        <p className="text-lg text-gray-700 mb-8">
          Thank you for your order. Your transaction was successful.
        </p>
        <Link to="/">
          <button className="bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-600 focus:outline-none">
            Go Back to Homepage
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Success;
