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
  const [added, setAdded] = useState(false);
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
  // setRejected(true);
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

  const fetchPackages = async () => {
    try {
      const planner_id = id;
      const response = await fetch(`http://localhost/Monasbtak-Backend/php/api/planner/packages/getPlannerPackages.php?planner_id=${planner_id}`, {
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
    fetchPackages();
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
  
    fetchPlanner();
  }, [id]);

  const handleAddPackageModal = () => {
    setAddPackageModal(true);
  };

  const handleSubmitAddPackage = async (event) => {
    event.preventDefault();
  
    const formData = new FormData(event.target);
    formData.append('name', formData.get('name'));
    formData.append('description', formData.get('description'));
    formData.append('price', formData.get('price'));
    formData.append('image', formData.get('image'));
    formData.append('planner_id', id); // Replace with actual planner_id
    formData.append('venue_id', formData.get('venue_id'));
    formData.append('category_id', formData.get('category_id'));
    formData.append('subCat_name', formData.get('subCat_name'));
    formData.append('venueDetails' , formData.get('venueDetails'));
    formData.append('location', venues.find(venue => venue.id == formData.get('venue_id')).name);
    formData.append('status', 'Pending');
    formData.append('subCategory_id', subCategories.find(subCategory => subCategory.name == formData.get('subCat_name')).id);
    if (planner) {
      formData.append('planner_name', planner.username); // Directly use the username from the planner object
    } else {
      console.error('Planner data is not available.');
    }
    
  
    try {
      const response = await fetch('http://localhost/Monasbtak-Backend/php/api/planner/packages/createPackage.php', {
        method: 'POST',
        body: formData, // Use FormData directly
      });
  
      if (response.ok) {
        const result = await response.json();
        // alert(result.message);
        handleAddedPackage();
        setAddPackageModal(false);
      } else {
        const errorText = await response.text();
        alert(`Error: ${errorText}`);
      }
    } catch (error) {
      console.error('Error submitting package:', error);
    }
  };
  

  const handleCloseModal = () => {
    setAddPackageModal(false);
  };

  const handleEditPackageModal = (pkg) => {
    setSelectedPackage(pkg);
    setEditPackageModal(true);
  };

  const handleSubmitEditPackage = async (event) => {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    formData.append('id', selectedPackage.id);
    if (formData.get('name')) formData.append('name', formData.get('name'));
    if (formData.get('description')) formData.append('description', formData.get('description'));
    if (formData.get('image') && formData.get('image').size > 0) formData.append('image', formData.get('image'));
    if (formData.get('price')) formData.append('price', formData.get('price'));
    if (formData.get('location')) formData.append('location', formData.get('location'));

    try {
      const response = await fetch('http://localhost/Monasbtak-Backend/php/api/planner/packages/editPackage.php', {
        method: 'POST',
        body: formData, 
      });

      if (response.ok) {
        const result = await response.json();
        if (result.message === 'Package updated successfully') {
          console.log('Package Updated');
          fetchPackages(); 
          setEditPackageModal(false);
        } else {
          console.error('Error updating package:', result.message);
        }
      } else {
        const errorText = await response.text();
        alert(`Error: ${errorText}`);
      }
    } catch (error) {
      console.error('Error updating package:', error);
    }
  };

  const handleCloseEditModal = () => {
    setEditPackageModal(false);
  };

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

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleAddedPackage = () => {
    setAdded(true);
  }
  const handleAddedPackageclose = () => {
    setAdded(false);
  }


  return (
    <div className='page-container'>
      <div className='packages-container'>
        <div className='header'>
          <span className='large-font-size bold-font'>Packages</span>
          <button className='btn' onClick={handleAddPackageModal}>
            Add Package
            <Icon icon="hugeicons:upload-03" className='end-icon' />
          </button>
        </div>
        <hr className='line'/>

        <div className='slider'>
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
                  <div className='row-flex'>
                    <div className='location'>
                      <Icon icon="hugeicons:location-04" className="Location-icon" />
                      <span>{pkg.location}</span>
                    </div>
                    <button className='btn' onClick={() => handleEditPackageModal(pkg)}>
                      Edit
                      <Icon icon="hugeicons:edit" className='end-icon' />
                    </button>
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
      </div>
      {AddPackageModal && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="close-button" onClick={handleCloseModal}><IoClose /></button>
            <span className='XL-font-size bold-font'>Add New Package</span>
            <hr className='line'/>
            <form className="modal-content" onSubmit={handleSubmitAddPackage}>
              <div className='Modal-Add-package-container'>
                <span>Package Name</span>
                <input type='text' name='name' className='input' required />
              </div>
              <div className='Modal-Add-package-container'>
                <span>Package Description</span>
                <input type='text' name='description' className='input' required />
              </div>
              <div className='Modal-Add-package-container'>
                <span>Package Photo</span>
                <input type='file' name='image' accept='image/*' className='input' required />
              </div>
              <div className='Modal-Add-package-container'>
                <span>Category</span>
                <select name='category_id' className='input' required onChange={handleCategoryChange}>
                  <option value=''>Select Category</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category.id}>{category.name}</option>
                  ))}
                </select>
              </div>
              <div className='Modal-Add-package-container'>
                <span>Sub Category</span>
                <select name='subCat_name' className='input' required>
                  <option value=''>Select Sub Category</option>
                  {subCategories
                    .filter(subCategory => subCategory.category_id == selectedCategory)
                    .map((subCategory, index) => (
                      <option key={index} value={subCategory.name}>{subCategory.name}</option>
                    ))}
                </select>
              </div>
              <div className='Modal-Add-package-container'>
                <span>Venue Name</span>
                <select name='venue_id' className='input' required>
                  <option value=''>Select Venue</option>
                  {venues.map((venue, index) => (
                    <option key={index} value={venue.id}>{venue.name}</option>
                  ))}
                </select>
              </div>
              <div className='Modal-Add-package-container'>
                <span>Add Venue Details</span>
                <input type='text' name='venueDetails' className='input' required />
              </div>
              <div className='Modal-Add-package-container'>
                <span>Price</span>
                <input type='text' name='price' className='input' required />
              </div>
              <button type='submit' className='btn' >
                Add Package
              </button>
            </form>
          </div>
        </div>
      )}
      {EditPackageModal && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="close-button" onClick={handleCloseEditModal}><IoClose /></button>
            <span className='XL-font-size bold-font'>Edit Package</span>
            <hr className='line'/>
            <form className="modal-content" onSubmit={handleSubmitEditPackage}>
              <div className='Modal-Add-package-container'>
                <span>Package Name</span>
                <input type='text' name='name' className='input' defaultValue={selectedPackage.name} />
              </div>
              <div className='Modal-Add-package-container'>
                <span>Package Description</span>
                <input type='text' name='description' className='input' defaultValue={selectedPackage.description} />
              </div>
              <div className='Modal-Add-package-container'>
                <span>Package Photo</span>
                <input type='file' name='image' accept='image/*' className='input' />
              </div>
              <div className='Modal-Add-package-container'>
                <span>Venue Name</span>
                <select name='venue_id' className='input' defaultValue={selectedPackage.venue_id}>
                  <option value=''>Select Venue</option>
                  {venues.map((venue, index) => (
                    <option key={index} value={venue.id}>{venue.name}</option>
                  ))}
                </select>
              </div>
              <div className='Modal-Add-package-container'>
                <span>Price</span>
                <input type='text' name='price' className='input' defaultValue={selectedPackage.price} />
              </div>
              <button type='submit' className='btn' >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}

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
      {added && (
        <div className="modal-overlay">
          <div className="added-modal">
            <span className='added-text'>Package Created Successfully</span>
            <div className="modal-content">
              <button className='btn' onClick={handleAddedPackageclose}>
                OK
              </button>
            </div>
          </div>
        </div>
        )}
    </div>
  );
}

export default Page;