import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../../components/Layout";
import { MovieType } from "../../../types";
import Image from "next/image";
import Link from "next/link";
import { GoDownload, GoShare } from "react-icons/go";
import { formattedDate } from "../../../utils/dateUtils";
import { TypeAnimation } from "react-type-animation";
import SimilarCards from "../../../components/Common/SimilarCards";

export default function MovieDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [movie, setMovie] = useState<MovieType | null>(null);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [story, setStory] = useState("");
  const [audioUrl, setAudioUrl] = useState("");

  const actions = [
    {
      name: "Share",
      icon: <GoShare size={17} color="white" />,
      function: "",
    },
    {
      name: "Download",
      icon: <GoDownload size={17} color="white" />,
      function: "",
    },
  ];

  useEffect(() => {
    if (id) {
      getMovieDetails();
      getSimilarMovies();
    }
  }, [id]);

  const getMovieDetails = async () => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
      );
      const movieData = await res.json();
      setMovie(movieData);
      getStory(movieData);
    } catch (error) {
      console.log(error);
    }
  };

  const getSimilarMovies = async () => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
      );

      const movies = await res.json();
      console.log(movies.results);
      setSimilarMovies(movies.results);
    } catch (error) {
      console.log(error);
    }
  };

  const getStory = async (movieData: any) => {
    try {
      const res = await fetch(
        `https://job-finder-api.vercel.app/gemini/video-app`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ movieDetails: movieData }),
        }
      );

      const data = await res.json();
      setStory(data.data);
      getAudio(data?.data);
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAudio = async (text: string) => {
    try {
      const textData = {
        audioConfig: {
          audioEncoding: "LINEAR16",
          effectsProfileId: ["small-bluetooth-speaker-class-device"],
          pitch: 0,
          speakingRate: 1,
        },
        input: {
          text: text,
        },
        voice: {
          languageCode: "en-US",
          name: "en-US-Journey-F",
        },
      };

      const res = await fetch(
        `https://texttospeech.googleapis.com/v1beta1/text:synthesize?key=AIzaSyBB1NKAQPg8S8_pozh0f_fd64ct9_Xl0ME`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(textData),
        }
      );

      const data = await res.json();
      // const data = await res;
      console.log("audio response", data.audioContent);

      const blob = convertBase64ToFile(data.audioContent);
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
    } catch (error) {
      console.log(error);
    }
  };

  const convertBase64ToFile = (base64String: string) => {
    // Decode the Base64 string
    const byteCharacters = atob(base64String);
    const byteArrays = [];

    // Convert the decoded Base64 string to byte array
    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    // Create a Blob from the byte array
    const blob = new Blob(byteArrays, { type: "audio/mp3" }); // Change the MIME type if needed
    return blob;
  };

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <div className="relative h-[100vh] w-full">
        <Image
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
          layout="fill"
          objectFit="cover"
          className="opacity-50 w-[100vw] h-[100vh]"
        />
        <div className="absolute inset-0 bg-white bg-opacity-10 backdrop-blur-2xl"></div>

        <div className="absolute top-0 z-[1px] w-[100%] h-[100%] rounded-md px-[30px] pt-[100px] overflow-y-scroll lg:px-[70px]">
          <div className="relative w-[100%] h-[70vh] bg-black rounded-2xl self-center justify-self-center overflow-y-scroll p-[25px] hide-scrollbar">
            {story.length > 0 ? (
              <TypeAnimation
                sequence={[story]}
                wrapper="span"
                speed={65}
                // style={{ color: "grey" }}
                repeat={0}
                className="text-[20px] text-gray-400 font-roboto text-justify hide-scrollbar lg:text-[40px]"
              />
            ) : null}
          </div>
          {audioUrl && (
            // <div className="absolute bottom-0 w-[100%] z-10">
            <audio controls className="w-[100%]">
              <source src={audioUrl} type="audio/mp3" className="bg-black" />
              {/* Change MIME type if needed */}
              {/* Your browser does not support the audio element. */}
            </audio>
            // </div>
          )}
          <div className="flex flex-wrap flex-col space-x-0 px-2 md:flex-wrap lg:flex-row lg:px-16 lg:space-x-4">
            <div className="w-[100%] mt-5 rounded-2xl lg:w-[75%]">
              <span className="font-roboto text-[22px] font-bold">
                {movie.title}
              </span>
              <div className="flex flex-col justify-between md:flex-row">
                <div className="flex space-x-3 mt-2">
                  <Image
                    src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
                    alt={movie?.belongs_to_collection?.name}
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                    }}
                    objectFit="cover"
                    width={0}
                    height={0}
                  />
                  <span className="flex flex-col justify-center">
                    <p className="text-[15px] font-bold text-gray-200">
                      {movie?.belongs_to_collection?.name}
                    </p>
                    <p className="text-[13px] text-gray-300">
                      Budget: $ {movie?.budget?.toLocaleString()}
                    </p>
                  </span>
                </div>

                <div className="flex space-x-2">
                  {actions.map((item, index) => {
                    return (
                      <span
                        key={index}
                        className="flex items-center content-center h-[40px] px-[19px] cursor-pointer bg-gray-900 space-x-1 rounded-full"
                      >
                        {item?.icon}
                        <p className="text-[14px]">{item.name}</p>
                      </span>
                    );
                  })}
                </div>
              </div>
              <div className="bg-gray-900 p-[15px] rounded-lg mt-[15px] text-[13px] text-justify">
                <span>{formattedDate(movie?.release_date)}</span>
                <p>{movie?.overview}</p>
                <span className="flex space-x-3 mt-4">
                  {movie?.genres?.map((item: any, index: any) => {
                    return (
                      <span
                        key={index}
                        className="relative px-4 py-2 items-center content-center text-white border border-gray-200 text-[14px] rounded-full overflow-hidden group"
                      >
                        {item.name}
                      </span>
                    );
                  })}
                </span>

                <div className="flex flex-col mt-4">
                  <span className="text-[16px]">Production companies</span>
                  <div className="flex flex-wrap mt-2">
                    {movie?.production_companies?.map(
                      (item: any, index: any) => {
                        return (
                          <span
                            key={index}
                            className="relative px-4 py-2 items-center content-center text-white border border-gray-200 text-[14px] rounded-full overflow-hidden group"
                          >
                            {item.name}
                          </span>
                        );
                      }
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 bg-black mt-5 p-5 rounded-2xl">
              <span className="text-[20px] text-white">Similar movies</span>

              <div className="space-y-4 mt-8">
                {similarMovies?.splice(0, 5).map((item: any, index: any) => {
                  return <SimilarCards movie={item} />;
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
