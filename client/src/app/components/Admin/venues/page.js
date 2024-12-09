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
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [addSelectedCategory, setAddSelectedCategory] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedSubCategories, setSelectedSubCategories] = useState({});
    const [deleteAcceptAlert, setDeleteAcceptAlert] = useState(false);
    const [addAlert, setAddAlert] = useState(false);
    const [editCategoryModal, setEditCategoryModal] = useState(false);
    const [deleteCategoryAlert, setDeleteCategoryAlert] = useState(false);
    const [editAlert, setEditAlert] = useState(false);

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

      fetchCategories();
      fetchVenues();
    }, []);

      const fetchDelteVenue = async () => {
        try {
          const response = await fetch('http://localhost/Monasbtak-Backend/php/api/admin/venues/deleteVenue.php', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: selectedVenue.id
            })
          });
          console.log(selectedVenue);
          const result = await response.json();
          if (result.message === 'Venue deleted successfully') {
            console.log('Venue Deleted');
            fetchVenues();
            setDeleteAcceptAlert(true);
            setTimeout(() => setDeleteAcceptAlert(false), 3000); // Show alert for 3 seconds
          } else {
            console.error('Error deleting venue:', result.message);
          }
        } catch (error) {
          console.error('Error Deleting:', error);
        }
      };

      const handleSubmitAddVenue = async (event) => {
        event.preventDefault();
      
        const formData = new FormData(event.target);
        formData.append('name', formData.get('name'));
        formData.append('description', formData.get('description'));
        formData.append('image', formData.get('image'));
        formData.append('location', formData.get('location'));
      
        const subCategoryIds = Object.values(selectedSubCategories).flat().join(',');
        formData.append('subCategory_ids', subCategoryIds);
      
        try {
          const response = await fetch('http://localhost/Monasbtak-Backend/php/api/admin/venues/addVenueSubcategory.php', {
            method: 'POST',
            body: formData, // Use FormData directly
          });
      
          if (response.ok) {
            const result = await response.json();
            fetchVenues();
            setAddVenue(false);
            setAddAlert(true);
            setTimeout(() => setAddAlert(false), 3000); // Show alert for 3 seconds
          } else {
            const errorText = await response.text();
            alert(`Error: ${errorText}`);
          }
        } catch (error) {
          console.error('Error submitting package:', error);
        }
      };

    const handleCategoryChange = (event) => {
      const { selectedOptions } = event.target;
      const selected = Array.from(selectedOptions, option => option.value);
      setSelectedCategories(selected);
    };

    const handleSubCategoryChange = (categoryId, event) => {
      const { selectedOptions } = event.target;
      const selected = Array.from(selectedOptions, option => option.value);
      setSelectedSubCategories(prevState => ({
        ...prevState,
        [categoryId]: [...(prevState[categoryId] || []), ...selected]
      }));
    };

    const handleRemoveCategory = (categoryId) => {
      setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
      setSelectedSubCategories(prevState => {
        const newState = { ...prevState };
        delete newState[categoryId];
        return newState;
      });
    };
    
    const handleRemoveSubCategory = (categoryId, subCategoryId) => {
      setSelectedSubCategories(prevState => ({
        ...prevState,
        [categoryId]: prevState[categoryId].filter(id => id !== subCategoryId)
      }));
    };

    const handleAddVenue = () => {
        setAddVenue(true);
    };
    const handleCloseAddVenue = () => {
        setAddVenue(false);
    };

    const fetchVenueDetails = async (selectedVenue) => {
        try {
            const response = await fetch(`http://localhost/Monasbtak-Backend/php/api/admin/venues/getAll.php?venue_id=${selectedVenue.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const result = await response.json();
            if (result.status === 'error') {
                console.error(result.message);
                setSelectedSubCategory(null);
                setSelectedCategory(null);
            } else {
                setSelectedSubCategory(result.data);
            }
        } catch (error) {
            console.error('Error fetching venue details:', error);
            setSelectedSubCategory(null);
            setSelectedCategory(null);
        } finally {
            setLoading(false);
        }
    };

    const openDetailsModal = async (venue) => {
        setSelectedVenue(venue);
        setDetailsModal(true);
        await fetchVenueDetails(venue);
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
    const openEditCategoryModal = () => {
        setEditCategoryModal(true)
    }
    const closeEditCategoryModal = () => {
        setEditCategoryModal(false)
    }

    const handleDeleteSubCategory = async (subCategoryId) => {
        try {
            const response = await fetch('http://localhost/Monasbtak-Backend/php/api/admin/venues/deleteVenueSub.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    venue_id: selectedVenue.id,
                    subCategory_id: subCategoryId
                })
            });
            const result = await response.json();
            if (result.message === 'Package deleted successfully') {
                console.log('SubCategory Deleted');
                await fetchVenueDetails(selectedVenue); // Refresh the venue details
            } else {
                console.error('Error deleting subcategory:', result.message);
            }
        } catch (error) {
            console.error('Error Deleting SubCategory:', error);
        }
    };

    const handleAddSubCategory = async (categoryId, subCategoryId) => {
        try {
            const response = await fetch('http://localhost/Monasbtak-Backend/php/api/admin/venues/addSubCategory.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    venue_id: selectedVenue.id,
                    subCategory_id: subCategoryId
                })
            });
            const result = await response.json();
            if (result.message === 'Venue subcategory created successfully') {
                await fetchVenueDetails(selectedVenue); // Refresh the venue details
            } else {
                console.error('Error adding subcategory:', result.message);
            }
        } catch (error) {
            console.error('Error Adding SubCategory:', error);
        }
    };

    const handleSubmitEditVenue = async (event, selectedVenue) => {
        event.preventDefault();
        
        const formData = new FormData(event.target);
        formData.append('id', selectedVenue.id);
        if (formData.get('name')) formData.append('name', formData.get('name'));
        if (formData.get('description')) formData.append('description', formData.get('description'));
        if (formData.get('image') && formData.get('image').size > 0) formData.append('image', formData.get('image'));
        if (formData.get('location')) formData.append('location', formData.get('location'));
    
        try {
            const response = await fetch('http://localhost/Monasbtak-Backend/php/api/admin/venues/editVenue.php', {
                method: 'POST',
                body: formData, // Use FormData directly
            });
    
            if (response.ok) {
                const result = await response.json();
                fetchVenues();
                setEditVenue(false);
                setEditAlert(true);
                setDetailsModal(false);
                setTimeout(() => setEditAlert(false), 3000); // Show alert for 3 seconds
            } else {
                const errorText = await response.text();
                alert(`Error: ${errorText}`);
            }
        } catch (error) {
            console.error('Error editing venue:', error);
            alert('An error occurred while editing the venue. Please try again.');
        }
    };

    const filteredVenues = venues?.filter(venue => 
      venue.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                <input 
                  type="search" 
                  className="search-bar mid-font-size" 
                  placeholder="Search" 
                  value={searchTerm} 
                  onChange={(e) => setSearchTerm(e.target.value)} 
                />
            </div>
        </div>
        <hr className='line'/>
        <div className='container'>
        {loading ? (
                    <div>Loading...</div> 
                ) : (
          filteredVenues === null || filteredVenues.length === 0 ? (
            <div>No Venues found</div>
          ) : (
          filteredVenues.map((venue,index) => (
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

        {detailsmodal && selectedVenue && selectedSubCategory && (
            <div className="modal-overlay">
                <div className="venue-modal">
                    <button className="close-button" onClick={closeDetailsModal}><IoClose /></button>
                    <span className='XL-font-size bold-font'>Venue Details</span>
                    <hr className='line'/>
                    <div className="modal-buttons">
                         <button className='btn-venue' onClick={openEditModal}>Edit Venue</button>
                         <button className='btn-venue' onClick={openEditCategoryModal}>Edit Categories</button>
                         <button className='btn-venue' onClick={openDeleteModal}>Delete Venue</button>
                    </div>
                     <div className="modal-details">
                        <div className='modal-img-container-details'>
                        <img src={`data:image/jpeg;base64,${selectedVenue.image}`} className='venue-img-details'/>
                        </div>
                        <div className='modal-venue-details'>
                            <span className='large-font-size bold-font'>{selectedVenue.name}</span>
                            <div className='row-flex'>
                            <span className='mid-font-size bold-font'>Location:&nbsp;</span>
                            <span className='mid-font-size'> {selectedVenue.location}</span>
                            </div>
                            <div className='row-flex'>
                            <span className='mid-font-size bold-font'>Description:&nbsp;</span>
                            <span className='mid-font-size'> {selectedVenue.description}</span>
                            </div>
                            <span className='mid-font-size bold-font'>Categories and Sub Categories:</span>
                            <ul className='container-category'>
                                {selectedSubCategory.map((item, index) => (
                                    <div key={index} className='flex-category'>
                                        <li className='mid-font-size catIcon'>
                                            {item.category_name} 
                                        </li>
                                        <li className='mid-font-size catIcon'>
                                            {item.subCategory_name}
                                        </li>
                                    </div>
                                ))}
                            </ul>
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
            <form className='form' onSubmit={handleSubmitAddVenue}>
              <div className='Modal-Add-package-container'>
                <span>Venue Name</span>
                <input type='text' name='name' className='input' />
              </div>
              <div className='Modal-Add-package-container'>
                <span>Location</span>
                <input type='text' name='location' className='input' />
              </div>
              <div className='Modal-Add-package-container'>
                  <span>Description</span>
                  <input type='text' name='description' className='input' />
              </div>
              <div className='Modal-Add-package-container'>
                  <span>Photo</span>
                  <input type='file' name='image' accept='image/*' className='input' />
              </div>
              <div className='Modal-Add-package-container'>
                <span>Categories</span>
                <select name='categories' className='input' multiple required onChange={handleCategoryChange}>
                  <option value=''>Select Categories</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
              </div>
              {selectedCategories.map(categoryId => (
                <div key={categoryId} className='Modal-Add-package-container'>
                  <span>Sub Categories for {categories.find(cat => cat.id == categoryId).name}</span>
                  <select name={`subCategories_${categoryId}`} className='input' multiple onChange={(e) => handleSubCategoryChange(categoryId, e)}>
                    <option value=''>Select Sub Categories</option>
                    {subCategories
                      .filter(subCategory => subCategory.category_id == categoryId)
                      .map((subCategory) => (
                      <option key={subCategory.id} value={subCategory.id}>{subCategory.name}</option>
                    ))}
                  </select>
                </div>
              ))}
              {/* <div className='selected-items-container'>
                {selectedCategories.map(categoryId => (
                  <div key={categoryId} className='selected-item'>
                    <span>{categories.find(cat => cat.id == categoryId).name}</span>
                    <button type='button' onClick={() => handleRemoveCategory(categoryId)}>X</button>
                    <div className='selected-subcategories'>
                      {selectedSubCategories[categoryId]?.map(subCategoryId => (
                        <div key={subCategoryId} className='selected-subcategory'>
                          <span>{subCategories.find(sub => sub.id == subCategoryId).name}</span>
                          <button type='button' onClick={() => handleRemoveSubCategory(categoryId, subCategoryId)}>X</button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div> */}
              <button type='submit' className='btn'>
                Add Venue
              </button>
            </form>
          </div>
        </div>
      </div>
      )}

      {editVenue && selectedVenue && (
        <div className="modal-overlay">
        <div className="modal">
          <button className="close-button" onClick={closeEditModal}><IoClose /></button>
          <span className='XL-font-size bold-font'>Edit Venue</span>
          <hr className='line'/>
          <div className="modal-content">
            <form className='form' onSubmit={(event) => handleSubmitEditVenue(event, selectedVenue)}>
                <div className='Modal-Add-package-container'>
                    <span>Venue Name</span>
                    <input type='text' name='name' className='input' defaultValue={selectedVenue.name} />
                </div>
                <div className='Modal-Add-package-container'>
                    <span>Location</span>
                    <input type='text' name='location' className='input' defaultValue={selectedVenue.location} />
                </div>
                <div className='Modal-Add-package-container'>
                    <span>Description</span>
                    <input type='text' name='description' className='input' defaultValue={selectedVenue.description} />
                </div>
                <div className='Modal-Add-package-container'>
                    <span>Photo</span>
                    <input type='file' name='image' accept='image/*' className='input' />
                </div>
                <button type='submit' className='btn'>
                    Edit Venue
                </button>
            </form>
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
                        <button className='btn' onClick={() => { fetchDelteVenue(); closeDetailsModal(); closeDeleteModal(); }} >
                            Delete Venue
                        </button>
                    </div>
                </div>
            </div>
        )}

        {editCategoryModal && selectedVenue && selectedSubCategory && (
    <div className="modal-overlay">
        <div className="venue-modal">
            <button className="close-button" onClick={closeEditCategoryModal}><IoClose /></button>
            <span className='XL-font-size bold-font'>Category Details</span>
            <hr className='line'/>
            <div className="modal-buttons">
                 <button className='btn-venue' onClick={async () => {
                     closeEditCategoryModal();
                     await fetchVenueDetails(selectedVenue);
                     setDeleteCategoryAlert(true);
                     setTimeout(() => setDeleteCategoryAlert(false), 3000); // Show alert for 3 seconds
                 }}>Save</button>
            </div>
             <div className="modal-details">
                <div className='modal-img-container-details'>
                <img src={`data:image/jpeg;base64,${selectedVenue.image}`} className='venue-img-details'/>
                <div className='Modal-Add-package-container'>
                    <span>Categories</span>
                    <select name='categories' className='input' multiple required onChange={handleCategoryChange}>
                      <option value=''>Select Categories</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                      ))}
                    </select>
                  </div>
                  {selectedCategories.map(categoryId => (
                    <div key={categoryId} className='Modal-Add-package-container'>
                      <span>Sub Categories for {categories.find(cat => cat.id == categoryId).name}</span>
                      <select name={`subCategories_${categoryId}`} className='input' multiple onChange={(e) => handleSubCategoryChange(categoryId, e)}>
                        <option value=''>Select Sub Categories</option>
                        {subCategories
                          .filter(subCategory => subCategory.category_id == categoryId)
                          .map((subCategory) => (
                          <option key={subCategory.id} value={subCategory.id}>{subCategory.name}</option>
                        ))}
                      </select>
                      <button className='btn' onClick={async () => {
                          const selectedOptions = Array.from(document.querySelector(`select[name="subCategories_${categoryId}"]`).selectedOptions, option => option.value);
                          for (const subCategoryId of selectedOptions) {
                              await handleAddSubCategory(categoryId, subCategoryId);
                          }
                      }}>Add</button>
                    </div>
                  ))}
                </div>
                <div className='modal-venue-details'>
                    <span className='large-font-size bold-font'>{selectedVenue.name}</span>
                    <span className='mid-font-size bold-font'>Categories and Sub Categories:</span>
                    <ul className='container-category'>
                        {selectedSubCategory.map((item, index) => (
                            <div key={index} className='flex-category'>
                                <li className='mid-font-size catIcon'>
                                    {item.category_name} 
                                </li>
                                <li className='mid-font-size catIcon'>
                                    {item.subCategory_name}
                                </li>
                                <button onClick={() => handleDeleteSubCategory(item.subCategory_id)}><IoClose /></button>
                            </div>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    </div>
)}

        {deleteAcceptAlert && (
          <div className="modal-overlay-status top-right">
            <div className="rounded-xl w-fit grid grid-cols-[0.25fr,1fr]">
              <div className="bg-green-600 p-0 rounded-l-xl"></div>
              <div className="p-5 bg-white border-2 border-green-600">Venue Has Been Deleted Successfully</div>
            </div>
          </div>
        )}
        {deleteCategoryAlert && (
          <div className="modal-overlay-status top-right">
            <div className="rounded-xl w-fit grid grid-cols-[0.25fr,1fr]">
              <div className="bg-green-600 p-0 rounded-l-xl"></div>
              <div className="p-5 bg-white border-2 border-green-600">Changes Saved Successfully</div>
            </div>
          </div>
        )}
        {addAlert && (
          <div className="modal-overlay-status top-right">
            <div className="rounded-xl w-fit grid grid-cols-[0.25fr,1fr]">
              <div className="bg-green-600 p-0 rounded-l-xl"></div>
              <div className="p-5 bg-white border-2 border-green-600">Venue Has Been Created Successfully</div>
            </div>
          </div>
        )}
        {editAlert && (
          <div className="modal-overlay-status top-right">
            <div className="rounded-xl w-fit grid grid-cols-[0.25fr,1fr]">
              <div className="bg-green-600 p-0 rounded-l-xl"></div>
              <div className="p-5 bg-white border-2 border-green-600">Venue Has Been Edited Successfully</div>
            </div>
          </div>
        )}
    </div>
  )
}

export default page