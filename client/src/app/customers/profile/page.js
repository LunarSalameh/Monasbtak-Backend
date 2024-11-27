'use client';
import React, { useState, useEffect } from 'react';
import Navbar from '../../components/navbar/page';
import Footer from '../../components/footer/page';
import ProfileDetails from '../../components/Customers/profileDetails/page';
import Events from '../../components/Customers/profileEvents/page';
import Favorite from '../../components/Customers/profileFavorite/page';
import { useSearchParams } from 'next/navigation';
import './page.css';


function Profile() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id'); // Get user ID from the query parameters
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const userId = 1; // Replace with dynamic user ID as needed
    fetch(`http://localhost/Monasbtak-Backend/php/api/planner/profile.php?id=${id}`)
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
          console.error('Error fetching user:', data.message);
        }
      })
      .catch((error) => console.error('Failed to fetch user:', error));
  }, []);

  return (
    <div>
      <Navbar />
      <div className='Page-Container'>
        {user ? (
          <>
            <ProfileDetails user={user} />
            <Events userId={user.id} />
            <Favorite userId={user.id} />
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Profile;