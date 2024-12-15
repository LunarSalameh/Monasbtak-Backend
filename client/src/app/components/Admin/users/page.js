"use client";

import React, { useState, useEffect } from "react";
import "./page.css";
import Table from "../table/page";
import { Icon } from "@iconify/react";
import { IoIosSearch } from "react-icons/io";
import { IoClose } from "react-icons/io5";

function AddPlannerPage() {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  
  const [searchVal, setSearchVal] = useState("");

  const [acceptAlert, setAcceptAlert] = useState(false);
  const [deleteAlert, setDeleteAlert] = useState(false);

  const handleAcceptAlert = () => {
    closeAddPlannerModal();
    setAcceptAlert(true);
    setTimeout(() => {
      setAcceptAlert(false);
    }, 2500); 
  };

  const handleDeleteAlert = () => {
    closeEditModal();
    setDeleteAlert(true);
    setTimeout(() => {
      setDeleteAlert(false);
    }, 2500); 
    handleDeleteUser();
  };


  const [userToDelete, setUserToDelete] = useState(null);
  const [addPlannerModalOpen, setAddPlannerModalOpen] = useState(false);
  const [addPlannerData, setAddPlannerData] = useState({
    username: "",
    email: "",
    pwd: "",
    phonenumber: "",
  });

  // Open and close modals
  const openEditModal = (user) => {
    setEditModalOpen(true);
    setUserToDelete(user);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setUserToDelete(null);
  };

  const openAddPlannerModal = () => {
    setMessage(null)
    setAddPlannerModalOpen(true);
  };

  const closeAddPlannerModal = () => {
    setAddPlannerModalOpen(false);
  };

  // Fetch all users
  useEffect(() => {
    fetch("http://monasbtak.org/php/api/admin/getUsers.php")
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
                onClick={() => openEditModal(user)}
              >
                <Icon icon="hugeicons:delete-02" className="delete-icon" />
              </button>
            ),
          }));
          setUsers(formattedData);
        } else {
          console.error(data.message || "Failed to fetch users.");
        }
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  // Handle add planner submission
  const handleAddPlannerSubmit = (e) => {
    e.preventDefault();

    // Validate inputs
    if (
      !addPlannerData.username ||
      !addPlannerData.email ||
      !addPlannerData.pwd ||
      !addPlannerData.phonenumber
    ) {
      setMessage("All fields are required");
      return;
    }

    fetch("http://monasbtak.org/php/api/admin/addPlanner.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addPlannerData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          // alert(data.message || "Planner added successfully.");
          setAddPlannerData({ username: "", email: "", pwd: "", phonenumber: "" });
          setUsers([...users, { ...addPlannerData, action: "Accepted" }]);
          handleAcceptAlert();
        } else {
          setMessage(data.error || data.message || "An error occurred.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setMessage("Error: " + error.message);
      });
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddPlannerData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle delete user
  const handleDeleteUser = () => {
    if (!userToDelete) return;

    fetch("http://monasbtak.org/php/api/admin/deleteUser.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: userToDelete.username,
        account_type: userToDelete.account_type,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setUsers((prevUsers) =>
            prevUsers.filter((user) => user.username !== userToDelete.username)
          );
          closeEditModal();
        } else {
          console.log(`Error: ${data.message}`);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchVal.toLowerCase()) ||
      user.email.toLowerCase().includes(searchVal.toLowerCase())
  );

  // Table columns
  const columns = [
    { Header: "User Name", accessor: "username" },
    { Header: "Email", accessor: "email" },
    { Header: "Phone Number", accessor: "phonenumber" },
    { Header: "Gender", accessor: "gender" },
    { Header: "Age", accessor: "age" },
    { Header: "Status", accessor: "action" },
    { Header: "Account Type", accessor: "account_type" },
    // { Header: "IsDeleted", accessor: "IsDeleted" },
    { Header: "", accessor: "edit" },
  ];

  return (
    <div className="page-container">
      <div className="users-container">
        <div className="main-top">
          <div className="header">
            <span className="large-font-size bold-font">All Users</span>
            <button className="light-btn mid-font-size" onClick={openAddPlannerModal}>
              Add Planner
              <Icon icon="hugeicons:upload-03" className="end-icon" />
            </button>
          </div>
          <div className="search-container">
            <IoIosSearch className="search-icon" />
            <input
              type="search"
              className="search-bar mid-font-size"
              placeholder="Search"
              onChange={(e) => setSearchVal(e.target.value)}
            />
          </div>
        </div>
        <hr className="line" />
        <div className="table-container">
          <Table columns={columns} data={filteredUsers} />
        </div>
      </div>

      {/* Add Planner Modal */}
      {addPlannerModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="close-button" onClick={closeAddPlannerModal}>
              <IoClose />
            </button>
            <span className="XL-font-size bold-font">Add New Planner</span>
            <hr className="line" />
            <form className="modal-content" onSubmit={handleAddPlannerSubmit}>
              {message && (
                <div className="text-red-600">{message}</div>
              )}
              <div className="Modal-Add-package-container">
                <span>Username</span>
                <input
                  type="text"
                  className="input"
                  name="username"
                  value={addPlannerData.username}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="Modal-Add-package-container">
                <span>Email</span>
                <input
                  type="email"
                  className="input"
                  name="email"
                  value={addPlannerData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="Modal-Add-package-container">
                <span>Phone Number</span>
                <input
                  type="text"
                  className="input"
                  name="phonenumber"
                  value={addPlannerData.phonenumber}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="Modal-Add-package-container">
                <span>Password</span>
                <input
                  type="password"
                  className="input"
                  name="pwd"
                  value={addPlannerData.pwd}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <button className="btn" type="submit">
                Add Planner
              </button>
            </form>
          </div>
        </div>
      )}

        {acceptAlert &&(
          <div className="modal-overlay-status">
            <div className="rounded-xl w-fit grid grid-cols-[0.25fr,1fr]">
              <div className="bg-green-600 p-0 rounded-l-xl"></div>
              <div className="p-5 bg-white  border-2 border-green-600 ">Planner Has Been Added Successfully</div>
            </div>
          </div>
        )}

      {/* Delete User Modal */}
      {editModalOpen && (
        <div className="modal-overlay">
          <div className="modal-delete">
            <button className="close-button" onClick={closeEditModal}>
              <IoClose />
            </button>
            <div className="delete-container-modal">
              <span className="mid-font-size bold-font">
                Are you sure you want to delete <span className="text-[#D9B34D] ">" {userToDelete?.username} " </span>?
              </span>
              <div className="delete-row-flex">
                <button className="btn" onClick={handleDeleteAlert}>
                  Yes
                </button>
                <button className="btn" onClick={closeEditModal}>
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {deleteAlert &&(
          <div className="modal-overlay-status">
            <div className="rounded-xl w-fit grid grid-cols-[0.25fr,1fr]">
              <div className="bg-red-600 p-0 rounded-l-xl"></div>
              <div className="p-5 bg-white  border-2 border-red-600 ">user Has Been Deleted</div>
            </div>
          </div>
        )}
    </div>
  );
}

export default AddPlannerPage;
