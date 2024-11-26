import React from 'react'
import TopSection from "../../components/Admin/adminTopSection/page";
import Sidebar from "../../components/adminSidebar/page";
import Available from "../../components/Admin/available/page";

function page() {
  return (
    <>
        <div className="flex">
            <Sidebar/>
            <div className="flex flex-col" style={{width:'90%', marginLeft:'auto'}}>
                <TopSection />
                <Available/>
            </div>
        </div>
        </>
  )
}

export default page