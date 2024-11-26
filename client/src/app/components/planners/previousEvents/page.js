"use client";

import './page.css'
import React, {useState} from "react";
import { FaLocationDot } from "react-icons/fa6";

export default function PreviousEvents () {

    const [slider,setSlider] = useState(0);

    const previousEvent = [
        {
            Name: "Event #1",
            Img: "/wedding3.jpg",
            location : "Madaba, Jordan",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus in libero. etur adipiscing elit. Nullam nec purus.",
            price: "$99.9"
        } ,
        {
            Name: "Event #2",
            Img: "/wedding.jpg",
            location : "Amman, Jordan",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus in libero. etur adipiscing elit. Nullam nec purus.",
            price: "$99.9"
        } ,
        {
            Name: "Event #3",
            Img: "/wedding2.jpg",
            location : "Zarqa, Jordan",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus in libero. etur adipiscing elit. Nullam nec purus.",
            price: "$99.9"
        } ,
        {
            Name: "Event #4",
            Img: "/wedding4.jpg",
            location : "Ma'an, Jordan",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus in libero. etur adipiscing elit. Nullam nec purus.",
            price: "$99.9"
        } ,
        {
            Name: "Event #5",
            Img: "/wedding5.jpg",
            location : "Amman, Jordan",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus in libero. etur adipiscing elit. Nullam nec purus.",
            price: "$99.9"
        } ,
        {
            Name: "Event #6",
            Img: "/wedding6.jpg",
            location : "Irbid, Jordan",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus in libero. etur adipiscing elit. Nullam nec purus.",
            price: "$99.9"
        } ,

    ]

    const handleSlider = (next) => {
        setSlider((prevIndex) => {
          const itemCount = previousEvent.length;
          if ( next ){
            return (prevIndex + 1) %itemCount;
          }
          else{
            return (prevIndex - 1 +itemCount ) % itemCount;  
          }
        })
    
      }

    return (
        <>
            <div className="PAE-container ">

                <div className='PE-container'>
                    
                    <div className='rounded-lg'>
                        
                        {/* Heading */}
                        <div className="flex flex-col">
                            <h1 className="font-bold text-3xl mb-3">Previous Events</h1>
                            <hr/>
                        </div>

                        {/* BODY Cards  */}
                        <div className="mx-auto flex gap-8  my-8 justify-center">
                            
                            {/* Next Button */}
                            <button onClick={() => handleSlider(false)} >
                                <svg className="h-8 w-8 text-[#4C1B41]"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"/>
                                </svg>
                            </button>

                            {/* Cards */}
                            <div className="grid grid-cols-3 max-lg:grid-cols-1  items-center justify-items-center gap-6 ">
                                {
                                    [0,1,2].map((offset) => (
                                        <div key={offset} className=" border-gray-200 border-2 rounded-xl p-2 hover:bg-gray-100 hover:border-[#d9b34d] ">
                                            <div className='container-pre'>
                                                {/* Image & price */}
                                                <figure className='relative'>
                                                    <img 
                                                        src={previousEvent[(slider + offset) % previousEvent.length].Img} 
                                                        alt={previousEvent[(slider + offset) % previousEvent.length].Name}
                                                        className='rounded-lg w-64 h-40 max-md:h-40 max-md:w-40 object-cover'
                                                    />
                                                    <div className='bg-[#5a5a5a8e] bottom-2 left-2 w-fit px-3 rounded-lg text-white py-1 absolute max-md:text-[10px] '>{previousEvent[(slider + offset) % previousEvent.length].price}</div>
                                                </figure>

                                                <div className='pre-details'>
                                                {/* Event Name */}
                                                <div className='font-semibold p-2 text-lg mt-1 max-lg:text-sm'>
                                                    {previousEvent[(slider + offset) % previousEvent.length].Name}
                                                </div>

                                                {/* Description  */}
                                                <div className='px-2 max-lg:hidden'>
                                                    {previousEvent[(slider + offset) % previousEvent.length].description}
                                                </div>

                                                {/* Location  */}
                                                <div className='flex items-center gap-2 px-1 pt-2 text-sm max-md:hidden'>
                                                    <FaLocationDot />
                                                    <p>{previousEvent[(slider + offset) % previousEvent.length].location}</p>
                                                </div>
                                                </div>

                                            </div>
                                        </div>
                                    ))
                                }
                                
                            </div>
                            
                            {/* Prev Button */}
                            <button onClick={() => handleSlider(true)} >
                                <svg className="h-8 w-8 text-[#4C1B41]"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                            </button>

                        </div>

                    </div>

                </div>

            </div>
        </>

    );
}