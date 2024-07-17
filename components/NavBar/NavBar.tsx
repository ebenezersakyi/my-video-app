"use client";
import React, { useState, useEffect } from "react";
import { CiSettings, CiUser } from "react-icons/ci";
import { IoIosSearch } from "react-icons/io";

function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 70) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`flex p-2 py-5 w-full justify-between fixed top-0 z-10 transition-all duration-1000 sm:p-5 ${
        isScrolled ? "bg-black" : "bg-transparent"
      }`}
    >
      <a href="/" className="text-white text-2xl font-bold">
        MoviesApp
      </a>
      <div className="flex items-center space-x-3">
        <IoIosSearch className="cursor-pointer" size={25} color="white" />
        <CiUser className="cursor-pointer" size={25} color="white" />
      </div>
    </header>
  );
}

export default NavBar;
