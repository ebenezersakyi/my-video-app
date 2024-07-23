import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Layout from "../../../components/Layout";
import Card from "../../../components/Common/Card";
import { MovieType } from "../../../types";
import Head from "next/head";
import { BarLoader } from "react-spinners";

function Search() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { query } = router.query;

  const getMovies = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
      );

      const moviesData = await res.json();
      setMovies(moviesData.results);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query) {
      getMovies();
    }
  }, [query]);

  if (loading) {
    return (
      <Layout>
        <div className="flex w-full h-[100vh] align-middle items-center justify-center content-center">
          <BarLoader color="white" speedMultiplier={1} />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Head>
        <title>Eben's video app - {query?.toString()}</title>
        <meta
          name="description"
          content="A Next.js movie app using the TMDB API, featuring popular movies, a detail page, and search functionality. Created for a frontend assessment."
        />
      </Head>
      <div className="pt-[100px] px-[30px]">
        <span className="text-[25px]">
          Showing results for &quot;{query}&quot;
        </span>
        <div className="flex flex-wrap gap-4 justify-center mt-[50px]">
          {movies.map((movie: MovieType) => (
            <Card key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default Search;
