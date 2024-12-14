"use client";
import { React, useEffect, useState } from "react";
import { FaKey, FaBuilding, FaRegCircleUser, FaRegCalendar, FaDollarSign, FaCircle } from "react-icons/fa6";
import { FiPackage } from "react-icons/fi";
import { LuPackageCheck, LuPackagePlus } from "react-icons/lu";
import { HiOutlineViewList } from "react-icons/hi";
import { useSearchParams } from "next/navigation";
import { IoPersonAddSharp } from "react-icons/io5";

export default function Sidebar() {
    const searchParams = useSearchParams();
    const id = searchParams.get("id"); 
    const [open, setOpen] = useState(true);
    const [openSubmenu, setOpenSubmenu] = useState(null);
    const [admin, setAdmin] = useState({});
    const [error, setError] = useState("");

    const menu = [
        {title: "Home Dashboard", src:<FaKey/> , path:`/admin/dashboard?id=${id}`},
        {title: "Venues", src:<FaBuilding/>, 
            submenu: [
                { title: "All Venues", src:<LuPackageCheck />, path: `/admin/venues?id=${id}` },
                { title: "Request Venues", src:<LuPackagePlus />, path: `/admin/requestVenues?id=${id}` },
            ]
         },
        {title: "Users", src:<FaRegCircleUser /> , path:`/admin/users?id=${id}` },
        {title: "Planner Packages", src:<FiPackage/>,
            submenu: [
                { title: "Packages Requests", src:<LuPackagePlus />, path: `/admin/plannerPackagesRequests?id=${id}` },
                { title: "Packages Available", src:<LuPackageCheck />, path: `/admin/plannerPackagesAvailable?id=${id}` }
              ]
        },
        {title: "Pending Planners", src:<IoPersonAddSharp /> , path:`/admin/pendingPlanner?id=${id}`},
        {title: "All Events", src:<FaRegCalendar /> , path:`/admin/events?id=${id}`},
        // {title: "Revenue", src:<FaDollarSign />, path:"/admin/revenue" }
    ]

    const handleToggle = (title) => {
        setOpenSubmenu((prev) => (prev === title ? null : title)); // Toggle submenu
    };

    useEffect(() => {
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
    fetchAdmin();
    }
    , [id]);

    return (
        <>
            <aside className="flex h-full">
                <div
                    style={{ height: "100%", position: "fixed", zIndex: 1, display: "flex", flexDirection: "column", justifyContent:"space-between" }}
                    className={` ${open ? "w-64" : "w-20"} bg-white shadow-lg text-[#D9B34D] p-5 duration-300`}
                >
                    <div className="flex-col justify-center items-center">
                    {open ? (
                        <img
                            src="/Monasbtak-EN.png"
                            onClick={() => setOpen(!open)}
                            className="cursor-pointer border-b-2 "
                        />
                    ) : (
                        <div className="justify-items-center border-b-2 ">
                            <HiOutlineViewList
                                onClick={() => setOpen(!open)}
                                className={`mb-2 cursor-pointer duration-300`}
                            />
                        </div>
                    )}

                    <ul className={`flex flex-col gap-5 justify-center py-7 ${open ? "px-4" : "px-1"} text-center`}>
                        {menu.map((Menu, index) => (
                            <li key={index} className={`flex flex-col cursor-pointer items-start justify-items-center`}>
                                <div
                                    className="w-full p-2 active:bg-[#D9B34D] active:text-white hover:bg-gray-100 rounded-lg"
                                    onClick={() => handleToggle(Menu.title)}
                                >
                                    <div className="flex gap-4">
                                        <div className="flex justify-center items-center">{Menu.src}</div>
                                        <span className={` ${!open && "hidden"} origin-left duration-200`}>
                                            {Menu.title}
                                        </span>
                                    </div>
                                </div>
                                {Menu.submenu && openSubmenu === Menu.title && (
                                    <ul className={`pl-8 ${!open && "hidden"} w-full`}>
                                        {Menu.submenu.map((submenuItem, subIndex) => (
                                            <li
                                                key={subIndex}
                                                className="flex cursor-pointer items-center justify-items-center"
                                            >
                                                <a
                                                    href={submenuItem.path}
                                                    style={{ width: "113%" }}
                                                    className="p-2 active:bg-[#D9B34D] active:text-white hover:bg-gray-100 rounded-lg"
                                                >
                                                    <div className="flex gap-4" style={{ width: "170px" }}>
                                                        <div className="flex justify-center items-center">
                                                            {submenuItem.src}
                                                        </div>
                                                        <span className="origin-left duration-200">
                                                            {submenuItem.title}
                                                        </span>
                                                    </div>
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                    </div>
                    <div className="flex items-end gap-4 p-5 ">
                        <FaCircle color="#D9B34D" size={48} />
                        {open && (
                            <div className={`text-sm flex flex-col`}>
                                <p className="font-bold">{admin.username}</p>
                                <p>Admin Account</p>
                            </div>
                        )}
                    </div>
                </div>
            </aside>
        </>
    );
}
