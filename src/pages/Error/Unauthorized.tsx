import React from 'react';
import { Link } from 'react-router-dom';
import { LogIn, Shield } from 'lucide-react';

const Unauthorized = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
          <Shield className="w-8 h-8 text-red-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900">Unauthorized Access</h1>
        <p className="mt-4 text-xl text-gray-600">You don't have permission to access this page.</p>
        <Link
          to="/login"
          className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <LogIn className="w-4 h-4 mr-2" />
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;