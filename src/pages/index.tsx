import { GetServerSideProps } from "next";
import Link from "next/link";
import Image from "next/image";
import Layout from "../../components/Layout";
import Banner from "../../components/Banner";
import Card from "../../components/Common/Card";

const HomePage = ({ movies }: any) => {
  function getRandomItems(arr: any, numItems: any) {
    const shuffled = arr?.slice();
    for (let i = shuffled?.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    // Return the first `numItems` elements
    console.log(shuffled.slice(0, numItems));
    return shuffled.slice(0, numItems);
  }

  const randomMovies = getRandomItems(movies, 3);

  return (
    <Layout>
      <Banner movies={randomMovies} />

      <div className="relative p-[20px]">
        <div className="flex flex-wrap gap-4 justify-center">
          {movies?.map((movie: any, index: any) => (
            <Card key={index} movie={movie} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
  );
  const movies = await res.json();

  return {
    props: {
      movies: movies?.results,
    },
  };
};

export default HomePage;
