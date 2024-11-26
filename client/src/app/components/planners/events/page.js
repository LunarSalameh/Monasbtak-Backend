"use client";

import {React} from "react";
import { IoIosSearch } from "react-icons/io";
import Table from '../../../components/Admin/table/page'

import './page.css'

export default function AllEventsPlanner () {
    
const EventsTable = [
    {
      customerName: "omar",
      venue: "talabay",
      package: "A",
      location: "Amman",
      details: "Lorem Ibsum ...",
      status: <div className='w-fit text-center text-white py-1 px-3 rounded-full bg-red-700 max-sm:text-[12px]'>Rejected</div>,
      
    },
    {
      customerName: "omar",
      venue: "talabay",
      package: "A",
      location: "Amman",
      details: "Lorem Ibsum ...",
      status: <div className='w-fit  text-center text-white py-1 px-3 rounded-full bg-yellow-600 max-sm:text-[12px]'>Finished</div>,
    },
    {
      customerName: "omar",
      venue: "talabay",
      package: "A",
      location: "Amman",
      details: "Lorem Ibsum ...",
      status: <div className='w-fit text-center text-white py-1 px-3 rounded-full bg-gray-500 max-sm:text-[12px]'>Canceled</div>,
    },
    {
      customerName: "omar",
      venue: "talabay",
      package: "A",
      location: "Amman",
      details: "Lorem Ibsum ...",
      status: <div className='w-fit text-center text-white py-1 px-3 rounded-full bg-blue-600 max-sm:text-[12px]'>In Progress</div>,
    },
    {
      customerName: "omar",
      venue: "talabay",
      package: "A",
      location: "Amman",
      details: "Lorem Ibsum ...",
      status: <div className='w-fit text-center text-white py-1 px-3 rounded-full bg-green-800 max-sm:text-[12px]'>Approved</div>,
    },
    {
      customerName: "omar",
      venue: "talabay",
      package: "A",
      location: "Amman",
      details: "Lorem Ibsum ...",
      status: <div className='w-fit text-center text-white py-1 px-3 rounded-full bg-orange-600 max-sm:text-[12px]'>Pending</div>,
    },
    {
      customerName: "omar",
      venue: "talabay",
      package: "A",
      location: "Amman",
      details: "Lorem Ibsum ...",
      status: <div className='w-fit text-center text-white py-1 px-3 rounded-full bg-gray-500 max-sm:text-[12px]'>Canceled</div>,
    },
    {
      customerName: "omar",
      venue: "talabay",
      package: "A",
      location: "Amman",
      details: "Lorem Ibsum ...",
      status: <div className='w-fit text-center text-white py-1 px-3 rounded-full bg-blue-600 max-sm:text-[12px]'>In Progress</div>,
    },
    {
      customerName: "omar",
      venue: "talabay",
      package: "A",
      location: "Amman",
      details: "Lorem Ibsum ...",
      status: <div className='w-fit text-center text-white py-1 px-3 rounded-full bg-green-800 max-sm:text-[12px]'>Approved</div>,
    },
    {
      customerName: "omar",
      venue: "talabay",
      package: "A",
      location: "Amman",
      details: "Lorem Ibsum ...",
      status: <div className='w-fit text-center text-white py-1 px-3 rounded-full bg-orange-600 max-sm:text-[12px]'>Pending</div>,
    },
  ];

  
  const columns = [
    {
      Header: 'Customer',
      accessor: 'customerName',
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
              <Table columns={columns} data={EventsTable} />
          </div>
      </div>
      
  </div>
    )
}

