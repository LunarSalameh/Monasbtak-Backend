import React from 'react'
import './page.css'
import Navbar from '../../components/navbar/page';
import Footer from '../../components/footer/page';
import AllFav from '../../components/Customers/showAllFav/page'

function page() {
  return (
    <>
    <Navbar />
    <div className='Page-Container'>
        <AllFav />
    </div>
    <Footer />
    </>
  )
}

export default page