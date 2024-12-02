'use client';
import React, { useState, useEffect } from 'react';
import Navbar from '../../components/navbar/page';
import Footer from '../../components/footer/page';
import ProfileDetails from '../../components/Customers/profileDetails/page';
import Events from '../../components/Customers/profileEvents/page';
import Favorite from '../../components/Customers/profileFavorite/page';
import { useSearchParams } from 'next/navigation';
import { OrbitProgress } from 'react-loading-indicators';

import './page.css';




function Profile() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id'); // Get user ID from the query parameters
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // console.log('User ID from URL:', id);
    if (!id) {
      setError('User ID is missing in the URL.');
      return;
    }

    fetch(`http://localhost/Monasbtak-Backend/php/api/customer/profile.php?id=${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          setUser(data.user);
        } else {
          setError(data.message);
          console.error('Error fetching user:', data.message);
        }
      })
      .catch((error) => {
        setError('Failed to fetch user data');
        console.error('Failed to fetch user:', error);
      });
  }, [id]);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <Navbar />
      <div className='Page-Container'>
        {user ? (
          <>
            <ProfileDetails user={user} />
            <Events userId={user.id} />
            <Favorite userId={user.id} />
          </>
        ) : (
          <>
            <OrbitProgress variant="track-disc" speedPlus="1" easing="linear" color="#4C1B41" />
          </>
        )}
      </div>
      <Footer />
    </>
  );
}


export default Profile;