'use client';
import React , {useState, useEffect}from 'react';
import './page.css';
import RatingStars from '../../starRating/page';
import { MdEmail, MdOutlineDescription } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { GrUserManager } from "react-icons/gr";
import { TbGenderBigender } from "react-icons/tb";
import { useSearchParams } from 'next/navigation';


function ProfileDetails () {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');  //planner_id
    const [planner, setPlanner] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchPlannerDetails = async () => {
        try {
          const response = await fetch(
            `http://monasbtak.org/php/api/customer/getPlanner.php?id=${id}`
          );
          const data = await response.json();
          if (data.status === 'success') {
            setPlanner(data.data);
          } else {
            console.error(data.message);
          }
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      }
      fetchPlannerDetails();
    }
    , [id]);
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
            <p>Loading...</p>
        )}
    </div>
  );
}

export default ProfileDetails;