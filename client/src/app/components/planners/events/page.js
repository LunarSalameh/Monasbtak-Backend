"use client";
import {React , useState, useEffect} from "react";
import { IoIosSearch } from "react-icons/io";
import Table from '../../../components/Admin/table/page'
import { useSearchParams } from 'next/navigation';
import { MdDelete } from "react-icons/md";
import { OrbitProgress } from 'react-loading-indicators';

import './page.css'

export default function AllEventsPlanner () {
    const searchParams = useSearchParams();
    const id = searchParams.get('id'); 
    const [userId, setUserId] = useState(id);
    const [events, setEvents] = useState([]);
    const [loadingCurrent, setLoadingCurrent] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [openModal,setOpenModal] = useState(false);
    const [deletedEvent, setDeletedEvent] = useState(null);
    const [changeStatus,setChangeStatus] = useState(false);
    const [acceptAlert, setAcceptAlert] = useState(false);

    const handleAcceptAlert = () => {
      setOpenModal(false);
      setAcceptAlert(true);
      setTimeout(() => {
        setAcceptAlert(false);
      }, 2500); 
    };

    const handleChangeStatusAlert = () => {
      setChangeStatus(true);
      setTimeout(() => {
        setChangeStatus(false);
      }, 2500); 
    };

  useEffect(() => {
    const fetchCurrentEvents = async () => {
        try {
            setUserId(id); // Set userId in state
            const response = await fetch(`http://monasbtak.org/php/api/planner/events/getAll.php?planner_Id=${id}`);
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const text = await response.text();
            const result = text ? JSON.parse(text) : {};

            if (result.status === 'success') {
                const eventsWithDetails = await Promise.all(result.data.map(async (event) => {
                  console.log('Fetched Events:', event.id);
                    const id = event.id;
                    // console.log('Fetched id:', id);
                    const packageDetails = await fetchPackagesDetails(event.package_id);
                    const customerName = await fetchCustomerName(event.user_Id);
                    console.log("return : ", {...event, ...packageDetails, customer_name: customerName, id })
                    return {...event, ...packageDetails, customer_name: customerName, id  };
                }));
                setEvents(eventsWithDetails);
            } else {
                setEvents([]); // Set events to an empty array if no events found
            }
            setLoadingCurrent(false);
        } catch (error) {
            console.error("Error fetching events:", error);
            setLoadingCurrent(false);
        }
    };

    fetchCurrentEvents();
}, [id]);

const fetchCustomerName = async (userId) => {
    try {
        const response = await fetch(`http://monasbtak.org/php/api/customer/profile.php?id=${userId}`);
        const result = await response.json();
        if (result.success && result.user) {
            return result.user.username;
        }
        return 'Unknown';
    } catch (error) {
        console.error("Error fetching customer name:", error);
        return 'Unknown';
    }
};

const fetchPackagesDetails = async (packageId) => {
    try {
      const response = await fetch(`http://monasbtak.org/php/api/customer/getPackage.php?id=${packageId}`);
      const result = await response.json();
      if (result.status === 'success' && result.data.length > 0) {
        const packageDetails = result.data[0];
        return {
          ...packageDetails,
          image: `data:image/jpeg;base64,${packageDetails.image}`,
        };
      }
      return {};
    } catch (error) {
      console.error("Error fetching package details:", error);
      return {};
    }
  }

  const handleStatusChange = async (event_Id, status) => {
    try {
      const response = await fetch(`http://monasbtak.org/php/api/planner/events/postEventsStatus.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planner_Id: id,
          event_Id,
          status: status,
        }),
      });
  
      const result = await response.json();
  
      if (result.status === 'success') {
        // Update the event status locally
        setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === event_Id ? { ...event, status }: event )
      );
        handleChangeStatusAlert();
        // alert('Status updated successfully!');
      } else {
        console.error(result.message);
        // alert('Failed to update status. Please try again.');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const handleDeleteEvent = async () => {
    try {
      const response = await fetch(`http://monasbtak.org/php/api/planner/events/deleteEvent.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          event_Id: deletedEvent,
        }),
      });
  
      const result = await response.json();
  
      if (result.status === 'success') {
        // Remove the deleted event from the state
        setEvents((prevEvents) => prevEvents.filter(event => event.id !== deletedEvent));
        handleAcceptAlert(); // Show the success alert
      } else {
        console.error(result.message);
        // alert('Failed to delete event. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting event:', error);
      alert('An error occurred. Please try again.');
    }
};

  
  
  const columns = [
    { Header: 'id', accessor: 'id' },
    { Header: 'Customer', accessor: 'customerName' },
    { Header: 'Package', accessor: 'package' },
    { Header: 'Location', accessor: 'location' },
    { Header:'Date & Time', accessor:'details' },
    { Header:'Attendings',  accessor:'attendings' },
    { Header:'Status', accessor:'status',      
      Cell: ({ row }) => (
      <div className="flex gap-3 justify-center">
           <div className={`w-1/2 text-center text-white py-1 px-4 rounded-full max-sm:text-[12px] ${
                    row.original.status === 'canceled' ? 'bg-gray-500' :
                    row.original.status === 'pending' ? 'bg-orange-600' :
                    row.original.status === 'accepted' ? 'bg-green-800' :
                    row.original.status === 'rejected' ? 'bg-red-700' :
                    row.original.status === 'in progress' ? 'bg-blue-600' :
                    row.original.status === 'finished' ? 'bg-yellow-600' : ''
                  }`}>
                    {row.original.status}
            </div>
      <select 
        // value={row.original.status} 
        onChange={(e) => handleStatusChange(row.original.id, e.target.value)}
        className="status-dropdown"
        defaultValue="Change Status"
      >
        <option value="Change Status" disabled>Change Status</option>
        <option value="pending">Pending</option>
        <option value="accepted">Accepted</option>
        <option value="rejected">Rejected</option>
        <option value="canceled">Canceled</option>
        <option value="in progress">In Progress</option>
        <option value="finished">Finished</option>
      </select>
      </div>
    )  },
    { Header:'Edit', accessor:'edit'}
  ];

  const filteredEvents = events.filter(event => 
    event.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    `${event.eventDay} - ${event.eventTime}`.toLowerCase().includes(searchTerm.toLowerCase())
);

    return (
      <div className="page-container">
      <div className="event-container">
          
          <div className='main-top'>
              <div className="header">
                  <span className="large-font-size bold-font"> All Events</span>
              </div>

              <div className="search-container">
                  <IoIosSearch className="search-icon"/>
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
          <div className='table-container'>
          {loadingCurrent ? (
                    <div className='flex w-full justify-center justify-items-center'>
                      <OrbitProgress variant="track-disc" speedPlus="1" easing="linear" color="#D9B349" />
                    </div>
                ) : (
                    Array.isArray(filteredEvents) && filteredEvents.length > 0 ? (
              <Table columns={columns} data={filteredEvents.map((event, index) => ({
                id: event.id, 
                customerName: event.customer_name,
                package: event.name,
                location: event.location,
                details: `${event.eventDay} - ${event.eventTime}`,
                attendings: event.attendings,
                status: event.status,
                edit: (
                <div className=" flex justify-center" onClick={()=>{
                    setOpenModal(true);
                    setDeletedEvent(event.id);
                  }}
                  >
                    <MdDelete size={20}/>
                </div>)
              }))} />
            ) : (
              <div className="text-center">No events found</div>
            )
          )}
          </div>
      </div>
      {openModal && (
        <div className="fixed inset-0 flex items-center justify-center  bg-black bg-opacity-50 z-50">
          <div className="bg-white w-[30%] p-5 rounded-lg text-center">
          <p className="text-xl">Are you sure you want to delete this category?</p>
              <div className="flex justify-center gap-3 mt-4">
              <button
                className="bg-[#d9b34d] hover:bg-[#d9b44dc1] w-fit px-3 py-1 rounded-lg text-white"
                onClick={handleDeleteEvent}
              >
                  Delete
              </button>
              <button
                className="bg-[#d9b34d] hover:bg-[#d9b44dc1] w-fit px-3 py-1 rounded-lg text-white"
                onClick={()=>setOpenModal(false)}
              >
                Cancel
              </button>
              </div>
            </div>
        </div>
      )}

      {acceptAlert &&(
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-end items-start p-8 z-50">
            <div className="rounded-xl w-fit grid grid-cols-[0.25fr,1fr]">
              <div className="bg-green-600 p-0 rounded-l-xl"></div>
              <div className="p-5 bg-white  border-2 border-green-600 ">Event Has been deleted</div>
            </div>
          </div>
        )}

      {changeStatus &&(
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-end items-start p-8 z-50">
            <div className="rounded-xl w-fit grid grid-cols-[0.25fr,1fr]">
              <div className="bg-green-600 p-0 rounded-l-xl"></div>
              <div className="p-5 bg-white  border-2 border-green-600 ">Status Has been updated</div>
            </div>
          </div>
        )}
  </div>
    )
}

