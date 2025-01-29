
"use client"

import React, {useState, useEffect} from "react";
import { CgSandClock } from "react-icons/cg";
import { LuUsers2 } from "react-icons/lu";
import { FaBuilding , FaUsers } from "react-icons/fa6";
import { useSearchParams } from 'next/navigation';

export default function AdminTopSection () {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');  //admin_id
  const [admin, setAdmin] = useState({});
    
    const [data, setData] = useState({
        users: 0,
        venues: 0,
        planners: 0,
      });
    
      const [error, setError] = useState("");
    
      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch("http://localhost/Monasbtak-Backend/php/api/admin/topSection/totalUsers.php");
            const result = await response.json();
    
            if (result.success) {
              setData({
                users: result.users,
                venues: result.venues,
                planners: result.planners,
              });
            } else {
              setError("Failed to fetch data.");
            }
          } catch (error) {
            setError("Error fetching data.");
          }
        };

        const fetchAdmin = async () => {
            try {
              const response = await fetch(`http://localhost/Monasbtak-Backend/php/api/admin/getAdmin.php?id=${id}`);
              const result = await response.json();
      
              if (result.success) {
                setAdmin(result.admin);
              } else {
                setError("Failed to fetch admin.");
              }
            } catch (error) {
              setError("Error fetching data.");
            }
          }
    
        fetchData();
        fetchAdmin();
      }, []);

    return (
        <>
            <section className="flex flex-col gap-8 mx-5 my-2 p-8   font-bold text-xl items-center">
                {/** Welcome section */}
                <div className="flex justify-between gap-5" style={{width:'80%'}}>
                    <div>Hello {admin.username} 👋🏼,</div>
                    {/* <input type="search" className="rounded-xl font-normal max-md:hidden text-sm pl-3" placeholder="Search"/> */}
                </div>

                {/**Status Section */}
                <div className="bg-white rounded-xl shadow-md  w-[80%]  grid lg:grid-cols-3 md:grid-cols-2 max-sm:grid-cols-1 gap-3 p-5">

                    {/* Total Customers */}
                    <div className="flex gap-3 m-2">
                        <div className="bg-[#FFF7E0] rounded-full p-8 flex items-center"><LuUsers2  color="#D9B34D" size={20}/></div>
                        <div className="flex flex-col gap-1 justify-center">
                            <p className="text-gray-400 font-light text-s">Total Customers</p>
                            <p className="font-bold text-lg text-center">{data.users}</p>
                        </div>
                    </div>

                    {/* Total Venues */}
                    <div className="flex gap-3 m-2">
                        <div className="bg-[#FFF7E0] rounded-full p-8 flex items-center"><FaBuilding color="#D9B34D"size={18} /></div>
                        <div className="flex flex-col gap-1 justify-center">
                            <p className="text-gray-400 font-light text-s">Total Venues</p>
                            <p className="font-bold text-lg text-center">{data.venues}</p>
                        </div>
                    </div> 
                    {/* Total Planners */}
                    <div className="flex gap-3 m-2">
                        <div className="bg-[#FFF7E0] rounded-full p-8 flex items-center"><FaUsers color="#D9B34D" size={18}  /></div>
                        <div className="flex flex-col gap-1 justify-center">
                            <p className="text-gray-400 font-light text-s">Total Planners</p>
                            <p className="font-bold text-lg text-center">{data.planners}</p>
                        </div>
                    </div>
                </div>

            </section>
        </>
    )
 }