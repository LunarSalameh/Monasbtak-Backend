
import TopSection from "../../components/Admin/adminTopSection/page";
import Sidebar from "../../components/adminSidebar/page";
import Venue from '../../components/Admin/venues/page'
import {React} from "react";

export default function Venues () {
    return (
        <>
            <div className="flex">
            <Sidebar/>
            <div className="flex flex-col" style={{width:'90%', marginLeft:'auto'}}>
                <TopSection />
                <Venue />
            </div>
        </div>
        </>
    )
}