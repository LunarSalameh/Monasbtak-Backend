import React from 'react'
import './page.css'
import Navbar from '../../components/navbar/page';
import Footer from '../../components/footer/page';
import ShowCurrentEvents from '../../components/Customers/showCurrentEvents/page'

function page() {
  return (
    <>
    <Navbar />
    <div className='Page-Container'>
        <ShowCurrentEvents />
    </div>
    <Footer />
    </>
  )
}

export default page