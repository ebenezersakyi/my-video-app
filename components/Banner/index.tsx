import Image from "next/image";
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { IoIosStar } from "react-icons/io";
import { FaRegCirclePlay } from "react-icons/fa6";

import { useRouter } from "next/router";

function Banner({ movies }: any) {
  const router = useRouter();

  const handleNavigate = (movieId: any) => {
    router.push(`/movies/${movieId}`); // Replace with your desired path
  };

  const genres = ["Comedy", "Romance", "Action"];
  return (
    <Carousel
      autoPlay
      interval={3000}
      infiniteLoop
      showStatus={false}
      showThumbs={false}
      showArrows={false}
      showIndicators={false}
    >
      {movies?.map((movie: any, index: any) => {
        return (
          <div key={index} className="w-[100%] h-[80vh] relative">
            <Image
              src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
              alt={movie?.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
              sizes="100vw"
              width={0}
              height={0}
              priority
            />

            <div className="absolute top-0 left-0 right-0 bottom-0 z-10 inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-00" />

            <div className="absolute top-0 left-0 right-0 bottom-0 z-20 bg-[rgba(0,0,0,0.4)] p-7 text-left content-center items-center sm:p-20 lg:p-52">
              <div className="w-[100%] flex flex-col items-center content-center justify-center lg:w-[55%]">
                {/* <div> */}
                <span className="text-[20px] text-red-300 font-thin">
                  Science Fiction
                </span>
                <span className="flex mt-[5px] space-x-1">
                  {[1, 2, 3, 4, 5].map((item: any, index: any) => {
                    return <IoIosStar key={index} size={15} color="white" />;
                  })}
                </span>
                <span className="text-white font-roboto text-[35px] font-semibold shadow-lg sm:text-[50px]">
                  {movie?.title}
                </span>

                <span className="flex space-x-5">
                  {genres?.map((item: any, index: any) => {
                    return (
                      <span
                        key={index}
                        className="relative px-4 py-2 items-center content-center text-white border border-gray-200 text-[14px] rounded-full overflow-hidden group"
                      >
                        {item}
                      </span>
                    );
                  })}
                </span>
                <span className="text-white font-roboto text-[15px] mt-[15px] line-clamp-4">
                  {movie?.overview}
                </span>

                <button
                  className=" relative w-48 px-6 py-3 text-white border border-gray-400 mt-[30px] rounded-full overflow-hidden group"
                  onClick={() => {
                    handleNavigate(movie?.id);
                  }}
                >
                  <span className="absolute inset-0 transition-all duration-500 ease-in-out bg-gradient-to-r from-red-600 to-red-950 group-hover:translate-x-full"></span>
                  <span className="flex items-center justify-center relative z-10 font-roboto">
                    <FaRegCirclePlay color="white" className="mr-2" />
                    Watch now
                  </span>
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </Carousel>
  );
}

export default Banner;
