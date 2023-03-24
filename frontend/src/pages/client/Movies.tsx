import logo from "../../images/showcase-logo.svg";

import { Link } from "react-router-dom";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Notice from "../../components/Notice";
import { useEffect, useState } from "react";
import axios from "axios";

type TypeMovies = {
  _id: string;
  adult: boolean;
  backdrop_path: string;
  genre_ids: Array<number>;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  subtitle_downloaded: boolean;
};

type TypeMovieResponse = {
  page: number;
  results: TypeMovies[];
  total_pages: number;
  total_results: number;
};

const Movies = () => {
  const [movies, setMovies] = useState<TypeMovieResponse | null>(null);

  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/movie/top_rated?api_key=5f10f3a4c56bb99149a2c33ce3c77aae&language=en-US&page=1"
      )
      .then((res) => setMovies(res.data))
      .then(() => {
        console.log(movies);
      });
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-slate-900">
      <header className="sticky top-0 bg-slate-900 p-4 border-b border-slate-700 z-20">
        <div className="flex">
          <span>
            <img src={logo} alt="logo" srcSet="" className="h-8 text-clip" />
          </span>
        </div>
      </header>
      {/* movie search */}
      <section>
        <div className="flex justify-center border-b border-slate-700">
          <div className="flex flex-col w-full md:w-[85rem] max-w-[85rem] p-4 md:p-8 space-y-4 ">
            <Notice />
            <p className="flex items-center space-x-2 text-4xl md:text-7xl text-white font-extrabold">
              <span>Movies</span>
              <span className="text-3xl">
                <img src="/images/movies.png" alt="" className="h-10 md:h-16" />
              </span>
            </p>
            <div className="flex items-center space-x-4">
              <input
                className="flex-1 p-2 md:p-4 bg-slate-800 border border-slate-600 outline-none ring-purple-500 focus:ring-2 transition duration-300 ease-in-out"
                type="text"
                placeholder="Search for movies here..."
              />
              <button className="h-max p-2 bg-purple-500 text-white rounded-full focus:bg-white focus:text-black">
                <MagnifyingGlassIcon className="h-6 md:h-10" />
              </button>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="flex justify-center border-b border-slate-700">
          <div className="flex flex-col w-full md:w-max max-w-[85rem] p-4 md:p-8 py-8 space-y-4 md:space-y-8 ">
            <p className="flex items-center space-x-2 text-4xl md:text-5xl text-white font-extrabold">
              <span>Popular Movies</span>
            </p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-4">
              {movies != null ? (
                movies.results.map((movie, index) => {
                  return (
                    <Link to={"/movie/123"}>
                      <div
                        key={index}
                        className="flex flex-col rounded-md overflow-hidden"
                      >
                        <div className="relative">
                          <span>
                            <img
                              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                              alt=""
                              className="w-full"
                            />
                          </span>
                          <div className="absolute bottom-0 w-full flex justify-between p-2 text-white bg-gradient-to-t from-black to-[#00000050]">
                            <p className="font-bold text-xs">
                              {new Date(movie.release_date).getFullYear()}
                            </p>
                            <p className="font-bold text-xs">
                              {parseInt(movie.popularity.toString())}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col flex-1 justify-between p-2 text-white bg-black">
                          <p className="md:text-xl font-bold line-clamp-1">
                            {movie.title}
                          </p>
                          <p className="text-sm line-clamp-2">
                            {movie.overview}
                          </p>
                        </div>
                      </div>
                    </Link>
                  );
                })
              ) : (
                <div className="flex items-center space-x-2">
                  <p className="text-white">Loading</p>
                  <div className="h-4 w-4 border-2 border-t-purple-500 rounded-full animate-spin"></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Movies;
