"use client"

import CurrentEvents from "../../components/planners/currentEvents/page";
import PendingOffers from "../../components/planners/pendingOffers/page";
import PreviousEvents from "../../components/planners/previousEvents/page";
import TopSection from "../../components/planners/topSection/page";
import Sidebar from "../../components/sidebar/page";
import {React} from "react";
import { useSearchParams } from 'next/navigation';


export default function PlannerHome () {
    const searchParams = useSearchParams();
    const id = searchParams.get('id'); // Get user ID from the query parameters

    return (
        <>
        <div className="flex">
            <Sidebar id={id}/>
            <div className="flex flex-col" style={{width:'90%', marginLeft:'auto'}}>
                <TopSection />
                <PendingOffers/>
                <CurrentEvents />
                <PreviousEvents />
            </div>
        </div>
        </>
    );
}