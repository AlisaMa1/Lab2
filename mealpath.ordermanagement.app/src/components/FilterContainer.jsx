import React, {useState, useEffect} from 'react'
import {GiFullPizza} from 'react-icons/gi'
import { categories } from "../utils/data";
import { motion } from "framer-motion";
import { useStore } from '../app/stores/store';
import { observer } from 'mobx-react-lite';





const FilterContainer = () => {


  const [filter, setFilter] = useState("experimental");
  const { categoryStore } = useStore();
  const [category, setCategory] = useState('');

  useEffect(() => {    
    categoryStore.loadCategories();
  }, [categoryStore]);


  if (!categoryStore.categories || categoryStore.categories.length === 0) {
    return null;
  }


  return (
    <section className="w-full my-6" id="menu">
    <div className="w-full flex flex-col items-center justify-center">
      <p className="text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-16 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-green-400 to-green-600 transition-all ease-in-out duration-100 mr-auto">
        Our Menu
      </p>

      </div>
      <section className="w-full my-6" id="menu">
    <div className="w-full flex items-center justify-start lg:justify-center gap-8 py-6 overflow-x-scroll scrollbar-none">
    {categoryStore.categories &&
                categoryStore.categories.map((item) => (
              <motion.div
                whileTap={{ scale: 0.75 }}
                key={item.categoryId}
                className={`group ${
                  filter === item.name ?  "shadow-lg": ""
                } w-24 min-w-[94px]
                 h-28 cursor-pointer rounded-lg drop-shadow-xl flex flex-col gap-3 items-center justify-center text-center `}
                onClick={() => setFilter(item.name)}
                >
                <div
                  className={`w-10 h-10 rounded-full shadow-lg ${
                    filter === item.name
                  } group-hover:bg-white flex items-center justify-center text-red-700`} >
                  <GiFullPizza className={` ${
                      filter === item.name
                        ? "text-green-600"
                        : "text-red-600"
                    } group-hover:text-textColor text-4xl `} />
                </div>
                <p
                  className={`text-sm ${  filter === item.name
                  ? "text-green-600"
                  : "text-red-600"
              }
                   group-hover:text-red-600`}
                >
                  {item.name}
                </p>
              </motion.div>
            ))}
        </div>
        <div className="w-full">
          {/* <FoodContainer
            flag={false}
            data={foodItems?.filter((n) => n.category == filter)}
          /> */}
        </div>
  </section>
      </section>
  )
}

export default observer (FilterContainer)




