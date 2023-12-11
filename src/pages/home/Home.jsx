import axios from "axios";
import Navbar from "../../components/home/Navbar";
// import { data } from "../../productData";
import { db } from "../../firebase-config";
import { ProductCard } from "../../components/home/ProductCard";
import Footer from "../../components/home/Footer";
import { useEffect, useState } from "react";
import { collection, getDocs, limit, query } from "firebase/firestore";
function Home() {
  const collectionRef = collection(db, "products");
  const [products, setProducts] = useState([]);
  const [limitCount, setLimitCount] = useState(8);
  const [loaded, setLoaded] = useState(false);
  const [dbError, setDbError] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const qry = query(collectionRef, limit(limitCount));
        const querySnapshot = await getDocs(qry).catch((error) => {
          setDbError(true);
          setLoaded(true);
        });
        const fetchedProducts = [];
        querySnapshot.forEach((doc) => {
          fetchedProducts.push(doc.data());
        });
        setProducts(fetchedProducts);
        if (!loaded) {
          setLoaded(true);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [limitCount]);
  console.log(products);
  return (
    <div className="relative">
      <Navbar />
      <div className="ms-36 mt-14">
        <h3 className="font-[400] text-[#002f34] text-[28px] font-roboto">
          Fresh recommendations
        </h3>
      </div>
      <div>
        {loaded ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 px-36 gap-5 mt-3 h-full w-full">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <>
            <div className="w-full h-full items-center flex justify-center mt-20 mb-52">
              <div className="animate-spin rounded-full border-t-4 border-b-4 border-cyan-900 h-16 w-16"></div>
            </div>
          </>
        )}
        {dbError && (
          <div className="text-red-600 font-semibold">Something went wrong</div>
        )}
      </div>
      {loaded && (
        <div className="flex justify-center mt-10">
          <button
            onClick={() => {
              setLimitCount((currentLimit) => {
                return currentLimit + 8;
              });
            }}
            className="border-2 border-[#002f34] w-36 h-12 font-semibold text-lg"
          >
            Load More
          </button>
        </div>
      )}
      <div className="mt-10">
        <Footer></Footer>
      </div>
    </div>
  );
}
export default Home;
