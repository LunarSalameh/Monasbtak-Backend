'use client';
import React, { useState, useEffect } from 'react';
import './page.css';
import { Icon } from '@iconify/react';
import { IoClose } from "react-icons/io5";
import { useSearchParams } from "next/navigation";


function Page() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id"); 
  const [AddPackageModal, setAddPackageModal] = useState(false);
  const [EditPackageModal, setEditPackageModal] = useState(false);
  const [DeletePackageModal, setDeletePackageModal] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [venues, setVenues] = useState([]);
  const [packages, setPackages] = useState([]);
  const [planner, setPlanner] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [deletePackages, setDeletePackages] = useState([]);
  
  const openDeleteModel = (pkg) => {
    setSelectedPackage(pkg);
    setDeletePackageModal(true);
}

const handleAccept = () => {
  setDeletePackageModal(false);
  fetchDeltePackage();
};

const handleReject = () => {
  setDeletePackageModal(false);
};

const fetchDeltePackage = async () => {
  try {
    const response = await fetch('http://localhost/Monasbtak-Backend/php/api/planner/packages/deletePackage.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: selectedPackage.id
      })
    });
    console.log(selectedPackage);
    const result = await response.json();
    if (result.message === 'Package deleted successfully') {
      console.log('Package Deleted');
    } else {
      console.error('Error deleting package:', result.message);
    }
  } catch (error) {
    console.error('Error Deleting:', error);
  }
};

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost/Monasbtak-Backend/php/api/planner/packages/getCategorySub.php');
        const result = await response.json();
        setCategories(result.categories);
        setSubCategories(result.sub_categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    const fetchVenues = async () => {
      try {
        const response = await fetch('http://localhost/Monasbtak-Backend/php/api/planner/packages/getVenues.php');
        const result = await response.json();
        setVenues(result.venues);
      } catch (error) {
        console.error('Error fetching venues:', error);
      }
    };

    fetchCategories();
    fetchVenues();
  }, []);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const planner_id = id;
        const response = await fetch(`http://localhost/Monasbtak-Backend/php/api/planner/packages/getPackageRequestStatus.php?planner_id=${planner_id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const result = await response.json();
        if (!result.data || result.data.length === 0) {
          setPackages(null);
        }
        else if (result.status === 'error') {
          console.error(result.message);
          setPackages(null); 
        } else {
          setPackages(result.data);
        }
      } catch (error) {
        console.error('Error fetching packages:', error);
        setPackages(null); 
      } finally {
        setLoading(false); 
      }
    };

    const fetchPlanner = async () => {
      try {
        const planner_id = id; 
        const response = await fetch(`http://localhost/Monasbtak-Backend/php/api/admin/packages/getPlannerDetails.php?id=${planner_id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const result = await response.json();
        if (!result.data || result.data.length === 0) {
          setPlanner(null); 
        }
        else if (result.status === 'error') {
          console.error(result.message);
          setPlanner(null); 
        } else {
          setPlanner(result.data);
        }
      } catch (error) {
        console.error('Error fetching planner:', error);
        setPlanner(null); 
      }
    };
  
    fetchPackages();
    fetchPlanner();
  }, [id]);

  
  const handleDeletePackageModal = () => {
    setDeletePackageModal(true);
  };
  const handleCloseDeleteModal = () => {
    setDeletePackageModal(false);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(packages.length / 2));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(packages.length / 2)) % Math.ceil(packages.length / 2));
  };


  return (
    <div className='page-container'>
      <div className='packages-container'>
        <div className='header'>
          <span className='large-font-size bold-font'>Packages Requests</span>
        </div>
        <hr className='line'/>

        <div className='slider media-none'>
          <button className='arrow left-arrow' onClick={prevSlide}>
            <svg className="h-8 w-8 "  fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"/>
            </svg>
          </button>
          <div className='slides'>
          {loading ? (
                    <div>Loading...</div> 
                ) : (
          packages === null || packages.length === 0 ? (
            <div>No packages found</div>
          ) : (
            Array.isArray(packages) && packages.slice(currentSlide * 2, currentSlide * 2 + 2).map((pkg, index) => (
              <div className='Package-Box' key={index}>
                <div className='Package-img-container'>
                  <img src={`data:image/jpeg;base64,${pkg.image}`} className='Package-img'/>
                  <span className='Price-tag'>JD {pkg.price}</span>
                </div>
                <div className='Package-details'>
                  <span className='mid-font-size'>{pkg.name}</span>
                  <span className='display'>{pkg.description}</span>
                  <span>{pkg.venueDetails}</span>
                  <div className='row-flex'>
                    <div className='location'>
                      <Icon icon="hugeicons:location-04" className="Location-icon" />
                      <span>{pkg.location}</span>
                    </div>
                    <span className='status-btn' >
                      {pkg.status}
                    </span>
                  </div>
                </div>
                <Icon icon="hugeicons:delete-02" className='Delete-icon' onClick={() => openDeleteModel(pkg)}/>
              </div>
            ))
          ))}
          </div>
          <button className='arrow right-arrow' onClick={nextSlide}>
            <svg className="h-8 w-8 "  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </button>
        </div>

        {/* Responsive */}
        <div className='slider  media-display'>
        <div className="btn-media-top">
          <button className='arrow left-arrow' onClick={prevSlide}>
            <svg className="h-8 w-8 "  fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"/>
            </svg>
          </button>
          <button className='arrow right-arrow' onClick={nextSlide}>
            <svg className="h-8 w-8 "  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </button>
          </div>
          <div className='slides'>
          {loading ? (
                    <div>Loading...</div> 
                ) : (
          packages === null || packages.length === 0 ? (
            <div>No packages found</div>
          ) : (
            Array.isArray(packages) && packages.slice(currentSlide * 2, currentSlide * 2 + 2).map((pkg, index) => (
              <div className='Package-Box' key={index}>
                <div className='Package-img-container'>
                  <img src={`data:image/jpeg;base64,${pkg.image}`} className='Package-img'/>
                  <span className='Price-tag'>JD {pkg.price}</span>
                </div>
                <div className='Package-details'>
                  <span className='mid-font-size'>{pkg.name}</span>
                  <span className='display'>{pkg.description}</span>
                  <span>{pkg.venueDetails}</span>
                  <div className='row-flex'>
                    <div className='location'>
                      <Icon icon="hugeicons:location-04" className="Location-icon" />
                      <span>{pkg.location}</span>
                    </div>
                    <span className='status-btn' >
                      {pkg.status}
                    </span>
                  </div>
                </div>
                <Icon icon="hugeicons:delete-02" className='Delete-icon' onClick={() => openDeleteModel(pkg)}/>
              </div>
            ))
          ))}
          </div>
        </div>
      </div>

      {DeletePackageModal && (
        <div className="modal-overlay">
           <div className="delete-modal">
            <button className="close-button" onClick={handleCloseDeleteModal}><IoClose /></button>
            <div className="modal-content">
              <span className='mid-font-size'>Are you sure you want to delete this package?</span>
              <div className='delete-modal-btn'>
                <button className='btn' onClick={() => {handleAccept(); window.location.reload();}}>
                  Yes
                </button>
                <button className='btn' onClick={handleReject}>
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Page;