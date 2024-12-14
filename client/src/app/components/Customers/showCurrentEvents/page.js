'use client';
import React , {useState, useEffect} from 'react'
import './page.css'
import Link from 'next/link';
import { CiLocationOn } from "react-icons/ci";
import { useSearchParams } from 'next/navigation'; // Updated import
import { OrbitProgress } from 'react-loading-indicators';

function page() {
    const searchParams = useSearchParams();
    const id = searchParams.get("id"); 
    const [current, setCurrent] = useState([]);
    const [userId, setUserId] = useState(null); // Store userId
    const [loadingCurrent, setLoadingCurrent] = useState(true);
    
    useEffect(() => {
        const fetchCurrentEvents = async () => {
            try {
                setUserId(id); // Set userId in state
                const response = await fetch(`http://localhost/Monasbtak-Backend/php/api/customer/getProfileCurrentEvents.php?id=${id}`);
                
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

        fetchCurrentEvents();
    }, [id]);
      
    const fetchPackagesDetails = async (packageId) => {
        try {
          const response = await fetch(`http://localhost/Monasbtak-Backend/php/api/customer/getPackage.php?packageId=${packageId}`);
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
    <div className='ShowAll-Events-container'>
        <span className='large-font-size font-color bold-font'>All Current Events</span>
        <hr className='line'/>

        <div className='Event-Types'>
                <div className='Phone-view'>
                {loadingCurrent ? (
                        <div className='flex w-full justify-center justify-items-center'>
                            <OrbitProgress variant="track-disc" speedPlus="1" easing="linear" color="#4C1B41" />
                        </div>
                    ) : current.length > 0 ? (
                        current.map((current, index) => (
                    <div className='Event-Box' key={index}>
                        <div className='Event-img-container'>
                            <img src={current.image} className='Event-img' />
                            <span className='Price-tag'>$ {current.price}</span>
                        </div>
                        <div className='Event-details small-font-size'>
                            <span className='bold-font'>{current.name}</span>
                            <span>{current.description}</span>
                            <div className='time'>
                                <span className='bold-font'>Date & Time: </span>
                                <span>{current.eventDay}</span>
                                <span>{current.eventTime}</span>
                                <span className='bold-font'>Attendings: </span>
                                <span>{current.attendings}</span>
                            </div>
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
                    <div className='No-Event'>No Current Events</div>
                )}

                </div>                
        </div>
                    
    </div>  
  )
}

export default page