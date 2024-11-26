import React from 'react'
import './page.css'
import Navbar from '../../components/navbar/page';
import Footer from '../../components/footer/page';
import AllFeedback from '../../components/Customers/allFeedbackPlanner/page'


function page() {
  return (
    <>
    <Navbar />
    <div className='Page-Container'>
        <AllFeedback />
    </div>
    <Footer />
    </>
  )
}

export default page