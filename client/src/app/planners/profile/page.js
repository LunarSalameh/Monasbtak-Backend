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
import Link from "next/link";

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

    const [acceptDeletionVenueAlert,setAcceptDeletionVenueAlert] = useState(false);

    const [changePwdAlert, setChangePwdAlert] = useState(false);

    const [deletedCategory,setDeletedCategory] = useState('');

    const [deletedVenue,setDeletedVenue] = useState('');

    const [category, setCategory] = useState([])
    const [venue,setVenue] = useState([])
    const [subCategory, setSubCategory] = useState([])

    const [requestVenue,setRequestVenue] = useState(false)

    const [addPlannerCategory, setAddPlannerCategory] = useState([])
    const [plannerCategoryIds, setPlannerCategoryIds]= useState([]);
    const [plannerCategoryNames, setPlannerCategoryNames]= useState([]);

    const [addPlannerVenue, setAddPlannerVenue] = useState([])
    const [plannerVenueIds, setPlannerVenueIds]= useState([]);
    const [plannerVenueNames, setPlannerVenueNames]= useState([]);

    const [EditCategoriesModal, setEditCategoriesModal] = useState(false)
    const [EditVenuesModal, setEditVenuesModal] = useState(false)

    const [changePasswordModal, setChangePasswordModal] = useState(false)
    const [selectedOptionVen, setSelectedOptionVen] = useState("");

    const [selectedCategories, setSelectedCategories] = useState("");
    
    const [oldPwd, setOldPwd] = useState("");
    const [newPwd, setNewPwd] = useState("");
    const [retypeNewPwd, setRetypeNewPwd] = useState("");
    
    const [venueAcceptAlert,setVenueAcceptAlert] = useState(false)
    const [venueFailureAlert,setVenueFailureAlert] = useState(false)

    const [message, setMessage] = useState('');
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    const [selectedCategoriesVen, setSelectedCategoriesVen] = useState('');
    const [selectedSubCategories, setSelectedSubCategories] = useState("");
    
    const [venueName,setVenueName] = useState('')
    const [venueLocation,setVenueLocation] = useState('')
    // const [venueEmail,setVenueEmail] = useState('')
    // const [venuePhone,setVenuePhone] = useState('')
    const [venueDescription,setVenueDescription] = useState('')
    const [venueImage,setVenueImage] = useState('')

    const [responseMessage, setResponseMessage] = useState("");

    const [acceptVenueRequestAlert, setAcceptVenueRequestAlert] = useState(false);


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

    const handleClearVenueForm = () => {
        setVenueName("");
        // setVenuePhone("");
        setVenueLocation("");
        setVenueDescription("");
        // setVenueEmail("");
        setVenueImage('');
        setSelectedCategoriesVen("");
        setSelectedSubCategories("")
    }

    const handleChange = (event) => {
        setSelectedCategories(event.target.value); 
      };

      const handleChangeVenue = (event) => {
        setSelectedOptionVen(event.target.value); 
      };

    const handleCategoriesModal = () => {
        setEditCategoriesModal(!EditCategoriesModal)
    }

    const handleVenuesModal = () => {
        setEditVenuesModal(!EditVenuesModal)
    }

    const handlePasswordModal = () => {
        handleClearPwdModal();
        setChangePasswordModal(!changePasswordModal)
    }

    const handleVenueAcceptAlert = () => {
        setVenueAcceptAlert(true);
        setTimeout(() => {
            setVenueAcceptAlert(false);
        }, 2500);
    }

    const handleAcceptVenueRequestAlert = () => {
        setAcceptVenueRequestAlert(true);
        setTimeout(() => {
            setAcceptVenueRequestAlert(false);
        }, 2500);
    }

    const handleVenueFailureAlert = () => {
        setVenueFailureAlert(true);
        setTimeout(() => {
            setVenueFailureAlert(false);
        }, 2500);
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

      const handleDeletionAcceptVenueAlert = () => {
        setAcceptDeletionVenueAlert(true);
        setTimeout(() => {
            setAcceptDeletionVenueAlert(false);
        }, 2500); 
      };

      const handleDeletionFailureAlert = () => {
        setFailureDeletionAlert(true);
        setTimeout(() => {
            setFailureDeletionAlert(false);
        }, 2500); 
      };

      const handleChnagePwdAlert = () => {
        setChangePwdAlert(true);
        setTimeout(() => {
            setChangePwdAlert(false);
        }, 2500); 
      };

      const handleClearPwdModal = ()=>{
            setOldPwd('');
            setNewPwd('');
            setRetypeNewPwd('');
            setMessage('');
      }

    


    //   get planner info 
    useEffect(() => {
        // console.log('User ID from URL:', id);
        if (!id) {
          setError('planner ID is missing in the URL.');
          return;
        }
    
        fetch(`http://localhost/Monasbtak-Backend/php/api/planner/profile/getOnePlanner.php?id=${id}`)
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
            fetch(`http://localhost/Monasbtak-Backend/php/api/planner/profile/editProfile.php?id=${id}`, {
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

    // get all venues 
    useEffect(() => {
    
        fetch(`http://localhost/Monasbtak-Backend/php/api/planner/profile/getVenues.php`)
        .then((response) => {
            if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            if (data.success) {
            setVenue(data.venues);
            } else {
            alert("Error fetching Venues")
            console.error('Error fetching Venues:', data.message);
            }
        })
        .catch((error) => {
            alert('Failed to fetch Venues data');
            console.error('Failed to fetch Venues:', error);
        });

  },[]);

    //  add venue to planner 
    const handleAddVenues = (venueName, plannerName) => {
        console.log(`vanueName: ${venueName},,,, plannerName: ${plannerName}`)
        if (!venueName || !plannerName) return;
    
        fetch(`http://localhost/Monasbtak-Backend/php/api/planner/profile/postPlannerVenue.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ venueName, plannerName }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    // alert('postPlannerVenues successfully!');
                    setAddPlannerVenue(data.data); 
                    fetchPlannerVenues();
                    handleVenuesModal();
                    handleVenueAcceptAlert();
                } else {
                    // alert('Failed to update postPlannerVenues');
                    handleVenuesModal();
                    handleVenueFailureAlert();
                }
            })
            .catch((error) => {
                console.error('Error updating postPlannerVenues:', error);
                // alert('Error updating postPlannerVenues');
            });
    };

    // get Venues Id's related to planner 
    const fetchPlannerVenues = () => {
  
    fetch(`http://localhost/Monasbtak-Backend/php/api/planner/profile/getPlannerVenues.php?planner_id=${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.success) {
            setPlannerVenueIds(data.venue_ids);
        } else {
          setError(data.message);
          console.error('Error fetching Venue_id:', data.message);
        }
      })
      .catch((error) => {
        setError('Failed to fetch Venue_id data');
        console.error('Failed to fetch Venue_id:', error);
      });
    //   console.log(planner.age);
    }
    useEffect(() => {
        fetchPlannerVenues();

        
  },[]);

//   get venue names 
  useEffect(() => {
    if (!plannerVenueIds.length) return;
  
    const fetchVenueNames = async () => {
        try {
            const names = await Promise.all(
                plannerVenueIds.map((id) =>
                  
                    fetch(`http://localhost/Monasbtak-Backend/php/api/planner/profile/getOneVenue.php?id=${id}`)
                        .then((response) => {
                            if (!response.ok) {
                                throw new Error(`HTTP error! status: ${response.status}`);
                            }
                            return response.json();
                        })
                        .then((data) => {
                            if (data.success) {
                                return data.venue.name;
                            } else {
                                console.error(`Error fetching venues for ID ${id}:`, data.message);
                                return null;
                            }
                        })
                )
            );
            setPlannerVenueNames(names.filter((name) => name !== null)); // Filter out null values
        } catch (error) {
            console.error('Failed to fetch venue names:', error);
        }
    };
  
    fetchVenueNames();
    }, [plannerVenueIds]);

    //  delete venue to table with planner ID 
    const handleDeleteVenue = (venueName, id) => {
        console.log(`venueName: ${venueName},,,, id: ${id}`)
        if (!venueName || !id) return;
    
        fetch(`http://localhost/Monasbtak-Backend/php/api/planner/profile/deletePlannerVenue.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ venueName, id }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    // alert('deletePlannerVenues successfully!');
                    setDeletedVenue(venueName);
                    fetchPlannerVenues();
                    handleVenuesModal();
                    handleDeletionAcceptVenueAlert();
                } else {
                    // alert('Failed to delete Venues');
                    setDeletedVenue(venueName);
                    handleVenuesModal();
                    // handleDeletionFailureAlert();
                }
            })
            .catch((error) => {
                console.error('Error deleting Planner Category:', error);
                // alert('Error updating postPlannerCategories');
            });
    };

    // change password
    const handlePasswordChange = (id,oldPwd,newPwd,retypeNewPwd) => {
        if (!id) return 
        else if (!oldPwd || !newPwd || !retypeNewPwd){
            setMessage('All fields are required');
            return;
        }
        
        fetch(`http://localhost/Monasbtak-Backend/php/api/planner/profile/changePassword.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, oldPwd,newPwd, retypeNewPwd}),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    // alert('password changes successfully!');
                    // handleClearPwdModal();
                    handlePasswordModal();
                    handleChnagePwdAlert();
                } else {
                    alert('Failed to change password');
                    setMessage(data.message)
                }
            })
            .catch((error) => {
                console.error('Error changing password:', error);
                setMessage(`Error: ${error}`);
                // alert('Error changing password');
            });
            handleClearPwdModal();

    }

     // get all subCategories 
     useEffect(() => {
        const fetchSubCategories = async () => {
          if (!selectedCategoriesVen) return;
      
          try {
            const response = await fetch(
              `http://localhost/Monasbtak-Backend/php/api/planner/profile/getSubCategory.php?category_id=${selectedCategoriesVen}`
            );
      
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
      
            const data = await response.json();
      
            if (data.success) {
              setSubCategory(data.subCategories);
            } else {
              console.error("Error fetching subCategories:", data.message);
            }
          } catch (error) {
            console.error("Failed to fetch subCategories:", error);
          }
        };
      
        fetchSubCategories();
      }, [selectedCategoriesVen]);


      const handleRequestVenue = async (e) => {
        e.preventDefault();

        if (!venueName || !venueLocation || !venueDescription || !selectedSubCategories) {
            setResponseMessage("Please fill in all fields.");
            return; // Stop the function execution if validation fails
        }
   
        const formData = new FormData();
        formData.append('name', venueName);
        formData.append('location', venueLocation);
        formData.append('description', venueDescription);
        formData.append('image', venueImage);
        formData.append('subCategory_id', selectedSubCategories);
   
        try {
            const response = await fetch(
                "http://localhost/Monasbtak-Backend/php/api/planner/profile/addVenue.php",
                {
                    method: "POST",
                    body: formData,
                }
            );
   
            // Log the response to check if the status is OK and inspect the data
            const data = await response.json();
            console.log('Server response:', data);
   
            if (response.ok) {
                // alert(data.message || "Venue added successfully!");
                setRequestVenue(false);
                setEditVenuesModal(false);
                handleAcceptVenueRequestAlert();
                handleClearVenueForm();
                setResponseMessage(data.message || "Venue added successfully!");
            } else {
                console.log('Response not OK:', data);
                setResponseMessage(data.message || "An error occurred.");
            }
   
        } catch (error) {
            console.error(`Error occurred while connecting to the server: ${error}`);
            setResponseMessage("An error occurred while connecting to the server.");
        }
    };
   
    

    const handleInputChange = (e) => {
        const {id, value} = e.target;
        setProfileData((prevData) => ({
            ...prevData,
            [id]: value
        }))
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setProfileData((prevData) => ({
                ...prevData,
                image: reader.result.split(',')[1], // Get base64 string without the prefix
            }));
        };
        reader.readAsDataURL(file);
    };

    const handleDateChange = (date) => {
        const formattedDate = date.toISOString().split('T')[0]; // 'YYYY-MM-DD'        
        
        setProfileData({
            ...profileData,
            age: formattedDate,
        });
    };

    const handleImageChange = () => {
        // Logic to recall the fetch in the Sidebar component
    };

    return (
        <>            
            <Sidebar id={id} handleImageChange={handleImageChange} />
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

                            {/* image */}
                            <div className="flex flex-col flex-wrap">
                                {EditProfile && (
                                    <>
                                        <label htmlFor="image" className="my-2 font-bold">Image</label>
                                        <input 
                                            type="file"
                                            id="image"
                                            onChange={handleFileChange}
                                            className="px-5 py-1.5 rounded-lg bg-white border-[#4c1b419c] border-2"
                                        />
                                    </>
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

                              {/* Venues */}
                              <div>
                                    <div className="my-2 font-bold flex justify-between gap-5 mr-7">
                                        <p className="text-xl">Venues</p>
                                        <button className="py-1 px-2  text-[#D9B34D]" onClick={handleVenuesModal}>Edit</button>
                                    </div>
                                            
                                        <div className="m-4 flex flex-wrap gap-2">
                                        {plannerVenueNames.length > 0 ? (
                                                plannerVenueNames.map((name, index) => (
                                            <div key={index} className="flex flex-row flex-wrap items-center justify-center gap-4 bg-[#D9B34D] py-2 px-4 rounded-2xl text-white shadow-lg shadow-[#4c1b4161]">
                                                <div>
                                                    {name} 
                                                </div>
                                            </div>
                                        ))
                                        ): (
                                        <div>No Venues yet</div>
                                    )}
                                        </div>
                             </div>

                    </div>
                    
                    {/* Edit & Change Password */}
                    <div className="flex gap-4 mt-16 justify-end  flex-wrap">
                        <Link href={`/planners/customerViewProfile?id=${id}`}>
                            <button className="bg-[#D9B34D] w-fit py-2 px-5 rounded-lg shadow-md hover:bg-[#d9b44dcc] text-white">
                                Customer View
                            </button>
                        </Link>
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
                                    
                                    {message && (
                                        <div className=" text-red-600 border-red-600 border-solid border-2 rounded-md  bg-red-100 py-2 mx-4 text-center px-2 m-0">
                                            {message}
                                        </div>
                                    )}
                                    

                                    {/* Old password */}
                                    <div className="flex flex-col">
                                        <label htmlFor="oldPwd" className="required-label my-2font-bold">Old Password</label>
                                        <div className="relative">
                                            
                                            <input 
                                                type={showOldPassword ? "text" : "password"} 
                                                id="oldPwd"
                                                placeholder="Enter Your Old Password"
                                                value={oldPwd}
                                                onChange={(e)=>setOldPwd(e.target.value)}
                                                className="px-5 py-2 rounded-lg bg-white w-full border-[#4c1b419c] border-2"
                                                required
                                            />
                                            <button
                                                type="button"
                                                aria-label={showOldPassword ? "Password Visible" : "Password Invisible."}
                                                className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-400"
                                                onClick={() => {
                                                setShowOldPassword((prev) => !prev);
                                            }}
                                            >
                                                {showOldPassword ? (
                                                    <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="1.5"
                                                    stroke="currentColor"
                                                    className="w-6 h-6"
                                                    >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178z"
                                                    ></path>
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                    ></path>
                                                    </svg>
                                                ) : (
                                                    <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="1.5"
                                                    stroke="currentColor"
                                                    className="w-6 h-6"
                                                    >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88 6.228 6.228"
                                                    ></path>
                                                    </svg>
                                                )}
                                                </button>
                                        </div>
                                    </div>

                                    {/* New password */}
                                    <div className="flex flex-col">
                                        <label htmlFor="newPwd" className="required-label my-2font-bold">New Password</label>
                                        <div className="relative">
                                            
                                            <input 
                                                type={showNewPassword ? "text" : "password"} 
                                                id="newPwd"
                                                placeholder="Enter New Password"
                                                value={newPwd}
                                                onChange={(e)=>setNewPwd(e.target.value)}
                                                className="px-5 py-2 rounded-lg bg-white w-full border-[#4c1b419c] border-2"
                                                required
                                            />
                                            <button
                                                type="button"
                                                aria-label={showNewPassword ? "Password Visible" : "Password Invisible."}
                                                className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-400"
                                                onClick={() => {
                                                setShowNewPassword((prev) => !prev);
                                            }}
                                            >
                                                {showNewPassword ? (
                                                    <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="1.5"
                                                    stroke="currentColor"
                                                    className="w-6 h-6"
                                                    >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178z"
                                                    ></path>
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                    ></path>
                                                    </svg>
                                                ) : (
                                                    <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="1.5"
                                                    stroke="currentColor"
                                                    className="w-6 h-6"
                                                    >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88 6.228 6.228"
                                                    ></path>
                                                    </svg>
                                                )}
                                                </button>
                                        </div>
                                    </div>

                                    {/* Re-type password */}
                                    <div className="flex flex-col">
                                        <label htmlFor="retypeNewPwd" className="required-label my-2font-bold">Re-Type New Password</label>
                                        <div className="relative">
                                            
                                            <input 
                                                type={showNewPassword ? "text" : "password"} 
                                                id="retypeNewPwd"
                                                placeholder="Re-Type New Password"
                                                value={retypeNewPwd}
                                                onChange={(e)=>setRetypeNewPwd(e.target.value)}
                                                className="px-5 py-2 rounded-lg bg-white w-full border-[#4c1b419c] border-2"
                                                required
                                            />
                                            <button
                                                type="button"
                                                aria-label={showNewPassword ? "Password Visible" : "Password Invisible."}
                                                className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-400"
                                                onClick={() => {
                                                setShowNewPassword((prev) => !prev);
                                            }}
                                            >
                                                {showNewPassword ? (
                                                    <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="1.5"
                                                    stroke="currentColor"
                                                    className="w-6 h-6"
                                                    >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                                                    ></path>
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                    ></path>
                                                    </svg>
                                                ) : (
                                                    <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="1.5"
                                                    stroke="currentColor"
                                                    className="w-6 h-6"
                                                    >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88 6.228 6.228"
                                                    ></path>
                                                    </svg>
                                                )}
                                                </button>
                                        </div>
                                    </div>


                                </div>

                                <div className="flex gap-3 items-end justify-end">
                                    <Link href={`/planner/${id}`}>
                                <button className="bg-[#D9B34D] w-fit py-2 px-5 rounded-lg shadow-md hover:bg-[#d9b44dcc] text-white">
                                            Customer View
                                </button>
                                </Link>
                                    <button 
                                        className="bg-[#D9B34D] w-fit py-2 px-5 rounded-lg shadow-md hover:bg-[#d9b44dcc] text-white"
                                        onClick={()=>{handlePasswordChange(id,oldPwd,newPwd,retypeNewPwd); handleImageChange();}}
                                        >
                                            Save Changes
                                    </button>
                                    <button 
                                        className="bg-[#D9B34D] w-fit py-2 px-5 rounded-lg shadow-md hover:bg-[#d9b44dcc] text-white"
                                        onClick={()=>handlePasswordModal()}
                                        >
                                            Cancel Changes
                                    </button>
                                </div>

                            </div>
            
                        </div>
                    )
                }

                { EditCategoriesModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white rounded-xl w-[50%] px-10 py-8 flex flex-col gap-4">
                            <div className="font-bold text-xl flex mb-2 w-full relative">
                                <p>Categories</p>
                                <button className="absolute right-0" onClick={handleCategoriesModal}><IoClose /></button>
                                <hr />
                            </div>

                            <div className="flex gap-2 justify-evenly">
                                <label htmlFor="selectedCategories"  className="text-lg">Categories: </label>
                                <select value={selectedCategories} onChange={handleChange} name="selectedCategories" className="w-1/2 border-2 border-[#4c1b41] rounded-lg py-1 px-3">
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
                                    onClick={()=>handleAddCategory(selectedCategories,profileData.username)}
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

                {EditVenuesModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white rounded-xl max-h-[85%] w-[70%] px-10 py-6 flex flex-col gap-4 overflow-hidden">
                            {/* Modal Header */}
                            <div>
                                <div className="font-bold text-xl py-2 flex w-full relative">
                                    <p>Venues</p>
                                    <button className="absolute right-0" onClick={handleVenuesModal}>
                                        <IoClose />
                                    </button>
                                </div>
                                <hr />
                            </div>

                            {/* Scrollable Content */}
                            <div className="flex-1 overflow-y-auto pr-4">
                                {/* Venue Selection */}
                                <div className="flex gap-2 justify-evenly ">
                                    <label htmlFor="SelectedVenues" className="text-lg"> </label>
                                    <select 
                                        value={selectedOptionVen} 
                                        onChange={handleChangeVenue} 
                                        name="SelectedVenues" 
                                        className="w-full border-2 border-[#4c1b41] rounded-lg py-1 px-3">
                                        <option disabled defaultValue="Choose Venue" className="text-gray-300">
                                            Choose Venue To Add
                                        </option>
                                        {venue.map((ven, index) => (
                                            <option key={index} value={ven.name}>
                                                {ven.name}
                                            </option>
                                        ))}
                                    </select>
                                    <button
                                        onClick={() => handleAddVenues(selectedOptionVen, profileData.username)}
                                        className="bg-[#D9B34D] px-5 py-2 rounded-lg text-white hover:bg-[#d9b44dd3]"
                                    >
                                        Add
                                    </button>
                                </div>

                                {/* Your Venues */}
                                <div className="flex flex-col gap-2 mt-4">
                                    <div className="font-bold text-xl mb-2">Your Venues</div>
                                    <div className="flex gap-2 flex-wrap justify-center">
                                        {plannerVenueNames.length > 0 ? (
                                            plannerVenueNames.map((name, index) => (
                                                <div 
                                                    key={index} 
                                                    className="flex items-center justify-between gap-4 border-2 border-gray-400 py-2 px-4 rounded-2xl text-black">
                                                    <div>{name}</div>
                                                    <button>
                                                        <TiDelete onClick={() => handleDeleteVenue(name, id)} />
                                                    </button>
                                                </div>
                                            ))
                                        ) : (
                                            <div>No Venues yet</div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        onClick={() => setRequestVenue(!requestVenue)}
                                        className={`btn ${
                                            requestVenue ? "invisible" : "visible"
                                        }`}
                                    >
                                        Request New Venue
                                    </button>
                                </div>

                                {/* Request Venue */}
                                {requestVenue && (
                                    <div>
                                        <div className="font-bold text-xl mb-2">Request Venue</div>
                                        <hr />
                                        <form className="pt-4 flex flex-col" onSubmit={handleRequestVenue}>
                                        
                                        {responseMessage && (
                                            <p  className={`text-center h-fit rounded-lg border-2 p-1 mx-6 ${
                                                responseMessage.includes("successfully") ? "text-green-500 bg-green-200 border-green-500" : "text-red-500 border-red-500 bg-red-200"
                                              }`} >
                                                {responseMessage}
                                            </p>
                                        )}
                                            {/* venue name */}
                                            <div className="mt-6">
                                                <label htmlFor="name">Venue Name</label>
                                                <input 
                                                    type="text" id="name" className="input"
                                                    value={venueName}
                                                    onChange={(e)=>setVenueName(e.target.value)} />
                                                    {/* {console.log(venueName)} */}
                                            </div>
                                            {/* location */}
                                            <div>
                                                <label htmlFor="location">Location</label>
                                                <input 
                                                    type="text" id="location" className="input"
                                                    value={venueLocation}
                                                    onChange={(e)=>setVenueLocation(e.target.value)} />
                                                    {/* {console.log(venueLocation)} */}
                                            </div>

                                            {/* email */}
                                            {/* <div>
                                                <label htmlFor="email">Email</label>
                                                <input 
                                                    type="email" id="email" className="input"
                                                    value={venueEmail}
                                                    onChange={(e)=>setVenueEmail(e.target.value)} />
                                                    {console.log(venueEmail)}
                                            </div> */}

                                            {/* phone number */}
                                            {/* <div>
                                                <label htmlFor="phoneNumber">Phone Number</label>
                                                <input 
                                                    type="text" id="phoneNumber" className="input"
                                                    value={venuePhone}
                                                    onChange={(e)=>setVenuePhone(e.target.value)} />
                                                    {console.log(venuePhone)}

                                            </div> */}

                                            {/* description */}
                                            <div>
                                                <label htmlFor="description">Description</label>
                                                <input 
                                                    type="text" id="description" className="input"
                                                    value={venueDescription}
                                                    onChange={(e)=>setVenueDescription(e.target.value)} />
                                                    {/* {console.log(venueImage)} */}

                                            </div>

                                            {/* image  */}
                                            <div>
                                                <label htmlFor="image">Image</label>
                                                <input 
                                                    type="file" id="image" className="input" accept="image/*"
                                                    onChange={handleFileChange} />
                                            </div>

                                            {/* category list */}
                                            <div className="flex flex-col flex-wrap">
                                                <label htmlFor="selectedCategoriesVen" className="text-lg">Categories</label>
                                                <select
                                                value={selectedCategoriesVen}
                                                onChange={(e) => {
                                                    setSelectedCategoriesVen(e.target.value); 
                                                }}
                                                name="selectedCategoriesVen"
                                                className="input"
                                                >
                                                <option disabled={true} value="" className="text-gray-300">
                                                    Choose Category
                                                </option>
                                                {category.map((categoryItem, index) => (
                                                    <option
                                                        key={index}
                                                        value={categoryItem.id}
                                                    >
                                                        {categoryItem.name}
                                                    </option>
                                                ))}
                                                </select>
                                            </div>
                                            
                                            {/* sub category */}
                                            <div className="flex flex-col flex-wrap">
                                                <label htmlFor="selectedSubCategories" className="text-lg">Sub Categories</label>
                                                <select
                                                value={selectedSubCategories}
                                                onChange={(e) => {
                                                        setSelectedSubCategories(e.target.value)
                                                        // setSelectedSubCategoriesId(e.target.key)
                                                    }}
                                                name="selectedSubCategories"
                                                className="input"
                                                >
                                                <option disabled={true} value="" className="text-gray-300">
                                                    Choose Sub Category
                                                </option>
                                                {subCategory.map((sub,index) => (
                                                    <option key={index} value={sub.id}>
                                                        {sub.name}
                                                    </option>
                                                ))}
                                                </select>
                                               
                                            </div>
                                            <div className="flex flex-wrap gap-4 justify-end">
                                                <button className="btn" type="submit">Send Request</button>
                                                <button
                                                    onClick={() => {
                                                        setRequestVenue(!requestVenue)
                                                        handleClearVenueForm();
                                                    }}
                                                    className={`btn ${requestVenue ? "visible" : "invisible"}`}
                                                >
                                                    Cancel Request
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                )}                            
                            </div>
                        </div>
                    </div>
                )}
               
               {acceptVenueRequestAlert &&(
                    <div className="modal-overlay-status">
                        <div className="rounded-xl w-fit grid grid-cols-[0.25fr,1fr]">
                        <div className="bg-green-600 p-0 rounded-l-xl"></div>
                        <div className="p-5 bg-white  border-2 border-green-600 ">Request Sent to admin Successfully</div>
                        </div>
                    </div>
                )}

                {changePwdAlert &&(
                    <div className="modal-overlay-status">
                        <div className="rounded-xl w-fit grid grid-cols-[0.25fr,1fr]">
                        <div className="bg-green-600 p-0 rounded-l-xl"></div>
                        <div className="p-5 bg-white  border-2 border-green-600 ">Password Changed Successfully</div>
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

                {venueAcceptAlert &&(
                <div className="modal-overlay-status">
                    <div className="rounded-xl w-fit grid grid-cols-[0.25fr,1fr]">
                    <div className="bg-green-600 p-0 rounded-l-xl"></div>
                    <div className="p-5 bg-white  border-2 border-green-600 ">Venue Added to planner: 
                            <span className="font-bold">{profileData.username}</span> Successfully</div>
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

            {acceptDeletionVenueAlert &&(
                    <div className="modal-overlay-status">
                        <div className="rounded-xl w-fit grid grid-cols-[0.25fr,1fr]">
                        <div className="bg-green-600 p-0 rounded-l-xl"></div>
                        <div className="p-5 bg-white  border-2 border-green-600 ">Venue:  
                            <span className="font-bold">{deletedVenue}</span> has been deleted successfully</div>
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

                {venueFailureAlert &&(
                    <div className="modal-overlay-status">
                        <div className="rounded-xl w-fit grid grid-cols-[0.25fr,1fr]">
                        <div className="bg-red-600 p-0 rounded-l-xl"></div>
                        <div className="p-5 bg-white  border-2 border-red-600 ">Failed to add Venue to planner: 
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
