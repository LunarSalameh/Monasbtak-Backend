import Events from '../../components/Admin/events/page';
import Sidebar from "../../components/adminSidebar/page";
import TopSection from "../../components/Admin/adminTopSection/page";

export default function AllEvents () {
    return (
        <div className="flex">
        <Sidebar/>
        <div className="flex flex-col" style={{width:'90%', marginLeft:'auto'}}>
            <TopSection />
            <Events />

         </div>
    </div>
    )
}