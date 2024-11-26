import React from 'react'
import './page.css'
import { IoIosSearch } from "react-icons/io";

function page() {
  return (
    <div className='page-container'>
        <div className='requests-container'>
        <div className='main-top'>
            <div className='header'>
            <span className='large-font-size bold-font'>Available Packages</span>
            </div>
            <div className="search-container">
                <IoIosSearch className="search-icon" />
                <input type="search" className="search-bar mid-font-size" placeholder="Search" />
            </div>
        </div>
        <hr className='line'/>
        <div className='available-content'>
            <a href='/admin/PlannerPackages'>
            <div className='available-box'>
                <img src='/Planner1.jpg' alt='Planner1' className='available-img'/>
                <span className='mid-font-size'>Planner Name</span>
            </div>
            </a>
            <div className='available-box'>
                <img src='/Planner1.jpg' alt='Planner1' className='available-img'/>
                <span className='mid-font-size'>Planner Name</span>
            </div>
            <div className='available-box'>
                <img src='/Planner1.jpg' alt='Planner1' className='available-img'/>
                <span className='mid-font-size'>Planner Name</span>
            </div>
            <div className='available-box'>
                <img src='/Planner1.jpg' alt='Planner1' className='available-img'/>
                <span className='mid-font-size'>Planner Name</span>
            </div>
            <div className='available-box'>
                <img src='/Planner1.jpg' alt='Planner1' className='available-img'/>
                <span className='mid-font-size'>Planner Name</span>
            </div>
            <div className='available-box'>
                <img src='/Planner1.jpg' alt='Planner1' className='available-img'/>
                <span className='mid-font-size'>Planner Name</span>
            </div>
            <div className='available-box'>
                <img src='/Planner1.jpg' alt='Planner1' className='available-img'/>
                <span className='mid-font-size'>Planner Name</span>
            </div>
            <div className='available-box'>
                <img src='/Planner1.jpg' alt='Planner1' className='available-img'/>
                <span className='mid-font-size'>Planner Name</span>
            </div> <div className='available-box'>
                <img src='/Planner1.jpg' alt='Planner1' className='available-img'/>
                <span className='mid-font-size'>Planner Name</span>
            </div>
            <div className='available-box'>
                <img src='/Planner1.jpg' alt='Planner1' className='available-img'/>
                <span className='mid-font-size'>Planner Name</span>
            </div>
            <div className='available-box'>
                <img src='/Planner1.jpg' alt='Planner1' className='available-img'/>
                <span className='mid-font-size'>Planner Name</span>
            </div>
        </div>
        </div>
        </div>
  )
}

export default page