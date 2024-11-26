'use client';
import {React , useState} from 'react'
import './page.css'
import Table from '../table/page'
import { Icon } from '@iconify/react'
import { IoIosSearch } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { FaRegCircleCheck } from "react-icons/fa6";
import { MdOutlineDeleteOutline } from "react-icons/md";

function page() {
    const [viewdetails, setViewDetails] = useState(false);

    const openViewDetails = () => {
        setViewDetails(true);
    }
    const closeViewDetails = () => {
        setViewDetails(false);
    }

    const data = [
        {
            name: 'Jane Cooper',
            packageName: 'Wedding Package',
            category: 'Wedding',
            subCategory: 'Luxury',
            venue: 'Four Seasons Hotel',
            view: <button className='btn' onClick={openViewDetails}>View</button>,
        },
        {
            name: 'Jane Cooper',
            packageName: 'Wedding Package',
            category: 'Wedding',
            subCategory: 'Luxury',
            venue: 'Four Seasons Hotel',
            view: <button className='btn'>View</button>,
        },
        {
            name: 'Jane Cooper',
            packageName: 'Wedding Package',
            category: 'Wedding',
            subCategory: 'Luxury',
            venue: 'Four Seasons Hotel',
            view: <button className='btn'>View</button>,
        },
        {
            name: 'Jane Cooper',
            packageName: 'Wedding Package',
            category: 'Wedding',
            subCategory: 'Luxury',
            venue: 'Four Seasons Hotel',
            view: <button className='btn'>View</button>,
        },
      ];
      
      const columns = [
        {
          Header: 'Planner Name',
          accessor: 'name',
        },
        {
            Header:'Package Name',
            accessor:'packageName'
        },
        {
          Header: 'Category',
          accessor: 'category',
        },
        {
            Header: 'Sub Category',
            accessor: 'subCategory',
        },
        {
          Header: 'venue Name',
          accessor: 'venue',
        },
        {
            Header:'',
            accessor:'view'
        }
      ];
  return (
    <div className='page-container'>
        <div className='requests-container'>
            <div className='main-top'>
                <div className='header'>
                <span className='large-font-size bold-font'>Packages Requests</span>
                </div>
                <div className="search-container">
                    <IoIosSearch className="search-icon" />
                    <input type="search" className="search-bar mid-font-size" placeholder="Search" />
                </div>
            </div>
            <hr className='line'/>
            <div className='table-container'>
                <Table columns={columns} data={data} />
            </div>
        </div>
        {viewdetails && (
           <div className='modal-overlay'>
                <div className='modal'>
                    <button className="close-button" onClick={closeViewDetails}><IoClose /></button>
                    <span className='bold-font'>New Package Details</span>
                    <hr className='line'/>
                    <div className="modal-buttons">
                         <button className='btn-package'><FaRegCircleCheck /> Accept</button>
                         <button className='btn-package'> <MdOutlineDeleteOutline /> Reject</button>
                    </div>
                    <div className="modal-details">
                    <div className='modal-img-container-details'>
                        <img src='/venue1.jpg' className='package-img-details'/>
                        <img src='/venue1.jpg' className='package-img-details'/>
                        </div>
                        <div className='modal-package-details '>
                            <span className='large-font-size'>Package Name</span>
                            <span className='mid-font-size'>Planner Name:</span>
                            <span className='mid-font-size'>Category:</span>
                            <span className='mid-font-size'>Sub Category:</span>
                            <span className='mid-font-size'>Venue:</span>
                            <span className='mid-font-size'>Description:</span>
                        </div>
                </div>
              </div>
            </div>
        )}
    </div>
  )
}

export default page