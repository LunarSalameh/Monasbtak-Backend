'use client';
import { useEffect, useState } from 'react';
import stl from "./Scategories.module.css";
import { useSearchParams } from 'next/navigation';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import { OrbitProgress } from 'react-loading-indicators';

const Scategories = () => {
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [venues, setVenues] = useState([]);
  const [venuesData, setVenuesData] = useState([]);
  const [venuesLoading, setVenuesLoading] = useState(false);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [showSubCategories, setShowSubCategories] = useState(true);
  const searchParams = useSearchParams();
  const id = searchParams.get('id'); // Get user ID from the query parameters
  const category_id = searchParams.get('categoryId'); // Get category ID from the query parameters

  useEffect(() => {
    fetch(`http://localhost/Monasbtak-Backend/php/api/customer/getSubCategories.php?category_id=${category_id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (data.status === 'success') {
          setSubCategories(data.subCategories);
        } else {
          setSubCategories([]);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching subcategories:', error);
        setLoading(false);
      });
  }, [category_id]);

  const fetchVenues = async (subCategory_id) => {
    try {
      const response = await fetch(`http://localhost/Monasbtak-Backend/php/api/customer/getVenueId.php?subCategory_id=${subCategory_id}`);
      const data = await response.json();
      if (data.status === 'success') {
        const venueIds = data.subCategories.map(subCategory => subCategory.venue_id);
        fetchVenuesData(venueIds);
      } else {
        setVenues([]);
        setVenuesData([]); // Ensure venuesData is cleared if no venues are found
      }
    } catch (error) {
      console.error('Error fetching venues:', error);
      setVenues([]);
      setVenuesData([]); // Ensure venuesData is cleared in case of an error
  };
  };

  const fetchVenuesData = async (venueIds) => {
    try {
      const venuesDataArray = [];
      for (const id of venueIds) {
        const response = await fetch(`http://localhost/Monasbtak-Backend/php/api/customer/getVenues.php?id=${id}`);
        const text = await response.text();
        const data = text ? JSON.parse(text) : {};
        if (data.status === 'success') {
          venuesDataArray.push(data.data[0]);
          console.log('Venue fetched:', data.data[0]); // Debugging line
        } else {
          console.log('No venue found for ID:', id); // Debugging line
        }
      }
      console.log('All fetched venues:', venuesDataArray); // Debugging line
      setVenuesData(venuesDataArray);
    } catch (error) {
      console.error('Error fetching venues:', error);
      setVenuesData([]);
    } finally {
      setVenuesLoading(false);
    }
  };

  const handleSubCategoryClick = (subCategory_id) => {
    setSelectedSubCategory(subCategory_id);
    fetchVenues(subCategory_id);
    setVenuesLoading(true);
    setShowSubCategories(false); // Hide other subcategories
  };

  const toggleSubCategories = () => {
    setShowSubCategories(!showSubCategories);
    if (!showSubCategories) {
      setSelectedSubCategory(null); // Reset selected subcategory when showing subcategories
    }
  };

  return (
    <div className={stl.container}>
      <div className={stl.headLine}>
        <div className={stl.flexHeadline}>
          <span className={`${stl.largeFontSize} ${stl.fontColor} ${stl.boldFont} ${stl.showArrow}`} onClick={toggleSubCategories}>
            Sub Categories
          </span>
          <Icon icon="mdi:chevron-down" className={stl.downArrow} onClick={toggleSubCategories} />
        </div>
        <hr className={stl.line}/>
      </div>
      {loading ? (
        <div className='flex w-full justify-center justify-items-center'>
          <OrbitProgress variant="track-disc" speedPlus="1" easing="linear" color="#4C1B41" />
        </div>
      ) : (
        <div className={stl.cardsWrapper}>
          {subCategories.map((Scategory, index) => (
            <div key={index} className={`${stl.sCategoryCard} ${selectedSubCategory && selectedSubCategory !== Scategory.id && !showSubCategories ? stl.hidden : ''}`} onClick={() => handleSubCategoryClick(Scategory.id)}>
              <img
                src={`data:image/jpeg;base64,${Scategory.image}`} 
                alt={Scategory.name}
                className={stl.sCategoryImage}
              />
              <h3 className={stl.sCategoryName}>{Scategory.name}</h3>
            </div>
          ))}
        </div>
      )}
      {selectedSubCategory && (
        <>
          <div className={stl.headLine}>
            <span className={`${stl.largeFontSize} ${stl.fontColor} ${stl.boldFont}`}>All Venues</span>
            <hr className={stl.line}/>
          </div>
        <div className={stl.container}>
          {venuesLoading ? (
            <div className='flex w-full justify-center justify-items-center'>
              <OrbitProgress variant="track-disc" speedPlus="1" easing="linear" color="#4C1B41" />
            </div>
          ) : (
            <div className={stl.venuesWrapper}>
              {venuesData.map((venue, index) => (
                <Link href={`/customers/packages?id=${id}&venueId=${venue.id}&subCategory_id=${selectedSubCategory}`} key={index}>
                  <div key={index} className={stl.venueCard}>
                    <img
                      src={`data:image/jpeg;base64,${venue.image}`}
                      alt={venue.name}
                      className={stl.venueImage}
                    />
                    <h3 className={stl.sCategoryName}>{venue.name}</h3>
                    <div className={stl.location}>
                      <Icon icon="hugeicons:location-04" className={stl.LocationIcon} />
                      <span>{venue.location}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
        </>
      )}
    </div>
  );
};

export default Scategories;