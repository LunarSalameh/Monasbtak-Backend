"use client"

import TopSection from "../../components/planners/topSection/page";
import Sidebar from "../../components/sidebar/page";
import {React} from "react";
import Album from'../../components/planners/eventAlbum/page'
import { useSearchParams } from 'next/navigation';


export default function EventAlbum () {
    const searchParams = useSearchParams();
    const id = searchParams.get('id'); // Get user ID from the query parameters

    return (
        <>
            <div className="flex">
            <Sidebar/>
            <div className="flex flex-col" style={{width:'90%', marginLeft:'auto'}}>
                <TopSection />
                <Album/>
            </div>
        </div>
        </>
    )
}