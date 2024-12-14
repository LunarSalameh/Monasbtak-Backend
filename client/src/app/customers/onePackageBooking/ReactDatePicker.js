import React, { useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import NumberBox from './box';
import "react-datepicker/dist/react-datepicker.css";
import './calender.css';
import { useSearchParams } from 'next/navigation';

function ReactDatePicker(){
    const searchParams = useSearchParams();
    const userId = searchParams.get('id'); // userId 
    const id = searchParams.get('packageId'); //package id
    const [selectedDate, setSelectedDate] = useState(null);
    const [packageDetails, setPackageDetails] = useState(null);
    const numberBoxRef = useRef(null);
    const [acceptAlert, setAcceptAlert] = useState(false);

  useEffect(() => {
    const fetchPackageDetails = async () => {
      try {
        const response = await fetch(`http://localhost/Monasbtak-Backend/php/api/customer/getPackage.php?id=${id}`);
        const data = await response.json();
        if (data.status === 'success') {
          setPackageDetails(data.data[0]);
        } else {
          setPackageDetails(null);
        }
      } catch (error) {
        console.error('Error fetching package details:', error);
        setPackageDetails(null);
      }
    };

    if (id) {
      fetchPackageDetails();
    }
  }, [id]);


    const handelDateChange = (date) => {
        setSelectedDate(date);
    };
const mindate = new Date()
mindate.setDate(mindate.getDate() + 1)

const maxdate = new Date()
maxdate.setDate(maxdate.getDate() +365)

    const handleBooking = async () => {
        if (!selectedDate || !packageDetails) {
            alert('Please select a date and ensure package details are loaded.');
            return;
        }

        const attendings = numberBoxRef.current ? numberBoxRef.current.value : '';

        if (!attendings) {
            alert('Please enter the number of attendings.');
            return;
        }

        const bookingData = {
            name: packageDetails.name,
            planner_Id: packageDetails.planner_id,
            eventDay: selectedDate.toISOString().split('T')[0],
            attendings: attendings,
            eventTime: selectedDate.toTimeString().split(' ')[0],
            package_id: id,
            user_Id: userId, 
        };

        console.log('Booking Data:', bookingData); // Debugging: Log the booking data

        try {
            const response = await fetch('http://localhost/Monasbtak-Backend/php/api/customer/bookEvent.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bookingData)
            });

            const result = await response.json();
            if (result.message === 'Event created successfully') {
                setAcceptAlert(true);
                setTimeout(() => {
                    window.location.href = `/customers/profile/?id=${userId}`;
                }, 1500); 
            } 
        } catch (error) {
            console.error('Error booking event:', error);
            alert('Failed to book event');
        }
    };

    return(
        <div className="flex flex-col items-center gap-4 ">
            {acceptAlert && (
                <div className="fixed top-4 right-4 modal-overlay-status">
                    <div className="rounded-xl w-fit grid grid-cols-[0.25fr,1fr]">
                        <div className="bg-green-600 p-0 rounded-l-xl"></div>
                        <div className="p-5 bg-white border-2 border-green-600">Package Booked Successfully</div>
                    </div>
                </div>
            )}
        <div className="w-[100%] ">
            <div className="cal-container max-md:flex-row">
            
            <div className="booking">
                <h3 className="event_day">Select your Event Day</h3>
        
                <DatePicker
                    selected={selectedDate}
                    onChange={handelDateChange}
                    dateFormat="MM/dd/yyyy   hh:mm:aa"
                    minDate={mindate}
                    showTimeSelect
                    timeIntervals={60} 
                    timeFormat="hh:mm:aa"
                    className="calender_design"
                    placeholderText="Select date & Time"
                    maxDate={maxdate}
                />

            </div>
            
            <NumberBox ref={numberBoxRef} />
            
            </div>
        </div>

        <button onClick={handleBooking} className="bg-[#4C1B41] py-2 rounded-lg text-white width ">Book</button>

        </div>
    )

}

export default ReactDatePicker;
