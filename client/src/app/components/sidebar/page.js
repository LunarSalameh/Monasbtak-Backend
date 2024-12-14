"use client";
import { React, useEffect, useState } from "react";
import { FaKey, FaRegCalendarCheck, FaCircle } from "react-icons/fa6";
import { MdPeopleAlt } from "react-icons/md";
import { FiPackage } from "react-icons/fi";
import { IoMdPhotos } from "react-icons/io";
import { HiOutlineViewList } from "react-icons/hi";
import { LuPackageCheck, LuPackagePlus } from "react-icons/lu";
import useAuth from "@/app/general/signIn/useAuth";
import { useSearchParams, useRouter } from "next/navigation";

export default function Sidebar({ fetchPlannerData, handleImageChange }) {
    const searchParams = useSearchParams();
    const id = searchParams.get("id"); // Get user ID from the query parameters
    const [open, setOpen] = useState(true);
    const [submenuOpen, setSubmenuOpen] = useState(false);
    const [planner, setPlanner] = useState({});
    const [error, setError] = useState("");
    const router = useRouter();

    const user = useAuth(); // Using the custom useAuth hook

    const menu = [
        { title: "Home Dashboard", src: <FaKey />, path: `/planners/home?id=${id}` },
        { title: "Planner Profile", src: <MdPeopleAlt />, path: `/planners/profile?id=${id}` },
        { title: "Packages", src: <FiPackage />, submenu: [
            { title: "Packages Available", src: <LuPackageCheck />, path: `/planners/packages?id=${id}` },
            { title: "Packages Requests", src: <LuPackagePlus />, path: `/planners/packageRequests?id=${id}` }
        ] },
        { title: "Event Album", src: <IoMdPhotos />, path: `/planners/eventAlbum?id=${id}` },
        { title: "Events", src: <FaRegCalendarCheck />, path: `/planners/allEvents?id=${id}` },
    ];

    const handleSubmenuToggle = () => {
        setSubmenuOpen(!submenuOpen);
    };

    useEffect(() => {
        const fetchPlanner = async () => {
            try {
                const response = await fetch(`http://localhost/Monasbtak-Backend/php/api/planner/profile/getOnePlanner.php?id=${id}`);
                const result = await response.json();
    
                if (result.success) {
                    setPlanner(result.planner);
                    handleImageChange(); // Call the handleImageChange prop here
                } else {
                    setError("Failed to fetch planner.");
                }
            } catch (error) {
                setError("Error fetching data.");
            }
        };

        // Ensure user exists and if user is authorized for the planner
        if (user && user.userId.toString() === id) {
            fetchPlanner();
        } else if (user) {
            setError("You are not authorized to access this planner's data.");
        }
    }, [id, user, handleImageChange]);

    const handleSignOut = () => {
        localStorage.removeItem("token"); // Remove the token
        localStorage.removeItem("message");
        localStorage.removeItem("user"); // Optionally remove other user data
        router.push("/general/signIn"); // Redirect to the sign-in page
    };

    const signUpOrSignOut = id
    ? { text: "Log Out", action: handleSignOut }
    : currentPath === "/general/signUp"
    ? { text: "Sign In", link: "/general/signIn" }
    : { text: "Sign Up", link: "/general/signUp" };


    return (
        <>
            <aside className="flex h-full">
                <div style={{ height: "100%", position: "fixed", zIndex: "2" }} className={`${open ? "w-64" : "w-20"} bg-white shadow-lg text-[#D9B34D] p-5 duration-300`}>
                    {open ? (
                        <img src="/Monasbtak-EN.png" onClick={() => setOpen(!open)} className="cursor-pointer border-b-2" />
                    ) : (
                        <div className="justify-items-center border-b-2">
                            <HiOutlineViewList onClick={() => setOpen(!open)} className="mb-2 cursor-pointer duration-300" />
                        </div>
                    )}

                    <ul className={`flex flex-col gap-[2.2rem] justify-center pt-[2.7rem] py-7 ${open ? "px-4" : "px-1"} text-center`}>
                        {menu.map((Menu, index) => (
                            <li key={index} className={`flex flex-col cursor-pointer items-start justify-items-center`}>
                                <a href={Menu.path} onClick={Menu.title === "Packages" ? handleSubmenuToggle : null}>
                                    <div className="flex gap-4">
                                        <div className="flex justify-center items-center">{Menu.src}</div>
                                        <span className={`${!open && "hidden"} origin-left duration-200`}>{Menu.title}</span>
                                    </div>
                                </a>
                                {Menu.submenu && submenuOpen && (
                                    <ul className={`pl-8 ${!open && "hidden"} w-full`}>
                                        {Menu.submenu.map((submenuItem, subIndex) => (
                                            <li key={subIndex} className="flex cursor-pointer items-center justify-items-center">
                                                <a href={submenuItem.path} style={{ width: '113%' }} className="p-2 active:bg-[#D9B34D] active:text-white hover:bg-gray-100 rounded-lg">
                                                    <div className="flex gap-4" style={{ width: '170px' }}>
                                                        <div className="flex justify-center items-center">{submenuItem.src}</div>
                                                        <span className="origin-left duration-200">{submenuItem.title}</span>
                                                    </div>
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                    <div style={{ marginTop: "295px" }} className="flex gap-4 p-5">
                        {planner.image ? (
                            <img src={`data:image/jpeg;base64,${planner.image}`} alt="Planner" style={{ width: "62px", height: "62px", borderRadius: "50%", objectFit: "cover" }} />
                        ) : (
                            <FaCircle color="#D9B34D" size={48} />
                        )}
                        {open && (
                        <div className="flex flex-col">
                            <p className="font-bold text-lg">{planner.username}</p>
                            <button onClick={signUpOrSignOut.action} className="text-white bg-[#D9B34D] py-1 px-3 rounded-lg ">
                                {signUpOrSignOut.text}
                            </button> 
                        </div>
                        )}
                    </div>
                </div>
            </aside>
        </>
    );
}
