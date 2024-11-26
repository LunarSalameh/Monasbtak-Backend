"use client";

import React, {useState} from "react";
import { FaPhoneAlt } from "react-icons/fa";
import './page.css';

export default function PendingOffers () { 

    const [slider,setSlider] = useState(0);

    const offers = [
        {
            customerName: "Customer Name #1",
            customerPP: "/Planner3.jpg",
            phoneNumber : "079888822",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus in libero. etur adipiscing elit. Nullam nec purus."
        } ,
        {
            customerName: "Customer Name #2",
            customerPP: "/Planner4.jpg",
            phoneNumber : "079888822",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus in libero. etur adipiscing elit. Nullam nec purus."
        } ,
        {
            customerName: "Customer Name #3",
            customerPP: "/Planner1.jpg",
            phoneNumber : "079888822",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus in libero. etur adipiscing elit. Nullam nec purus."
        } ,
        {
            customerName: "Customer Name #4",
            customerPP: "/Planner2.jpg",
            phoneNumber : "079888822",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus in libero. etur adipiscing elit. Nullam nec purus."
        } ,
    ]

    const handleSlider = (next) => {
        setSlider((prevIndex) => {
          const itemCount = offers.length;
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
        <div className='PA-container'>
            
            <div className='PO-container'>
                
                <div className="rounded-lg  ">
                    
                    {/* Heading */}
                    <div className="flex flex-col ">
                        <h1 className="font-bold text-3xl mb-3 ">Pending Offers</h1>
                        <hr/>
                    </div>

                    {/* Card List */}
                    <div className="mx-auto flex gap-8 my-8 justify-center">
                        
                        {/* Next Button */}
                        <button onClick={() => handleSlider(false)} >
                            <svg className="h-8 w-8 text-[#4C1B41]"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"/>
                            </svg>
                        </button>
                        
                        {/* CARD MAP */}
                        <div className="grid grid-rows-2 max-lg:grid-cols-1 items-center justify-items-center gap-6">
                            {
                                [0,1].map((offset)=>(
                                <div key={offset} className=" border-gray-200 border-2 rounded-xl  hover:bg-gray-100 h hover:border-[#d9b34d] ">
                                         <div className="p-2 w-full flex flex-row max-md:flex-col max-md:items-center gap-3">
                                            
                                            <img src={offers[(slider + offset) % offers.length].customerPP} className=" object-cover rounded-full w-20 h-20 items-start"/>
                                            
                                            <div className=" flex flex-col gap-2 max-md:text-xs">
                                                <div className="px-2 pt-3">
                                                    <p className="font-semibold  ">{offers[(slider + offset) % offers.length].customerName}</p>
                                                    <div className="flex items-center gap-2"><FaPhoneAlt /> {offers[(slider + offset) % offers.length].phoneNumber}</div>
                                                </div>

                                                <div className="px-8 mb-2 flex max-lg:flex-col max-lg:gap-3">
                                                    <p className="pr-3 max-md:hidden max-sm:hidden">{offers[(slider + offset) % offers.length].description}</p>
                                                    <button className="bg-[#d9b34d] rounded-lg px-5 py-2  text-white shadow-md shadow-[#d9b34d]">Details</button>
                                                </div>

                                            </div>
                                        </div>

                                </div>
                            ))}
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