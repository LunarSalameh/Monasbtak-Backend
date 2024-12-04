"use client";

import React, { useState, useEffect } from "react";
import "./page.css";
import Table from "../table/page";
import { IoClose } from "react-icons/io5";

export default function PlannerStatus() {
  const [planners, setPlanners] = useState([]);

  const [acceptModal,setAcceptModal] = useState(false);
  const [rejectModal,setRejectModal] = useState(false);

  const [acceptAlert, setAcceptAlert] = useState(false);
  const [rejectAlert, setRejectAlert] = useState(false);

  const [planner,setPlanner] = useState(null)
  const [userToDelete, setUserToDelete] = useState(null);

  const openAcceptModal = () => {setAcceptModal(true);};
  const closeAcceptModal = () => {setAcceptModal(false);};

  const openRejectModal = () => {setRejectModal(true);};
  const closeRejectModal = () => {setRejectModal(false);};

  const handleAcceptModal =() => {
        closeAcceptModal();
        setAcceptAlert(true);
        setTimeout(() => {
          setAcceptAlert(false);
        }, 2000); 
        setPlanner(null);
        handleStatusChange(planner, "Accepted");
  };

  const handleRejectModal =() => {
      closeRejectModal();
      setRejectAlert(true);
      setTimeout(() => {
        setRejectAlert(false);
      }, 2000); 
      setPlanner(null);
      handleStatusChange(planner, "Rejected");
  };
  

  const handleAcceptPlanner = (username,id) => {
      openAcceptModal();
      setPlanner(id);
      setUserToDelete(username);
  };

  const handleRejectPlanner = (username,id) => {
    openRejectModal();
    setPlanner(id);
    setUserToDelete(username);

};

  useEffect(() => {
    fetch("http://localhost/Monasbtak-Backend/php/api/admin/getPendingPlanners.php") 
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          const formattedData = data.planners.map((planner) => ({
            ...planner,
            resume: planner.resume ? (
              <a
                href={`http://localhost/Monasbtak-Backend/php/api/admin/fileDownload.php?resume=${planner.resume}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
                
              >
                Download Resume
              </a>
            ) : (
              "Not Uploaded"
            ),
            action: (
              <div className="flex flex-row flex-wrap gap-2 justify-start">
                <button
                  className="bg-green-700 text-white rounded-xl py-1.5 px-3 hover:bg-green-500 hover:shadow-xl"
                  onClick={()=>handleAcceptPlanner(planner.username, planner.id)}
                  
                >
                  Accept
                  
                </button>
                <button
                  className="bg-red-600 text-white rounded-xl py-1.5 px-3 hover:bg-red-500 hover:shadow-xl"
                  onClick={()=>handleRejectPlanner(planner.username, planner.id)}
                >
                  Reject
                </button>
              </div>
            ),
          }));
          setPlanners(formattedData);
        } else {
          console.error(data.message || "Failed to fetch planners.");
        }
      })
      .catch((error) => console.error("Error fetching planners:", error));
  }, []);

  // Handle Accept/Reject
  const handleStatusChange = (plannerId, action) => {
    if (!planner) return;

    fetch("http://localhost/Monasbtak-Backend/php/api/admin/postPlannersStatus.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: plannerId,
        action,
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
          // alert(data.message);
           setPlanners((prevPlanners) =>
            prevPlanners.filter((planner) => planner.id !== plannerId)
          );

        } else {
          console.error(data.message || "Failed to update planner status.");
        }
      })
      .catch((error) => console.error("Error updating planner status:", error));
  };

  const columns = [
    { Header: "Planner", accessor: "username" },
    { Header: "Email", accessor: "email" },
    { Header: "Phone Number", accessor: "phonenumber" },
    { Header: "Description", accessor: "description" },
    { Header: "Gender", accessor: "gender" },
    { Header: "Resume", accessor: "resume" },
    { Header: "Status", accessor: "action" },
    ];

  return (
    <div className="page-container">
      <div className="users-container">
        <div className="main-top">
          <div className="header">
            <span className="large-font-size bold-font">Pending Planners</span>
          </div>
        </div>
        <hr className="line" />
        <div className="table-container">
        <Table columns={columns} data={planners} />
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
              <div className="p-5 bg-white  border-2 border-green-600 ">Planner Has Been Accepted</div>
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
              <div className="p-5 bg-white  border-2 border-red-600 ">Planner Has Been Rejected</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
