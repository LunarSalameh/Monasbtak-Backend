import React from 'react';
import './page.css'; 
import { FaStar } from 'react-icons/fa';

const Favorite = ({ isFavorite }) => {
  return (
    <div>
      {isFavorite ? (
        // <span className="golden-star">★</span>
        <FaStar className='golden-star' />
      ) : (
        <FaStar className='white-star' />
        // <span className="white-star">☆</span>
      )}
    </div>
  );
};

export default Favorite;
