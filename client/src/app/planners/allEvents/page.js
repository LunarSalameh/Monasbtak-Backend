"use client";

import {React} from "react";
import AllEventsPlanner from "../../components/planners/events/page";
import TopSection from "../../components/planners/topSection/page";
import Sidebar from "../../components/sidebar/page";

import './page.css'

export default function AllEvents () {
  return(
      <div className="flex">
          <Sidebar/>
          <div className="flex flex-col" style={{width:'90%', marginLeft:'auto'}}>
              <TopSection />
              <AllEventsPlanner />

          </div>
      </div>
    )
}

