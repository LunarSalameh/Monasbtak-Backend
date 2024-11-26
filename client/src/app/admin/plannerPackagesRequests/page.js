import {React} from "react";
import TopSection from "../../components/Admin/adminTopSection/page";
import Sidebar from "../../components/adminSidebar/page";
import Request from "../../components/Admin/requests/page";
function page() {
  return (
    <>
        <div className="flex">
            <Sidebar/>
            <div className="flex flex-col" style={{width:'90%', marginLeft:'auto'}}>
                <TopSection />
                <Request/>
            </div>
        </div>
        </>
  )
}

export default page