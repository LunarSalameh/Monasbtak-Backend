'use client';
import {React , useState} from 'react'
import { useEffect } from 'react';
import './page.css'
import Table from '../table/page'
import { Icon } from '@iconify/react'
import { IoIosSearch } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { FaRegCircleCheck } from "react-icons/fa6";
import { MdOutlineDeleteOutline } from "react-icons/md";

function page() {
    const [packages, setPackages] = useState([]);
    const [categories, setCategories] = useState([]);
    const [planner, setPlanner] = useState([]);
    const [viewdetails, setViewDetails] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [packageStatus, setPackageStatus] = useState(null);
    const [accepted, setAccepted] = useState(false);
    const [rejected, setRejected] = useState(false);
    const [loading, setLoading] = useState(true); 
    const [searchTerm, setSearchTerm] = useState(""); 

    const openViewDetails = (pkg) => {
        setSelectedPackage(pkg);
        setViewDetails(true);
    }
    const closeViewDetails = () => {
        setViewDetails(false);
    }

    const closeAccepted = () => {
        setAccepted(false);
    }
    const closeRejected = () => {
        setRejected(false);
    }

    const fetchPackages = async () => {
        try {
            const response = await fetch("http://localhost/Monasbtak-Backend/php/api/admin/packages/getPackagesRequest.php", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            if (!result.data || result.data.length === 0) {
                setPackages(null);
            }
            else if (result.status === 'error') {
                console.error(result.message);
                setPackages(null); 
            } else {
                setPackages(result.data);
            }
        } catch (error) {
            console.error('Error fetching packages:', error);
            setPackages(null); 
        } finally {
            setLoading(false); 
        }
    };

    useEffect(() => {
        fetchPackages();
    }, []); 

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://localhost/Monasbtak-Backend/php/api/planner/packages/getCategorySub.php');
                const result = await response.json();
                setCategories(result.categories);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
    
        fetchCategories();
    }, []); 
    
 useEffect(() => {
    const fetchPackageStatus = async () => {
        try {
            const response = await fetch('http://localhost/Monasbtak-Backend/php/api/admin/packages/changeRequest.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: selectedPackage.id,
                    status: packageStatus,
                    subCategory_id: selectedPackage.subCategory_id,
                    venue_id: selectedPackage.venue_id
                })
            });
            console.log(selectedPackage);
            const result = await response.json();
            if (result.message === 'Status updated successfully') {
                console.log('Package status updated');
            } else {
                console.error('Error updating package status:', result.message);
            }
        } catch (error) {
            console.error('Error updating package status:', error);
        }
    }

    if (selectedPackage && packageStatus) {
        fetchPackageStatus();
    }
}, [selectedPackage, packageStatus]);

    const getCategoryName = (categoryId) => {
        const category = categories.find(cat => cat.id === categoryId);
        return category ? category.name : 'Unknown';
    };

    const handleAccept = () => {
        setPackageStatus('Accepted');
        setViewDetails(false);
        setAccepted(true);
    };

    const handleReject = () => {
        setPackageStatus('Rejected');
        setViewDetails(false);
        setRejected(true);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredPackages = Array.isArray(packages) ? packages.filter(pkg =>
        pkg.planner_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        getCategoryName(pkg.category_id).toLowerCase().includes(searchTerm.toLowerCase())
    ) : [];
      
      const columns = [
        {
          Header: 'Planner Name',
          accessor: 'name',
        },
        {
            Header:'Package Name',
            accessor:'packageName'
        },
        {
          Header: 'Category',
          accessor: 'category',
        },
        {
            Header: 'Sub Category',
            accessor: 'subCategory',
        },
        {
          Header: 'venue Name',
          accessor: 'venue',
        },
        {
            Header:'',
            accessor:'view'
        }
      ];
      
  return (
    <div className='page-container'>
        <div className='requests-container'>
            <div className='main-top'>
                <div className='header'>
                <span className='large-font-size bold-font'>Packages Requests</span>
                </div>
                <div className="search-container">
                    <IoIosSearch className="search-icon" />
                    <input
                        type="search"
                        className="search-bar mid-font-size"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>
            </div>
            <hr className='line'/>
            <div className='table-container'>
                {loading ? (
                    <div>Loading...</div> 
                ) : (
                    Array.isArray(filteredPackages) && filteredPackages.length > 0 ? (
                        <Table columns={columns} data={filteredPackages.map((pkg, index) => ({
                            name: pkg.planner_name,
                            packageName: pkg.name,
                            category: getCategoryName(pkg.category_id),
                            subCategory: pkg.subCat_name,
                            venue: pkg.location,
                            view: <button className='btn' onClick={() => openViewDetails(pkg)}>View</button>,
                        }))} />
                    ) : (
                        <div>No Requests Available</div>
                    )
                )}
            </div>
        </div>
        {viewdetails && selectedPackage && (
           <div className='modal-overlay'>
                <div className='modal'>
                    <button className="close-button" onClick={closeViewDetails}><IoClose /></button>
                    <span className='bold-font'>New Package Details</span>
                    <hr className='line'/>
                    <div className="modal-buttons">
                         <button className='btn-package' onClick={handleAccept}><FaRegCircleCheck /> Accept</button>
                         <button className='btn-package' onClick={handleReject}> <MdOutlineDeleteOutline /> Reject</button>
                    </div>
                    <div className="modal-details">
                    <div className='modal-img-container-details'>
                        <img src={`data:image/jpeg;base64,${selectedPackage.image}`} className='package-img-details'/>
                        </div>
                        <div className='modal-package-details '>
                            <div className='package-detail'>
                                <span className='large-font-size bold-font'>Package Name:  </span>
                                <span className='large-font-size'>{selectedPackage.name}</span>
                            </div>
                            <div className='package-detail'>
                                <span className='mid-font-size bold-font'>Planner Name:  </span>
                                <span className='mid-font-size'>{selectedPackage.planner_name}</span>
                            </div>
                            <div className='package-detail'>
                                <span className='mid-font-size bold-font'>Category:  </span>
                                <span className='mid-font-size'>{getCategoryName(selectedPackage.category_id)}</span>
                            </div>
                            <div className='package-detail'>
                                <span className='mid-font-size bold-font'>Sub Category:  </span>
                                <span className='mid-font-size'>{selectedPackage.subCat_name}</span>
                            </div>
                            <div className='package-detail'>
                                <span className='mid-font-size bold-font'>Venue:  </span>
                                <span className='mid-font-size'>{selectedPackage.location}</span>
                            </div>
                            <div className='package-detail'>
                                <span className='mid-font-size bold-font'>Description:  </span>
                                <span className='mid-font-size'>{selectedPackage.description}</span>
                            </div>
                        </div>
                </div>
              </div>
            </div>
        )}
        {accepted && (
        <div className="modal-overlay">
          <div className="added-modal">
            <span className='added-text'>Package Accepted Successfully</span>
            <div className="modal-content">
              <button className='btn' onClick= {() => {closeAccepted(); fetchPackages(); }}>
                OK
              </button>
            </div>
          </div>
        </div>
        )}
        {rejected && (
        <div className="modal-overlay">
          <div className="added-modal">
            <span className='added-text'>Package Rejected Successfully</span>
            <div className="modal-content">
              <button className='btn' onClick={() => { closeRejected(); fetchPackages(); }}>
                OK
              </button>
            </div>
          </div>
        </div>
        )}
    </div>
  )
}

export default page