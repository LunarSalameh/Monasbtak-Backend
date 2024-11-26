/*import  { useEffect, useState } from 'react';

import axios from 'axios';

const AllVenues = ({ categoryId }) => {
    const [venues, setVenues] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch venues for the selected category
        const fetchVenues = async () => {
            try {
                const response = await axios.get(`/api/venues/${categoryId}`);
                setVenues(response.data);
            } catch (error) {
                console.error("Error fetching venues:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchVenues();
    }, [categoryId]); // Re-run if categoryId changes

    if (loading) return <p>Loading venues...</p>;

    return (
        <div className="venues-container">
            <h2>All Venues</h2>
            {venues.length > 0 ? (
                <ul className="venue-list">
                    {venues.map((venue) => (
                        <li key={venue.id} className="venue-item">
                            <h3>{venue.name}</h3>
                            <img src={venue.img} classname={venue-img}/>
                            <p>{venue.description}</p>
                            <p>Location: {venue.location}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No venues available for this category.</p>
            )}
        </div>
    );
};


export default AllVenues;
*/
