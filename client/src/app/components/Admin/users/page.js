'use client';
import {React , useState} from 'react'
import './page.css'
import Table from '../table/page'
import { Icon } from '@iconify/react'
import { IoIosSearch } from "react-icons/io";
import { IoClose } from "react-icons/io5";


function page() {
  const [Edit, setEdit] = useState(false);

  const openEdit = () => {
      setEdit(true);
  }
  const closeEdit = () => {
    setEdit(false);
  }
  const [AddUser, setAddUser] = useState(false);
    const handleAddUser = () => {
        setAddUser(true);
    };
    const handleCloseAddUser = () => {
        setAddUser(false);
    };
    const data = [
        {
            name: 'Jane Cooper',
            location: 'Amman',
            phone: '0791234567',
            email: 'jane@microsoft.com',
            type: 'Planner',
            image: '/customer_image.jpg',
            edit: <button className='delete-btn-table' onClick={openEdit}><Icon icon="hugeicons:delete-02" className='delete-icon'/></button>,
        },
        {
            name: 'Jane Cooper',
            location: 'Amman',
            phone: '0791234567',
            email: 'jane@microsoft.com',
            type: 'Customer',
            image: '/customer_image.jpg',
            edit: <button className='delete-btn-table' onClick={openEdit}><Icon icon="hugeicons:delete-02" className='delete-icon'/></button>,
        },
        {
            name: 'Jane Cooper',
            location: 'Amman',
            phone: '0791234567',
            email: 'jane@microsoft.com',
            type: 'Planner',
            image: '/customer_image.jpg',
            edit: <button className='delete-btn-table' onClick={openEdit}><Icon icon="hugeicons:delete-02" className='delete-icon'/></button>,
        },
        {
            name: 'Jane Cooper',
            location: 'Amman',
            phone: '0791234567',
            email: 'jane@microsoft.com',
            type: 'Planner',
            image: '/customer_image.jpg',
            edit: <button className='delete-btn-table' onClick={openEdit}><Icon icon="hugeicons:delete-02" className='delete-icon'/></button>,
        },
        {
            name: 'Jane Cooper',
            location: 'Amman',
            phone: '0791234567',
            email: 'jane@microsoft.com',
            type: 'Planner',
            image: '/customer_image.jpg',
            edit: <button className='delete-btn-table' onClick={openEdit}><Icon icon="hugeicons:delete-02" className='delete-icon'/></button>,

        },
        {
            name: 'Jane Cooper',
            location: 'Amman',
            phone: '0791234567',
            email: 'jane@microsoft.com',
            type: 'Customer',
            image: '/customer_image.jpg',
            edit: <button className='delete-btn-table' onClick={openEdit}><Icon icon="hugeicons:delete-02" className='delete-icon'/></button>,

        },
        {
            name: 'Jane Cooper',
            location: 'Amman',
            phone: '0791234567',
            email: 'jane@microsoft.com',
            type: 'Customer',
            image: '/customer_image.jpg',
            edit: <button className='delete-btn-table' onClick={openEdit}><Icon icon="hugeicons:delete-02" className='delete-icon'/></button>,

        },
        {
            name: 'Jane Cooper',
            location: 'Amman',
            phone: '0791234567',
            email: 'jane@microsoft.com',
            type: 'Planner',
            image: '/customer_image.jpg',
            edit: <button className='delete-btn-table' onClick={openEdit}><Icon icon="hugeicons:delete-02" className='delete-icon'/></button>,

        },
      ];
      
      const columns = [
        {
          Header: 'User Name',
          accessor: 'name',
        },
        {
          Header: 'Location',
          accessor: 'location',
        },
        {
            Header: 'Phone Number',
            accessor: 'phone',
        },
        {
          Header: 'Email',
          accessor: 'email',
        },
        {
          Header: 'User Type',
          accessor: 'type',
        },
        {
          Header: 'Profile Image',
          accessor: 'image',
        },
        {
          Header:'',
          accessor: 'edit',
        }
      ];
  return (
    <div className='page-container'>
      <div className='users-container'>
        <div className='main-top'>
            <div className='header'>
            <span className='large-font-size bold-font'>All Users</span>
            <button className='light-btn mid-font-size ' onClick={handleAddUser}>
                Add user
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
          <Table columns={columns} data={data} />
        </div>
      </div>
      {AddUser && (
        <div className="modal-overlay">
        <div className="modal">
          <button className="close-button" onClick={handleCloseAddUser}><IoClose /></button>
          <span className='XL-font-size bold-font'>Add New Planner</span>
          <hr className='line'/>
          <div className="modal-content">
            <div className='Modal-Add-package-container'>
              <span>First Name</span>
              <input type='text' className='input' />
            </div>
            <div className='Modal-Add-package-container'>
              <span>Last Name</span>
              <input type='text' className='input' />
            </div>
            <div className='Modal-Add-package-container'>
              <span>User Type</span>
              <select className='input' >
                <option value=''>Select User Type</option>
                <option value='Planner'>Planner</option>
              </select>
            </div>
            <div className='Modal-Add-package-container'>
              <span>Email</span>
              <input type='email' className='input' />
            </div>
            <div className='Modal-Add-package-container'>
                <span>Password</span>
                <input type='password' className='input' />
            </div>
            <div className='Modal-Add-package-container'>
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
                </div>
            <button className='btn'>
              Add User
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
              <span className='mid-font-size bold-font'>Are you sure you want to delete this user</span>
              <div className='delete-row-flex'>
                <button className='btn'>Yes</button>
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