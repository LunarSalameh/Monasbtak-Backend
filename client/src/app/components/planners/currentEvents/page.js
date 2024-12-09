"use client";
import React, {useState, useEffect} from "react";
import { FaLocationDot } from "react-icons/fa6";
import './page.css';
import { useSearchParams } from 'next/navigation';

export default function CurrentEvents () {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const [userId, setUserId] = useState(id);
    const [offers, setOffers] = useState([]);
    const [loadingCurrent, setLoadingCurrent] = useState(true);
    const [slider,setSlider] = useState(0);

    useEffect(() => {
        const fetchCurrentEvents = async () => {
            try {
                setUserId(id); // Set userId in state
                const response = await fetch(`http://localhost/Monasbtak-Backend/php/api/planner/events/getCurrent.php?planner_Id=${id}`);
                
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
    
                const text = await response.text();
                const result = text ? JSON.parse(text) : {};
    
                if (result.status === 'success') {
                    const eventsWithDetails = await Promise.all(result.data.map(async (event) => {
                        const packageDetails = await fetchPackagesDetails(event.package_id);
                        const customerDetails = await fetchCustomerName(event.user_Id);
                        console.log(customerDetails);
                        return { ...event, ...packageDetails, customer_name: customerDetails.username, userImage: customerDetails.userImage, phoneNumber: customerDetails.phoneNumber };
                    }));
                    setOffers(eventsWithDetails);
                } else {
                    setOffers([]); // Set events to an empty array if no events found
                }
                setLoadingCurrent(false);
            } catch (error) {
                console.error("Error fetching events:", error);
                setLoadingCurrent(false);
            }
        };
    
        fetchCurrentEvents();
    }, [id]);
    
    const fetchCustomerName = async (userId) => {
        try {
            const response = await fetch(`http://localhost/Monasbtak-Backend/php/api/customer/profile.php?id=${userId}`);
            const result = await response.json();
            if (result.success && result.user) {
                return {
                    username: result.user.username,
                    userImage: result.user.image,
                    phoneNumber: result.user.phonenumber, // Include phone number
                };
            }
            return { username: 'Unknown', image: '', phoneNumber: '' };
        } catch (error) {
            console.error("Error fetching customer name:", error);
            return { username: 'Unknown', image: '', phoneNumber: '' };
        }
    };
    
    const fetchPackagesDetails = async (packageId) => {
        try {
          const response = await fetch(`http://localhost/Monasbtak-Backend/php/api/customer/getPackage.php?id=${packageId}`);
          const result = await response.json();
          if (result.status === 'success' && result.data.length > 0) {
            const packageDetails = result.data[0];
            return {
              ...packageDetails,
              image: `data:image/jpeg;base64,${packageDetails.image}`,
            };
          }
          return {};
        } catch (error) {
          console.error("Error fetching package details:", error);
          return {};
        }
      }

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
            <div className="PAC-container ">

                <div className='PC-container'>
                    
                    <div className='rounded-lg width'>
                        
                        {/* Heading */}
                        <div className="flex flex-col">
                            <h1 className="font-bold text-3xl mb-3">Current Events</h1>
                            <hr/>
                        </div>

                        {/* BODY Cards  */}
                        <div className="mx-auto flex gap-8 my-8 justify-center">
                            {loadingCurrent ? (
                                <div className='text-center'>Loading...</div>
                            ) : (
                                <>
                                    {offers.length > 0 && (
                                        <>
                                            {/* Next Button */}
                                            <button onClick={() => handleSlider(false)} >
                                                <svg className="h-8 w-8 text-[#4C1B41]"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"/>
                                                </svg>
                                            </button>
                                        </>
                                    )}
                                    {/* Cards */}
                                    <div className="flex justify-center w-full">
                                        {offers.length > 0 ? (
                                            <div className="grid grid-cols-3 max-lg:grid-cols-1 items-center justify-items-center gap-6">
                                                {offers.slice(0, 3).map((offer, index) => (
                                                    <div key={index} className="border-gray-200 border-2 rounded-xl p-2 hover:bg-gray-100 hover:border-[#d9b34d]">
                                                        <div className='container-current'>
                                                            {/* Image & price */}
                                                            <figure className='relative'>
                                                                <img 
                                                                    src={offer.image} 
                                                                    alt={offer.Name}
                                                                    className='rounded-lg w-64 h-40 max-md:h-40 max-md:w-40 object-cover'
                                                                />
                                                                <div className='bg-[#5a5a5a8e] bottom-2 left-2 w-fit px-3 rounded-lg text-white py-1 absolute '>{offer.price}</div>
                                                            </figure>
                                                            <div className='event-details-container'>
                                                            {/* Event Name */}
                                                            <div className='font-semibold p-2 text-lg mt-1  max-lg:text-sm'>
                                                                {offer.Name}
                                                            </div>

                                                            {/* Description  */}
                                                            <div className='px-2 max-lg:hidden'>
                                                                {offer.description}
                                                            </div>

                                                            {/* Location  */}
                                                            <div className='flex items-center gap-2 px-1 pt-2 text-sm max-md:hidden'>
                                                                <FaLocationDot />
                                                                <p>{offer.location}</p>
                                                            </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className='text-center'>No Current Events</div>
                                        )}
                                    </div>
                                    {offers.length > 0 && (
                                        <>
                                            {/* Prev Button */}
                                            <button onClick={() => handleSlider(true)} >
                                                <svg className="h-8 w-8 text-[#4C1B41]"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                                </svg>
                                            </button>
                                        </>
                                    )}
                                </>
                            )}
                        </div>

                    </div>

                </div>

            </div>
        </>

    );
}