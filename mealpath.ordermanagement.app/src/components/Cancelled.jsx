import React from 'react';
import { Link } from 'react-router-dom';
import { MdCancel } from 'react-icons/md';

const Cancelled = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center mt-[-400px]">
        <div className="bg-red-500 text-white rounded-full p-8 mb-4 inline-block">
          <MdCancel className="text-6xl" />
        </div>
        <h1 className="text-4xl font-bold text-red-600 mb-4">Payment Cancelled</h1>
        <p className="text-lg text-gray-700 mb-8">
          Your payment was cancelled. Please try again.
        </p>
        <Link to="/">
          <button className="bg-red-500 text-white py-2 px-4 rounded-full hover:bg-red-600 focus:outline-none">
            Go Back to Homepage
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Cancelled;
