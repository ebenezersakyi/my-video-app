"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { CiSettings, CiUser } from "react-icons/ci";
import { IoIosSearch } from "react-icons/io";

function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
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
      className={`flex p-2 py-5 w-full justify-between fixed top-0 z-10 transition-all duration-300 sm:p-5 lg:px-20 ${
        isScrolled ? "bg-black" : "bg-transparent"
      }`}
    >
      <Link href="/" className="text-white text-2xl font-bold">
        <Image
          src={`https://nextflix-azure.vercel.app/_next/image?url=%2Fassets%2Flogo.png&w=96&q=75`}
          alt={"logo"}
          style={{
            width: "100px",
            height: "100%",
            objectFit: "contain",
          }}
          sizes="50vw"
          width={0}
          height={0}
          priority
        />
      </Link>
      <div className="flex items-center space-x-3">
        <IoIosSearch className="cursor-pointer" size={25} color="white" />
        <CiUser className="cursor-pointer" size={25} color="white" />
      </div>
    </header>
  );
}

export default NavBar;
