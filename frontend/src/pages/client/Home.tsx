import logo from "../../images/showcase-logo.svg";

import Lottie from "lottie-react"
import { ArrowTopRightOnSquareIcon, ShareIcon } from "@heroicons/react/24/outline";

// lottie files
import abstract from "../../lottie_animations/9t8k8wU0Gm.json";

import ServiceCard from "../../components/ServiceCard";

// services data
const serviceEmotion = {
  gif: "/gifs/work-emotion-analysis.webp",
  gifAlt: "emotion analysis",
  gifBgColor: "bg-white",
  gifPadding: "p-4",
  title: "Emotion Extraction & Analysis",
  description:
    "Using the transformer model for emotion detection we have devised a method of extarcting emotion flow in a movie from subtitles.",
  link: "#",
};

const serviceProfanity = {
  gif: "/gifs/work-profanity.webp",
  gifAlt: "profanity analysis",
  gifBgColor: "bg-[#bab0fc]",
  gifPadding: "",
  title: "Profanity Detection & Analysis",
  description:
    "Using NLP we have devised a method to extract profanitive words and profanity percentage from a movie's subtitle and show you some cool analytics about it.",
  link: "#",
};

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-900">
      <header className="sticky top-0 bg-slate-900 p-4 border-b border-slate-700 z-20">
        <div className="flex">
          <span>
            <img src={logo} alt="logo" srcSet="" className="h-8 text-clip" />
          </span>
        </div>
      </header>
      <section>
        <div className="hero flex flex-col p-4 py-14 md:p-8 md:py-28 space-y-4 border-b border-slate-700 md:items-center">
          {/* <p className="text-white text-7xl font-extrabold">GENRESIGHTS</p> */}
          <p className="text-white font-extrabold text-left">
            <span className="text-4xl md:text-7xl">
              <span className="text-7xl">Welcome</span>
              <br className="md:hidden" /> to a novel{" "}
              <br className="md:hidden" />
              movie analysis platform.
            </span>
          </p>
          <p className="text-white text-lg md:text-2xl text-left">
            Based on our ongoing research on emotion analysis from text we are
            proud to introduce various applications of our work in movie
            analysis.
          </p>
          <button className="p-4 px-8 bg-white font-bold">Know More</button>
        </div>
      </section>
      {/* motivation */}
      <section>
        <div className="flex justify-center border-b border-slate-700">
          <div className="flex flex-col max-w-[85rem] p-4 py-14 md:p-8 md:py-28 space-y-4 ">
            <p className="flex items-center space-x-2 text-4xl md:text-7xl text-white font-extrabold">
              <span>Motivation</span>
              <span className="text-3xl">
                <img
                  src="/images/light-bulb.png"
                  alt=""
                  className="h-10 md:h-16"
                />
              </span>
            </p>
            <div>
              <img
                src="/gifs/motivation.webp"
                alt=""
                className="h-28 md:h-48 w-full object-cover"
              />
            </div>
            <div className="md:text-2xl text-white space-y-2">
              <p>
                Amidst the rapid surge of artificial intelligence and machine
                learning research and applications, we thought that the concept
                of emotion analysis would be something intersting and fun to
                dive into.
              </p>
              <p>
                More than anything we want users to get insights about movie in
                a way they have never seen before.
              </p>
              <p>
                This project is very much in active development and you would be
                seeing some awsome updates coming soon! 📣
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* current works */}
      <section>
        <div className="flex justify-center border-b border-slate-700">
          <div className="flex flex-col max-w-[85rem] p-4 py-14 md:p-8 md:py-28 space-y-4 ">
            <p className="flex items-center space-x-2 text-4xl md:text-7xl text-white font-extrabold">
              <span>Current Works</span>
              <span className="text-3xl">
                <img src="/images/work.png" alt="" className="h-10 md:h-16" />
              </span>
            </p>
            <div>
              <img
                src="/webp/current-work.webp"
                alt=""
                className="h-28 md:h-48 w-full object-cover"
              />
            </div>
            
            <div className="md:text-2xl text-white space-y-2">
              <p>
                We are actively researching about new ways and posibilities to
                extract data from movie subtitles and in future we plan to
                expand to audio and video formats.
              </p>
              <p className="space-x-2">
                <span>
                  Currently we have the following features for you awesome
                  people to check out.
                </span>
                <span>
                  <img
                    src="/gifs/point-down.png"
                    alt=""
                    className="h-6 inline"
                  />
                </span>
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ServiceCard data={serviceEmotion}></ServiceCard>
              <ServiceCard data={serviceProfanity}></ServiceCard>
            </div>
          </div>
        </div>
      </section>
      {/* research */}
      <section>
        <div className="flex justify-center border-b border-slate-700">
          <div className="flex flex-col max-w-[85rem] p-4 py-14 md:p-8 md:py-28 space-y-4 ">
            <p className="flex items-center space-x-2 text-4xl md:text-7xl text-white font-extrabold">
              <span>Our Research</span>
              <span className="text-3xl">
                <img
                  src="/images/research.png"
                  alt=""
                  className="h-10 md:h-16"
                />
              </span>
            </p>
            <div>
              <img
                src="/gifs/research.webp"
                alt=""
                className="h-28 md:h-48 w-full object-cover"
              />
            </div>
            <div className="md:text-2xl text-white space-y-2">
              <p>
                All our research work is freely avaiable for you guys to read
                and understand how we are doing what we are doing behind the
                scenes.
              </p>
              <p>
                We have published one research paper regarding our inital work
                and are on our way to publish the next one with improvements
                that we have done to our approach.
              </p>
            </div>
            <div>
              <button className="flex items-center space-x-2 p-2 px-4 bg-white font-bold">
                <span>See our research work</span>
                <ArrowTopRightOnSquareIcon className="h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* team */}
      <section>
        <div className="flex justify-center border-b border-slate-700">
          <div className="flex flex-col max-w-[85rem] md:w-[85rem] p-4 py-14 md:p-8 md:py-28 space-y-4 ">
            <p className="flex items-center space-x-2 text-4xl md:text-7xl text-white font-extrabold">
              <span>Our Team</span>
              <span className="text-3xl">
                <img src="/images/fire.png" alt="" className="h-10 md:h-16" />
              </span>
            </p>
            <div>
              <img
                src="/gifs/team_2.gif"
                alt=""
                className="w-full object-cover"
              />
            </div>
            <div className="md:text-2xl text-white space-y-2">
              <p>
                We are just a bunch of oddballs doing stuff that we love. If you
                like our look and want to help us then spread the word about our
                work around your friends and let them see it for themselves.
              </p>
            </div>
            <div>
              <button className="flex items-center space-x-2 p-2 px-4 bg-white font-bold">
                <span>Yeah i'll spread the word</span>
                <ShareIcon className="h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
      <footer>
        <div className="p-4">
          <p className="text-sm text-white text-center">
            Copyright © 2023 Genresights
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
