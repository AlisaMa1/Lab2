import { MdOutlineShoppingCart } from "react-icons/md";
import { motion } from "framer-motion";
import axios from "axios";
import { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Product } from "../app/models/Product";
import { useStore } from "../app/stores/store";
import { GiFullPizza } from "react-icons/gi";
import { categories } from "../utils/data";

const FoodContainer1 = () => {
  const { cartStore, categoryStore } = useStore();
  const [food, setFood] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const recordsPerPage = 6;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://localhost:7155/api/Products/allProducts`);
        const responseData = response.data;
        setFood(responseData);
        categoryStore.loadCategories()
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const filteredFood = food.filter((item) => {
    const searchMatch = search.toLocaleLowerCase() === '' || item.title.toLowerCase().includes(search);
    const categoryMatch = selectedCategory === null || item.categoryId === selectedCategory;
    return searchMatch && categoryMatch;
  });
  const records = filteredFood.slice(firstIndex, lastIndex);
  const npage = Math.ceil(filteredFood.length / recordsPerPage);

  const addToCart = (product) => {
    cartStore.addToCart(product);
  };

  const handleCategoryFilter = (categoryId) => {
    setSelectedCategory(categoryId === selectedCategory ? null : categoryId);
  };

  const handleClearFilter = () => {
    setSelectedCategory(null);
  };

  return (
    <div>
      <section className="w-full my-6" id="menu">
        <div className="w-full flex flex-col items-center justify-center">
          <p className="text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-16 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-green-400 to-green-600 transition-all ease-in-out duration-100 mr-auto">
            Our Menu
          </p>
        </div>
        {categoryStore.loading ? (
          <div>Loading Categories...</div>
        ) : (
          <section className="w-full my-6" id="menu">
            <div className="w-full flex items-center justify-start lg:justify-center gap-8 py-6 overflow-x-scroll scrollbar-none">
              {categoryStore.categories && categoryStore.categories.length > 0 && (
                <>
                  {/* Button for "All" */}
                  <motion.div
                    whileTap={{ scale: 0.75 }}
                    className={`group ${
                      selectedCategory === null ? "shadow-lg" : ""
                    } w-24 min-w-[94px] h-28 cursor-pointer rounded-lg drop-shadow-xl flex flex-col gap-3 items-center justify-center text-center `}
                    onClick={handleClearFilter}
                  >
                    <div
                      className={`w-10 h-10 rounded-full shadow-lg ${
                        selectedCategory === null
                          ? "bg-white"
                          : "bg-white"
                      } flex items-center justify-center text-red-700`}
                    >
                      <GiFullPizza
                        className={`${
                          selectedCategory === null
                            ? "text-green-600"
                            : "text-red-600"
                        } text-4xl`}
                      />
                    </div>
                    <p
                      className={`text-sm ${
                        selectedCategory === null
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      All
                    </p>
                  </motion.div>

                  {/* Other category buttons */}
                  {categoryStore.categories.map((item) => (
                    <motion.div
                      whileTap={{ scale: 0.75 }}
                      key={item.categoryId}
                      className={`group ${
                        selectedCategory === item.categoryId ? "shadow-lg" : ""
                      } w-24 min-w-[94px] h-28 cursor-pointer rounded-lg drop-shadow-xl flex flex-col gap-3 items-center justify-center text-center `}
                      onClick={() => handleCategoryFilter(item.categoryId)}
                    >
                      <div
                        className={`w-10 h-10 rounded-full shadow-lg ${
                          selectedCategory === item.categoryId
                            ? "bg-white"
                            : "bg-white"
                        } flex items-center justify-center text-red-700`}
                      >
                        <GiFullPizza
                          className={`${
                            selectedCategory === item.categoryId
                              ? "text-green-600"
                              : "text-red-600"
                          } text-4xl`}
                        />
                      </div>
                      <p
                        className={`text-sm ${
                          selectedCategory === item.categoryId
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {item.name}
                      </p>
                    </motion.div>
                  ))}
                </>
              )}
            </div>
            <div className="w-full flex items-center gap-3 my-12 scroll-smooth overflow-x-hidden flex-wrap justify-center">
              <input
                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                type="text"
                placeholder="Search..."
                onChange={(e) => setSearch(e.target.value)}
              />
              {records && records.length > 0 ? (
                records.map((item) => (
                  <div
                    key={item?.productID}
                    className="w-275 h-[220px] min-w-[350px] md:w-300 md:min-w-[400px] bg-cardOverlay rounded-lg py-2 px-4 my-5 backdrop-blur-lg hover:drop-shadow-lg flex flex-col items-center justify-evenly relative"
                  >
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
          </section>
        )}
      </section>

      {/* Pagination Controls */}
      <div className="flex flex-col items-center mt-4">
        <div className="flex items-center gap-3">
          <button
            onClick={prePage}
            className="bg-white text-green-500 px-4 py-2 rounded-md cursor-pointer shadow-md"
          >
            Previous
          </button>
          {Array.from({ length: npage }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => changeCPage(i + 1)}
              className={`text-lg font-semibold bg-green-500 text-white px-4 py-2 rounded-md shadow-md ${
                currentPage === i + 1 ? 'active' : ''
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={nextPage}
            className="bg-white text-green-500 px-4 py-2 rounded-md cursor-pointer shadow-md"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );

  function prePage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function changeCPage(id) {
    setCurrentPage(id);
  }

  function nextPage() {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  }
};

export default observer(FoodContainer1);
