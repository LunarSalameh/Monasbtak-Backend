'use client';
import React, { useState, useEffect } from 'react';
import './page.css';
import { MdEmail } from "react-icons/md";
import { FaPhone, FaLocationDot } from "react-icons/fa6";
import { GrUserManager } from "react-icons/gr";
import { TbGenderBigender } from "react-icons/tb";
import { Icon } from '@iconify/react';
import { useSearchParams } from 'next/navigation';

function ProfileDetails({ user, fetchUserData }) {
  const searchParams = useSearchParams();
  const id = searchParams.get('id'); 

  const [acceptAlert, setAcceptAlert] = useState(false);
  const [edit, setEdit] = useState(false);
  const [updatedUser, setUpdatedUser] = useState(user);
  const [reject, setReject] = useState(false);
  const [formData, setFormData] = useState({
    id: id || '',
    username: user.username || '',
    email: user.email || '',
    phonenumber: user.phonenumber || '',
    age: user.age || '',
    location: user.location || '',
    gender: user.gender || '',
    image: null,
  });

  useEffect(() => {
    if (id) {
      setFormData((prevData) => ({ ...prevData, id }));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const saveProfile = async () => {
    const formDataObj = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataObj.append(key, formData[key]);
    });

    console.log([...formDataObj]); // Debugging formData

    try {
      const response = await fetch(
        'http://localhost/Monasbtak-Backend/php/api/customer/updateUser.php',
        {
          method: 'POST',
          body: formDataObj,
        }
      );
      const data = await response.json();
      console.log(data); // Debugging response
      if (data.success) {
        setEdit(false);
        setAcceptAlert(true);
        setTimeout(() => { setAcceptAlert(false); }, 3000);
        setUpdatedUser({ ...updatedUser, ...formData, image: data.user.image }); // Update user state with new image
        fetchUserData(); // Fetch updated user data
      }
    } catch (error) {
      setReject(true);
    }
  };

  return (
    <div className='Box-Border'>
      <div className='Profile-Container'>
      {user.image ? (
      <img src={user.image} className='Profile-Image' alt='Profile' />
      ) : (
      <Icon icon="hugeicons:user-circle" className='Profile-Image' alt='Profile' />
      )}
        <div className='Customer-Name'>
          <span className='bold-font large-font-size'>{updatedUser.username}</span>
          {edit ? (
            <div className='Info-Details mid-font-size'>
              <input
                type='text'
                name='username'
                className='input flex gap-2'
                placeholder='Username'
                value={formData.username || ''}
                onChange={handleChange}
              />
              <input
                type='email'
                name='email'
                className='input flex gap-2'
                placeholder='Email'
                value={formData.email || ''}
                onChange={handleChange}
              />
              <input
                type='tel'
                name='phonenumber'
                className='input flex gap-2'
                placeholder='Phone Number'
                value={formData.phonenumber || ''}
                onChange={handleChange}
              />
              <input
                type='number'
                name='age'
                className='input flex gap-2'
                placeholder='Age'
                value={formData.age || ''}
                onChange={handleChange}
              />
              <input
                type='text'
                name='location'
                className='input flex gap-2'
                placeholder='Location'
                value={formData.location || ''}
                onChange={handleChange}
              />
              <input
                type='text'
                name='gender'
                className='input flex gap-2'
                placeholder='Gender'
                value={formData.gender || ''}
                onChange={handleChange}
              />
              <input
                type='file'
                name='image'
                className='input flex gap-2'
                onChange={handleFileChange}
              />
            </div>
          ) : (
            <div className='Info-Details mid-font-size'>
              <span className='flex gap-2'><MdEmail />&nbsp;&nbsp;{updatedUser.email}</span>
              <span className='flex gap-2'><FaPhone />&nbsp;&nbsp;{updatedUser.phonenumber}</span>
              <span className='flex gap-2'><GrUserManager />&nbsp;&nbsp;{updatedUser.age}</span>
              <span className='flex gap-2'><FaLocationDot />&nbsp;&nbsp;{updatedUser.location}</span>
              <span className='flex gap-2'><TbGenderBigender />&nbsp;&nbsp;{updatedUser.gender}</span>
            </div>
          )}
        </div>
        <button className='Button' onClick={edit ? saveProfile : () => setEdit(true)}>
          {edit ? 'Save' : 'Edit'}
        </button>
      </div>
      {acceptAlert &&(
                    <div className="fixed top-4 right-4 modal-overlay-status">
                        <div className="rounded-xl w-fit grid grid-cols-[0.25fr,1fr]">
                            <div className="bg-green-600 p-0 rounded-l-xl"></div>
                            <div className="p-5 bg-white border-2 border-green-600">Profile Edited Successfully</div>
                        </div>
                    </div>
                )}

      {reject &&(
                    <div className="fixed top-4 right-4 modal-overlay-status">
                        <div className="rounded-xl w-fit grid grid-cols-[0.25fr,1fr]">
                            <div className="bg-red-600 p-0 rounded-l-xl"></div>
                            <div className="p-5 bg-white border-2 border-red-600">Failed to Edit Profile</div>
                        </div>
                    </div>
                )}
    </div>
  );
}

export default ProfileDetails;