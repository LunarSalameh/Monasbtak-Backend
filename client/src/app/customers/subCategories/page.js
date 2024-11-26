import React from 'react'
import Navbar from "../../components/navbar/page";
import SubCategories from "../../components/subCategories/Scategories";
// import AllVenue from "../../components/Allvenues/Allvenues";
import Footer from "../../components/footer/page";

function page() {
  return (
    <>
        <Navbar />
        <SubCategories />
        {/* <AllVenue /> */}
        <Footer />
    </>
  )
}

export default page