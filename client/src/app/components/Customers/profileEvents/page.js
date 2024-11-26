"use client";
import React, { useState } from 'react';
import './page.css';
import { CiLocationOn } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import Link from 'next/link';

function ProfileEvents() {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className='Events-container'>
        <span className='large-font-size font-color bold-font'>Events</span>
        <hr className='line'/>

        <div className='Events-Types'>
            <div className='current-events'>
                <div className='showall'> 
                    <span className='large-font-size font-color bold-font'>Current Events</span>
                    <Link href='/customers/showCurrentEvents'>
                        <span className='small-font-size bold-font Show-Button'>Show All</span>
                    </Link>
                </div>
                <div className='Phone-view'>
                    <div className='Event-Box' onClick={handleShowModal}>
                        <div className='Event-img-container'>
                            <img src="/wedding.jpg" className='Event-img' />
                            <span className='Price-tag'>$99.9</span>
                        </div>
                        <div className='Event-details small-font-size'>
                            <span>Event #1</span>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ultrices ornare augue non tristique.</p>
                            <div className='Event-location'>
                                <div className='row-felx'>
                                    <CiLocationOn />
                                    <span>Location</span>
                                </div>
                                <span>Status</span>
                            </div>
                        </div>
                    </div>

                    <div className='Event-Box'>
                        <div className='Event-img-container'>
                            <img src="/wedding6.jpg" className='Event-img' />
                            <span className='Price-tag'>$99.9</span>
                        </div>
                        <div className='Event-details small-font-size'>
                            <span>Event #1</span>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ultrices ornare augue non tristique. </p>
                            <div className='Event-location'>
                                <div className='row-felx'>
                                    <CiLocationOn />
                                    <span>Location</span>
                                </div>
                                <span>Status</span>
                            </div>
                        </div>
                    </div>

                    <div className='Event-Box'>

                        <div className='Event-img-container'>
                            <img src="/wedding2.jpg" className='Event-img' />
                            <span className='Price-tag'>$99.9</span>
                        </div>

                        <div className='Event-details small-font-size'>
                            <span>Event #1</span>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ultrices ornare augue non tristique. </p>
                            <div className='Event-location'>
                                <div className='row-felx'>
                                    <CiLocationOn />
                                    <span>Location</span>
                                </div>
                                <span>Status</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

                <div className='previous-events'>
                    <div className='showall'> 
                        <span className='large-font-size font-color bold-font'>Previous Events</span> 
                        <Link href='/customers/showPrevEvents'>
                            <span className='small-font-size bold-font Show-Button'>Show All</span>
                        </Link>
                    </div>
                    <div className='Phone-view'>
                        <div className='Event-Box'>
                            <div className='Event-img-container'>
                                <img src="/wedding4.jpg" className='Event-img' />
                                <span className='Price-tag'>$99.9</span>
                            </div>
                            <div className='Event-details small-font-size'>
                                <span>Event #1</span>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ultrices ornare augue non tristique. </p>
                                <div className='Event-location'>
                                    <div className='row-felx'>
                                        <CiLocationOn />
                                        <span>Location</span>
                                    </div>
                                    <span>Status</span>
                                </div>
                            </div>
                        </div>

                        <div className='Event-Box'>
                        <div className='Event-img-container'>
                                <img src="/wedding5.jpg" className='Event-img' />
                                <span className='Price-tag'>$99.9</span>
                            </div>
                            <div className='Event-details small-font-size'>
                                <span>Event #1</span>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ultrices ornare augue non tristique. </p>
                                <div className='Event-location'>
                                    <div className='row-felx'>
                                        <CiLocationOn />
                                        <span>Location</span>
                                    </div>
                                    <span>Status</span>
                                </div>
                            </div>
                        </div>

                        
                    </div>
                </div>
                
            </div>
      

        {showModal && (
          <div className="modal-overlay">
            <div className="modal">
              <button className="close-button" onClick={handleCloseModal}><IoClose /></button>
              <div className="modal-content">
                <span className='large-font-size font-color bold-font'>Event Name</span>
                <hr className='line'/>
                <div className='Modal-Event-Box' >
                    <img src="/wedding.jpg" className='Modal-Event-img' />
                    <div className='Modal-Event-details mid-font-size'>
                        <div className='row-flex'>
                            <div className='Modal-planner-profile'>
                                <img src="/Planner2.jpg" className='Modal-Profile-Image' />
                                <span className='bold-font mid-font-size'>Planner UserName</span>
                            </div>
                            <span className='Modal-Price-tag'>$99.9</span>
                        </div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ultrices ornare augue non tristique.</p>
                        <span>Event Day</span>
                        <span>Event Day</span>
                        <span>Number of attendings </span>
                        <div className='Event-location'>
                            <div className='row-felx'>
                                <CiLocationOn />
                                <span>Location</span>
                            </div>
                            <span>Status</span>
                        </div>
                    </div>
                </div>
            </div>
            </div>
          </div>
        )}
    </div>
  );
}

export default ProfileEvents;