"use client"
import {React, useState} from "react";


import { FaKey, FaRegCalendarCheck, FaDollarSign, FaCircle } from "react-icons/fa6";
import { MdPeopleAlt } from "react-icons/md";
import { FiPackage } from "react-icons/fi";
import { IoMdPhotos } from "react-icons/io";
import { HiOutlineViewList } from "react-icons/hi";

export default function Sidebar () {
    const [open,setOpen] = useState(true);

    const menu = [
        {title: "Home Dashboard", src:<FaKey/> , path:"/planners/home"},
        {title: "Planner Profile", src:<MdPeopleAlt/>, path:"/planners/profile" },
        {title: "packages", src:<FiPackage/> , path:"/planners/packages" },
        {title: "Event Album", src:<IoMdPhotos/>, path:"/planners/eventAlbum"},
        {title: "Events", src:<FaRegCalendarCheck /> , path:"/planners/allEvents"},
        // {title: "Revenue", src:<FaDollarSign />, path:"/planners/revenue" }
    ]


    return (
        <>
            <aside className="flex h-full">
                <div style={{ height: '100%' , position:'fixed', zIndex: '2'}}className={` ${open ? "w-64" : "w-20"} bg-white shadow-lg text-[#D9B34D]  p-5 duration-300`}>
                    {
                        open ? 
                            <img 
                                src="/Monasbtak-EN.png" 
                                onClick={() => setOpen(!open)}
                                className="cursor-pointer border-b-2 "/> 
                            :
                            <div className="justify-items-center border-b-2 ">
                                <HiOutlineViewList onClick={() => setOpen(!open)} className={`mb-2 cursor-pointer duration-300`}/> 
                            </div>
                    }
                    
                    <ul className={`flex flex-col gap-5 justify-center py-7 ${open ? "px-4" : "px-1"} text-center`} >
                        {menu.map((Menu,index) => (
                            <li 
                                key={index}
                                className={`flex cursor-pointer p-2 items-center justify-items-center active:bg-[#D9B34D] active:text-white hover:bg-gray-100 rounded-lg`}
                            >
                                <a
                                    href={Menu.path}>
                                    <div className="flex gap-4">
                                        <div className="flex justify-center items-center">{Menu.src}</div>
                                        <span className={` ${!open && "hidden"} origin-left duration-200`}>{Menu.title}</span>
                                    </div>
                                </a>
                            </li>
                        ))}
                    </ul>
                    <div style={{ marginTop: '295px' }} className=" flex items-end gap-4 p-5 ">
                        <FaCircle color="#D9B34D" size={48}/>
                        { open &&
                            <div className={`text-sm flex flex-col`}>
                                <p className="font-bold">UserName</p>
                                <p>Planner/Vedor</p>
                            </div>
                            }

                    </div>
                </div>
            </aside>
        </>
    );
}