"use client";

import TopSection from "../../components/planners/topSection/page";
import Sidebar from "../../components/sidebar/page";
import {React, useState, useEffect} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { TiDelete } from "react-icons/ti";
import { useSearchParams } from 'next/navigation';
import { IoClose } from "react-icons/io5";


import './page.css'

export default function Profile () {
    const searchParams = useSearchParams();
    const id = searchParams.get('id'); // Get user ID from the query parameters

    const [EditProfile, setEditProfile] = useState(false);

    const [acceptAlert, setAcceptAlert] = useState(false);
    const [failureAlert, setFailureAlert] = useState(false);

    const [acceptCategoryAlert, setAcceptCategoryAlert] = useState(false);
    const [failureCategoryAlert, setFailureCategoryAlert] = useState(false);

    const [acceptDeletionAlert, setAcceptDeletionAlert] = useState(false);
    const [failureDeletionAlert, setFailureDeletionAlert] = useState(false);

    const [deletedCategory,setDeletedCategory] = useState('');

    const [category, setCategory] = useState([])

    const [addPlannerCategory, setAddPlannerCategory] = useState([])
    const [plannerCategoryIds, setPlannerCategoryIds]= useState([]);
    const [plannerCategoryNames, setPlannerCategoryNames]= useState([]);

    const [EditCategoriesModal, setEditCategoriesModal] = useState(false)

    const [changePasswordModal, setChangePasswordModal] = useState(false)
    const [selectedOption, setSelectedOption] = useState("");

    const [profileData,setProfileData] = useState(
        {       
            username: "",
            email: "",
            phonenumber: "",
            age: "",
            gender: " ",
            description: " ",
            // image: " ",
        }
    )
    
    const handleChange = (event) => {
        setSelectedOption(event.target.value); 
      };


    const handleCategoriesModal = () => {
        setEditCategoriesModal(!EditCategoriesModal)
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

      const handleCategoryAcceptAlert = () => {
        setAcceptCategoryAlert(true);
        setTimeout(() => {
          setAcceptCategoryAlert(false);
        }, 2500); 
      };

      const handleCategoryFailureAlert = () => {
        setFailureCategoryAlert(true);
        setTimeout(() => {
            setFailureCategoryAlert(false);
        }, 2500); 
      };

      const handleDeletionAcceptAlert = () => {
        setAcceptDeletionAlert(true);
        setTimeout(() => {
            setAcceptDeletionAlert(false);
        }, 2500); 
      };

      const handleDeletionFailureAlert = () => {
        setFailureDeletionAlert(true);
        setTimeout(() => {
            setFailureDeletionAlert(false);
        }, 2500); 
      };


    //   get planner info 
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

    //   edit planner profile
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
                        // alert('Profile updated successfully!');
                        handleAcceptAlert();
                    } else {
                        // alert('Failed to update profile');
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

    // get all categories 
    useEffect(() => {
        fetch(`http://localhost/Monasbtak-Backend/php/api/planner/profile/getCategories.php`)
          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
          })
          .then((data) => {
            if (data.success) {
              setCategory(data.categories);
            } else {
              setError(data.message);
              console.error('Error fetching Categories:', data.message);
            }
          })
          .catch((error) => {
            setError('Failed to fetch Categories data');
            console.error('Failed to fetch Categories:', error);
          });

      },[]);

    //  add category to table with planner ID 
    const handleAddCategory = (catName, plannerName) => {
        console.log(`catName: ${catName},,,, plannerName: ${plannerName}`)
        if (!catName || !plannerName) return;
    
        fetch(`http://localhost/Monasbtak-Backend/php/api/planner/profile/postPlannerCategories.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ catName, plannerName }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    // alert('postPlannerCategories successfully!');
                    setAddPlannerCategory(data); 
                    fetchPlannerCategories();
                    handleCategoriesModal();
                    handleCategoryAcceptAlert();
                } else {
                    // alert('Failed to update postPlannerCategories');
                    handleCategoriesModal();
                    handleCategoryFailureAlert();
                }
            })
            .catch((error) => {
                console.error('Error updating postPlannerCategories:', error);
                // alert('Error updating postPlannerCategories');
            });
    };

    // get categories Id's related to planner 
    const fetchPlannerCategories = () => {
        fetch(`http://localhost/Monasbtak-Backend/php/api/planner/profile/getPlannerCategories.php?planner_id=${id}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
          })
          .then((data) => {
            if (data.success) {
                setPlannerCategoryIds(data.category_ids);
            } else {
              setError(data.message);
              console.error('Error fetching category_id:', data.message);
            }
          })
          .catch((error) => {
            setError('Failed to fetch category_id data');
            console.error('Failed to fetch category_id:', error);
          });
        //   console.log(planner.age);
        }
        useEffect(() => {
            fetchPlannerCategories();

      },[]);


    //   get categories names 
    useEffect(() => {
    if (!plannerCategoryIds.length) return;

    const fetchCategoryNames = async () => {
        try {
            const names = await Promise.all(
                plannerCategoryIds.map((id) =>
                    fetch(`http://localhost/Monasbtak-Backend/php/api/planner/profile/getOneCategory.php?id=${id}`)
                        .then((response) => {
                            if (!response.ok) {
                                throw new Error(`HTTP error! status: ${response.status}`);
                            }
                            return response.json();
                        })
                        .then((data) => {
                            if (data.success) {
                                return data.category.name;
                            } else {
                                console.error(`Error fetching category for ID ${id}:`, data.message);
                                return null;
                            }
                        })
                )
            );
            setPlannerCategoryNames(names.filter((name) => name !== null)); // Filter out null values
        } catch (error) {
            console.error('Failed to fetch category names:', error);
        }
    };

    fetchCategoryNames();
    }, [plannerCategoryIds]);

    //  delete category to table with planner ID 
    const handleDeleteCategory = (catName, id) => {
        console.log(`catName: ${catName},,,, id: ${id}`)
        if (!catName || !id) return;
    
        fetch(`http://localhost/Monasbtak-Backend/php/api/planner/profile/deletePlannerCategory.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ catName, id }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    // alert('deletePlannerCategories successfully!');
                    setDeletedCategory(catName);
                    fetchPlannerCategories();
                    handleCategoriesModal();
                    handleDeletionAcceptAlert();
                } else {
                    // alert('Failed to delete Category');
                    setDeletedCategory(catName);
                    handleCategoriesModal();
                    handleDeletionFailureAlert();
                }
            })
            .catch((error) => {
                console.error('Error deleting Planner Category:', error);
                // alert('Error updating postPlannerCategories');
            });
    };
    
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

                        {/* Profile Picture */}
                        {/* <div className="flex flex-col flex-wrap">
                                    <label htmlFor="ProfilePicture" className=" my-2 font-bold">Profile Picture</label>
                                    {EditProfile ? (
                                        // <input 
                                        //     type="file"
                                        //     id="ProfilePicture"
                                        //     value={profileData.image}
                                        //     onChange={handleInputChange}
                                        //     className="px-5 py-2 rounded-lg bg-white border-[#4c1b419c] border-2"
                                        // />
                                        <img src={`data:image/jpeg;base64${profileData.image}`} />
                                    ) : (
                                        
                                            <input 
                                                type="file"
                                                id="ProfilePicture"
                                                value={profileData.image}
                                                className="px-5 py-2 rounded-lg bg-white border-gray-200 border-2"
                                                disabled
                                            />                       
                                    )}
                        </div> */}

                        <div className="grid grid-cols-2 gap-5 max-sm:grid-cols-1">                        

                        {/* userName */}                        
                            <div className="flex flex-col flex-wrap">
                                <label htmlFor="username" className=" my-2 font-bold">UserName</label>
                                {EditProfile ? (
                                    <input 
                                        type="text"
                                        id="username"
                                        value={profileData.username}
                                        onChange={handleInputChange}
                                        className="px-5 py-2 rounded-lg bg-white border-[#4c1b419c] border-2"
                                    />
                                ) : (
                                    
                                        <input 
                                            type="text"
                                            id="username"
                                            value={profileData.username}
                                            className="px-5 py-2 rounded-lg bg-white border-gray-200 border-2"
                                            disabled
                                        />                       
                                    )}
                            </div>

                            
                         {/* Email*/}
                         <div className="flex flex-col flex-wrap">
                            <label htmlFor="email" className=" my-2 font-bold">Email</label>
                            {EditProfile ? (
                                <input 
                                    type="email"
                                    id="email"
                                    value={profileData.email}
                                    onChange={handleInputChange}
                                    className="px-5 py-2 rounded-lg bg-white border-[#4c1b419c] border-2"
                                />
                            ) : (
                                <input 
                                type="email"
                                id="email"
                                value={profileData.email}
                                className="px-5 py-2 rounded-lg bg-white border-gray-200 border-2"
                                disabled
                            />
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
                                    
                                    <DatePicker 
                                    selected={profileData.age}
                                    dateFormat="yyyy-MM-dd"
                                    placeholderText="Enter your Birthday"
                                    className="rounded-lg bg-white border-gray-200 border-2 w-full"
                                    id="Birthday"
                                    showIcon={true}
                                    closeOnScroll={true}
                                    calendarIconClassName="top-1/2 transform -translate-y-1/2"
                                    disabled
                                    
                                />
                                )}
                            </div>

                            {/* Phone Number */}
                            <div className="flex flex-col flex-wrap">
                                <label htmlFor="phonenumber" className=" my-2 font-bold">Phone Number</label>
                                {EditProfile ? (
                                <input 
                                    type="tel"
                                    id="phonenumber"
                                    value={profileData.phonenumber}
                                    onChange={handleInputChange}
                                    className="px-5 py-1.5 rounded-lg bg-white border-[#4c1b419c] border-2"
                                />
                            ) : (
                                <input 
                                    type="tel"
                                    id="phonenumber"
                                    value={profileData.phonenumber}
                                    className="px-5 py-1.5 rounded-lg bg-white border-gray-200 border-2"
                                    disabled
                                />
                            )}
                            </div>

                            {/* gender */}
                            <div className="flex flex-col flex-wrap">
                                <label htmlFor="gender" className=" my-2 font-bold">Gender</label>
                                {EditProfile ? (
                                <select 
                                    id="gender"
                                    // value={profileData.gender}
                                    onChange={handleInputChange}
                                    className="px-5 py-1.5 rounded-lg bg-white border-[#4c1b419c] border-2"
                                >
                                    <option defaultChecked disabled value="Choose your Gender">Choose Your Gender</option>
                                    <option value="Female">Female</option>
                                    <option value="Male">Male</option>
                                </select>
                            ) : (
                                <input 
                                    type="tel"
                                    id="gender"
                                    value={profileData.gender}
                                    className="px-5 py-1.5 rounded-lg bg-white border-gray-200 border-2"
                                    disabled
                                />
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
                                <textarea
                                    id="description"
                                    value={profileData.description}
                                    placeholder="Talk about your work..."
                                    className="px-5 py-2 rounded-lg bg-white border-gray-200 border-2"
                                    disabled
                                />
                            )}
                        </div>


                        <div className="grid grid-cols-1 max-sm:grid-cols-1 gap-5 pt-5">
                            
                            {/* Categories */}
                            <div>
                                <div className="my-2 font-bold flex justify-between gap-5 mr-7">
                                    <p className="text-xl">Categories</p>
                                    <button className="py-1 px-2  text-[#D9B34D]" onClick={handleCategoriesModal}>Edit</button>
                                </div>
                                
                                    <div className="m-4 flex flex-wrap gap-2">
                                    {plannerCategoryNames.length > 0 ? (
                                        plannerCategoryNames.map((name, index) => (
                                        <div key={index} className="flex flex-row flex-wrap items-center justify-center gap-4 bg-[#D9B34D] py-2 px-4 rounded-2xl text-white shadow-lg shadow-[#4c1b4161]">
                                            <div>
                                                 {name} 
                                            </div>
                                        </div>
                                    ))
                                    ): (
                                     <div>No Categories yet</div>
                                    )}
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
                        {EditProfile && (
                            <button className="bg-[#D9B34D] flex items-center gap-3 py-2 px-5 rounded-lg shadow-md hover:bg-[#d9b44dcc] text-white" onClick={()=>setEditProfile(false)}>Cancel Edit <IoClose/></button>
                        )}
                    </div>
                </div>

                {
                    changePasswordModal &&(
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ">
                            <div className="bg-white rounded-xl  w-[50%] px-10 py-8 flex flex-col gap-6 ">
                             
                                <div className="flex flex-col flex-wrap gap-5">
                                    
                                    {/* TITLE */}
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
                            <div className="font-bold text-xl flex mb-2 w-full relative">
                                <p>Categories</p>
                                <button className="absolute right-0" onClick={handleCategoriesModal}><IoClose /></button>
                                <hr />
                            </div>

                            <div className="flex gap-2 justify-evenly">
                                <label htmlFor="SelectedCategory"  className="text-lg">Categories: </label>
                                <select value={selectedOption} onChange={handleChange} name="SelectedCategory" className="w-1/2 border-2 border-[#4c1b41] rounded-lg py-1 px-3">
                                        <option disapled="true" defaultChecked value="Choose Category" className="text-gray-300">Choose Category To Add</option>
                                    {
                                        category.map((category,index)=> (
                                                <option key={index} value={category.name}>
                                                    {category.name}
                                                </option>
                                        ))
                                        
                                    }
                                     
                                </select>
                                <button
                                    onClick={()=>handleAddCategory(selectedOption,profileData.username)}
                                    className="bg-[#D9B34D] px-5 py-2 rounded-lg text-white hover:bg-[#d9b44dd3]"
                                    >
                                        Add
                                </button>
                            </div>

                            <div className="m-4 flex flex-wrap gap-2">
                                    {plannerCategoryNames.length > 0 ? (
                                        plannerCategoryNames.map((name, index) => (
                                        <div key={index} className="flex flex-row flex-wrap items-center justify-center gap-4 bg-[#D9B34D] py-2 px-4 rounded-2xl text-white shadow-lg shadow-[#4c1b4161]">
                                            <div>
                                                {name}  
                                            </div>
                                            <button><TiDelete onClick={()=>handleDeleteCategory(name,id)}/></button>
                                        </div>
                                    ))
                                    ): (
                                     <div>No Categories yet</div>
                                    )}
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

                {acceptCategoryAlert &&(
                    <div className="modal-overlay-status">
                        <div className="rounded-xl w-fit grid grid-cols-[0.25fr,1fr]">
                        <div className="bg-green-600 p-0 rounded-l-xl"></div>
                        <div className="p-5 bg-white  border-2 border-green-600 ">Category Added to planner: 
                            <span className="font-bold">{profileData.username}</span> Successfully</div>
                        </div>
                    </div>
                )}

                {acceptDeletionAlert &&(
                    <div className="modal-overlay-status">
                        <div className="rounded-xl w-fit grid grid-cols-[0.25fr,1fr]">
                        <div className="bg-green-600 p-0 rounded-l-xl"></div>
                        <div className="p-5 bg-white  border-2 border-green-600 ">Category:  
                            <span className="font-bold">{deletedCategory}</span> has been deleted successfully</div>
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

                {failureCategoryAlert &&(
                    <div className="modal-overlay-status">
                        <div className="rounded-xl w-fit grid grid-cols-[0.25fr,1fr]">
                        <div className="bg-red-600 p-0 rounded-l-xl"></div>
                        <div className="p-5 bg-white  border-2 border-red-600 ">Failed add category to planner: 
                            <span className="font-bold">{profileData.username}</span></div>
                        </div>
                    </div>
                )}

                {failureDeletionAlert &&(
                    <div className="modal-overlay-status">
                        <div className="rounded-xl w-fit grid grid-cols-[0.25fr,1fr]">
                        <div className="bg-green-600 p-0 rounded-l-xl"></div>
                        <div className="p-5 bg-white  border-2 border-green-600 ">Category:  
                        <span className="font-bold">{deletedCategory}</span> failed to delete</div>
                        </div>
                    </div>
                )}

        </div>
        </div>
        </>
    )
}


