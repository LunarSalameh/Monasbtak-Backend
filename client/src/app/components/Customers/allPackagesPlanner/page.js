'use client';
import React , {useState, useEffect} from 'react'
import './page.css'
import Favorite from '../../Favorite/page'
import { CiLocationOn } from "react-icons/ci";
import { useSearchParams } from 'next/navigation';

function PlannerPackages() {
  const searchParams = useSearchParams();
    const id = searchParams.get('planner_id');  //planner_id
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
    <div className='All-Packages-container'>
        <span className='XL-font-size font-color bold-font'>Packages</span>
        <hr className='All-line'/>
        <div className='All-Packages-types'>
        {loading ? (
              <p>Loading...</p>
            ) : (
              packages.length > 0 ? (
                packages.map((pkg, index) => (
          <div className='All-Package-Box' key={index}>
            <div className='All-Package-img-container'>
              <img src={`data:image/jpeg;base64,${pkg.image}`} className='All-Package-img' />
              {/* <div className='Transparent-Box'>
                    <Favorite isFavorite={true}/>
              </div> */}
              <span className='All-Price-tag'>JD {pkg.price}</span>
            </div>
            <span className='mid-font-size bold-font'>{pkg.name}</span>
            <div className='All-row-felx'>
              <CiLocationOn />
              <span>{pkg.location}</span>
            </div>
          </div>
        ))
        ) : (
          <p>No packages found</p>
        )
        )}
        </div>

    </div>
  )
}

export default PlannerPackages