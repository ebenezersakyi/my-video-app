export type MovieType = {
  id: number;
  title: string;
  imageUrl: string;
  description: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
  release_date: Date;
  runtime: string;
  budget: number;
  origin_country: [];
  production_companies: [];
  genres: [
    {
      id: number;
      name: string;
    }
  ];
  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  };
};
