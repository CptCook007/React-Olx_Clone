import { useState, useRef } from "react";
import {
  FaLocationCrosshairs,
  FaChevronDown,
  FaMagnifyingGlass,
} from "react-icons/fa6";
import { FiMapPin } from "react-icons/fi";
export function NavbarLocationSelector() {
  const [clicked, setClicked] = useState(false);
  function clickHandler() {
    setClicked((click) => {
      click = !clicked;
      return click;
    });
  }
  return (
    <>
      <div className="relative h-[46px] bg-white w-72">
        <div
          className={
            clicked
              ? "border-cyan-300 border-2 h-[46px] flex justify-between pe-5 bg-white w-full"
              : "border-2 border-black h-[46px] flex pe-5 justify-between w-full"
          }
          onClick={clickHandler}
          typeof="text"
        >
          <div className="w-full flex gap-3.5 ps-4">
            <span className="text-gray-800 pt-3">
              <FaMagnifyingGlass></FaMagnifyingGlass>
            </span>
            <span className="pt-1.5  text-gray-700 text-lg">India</span>
          </div>
          <div
            className={`absolute text-2xl right-5 top-2.5 transition-transform duration-500
            ${clicked ? "rotate-180 " : "rotate-0 "}`}
          >
            <FaChevronDown></FaChevronDown>
          </div>
        </div>
        <div
          className={
            clicked
              ? "border drop-shadow-xl z-30  top-12 overflow-y-scroll h-[300px] absolute w-full bg-white"
              : "hidden"
          }
        >
          <div className="text-blue-500 pb-3 ps-4 pt-3  hover:bg-cyan-100 hover:cursor-pointer">
            <div className="flex gap-4 ">
              <span className="text-2xl pt-6">
                <FaLocationCrosshairs></FaLocationCrosshairs>
              </span>
              <span className="font-bold">
                Use Current Location
                <br />
                <span className="font-normal">
                  Location blocked. Check phone/browser settings.
                </span>
              </span>
            </div>
            <p className="ps-11 text-sm"></p>
          </div>
          <hr></hr>
          <div className="pb-3 pt-3 ps-4 flex gap-5 text-slate-700 hover:bg-cyan-100 hover:cursor-pointer font-semibold">
            <span className="text-gray-500 text-2xl">
              <FiMapPin></FiMapPin>
            </span>
            Kannur
          </div>
          <div className="pb-3 pt-3 ps-4 flex gap-5 text-slate-700 hover:bg-cyan-100 hover:cursor-pointer font-semibold">
            <span className="text-gray-500 text-2xl">
              <FiMapPin></FiMapPin>
            </span>
            Kozhikode
          </div>
          <div className="pb-3 pt-3 ps-4 flex gap-5 text-slate-700 hover:bg-cyan-100 hover:cursor-pointer font-semibold">
            <span className="text-gray-500 text-2xl">
              <FiMapPin></FiMapPin>
            </span>
            Kochi
          </div>
          <div className="pb-3 pt-3 ps-4 flex gap-5 text-slate-700 hover:bg-cyan-100 hover:cursor-pointer font-semibold">
            <span className="text-gray-500 text-2xl">
              <FiMapPin></FiMapPin>
            </span>
            Trivandrum
          </div>
          <div className="pb-3 pt-3 ps-4 flex gap-5 text-slate-700 hover:bg-cyan-100 hover:cursor-pointer font-semibold">
            <span className="text-gray-500 text-2xl">
              <FiMapPin></FiMapPin>
            </span>
            Kasargode
          </div>
        </div>
      </div>
    </>
  );
}
