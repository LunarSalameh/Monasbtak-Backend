import React from 'react'
import './page.css'
import Link from 'next/link';
import { CiLocationOn } from "react-icons/ci";

function page() {
  return (
    <div className='ShowAll-Events-container'>
        <span className='large-font-size font-color bold-font'>All Previous Events</span>
        <hr className='line'/>

        <div className='Event-Types'>
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
  )
}

export default page