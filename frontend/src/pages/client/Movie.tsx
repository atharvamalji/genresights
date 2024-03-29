import logo from "../../images/showcase-logo.svg";

import { Link } from "react-router-dom";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Notice from "../../components/Notice";
import { useEffect, useState, useRef } from "react";
import axios from "axios";

import { Chart as ChartJS, registerables } from "chart.js";
import { Chart } from "react-chartjs-2";
import { Line } from "react-chartjs-2";

ChartJS.register(...registerables);

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

const emotion_data = {
  labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
  datasets: [
    {
      label: "joy",
      data: [
        0.962264, 1.0, 0.792453, 0.660377, 0.584906, 0.754717, 0.584906,
        0.584906, 0.54717, 0.660377,
      ],
      pointRadius: 1.5,
      borderWidth: 1,
      tension: 0.5,
      yAxisID: "y",
    },
    {
      label: "anger",
      data: [
        0.363636, 0.181818, 0.454545, 0.848485, 0.878788, 0.727273, 0.757576, 1,
        0.818182, 0.757576,
      ],
      pointRadius: 1.5,
      borderWidth: 1,
      tension: 0.5,
      yAxisID: "y",
    },
    {
      label: "sadness",
      data: [
        0.555556, 0.444444, 0.666667, 0.333333, 0.555556, 0.444444, 0.777778,
        0.444444, 1, 0.555556,
      ],
      pointRadius: 1.5,
      borderWidth: 1,
      tension: 0.5,
      yAxisID: "y",
    },
    {
      label: "love",
      data: [0.25, 1, 0.25, 0.25, 0.25, 0, 0.5, 0, 0, 0.25],
      pointRadius: 1.5,
      borderWidth: 1,
      tension: 0.5,
      yAxisID: "y",
    },
    {
      label: "fear",
      data: [0.5, 0.5, 1, 0.5, 0.5, 0.5, 0.5, 0.5, 1, 1],
      pointRadius: 1.5,
      borderWidth: 1,
      tension: 0.5,
      yAxisID: "y",
    },
    {
      label: "surprise",
      data: [0, 0.333333, 0.666667, 0.333333, 0.666667, 0, 1, 0, 0.333333, 0],
      pointRadius: 1.5,
      borderWidth: 1,
      tension: 0.5,
      yAxisID: "y",
    },
  ],
};

const profanity_data = {
  labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
  datasets: [
    {
      label: "profanity",
      data: [85, 96, 92, 116, 111, 80, 147, 153, 139, 115],
      pointRadius: 1.5,
      borderWidth: 1,
      tension: 0.5,
      yAxisID: "y",
    },
  ],
};

const top_ten_profanitive_words = {
  fucking: 369,
  fuck: 163,
  shit: 84,
  god: 51,
  jesus: 25,
  fucked: 19,
  christ: 16,
  motherfucker: 15,
  hell: 13,
  ass: 11,
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
    },
    // yAxes: [
    //   {
    //     display: true,
    //   }
    // ],
  },
};

const Movie = () => {
  const [movies, setMovies] = useState<TypeMovieResponse>();

  const sample_data = {
    movie_id: 1000,
    file_name: "1000.json",
    emotion_bin: [
      [51, 12, 5, 1, 2, 0],
      [53, 6, 4, 4, 2, 1],
      [42, 15, 6, 1, 4, 2],
      [35, 28, 3, 1, 2, 1],
      [31, 29, 5, 1, 2, 2],
      [40, 24, 4, 0, 2, 0],
      [31, 25, 7, 2, 2, 3],
      [31, 33, 4, 0, 2, 0],
      [29, 27, 9, 0, 4, 1],
      [35, 25, 5, 1, 4, 0],
    ],
    profanity_bin: [[85, 96, 92, 116, 111, 80, 147, 153, 139, 115]],
    most_occured_profanitive_words: {
      fucking: 369,
      fuck: 163,
      shit: 84,
    },
    top_ten_profanitive_words: {
      fucking: 369,
      fuck: 163,
      shit: 84,
      god: 51,
      jesus: 25,
      fucked: 19,
      christ: 16,
      motherfucker: 15,
      hell: 13,
      ass: 11,
    },
  };

  const viewProfanityButton = useRef<null | HTMLButtonElement>(null);
  const profanityWordsView = useRef<null | HTMLDivElement>(null);

  const viewProfanityWords = () => {
    viewProfanityButton.current?.classList.add("hidden");
    profanityWordsView.current?.classList.remove("blur")
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-900">
      {/* header */}
      <header className="bg-slate-900 p-4 border-b border-slate-700 z-20">
        <div className="flex">
          <span>
            <img src={logo} alt="logo" srcSet="" className="h-8 text-clip" />
          </span>
        </div>
      </header>
      {/* search section */}
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
      {/* movie hero section */}
      <section>
        <div className="flex justify-center border-b border-slate-700 bg-[url('https://www.themoviedb.org/t/p/original/7Nwnmyzrtd0FkcRyPqmdzTPppQa.jpg')] bg-cover">
          <div className="flex justify-center w-full bg-top-right bg-gradient-to-r from-[#202020e1] via-[#202020dc] to-[#202020c4] backdrop-blur">
            <div className="flex flex-col w-full md:w-full max-w-[85rem] md:p-8 py-8 space-y-4 md:space-y-8 ">
              <div className="p-4">
                <p className="text-3xl font-bold text-white">
                  The Wolf of Wall Street
                </p>
                <div className="flex space-x-2 text-sm text-slate-300 font-bold">
                  <p>2013</p>
                  <p>3h</p>
                </div>
              </div>
              <div className="flex space-x-0 md:space-x-4">
                <div className="bg-white p-1 h-max hidden md:block">
                  <span>
                    <img
                      src="https://image.tmdb.org/t/p/w500/34m2tygAYBGqA9MXKhRDtzYd4MR.jpg"
                      alt=""
                      className="w-32 md:w-auto md:h-96"
                    />
                  </span>
                </div>
                {/* movie trailer */}
                <div className="flex-1 h-56 md:h-full border-slate-600 sticky top-0">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/Slj4-Sv-YNA??autoplay=1&loop=1&controls=0&modestbranding=0&showinfo=0"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
              <div className="space-x-4 p-4 flex md:hidden">
                <div className="bg-white p-1 h-max">
                  <span>
                    <img
                      src="https://image.tmdb.org/t/p/w500/34m2tygAYBGqA9MXKhRDtzYd4MR.jpg"
                      alt=""
                      className="w-32 md:w-auto md:h-96"
                    />
                  </span>
                </div>
                <div className="flex-1 space-y-4">
                  <p className="flex items-center space-x-2 text-xl md:text-4xl text-white font-bold">
                    <span>The Wolf of Wall Street</span>
                  </p>
                  <p className="text-sm md:text-lg text-white">
                    A New York stockbroker refuses to cooperate in a large
                    securities fraud case involving corruption on Wall Street,
                    corporate banking world and mob infiltration. Based on
                    Jordan Belfort's autobiography.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* analysis section */}
      <section>
        <div className="flex justify-center bg-black border-b border-slate-700">
          <div className="flex justify-center w-full">
            <div className="flex flex-col w-full md:w-full max-w-[85rem] p-4 md:p-8 py-8 space-y-4 md:space-y-8">
              <div>
                <p className="text-4xl text-white font-extrabold">
                  Our Analysis
                </p>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-4">
                  <div className="space-y-1">
                    <p className="text-xl md:text-2xl text-slate-400">
                      Emotion analysis
                    </p>
                    <p className="text-white text-sm md:text-lg">
                      This chart tells you the flow of each emotion throughout
                      the movie. You can see how the emotions change as the
                      movie progresses and can help find scences of certain
                      strong emotions.
                    </p>
                    <p className="bg-purple-300 p-2 text-xs md:text-sm font-bold">
                      You can click on emotions label on the top to toggle them
                      to get a better picture
                    </p>
                  </div>
                  <div className="max-h-[30rem] h-[15rem] md:h-[30rem] w-full p-2 bg-black border border-gray-600 rounded-md">
                    <Line
                      data={emotion_data}
                      options={options}
                      height={"40rem"}
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="space-y-1">
                    <p className="text-xl md:text-2xl text-slate-400">
                      Profanity analysis
                    </p>
                    <p className="text-white text-sm md:text-lg">
                      This chart tells you about the profanity as it progresses
                      through the playback time. Genreally speaking if the movie
                      has a chart above 30 points it's said to be quite a
                      profanitive movie.
                    </p>
                  </div>
                  <div className="max-h-[30rem] h-[15rem] md:h-[30rem] w-full p-2 bg-black border border-gray-600 rounded-md">
                    <Line
                      data={profanity_data}
                      options={options}
                      height={"40rem"}
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="space-y-1">
                    <p className="text-xl md:text-2xl text-slate-400">
                      Most used profanitive words
                    </p>
                    <p className="text-white text-sm md:text-lg">
                      These are the most used profanity words in the movie.
                    </p>
                  </div>
                  <div className="max-h-[30rem] w-full bg-black border border-gray-600 rounded-md overflow-hidden relative">
                    <button className="absolute flex items-center justify-center w-full h-full  text-white z-10 hover:bg-purple-300 hover:text-black transition ease-out duration-150" onClick={() => {viewProfanityWords()}} ref={viewProfanityButton}>Click to view</button>  
                    <div className="flex flex-wrap p-2 md:p-4 gap-2 md:gap-4 blur transition ease-out duration-300" ref={profanityWordsView}>
                      {Object.keys(top_ten_profanitive_words).map((key) => {
                        return (
                          <p className="p-1 md:p-2 md:px-4 px-2 md:text-xl rounded-md text-white w-max bg-slate-900 hover:bg-purple-500 hover:text-white">
                            {key}
                          </p>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    // temo uodate
  );
};

export default Movie;
