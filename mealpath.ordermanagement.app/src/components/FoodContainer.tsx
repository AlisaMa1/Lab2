import { MdOutlineShoppingCart } from "react-icons/md";
import { motion } from "framer-motion";
import axios from "axios";
import { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Product } from "../app/models/Product";
import { useStore } from "../app/stores/store";

const FoodContainer = () => {
  const { cartStore } = useStore();
  const [food, setFood] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(true);
  const [totalProducts, setTotalProducts] = useState(0);

  const addToCart = (product: Product) => {
    cartStore.addToCart(product);
  };

  useEffect(() => {
    // setLoading(true);
    axios
      .get(`https://localhost:7155/api/Products/all?page=${page}&pageSize=${pageSize}`)
      .then((response) => {
        // console.log("Raw Response:", response);
        const responseData = response.data;
  
        if (Array.isArray(responseData)) {
          // console.log("Mapped Data:", responseData);
          const totalCountHeader = response.headers['x-total-count'];
          //console.log("Total Products Count:", totalCountHeader);
          setTotalProducts(totalCountHeader);
  
          setFood(responseData);
        } else {
          console.error("Invalid response data format:", responseData);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [page, pageSize]);
  
  const [search, setSearch] = useState('');
  
  const hasNextPage = totalProducts > page * pageSize;
console.log(food)
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <input
        className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
        type="text"
        placeholder="Search..."
        onChange={(e) => setSearch(e.target.value)}
      />
        

      {/* Product Container */}
      <div className="w-full flex items-center gap-3 my-12 scroll-smooth overflow-x-hidden flex-wrap justify-center">
        
        {food && food.length > 0 ? (
          food
          .filter((item) =>{
            return search.toLocaleLowerCase() === '' ? item 
            : item.title.toLowerCase().includes(search)
          })
          .map((item) => (
            <div
              key={item?.productID}
              className="w-275 h-[220px] min-w-[350px] md:w-300 md:min-w-[400px] bg-cardOverlay rounded-lg py-2 px-4 my-5 backdrop-blur-lg hover:drop-shadow-lg flex flex-col items-center justify-evenly relative"
            >
              {/* Product Content */}
              <div className="w-full flex items-center justify-between py-2">
                <motion.div
                  className="w-40 h-40 -mt-8 drop-shadow-2xl"
                  whileHover={{ scale: 1.2 }}
                >
                  <img
                    src={item?.imageUrl}
                    alt=""
                    className="w-full h-full object-contain"
                  />
                </motion.div>
                <motion.div
                  whileTap={{ scale: 0.75 }}
                  className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center cursor-pointer hover:shadow-md -mt-8"
                  onClick={() => addToCart(item)}
                >
                  <MdOutlineShoppingCart className="text-white" />
                </motion.div>
              </div>

              {/* Additional Product Details */}
              <div className="w-full flex flex-col items-end justify-end -mt-8 relative">
                <p className="text-textColor font-semibold text-base md:text-lg">
                  {item?.title}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  {item?.description}
                </p>
                <div className="flex items-center gap-8">
                  <p className="text-lg text-headingColor font-semibold">
                    <span className="text-sm text-green-500">$</span> {item?.price}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full flex flex-col items-center justify-center">
            <p className="text-xl text-headingColor font-semibold my-2">
              Items Not Available
            </p>
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-col items-center mt-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setPage((prevPage) => prevPage - 1)}
            disabled={page === 1}
            className="bg-white text-green-500 px-4 py-2 rounded-md cursor-pointer shadow-md"
          >
            Previous
          </button>
          <span className="text-lg font-semibold bg-green-500 text-white px-4 py-2 rounded-md shadow-md">
            {page}
          </span>
          <button
            onClick={() => setPage((prevPage) => prevPage + 1)}
            // disabled={!hasNextPage}
            className="bg-white text-green-500 px-4 py-2 rounded-md cursor-pointer shadow-md"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default observer(FoodContainer);
