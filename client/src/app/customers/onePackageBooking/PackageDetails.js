'use client';
import React, { useState, useEffect } from 'react';
import './PackageDetails.css';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

const PackageDetails = () => {
  const searchParams = useSearchParams();
  const userId = searchParams.get('id');
  const id = searchParams.get('packageId');
  const [packageDetails, setPackageDetails] = useState(null);
  const [plannerDetails, setPlannerDetails] = useState(null);

  useEffect(() => {
    const fetchPackageDetails = async () => {
      try {
        const response = await fetch(`http://localhost/Monasbtak-Backend/php/api/customer/getPackage.php?id=${id}`);
        const data = await response.json();
        if (data.status === 'success') {
          const packageData = data.data[0];
          setPackageDetails(packageData);

          // Fetch planner details using planner_id from packageData
          const plannerResponse = await fetch(`http://localhost/Monasbtak-Backend/php/api/customer/getPlanner.php?id=${packageData.planner_id}`);
          const plannerText = await plannerResponse.text();
          const plannerData = plannerText ? JSON.parse(plannerText).data[0] : {};
          if (plannerData && !plannerData.error) {
            setPlannerDetails(plannerData);
          } else {
            setPlannerDetails(null);
          }
        } else {
          setPackageDetails(null);
        }
      } catch (error) {
        console.error('Error fetching package details:', error);
        setPackageDetails(null);
      }
    };

    if (id) {
      fetchPackageDetails();
    }
  }, [id]);

  if (!packageDetails || !plannerDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="package-details-container">
      <div className='headline'>
        <h1 className="title large-font-size bold-font">Packages Details</h1>
        <span className='line'></span>
      </div>
      <div className="content">
        <div className='img-container'>
          <img src={`data:image/jpeg;base64,${packageDetails.image}`} alt="Package" className="one-package-image" />
        </div>
        <div className="details">
          <div className="planner-info">
            <Link href={`/customers/plannerProfile/?id=${userId}&planner_id=${plannerDetails.id}`}>
            <div className='planner-profile'>
              <img src={`data:image/jpeg;base64,${plannerDetails.image}`} alt="Planner" className="planner-image" />
              {plannerDetails && <span className='bold-font mid-font-size'>{plannerDetails.username}</span>}
            </div>
            </Link>
            <div className='flexRow flexRow2 '>
              <span className="planner-name">{packageDetails.name}</span>
              <span className="price">JD {packageDetails.price}</span>
            </div>
          </div>
          <div className='package-details'>
            <div className='flexRow'>
              <span className="description bold-font">Category: </span>
              <span className='description'>{packageDetails.subCat_name}</span>
            </div>
            <div className='flexRow '>
              <span className="description bold-font">Location: </span>
              <span className='description'>{packageDetails.location}</span>
            </div>
            <div className='flexRow '>
              <span className="description bold-font">Venue Details: </span>
              <span className='description'>{packageDetails.venueDetails}</span>
            </div>
            <div className='flexRow '>
              <span className="description bold-font">Description: </span>
              <span className='description'>{packageDetails.description}</span>
            </div>
          </div>
        </div>
      </div>
      <div className='headline'>
        <h1 className="title large-font-size bold-font">Booking Details</h1>
        <span className='line'></span>
      </div>
    </div>
  );
};

export default PackageDetails;
