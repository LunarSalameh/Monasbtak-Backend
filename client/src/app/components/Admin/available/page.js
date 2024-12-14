'use client';
import React from 'react'
import { useEffect,useState } from 'react';
import './page.css'
import { IoIosSearch } from "react-icons/io";
import Link from 'next/link';
import { OrbitProgress } from 'react-loading-indicators';

import { useSearchParams } from 'next/navigation';

function page() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');  //admin_id
  const [planners , setPlanners] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); 


    useEffect(() => {
        const fetchPackages = async () => {
          try {
            const response = await fetch("http://localhost/Monasbtak-Backend/php/api/admin/packages/getPlannersAccepted.php", {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            });
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const result = await response.json();
            if (!result.data || result.data.length === 0) {
              setPlanners(null); 
            }
            else if (result.status === 'error') {
              console.error(result.message);
              setPlanners(null); 
            } else {
                setPlanners(result.data);
            }
          } catch (error) {
            console.error('Error fetching packages:', error);
            setPlanners(null);
          } finally {
            setLoading(false); 
          }
        };
      
        fetchPackages();
      }, []);
  return (
    <div className='page-container'>
        <div className='requests-container'>
        <div className='main-top'>
            <div className='header'>
            <span className='large-font-size bold-font'>Available Packages</span>
            </div>
            <div className="search-container">
                <IoIosSearch className="search-icon" />
                <input 
                  type="search" 
                  className="search-bar mid-font-size" 
                  placeholder="Search" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
        </div>
        <hr className='line'/>
        <div className='available-content'>
        {loading ? (
            <div className='flex w-full justify-center justify-items-center'>
                <OrbitProgress variant="track-disc" speedPlus="1" easing="linear" color="#D9B349" />
            </div> 
        ) : (
            !planners || planners.length === 0 ? (
                <div>No Planners Founded</div>
            ) : (
                planners
                  .filter(planner => planner.username.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map((planner, index) => (
                    <Link href={`/admin/PlannerPackages?id=${id}&planner_id=${planner.id}`} key={index}>
                        <div className='available-box'>
                            <img src={`data:image/jpeg;base64,${planner.image}`} alt='Planner1' className='available-img'/>
                            <span className='mid-font-size'>{planner.username}</span>
                        </div>
                    </Link>
                ))
            )
        )}
        </div>
        </div>
    </div>
  )
}

export default page