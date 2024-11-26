"use client";

import React, {useState} from "react";
import Navbar from '../../components/navbar/page';
import Footer from '../../components/footer/page';

   const ourTeam = [
      {
        name: 'Lunar Salameh', 
        Photo: '/Lunar.jpeg'
      },
      {
        name: 'Nada Abudari', 
        Photo: '/nada.jpg'
      },
      {
        name: 'Omar Hammad', 
        Photo: '/omar.png'
      },
      {
        name: 'Abdelrahman', 
        Photo: '/Abd.jpeg'
      },
    ]
export default function Aboutus() {
  const [slider,setSlider] = useState(0);

  const handleSlider = (next) => {
    setSlider((prevIndex) => {
      const itemCount = ourTeam.length;
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
      <Navbar />
      <div className="min-h-screen p-8 pb-20 max-w-5xl mx-auto ">

        {/* what do we offer Section */ }
        <div className="flex flex-col gap-10 pt-[2rem] ">
          <div >
            <div className="font-bold text-[#4C1B41] text-4xl mb-2" id="WhatDoWeOffer">WHAT DO WE OFFER</div>
            <div className=" border-b-4 border-solid border-[#4C1B41] rounded-full"></div>
          </div>
          
          <div className="flex lg:flex-row gap-12 justify-center items-center max-sm:flex-col">
            <div className="w-3/4 text-[24px]">At <b>Monasbtak</b>, we bring together Jordan’s best event planners, venues, decorators, and photographers, all in one easy-to-use platform. Our goal is to make every step of planning your event smooth, inspiring, and tailored to your vision.
            <div className="max-sm:hidden max-md:hidden"> Whether you’re organizing a wedding, a corporate event, or a celebration, we offer a curated selection of professionals who can bring your vision to life with creativity and expertise.</div> </div>
            <figure className="max-sm:w-2/3 md:w-1/2">
              <img 
                  src="/WhatDoWeOffer1.png"
                  alt="Calender"
                  className="rounded-xl"
              ></img>
            </figure>
          </div>
          <div className="flex lg:flex-row  justify-center gap-12 items-center max-sm:flex-col-reverse ">
          <figure className="max-sm:w-2/3 md:w-1/2">
              <img 
                  src="/WhatDoWeOffer2.png"
                  alt="party"
                  className="rounded-xl"
              ></img>
            </figure>
            <div className="w-3/4 text-[24px]">
            You can easily browse portfolios, read reviews, and make informed decisions all in one place, ensuring you receive top-quality services for a memorable event.
            <div className="max-sm:hidden max-md:hidden"> To make things even easier, <b>Monasbtak</b> offers both customizable packages and tailored quotes to meet your unique requirements and budget, giving you the flexibility and convenience you need to find the best fit for your event. </div>
            </div>
          </div>

          {/* Our Team Section */ }

          <div >
            <div className="font-bold text-[#4C1B41] text-4xl mb-2" id="OurTeam">OUR TEAM</div>
            <div className=" border-b-4 border-solid border-[#4C1B41] rounded-full"></div>
          </div>

          {/* Team Members */ }
          <div className="flex justify-items-center justify-evenly">

          <button onClick={() => handleSlider(false)} className="lg:hidden">
          <svg className="h-8 w-8 text-[#4C1B41]"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"/>
          </svg>
          </button>

         {/* Large screens*/}
            <div className="lg:grid hidden lg:grid-cols-4 font-bold p-6 text-center ">
              {ourTeam.map((member, index) => (
                <div key={index} className="flex flex-col font-bold p-6 text-center gap-5">
                  <img src={member.Photo} alt={member.name} className="rounded-full w-40 h-40" />
                  <div className="text-[#4C1B41]">{member.name}</div>
                </div>
              ))}
            </div>

            {/* Medium screens */}
            <div className="hidden md:flex lg:hidden text-center flex-col gap-5">
              <div className="flex gap-10 ">
                {[0, 1].map((offset) => (
                  <div key={offset} className="flex flex-col items-center">
                    <img src={ourTeam[(slider + offset) % ourTeam.length].Photo} alt={ourTeam[(slider + offset) % ourTeam.length].name} className="rounded-full w-40 h-40" />
                    <div className="text-[#4C1B41] font-bold">{ourTeam[(slider + offset) % ourTeam.length].name}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Small screens */}
            <div className="lg:hidden md:hidden text-center flex flex-col items-center gap-5">
              <img src={ourTeam[slider].Photo} alt={ourTeam[slider].name} className="rounded-full w-40 h-40" />
              <div className="text-[#4C1B41] font-bold">{ourTeam[slider].name}</div>
            </div>
          
          <button onClick={() => handleSlider(true)} className="lg:hidden">
            <svg className="h-8 w-8 text-[#4C1B41]"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </button>

          </div>
        </div>
      </div>
      <Footer />
      </>
    );
  }
  