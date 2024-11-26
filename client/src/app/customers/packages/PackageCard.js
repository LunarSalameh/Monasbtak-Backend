import React from 'react';
import './PackageCard.css';

const PackageCard = ({ title, description, image }) => {
    return (
        <div className="package-card">
            <img src={image} alt={title} className="package-image" />
            <div className="package-info">
                <h3>{title}</h3>
                <p className='padding'>{description}</p>
                <button className="details-button">Details</button>
            </div>
        </div>
    );
};

export default PackageCard;
