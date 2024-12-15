'use client';
import React , {useState , useEffect} from 'react'
import './page.css'
import Link from 'next/link';
import { CiLocationOn } from "react-icons/ci";
import { useSearchParams } from 'next/navigation'; 
import { OrbitProgress } from 'react-loading-indicators';

function page() {
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const [prev, setPrev] = useState([]);
    const [userId, setUserId] = useState(null); // Store userId
    const [loadingPrev, setLoadingPrev] = useState(true);

    useEffect(() => {
        const fetchPrevEvents = async () => {
            try {
                setUserId(id); // Set userId in state
                const response = await fetch(`http://monasbtak.org/php/api/customer/getProfilePrevEvents.php?id=${id}`);
                
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
        fetchPrevEvents();
    }, [id]);
      
    const fetchPackagesDetails = async (packageId) => {
        try {
          const response = await fetch(`http://monasbtak.org/php/api/customer/getPackage.php?packageId=${packageId}`);
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
        <span className='large-font-size font-color bold-font'>All Previous Events</span>
        <hr className='line'/>

        <div className='All-Event-Types'>
            {loadingPrev ? (
                        <div className='flex w-full justify-center justify-items-center'>
                            <OrbitProgress variant="track-disc" speedPlus="1" easing="linear" color="#4C1B41" />
                        </div>
                    ) : prev.length > 0 ? (
                        prev.map((prev, index) => (
                    <div className='All-Event-Box' key={index}>
                            <div className='All-Event-img-container'>
                                <img src={prev.image} className='All-Event-img' />
                                <span className='Price-tag'>JD {prev.price}</span>
                            </div>
                            <div className='All-Event-details small-font-size'>
                                <span className='bold-font'>{prev.name}</span>
                                <span>{prev.description} </span>
                                <div className='time'>
                                <span className='bold-font'>Date & Time: </span>
                                <span>{prev.eventDay}</span>
                                <span>{prev.eventTime}</span>
                                <span className='bold-font'>Attendings: </span>
                                <span>{prev.attendings}</span>
                            </div>
                                <div className='All-Event-location'>
                                    <div className='row-felx'>
                                        <CiLocationOn />
                                        <span>{prev.location}</span>
                                    </div>
                                    <span>{prev.status}</span>
                                </div>
                            </div>
                        </div>
                    ))): (
                        <div className='No-Event'>No Events Found</div>
                    )}  
        </div>
                    
    </div>  
  )
}

export default page