import { motion } from "framer-motion";
import { Outlet } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { BsGearWideConnected } from "react-icons/bs";
import {
  BsFillDiscFill,
  BsFillGridFill,
  BsFillHouseFill,
} from "react-icons/bs";
import { HiHome } from "react-icons/hi2";
import logo from "../images/logo.svg";
import { useState } from "react";

const Main = () => {
  const [sidebar, setSidebar] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-200">
      <header className="bg-white border-b sticky top-0 flex items-center space-x-4 z-10 p-2">
        <div>
          <button
            className="p-2 rounded-full hover:bg-red-100"
            onClick={() => {
              setSidebar(!sidebar);
            }}
          >
            <GiHamburgerMenu className="text-xl text-slate-600" />
          </button>
        </div>
        <div>
          <img src={logo} alt="" srcSet="" className="h-8" />
        </div>
      </header>
      <div className="flex-1 flex bg-gray-100">
        <motion.div
          key={"expanded"}
          className={`p-2 overflow-hidden bg-white text-white border-r`}
          animate={{ width: sidebar ? "16rem" : "3.5rem" }}
          transition={{ duration: 0.3, type: "spring" }}
        >
          <div>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <button className="flex space-x-4 w-full p-2 rounded-xl hover:bg-red-100">
                  <BsFillHouseFill className="text-xl text-slate-600" />
                  <motion.p
                    className="text-black text-sm"
                    animate={{ display: sidebar ? "block" : "none" }}
                    transition={{ delay: 0.0 }}
                  >
                    Home
                  </motion.p>
                </button>
              </li>
              <li className="flex items-center space-x-2">
                <button className="flex space-x-4 w-full p-2 rounded-xl hover:bg-red-100">
                  <BsFillDiscFill className="text-xl text-slate-600" />
                  <motion.p
                    className="text-black text-sm"
                    animate={{ display: sidebar ? "block" : "none" }}
                    transition={{ delay: 0.0 }}
                  >
                    Database
                  </motion.p>
                </button>
              </li>
              <li className="flex items-center space-x-2">
              <button className="flex space-x-4 w-full p-2 rounded-xl hover:bg-red-100">
                  <BsFillGridFill className="text-xl text-slate-600" />
                  <motion.p
                    className="text-black text-sm"
                    animate={{ display: sidebar ? "block" : "none" }}
                    transition={{ delay: 0.0 }}
                  >
                    Services
                  </motion.p>
                </button>
              </li>
              <li className="flex items-center space-x-2">
              <button className="flex space-x-4 w-full p-2 rounded-xl hover:bg-red-100">
                  <BsGearWideConnected className="text-xl text-slate-600" />
                  <motion.p
                    className="text-black text-sm"
                    animate={{ display: sidebar ? "block" : "none" }}
                    transition={{ delay: 0.0 }}
                  >
                    Settings
                  </motion.p>
                </button>
              </li>
            </ul>
          </div>
        </motion.div>
        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Main;
