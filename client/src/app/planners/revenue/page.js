"use client"

import TopSection from "../../components/planners/topSection/page";
import Sidebar from "../../components/sidebar/page";
import {React} from "react";
import { useSearchParams } from 'next/navigation';




export default function Revenue () {
    const searchParams = useSearchParams();
    const id = searchParams.get('id'); // Get user ID from the query parameters

    return (
        <>
        <div className="flex">
        <Sidebar id={id}/>
        <div className="flex flex-col" style={{width:'90%', marginLeft:'auto'}}>
            <TopSection />
            revenue
        </div>
    </div>
    </>
    )
}