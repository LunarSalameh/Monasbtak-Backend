"use client"

import React, {useState, useEffect} from "react";
import { CgSandClock } from "react-icons/cg";
import { FaPersonWalking, FaCheck, FaCalendarCheck } from "react-icons/fa6";
import { useSearchParams } from 'next/navigation';


export default function TopSection () {
    const searchParams = useSearchParams();
    const planner_Id = searchParams.get('id'); 
    const [planner, setPlanner] = useState({});
    const [error, setError] = useState("");
        
    const [data, setData] = useState({
        Pending: 0,
        InProgress: 0,
        Accepted: 0,
        Finished: 0,
      });

    
    
      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`http://localhost/Monasbtak-Backend/php/api/planner/topSection/totalEvents.php?planner_Id=${planner_Id}`);
            const result = await response.json();
    
            if (result.success) {
              setData({
                Pending: result.Pending,
                InProgress: result.InProgress,
                Accepted: result.Accepted,
                Finished: result.Finished,
              });
            } else {
              setError("Failed to fetch data.");
            }
          } catch (error) {
            setError("Error fetching data.");
          }
        };

        const fetchplanner = async () => {
            try {
              const response = await fetch(`http://localhost/Monasbtak-Backend/php/api/planner/profile/getOnePlanner.php?id=${planner_Id}`);
              const result = await response.json();
      
              if (result.success) {
                setPlanner(result.planner);
              } else {
                setError("Failed to fetch planner.");
              }
            } catch (error) {
              setError("Error fetching data.");
            }
          };
    
        fetchData();
        fetchplanner();
      }, []);

    return (
        <>
            <section className="flex flex-col gap-8 my-2 p-8 w-full  font-bold text-xl items-center">
                {/** Welcome section */}
                <div className="flex justify-between gap-5" style={{width:'75%'}}>
                    <div>Hello {planner.username} 👋🏼,</div>
                    {/* <input type="search" className="rounded-xl font-normal max-md:hidden text-sm pl-3" placeholder="Search"/> */}
                </div>

                {/**Status Section */}
                <div className="bg-white rounded-xl shadow-md  w-[80%]  grid lg:grid-cols-4 md:grid-cols-2 max-sm:grid-cols-1 gap-3 p-5">

                    {/**Pending Events */}
                    <div className="flex gap-3 m-2">
                        <div className="bg-[#FFF7E0] rounded-full p-8 flex items-center"><CgSandClock  color="#D9B34D" size={20}/></div>
                        <div className="flex flex-col gap-1 justify-center">
                            <p className="text-gray-400 font-light text-xs">Pending Events</p>
                            <p className="font-bold text-lg text-center">{data.Pending}</p>
                        </div>
                    </div>

                    {/**In Progress Events */}
                    <div className="flex gap-3 m-2">
                        <div className="bg-[#FFF7E0] rounded-full p-8 flex items-center"><FaPersonWalking color="#D9B34D"size={18} /></div>
                        <div className="flex flex-col gap-1 justify-center">
                            <p className="text-gray-400 font-light text-xs">In Progress Events</p>
                            <p className="font-bold text-lg text-center">{data.InProgress}</p>
                        </div>
                    </div> 
                    
                    {/**Accepted Events */}
                    <div className="flex gap-3 m-2">
                        <div className="bg-[#FFF7E0] rounded-full p-8 flex items-center"><FaCheck color="#D9B34D" size={18}  /></div>
                        <div className="flex flex-col gap-1 justify-center">
                            <p className="text-gray-400 font-light text-xs">Accepted Events</p>
                            <p className="font-bold text-lg text-center">{data.Accepted}</p>
                        </div>
                    </div>

                    {/**Finished Events */}
                    <div className="flex gap-3 m-2">
                        <div className="bg-[#FFF7E0] rounded-full p-8 flex items-center"><FaCalendarCheck color="#D9B34D" size={18}/></div>
                        <div className="flex flex-col gap-1 justify-center">
                            <p className="text-gray-400 font-light text-xs">Finished Events</p>
                            <p className="font-bold text-lg text-center">{data.Finished}</p>
                        </div>
                    </div>
                </div>

            </section>
        </>
    )
 }