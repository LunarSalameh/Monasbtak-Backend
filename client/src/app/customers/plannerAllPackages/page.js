import React from 'react'
import './page.css'
import Navbar from '../../components/navbar/page';
import Footer from '../../components/footer/page';
import AllPackages from '../../components/Customers/allPackagesPlanner/page'

function page() {
  return (
    <>
    <Navbar />
    <div className='Page-Container'>    
        <AllPackages />
    </div>
    <Footer />
    </>
  )
}

export default page