import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

type AttributesServiceCard = {
  gif: string;
  gifAlt: string;
  gifBgColor: string;
  gifPadding: string;
  title: string;
  description: string;
  link: string;
};

type PropsServiceCard = {
  data: AttributesServiceCard;
};

const ServiceCard = (props: PropsServiceCard) => {
  return (
    <div className="bg-black text-white rounded-lg overflow-hidden">
      <img
        src={props.data.gif}
        alt={props.data.gifAlt}
        className={`${props.data.gifPadding} ${props.data.gifBgColor} h-48 w-full object-contain`}
      />
      <div className="p-4 space-y-4">
        <p className="text-2xl font-extrabold">{props.data.title}</p>
        <p>{props.data.description}</p>
        <div>
          <Link to="movies">
            <button className="flex items-center space-x-2 p-2 px-4 bg-white text-black font-bold">
              <span>Show me this cool stuff</span>
              <ArrowLongRightIcon className="h-6" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
