"use client";
import React, { useState, useEffect } from "react";
import { IoIosSearch } from "react-icons/io";
import Table from '../../../components/Admin/table/page';
import { useSearchParams } from 'next/navigation';
import { OrbitProgress } from 'react-loading-indicators';

import './page.css';

export default function AllEventsPlanner() {
    const [events, setEvents] = useState([]);
    const [loadingCurrent, setLoadingCurrent] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchCurrentEvents = async () => {
            try {
                const response = await fetch(`http://localhost/Monasbtak-Backend/php/api/admin/events/getAll.php`);
                
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const text = await response.text();
                const result = text ? JSON.parse(text) : {};

                if (result.status === 'success') {
                    const eventsWithDetails = await Promise.all(result.data.map(async (event) => {
                        const packageDetails = await fetchPackagesDetails(event.package_id);
                        const customerName = await fetchCustomerName(event.user_Id);
                        return { ...event, ...packageDetails, customer_name: customerName };
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
    }, []);

    const fetchCustomerName = async (userId) => {
        try {
            const response = await fetch(`http://localhost/Monasbtak-Backend/php/api/customer/profile.php?id=${userId}`);
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
            const response = await fetch(`http://localhost/Monasbtak-Backend/php/api/customer/getPackage.php?id=${packageId}`);
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
    };

    const columns = [
        {
            Header: 'Customer',
            accessor: 'customerName',
        },
        {
            Header: 'Package',
            accessor: 'package',
        },
        {
            Header: 'Location',
            accessor: 'location',
        },
        {
            Header: 'Date & Time',
            accessor: 'details'
        },
        {
            Header: 'Attendings',
            accessor: 'attendings'
        },
        {
            Header: 'Status',
            accessor: 'status'
        },
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
                            <div className='flex w-full justify-center justify-items-center pt-16'>
                                <OrbitProgress variant="track-disc" speedPlus="1" easing="linear" color="#D9B349" />
                            </div> 
                        ) : (
                            Array.isArray(filteredEvents) && filteredEvents.length > 0 ? (
                                <Table columns={columns} data={filteredEvents.map((event, index) => ({
                                    customerName: event.customer_name,
                                    package: event.name,
                                    location: event.location,
                                    details: `${event.eventDay} - ${event.eventTime}`,
                                    attendings: event.attendings,
                                    status: (
                                        <div className={`w-fit text-center text-white py-1 px-3 rounded-full max-sm:text-[12px] ${
                                            event.status === 'canceled' ? 'bg-gray-500' :
                                            event.status === 'pending' ? 'bg-orange-600' :
                                            event.status === 'accepted' ? 'bg-green-800' :
                                            event.status === 'rejected' ? 'bg-red-700' :
                                            event.status === 'in progress' ? 'bg-blue-600' :
                                            event.status === 'finished' ? 'bg-yellow-600' : ''
                                        }`}>
                                            {event.status}
                                        </div>
                                    ),
                                }))} />
                            ) : (
                                <div className="text-center">No events found</div>
                            )
                        )}
                    </div>
                </div>
            </div>
    );
}

