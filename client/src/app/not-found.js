"use client"

import React from 'react';
import { useRouter } from 'next/navigation';

import Navbar from './components/navbar/page';
import { IoMdArrowRoundBack } from "react-icons/io";


const UnauthorizedPage = () => {
  const router = useRouter();
  

  const handleGoBack = () => {
    router.back();  // Goes to the previous page
  };

  return (
    <>
    <Navbar />
    <div className="flex max-md:flex-col items-center p-8 gap-6 justify-center h-[85vh] max-sm:h-fit text-gray-800">
      <div className="max-w-lg text-center max-sm:hidden max-lg:w-3/4 ">
        <img
          src="/404.png"
          alt="Unauthorized"
          className="w-fit "
        />
        </div>
        <div>
        <h1 className="text-7xl font-extrabold text-[#4c1b41] mb-4 text-center max-md:hidden">404</h1>
        <h1 className="text-7xl font-extrabold text-[#4c1b41] mb-4 text-center hidden max-sm:block">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Page you are trying to access could not be found</h2>
        <p className="text-lg text-gray-600 mb-6">
          Sorry, you do not have permission to access this page or the page does not exist.
        </p>
        <div className="flex justify-center space-x-4">
        <button
          onClick={handleGoBack}
          className="px-6 py-3 bg-gray-200 text-gray-800 font-medium text-lg rounded-lg shadow hover:bg-gray-300 transition-colors"
          >
            <IoMdArrowRoundBack  size={20}/>
        </button>
          <a
            href="/"
            className="px-6 py-3 bg-gray-200 text-gray-800 font-medium text-lg rounded-lg shadow hover:bg-gray-300 transition-colors"
          >
            Home
          </a>
          <a
            href="/general/signUp"
            className="px-6 py-3 bg-[#4c1b41] text-white font-medium text-lg rounded-lg shadow hover:bg-[#873074] transition-colors"
          >
            Register
          </a>
        </div>
      </div>
    </div>
    </>
  );
};

export default UnauthorizedPage;
