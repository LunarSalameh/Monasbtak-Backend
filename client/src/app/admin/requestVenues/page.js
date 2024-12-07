

import React from 'react'
import TopSection from "../../components/Admin/adminTopSection/page";
import Sidebar from "../../components/adminSidebar/page";
import PendingVenues from '../../components/Admin/PendingVenues/page'

export default function RequestVenues () {
    return (
        <>
        <div className="flex">
            <Sidebar/>
            <div className="flex flex-col" style={{width:'90%', marginLeft:'auto'}}>    
                <TopSection/>
                <PendingVenues />
            </div>
        </div>
    </>
    )
}