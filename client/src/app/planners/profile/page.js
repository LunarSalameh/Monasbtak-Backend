"use client";

import TopSection from "../../components/planners/topSection/page";
import Sidebar from "../../components/sidebar/page";
import {React, useState, useEffect} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { TiDelete } from "react-icons/ti";
import { useSearchParams } from 'next/navigation';


import './page.css'
import { fail } from "assert";

export default function Profile () {
    const searchParams = useSearchParams();
    const id = searchParams.get('id'); // Get user ID from the query parameters

    const [EditProfile, setEditProfile] = useState(false);

    const [acceptAlert, setAcceptAlert] = useState(false);
    const [failureAlert, setFailureAlert] = useState(false);

    
    const [profileData,setProfileData] = useState(
            {
                username: "",
                email: "",
                phonenumber: "",
                age: "",
                description: "",
            }
        )
    // const  [planner,setPlanner] = useState(null);

    const [EditCategoriesModal, setEditCategoriesModal] = useState(false)
    const [EditVenuesModal, setEditVenuesModal] = useState(false)

    const [changePasswordModal, setChangePasswordModal] = useState(false)

    const [newCategory, setNewCategory] = useState("");
    const [newVenue, setNewVenue] = useState("");


    const handleCategoriesModal = () => {
        setEditCategoriesModal(!EditCategoriesModal)
    }

    const handleVenuesModal = () => {
        setEditVenuesModal(!EditVenuesModal)
    }

    const handlePasswordModal = () => {
        setChangePasswordModal(!changePasswordModal)
    }

    const handleAcceptAlert = () => {
        setAcceptAlert(true);
        setTimeout(() => {
          setAcceptAlert(false);
        }, 2500); 
      };

      const handleFailureAlert = () => {
        setFailureAlert(true);
        setTimeout(() => {
          setFailureAlert(false);
        }, 2500); 
      };

    const handleProfileModal = () => {
        if (EditProfile) {
            // Send updated profile data to the server
            fetch(`http://localhost/Monasbtak-Backend/php/api/planner/editProfile.php?id=${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(profileData),
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.success) {
                        alert('Profile updated successfully!');
                        handleAcceptAlert();
                    } else {
                        alert('Failed to update profile');
                        handleFailureAlert();
                    }
                })
                .catch((error) => {
                    console.error('Error updating profile:', error);
                    alert('Error updating profile');
                });
        }
    
        setEditProfile(!EditProfile); // Toggle profile edit mode
    };
    

      useEffect(() => {
        // console.log('User ID from URL:', id);
        if (!id) {
          setError('planner ID is missing in the URL.');
          return;
        }
    
        fetch(`http://localhost/Monasbtak-Backend/php/api/planner/getOnePlanner.php?id=${id}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
          })
          .then((data) => {
            if (data.success) {
              setProfileData(data.planner);
            } else {
              setError(data.message);
              console.error('Error fetching planner:', data.message);
            }
          })
          .catch((error) => {
            setError('Failed to fetch planner data');
            console.error('Failed to fetch planner:', error);
          });
        //   console.log(planner.age);

      }, [id]);

    const categories =[
        {name: "Wedding"},
        {name: "Formal"},
        {name: "Birthdays"},
        {name: "Gradution"},
    ]

    const Venues = [
        {name: "Venue 1"},
        {name: "Venue 2"},
        {name: "Venue 3"},
        {name: "Venue 4"},
    ];

    const handleInputChange = (e) => {
        const {id, value} = e.target;
        setProfileData((prevData) => ({
            ...prevData,
            [id]: value
        }))
    }

    const handleDateChange = (date) => {
        const formattedDate = date.toISOString().split('T')[0]; // 'YYYY-MM-DD'        
        
        setProfileData({
            ...profileData,
            age: formattedDate,
        });
    };

    const addCategory = () => {
        if (newCategory.trim()) {
            setNewCategory((prevCategories) => [...prevCategories, { name: newCategory }]);
            setNewCategory(""); // Clear input
        }
    };
    
    const addVenue = () => {
        if (newVenue.trim()) {
            setEditVenuesModal((prevVenues) => [...prevVenues, { name: newVenue }]);
            setNewVenue(""); // Clear input
        }
    };
    

    return (
        <>            
            <Sidebar id={id}/>
            <div className="flex flex-col " style={{width:'90%', marginLeft:'auto'}}>
            <TopSection />
            <div className="page-container" >

                <div className="grid bg-white rounded-xl p-[2rem] w-[75%] ">

                    {/* Heading */}
                    <div className="font-bold text-3xl h-fit">
                        <h1 className="flex flex-col flex-wrap">Planner Profile</h1>
                        <hr />
                    </div>

                    {/* Form */}
                    <div className="flex flex-col flex-wrap gap-3 mt-5">

                        <div className="grid grid-cols-2 gap-5 max-sm:grid-cols-1">
                        {/* 1st Name */}                        
                            <div className="flex flex-col flex-wrap">
                                <label htmlFor="username" className="required-label my-2 font-bold">UserName</label>
                                {EditProfile ? (
                                    <input 
                                        type="text"
                                        id="username"
                                        value={profileData.username}

                                        onChange={handleInputChange}
                                        className="px-5 py-2 rounded-lg bg-white border-[#4c1b419c] border-2"
                                    />
                                ) : (
                                    <p style={{border: '1px solid lightgray', padding: '7px', borderRadius: '5px'}}>
                                        {profileData.username}
                                    </p>                          
                                      )}
                            </div>

                            
                         {/* Email*/}
                         <div className="flex flex-col flex-wrap">
                            <label htmlFor="email" className="required-label my-2 font-bold">Email</label>
                            {EditProfile ? (
                                <input 
                                    type="email"
                                    id="email"
                                    value={profileData.email}
                                    onChange={handleInputChange}
                                    className="px-5 py-2 rounded-lg bg-white border-[#4c1b419c] border-2"
                                />
                            ) : (
                                <p style={{border: '1px solid lightgray', padding: '7px', borderRadius: '5px'}}>
                                    {profileData.email}
                                </p>
                            )}
                        </div>

                        </div>

                        
                        <div className="grid grid-cols-2 gap-5 max-sm:grid-cols-1">
                            {/* Birthday */}
                            <div className="flex flex-col flex-wrap">
                                <label htmlFor="Birthday" className="my-2 font-bold">Birthday</label>
                                {EditProfile ?(  
                                <DatePicker 
                                    selected={profileData.age}
                                    onChange={handleDateChange}
                                    dateFormat="yyyy-MM-dd"
                                    placeholderText="Enter your Birthday"
                                    className="rounded-lg bg-white border-[#4c1b419c] border-2 w-full"
                                    id="Birthday"
                                    showIcon={true}
                                    closeOnScroll={true}
                                    calendarIconClassName="top-1/2 transform -translate-y-1/2"
                                    
                                />
                                ):(
                                    
                                    <p style={{border: '1px solid lightgray', padding: '7px', borderRadius: '5px'}}>
                                       {profileData.age}</p>
                                )
                                }
                            </div>

                            {/* Phone Number */}
                            <div className="flex flex-col flex-wrap">
                                <label htmlFor="phonenumber" className="required-label my-2 font-bold">Phone Number</label>
                                {EditProfile ? (
                                <input 
                                    type="tel"
                                    id="phonenumber"
                                    value={profileData.phonenumber}
                                    onChange={handleInputChange}
                                    className="px-5 py-1.5 rounded-lg bg-white border-[#4c1b419c] border-2"
                                />
                            ) : (
                                <p style={{border: '1px solid lightgray', padding: '7px', borderRadius: '5px'}}>
                                    {profileData.phonenumber }</p>
                            )}
                            </div>

                            

                        </div>

                        {/* Description */}
                        <div className="flex flex-col flex-wrap">
                        <label htmlFor="textArea" className=" my-2 font-bold">Description</label>
                        {EditProfile ? (
                                <textarea
                                    id="description"
                                    value={profileData.description}
                                    onChange={handleInputChange}
                                    placeholder="Talk about your work..."
                                    className="px-5 py-2 rounded-lg bg-white border-[#4c1b419c] border-2"
                                />
                            ) : (
                                <p style={{border: '1px solid lightgray', padding: '7px', borderRadius: '5px'}}>
                                    {profileData.description}
                                </p>
                            )}
                        </div>


                        <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-5 pt-5">
                            
                            {/* Categories */}
                            <div>
                                <div className="my-2 font-bold flex justify-between gap-5 mr-7">
                                    <p className="text-xl">Categories</p>
                                    <button className="py-1 px-2  text-[#D9B34D]" onClick={handleCategoriesModal}>Edit</button>
                                </div>
                                
                                <div className="m-4 flex flex-wrap gap-2 ">
                                    {categories.map((category,index)=>(
                                        <div key={index} className="bg-[#D9B34D] py-2 px-4 rounded-2xl text-white shadow-lg shadow-[#4c1b4161]">
                                            {category.name}
                                        </div>
                                    ))}

                                </div>
                            </div>


                        {/* Venues */}
                            <div className="">
                                <div className="my-2 font-bold flex justify-between gap-5 mr-7 flex-wrap">
                                    <p className="text-xl">Venues</p>
                                    <button className="py-1 px-2  text-[#D9B34D]" onClick={handleVenuesModal}>Edit</button>
                                </div>
                                <div className="m-4 flex flex-wrap gap-2 ">
                                    {Venues.map((venue,index)=>(
                                        <div key={index} className="bg-[#D9B34D] py-2 px-4 rounded-2xl text-white shadow-lg shadow-[#4c1b4161]">
                                            {venue.name}
                                        </div>
                                    ))}

                                </div>
                            </div>

                        </div>

                    </div>
                    
                    {/* Edit & Change Password */}
                    <div className="flex gap-4 mt-16 justify-end  flex-wrap">
                        <button className="bg-[#D9B34D] py-2 px-5 rounded-lg shadow-md hover:bg-[#d9b44dcc] text-white" onClick={handlePasswordModal}>Change Password</button>
                        <button className="bg-[#D9B34D] py-2 px-5 rounded-lg shadow-md hover:bg-[#d9b44dcc] text-white" onClick={handleProfileModal}> 
                            {EditProfile ? "Save Profile" : "Edit Profile"}
                        </button>
                    </div>
                </div>

                {
                    changePasswordModal &&(
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ">
                            <div className="bg-white rounded-xl  w-[50%] px-10 py-8 flex flex-col gap-6 ">
                             
                                <div className="flex flex-col flex-wrap gap-5">

                                    <div className="font-bold text-xl flex flex-col ">
                                        <p className="">Change Password</p>
                                        <hr />
                                    </div>

                                    {/* Old password */}
                                    <div className="flex flex-col">
                                        <label htmlFor="OldPassword" className="required-label my-2 font-bold">Old Password</label>
                                        <input 
                                            type="password"
                                            id="OldPassword"
                                            placeholder="Enter Your Old Password"
                                            className="px-5 py-2 rounded-lg bg-white border-[#4c1b419c] border-2"
                                            required
                                        />
                                    </div>

                                    {/* New password */}
                                    <div className="flex flex-col">
                                        <label htmlFor="NewPassword" className="required-label my-2 font-bold">New Password</label>
                                        <input 
                                            type="password"
                                            id="NewPassword"
                                            placeholder="Enter Your Old Password"
                                            className="px-5 py-2 rounded-lg bg-white border-[#4c1b419c] border-2"
                                            required
                                        />
                                    </div>

                                    {/* Re-type password */}
                                    <div className="flex flex-col">
                                        <label htmlFor="reTypedPassword" className="required-label my-2 font-bold">Re-Type Password</label>
                                        <input 
                                            type="password"
                                            id="reTypedPassword"
                                            placeholder="Enter Your Old Password"
                                            className="px-5 py-2 rounded-lg bg-white border-[#4c1b419c] border-2"
                                            required
                                        />
                                    </div>


                                </div>

                                <div className="flex items-end justify-end">
                                    <button 
                                        className="bg-[#D9B34D] w-fit py-2 px-5 rounded-lg shadow-md hover:bg-[#d9b44dcc] text-white"
                                        onClick={handlePasswordModal}
                                        >
                                            Save Changes
                                        </button>
                                </div>

                            </div>
            
                        </div>
                    )
                }

                {EditCategoriesModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white rounded-xl w-[50%] px-10 py-8 flex flex-col gap-4">
                            <div className="font-bold text-xl mb-2">
                                <p>Categories</p>
                                <hr />
                            </div>

                            <div className="flex gap-2 justify-evenly">
                                <label htmlFor="SelectedCategory"  className="text-lg">Categories: </label>
                                <select name="SelectedCategory" className="w-1/2 border-2 border-[#4c1b41] rounded-lg py-1 px-3">
                                        <option disabled className="text-gray-300" defaultValue="Choose Category To Add">Choose Category To Add</option>
                                    {
                                        categories.map((category,index)=> (
                                            <option key={index} value={category.name}>
                                                {category.name}
                                            </option>
                                        ))
                                    }
                                </select>
                                <button
                                    onClick={addCategory}
                                    className="bg-[#D9B34D] px-5 py-2 rounded-lg text-white hover:bg-[#d9b44dd3]"
                                >
                                    Add
                                </button>

                            </div>

                            <div className="m-4 flex flex-wrap gap-2 justify-between">
                                {categories.map((category, index) => (
                                    <div key={index} className="flex items-center gap-4 bg-[#D9B34D] py-2 px-4 rounded-2xl text-white shadow-lg shadow-[#4c1b4161]">
                                        <p>{category.name}</p>
                                        <TiDelete
                                            className="hover:text-gray-300 cursor-pointer"
                                            onClick={handleCategoriesModal}
                                        />
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>
                )}


                                
                {EditVenuesModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-xl w-[50%] px-10 py-8 flex flex-col gap-4">
                        <div className="font-bold text-xl mb-2">
                            <p>Venues</p>
                            <hr />
                        </div>

                        <div className="flex gap-2 justify-evenly">
                            <label htmlFor="SelectedCategory"  className="text-lg">Venues: </label>
                            <select name="SelectedCategory" className="w-1/2 border-2 border-[#4c1b41] rounded-lg py-1 px-3">
                                    <option disabled className="text-gray-300" defaultValue="Choose Category To Add">Choose Venue To Add</option>
                                {
                                    Venues.map((venue,index)=> (
                                        <option key={index} value={venue.name}>
                                            {venue.name}
                                        </option>
                                    ))
                                }
                            </select>
                            <button
                                onClick={addVenue}
                                className="bg-[#D9B34D] px-5 py-2 rounded-lg text-white hover:bg-[#d9b44dd3]"
                            >
                                Add
                            </button>

                        </div>

                        <div className="m-4 flex flex-wrap gap-2 justify-between">
                            {Venues.map((venue, index) => (
                                <div key={index} className="flex items-center gap-4 bg-[#D9B34D] py-2 px-4 rounded-2xl text-white shadow-lg shadow-[#4c1b4161]">
                                    <p>{venue.name}</p>
                                    <TiDelete
                                        className="hover:text-gray-300 cursor-pointer"
                                        onClick={handleVenuesModal}
                                    />
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
                )}

                {acceptAlert &&(
                    <div className="modal-overlay-status">
                        <div className="rounded-xl w-fit grid grid-cols-[0.25fr,1fr]">
                        <div className="bg-green-600 p-0 rounded-l-xl"></div>
                        <div className="p-5 bg-white  border-2 border-green-600 ">Profile Updated Successfully</div>
                        </div>
                    </div>
                )}

                {failureAlert &&(
                    <div className="modal-overlay-status">
                        <div className="rounded-xl w-fit grid grid-cols-[0.25fr,1fr]">
                        <div className="bg-red-600 p-0 rounded-l-xl"></div>
                        <div className="p-5 bg-white  border-2 border-red-600 ">Failed to update profile</div>
                        </div>
                    </div>
                    )}


        </div>
        </div>
        </>
    )
}