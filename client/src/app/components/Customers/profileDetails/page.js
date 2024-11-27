'use client';
import { React, useState } from 'react';
import './page.css';
import { MdEmail } from "react-icons/md";
import { FaPhone, FaLocationDot } from "react-icons/fa6";
import { GrUserManager } from "react-icons/gr";
import { TbGenderBigender } from "react-icons/tb";
import { Icon } from '@iconify/react';

import { IoClose } from "react-icons/io5";

function ProfileDetails({ user }) {
  const [Edit, setEdit] = useState(false);
  const EditProfile = () => {
    setEdit(true);
  }
  const CloseEdit = () => {
    setEdit(false);
  }

  return (
    <div className='Box-Border'>
      <div className='Profile-Container'>
      {user.image ? (
      <img src={user.image} className='Profile-Image' alt='Profile' />
      ) : (
      <Icon icon="hugeicons:user-circle" className='Profile-Image' alt='Profile' />
      )}        
      <div className='Customer-Name'>
          <span className='bold-font large-font-size'>{user.username}</span>
          {Edit ? (
            <div className='Info-Details mid-font-size'>
              <input type='email' className='input flex gap-2' placeholder='Email' defaultValue={user.email} />
              <input type='tel' className='input flex gap-2' placeholder='Phone Number' defaultValue={user.phonenumber} />
              <input type='number' className='input flex gap-2' placeholder='Age' defaultValue={user.age}/>
              <input type='text' className='input flex gap-2' placeholder='Location' defaultValue={user.location} />
            </div>
          ) : (
            <div className='Info-Details mid-font-size'>
              <span className='flex gap-2'><MdEmail />&nbsp;&nbsp;{user.email}</span>
              <span className='flex gap-2'><FaPhone />&nbsp;&nbsp;{user.phonenumber}</span>
              <span className='flex gap-2'><GrUserManager />&nbsp;&nbsp;{user.age}</span>
              <span className='flex gap-2'><FaLocationDot />&nbsp;&nbsp;{user.location}</span>
              <span className='flex gap-2'><TbGenderBigender />&nbsp;&nbsp;{user.gender}</span>
            </div>
          )}
        </div>
        <button className='Button' onClick={Edit ? CloseEdit : EditProfile}>{Edit ? 'Close' : 'Edit'}</button>
      </div>
    </div>
  );
}

export default ProfileDetails;