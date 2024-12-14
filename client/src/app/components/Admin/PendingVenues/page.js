"use client";

import React, { useState, useEffect } from "react";
import "./page.css";
import Table from "../table/page";
import { IoClose } from "react-icons/io5";

export default function PlannerVenues() {
  const [venues, setVenues] = useState([]);
  const [venue, setVenue] = useState([]);

  const [acceptModal,setAcceptModal] = useState(false);
  const [rejectModal,setRejectModal] = useState(false);

  const [acceptAlert, setAcceptAlert] = useState(false);
  const [rejectAlert, setRejectAlert] = useState(false);
  
  const [userToDelete, setUserToDelete] = useState(null);

  const openAcceptModal = () => {setAcceptModal(true);};
  const closeAcceptModal = () => {setAcceptModal(false);};

  const openRejectModal = () => {setRejectModal(true);};
  const closeRejectModal = () => {setRejectModal(false);};

  const handleAcceptModal =() => {
    console.log ("handle accept modal");
        closeAcceptModal();
        setAcceptAlert(true);
        setTimeout(() => {
          setAcceptAlert(false);
        }, 2000); 
        setVenue(null);
        handleStatusChange(venue, "Accepted");
  };

  const handleRejectModal =() => {
      closeRejectModal();
      setRejectAlert(true);
      setTimeout(() => {
        setRejectAlert(false);
      }, 2000); 
      setVenue(null);
      handleStatusChange(venue, "Rejected");
  };
  

  const handleAcceptVenue = (username,id) => {
      openAcceptModal();
      setVenue(id);
      setUserToDelete(username);
  };

  const handleRejectVenue = (username,id) => {
    openRejectModal();
    setVenue(id);
    setUserToDelete(username);

};
  
  // Handle Accept/Reject
  const handleStatusChange = (venueId, status) => {
    console.log(`venueId: ${venueId}`)
    if (!venue) return;

    fetch("http://localhost/Monasbtak-Backend/php/api/admin/venues/postPendingVenues.php", {
        method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: venueId,
        status,
      }),
      
    })
    
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Response data:", data); 
        if (data.success) {
           setVenues((prevVenues) =>
            prevVenues.filter((venue) => venue.id !== venueId)
          );

        } else {
          console.error(data.message || "Failed to update venue status.");
        }
      })
      .catch((error) => console.error("Error updating venue status:", error));
  };


// get pending venues
useEffect(() => {
  fetch("http://localhost/Monasbtak-Backend/php/api/admin/venues/getPendingVenues.php") 
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      if (data.success) {
        const formattedData = data.venues.map((venue) => ({
          ...venue,
          status: (
            <div className="flex flex-row flex-wrap gap-2 justify-start">
              <button
                className="bg-green-700 text-white rounded-xl py-1.5 px-3 hover:bg-green-500 hover:shadow-xl"
                onClick={()=>handleAcceptVenue(venue.name, venue.id)}
                
              >
                Accept
                
              </button>
              <button
                className="bg-red-600 text-white rounded-xl py-1.5 px-3 hover:bg-red-500 hover:shadow-xl"
                onClick={()=>handleRejectVenue(venue.name, venue.id)}
              >
                Reject
              </button>
            </div>
          ),
        }));
        setVenues(formattedData);
      } else {
        console.error(data.message || "Failed to fetch Venues.");
      }
    })
    .catch((error) => console.error("Error fetching Venues:", error));
}, []);

  const columns = [
    { Header: "Venue", accessor: "name" },
    { Header: "Location", accessor: "location" },
    { Header: "Description", accessor: "description" },
    { Header: "Status", accessor: "status" },
    ];

  return (
    <div className="page-container">
      <div className="users-container">
        <div className="main-top">
          <div className="header">
            <span className="large-font-size bold-font">Pending Venues</span>
          </div>
        </div>
        <hr className="line" />
        <div className="table-container">
          <Table columns={columns} data={venues} />
        </div>

        {/** ACCEPT MODAL */}
        {acceptModal &&(
            <div className="modal-overlay">
              <div className="modal">
                  <div className="modal-content">
                    <button className="close-button" onClick={closeAcceptModal}><IoClose /></button>
                    <div className="flex flex-wrap font-bold text-xl justify-center text-center"> Are you sure you want to ACCEPT <span className="text-[#D9B34D] ">&nbsp;" {userToDelete} "&nbsp;</span>? </div>
                    <div className='flex gap-5 justify-between w-[20%] items-center '>
                      <button className='btn'
                              onClick={handleAcceptModal}>
                                Yes</button>
                      <button className='btn' onClick={closeAcceptModal}>No</button>
                    </div>
                  </div>
                </div>
            </div>
        )}
        {acceptAlert &&(
          <div className="modal-overlay-status">
            <div className="rounded-xl w-fit grid grid-cols-[0.25fr,1fr]">
              <div className="bg-green-600 p-0 rounded-l-xl"></div>
              <div className="p-5 bg-white  border-2 border-green-600 ">Venue Has Been Accepted</div>
            </div>
          </div>
        )}

        {/** REJECT MODAL */}
        {rejectModal &&(
            <div className="modal-overlay">
              <div className="modal">
                  <div className="modal-content">
                    <button className="close-button" onClick={closeRejectModal}><IoClose /></button>
                    <div className="flex  flex-wrap font-bold text-xl justify-center text-center"> Are you sure you want to REJECT <span className="text-[#D9B34D] ">&nbsp;" {userToDelete} "&nbsp;</span>? </div>
                    <div className='flex  gap-5  justify-between w-[20%] items-center '>
                      <button className='btn'
                              onClick={handleRejectModal}>
                                Yes</button>
                      <button className='btn' onClick={closeRejectModal}>No</button>
                    </div>
                  </div>
                </div>
            </div>
        )}
        {rejectAlert &&(
          <div className="modal-overlay-status">
            <div className="rounded-xl w-fit grid grid-cols-[0.25fr,1fr]">
              <div className="bg-red-600 p-0 rounded-l-xl"></div>
              <div className="p-5 bg-white  border-2 border-red-600 ">Venue Has Been Rejected</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
