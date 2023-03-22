import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const Notice = () => {
  const [visible, isVisible] = useState(true);

  const toggleNotice = () => {
    isVisible(!visible);
  };

  return (
    <div className={`p-2 md:p-4 bg-purple-600 rounded text-white ${visible ? "block" : "hidden"}`}>
      <div className="flex justify-between">
        <p className="font-bold">
          Notice{" "}
          <span>
            <img src="/images/megaphone.png" alt="" className="inline h-4" />
          </span>
        </p>
        <button onClick={() => toggleNotice()}>
          <XMarkIcon className="h-4" />
        </button>
      </div>
      <p className="text-sm md:text-base">
        We are working hard in background to analyse more and more movies. It's
        a slow process for now but we promise that you'll be seeing much more
        movies soon.
      </p>
    </div>
  );
};

export default Notice;
