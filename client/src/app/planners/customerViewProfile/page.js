'use client';
import React from 'react'
import './page.css'
import PlannerProfileDetails from '../../components/planners/plannerProfileDetails/page';
import PlannerProfilePackages from '../../components/planners/plannerProfileP0ackages/page';
import PlannerAlbum from '../../components/planners/plannerProfileAlbum/page';

function PlannerProfile() {
  return (
    <>
      <div className='Page-Container'>
          <PlannerProfileDetails />
          <PlannerProfilePackages />
          <PlannerAlbum />  
      </div>
    </>
  )
}

export default PlannerProfile