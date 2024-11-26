"use client";

import React from 'react';
import ReactDatePicker from './ReactDatePicker';
import NumberBox from './box';
import PackageDetails from './PackageDetails';
import Navbar from '../../components/navbar/page';
import Footer from '../../components/footer/page';
import '../../globals.css';

function onePackageBooking() {
    return (
        <div className="Page-container">
            <Navbar/>
            <PackageDetails />
            <ReactDatePicker />

            <Footer/>
        </div>
    );
}

export default onePackageBooking;
