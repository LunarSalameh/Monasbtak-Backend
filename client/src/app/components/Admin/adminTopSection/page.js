import { CgSandClock } from "react-icons/cg";
import { LuUsers2 } from "react-icons/lu";
import { FaBuilding , FaUsers } from "react-icons/fa6";

export default function AdminTopSection () {
    return (
        <>
            <section className="flex flex-col gap-8 mx-5 my-2 p-8   font-bold text-xl items-center">
                {/** Welcome section */}
                <div className="flex justify-between gap-5" style={{width:'80%'}}>
                    <div>Hello Admin #1👋🏼,</div>
                    <input type="search" className="rounded-xl font-normal max-md:hidden text-sm pl-3" placeholder="Search"/>
                </div>

                {/**Status Section */}
                <div className="bg-white rounded-xl shadow-md  w-[80%]  grid lg:grid-cols-3 md:grid-cols-2 max-sm:grid-cols-1 gap-3 p-5">

                    {/* Total Customers */}
                    <div className="flex gap-3 m-2">
                        <div className="bg-[#FFF7E0] rounded-full p-8 flex items-center"><LuUsers2  color="#D9B34D" size={20}/></div>
                        <div className="flex flex-col gap-1 justify-center">
                            <p className="text-gray-400 font-light text-s">Total Customers</p>
                            <p className="font-bold text-lg">5,437</p>
                        </div>
                    </div>

                    {/* Total Venues */}
                    <div className="flex gap-3 m-2">
                        <div className="bg-[#FFF7E0] rounded-full p-8 flex items-center"><FaBuilding color="#D9B34D"size={18} /></div>
                        <div className="flex flex-col gap-1 justify-center">
                            <p className="text-gray-400 font-light text-s">Total Venues</p>
                            <p className="font-bold text-lg">189</p>
                        </div>
                    </div> 
                    {/* Total Planners */}
                    <div className="flex gap-3 m-2">
                        <div className="bg-[#FFF7E0] rounded-full p-8 flex items-center"><FaUsers color="#D9B34D" size={18}  /></div>
                        <div className="flex flex-col gap-1 justify-center">
                            <p className="text-gray-400 font-light text-s">Total Planners</p>
                            <p className="font-bold text-lg">1825</p>
                        </div>
                    </div>
                </div>

            </section>
        </>
    )
 }