"use client";
import React, { useState } from 'react';
import './page.css'
import { IoClose } from "react-icons/io5";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

function PlannerAlbum() {
  const [showModal, setShowModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(null);
  const images = [
    "/wedding.jpg",
    "/wedding2.jpg",
    "/wedding3.jpg",
    "/wedding4.jpg",
    "/wedding5.jpg",
    "/wedding2.jpg",
    "/wedding3.jpg",
    "/wedding4.jpg",
    "/wedding5.jpg",
    "/wedding2.jpg"
  ];

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowRight') {
      setCurrentImageIndex((currentImageIndex + 1) % images.length);
    } else if (event.key === 'ArrowLeft') {
      setCurrentImageIndex((currentImageIndex - 1 + images.length) % images.length);
    }
  };

  const handleCloseImageModal = () => {
    setCurrentImageIndex(null);
  };

  return (
    <div className='Planner-album-container' onKeyDown={handleKeyDown} tabIndex="0">
      <div className='showall'> 
        <span className='XL-font-size font-color bold-font'>Event Album</span>
      </div>
        <hr className='line'/>
        <div className='album-sections'>
          <div className='section' onClick={handleShowModal}>
            <span>Weddings</span>
            <img src="/wedding-category.jpg" className='section-img' />
          </div>
          <div className='section'>
            <span>Graduations</span>
            <img src="/grad1.jpg" className='section-img' />
          </div>
          <div className='section'>
            <span>Maternity</span>
            <img src="/genderRevel.jpg" className='section-img' />
          </div>
          <div className='section'>
            <span>Birthdays</span>
            <img src="/birthdayParty.jpg" className='section-img' />
          </div>
          <div className='section'>
            <span>Formal Events</span>
            <img src="/formalEvent.jpg" className='section-img' />
          </div>
        </div>

{currentImageIndex !== null && (
        <div className="image-modal-overlay">
          <div className="image-modal">
            <button className="close-button" onClick={handleCloseImageModal}><IoClose /></button>
            <button className="prev-button" onClick={() => setCurrentImageIndex((currentImageIndex - 1 + images.length) % images.length)}><IoIosArrowBack /></button>
            <img src={images[currentImageIndex]} className='full-size-img' />
            <button className="next-button" onClick={() => setCurrentImageIndex((currentImageIndex + 1) % images.length)}><IoIosArrowForward /></button>
          </div>
        </div>
      )}
{showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="close-button" onClick={handleCloseModal}><IoClose /></button>
            <span className='XL-font-size font-color bold-font'>Category Name</span>
            <hr className='line'/>
            <div className="modal-content">
              <div className='Modal-Album-container'>
                {images.map((src, index) => (
                  <div className='Modal-Album-img-container' key={index} onClick={() => handleImageClick(index)}>
                    <img src={src} className='Album-img' />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PlannerAlbum