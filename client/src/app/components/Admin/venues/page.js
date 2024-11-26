'use client';
import {React , useState} from 'react'
import './page.css'
import { IoIosSearch } from 'react-icons/io'
import { IoClose } from 'react-icons/io5'
import { Icon } from '@iconify/react'

function page() {
    const [detailsmodal, setDetailsModal] = useState(false)
    const [AddVenue, setAddVenue] = useState(false);
    const [editVenue, setEditVenue] = useState(false);
    const [deleteVenue, setDeleteVenue] = useState(false);

    const handleAddVenue = () => {
        setAddVenue(true);
    };
    const handleCloseAddVenue = () => {
        setAddVenue(false);
    };

    const openDetailsModal = () => {
        setDetailsModal(true)
    }
    const closeDetailsModal = () => {
        setDetailsModal(false)
    }
    const openEditModal = () => {
        setEditVenue(true)
    }
    const closeEditModal = () => {
        setEditVenue(false)
    }
    const openDeleteModal = () => {
        setDeleteVenue(true)
    }
    const closeDeleteModal = () => {
        setDeleteVenue(false)
    }
  return (
    <div className='page-container'>
        <div className='venues-container'>
        <div className='main-top'>
            <div className='header'>
                <span className='large-font-size bold-font'>Venues</span>
                <button className='light-btn mid-font-size ' onClick={handleAddVenue}>
                    Add Venue
                    <Icon icon="hugeicons:upload-03" className='end-icon' />
                </button>
            </div>
            <div className="search-container">
                <IoIosSearch className="search-icon" />
                <input type="search" className="search-bar mid-font-size" placeholder="Search" />
            </div>
        </div>
        <hr className='line'/>
        <div className='container'>
            <div className='venue-box' onClick={openDetailsModal}>
                <div className='img-container'>
                    <img src='/venue1.jpg' className='venue-img'/>
                </div>
                <span className='mid-font-size'>Venue Name</span>
            </div>
            <div className='venue-box'>
                <img src='/venue2.jpg' className='venue-img'/>
                <span className='mid-font-size'>Venue Name</span>
            </div>
            <div className='venue-box'>
            <div className='img-container'>
                    <img src='/venue3.jpg' className='venue-img'/>
                </div>
                <span className='mid-font-size'>Venue Name</span>
            </div>
            <div className='venue-box'>
                <img src='/venue4.jpg' className='venue-img'/>
                <span className='mid-font-size'>Venue Name</span>
            </div>
            <div className='venue-box' onClick={openDetailsModal}>
                <div className='img-container'>
                    <img src='/venue1.jpg' className='venue-img'/>
                </div>
                <span className='mid-font-size'>Venue Name</span>
            </div>
            <div className='venue-box'>
                <img src='/venue2.jpg' className='venue-img'/>
                <span className='mid-font-size'>Venue Name</span>
            </div>
            <div className='venue-box'>
            <div className='img-container'>
                    <img src='/venue3.jpg' className='venue-img'/>
                </div>
                <span className='mid-font-size'>Venue Name</span>
            </div>
            <div className='venue-box'>
                <img src='/venue4.jpg' className='venue-img'/>
                <span className='mid-font-size'>Venue Name</span>
            </div>
        </div>
        </div>

        {detailsmodal && (
            <div className="modal-overlay">
                <div className="venue-modal">
                    <button className="close-button" onClick={closeDetailsModal}><IoClose /></button>
                    <span className='XL-font-size bold-font'>Venue Details</span>
                    <hr className='line'/>
                    <div className="modal-buttons">
                         <button className='btn-venue' onClick={openEditModal}>Edit Venue</button>
                         <button className='btn-venue' onClick={openDeleteModal}>Delete Venue</button>
                    </div>
                     <div className="modal-details">
                        <div className='modal-img-container-details'>
                        <img src='/venue1.jpg' className='venue-img-details'/>
                        </div>
                        <div className='modal-venue-details'>
                            <span className='large-font-size'>Venue Name</span>
                            <span className='mid-font-size'>Category:</span>
                            <span className='mid-font-size'>Sub Category:</span>
                            <span className='mid-font-size'>Location:</span>
                            <span className='mid-font-size'>Email:</span>
                            <span className='mid-font-size'>Phone Number:</span>
                            <span className='mid-font-size'>Description:</span>
                        </div>
                    </div>
                </div>
            </div>
        )}
        {AddVenue && (
        <div className="modal-overlay">
        <div className="modal">
          <button className="close-button" onClick={handleCloseAddVenue}><IoClose /></button>
          <span className='XL-font-size bold-font'>Add New Venue</span>
          <hr className='line'/>
          <div className="modal-content">
            <div className='Modal-Add-package-container'>
              <span>Venue Name</span>
              <input type='text' className='input' />
            </div>
            <div className='Modal-Add-package-container'>
              <span>Location</span>
              <input type='text' className='input' />
            </div>
            <div className='Modal-Add-package-container'>
              <span>Email</span>
              <input type='email' className='input' />
            </div>
            <div className='Modal-Add-package-container'>
                <span>Phone Number</span>
                <input type='tel' className='input' />
            </div>
            <div className='Modal-Add-package-container'>
                <span>Description</span>
                <input type='text' className='input' />
            </div>
            <div className='Modal-Add-package-container'>
                <span>Photo</span>
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
            <button className='btn'>
              Add Venue
            </button>
          </div>
        </div>
      </div>
      )}
      {editVenue && ( 
        <div className="modal-overlay">
        <div className="modal">
          <button className="close-button" onClick={closeEditModal}><IoClose /></button>
          <span className='XL-font-size bold-font'>Edit Venue</span>
          <hr className='line'/>
          <div className="modal-content">
            <div className='Modal-Add-package-container'>
              <span>Venue Name</span>
              <input type='text' className='input' />
            </div>
            <div className='Modal-Add-package-container'>
              <span>Location</span>
              <input type='text' className='input' />
            </div>
            <div className='Modal-Add-package-container'>
              <span>Email</span>
              <input type='email' className='input' />
            </div>
            <div className='Modal-Add-package-container'>
                <span>Phone Number</span>
                <input type='tel' className='input' />
            </div>
            <div className='Modal-Add-package-container'>
                <span>Description</span>
                <input type='text' className='input' />
            </div>
            <div className='Modal-Add-package-container'>
                <span>Photo</span>
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
              <span>Category</span>
              <select className='input' >
                <option value=''>Select Sub Category</option>
                <option value='Luxuary'>Luxary </option>
                <option value='Luxuary'>Mid level</option>
                <option value='Luxuary'>On budgit </option>
              </select>
            </div>
            <button className='btn'>
              Edit Venue
            </button>
          </div>
        </div>
        </div>
        )}
        {deleteVenue && (
            <div className="modal-overlay">
                <div className="modal-delete">
                    <button className="close-button" onClick={closeDeleteModal}><IoClose /></button>
                    <span className='XL-font-size bold-font'>Delete Venue</span>
                    <hr className='line'/>
                    <div className="modal-delete-content">
                        <span className='mid-font-size'>Are you sure you want to delete this venue?</span>
                        <button className='btn' onClick={() => { closeDetailsModal(); closeDeleteModal(); }} >
                            Delete Venue
                        </button>
                    </div>
                </div>
                </div>
                )}
    </div>
  )
}

export default page