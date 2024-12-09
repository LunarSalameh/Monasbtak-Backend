"use client";
import React, { useState, useEffect } from "react";
import stl from "./Navbar.module.css";
import { HiViewList } from "react-icons/hi";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const Navbar = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id"); // Get user ID from the query parameters
  const [currentPath, setCurrentPath] = useState("");

  // Set the current path only on the client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentPath(window.location.pathname);
    }
  }, []);

  useEffect(() => {
    document.body.style.fontFamily = "'Playfair Display', serif";
  }, []);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const signUpOrSignIn = id
    ? { text: "Log Out", link: "/general/signIn" }
    : currentPath === "/general/signUp"
    ? { text: "Sign In", link: "/general/signIn" }
    : { text: "Sign Up", link: "/general/signUp" };

  const isValidImageUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <nav className={stl.navbar}>
      <div className={stl.navbar_brand}>
        <Link href={id ? `/customers/landingPage?id=${id}` : "/customers/landingPage"}>
          {isValidImageUrl("/Golden-logo.png") && (
            <img src="/Golden-logo.png" alt="logo" className={stl.logo} />
          )}
        </Link>
      </div>
      <ul className={stl.navbar_list}>
        <li className={stl.navbar_item}>
          <Link href={id ? `/customers/landingPage?id=${id}` : "/customers/landingPage"}>
            Home
          </Link>
        </li>
        <li className={stl.navbar_item}>
          <Link href="#categories">Categories</Link>
        </li>
        <li className={stl.navbar_item}>
          <Link href={id ? `/customers/profile?id=${id}` : "/general/signIn"}>Profile</Link>
        </li>
        <li className={stl.navbar_item}>
          <Link href="/general/aboutUs">About Us</Link>
        </li>
        <li className={stl.navbar_item}>
          <Link href={signUpOrSignIn.link}>{signUpOrSignIn.text}</Link>
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
              <Link href="#categories" onClick={toggleSidebar}>
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
              <Link href="/general/aboutUs" onClick={toggleSidebar}>
                About Us
              </Link>
            </li>
            <li className={stl.sidebar_item}>
              <Link href={signUpOrSignIn.link} onClick={toggleSidebar}>
                {signUpOrSignIn.text}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
