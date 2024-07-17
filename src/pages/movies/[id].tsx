import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function MovieDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    if (id) {
      // Fetch movie data from an API or a static file
      fetch(`/api/movies/${id}`) // Example API endpoint
        .then((response) => response.json())
        .then((data) => setMovie(data))
        .catch((error) => console.error("Error fetching movie data:", error));
    }
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <span>{id}</span>
    </div>
  );
}
