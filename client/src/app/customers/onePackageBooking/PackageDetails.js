import React from 'react';
import './PackageDetails.css';



const PackageDetails = () => {
  return (
    <div className="package-details-container">
      <div className='headline'>
        <h1 className="title large-font-size bold-font">Packages Details</h1>
        <span className='line'></span>
      </div>
      <div className="content">
        <div className='img-container'>
          <img src='/wedding7.png' alt="Package" className="package-image" />
          <img src='/wedding4.png' alt="Package" className="package-image" />
        </div>
        <div className="details">
          <div className="planner-info">
            <img src='/planner.png' alt="Planner" className="planner-image" />
            <div className="planner-name">Planner Name</div>
            <div className="price">$99.9</div>
          </div>
          <div className='package-details'>
            <span className="description">Category - Sub Category</span>
            <span className="description">Venue : Hayya Amman Hotel</span>
            <span className="description">Location :</span>
            <p className="description">Discription : Luxury Wedding Package</p>
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
