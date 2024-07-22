import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Layout from "../../../components/Layout";
import Card from "../../../components/Common/Card";
import { MovieType } from "../../../types";

function index() {
  const [movies, setMovies] = useState([]);
  const router = useRouter();
  const { query } = router.query;

  const getMovies = async () => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
      );

      const moviesData = await res.json();
      setMovies(moviesData.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (query) {
      getMovies();
    }
  }, [query]);

  return (
    <Layout>
      <div className="pt-[100px] px-[30px]">
        <span className="text-[25px]">Showing results for "{query}"</span>
        <div className="flex flex-wrap gap-4 justify-center mt-[50px]">
          {movies.map((movie: MovieType) => (
            <Card key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default index;
