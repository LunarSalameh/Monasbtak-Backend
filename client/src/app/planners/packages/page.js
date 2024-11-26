
import TopSection from "../../components/planners/topSection/page";
import Sidebar from "../../components/sidebar/page";
import {React} from "react";
import PlannerPackages from "../../components/planners/Packages/page";

export default function Packages () {
    return (
        <>
        <div className="flex">
            <Sidebar/>
            <div className="flex flex-col" style={{width:'90%', marginLeft:'auto'}}>
                <TopSection />
                <PlannerPackages />
            </div>
        </div>
        </>
    )
}