'use client';
import React, { useState } from 'react';
import './page.css';
import { Icon } from '@iconify/react';
import { IoClose } from "react-icons/io5";

function Page() {
  const [AddPackageModal, setAddPackageModal] = useState(false);
  const [EditPackageModal, setEditPackageModal] = useState(false);
  const [DeletePackageModal, setDeletePackageModal] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const packages = [
    {
      name: "Package 1",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ultrices ornare augue non tristiqueLorem ipsum dolor sit amet",
      price: 99.9,
      location: "Location 1",
      image: "/wedding2.jpg"
    },
    {
      name: "Package 2",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ultrices ornare augue non tristiqueLorem ipsum dolor sit amet",
      price: 199.9,
      location: "Location 2",
      image: "/wedding3.jpg"
    },
    {
      name: "Package 3",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ultrices ornare augue non tristiqueLorem ipsum dolor sit amet",
      price: 199.9,
      location: "Location 3",
      image: "/wedding4.jpg"
    },
    {
      name: "Package 4",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ultrices ornare augue non tristiqueLorem ipsum dolor sit amet",
      price: 199.9,
      location: "Location 3",
      image: "/wedding.jpg"
    },
  ];

  const handleAddPackageModal = () => {
    setAddPackageModal(true);
  };
  const handleCloseModal = () => {
    setAddPackageModal(false);
  };

  const handleEditPackageModal = () => {
    setEditPackageModal(true);
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
            {packages.slice(currentSlide * 2, currentSlide * 2 + 2).map((pkg, index) => (
              <div className='Package-Box' key={index}>
                <div className='Package-img-container'>
                  <img src={pkg.image} className='Package-img'/>
                  <span className='Price-tag'>$ {pkg.price}</span>
                </div>
                <div className='Package-details'>
                  <span className='mid-font-size'>{pkg.name}</span>
                  <span className='display'>{pkg.description}</span>
                  <div className='row-flex'>
                    <div className='location'>
                      <Icon icon="hugeicons:location-04" className="Location-icon" />
                      <span>{pkg.location}</span>
                    </div>
                    <button className='btn' onClick={handleEditPackageModal}>
                      Edit
                      <Icon icon="hugeicons:edit" className='end-icon' />
                    </button>
                  </div>
                </div>
                <Icon icon="hugeicons:delete-02" className='Delete-icon' onClick={handleDeletePackageModal} />
              </div>
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
            <div className="modal-content">
              <div className='Modal-Add-package-container'>
                <span>Package Name</span>
                <input type='text' className='input' />
              </div>
              <div className='Modal-Add-package-container'>
                <span>Package Description</span>
                <input type='text' className='input' />
              </div>
              <div className='Modal-Add-package-container'>
                <span>Package Photo</span>
                <input type='file' accept='image/*' className='input' />
              </div>
              <div className='Modal-Add-package-container'>
                <span>Category</span>
                <select className='input' >
                  <option value=''>Select Category</option>
                  <option value='Wedding'>Wedding </option>
                  <option value='Graduation'>Graduation </option>
                  <option value='Maternity'>Maternity </option>
                  <option value='Birthday'>Birthday </option>
                  <option value='Formal'>Formal Events </option>
                </select>
              </div>
              <div className='Modal-Add-package-container'>
                <span>Sub Category</span>
                <select className='input' >
                  <option value=''>Select Sub Category</option>
                  <option value='Luxuary'>Luxary </option>
                  <option value='Luxuary'>Mid level</option>
                  <option value='Luxuary'>On budgit </option>
                </select>
              </div>
              <div className='Modal-Add-package-container'>
                <span>Venue Name</span>
                <input type='text' className='input' />
              </div>
              <div className='Modal-Add-package-container'>
                <span>Venue Location</span>
                <input type='text' className='input' />
              </div>
              <div className='Modal-Add-package-container'>
                <span>Price</span>
                <input type='text' className='input' />
              </div>
              <button className='btn'>
                Add Package
              </button>
            </div>
          </div>
        </div>
      )}
      {EditPackageModal && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="close-button" onClick={handleCloseEditModal}><IoClose /></button>
            <span className='XL-font-size bold-font'>Edit Package</span>
            <hr className='line'/>
            <div className="modal-content">
              <div className='Modal-Add-package-container'>
                <span>Package Name</span>
                <input type='text' className='input' />
              </div>
              <div className='Modal-Add-package-container'>
                <span>Package Description</span>
                <input type='text' className='input' />
              </div>
              <div className='Modal-Add-package-container'>
                <span>Package Photo</span>
                <input type='file' accept='image/*' className='input' />
              </div>
              <div className='Modal-Add-package-container'>
                <span>Venue Name</span>
                <input type='text' className='input' />
              </div>
              <div className='Modal-Add-package-container'>
                <span>Venue Location</span>
                <input type='text' className='input' />
              </div>
              <div className='Modal-Add-package-container'>
                <span>Price</span>
                <input type='text' className='input' />
              </div>
              <button className='btn'>
                Submit
              </button>
            </div>
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
                <button className='btn'>
                  Yes
                </button>
                <button className='btn' onClick={handleCloseDeleteModal}>
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