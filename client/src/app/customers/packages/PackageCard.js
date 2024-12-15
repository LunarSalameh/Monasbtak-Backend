import React, { useState, useEffect } from 'react';
import './PackageCard.css';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { FaStar } from 'react-icons/fa';
import { CiStar } from "react-icons/ci";

const PackageCard = ({ title, description, image, package_id,planner_Id }) => {
    const [isFavorited, setIsFavorited] = useState(false);
    const searchParams = useSearchParams();
    const userId = searchParams.get('id'); // Extract userId dynamically

    useEffect(() => {
        const fetchFavorites = async () => {
            if (!userId) {
                console.error('No userId found in the URL');
                return;
            }

            try {
                const response = await fetch(`http://monasbtak.org/php/api/customer/Favorites/getFavStatus.php?id=${userId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const result = await response.json();
                if (result.success) {
                    setIsFavorited(result.data.map(String).includes(package_id.toString()));
                }
            } catch (error) {
                console.error('Error fetching favorites:', error);
            }
        };

        fetchFavorites();
    }, [userId, package_id]);

    const toggleFavorite = async () => {
        if (!userId) {
            console.error('No userId found in the URL');
            return;
        }

        const payload = {
            packageId: package_id,
            userId: userId,
            isFavorited: !isFavorited,
        };

        setIsFavorited(!isFavorited);

        try {
            const response = await fetch('http://monasbtak.org/php/api/customer/Favorites/addFavorite.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
        } catch (error) {
            console.log('Error:', error);
            setIsFavorited(!payload.isFavorited); 
        }
    };

    return (
        <div className="package-card">
            <div className='Transparent-Box'>
            <button 
                className={`favorite-button ${isFavorited ? 'favorited' : ''}`} 
                onClick={toggleFavorite}
                aria-label="Toggle Favorite"
            >
                {isFavorited ? <FaStar className='fa-star' /> : <CiStar className='fa-star' />}
            </button>
            </div>
            <img src={image} alt={title} className="package-image" />
            <div className="package-info">
                <h3 className='bold-font mid-font-size'>{title}</h3>
                <p className='padding'>{description}</p>
                <div className="card-actions">
                    <Link href={`/customers/onePackageBooking?id=${userId}&packageId=${package_id}&plannerId=${planner_Id}`}>
                        <button className="details-button">Details</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PackageCard;
