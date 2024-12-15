"use client";
import React, {useState, useEffect} from "react";
import { FaPhoneAlt } from "react-icons/fa";
import './page.css';
import { useSearchParams } from 'next/navigation';
import { IoClose } from "react-icons/io5";
import { OrbitProgress } from 'react-loading-indicators';

export default function PendingOffers () { 
    const searchParams = useSearchParams();
    const id = searchParams.get('id');

    const [userId, setUserId] = useState(id);
    const [offers, setOffers] = useState([]);

    const [loadingCurrent, setLoadingCurrent] = useState(true);
    const [slider,setSlider] = useState(0);
    const [selectedOffer, setSelectedOffer] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        const fetchCurrentEvents = async () => {
            try {
                setUserId(id); // Set userId in state
                const response = await fetch(`http://monasbtak.org/php/api/planner/events/getPending.php?planner_Id=${id}`);
                
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
                        return { ...event, ...packageDetails, customer_name: customerDetails.username, userImage: customerDetails.userImage, phoneNumber: customerDetails.phoneNumber, eventId: event.id };
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
            const response = await fetch(`http://monasbtak.org/php/api/customer/profile.php?id=${userId}`);
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
          const response = await fetch(`http://monasbtak.org/php/api/customer/getPackage.php?id=${id}&packageId=${packageId}`);
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

    const openModal = (offer) => {
        setSelectedOffer(offer);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setSelectedOffer(null);
        setModalIsOpen(false);
    };

    const handleStatusUpdate = async (status) => {
        if (selectedOffer) {
            try {
                const response = await fetch('http://monasbtak.org/php/api/planner/events/updateStatus.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        planner_Id: id,
                        id: selectedOffer.eventId, // Use eventId from fetchCurrentEvents
                    }),
                });

                const result = await response.json();
                if (result.status === 'success') {
                    setOffers((prevOffers) => prevOffers.filter((offer) => offer.id !== selectedOffer.id));
                    closeModal();
                    window.location.reload(); // Reload the page
                } else {
                    console.error(result.message);
                }
            } catch (error) {
                console.error("Error updating status:", error);
            }
        }
    };

    return ( 
        <>
        <div className='PA-container'>
            <div className='PO-container'>
                <div className="rounded-lg">
                    {/* Heading */}
                    <div className="flex flex-col">
                        <h1 className="font-bold text-3xl mb-3">Pending Offers</h1>
                        <hr/>
                    </div>

                    {/* Card List */}
                    <div className="mx-auto flex gap-8 my-8 justify-center media-none">
                        {loadingCurrent ? (
                            <div className='flex w-full justify-center justify-items-center'>
                                <OrbitProgress variant="track-disc" speedPlus="1" easing="linear" color="#D9B349" />
                            </div>
                        ) : (
                            <>
                                {offers.length > 0 && (
                                    <>
                                        {/* Prev Button */}
                                        <button onClick={() => handleSlider(true)}>
                                            <svg className="h-8 w-8 text-[#4C1B41]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"/>
                                            </svg>
                                        </button>
                                    </>
                                )}
                                {/* CARD MAP */}
                                <div className="grid grid-rows-2 max-lg:grid-cols-1 items-center justify-items-center gap-6">
                                    {offers.length > 0 ? (
                                        offers.length === 1 ? (
                                            <div className="border-gray-200 border-2 rounded-xl hover:bg-gray-100 h hover:border-[#d9b34d]">
                                                <div className="p-2 w-full flex flex-row max-md:flex-col max-md:items-center gap-3">
                                                    <img src={`data:image/jpeg;base64,${offers[0].userImage}`} alt='image' className="object-cover rounded-full w-20 h-20 items-start" />
                                                    <div className="flex flex-col gap-2 max-md:text-xs">
                                                        <div className="px-2 pt-3">
                                                            <p className="font-semibold">{offers[0].customer_name}</p>
                                                            <div className="flex items-center gap-2"><FaPhoneAlt /> {offers[0].phoneNumber}</div>
                                                        </div>
                                                        <div className="px-8 mb-2 flex max-lg:flex-col max-lg:gap-3">
                                                            <p className="pr-3 max-md:hidden max-sm:hidden">{offers[0].description}</p>
                                                            <button className="h-[45px] bg-[#d9b34d] rounded-lg px-5 py-2 text-white shadow-md shadow-[#d9b34d] " onClick={() => openModal(offers[0])}>Details</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            [0, 1].map((offset) => (
                                                <div key={offset} className="border-gray-200 border-2 rounded-xl hover:bg-gray-100 h hover:border-[#d9b34d]">
                                                    <div className="p-2 w-full flex flex-row max-md:flex-col max-md:items-center gap-3">
                                                        <img src={`data:image/jpeg;base64,${offers[(slider + offset) % offers.length].userImage}`} alt='image' className="object-cover rounded-full w-20 h-20 items-start" />
                                                        <div className="flex flex-col gap-2 max-md:text-xs">
                                                            <div className="px-2 pt-3">
                                                                <p className="font-semibold">{offers[(slider + offset) % offers.length].customer_name}</p>
                                                                <div className="flex items-center gap-2"><FaPhoneAlt /> {offers[(slider + offset) % offers.length].phoneNumber}</div>
                                                            </div>
                                                            <div className="px-8 mb-2 flex max-lg:flex-col max-lg:gap-3">
                                                                <p className="pr-3 max-md:hidden max-sm:hidden">{offers[(slider + offset) % offers.length].description}</p>
                                                                <button className=" h-[45px] bg-[#d9b34d] rounded-lg px-5 py-2 text-white shadow-md shadow-[#d9b34d]" onClick={() => openModal(offers[(slider + offset) % offers.length])}>Details</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        )
                                    ) : <div className='text-center'>No Current Events</div>}
                                </div>
                                {offers.length > 0 && (
                                    <>
                                        {/* Next Button */}
                                        <button onClick={() => handleSlider(false)}>
                                            <svg className="h-8 w-8 text-[#4C1B41]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                            </svg>
                                        </button>
                                    </>
                                )}
                                
                            </>
                        )}
                    </div>

                    {/* responsive List */}
                    <div className="mx-auto flex gap-8 my-8 justify-center media-display">
                        {loadingCurrent ? (
                            <div className='text-center'>Loading...</div>
                        ) : (
                            <>
                            <div className="btn-media-top">
                                {offers.length > 0 && (
                                        <>
                                            {/* Prev Button */}
                                            <button onClick={() => handleSlider(true)}>
                                                <svg className="h-8 w-8 text-[#4C1B41]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"/>
                                                </svg>
                                            </button>
                                        </>
                                    )}
                                {offers.length > 0 && (
                                        <>
                                            {/* Next Button */}
                                            <button onClick={() => handleSlider(false)}>
                                                <svg className="h-8 w-8 text-[#4C1B41]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                                </svg>
                                            </button>
                                        </>
                                    )}
                                </div>
                                {/* CARD MAP */}
                                <div className="grid grid-rows-2 max-lg:grid-cols-1 items-center justify-items-center gap-6">
                                    {offers.length > 0 ? (
                                        offers.length === 1 ? (
                                            <div className="border-gray-200 border-2 rounded-xl hover:bg-gray-100 h hover:border-[#d9b34d]">
                                                <div className="p-2 w-full flex flex-row max-md:flex-col max-md:items-center gap-3">
                                                    <img src={`data:image/jpeg;base64,${offers[0].userImage}`} alt='image' className="object-cover rounded-full w-20 h-20 items-start" />
                                                    <div className="flex flex-col gap-2 max-md:text-xs">
                                                        <div className="px-2 pt-3">
                                                            <p className="font-semibold">{offers[0].customer_name}</p>
                                                            <div className="flex items-center gap-2"><FaPhoneAlt /> {offers[0].phoneNumber}</div>
                                                        </div>
                                                        <div className="px-8 mb-2 flex max-lg:flex-col max-lg:gap-3">
                                                            <p className="pr-3 max-md:hidden max-sm:hidden">{offers[0].description}</p>
                                                            <button className="h-[45px] bg-[#d9b34d] rounded-lg px-5 py-2 text-white shadow-md shadow-[#d9b34d] " onClick={() => openModal(offers[0])}>Details</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            [0, 1].map((offset) => (
                                                <div key={offset} className="border-gray-200 border-2 rounded-xl hover:bg-gray-100 h hover:border-[#d9b34d]">
                                                    <div className="p-2 w-full flex flex-row max-md:flex-col max-md:items-center gap-3">
                                                        <img src={`data:image/jpeg;base64,${offers[(slider + offset) % offers.length].userImage}`} alt='image' className="object-cover rounded-full w-20 h-20 items-start" />
                                                        <div className="flex flex-col gap-2 max-md:text-xs">
                                                            <div className="px-2 pt-3">
                                                                <p className="font-semibold">{offers[(slider + offset) % offers.length].customer_name}</p>
                                                                <div className="flex items-center gap-2"><FaPhoneAlt /> {offers[(slider + offset) % offers.length].phoneNumber}</div>
                                                            </div>
                                                            <div className="px-8 mb-2 flex max-lg:flex-col max-lg:gap-3">
                                                                <p className="pr-3 max-md:hidden max-sm:hidden">{offers[(slider + offset) % offers.length].description}</p>
                                                                <button className=" h-[45px] bg-[#d9b34d] rounded-lg px-5 py-2 text-white shadow-md shadow-[#d9b34d]" onClick={() => openModal(offers[(slider + offset) % offers.length])}>Details</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        )
                                    ) : <div className='text-center'>No Current Events</div>}
                                </div>
                                
                            </>
                        )}
                    </div>


                </div>
            </div>
            {modalIsOpen && selectedOffer && (
                <div className="modal-overlay">
                    <div className="modal">
                        <div className="modal-content">
                            <button className="close-button" onClick={closeModal}><IoClose /></button>
                            <div className="details-container">
                                <div className="customer">
                                    <img src={`data:image/jpeg;base64,${selectedOffer.userImage}`} alt='User Image' className="object-cover rounded-full w-20 h-20 mb-3" />
                            <div className="phone">
                                    <span className="font-semibold text-xl">{selectedOffer.customer_name}</span>
                                <div className="flex items-center gap-2"><FaPhoneAlt /> {selectedOffer.phoneNumber}</div>
                            </div>
                                </div>
                                <div className="package">
                                <div className="packageImg">
                                    <img src={selectedOffer.image} alt='Package Image' className="imgPack" />
                                    <span className="mid-font-size">{selectedOffer.name}</span>
                                </div>
                                <div className="flexPackage">
                                <span>{selectedOffer.description}</span>
                                <div className="row-flex-package">
                                    <span className="bold">Date & Time: </span>
                                    <span>{selectedOffer.eventDay} - {selectedOffer.eventTime}</span>
                                </div>
                                <div className="row-flex-package">
                                    <span className="bold">Attendings: </span>
                                    <span>{selectedOffer.attendings}</span>
                                </div>
                                </div>
                                </div>
                            </div>
                            <div className="flex flex-wrap font-bold justify-center text-center mt-4 large-font-size"> 
                                 <span className="text-[#D9B34D] ">Are you sure you want to accept?</span> 
                            </div>
                            <div className='flex gap-5 justify-between w-[20%] items-center mt-4 widthR'>
                                <button className='btn' onClick={() => handleStatusUpdate('accepted')}>Yes</button>
                                <button className='btn' onClick={closeModal}>No</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    </>
    );
}