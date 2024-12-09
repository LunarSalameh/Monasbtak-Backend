"use client";
import React, { useState, useEffect } from 'react';
import './page.css';
import { CiLocationOn } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import Link from 'next/link';
import { BrowserRouter as Router, useSearchParams } from 'react-router-dom';

function ProfileEvents() {
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id'); 
    const [userId, setUserId] = useState(null); // Store userId
    const [showModal, setShowModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [current, setCurrent] = useState([]);
    const [prev, setPrev] = useState([]);
    const [loadingCurrent, setLoadingCurrent] = useState(true);
    const [loadingPrev, setLoadingPrev] = useState(true);

    const handleShowModal = async (event) => {
        setSelectedEvent(event);
        await fetchPackageDetails(event);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };


    useEffect(() => {
        const fetchCurrentEvents = async () => {
            try {
                setUserId(id); // Set userId in state
                const response = await fetch(`http://localhost/Monasbtak-Backend/php/api/customer/getProfileCurrentEvents.php?user_id=${id}`);
                
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const text = await response.text();
                const result = text ? JSON.parse(text) : {};

                if (result.status === 'success') {
                    const eventsWithDetails = await Promise.all(result.data.map(async (event) => {
                        const packageDetails = await fetchPackagesDetails(event.package_id);
                        return { ...event, ...packageDetails };
                    }));
                    setCurrent(eventsWithDetails);
                    console.log('events:', eventsWithDetails);
                } else {
                    setCurrent([]); // Set events to an empty array if no events found
                }
                setLoadingCurrent(false);
            } catch (error) {
                console.error("Error fetching events:", error);
                setLoadingCurrent(false);
            }
        };

        const fetchPrevEvents = async () => {
            try {
                setUserId(id); // Set userId in state
                const response = await fetch(`http://localhost/Monasbtak-Backend/php/api/customer/getProfilePrevEvents.php?user_id=${id}`);
                
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const text = await response.text();
                const result = text ? JSON.parse(text) : {};

                if (result.status === 'success') {
                    const eventsWithDetails = await Promise.all(result.data.map(async (event) => {
                        const packageDetails = await fetchPackagesDetails(event.package_id);
                        return { ...event, ...packageDetails };
                    }));
                    setPrev(eventsWithDetails);
                    console.log('events:', eventsWithDetails);
                } else {
                    setPrev([]); // Set events to an empty array if no events found
                }
                setLoadingPrev(false);
            } catch (error) {
                console.error("Error fetching events:", error);
                setLoadingPrev(false);
            }
        };

        fetchCurrentEvents();
        fetchPrevEvents();
    }, [id]);
      
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



    return (
        <div className='Events-container'>
            <span className='large-font-size font-color bold-font'>Events</span>
            <hr className='line'/>

            <div className='Events-Types'>
                <div className='current-events'>
                    <div className='showall'> 
                        <span className='large-font-size font-color bold-font'>Current Events</span>
                        <Link href={`/customers/showCurrentEvents?id=${id}`}>
                            <span className='small-font-size bold-font Show-Button'>Show All</span>
                        </Link>
                    </div>
                    <div className='Phone-view'>
                    {loadingCurrent ? (
                        <div className='No-Event'>Loading...</div>
                    ) : current.length > 0 ? (
                        current.map((current, index) => (
                        <div className='Event-Box' key={index}>
                            <div className='Event-img-container'>
                                <img src={current.image} className='Event-img' />
                                <span className='Price-tag'>$ {current.price}</span>
                            </div>
                            <div className='Event-details small-font-size'>
                                <span>{current.name}</span>
                                <p>{current.description} </p>
                                <div className='Event-location'>
                                    <div className='row-felx'>
                                        <CiLocationOn />
                                        <span>{current.location}</span>
                                    </div>
                                    <span>{current.status}</span>
                                </div>
                            </div>
                        </div>
                        ))
                    ) : (
                        <div className='No-Event'>
                            <span className='bold-font'>No Current Events</span>
                        </div>
                    )}
                    </div>
                </div>

                <div className='previous-events'>
                    <div className='showall'> 
                        <span className='large-font-size font-color bold-font'>Previous Events</span> 
                        <Link href={`/customers/showPrevEvents?id=${id}`}>
                            <span className='small-font-size bold-font Show-Button'>Show All</span>
                        </Link>
                    </div>
                    <div className='Phone-view'>
                    {loadingPrev ? (
                        <div className='No-Event'>Loading...</div>
                    ) : prev.length > 0 ? (
                        prev.map((prev, index) => (
                        <div className='Event-Box' key={index}>
                            <div className='Event-img-container'>
                                <img src={prev.image} className='Event-img' />
                                <span className='Price-tag'>$ {prev.price}</span>
                            </div>
                            <div className='Event-details small-font-size'>
                                <span>{prev.name}</span>
                                <p>{prev.description} </p>
                                <div className='Event-location'>
                                    <div className='row-felx'>
                                        <CiLocationOn />
                                        <span>{prev.location}</span>
                                    </div>
                                    <span>{prev.status}</span>
                                </div>
                            </div>
                        </div>
                        ))
                    ) : (
                        <div className='No-Event'>
                            <span className='bold-font'>No Previous Events</span>
                        </div>
                    )}
                    </div>
                </div>
            </div>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <button className="close-button" onClick={handleCloseModal}><IoClose /></button>
                        <div className="modal-content">
                            <span className='large-font-size font-color bold-font'>Event Name</span>
                            <hr className='line'/>
                            <div className='Modal-Event-Box' >
                                <img src="/wedding.jpg" className='Modal-Event-img' />
                                <div className='Modal-Event-details mid-font-size'>
                                    <div className='row-flex'>
                                        <div className='Modal-planner-profile'>
                                            <img src="/Planner2.jpg" className='Modal-Profile-Image' />
                                            <span className='bold-font mid-font-size'>Planner UserName</span>
                                        </div>
                                        <span className='Modal-Price-tag'>$99.9</span>
                                    </div>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ultrices ornare augue non tristique.</p>
                                    <span>Event Day</span>
                                    <span>Event Day</span>
                                    <span>Number of attendings </span>
                                    <div className='Event-location'>
                                        <div className='row-felx'>
                                            <CiLocationOn />
                                            <span>Location</span>
                                        </div>
                                        <span>Status</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default function WrappedProfileEvents() {
    return (
        <Router>
            <ProfileEvents />
        </Router>
    );
}

