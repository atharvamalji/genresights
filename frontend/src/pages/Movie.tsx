import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Line } from "react-chartjs-2"
import axios from "axios";

const Movie = () => {
  let { movieId } = useParams();

  const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      borderWidth: 1,
      tension: 0.2
    }]
  }

  const options = {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }

  useEffect(() => {
    axios.get(`http://localhost:8000/movies/getMovie?id=${movieId}`);
  }, []);

  return (
    <div className="min-h-screen bg-black">
      <div className="p-8 flex flex-col items-center space-y-16">
        <section className="w-[80rem] overflow-hidden">
          <div className="flex space-x-8">
            <div>
              <span>
                <img
                  src="https://m.media-amazon.com/images/M/MV5BMjIxMjgxNTk0MF5BMl5BanBnXkFtZTgwNjIyOTg2MDE@._V1_FMjpg_UY2048_.jpg"
                  alt=""
                  className="w-72"
                />
              </span>
            </div>
            <div className="flex-1 text-white space-y-4">
              <h1 className="text-5xl font-[900]">The Wolf of Wall Street</h1>
              <div className="flex space-x-4 text-xl text-white font-[700]">
                <p className="">2013</p>
                <p className="">R</p>
                <p className="">3 hr</p>
              </div>
              <div>
                <p className="text-xl">
                  Based on the true story of Jordan Belfort, from his rise to a
                  wealthy stock-broker living the high life to his fall
                  involving crime, corruption and the federal government.
                </p>
              </div>
              <div className="flex space-x-4">
                <p className="p-1 px-2 bg-white text-black font-bold border w-max text-sm">
                  Biography
                </p>
                <p className="p-1 px-2 bg-white text-black font-bold border w-max text-sm">
                  Comedy
                </p>
                <p className="p-1 px-2 bg-white text-black font-bold border w-max text-sm">
                  Crime
                </p>
              </div>
              <div>
                <div className="flex space-x-4 py-4 border-slate-700 border-b">
                  <p className="font-bold text-pink-500">Director</p>
                  <p>Martin Scorsese</p>
                </div>
                <div className="flex space-x-4 py-4 border-slate-700 border-b">
                  <p className="font-bold text-pink-500">Writer</p>
                  <p>Terence Winter, Jordan Belfort</p>
                </div>
                <div className="flex space-x-4 py-4 border-slate-700 border-b">
                  <p className="font-bold text-pink-500">Stars</p>
                  <p>Leonardo DiCaprio, Jonah Hill, Margot Robbie</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-[80rem]">
          <div>
            <p className="text-5xl font-[900] text-white bg-gradient-to-r from-rose-400 to-pink-600 w-max text-transparent bg-clip-text">Our Insights</p>
          </div>
          <div className="text-white space-y-4">
            <p>Emotion analysis</p>
            <Line data={data} options={options} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Movie;
