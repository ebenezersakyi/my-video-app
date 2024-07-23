import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../../components/Layout";
import { MovieType } from "../../../types";
import Image from "next/image";
import { GoDownload, GoShare } from "react-icons/go";
import { formattedDate } from "../../../utils/dateUtils";
import { TypeAnimation } from "react-type-animation";
import SimilarCards from "../../../components/Common/SimilarCards";
import { GetServerSideProps } from "next";
import Head from "next/head";
import {
  BarLoader,
  BeatLoader,
  FadeLoader,
  HashLoader,
  MoonLoader,
} from "react-spinners";

interface HomePageProps {
  movie: MovieType;
  similarMovies: MovieType[];
}

const MovieDetail = ({ movie, similarMovies }: HomePageProps) => {
  const router = useRouter();
  const { id } = router.query;
  const [story, setStory] = useState("");
  const [audioUrl, setAudioUrl] = useState("");

  const actions = [
    {
      name: "Share",
      icon: <GoShare size={17} color="white" />,
      function: () => downloadAudio(),
    },
    {
      name: "Download",
      icon: <GoDownload size={17} color="white" />,
      function: () => downloadAudio(),
    },
  ];

  useEffect(() => {
    if (movie) {
      getStory(movie);
    }
  }, [movie]);

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

      const blob = convertBase64ToFile(data.audioContent);
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
    } catch (error) {
      console.log(error);
    }
  };

  const convertBase64ToFile = (base64String: string) => {
    const byteCharacters = atob(base64String);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: "audio/mp3" });
    return blob;
  };

  const downloadAudio = () => {
    if (!audioUrl) {
      return;
    }
    const url = audioUrl;
    const link = document.createElement("a");
    link.href = url;
    link.download = movie?.title;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (!movie) {
    return (
      <Layout>
        <div className="flex w-full h-full align-middle items-center justify-center content-center">
          <BarLoader color="white" speedMultiplier={1} />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Head>
        <title>Eben's video app - {movie?.title}</title>
        <meta
          name="description"
          content="A Next.js movie app using the TMDB API, featuring popular movies, a detail page, and search functionality. Created for a frontend assessment."
        />
      </Head>
      <div className="relative h-[100vh] w-full">
        <Image
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
          width="0"
          height="0"
          sizes="100vw"
          className="opacity-50 w-[100vw] h-[100vh] object-cover"
        />
        <div className="absolute inset-0 bg-white bg-opacity-10 backdrop-blur-2xl"></div>

        <div className="absolute top-0 z-[1px] w-[100%] h-[100%] rounded-md px-[30px] pt-[100px] overflow-y-scroll lg:px-[70px]">
          <div className="relative w-[100%] h-[70vh] bg-black rounded-2xl self-center justify-self-center overflow-y-scroll p-[25px] hide-scrollbar">
            {story?.length > 0 ? (
              <TypeAnimation
                sequence={[story]}
                wrapper="span"
                speed={65}
                repeat={0}
                className="text-[20px] text-gray-400 font-roboto text-justify hide-scrollbar lg:text-[40px]"
              />
            ) : (
              <div className="flex w-full h-full align-middle items-center justify-center content-center">
                <BarLoader color="white" speedMultiplier={1} />
              </div>
            )}
          </div>
          {audioUrl ? (
            <audio controls className="w-[100%]">
              <source src={audioUrl} type="audio/mp3" className="bg-black" />
            </audio>
          ) : (
            <div className="">
              <HashLoader size={20} color="white" />
            </div>
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
                    alt={movie?.title}
                    width="0"
                    height="0"
                    sizes="100vw"
                    className="w-[50px] h-[50px] rounded-full object-cover"
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
                        onClick={() => item.function()}
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
                <span className="flex flex-wrap space-x-2 mt-4">
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
                  <div className="flex flex-wrap mt-2 space-x-2">
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
                {similarMovies?.slice(0.5).map((item: any, index: any) => {
                  return <SimilarCards movie={item} key={index} />;
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };

  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
  );
  const movieData = await res.json();

  const similarMoviesRes = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
  );

  const movies = await similarMoviesRes.json();

  return {
    props: {
      movie: movieData,
      similarMovies: movies.results,
    },
  };
};

export default MovieDetail;
