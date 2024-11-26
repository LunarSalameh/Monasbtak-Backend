import React from 'react'
import './page.css'
import Navbar from '../../components/navbar/page';
import Footer from '../../components/footer/page';
import ShowPrevEvents from '../../components/Customers/showPrevEvents/page'

function page() {
  return (
    <>
      <Navbar />
      <div className='Page-Container'>
          <ShowPrevEvents />
      </div>
      <Footer />
    </>
  )
}

export default page