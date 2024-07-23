import Link from "next/link";
import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="flex relative flex-col items-center content-center bg-[#0d0d0d] bg-gradient-to-b from-black via-transparent to-transparent opacity-00 text-gray-300 pt-24">
      {/* <div className="absolute top-0 left-0 right-0 bottom-0 z-10 inset-0 bg-gradient-to-b from-black via-transparent to-transparent opacity-00" /> */}

      <div className="flex space-x-3">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-black rounded-full p-2 bg-white hover:text-red-700"
        >
          <FaFacebook size={20} />
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-black rounded-full p-2 bg-white hover:text-red-700"
        >
          <FaTwitter size={20} />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-black rounded-full p-2 bg-white hover:text-red-700"
        >
          <FaInstagram size={20} />
        </a>
        <a
          href="https://youtube.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-black rounded-full p-2 bg-white hover:text-red-700"
        >
          <FaYoutube size={20} />
        </a>
      </div>

      <ul className="flex space-x-2 md:space-x-4 pb-24 mt-6">
        <li className="hover:text-red-700">
          <Link href="/" className="text-[15px] md:text-lg">
            Home
          </Link>
        </li>
        <li className="hover:text-red-700">
          <Link href="/movies" className="text-[15px] md:text-lg">
            Movies
          </Link>
        </li>
        <li className="hover:text-red-700">
          <Link href="/tv-shows" className="text-[15px] md:text-lg">
            TV Shows
          </Link>
        </li>
        <li className="hover:text-red-700">
          <Link href="/contact" className="text-[15px] md:text-lg">
            Contact Us
          </Link>
        </li>
      </ul>

      <div className="w-full bg-black py-5 text-center text-[15px]">
        <p className="text-gray-400">
          © {new Date().getFullYear()} IFMA-Video-App. Digitally crafted by
          <a
            href="https://github.com/ebenezersakyi"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-[8px] hover:text-red-700"
          >
            Ebenezer Sakyi.
          </a>
        </p>
      </div>

      {/* <p className="mb-2">
        A Next.js application that displays and searches for movies using the
        TMDB API, created as part of a frontend assessment. The app includes a
        home page with a list of popular movies, a movie detail page, and a
        search functionality
      </p> */}
    </footer>
  );
};

export default Footer;
