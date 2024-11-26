
'use client';
import {React , useState} from 'react'
import { IoIosSearch } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { FaRegCircleCheck } from "react-icons/fa6";
import { MdOutlineDeleteOutline } from "react-icons/md";
import './page.css'
import Table from '../table/page'



export default function Events () {

    const data = [
       
         {
            customerName: 'Jane Cooper',
            plannerName: 'Jacob Jones',
            venue: 'Four Seasons Hotel',
            package: "Package A",
            location: "Amman",
            details: "lorem ibsum ...",
            status: <div className='w-fit text-center text-white py-1 px-3 rounded-full bg-red-700 max-sm:text-[12px]'>Rejected</div>
         },
         {
            customerName: 'Jane Cooper',
            plannerName: 'Jacob Jones',
            venue: 'Four Seasons Hotel',
            package: "Package A",
            location: "Amman",
            details: "lorem ibsum ...",
            status: <div className='w-fit  text-center text-white py-1 px-3 rounded-full bg-yellow-600 max-sm:text-[12px]'>Finished</div>
         },
         {
            customerName: 'Jane Cooper',
            plannerName: 'Jacob Jones',
            venue: 'Four Seasons Hotel',
            package: "Package A",
            location: "Amman",
            details: "lorem ibsum ...",
            status: <div className='w-fit text-center text-white py-1 px-3 rounded-full bg-gray-500 max-sm:text-[12px]'>Canceled</div>
         },
         {
            customerName: 'Jane Cooper',
            plannerName: 'Jacob Jones',
            venue: 'Four Seasons Hotel',
            package: "Package A",
            location: "Amman",
            details: "lorem ibsum ...",
            status: <div className='w-fit text-center text-white py-1 px-3 rounded-full bg-gray-500 max-sm:text-[12px]'>Canceled</div>
         },
        
         {
            customerName: 'Jane Cooper',
            plannerName: 'Jacob Jones',
            venue: 'Four Seasons Hotel',
            package: "Package A",
            location: "Amman",
            details: "lorem ibsum ...",
            status: <div className='w-fit text-center text-white py-1 px-3 rounded-full bg-blue-600 max-sm:text-[12px]'>In Progress</div>
         },
        
         {
            customerName: 'Jane Cooper',
            plannerName: 'Jacob Jones',
            venue: 'Four Seasons Hotel',
            package: "Package A",
            location: "Amman",
            details: "lorem ibsum ...",
            status: <div className='w-fit text-center text-white py-1 px-3 rounded-full bg-blue-600 max-sm:text-[12px]'>In Progress</div>
         },
                 {
            customerName: 'Jane Cooper',
            plannerName: 'Jacob Jones',
            venue: 'Four Seasons Hotel',
            package: "Package A",
            location: "Amman",
            details: "lorem ibsum ...",
            status: <div className='w-fit text-center text-white py-1 px-3 rounded-full bg-green-800 max-sm:text-[12px]'>Approved</div>
         },
         {
            customerName: 'Jane Cooper',
            plannerName: 'Jacob Jones',
            venue: 'Four Seasons Hotel',
            package: "Package A",
            location: "Amman",
            details: "lorem ibsum ...",
            status: <div className='w-fit text-center text-white py-1 px-3 rounded-full bg-orange-600 max-sm:text-[12px]'>Pending</div>
         },
         {
            customerName: 'Jane Cooper',
            plannerName: 'Jacob Jones',
            venue: 'Four Seasons Hotel',
            package: "Package A",
            location: "Amman",
            details: "lorem ibsum ...",
            status: <div className='w-fit text-center text-white py-1 px-3 rounded-full bg-red-700 max-sm:text-[12px]'>Rejected</div>
         },
         {
            customerName: 'Jane Cooper',
            plannerName: 'Jacob Jones',
            venue: 'Four Seasons Hotel',
            package: "Package A",
            location: "Amman",
            details: "lorem ibsum ...",
            status: <div className='w-fit text-center text-white py-1 px-3 rounded-full bg-green-800 max-sm:text-[12px]'>Approved</div>
         },
         {
            customerName: 'Jane Cooper',
            plannerName: 'Jacob Jones',
            venue: 'Four Seasons Hotel',
            package: "Package A",
            location: "Amman",
            details: "lorem ibsum ...",
            status: <div className='w-fit  text-center text-white py-1 px-3 rounded-full bg-orange-600 max-sm:text-[12px]'>Pending</div>
         },
         {
            customerName: 'Jane Cooper',
            plannerName: 'Jacob Jones',
            venue: 'Four Seasons Hotel',
            package: "Package A",
            location: "Amman",
            details: "lorem ibsum ...",
            status: <div className='w-fit text-center text-white py-1 px-3 rounded-full bg-yellow-600 max-sm:text-[12px]'>Finished</div>
         },
      ];
      
      const columns = [
        {
          Header: 'Customer',
          accessor: 'customerName',
        },
        {
            Header:'planner',
            accessor:'plannerName'
        },
        {
            Header: 'Venue',
            accessor: 'venue',
          },
        {
          Header: 'Package',
          accessor: 'package',
        },
        {
            Header: 'Location',
            accessor: 'location',
        },

        {
            Header:'Details',
            accessor:'details'
        },

        {
            Header:'Status',
            accessor:'status'
        },

      ];


    return (
        <div className="page-container">
            <div className="event-container">
                
                <div className='main-top'>
                    <div className="header">
                        <span className="large-font-size bold-font"> All Events</span>
                    </div>

                    <div className="search-container">
                        <IoIosSearch className="search-icon"/>
                        <input type="search" className="search-bar mid-font-size" placeholder="Search" />
                    </div>
                </div>

                <hr className='line'/>
                <div className='table-container'>
                    <Table columns={columns} data={data} />
                </div>
            </div>
            
        </div>
    )
}