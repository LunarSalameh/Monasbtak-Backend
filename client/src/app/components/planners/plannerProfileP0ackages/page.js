'use client';
import React, { useState, useEffect } from 'react'
import './page.css'
import Favorite from '../../Favorite/page'
import { CiLocationOn } from "react-icons/ci";
import Link from 'next/link'
import { useSearchParams } from 'next/navigation';

function PlannerPackages() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');  //planner_id
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch(
          `http://localhost/Monasbtak-Backend/php/api/customer/getPlannerPackages.php?planner_id=${id}`
        );
        const data = await response.json();
        if (data.status === 'success') {
          setPackages(data.data);
        } else {
          setPackages([]);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchPackages();
  }
  , [id]);

  return (
    <div className='Packages-container'>
      <div className='showall'> 
        <span className='XL-font-size font-color bold-font'>Packages</span>
        <Link href={`/customers/plannerAllPackages?id=${id}`} >
          <span className='small-font-size bold-font Show-Button'>Show All</span>
        </Link>
      </div>
        <hr className='line'/>

        <div className='Packages-types'>

          <div className='Planner-package-phone-view'>
            {loading ? (
              <p>Loading...</p>
            ) : (
              packages.length > 0 ? (
                packages.map((pkg, index) => (
                  <div className='Package-Box' key={index}>
                    <div className='Package-img-container'>
                      <img src={`data:image/jpeg;base64,${pkg.image}`} className='Package-img' />
                      {/* <div className='Transparent-Box'>
                        <Favorite isFavorite={true}/>
                      </div> */}
                      <span className='Price-tag'>JD {pkg.price}</span>
                    </div>
                    <span>{pkg.name}</span>
                    <div className='row-felx'>
                      <CiLocationOn />
                      <span>{pkg.location}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p>No packages available.</p>
              )
            )}
          </div>
          
        </div>

    </div>
  )
}

export default PlannerPackages