import {React} from "react";
import Sidebar from '../../components/adminSidebar/page'
import TopSection from "../../components/Admin/adminTopSection/page";
import Users from '../../components/Admin/users/page';

export default function page () {
    return (
        <>
            <div className="flex">
            <Sidebar/>
            <div className="flex flex-col" style={{width:'90%', marginLeft:'auto'}}>
                <TopSection />
                <Users />
            </div>
        </div>
        </>
    )
}