"use client";
import React, { useState, useEffect } from "react";
import stl from "./Navbar.module.css";
import { HiViewList } from "react-icons/hi";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import useAuth from "@/app/general/signIn/useAuth";

const Navbar = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("id"); // Get user ID from the query parameters
  const [currentPath, setCurrentPath] = useState("");
  const user = useAuth(); // Fetch the authenticated user (optional)

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Set the current path on the client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentPath(window.location.pathname);
    }
  }, []);

  // Apply global font style
  useEffect(() => {
    document.body.style.fontFamily = "'Playfair Display', serif";
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Sign-Out function
  const handleSignOut = () => {
    localStorage.removeItem("token"); // Remove the token
    localStorage.removeItem("message");
    localStorage.removeItem("user"); // Optionally remove other user data
    router.push("/general/signIn"); // Redirect to the sign-in page
  };

  // Determine sign-up or sign-in/logout logic
  const signUpOrSignOut = id
    ? { text: "Log Out", action: handleSignOut }
    : currentPath === "/general/signUp"
    ? { text: "Sign In", link: "/general/signIn" }
    : { text: "Sign Up", link: "/general/signUp" };

  return (
    <nav className={stl.navbar}>
      <div className={stl.navbar_brand}>
        <Link href={id ? `/customers/landingPage?id=${id}` : "/customers/landingPage"}>
          <img src="/Golden-logo.png" alt="logo" className={stl.logo} />
        </Link>
      </div>

      <ul className={stl.navbar_list}>
        <li className={stl.navbar_item}>
          <Link href={id ? `/customers/landingPage?id=${id}` : "/customers/landingPage"}>
            Home
          </Link>
        </li>
        <li className={stl.navbar_item}>
          <Link href={id ? `/customers/landingPage?id=${id}#categories` : `/customers/landingPage#categories`}>Categories</Link>
        </li>
        <li className={stl.navbar_item}>
          <Link href={id ? `/customers/profile?id=${id}` : "/general/signIn"}>Profile</Link>
        </li>
        <li className={stl.navbar_item}>
          <Link href={id ? `/general/aboutUs?id=${id}` : "/general/aboutUs"} >About Us</Link>
        </li>
        <li className={stl.navbar_item}>
          {id ? (
            <button className={stl.signOutButton} onClick={signUpOrSignOut.action}>
              {signUpOrSignOut.text}
            </button>
          ) : (
            <Link href={signUpOrSignOut.link}>{signUpOrSignOut.text}</Link>
          )}
        </li>
      </ul>

      <div className={stl.navbarMenuIcon} onClick={toggleSidebar}>
        <HiViewList className={stl.icon} />
      </div>

      {isSidebarOpen && (
        <div className={stl.sidebar}>
          <div className={stl.sidebarCloseIcon} onClick={toggleSidebar}>
            <HiViewList className={stl.icon} />
          </div>
          <ul className={stl.sidebar_list}>
            <li className={stl.sidebar_item}>
              <Link
                href={id ? `/customers/landingPage?id=${id}` : "/customers/landingPage"}
                onClick={toggleSidebar}
              >
                Home
              </Link>
            </li>
            <li className={stl.sidebar_item}>
              <Link 
                href={id ? `/customers/landingPage?id=${id}#categories` : `/customers/landingPage#categories`}
                onClick={toggleSidebar}>
                Categories
              </Link>
            </li>
            <li className={stl.sidebar_item}>
              <Link
                href={id ? `/customers/profile?id=${id}` : "/general/signIn"}
                onClick={toggleSidebar}
              >
                Profile
              </Link>
            </li>
            <li className={stl.sidebar_item}>
              <Link href={id ? `/general/aboutUs?id=${id}` : "/general/aboutUs"} onClick={toggleSidebar}>
                About Us
              </Link>
            </li>
            <li className={stl.sidebar_item}>
              {id ? (
                <button className={stl.navbar_item} onClick={() => { toggleSidebar(); handleSignOut(); }}>
                  {signUpOrSignOut.text}
                </button>
              ) : (
                <Link className={stl.navbar_item} href={signUpOrSignOut.link} onClick={toggleSidebar}>
                  {signUpOrSignOut.text}
                </Link>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
