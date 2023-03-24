import axios from "axios";
import { Outlet } from "react-router-dom";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

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

type DownloadButtonProps = {
  authToken: string;
  id: number;
  updated: number;
  setUpdated: Dispatch<SetStateAction<number>>;
};

type TypePagesDownloaded = {
  _id: string;
  genre: number;
  pages: Array<number>;
  total_pages: number;
  total_results: number;
};

type TypeMoviesTable = {
  auth_token: string;
};

const Movies = () => {
  const [pagesDownloaded, setPagesDownloaded] = useState<TypePagesDownloaded>();
  const [moviesCount, setMoviesCount] = useState(0);
  const [authToken, setAuthToken] = useState("");

  useEffect(() => {
    const url = "https://api.opensubtitles.com/api/v1/login";

    const payload = {
      username: "dev_atharva_malji",
      password: "Abstinence@1996",
    };

    const headers = {
      "Content-Type": "application/json",
      "Api-Key": "ITWoYHcIuEH5NEWIGrZb3ZBkW2vKjSTO",
    };

    axios
      .get("http://localhost:8000/movies/moviesGenrePagesDownloaded")
      .then((res) => {
        console.log(res.data);
        setPagesDownloaded(res.data);
      });

    axios
      .get("http://localhost:8000/movies/getTotalMoviesCount")
      .then((res) => {
        console.log(res.data.result);
        setMoviesCount(res.data.result);
      });

    axios
      .post(url, JSON.stringify(payload), { headers: headers })
      .then((response) => {
        setAuthToken(response.data.token);
        console.log(authToken);
      });
  }, []);

  return (
    <div className="space-y-8">
      <h3 className="text-3xl font-black">Movies</h3>
      <div className="grid grid-cols-2 md:grid-cols-6">
        <div className="p-4 bg-white border">
          <p>Total Movies</p>
          <span className="text-4xl font-black">
            {moviesCount ? moviesCount : "loading"}
          </span>
        </div>
      </div>
      <div>
        <MoviesTable auth_token={authToken} />
      </div>
      <div>
        <p>
          Pages downloaded:{" "}
          <span>
            {pagesDownloaded
              ? `${pagesDownloaded.pages.length} / ${pagesDownloaded.total_pages}`
              : "loading"}
          </span>
        </p>
      </div>
    </div>
  );
};

const MoviesTable = (props: TypeMoviesTable) => {
  const [movies, setMovies] = useState<Array<TypeMovies>>();
  const [isUpdated, setIsUpdated] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const paginateFront = () => setCurrentPage(currentPage + 1);
  const paginateBack = () => setCurrentPage(currentPage - 1);

  const currentPosts = movies
    ? movies.slice(indexOfFirstPost, indexOfLastPost)
    : [];

  useEffect(() => {
    console.log("movies table loaded");
    axios.get("http://localhost:8000/movies/").then((res) => {
      console.log(res.data);
      setMovies(res.data);
    });
  }, [isUpdated]);

  return (
    <div className="space-y-4">
      <div className="overflow-auto border">
        <table className="border bg-white w-full border-collapse border-hidden">
          <thead>
            <tr>
              <th className="p-1 w-24 text-start border">TMDB_ID</th>
              <th className="p-1 text-start border">Name</th>
              <th className="p-1 w-36 text-start border">Release Year</th>
              <th className="p-1 w-24 text-start border">Status</th>
              <th className="p-1 w-36 text-start border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentPosts
              ? currentPosts.map((movie, index) => {
                  return (
                    <tr key={index}>
                      <td className="p-1 w-24 text-start border">{movie.id}</td>
                      <td className="p-1 text-start border">
                        <span className="line-clamp-1">{movie.title}</span>
                      </td>
                      <td className="p-1 text-start border">
                        {new Date(movie.release_date).getFullYear()}
                      </td>
                      <td className="p-1 text-start border">
                        <div className="">
                          <p
                            className={`flex justify-center text-sm p-1 text-center ${
                              movie.subtitle_downloaded
                                ? "bg-green-100 text-green-500"
                                : "bg-red-100 text-red-500"
                            }`}
                          >
                            {movie.subtitle_downloaded ? (
                              <span>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                  className="w-5 h-5"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4.5 12.75l6 6 9-13.5"
                                  />
                                </svg>
                              </span>
                            ) : (
                              <span>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                  className="w-5 h-5"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                              </span>
                            )}
                          </p>
                        </div>
                      </td>
                      <td className="p-1 text-start border">
                        {!movie.subtitle_downloaded ? (
                          <DownloadButton
                            authToken={props.auth_token}
                            id={movie.id}
                            updated={isUpdated}
                            setUpdated={setIsUpdated}
                          ></DownloadButton>
                        ) : (
                          <></>
                        )}
                      </td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>
      </div>
      <div className="flex space-x-8">
        <div className="flex items-center space-x-2">
          <div>
            <p>Showing page {currentPage} of </p>
          </div>
          <div className="border w-max divide-x">
            <button
              className="p-2"
              onClick={paginateBack}
              disabled={currentPage < 2 ? true : false}
            >
              Previous
            </button>
            <button
              className="p-2"
              onClick={paginateFront}
              disabled={
                currentPage >
                Math.floor(movies ? movies.length / postsPerPage : 999999)
                  ? true
                  : false
              }
            >
              Next
            </button>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <p>Posts per page</p>
          <select className="border p-2" onChange={() => {}} name="" id="">
            <option value="10">10</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>
      </div>
    </div>
  );
};

const DownloadButton = (props: DownloadButtonProps) => {
  const [downloading, setDownloading] = useState(false);

  const downloadSubtitle = () => {
    const url = "http://localhost:8000/movies/downloadSubtitle";

    const payload = {
      tmdb_id: props.id,
      file_name: props.id.toString(),
      auth_token: props.authToken,
    };
    setDownloading(true);
    axios.post(url, JSON.stringify(payload)).then(() => {
      setDownloading(false);
      props.setUpdated(props.updated + 1);
    });
  };

  return (
    <button
      className="flex items-center justify-center space-x-2 p-1 w-48 text-sm bg-green-100 text-green-600 font-medium"
      onClick={() => {
        downloadSubtitle();
      }}
      disabled={downloading}
    >
      <span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
          />
        </svg>
      </span>
      <p>{downloading ? "Downloading" : "Download"}</p>
    </button>
  );
};

export default Movies;
