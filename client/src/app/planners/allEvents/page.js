"use client";

import {React} from "react";
import AllEventsPlanner from "../../components/planners/events/page";
import TopSection from "../../components/planners/topSection/page";
import Sidebar from "../../components/sidebar/page";
import { useSearchParams } from 'next/navigation';

import './page.css'

export default function AllEvents () {
    const searchParams = useSearchParams();
    const id = searchParams.get('id'); // Get user ID from the query parameters

  return(
      <div className="flex">
          <Sidebar id={id}/>
          <div className="flex flex-col" style={{width:'90%', marginLeft:'auto'}}>
              <TopSection />
              <AllEventsPlanner />

          </div>
      </div>
    )
}

