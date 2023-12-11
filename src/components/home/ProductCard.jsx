import { GoHeart } from "react-icons/go";
import { FaBolt } from "react-icons/fa6";
export function ProductCard({ product }) {
  return (
    <>
      <div className="hover:cursor-pointer relative flex-col  rounded border inline-flex justify-center align-top  border-gray-300 shadow-lg">
        <div className="h-52 overflow-hidden">
          <div className="text-2xl absolute rounded-full border p-2 right-3 bg-white top-2">
            <GoHeart></GoHeart>
          </div>
          {product.featured && (
            <div className="text-[12px] font-roboto ps-2 w-24 items-center gap-2 absolute flex bg-[#ffce32] left-2 top-2">
              <FaBolt></FaBolt>
              FEATURED
            </div>
          )}
          <img
            className="object-contain px-4 pt-3"
            width={"100%"}
            height={"0px"}
            src={product.image}
          ></img>
        </div>
        <div className="relative">
          <div
            className={
              product.featured ? "w-[5px] bg-[#ffce32] h-full absolute" : ""
            }
          ></div>
          <div className="px-5 pt-5 pb-3 flex flex-col">
            <div className="text-xl font-semibold">$ {product.price}</div>
            <div className="truncate">{product.title}</div>
            <div className="truncate pt-1 font-normal text-xs font-roboto text-gray-500">
              {product.description}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
