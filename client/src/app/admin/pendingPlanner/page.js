

import React from 'react'
import TopSection from "../../components/Admin/adminTopSection/page";
import Sidebar from "../../components/adminSidebar/page";
import PlannerStatus from '@/app/components/Admin/plannersStatus/page';

export default function PendingPlanner () {
    return (
        <>
        <div className="flex">
            <Sidebar/>
            <div className="flex flex-col" style={{width:'90%', marginLeft:'auto'}}>    
                <TopSection/>
                <PlannerStatus />
            </div>
        </div>
    </>
    )
}