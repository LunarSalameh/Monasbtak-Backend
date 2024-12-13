'use client';
import React, { useState, useEffect } from 'react';
import './page.css';
import Slider from "../../components/Slider/Slider";
import Categories from "../../components/Categories/Categories";
import WebsiteDesc from "../../components/WebDescription/WebsiteDesc";
import Navbar from '../../components/navbar/page';
import Footer from '../../components/footer/page';
import { useSearchParams } from 'next/navigation';

function Page() {
    const searchParams = useSearchParams();
    const id = searchParams.get('id'); // Get user ID from the query parameters
    const [message, setMessage] = useState('');

    useEffect(() => {
      const storedMessage = localStorage.getItem('message');
      if (storedMessage) {
          setMessage(storedMessage);
          localStorage.removeItem('message');
          setTimeout(() => {
              setMessage('');
          }, 3000); // Hide message after 3 seconds
      }
  }, []);

    return (
        <>
        <Navbar />
        <div className='Container'>
            {/* {message && (
                <div className="fixed top-4 right-4 bg-green-500 text-white p-4 rounded">
                    {message}
                </div>
            )} */}
            <Slider />
            <Categories />
            <WebsiteDesc />
        </div>
        <Footer />
        </>
    );
}

export default Page;