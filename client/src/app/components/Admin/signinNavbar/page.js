"use client";
import React, { useState, useEffect } from "react";
import stl from "./Navbar.module.css";

const Navbar = () => {
  useEffect(() => {
    document.body.style.fontFamily = "'Playfair Display', serif";
  }, []);

  return (
    <nav className={stl.navbar}>
      <div className={stl.navbar_brand}>
        <img src="/Golden-logo.png" alt="Logo" className={stl.logo} />
        <span className={stl.navbar_name}>Admin Dashboard</span>
      </div>
    </nav>
  );
};

export default Navbar;
