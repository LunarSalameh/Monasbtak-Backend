"use client";

import React, { useState, useEffect } from "react";
import './page.css'
import Table from '../table/page'
import { Icon } from '@iconify/react'
import { IoIosSearch } from "react-icons/io";
import { IoClose } from "react-icons/io5";


function page() {
  const [Edit, setEdit] = useState(false);
  const [Users, setAllUsers] = useState([]);

  const [DeleteUser, setDeleteUser] = useState(null); 

  const openEdit = (user) => {
    setEdit(true);
    setDeleteUser(user);
  };

  const closeEdit = () => {
    setEdit(false);
    setDeleteUser(null); 
  };

  const [Addplanner, setAddPlanner] = useState(false);

  const handleAddPlanner = () => {
    setAddPlanner(true);
  };
  const handleCloseAddPlanner = () => {
    setAddPlanner(false);
  };

  useEffect(() => {
    fetch("http://localhost/Monasbtak-Backend/php/api/admin/getUsers.php")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          const formattedData = data.users.map((user) => ({
            ...user,
            edit: (
              <button
                className="delete-btn-table"
                onClick={() => openEdit(user)} 
              >
                <Icon icon="hugeicons:delete-02" className="delete-icon" />
              </button>
            ),
          }));
          setAllUsers(formattedData);
        } else {
          console.error(data.message || "Failed to fetch users.");
        }
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const handleDeleteUser = () => {
    if (!DeleteUser) return;

    fetch("http://localhost/Monasbtak-Backend/php/api/admin/deleteUser.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: DeleteUser.username,
        account_type: DeleteUser.account_type,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          // alert(data.message);
          setAllUsers((prevUsers) =>
            prevUsers.filter((user) => user.username !== DeleteUser.username)
          );  
          closeEdit();
        } else {
          alert(`Error: ${data.message}`);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const columns = [
    { Header: "User Name", accessor: "username" },
    { Header: "Email", accessor: "email" },
    { Header: "Phone Number", accessor: "phonenumber" },
    { Header: "Gender", accessor: "gender" },
    { Header: "Age", accessor: "age" },
    { Header: "Status", accessor: "action" },
    { Header: "Account Type", accessor: "account_type" },
    { Header: "", accessor: "edit" },
  ];

  return (
    <div className='page-container'>
      <div className='users-container'>
        <div className='main-top'>
            <div className='header'>
            <span className='large-font-size bold-font'>All Users</span>
            <button className='light-btn mid-font-size ' onClick={handleAddPlanner}>
                Add Planner
                <Icon icon="hugeicons:upload-03" className='end-icon' />
            </button>
            </div>
            <div className="search-container">
                <IoIosSearch className="search-icon" />
                <input type="search" className="search-bar mid-font-size" placeholder="Search" />
            </div>
        </div>
        <hr className='line'/>
        <div className='table-container'>
          <Table columns={columns} data={Users} />
        </div>
      </div>
      {Addplanner && (
        <div className="modal-overlay">
        <div className="modal">
          <button className="close-button" onClick={handleCloseAddPlanner}><IoClose /></button>
          <span className='XL-font-size bold-font'>Add New Planner</span>
          <hr className='line'/>
          <div className="modal-content">
            
            {/** USERNAME */}
            <div className='Modal-Add-package-container'>
              <span>Username</span>
              <input type='text' className='input' />
            </div>
            {/* <div className='Modal-Add-package-container'>
              <span>User Type</span>
              <select className='input' >
                <option value=''>Select User Type</option>
                <option value='Planner'>Planner</option>
              </select>
            </div> */}

            {/** EMAIL */}
            <div className='Modal-Add-package-container'>
              <span>Email</span>
              <input type='email' className='input' />
            </div>

              {/** PASSWORD */}
            <div className='Modal-Add-package-container'>
                <span>Password</span>
                <input type='password' className='input' />
            </div>


            {/* <div className='Modal-Add-package-container'>
                  <span>Date of Birth</span>
                  <div className='dob-container'>
                    <input type='number' className='input dob-input' placeholder='DD' min='1' max='31' />
                    <select className='input dob-input'>
                    <option value=''>MM</option>
                    <option value='1'>January</option>
                    <option value='2'>February</option>
                    <option value='3'>March</option>
                    <option value='4'>April</option>
                    <option value='5'>May</option>
                    <option value='6'>June</option>
                    <option value='7'>July</option>
                    <option value='8'>August</option>
                    <option value='9'>September</option>
                    <option value='10'>October</option>
                    <option value='11'>November</option>
                    <option value='12'>December</option>
                  </select>
                    <input type='number' className='input dob-input' placeholder='YYYY' min='1940' max={new Date().getFullYear()} />
                  </div>
              </div> */}

              {/* SUBMIT PLANNER */}
            <button className='btn'>
              Add Planner
            </button>
          </div>
        </div>
      </div>
      )}
      {Edit && (
        <div className="modal-overlay">
          <div className="modal-delete">
            <button className="close-button" onClick={closeEdit}><IoClose /></button>
            <div className='delete-container-modal'>
              <span className='mid-font-size bold-font'>Are you sure you want to delete {DeleteUser?.username}?</span>
              <div className='delete-row-flex'>
                <button className='btn' onClick={handleDeleteUser}>Yes</button>
                <button className='btn' onClick={closeEdit}>No</button>
              </div>
            </div>
          </div>
        </div>
        )}
    </div>
  )
}

export default page