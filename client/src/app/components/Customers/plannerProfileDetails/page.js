import React from 'react';
import './page.css';
import RatingStars from '../../starRating/page';

import { MdEmail, MdOutlineDescription } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { GrUserManager } from "react-icons/gr";
import { TbGenderBigender } from "react-icons/tb";


function ProfileDetails () {
  return (
    <div className='Box-Border'>
        <div className='Profile-Container'>
            <img src="/Planner1.jpg" className='Profile-Image' />
            <div className='Planner-Name'>
                <div className='Rating-container'>
                    <span className='bold-font large-font-size'>UserName</span>
                    <RatingStars rating={3} />
                </div>
                    <div className='Info-Details mid-font-size'>
                        <span className='flex gap-2'><MdEmail />&nbsp;&nbsp;1234@gmail.com</span>
                        <span className='flex gap-2'><FaPhone />&nbsp;&nbsp;1234567890</span>
                        <span className='flex gap-2'><GrUserManager/>&nbsp;&nbsp;23</span>
                        <span className='flex gap-2'><TbGenderBigender />&nbsp;&nbsp;Female</span>
                        <span className='flex gap-2'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                            Nulla ultrices ornare augue non tristique. Nunc feugiat ac felis ac mollis. 
                            Curabitur ante lacus, facilisis et velit eu, lobortis vestibulum tortor.</span>
                    </div>
            </div>
        </div>
    </div>
  );
}

export default ProfileDetails;