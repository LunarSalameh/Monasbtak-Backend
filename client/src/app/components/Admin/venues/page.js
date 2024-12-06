'use client';
import {React , useState, useEffect} from 'react'
import './page.css'
import { IoIosSearch } from 'react-icons/io'
import { IoClose } from 'react-icons/io5'
import { Icon } from '@iconify/react'

function page() {
    const [venues, setVenues] = useState(null);
    const [loading, setLoading] = useState(true);
    const [detailsmodal, setDetailsModal] = useState(false)
    const [AddVenue, setAddVenue] = useState(false);
    const [editVenue, setEditVenue] = useState(false);
    const [deleteVenue, setDeleteVenue] = useState(false);
    const [selectedVenue, setSelectedVenue] = useState(null);

    useEffect(() => {
      const fetchVenues = async () => {
        try {
          const response = await fetch('http://localhost/Monasbtak-Backend/php/api/admin/venues/getVenues.php', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          const result = await response.json();
          if (!result.data || result.data.length === 0) {
            setVenues(null);
          }
          else if (result.status === 'error') {
            console.error(result.message);
            setVenues(null); 
          } else {
            setVenues(result.data);
          }
        } catch (error) {
          console.error('Error fetching Venues:', error);
          setVenues(null); 
        } finally {
          setLoading(false); 
        }
      };

      fetchVenues();
    }, []);

    const handleAddVenue = () => {
        setAddVenue(true);
    };
    const handleCloseAddVenue = () => {
        setAddVenue(false);
    };

    const openDetailsModal = (venue) => {
        setSelectedVenue(venue);
        setDetailsModal(true);
    }
    const closeDetailsModal = () => {
        setSelectedVenue(null);
        setDetailsModal(false);
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
        {loading ? (
                    <div>Loading...</div> 
                ) : (
          venues === null || venues.length === 0 ? (
            <div>No Venues found</div>
          ) : (
          venues && venues.map((venue,index) => (
            <div className='venue-box' onClick={() => openDetailsModal(venue)} key={index}>
                <div className='img-container'>
                    <img src={`data:image/jpeg;base64,${venue.image}`} className='venue-img'/>
                </div>
                <span className='mid-font-size'>{venue.name}</span>
            </div>
            ))
          ))}
            
        </div>
        </div>

        {detailsmodal && selectedVenue && (
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
                        <img src={`data:image/jpeg;base64,${selectedVenue.image}`} className='venue-img-details'/>
                        </div>
                        <div className='modal-venue-details'>
                            <span className='large-font-size'>Venue Name: {selectedVenue.name}</span>
                            <span className='mid-font-size'>Category: {selectedVenue.category}</span>
                            <span className='mid-font-size'>Sub Category: {selectedVenue.subCategory}</span>
                            <span className='mid-font-size'>Location: {selectedVenue.location}</span>
                            <span className='mid-font-size'>Email: {selectedVenue.email}</span>
                            <span className='mid-font-size'>Phone Number: {selectedVenue.phoneNumber}</span>
                            <span className='mid-font-size'>Description: {selectedVenue.description}</span>
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