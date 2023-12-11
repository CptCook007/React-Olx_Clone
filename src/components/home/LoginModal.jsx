import { FiSmartphone, FiX } from "react-icons/fi";
import { AiFillGoogleCircle } from "react-icons/ai";
import { useContext } from "react";
import { UserContext } from "../../App";
import { auth, provider } from "../../firebase-config";
import { signInWithPopup } from "firebase/auth";
export function LoginModal({ setModal }) {
  const { user, setUser } = useContext(UserContext);
  function handleGoogleAuthClick() {
    signInWithPopup(auth, provider).then((data) => {
      setUser(data.user.displayName);
      localStorage.setItem("username", data.user.displayName);
    });
    setModal(false);
  }
  return (
    <>
      <div className="fixed inset-0 flex justify-center items-center ins z-40 w-full h-full bg-black/80">
        <div className="bg-white rounded h-[42rem] w-[26%]">
          <div className="pe-3 flex justify-end w-full mt-4">
            <button
              onClick={(e) => {
                setModal(false);
              }}
              className="text-4xl font-light"
            >
              <FiX></FiX>
            </button>
          </div>
          <div className="w-full flex justify-center">
            <button className="border-2 mt-10 flex text-[#002f34] font-roboto items-center border-[#002f34] rounded h-14 w-[92%] text-left ps-4 font-semibold text-lg">
              <span className=" pe-5">
                <FiSmartphone></FiSmartphone>
              </span>
              Continue with phone
            </button>
          </div>
          <div className="w-full flex justify-center">
            <button
              onClick={handleGoogleAuthClick}
              className="border-2 mt-10 flex text-[#002f34] font-roboto items-center border-[#002f34] rounded h-14 w-[92%] text-left ps-4 font-semibold text-lg"
            >
              <span className=" pe-5">
                <AiFillGoogleCircle></AiFillGoogleCircle>
              </span>
              Continue with Google
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
