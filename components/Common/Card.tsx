import Image from "next/image";
import React from "react";
import Link from "next/link";
import moment from "moment";
import { formattedDate } from "../../utils/dateUtils";
import { FaPlay, FaRegCirclePlay } from "react-icons/fa6";

function Card({ movie }: any) {
  return (
    // <div className="relative group w-64 h-96 bg-gray-900 rounded-lg overflow-hidden shadow-lg transform transition duration-300 hover:scale-105">
    //   <Link href={`/movies/${movie.id}`}>
    //     <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
    //       <div className="p-4">
    //         <h2 className="text-xl font-semibold text-white mb-2">
    //           {movie.title}
    //         </h2>
    //         <p className="text-sm text-gray-200 line-clamp-3">
    //           {movie.overview}
    //         </p>
    //         <p className="text-sm text-gray-200 line-clamp-3 mt-[5px]">
    //           {formattedDate(movie.release_date)}
    //         </p>
    //       </div>
    //     </div>
    //     <Image
    //       src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
    //       alt={movie.title}
    //       layout="fill"
    //       objectFit="cover"
    //       className="group-hover:opacity-50 transition-opacity duration-300"
    //     />
    //   </Link>
    // </div>

    // <div className="relative group w-64 h-96 bg-gray-900 rounded-lg overflow-hidden shadow-lg transform transition duration-300 hover:scale-105">
    //   <Link href={`/movies/${movie.id}`}>
    //     <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
    //       <div className="p-4">
    //         <h2 className="text-xl font-semibold text-white mb-2 line-clamp-1">
    //           {movie.title}
    //         </h2>
    //         <p className="text-sm text-gray-200 mb-2 line-clamp-3">
    //           {movie.overview}
    //         </p>
    //         <p className="text-xs text-gray-400">
    //           Release Date: {formattedDate(movie.release_date)}
    //         </p>
    //         <p className="text-xs text-gray-400">
    //           Rating: {movie.vote_average} / 10
    //         </p>
    //       </div>
    //     </div>
    //     <Image
    //       src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
    //       alt={movie.title}
    //       layout="fill"
    //       objectFit="cover"
    //       className="group-hover:opacity-50 transition-opacity duration-300"
    //     />
    //   </Link>
    // </div>

    <div className="relative group w-72 h-96 bg-gray-900 rounded-lg overflow-hidden shadow-lg transform transition duration-300 hover:scale-105">
      <Link href={`/movies/${movie.id}`}>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
          layout="fill"
          objectFit="cover"
          className="group-hover:opacity-50 transition-opacity duration-300"
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="bg-black text-white p-4 rounded-full flex items-center justify-center">
            <FaRegCirclePlay size={20} color="white" />
          </button>
        </div>
      </Link>
    </div>
  );
}

export default Card;
