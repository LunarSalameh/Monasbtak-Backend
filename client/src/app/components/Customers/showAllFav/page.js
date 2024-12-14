"use client";
import React, { useEffect, useState } from "react";
import "./page.css";
import Link from 'next/link';
import { IoTrashOutline } from "react-icons/io5";
import { useSearchParams } from "next/navigation";
import { OrbitProgress } from 'react-loading-indicators';

function FavoritePage() {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state
    const searchParams = useSearchParams();
    const id = searchParams.get("id");

    // Fetch all favorites from the backend
    useEffect(() => {
        const fetchFavorites = async () => {
            try {
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
                    setLoading(false); // Set loading to false after data is fetched
                    console.log('Favorites:', favoritesWithDetails);
                } else {
                    setFavorites([]); // Set favorites to an empty array if no favorites found
                    setLoading(false); // Set loading to false after data is fetched
                }
            } catch (error) {
                console.error("Error fetching favorites:", error);
                setLoading(false); // Set loading to false in case of error
            }
        };

        fetchFavorites();
    }, [id]);

    const fetchPackagesDetails = async (packageId) => {
        try {
            const response = await fetch(`http://localhost/Monasbtak-Backend/php/api/customer/getPackage.php?packageId=${packageId}`);
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
            if (result.message === 'Package Removed successfully') {
                setFavorites((prevFavorites) =>
                    prevFavorites.filter((fav) => fav.id !== favoriteId)
                );
                console.log("Package Removed successfully!"); // Changed from console.error to console.log
            } else {
                console.error("Failed to Remove from Favorite. Try again.");
            }
        } catch (error) {
            console.error('Error deleting favorite:', error);
        }
    };

    return (
        <div className="Favorite-container">
            <h1 className="large-font-size font-color bold-font">Favorite</h1>
            <hr className="line" />
            <div className="Fav-container Fav-phone-view">
                {loading ? (
                    <div className='flex w-full justify-center justify-items-center'>
                        <OrbitProgress variant="track-disc" speedPlus="1" easing="linear" color="#4C1B41" />
                    </div>
                ) : (
                    favorites.length > 0 ? (
                        favorites.map((favorite,index) => (
                            <div className="Fav-Box" key={index} >
                                <img src={favorite.image} className="Fav-img" alt={favorite.name} />
                                <span className="mid-font-size">{favorite.name}</span> 
                                <div className="Transparent-Box">
                                <button className="delete-btn" onClick={() => handleDelete(favorite.id)}>
                                    <IoTrashOutline className="trash-icon" />
                                </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No favorites found.</p>
                    )
                )}
            </div>
        </div>
    );
}

export default FavoritePage;

// import React from 'react'
// import './page.css'
// import { FaStar } from 'react-icons/fa'
// import Favorite from '../../Favorite/page'
// import Link from 'next/link'

// function page() {
//   return (
//     <div className='Favorite-container'>
//         <div className='showall'> 
//             <span className='large-font-size font-color bold-font'>Favorite</span>
//         </div>
//         <hr className='line'/>
//         <div className='Fav-container Fav-phone-view'>
//         <div className='Fav-Box'>
//                 <img src="/Planner1.jpg" className='Fav-img' />
//                 <div className='Transparent-Box'>
//                 <Favorite isFavorite={true} />
//                 </div>
//                 <span>Planner #1</span>
//             </div>

//             <div className='Fav-Box'>
//                 <img src="/wedding.jpg" className='Fav-img' />
//                 <div className='Transparent-Box'>
//                     <Favorite isFavorite={true} />
//                 </div>
//                 <span>Package #1</span>
//             </div>
//             <div className='Fav-Box'>
//                 <img src="/Planner1.jpg" className='Fav-img' />
//                 <div className='Transparent-Box'>
//                 <Favorite isFavorite={true} />
//                 </div>
//                 <span>Planner #1</span>
//             </div>

//             <div className='Fav-Box'>
//                 <img src="/wedding.jpg" className='Fav-img' />
//                 <div className='Transparent-Box'>
//                     <Favorite isFavorite={true} />
//                 </div>
//                 <span>Package #1</span>
//             </div>
//             <div className='Fav-Box'>
//                 <img src="/Planner1.jpg" className='Fav-img' />
//                 <div className='Transparent-Box'>
//                 <Favorite isFavorite={true} />
//                 </div>
//                 <span>Planner #1</span>
//             </div>

//             <div className='Fav-Box'>
//                 <img src="/wedding.jpg" className='Fav-img' />
//                 <div className='Transparent-Box'>
//                     <Favorite isFavorite={true} />
//                 </div>
//                 <span>Package #1</span>
//             </div>

//             <div className='Fav-Box'>
//                 <img src="/wedding4.jpg" className='Fav-img' />
//                 <div className='Transparent-Box'>
//                     <Favorite isFavorite={true} />
//                 </div>
//                 <span>Package #2</span>
//             </div>

//             <div className='Fav-Box'>
//                 <img src="/Planner4.jpg" className='Fav-img' />
//                 <div className='Transparent-Box'>
//                     <Favorite isFavorite={true} />
//                 </div>
//                 <span>Planner #2</span>
//             </div>

//             <div className='Fav-Box'>
//                 <img src="/wedding3.jpg" className='Fav-img' />
//                 <div className='Transparent-Box'>
//                     <Favorite isFavorite={true} />
//                 </div>
//                 <span>Package #3</span>
//             </div>

//             <div className='Fav-Box'>
//                 <img src="/Planner1.jpg" className='Fav-img' />
//                 <div className='Transparent-Box'>
//                     <Favorite isFavorite={true} />
//                 </div>
//                 <span>Planner #3</span>
//             </div>

//             <div className='Fav-Box'>
//                 <img src="/Planner2.jpg" className='Fav-img' />
//                 <div className='Transparent-Box'>
//                     <Favorite isFavorite={true} />
//                 </div>
//                 <span>Planner #4</span>
//             </div>

//             <div className='Fav-Box'>
//                 <img src="/wedding5.jpg" className='Fav-img' />
//                 <div className='Transparent-Box'>
//                     <Favorite isFavorite={true} />
//                 </div>
//                 <span>Package #4</span>
//             </div>


//         </div>
//     </div>
//   )
// }

// export default page