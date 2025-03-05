import React from 'react'
import {IoMdPizza} from 'react-icons/io'
import pizza from '../img/pizza.png';
import { observer } from 'mobx-react-lite';

const HomeContainer = () => {


  return (
    <section
      className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full "
      id="home"
    >
      <div className="py-2 flex-1 flex flex-col items-start justify-center gap-6">
        <div className="flex items-center gap-2 justify-center bg-green-100 px-4 py-1 rounded-full">
          <p className="text-base text-green-500 font-semibold">
            Free Delivery
          </p>
          <div className="w-8 h-8 bg-white rounded-full overflow-hidden drop-shadow-xl">
            <IoMdPizza
              className="w-full h-full object-contain"
              alt="delivery"
            />
          </div>
        </div>

        <p className="text-[2.5rem] lg:text-[4.5rem] font-bold tracking-wide text-headingColor">
          The Best Pizza In
          <span className="text-green-600 text-[3rem] lg:text-[5rem]">
            Your City
          </span>
        </p>

        <p className="text-base text-textColor text-center md:text-left md:w-[80%]">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima velit
          eaque fugit distinctio est nam voluptatum architecto, porro iusto
          deserunt recusandae ipsa minus eos sunt, dolores illo repellat facere
          suscipit!
        </p>

        <button
          type="button"
          className="bg-gradient-to-br from-green-400 to-green-500 w-full md:w-auto px-4 py-2  rounded-lg hover:shadow-lg transition-all ease-in-out duration-100"
        >
           Menu
        </button>
      </div>
      <div className="py-2 flex-1 flex items-center relative">
        <img
          src={pizza}
          className=" ml-3 w-full lg:w-auto lg:h-550"
          alt="banner"
          
        />
         </div>
         </section>
  )
}

export default observer(HomeContainer)
