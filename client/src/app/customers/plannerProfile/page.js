import React from 'react'
import './page.css'
import Navbar from '../../components/navbar/page';
import Footer from '../../components/footer/page';
import PlannerProfileDetails from '../../components/Customers/plannerProfileDetails/page';
import PlannerProfilePackages from '../../components/Customers/plannerProfileP0ackages/page';
import PlannerAlbum from '../../components/Customers/plannerProfileAlbum/page';
import PlannerFeedback from '../../components/Customers/plannerProfileFeedback/page';

function PlannerProfile() {
  return (
    <>
      <Navbar />
      <div className='Page-Container'>
          <PlannerProfileDetails />
          <PlannerProfilePackages />
          <PlannerAlbum />  
          <PlannerFeedback />
      </div>
      <Footer />
    </>
  )
}

export default PlannerProfile