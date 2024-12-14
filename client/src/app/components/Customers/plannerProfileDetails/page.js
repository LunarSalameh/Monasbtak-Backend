'use client';
import React , {useState, useEffect}from 'react';
import './page.css';
import RatingStars from '../../starRating/page';
import { MdEmail, MdOutlineDescription } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { GrUserManager } from "react-icons/gr";
import { TbGenderBigender } from "react-icons/tb";
import { useSearchParams } from 'next/navigation';
import { OrbitProgress } from 'react-loading-indicators';

function ProfileDetails () {
    const searchParams = useSearchParams();
    const plannerId = searchParams.get('plannerId');  //planner_id

    const [planner, setPlanner] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchPlannerDetails = async () => {
        try {
          const response = await fetch(
            `http://localhost/Monasbtak-Backend/php/api/customer/getPlanner.php?plannerId=${plannerId}`
          );
          const data = await response.json();
          if (data.status === 'success') {
            setPlanner(data.data);
          } else {
            console.error(data.message);
          }
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      }
      fetchPlannerDetails();
    }
    , [plannerId]);

  return (
    <div className='Box-Border'>
        {planner && planner.length > 0 ? (
            planner.map((planner, index) => (
        <div className='Profile-Container' key={index}>
            <img src={`data:image/jpeg;base64,${planner.image}`} className='Profile-Image' />
            <div className='Planner-Name'>
                <div className='Rating-container'>
                    <span className='bold-font large-font-size'>{planner.username}</span>
                    {/* <RatingStars rating={3} /> */}
                </div>
                    <div className='Info-Details mid-font-size'>
                        <span className='flex gap-2'><MdEmail />&nbsp;&nbsp;{planner.email}</span>
                        <span className='flex gap-2'><FaPhone />&nbsp;&nbsp;{planner.phonenumber}</span>
                        <span className='flex gap-2'><GrUserManager/>&nbsp;&nbsp;{planner.age}</span>
                        <span className='flex gap-2'><TbGenderBigender />&nbsp;&nbsp;{planner.gender}</span>
                        <span className='flex gap-2'>{planner.description}</span>
                    </div>
            </div>
        </div>
        ))): (
          <div className='flex w-full justify-center justify-items-center'>
              <OrbitProgress variant="track-disc" speedPlus="1" easing="linear" color="#4C1B41" />
          </div>
        )}
    </div>
  );
}

export default ProfileDetails;