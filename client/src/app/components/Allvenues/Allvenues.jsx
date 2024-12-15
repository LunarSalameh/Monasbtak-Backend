// 'use client';
// import  { useEffect, useState } from 'react';

// const AllVenues = ({ categoryId }) => {
//     const [venues, setVenues] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchVenues = async () => {
//             try {
//                 const response = await fetch(`http://monasbtak.org/php/api/admin/venues/getVenues.php?categoryId=${categoryId}`);
//                 const data = await response.json();
//                 setVenues(data);
//             } catch (error) {
//                 console.error('Error fetching venues:', error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchVenues();
//     }, [categoryId]);

//     return (
//         <div className="venues-container">
//             <h2>All Venues</h2>
//             {venues.length > 0 ? (
//                 <ul className="venue-list">
//                     {venues.map((venue) => (
//                         <li key={venue.id} className="venue-item">
//                             <h3>{venue.name}</h3>
//                             <img src={venue.img} className="venue-img"/>
//                             {/* <p>{venue.description}</p>
//                             <p>Location: {venue.location}</p> */}
//                         </li>
//                     ))}
//                 </ul>
//             ) : (
//                 <p>No venues available for this category.</p>
//             )}
//         </div>
//     );
// };

// export default AllVenues;

