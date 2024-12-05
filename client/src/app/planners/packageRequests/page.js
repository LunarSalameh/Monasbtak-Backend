import {React} from "react";
import TopSection from "../../components/planners/topSection/page";
import Sidebar from "../../components/sidebar/page";
import PackageRequest from '../../components/planners/packageRequests/page';

export default function PackageRequests() {
    return (
        <>
        <div className="flex">
            <Sidebar/>
            <div className="flex flex-col" style={{width:'90%', marginLeft:'auto'}}>
                <TopSection />
                <PackageRequest />
            </div>
        </div>
        </>
    )
}