'use client';
import {React,useState} from 'react'
import './page.css'
import { IoIosSearch } from "react-icons/io";
import { Icon } from '@iconify/react';


function page() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % Math.ceil(packages.length / 2));
      };
    
      const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + Math.ceil(packages.length / 2)) % Math.ceil(packages.length / 2));
      };

    const packages = [
        {
          name: "Package 1",
          description: "Luxury Wedding Package",
          category: "Wedding",
          subCategory: "Mid Level",
          venue:"Four Seasons Hotel",
          price: 99.9,
          location: "5th Circle, Amman",
          image: "/wedding2.jpg"
        },
        {
            name: "Package 2",
            description: "Luxury Wedding Package",
            category: "Wedding",
            subCategory: "Luxury",
            venue:"Four Seasons Hotel",
            price: 99.9,
            location: "5th Circle, Amman",
            image: "/wedding3.jpg"
          },
          {
            name: "Package 3",
            description: "Luxury Wedding Package",
            category: "Wedding",
            subCategory: "Luxury",
            venue:"Four Seasons Hotel",
            price: 99.9,
            location: "5th Circle, Amman",
            image: "/wedding4.jpg"
          },
          {
            name: "Package 4",
            description: "Luxury Wedding Package",
            category: "Wedding",
            subCategory: "On Budget",
            venue:"Four Seasons Hotel",
            price: 99.9,
            location: "5th Circle, Amman",
            image: "/wedding.jpg"
          },
      ];
  return (
    <div className='page-container'>
        <div className='packages-container'>
        <div className='main-top'>
            <div className='header'>
            <span className='large-font-size bold-font'>Available Packages</span>
            </div>
            <div className="search-container">
                <IoIosSearch className="search-icon" />
                <input type="search" className="search-bar mid-font-size" placeholder="Search" />
            </div>
        </div>
        <hr className='line'/>
        <div className='slider'>
          <button className='arrow left-arrow' onClick={prevSlide}>
            <svg className="h-8 w-8 "  fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"/>
            </svg>
          </button>
          <div className='slides'>
            {packages.slice(currentSlide * 2, currentSlide * 2 + 2).map((pkg, index) => (
              <div className='Package-Box' key={index}>
                <div className='Package-img-container'>
                  <img src={pkg.image} className='Package-img'/>
                  <span className='Price-tag'>$ {pkg.price}</span>
                </div>
                <div className='Package-details'>
                  <span className='mid-font-size'>{pkg.name}</span>
                  <span className='display'>{pkg.description}</span>
                  <span className='display'>{pkg.category}</span>                  
                  <span className='display'>{pkg.subCategory}</span>
                  <span className='display'>{pkg.venue}</span>
                  <div className='row-flex'>
                    <div className='location'>
                      <Icon icon="hugeicons:location-04" className="Location-icon" />
                      <span>{pkg.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className='arrow right-arrow' onClick={nextSlide}>
            <svg className="h-8 w-8 "  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </button>
        </div>
    </div>
    </div>
  )
}

export default page