"use client";
import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { IoClose } from "react-icons/io5";
import './page.css'

function page() {
  const [DeletePackageModal, setDeletePackageModal] = useState(false);
  const handleDeletePackageModal = () => {
    setDeletePackageModal(true);
  };
  const handleCloseDeleteModal = () => {
    setDeletePackageModal(false);
  };


  return (
    <div className='page-container'>
      <div className='event-album-container'>
        <div className='header'>
          <span className='large-font-size bold-font'>Event Album</span>
          <label className='btn'>
            Add Photo
            <Icon icon="hugeicons:upload-03" className='end-icon' />
            <input
              type='file'
              accept='image/*'
              multiple
              style={{ display: 'none' }}
            />
          </label>
        </div>
        <hr className='line'/>
        <div className='Album-container'>
            <div className='Album-img-container'>
              <img src="/wedding.jpg" className='Album-img' />
              <Icon icon="hugeicons:delete-02" className='delete-icon' onClick={handleDeletePackageModal} />
            </div>

            <div className='Album-img-container'>
              <img src="/wedding2.jpg" className='Album-img' />
              <Icon icon="hugeicons:delete-02" className='delete-icon' onClick={handleDeletePackageModal} />
            </div>

            <div className='Album-img-container'>
              <img src="/wedding3.jpg" className='Album-img' />
              <Icon icon="hugeicons:delete-02" className='delete-icon' onClick={handleDeletePackageModal}/>
            </div>

            <div className='Album-img-container'>
              <img src="/wedding4.jpg" className='Album-img' />
              <Icon icon="hugeicons:delete-02" className='delete-icon' onClick={handleDeletePackageModal} />
            </div>

            <div className='Album-img-container'>
              <img src="/wedding5.jpg" className='Album-img' />
              <Icon icon="hugeicons:delete-02" className='delete-icon' onClick={handleDeletePackageModal} />
            </div>

            <div className='Album-img-container'>
              <img src="/wedding6.jpg" className='Album-img' />
              <Icon icon="hugeicons:delete-02" className='delete-icon' onClick={handleDeletePackageModal}/>
            </div>  
            <div className='Album-img-container'>
              <img src="/wedding3.jpg" className='Album-img' />
              <Icon icon="hugeicons:delete-02" className='delete-icon' onClick={handleDeletePackageModal}/>
            </div>

            <div className='Album-img-container'>
              <img src="/wedding4.jpg" className='Album-img' />
              <Icon icon="hugeicons:delete-02" className='delete-icon' onClick={handleDeletePackageModal}/>
            </div>

            <div className='Album-img-container'>
              <img src="/wedding5.jpg" className='Album-img' />
              <Icon icon="hugeicons:delete-02" className='delete-icon' onClick={handleDeletePackageModal}/>
            </div>

            <div className='Album-img-container'>
              <img src="/wedding6.jpg" className='Album-img' />
              <Icon icon="hugeicons:delete-02" className='delete-icon' onClick={handleDeletePackageModal}/>
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
  )
}

export default page