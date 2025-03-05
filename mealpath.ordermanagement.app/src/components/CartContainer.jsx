import React, { useEffect } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { motion } from "framer-motion";
import { RiRefreshFill } from "react-icons/ri";
import Pizzapng from "../img/pizza.png";
import { BiMinus, BiPlus } from "react-icons/bi";
import { useState } from "react";
import { useStore } from "../app/stores/store";
import { observer } from "mobx-react-lite";
import CartItemsList from "./CartItemsList";
import { Button, Message, MessageContent, MessageItem } from "semantic-ui-react";
import { toJS } from "mobx";
import LoadingComponent from "../app/layout/LoadingComponent";

const CartContainer = () => {
  const [showCart, setShowCart] = useState(true);
  const {cartStore, userStore} = useStore();

  const handleClearCart = () => {
    cartStore.clearCart();
  };

  const handleCartClose = () => {
    setShowCart(false);
  };
  const calculateTotalPrice = () => {
    return cartStore.products.reduce((total, product,) => total + product.price * product.quantity, 0);
  };

  return (
    <div>
      {showCart && (
        <motion.div
          initial={{ opacity: 0, x: 200 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 200 }}
          className="fixed top-0 right-0 w-full md:w-375 h-screen bg-white drop-shadow-md flex flex-col z-[101]"
        >
          <div
            className={`w-full flex items-center justify-between p-4 cursor-pointer cartContainer ${
              showCart ? "open" : ""
            }`}
          >
            <motion.div whileTap={{ scale: 0.75 }}>
              <MdOutlineKeyboardBackspace
                className="text-textColor text-3xl"
                onClick={handleCartClose}
              />
            </motion.div>
            <p className="text-textColor text-lg font-semibold">Cart</p>
            <motion.p
              whileTap={{ scale: 0.75 }}
              className="flex items-center gap-2 p-1 px-2 my-2 bg-gray-100 rounded-md hover:shadow-md  cursor-pointer text-textColor text-base"
              onClick={handleClearCart}
            >
              Clear <RiRefreshFill />{" "}
            </motion.p>
          </div>
          {/* bottom - pjesa poshte */}
          <div className="w-full h-full bg-cartBg rounded-t-[2rem] flex flex-col ">
            {/* Cart Items section */}
            {cartStore.loading ? (
              <LoadingComponent />
            ): (
              <div className="w-full h-340 md:h-42 px-6 py-10 flex flex-col gap-3 overflow-y-scroll scrollbar-none ">
              {toJS(cartStore.products).length == 0 ? 
                (
                  <Message color='black'>Cart is empty</Message>
                ):(
                <CartItemsList products={cartStore.products}/>
                )
              }
              </div>
            )}

            {/* Total Section */}
            <div className="w-full flex-1 bg-cartTotal rounded-t-[2rem] flex flex-col items-center justify-evenly px-8 py-2 ">
              <div className="w-full flex items-center justify-between">
                <p className="text-gray-400 text-lg">Sub Total</p>
                <p className="text-gray-400 text-lg">${calculateTotalPrice().toFixed(2)}</p>
              </div>
              {/* <div className="w-full flex items-center justify-between">
                <p className="text-gray-400 text-lg">Delivery</p>
                <p className="text-gray-400 text-lg">$ 0.00</p>
              </div> */}

              <div className="w-full border-b border-gray-600 my-2 "></div>

              <div className="w-full flex items-center justify-between ">
                <p className=" text-gray-200 text-xl font-semibold">Total</p>
                <p className=" text-gray-200 text-xl font-semibold">${calculateTotalPrice().toFixed(2)}</p>
              </div>

              {!userStore.isLoggedIn ? (
                <>
                <motion.button
                  whileTap={{ scale: 0.8 }}
                  type="button"
                  className="w-full p-2 rounded-full bg-green-600 text-gray-50 text-lg my-2
                    hover:shadow-lg"
                    onClick={()=>window.location.href = '/login'}
                >
                  Login
                </motion.button>
                
                </>
              ) : 
              (
                <>
                <>
                  <motion.button
                    whileTap={{ scale: 0.8 }}
                    type="button"
                    className="w-full p-2 rounded-full bg-green-600 text-gray-50 text-lg my-2
                      hover:shadow-lg"
                      onClick={cartStore.checkout}
                      disabled = {toJS(cartStore.products).length == 0? true: false}
                  >
                    Check out
                  </motion.button>
                </>
                </>
              )
              }
              
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default observer(CartContainer);
