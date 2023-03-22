import { useEffect, useState } from "react";
import logo from "../images/showcase-logo.svg";
import ReactSimplyCarousel from "react-simply-carousel";
import "../font.css";
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

const Showcase = () => {
  const [showcaseMovies, setShowcaseMovies] = useState<Array<TypeMovies>>([]);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const headers = { headers: {} };
  const date = new Date();

  useEffect(() => {
    axios.get("http://localhost:8000/movies/").then((res) => {
      console.log(res.data);
      setShowcaseMovies(res.data);
    });
  }, []);

  return (
    <div className="base-wrapper w-full bg-black overflow-auto">
      <section className="flex flex-col h-screen">
        <header className="p-8">
          <div>
            <span>
              <img src={logo} alt="" className="h-12" />
            </span>
          </div>
        </header>
        <div className="flex flex-1 bg-slate-100 overflow-hidden">
          <ReactSimplyCarousel
            activeSlideIndex={activeSlideIndex}
            onRequestChange={setActiveSlideIndex}
            forwardBtnProps={{
              //here you can also pass className, or any other button element attributes
              children: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-10 h-10"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              ),
              className: "absolute h-full right-0 text-white outline-none",
            }}
            backwardBtnProps={{
              //here you can also pass className, or any other button element attributes
              children: (
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-10 h-10"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 19.5L8.25 12l7.5-7.5"
                    />
                  </svg>
                </span>
              ),
              className: "absolute h-full right-0 text-white outline-none",
            }}
            responsiveProps={[
              {
                itemsToShow: 1,
                itemsToScroll: 1,
              },
            ]}
            speed={1000}
            easing="linear"
            autoplay={true}
            infinite={true}
          >
            {showcaseMovies ? (
              showcaseMovies.slice(0, 4).map((movie, index) => {
                return (
                  <div className="w-screen h-full relative">
                    <div className="absolute h-full w-full p-28 bg-gradient-to-r from-[#000000] to-[#00000040]">
                      <div className="text-white space-y-8">
                        <p className="font-bold text-5xl">{movie.title}</p>
                        <div className="flex space-x-4">
                          <p className="text-xl font-bold">
                            {new Date(movie.release_date).getFullYear()}
                          </p>
                          <p className="text-xl font-bold">
                            {movie.vote_average} / 10
                          </p>
                        </div>
                        <p className="text-2xl font-[300] max-w-[50rem]">
                          {movie.overview}
                        </p>
                      </div>
                    </div>
                    <span>
                      <img
                        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                        alt=""
                        className="h-full w-screen object-cover object-right-top"
                      />
                    </span>
                  </div>
                );
              })
            ) : (
              <></>
            )}
          </ReactSimplyCarousel>
        </div>
      </section>
      <section className="p-24">
        <div className="space-y-8">
          <p className="text-5xl font-bold text-white">Currently Trending</p>
          <div>
            <ReactSimplyCarousel
              activeSlideIndex={activeSlideIndex}
              onRequestChange={setActiveSlideIndex}
              itemsToShow={1}
              itemsToScroll={1}
              forwardBtnProps={{
                //here you can also pass className, or any other button element attributes
                children: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                ),
                className: "text-white outline-none",
              }}
              backwardBtnProps={{
                //here you can also pass className, or any other button element attributes
                children: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 19.5L8.25 12l7.5-7.5"
                    />
                  </svg>
                ),
                className: "text-white outline-none",
              }}
              responsiveProps={[
                {
                  itemsToShow: 5,
                  itemsToScroll: 1,
                  minWidth: 768,
                },
              ]}
              speed={400}
              easing="linear"
            >
              {showcaseMovies ? (
                showcaseMovies.slice(5, 15).map((movie, index) => {
                  return (
                    <div className="relative w-[20rem]">
                      <div className="absolute flex flex-col justify-end h-full w-full p-4 bg-gradient-to-t from-[#000000] to-[#00000040]">
                        <div className="text-white space-y-2">
                          <p className="font-bold text-4xl">{movie.title}</p>
                          <div className="flex space-x-4">
                            <p className="text-xl font-bold">
                              {new Date(movie.release_date).getFullYear()}
                            </p>
                            <p className="text-xl font-bold">
                              {movie.vote_average} / 10
                            </p>
                          </div>
                          <p className="text-xl font-[300] max-w-[50rem] line-clamp-3">
                            {movie.overview}
                          </p>
                        </div>
                      </div>
                      <span>
                        <img
                          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                          alt=""
                          className="h-full w-screen object-cover object-right-top"
                        />
                      </span>
                    </div>
                  );
                })
              ) : (
                <></>
              )}
            </ReactSimplyCarousel>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Showcase;
