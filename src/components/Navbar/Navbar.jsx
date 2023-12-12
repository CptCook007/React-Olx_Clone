import { useContext, useState } from "react";
import CategoryNav from "../home/CategoryNav";
import { NavbarLocationSelector } from "./NavbarLocationSelector";
import { FaMagnifyingGlass, FaPlus } from "react-icons/fa6";
import { LoginModal } from "../Login/LoginModal";
import { UserContext } from "../../App";
import { Link } from "react-router-dom";
function Navbar() {
  const { user, setUser } = useContext(UserContext);
  const [modal, setModal] = useState(false);
  function handleSellButtonClick() {
    if (!user) {
      setModal(true);
    }
  }
  return (
    <>
      <nav className="bg-[rgb(239,240,243)] p-2.5 fixed z-10  top-0 left-0 w-full lg:ps-32 flex gap-100">
        <div id="logo">
          <svg
            width="55px"
            height="55px"
            viewBox="0 0 1024 1024"
            data-aut-id="icon"
            fill="#002f34"
            fillRule="evenodd"
          >
            <path d="M661.333 256v512h-128v-512h128zM277.333 298.667c117.824 0 213.333 95.531 213.333 213.333s-95.509 213.333-213.333 213.333c-117.824 0-213.333-95.531-213.333-213.333s95.509-213.333 213.333-213.333zM794.496 384l37.504 37.504 37.504-37.504h90.496v90.496l-37.504 37.504 37.504 37.504v90.496h-90.496l-37.504-37.504-37.504 37.504h-90.496v-90.496l37.504-37.504-37.504-37.504v-90.496h90.496zM277.333 426.667c-47.061 0-85.333 38.293-85.333 85.333s38.272 85.333 85.333 85.333c47.061 0 85.333-38.293 85.333-85.333s-38.272-85.333-85.333-85.333z"></path>
          </svg>
        </div>
        <div className="ps-9 pt-1.5 lg:block hidden">
          <NavbarLocationSelector></NavbarLocationSelector>
        </div>
        <div className="w-[40%] flex pt-1.5 ps-6">
          <input
            className="border-2 border-black rounded-none h-[92%] ps-2 w-full"
            placeholder="Find Cars, Mobile Phones and more..."
          ></input>
          <button className="bg-[#002f34] rounded-none w-16 flex items-center justify-center h-[92%]">
            <span className="text-white">
              <FaMagnifyingGlass></FaMagnifyingGlass>
            </span>
          </button>
        </div>
        <div className="flex underline decoration-black hover:no-underline decoration-[2px] text-lg text-center font-bold ms-28 underline-offset-4 items-center -mt-1">
          {user ? (
            <button
              onClick={() => {
                setUser(null);
                localStorage.removeItem("username");
              }}
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => {
                setModal((modalStatus) => {
                  modalStatus = true;
                  return modalStatus;
                });
              }}
            >
              Login
            </button>
          )}
        </div>
        <div className="w-[6%] ms-10 pt-2 h-full">
          <Link to={user ? "/user/add-product" : ""}>
            <button
              onClick={handleSellButtonClick}
              className="rounded-3xl bg-white drop-shadow-lg font-bold text-[#002f34] flex items-center justify-center h-[40px] w-full border border-[#002f34]"
            >
              <span className="pe-2">
                <FaPlus></FaPlus>
              </span>
              SELL
            </button>
          </Link>
        </div>
      </nav>
      <div className="mt-20">
        <CategoryNav></CategoryNav>
      </div>
      {modal && <LoginModal setModal={setModal}></LoginModal>}
    </>
  );
}
export default Navbar;
