"use client";
import React, { useEffect, useState } from "react";
import "./page.css";
import Link from "next/link";
import { IoTrashOutline } from "react-icons/io5";
import { useSearchParams } from "next/navigation";
import { FaStar } from 'react-icons/fa'

function FavoritePage() {
  const [favorites, setFavorites] = useState([]);
  const [userId, setUserId] = useState(null); // Store userId
  const searchParams = useSearchParams();
  const id = searchParams.get("id"); // Get user ID from the query parameters

  // Fetch userId and favorites
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        setUserId(id); // Set userId in state
        const response = await fetch(`http://localhost/Monasbtak-Backend/php/api/customer/Favorites/getFavorites.php?id=${id}`);
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const text = await response.text();
        const result = text ? JSON.parse(text) : {};

        if (result.success) {
          const favoritesWithDetails = await Promise.all(result.data.map(async (favorite) => {
            const packageDetails = await fetchPackagesDetails(favorite.packages_id);
            return { ...favorite, ...packageDetails };
          }));
          setFavorites(favoritesWithDetails);
          console.log('Favorites:', favoritesWithDetails);
        } else {
          setFavorites([]); // Set favorites to an empty array if no favorites found
        }
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    fetchFavorites();
  }, [id]);
  
  const fetchPackagesDetails = async (packageId) => {
    try {
      const response = await fetch(`http://localhost/Monasbtak-Backend/php/api/customer/getPackage.php?id=${packageId}`);
      const result = await response.json();
      if (result.status === 'success' && result.data.length > 0) {
        return {
          image: `data:image/jpeg;base64,${result.data[0].image}`,
          name: result.data[0].name,
        };
      }
      return {};
    } catch (error) {
      console.error("Error fetching package details:", error);
      return {};
    }
  }

  const handleDelete = async (favoriteId) => {
    try {
      const response = await fetch('http://localhost/Monasbtak-Backend/php/api/customer/Favorites/deleteFavorite.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: favoriteId })
      });

      const result = await response.json();
      if (result.message === 'Package deleted successfully') {
        setFavorites((prevFavorites) =>
          prevFavorites.filter((fav) => fav.id !== favoriteId)
        );
        console.error("Package Removed successfully!");
      } else {
        console.error("Failed to remove package from favorite. Try again.");
      }
    } catch (error) {
      console.error('Error deleting favorite:', error);
    }
  };

  return (
    <div className="Favorite-container">
      <div className="showall">
        <h1 className="large-font-size font-color bold-font">Favorite</h1>
        {userId && ( // Ensure userId is available
          <Link href={`/customers/showAllFav?id=${userId}`}>
            <span className="small-font-size bold-font Show-Button">
              Show All
            </span>
          </Link>
        )}
      </div>
      <hr className="line" />
      <div className="Fav-container Fav-phone-view">
        {favorites.length > 0 ? (
          favorites.map((favorite, index) => (
            <div className='Fav-Box' key={index}>
              <img src={favorite.image} className="Fav-img" alt={favorite.name} />
              <div className='Transparent-Box'>
              <button className="delete-btn" onClick={() => handleDelete(favorite.id)}> <IoTrashOutline /> </button>
              </div>
              <span className="mid-font-size">{favorite.name}</span>
            </div>
          ))
        ) : (
          <p>No favorites found.</p>
        )}
      </div>
    </div>
  );
}

export default FavoritePage;

{/* <div className="Fav-Box" key={favorite.packages_id}>
              <img src={favorite.image} className="Fav-img" alt={favorite.name} />
              <span>{favorite.name}</span>
              <button
                className="delete-btn"
                onClick={() => handleDelete(favorite.packages_id)}
              >
                <IoTrashOutline className="trash-icon" />
              </button>
            </div> */}