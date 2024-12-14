'use client';
import React, { useEffect, useState } from 'react';
import PackageCard from './PackageCard';
import './Packages.css';
import Navbar from '../../components/navbar/page';
import Footer from '../../components/footer/page';
import { useSearchParams } from 'next/navigation';
import { Icon } from '@iconify/react';
import { OrbitProgress } from 'react-loading-indicators';

const Packages = () => {
    const searchParams = useSearchParams();
    const venue_id = searchParams.get('venueId'); // Get venue from the query parameters
    const subCategory_id = searchParams.get('subCategory_id'); // Get subCategory_id from the query parameters
    const [venueName, setVenueName] = useState('');
    const [packages, setPackages] = useState([]);
    const [venue, setVenue] = useState([]);
    const [loading, setLoading] = useState(true);
    const [packagesLoaded, setPackagesLoaded] = useState(false); // New state variable

    useEffect(() => {
        if (venue_id) {
            setLoading(true);
            fetch(`http://localhost/Monasbtak-Backend/php/api/customer/getVenues.php?id=${venue_id}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Fetched data:', data); // Log the fetched data
                    if (data.status === 'success' && data.data.length > 0) {
                        const venue = data.data[0]; // Access the first element of the data array
                        setVenueName(venue.name);
                        setVenue(venue);
                        console.log(venue);
                    } else {
                        setVenueName('Venue not found');
                    }
                })
                .catch(error => {
                    console.error('Error fetching venue name:', error);
                    setVenueName('Error fetching venue name');
                })
                .finally(() => setLoading(false));

            fetchPackages(venue_id);
        }
        if (subCategory_id) {
            console.log('SubCategory ID:', subCategory_id); // Log the subCategory_id for debugging
        }
    }, [venue_id, subCategory_id]);

    const fetchPackages = async (venue_id) => {
        try {
            setLoading(true);
            const response = await fetch(`http://localhost/Monasbtak-Backend/php/api/customer/getPackageVenue.php?venue_id=${venue_id}&subCategory_id=${subCategory_id}`);
            const data = await response.json();
            if (data.status === 'success') {
                setPackages(data.data);
            } else {
                setPackages([]);
            }
        } catch (error) {
            console.log('Error fetching packages:', error);
            setPackages([]);
        } finally {
            setLoading(false);
            setPackagesLoaded(true); // Set packagesLoaded to true when fetching is done
        }
    }

    return (
        <>
        <Navbar />
        {/* <div className='container'> */}
        <div className='Page-Container'>
        <div className="packages-container">
            <h1 className='large-font-size bold-font'>{venueName}</h1>
            <div className='venue-container'>
                <div className='venue-image-container'>
                    <img src={`data:image/jpeg;base64,${venue.image}`} alt='venue' className='venue-image'/>
                </div>
                <div className='venue-total'>
                    <div className='venue-details'>
                        <span className='bold-font mid-font-size'>Description</span>
                        <span className='mid-font-size'>{venue.description}</span>
                    </div>
                    <div className='venue-details'>
                      <span className='Location-gap mid-font-size bold-font' ><Icon icon="hugeicons:location-04" className="Location-icon" /> Location</span>
                      <span className='mid-font-size'>{venue.location}</span>
                    </div>
                </div>
            </div>
            <hr className='line'/>
            <h2 className='bold-font'>Packages</h2>
            <div className="packages-grid">
                {loading ? (
                    <div className='flex w-full justify-center justify-items-center'>
                        <OrbitProgress variant="track-disc" speedPlus="1" easing="linear" color="#4C1B41" />
                    </div>
                ) : (
                    packagesLoaded && (packages.length > 0 ? (
                        packages.map((pkg, index) => (
                            <PackageCard
                                key={index}
                                title={pkg.name}
                                description={pkg.description}
                                image={`data:image/jpeg;base64,${pkg.image}`}
                                package_id={pkg.id}
                                planner_Id={pkg.planner_id}
                            />
                        ))
                    ) : (
                        <span className='mid-font-size'>No packages found for this venue.</span>
                    ))
                )}
            </div>
        </div>
        </div>
        <Footer />
        {/* </div> */}
        </>
    );
};

export default Packages;
