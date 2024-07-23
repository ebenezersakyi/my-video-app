import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import moment from "moment";
import { formattedDate } from "../../utils/dateUtils";
import { FaChevronDown, FaPlay, FaRegCirclePlay } from "react-icons/fa6";
import { IoChevronDown, IoClose, IoPlaySharp } from "react-icons/io5";
import { MovieType } from "../../types";
import Modal from "../Modal";
import { useRouter } from "next/router";

function Card({ movie }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<MovieType | null>(null);

  const router = useRouter();

  const handleOpen = (movie: any) => {
    setSelectedMovie(movie);
    setIsOpen(true);
  };
  const handleClose = () => setIsOpen(false);

  const handleNavigate = (movieId: any) => {
    router.push(`/movies/${movieId}`);
  };

  return (
    <div>
      <Modal isOpen={isOpen} onClose={handleClose} movie={selectedMovie} />
      <div className="relative group w-72 h-96 bg-gray-900 rounded-lg overflow-hidden shadow-lg transform transition duration-300 hover:scale-105">
        {/* <Link href={`/movies/${movie.id}`}> */}
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
          <div className="p-4">
            <h2 className="text-xl font-roboto font-semibold text-white mb-2 line-clamp-1">
              {movie.title}
            </h2>
            <p className="text-sm text-gray-200 mb-2 line-clamp-3">
              {movie.overview}
            </p>
            <p className="text-xs text-gray-400 font-roboto">
              Release Date: {formattedDate(movie.release_date)}
            </p>
            <p className="text-xs text-gray-400 font-roboto">
              Rating: {movie.vote_average} / 10
            </p>
          </div>
        </div>
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-full group-hover:opacity-25 transition-opacity duration-300 object-cover"
          width="0"
          height="0"
          sizes="100vw"
          priority
        />
        <div className=" space-x-2 absolute  inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 sm:transition-opacity duration-300">
          <button
            className="bg-white text-white p-2 rounded-full flex items-center justify-center"
            onClick={() => {
              handleNavigate(movie.id);
            }}
          >
            <IoPlaySharp color="black" size={20} />
          </button>
          <button
            className="bg-white text-white p-2 rounded-full flex items-center justify-center"
            onClick={() => {
              handleOpen(movie);
            }}
          >
            <FaChevronDown color="black" size={20} />
          </button>
        </div>
        {/* </Link> */}
      </div>
    </div>
  );
}

export default Card;
