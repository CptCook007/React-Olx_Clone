import { useEffect, useState } from "react";
import { FaArrowLeft, FaCamera } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { db } from "../../firebase-config";
import { addDoc, collection } from "firebase/firestore";
import storage from "../../firebase-config";
import { v4 as uuidv4 } from "uuid";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

import {
  getDownloadURL,
  ref as storageRef,
  uploadBytesResumable,
} from "firebase/storage";

export function AddProduct() {
  const [loader, setLoader] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [titleValidated, setTitleValidated] = useState(true);
  const [priceValidated, setPriceValidated] = useState(true);
  const [localImageUrl, setLocalImageUrl] = useState("");
  const collectionRef = collection(db, "products");
  useEffect(() => {
    if (loader) {
      document.body.style.overflow = "hidden";
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      document.body.style.overflow = "visible";
    }
    return () => {
      document.body.style.overflow = "visible";
    };
  }, [loader]);
  const handleAdSubmit = async (e) => {
    e.preventDefault();

    if (
      titleValidated &&
      title.trim() !== "" &&
      priceValidated &&
      price.trim() !== "" &&
      image !== null
    ) {
      try {
        setLoader(true);

        const imageRef = storageRef(storage, `products/${uuidv4()}`);
        const uploadTask = uploadBytesResumable(imageRef, image);

        uploadTask.on(
          "state_changed",
          () => {},
          (error) => {
            alert(error);
            setLoader(false);
          },
          async () => {
            try {
              console.log();
              const imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
              const isFeatured = Math.random() < 0.3;
              await addDoc(collectionRef, {
                id: uuidv4(),
                title: title,
                description: description,
                image: imageUrl,
                price: price,
                featured: isFeatured,
              });

              setLoader(false);
              setTitle("");
              setDescription("");
              setImage(null);
              setPrice("");
              Toastify({
                text: "Ad posted successfully",
                duration: 3000,
                destination: "",
                newWindow: true,
                close: false,
                gravity: "bottom",
                position: "center",
                stopOnFocus: true,
                style: {
                  background: "linear-gradient(to right, #00A36C, #00FF7F)",
                },
                onClick: function () {},
              }).showToast();
            } catch (error) {
              console.error(error);
              Toastify({
                text: "Unexpected error has been occured",
                duration: 3000,
                destination: "",
                newWindow: true,
                close: false,
                gravity: "bottom",
                position: "center",
                stopOnFocus: true,
                style: {
                  background: "linear-gradient(to right,  #FF6F47, #DD4500)",
                },
                onClick: function () {},
              }).showToast();
              setLoader(false);
            }
          }
        );
      } catch (error) {
        console.error(error);
        alert("An error occurred while uploading the image.");
        setLoader(false);
      }
    } else {
      setTitleValidated(false);
      setPriceValidated(false);
      Toastify({
        text: "Please fill in all required fields",
        duration: 3000,
        destination: "",
        newWindow: true,
        close: false,
        gravity: "bottom",
        position: "center",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, #FF6347, #DD4500)",
        },
        onClick: function () {},
      }).showToast();
    }
  };

  return (
    <>
      {loader && (
        <div className="bg-black/50 w-full h-full fixed inset-0 flex justify-center items-center">
          <div className="animate-spin rounded-full border-t-4 border-b-4 border-cyan-300 h-16 w-16"></div>
        </div>
      )}
      <div className="bg-[rgb(239,240,243)] shadow-md p-2.5 w-full h-[78px]">
        <Link to="/">
          <button className="flex h-full items-center ps-6 text-xl">
            <FaArrowLeft></FaArrowLeft>
          </button>
        </Link>
      </div>

      <div className="w-full h-full pb-7">
        <div className="w-full pt-3 text-center font-bold font-roboto text-[1.7rem] text-[#002f34]">
          POST YOUR AD
        </div>

        {/* Ad Form */}
        <form onSubmit={handleAdSubmit}>
          <div className="h-[100%] flex pt-4 justify-center">
            <div
              className="rounded pt-4 border border-gray-300 shadow-xl h-full w-[55%]
          "
            >
              <div className=" ps-4">
                <div className="font-bold font roboto pb-3 text-[1.4rem] text-[#002f34]">
                  SELECTED CATAGORY
                </div>
                <span className="text-xs font-roboto">
                  Electronics & Appliances / TVs, Video - Audio
                </span>
                <span className=" ps-5 font-bold text-[#002f34] text-md underline hover:no-underline decoration-black underline-offset-2 cursor-pointer">
                  Change
                </span>
              </div>
              <hr className="mt-4"></hr>
              <div className="ps-8 pt-4">
                <div className="font-bold font-roboto text-[1.4rem] pb-2">
                  INCLUDE SOME DETAILS
                </div>
                <label
                  for="ad-title"
                  className="text-[#002f34] font-medium block"
                >
                  Ad Title *
                </label>
                <input
                  id="ad-title"
                  value={title}
                  onChange={(e) => {
                    e.target.value.length < 5
                      ? setTitleValidated(false)
                      : setTitleValidated(true);
                    setTitle(e.target.value);
                  }}
                  className={`border ps-2 mt-2 h-10 w-96 ${
                    titleValidated
                      ? "border-[#002f34]"
                      : "border-red-600 border-2"
                  }`}
                ></input>
                {!titleValidated && (
                  <div className="text-red-500 font-semibold">
                    Minimum 5 characters is required for the title
                  </div>
                )}
                <label
                  for="ad-title"
                  className="text-[#002f34] font-medium block mt-3"
                >
                  Description
                </label>
                <textarea
                  id="ad-title"
                  className="border ps-2 border-[#002f34] rounded mt-2 h-28 w-96"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                ></textarea>
              </div>
              <hr className="mt-4"></hr>
              <div className="ps-8 pt-4">
                <div className="font-bold font-roboto text-[1.4rem] pb-2">
                  SET A PRICE
                </div>
                <label
                  for="ad-price"
                  className="text-[#002f34] font-medium block"
                >
                  Price*
                </label>
                <div className="flex">
                  <div className="border border-[#002f34] border-e-0 rounded rounded-e-none mt-2 h-10 w-7 flex items-center justify-center">
                    ₹
                  </div>
                  <input
                    id="ad-price"
                    value={price}
                    onChange={(e) => {
                      isNaN(e.target.value)
                        ? setPriceValidated(false)
                        : setPriceValidated(true);
                      setPrice(e.target.value);
                    }}
                    className={`border block ps-2 mt-2 h-10 w-96 ${
                      priceValidated
                        ? "border-[#002f34]"
                        : "border-red-600 border-2"
                    }`}
                  ></input>
                </div>
                {!priceValidated && (
                  <div className="text-red-500 font-semibold">
                    Enter a valid price
                  </div>
                )}
              </div>
              <hr className="mt-4"></hr>
              <div className="ps-8 pt-4 pb-20">
                <div className="font-bold font-roboto text-[1.4rem] pb-2">
                  UPLOAD PHOTOS
                  {!image ? (
                    <label
                      for="ad-photo"
                      className="border hover:cursor-pointer flex items-center justify-center text-4xl border-[#002f34] w-32 h-32"
                    >
                      <FaCamera></FaCamera>
                    </label>
                  ) : (
                    <>
                      {" "}
                      <img
                        width={"350px"}
                        height={"350px"}
                        src={localImageUrl}
                      ></img>
                      <label for="ad-photo" className="">
                        <div className="bg-yellow-400 h-8 mt-5 rounded font-semibold text-sm w-24 cursor-pointer flex items-center justify-center ">
                          Change
                        </div>
                      </label>
                    </>
                  )}
                  <input
                    id="ad-photo"
                    className="hidden"
                    type="file"
                    accept=".jpeg, .jpg"
                    onChange={(e) => {
                      setImage(e.target.files[0]);
                      setLocalImageUrl(URL.createObjectURL(e.target.files[0]));
                    }}
                  ></input>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end pt-10 pe-96">
            <input
              type="submit"
              className="w-20 h-10 hover:cursor bg-cyan-400 rounded-lg font-bold"
              value={"Submit"}
            ></input>
          </div>
        </form>
      </div>
    </>
  );
}
