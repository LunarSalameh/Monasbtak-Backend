"use client"

import React from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../components/navbar/page';
import { IoMdArrowRoundBack } from "react-icons/io";

const Unauthorized = () => {
  const router = useRouter();

  const handleNavigation = (event) => {
    event.preventDefault(); // Prevent the default anchor behavior
    router.push('/general/signUp'); // Navigate programmatically
  };
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
        <h2 className="text-5xl font-semibold mb-2">Unauthorized Access</h2>
        <p className="text-2xl mb-6">
          Sorry, you do not have permission to access this page.
        </p>
        <div className="flex justify-center space-x-4">
        <button
          onClick={handleGoBack}
          className="px-6 py-3 bg-gray-200 text-gray-800 font-medium text-lg rounded-lg shadow hover:bg-gray-300 transition-colors"
          >
            <IoMdArrowRoundBack  size={20}/>
        </button>
        <button
          onClick={handleNavigation}
          className="px-6 py-3 bg-[#4c1b41] text-white text-lg rounded-lg shadow hover:bg-[#873074] transition-colors"
        >
          Return to SignUp
        </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default Unauthorized;



