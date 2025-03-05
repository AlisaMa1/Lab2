import React, { useEffect } from "react";
import { Product } from "../app/models/Product";
import { useStore } from "../app/stores/store";
import { motion } from "framer-motion";
import { BiMinus, BiPlus } from "react-icons/bi";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";

interface Props{
    products: Product[];
}

export default observer(function CartItemsList({products}: Props){
    const {cartStore} = useStore();
    var productsArr = toJS(products);

    {/* Qetu hin Cart Item */}
    return (
      <>
        {productsArr.map((item, index) => (
          <div key={index} className="w-full p-1 px-2 rounded-lg bg-cartItem flex items-center gap-2 ">
            <>
              <img
                src={item.imageUrl}
                alt=""
                className="w-20 h-20 max-w-[60px] rounded-full object-contain "
              />

              {/* emri */}
              <div className="flex flex-col gap-2 ">
                <p className="text-base text-gray-50">{item.title}</p>
                <p className="text-sm block text-gray-300 font-semibold">
                  ${item.price}
                </p>
              </div>

              {/* button section */}
              <div className="group flex items-center gap-2 ml-auto cursor-auto">
                <motion.div whileTap={{ scale: 0.75 }}>
                  <BiMinus onClick={() => cartStore.decrementtItemQuantity(item.productID)} className="text-gray-50" />
                </motion.div>
                <p className="w-5 h-5 rounded-sm bg-cartBg text-green-50 flex items-center justify-center">
                  {item.quantity}
                </p>
                <motion.div whileTap={{ scale: 0.75 }}>
                  <BiPlus onClick={() => cartStore.incrementItemQuantity(item.productID)} className="text-gray-50" />
                </motion.div>
              </div>
            </>
          </div>
        ))}
      </>
    );
})