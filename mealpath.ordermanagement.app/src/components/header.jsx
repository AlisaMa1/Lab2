import React, { useState } from 'react'
import {MdOutlineShoppingCart,MdAdd,MdLogout} from 'react-icons/md'
import {color, motion} from "framer-motion";
import Avatar from '../img/avatar.png';
import { Link } from 'react-router-dom';
import CartContainer from './CartContainer';
import { useStore } from '../app/stores/store';
import { Button } from 'semantic-ui-react';
import LoginForm from '../app/features/Users/LoginForm';
import RegisterForm from '../app/features/Users/RegisterForm';
import { observer } from "mobx-react-lite";
import { Dropdown }from 'semantic-ui-react';
import { toJS } from 'mobx';
export default observer(function Header() {
  const[isMenu,setIsMenu] = useState(false);
  const[showCart, setShowCart] = useState(false);
  const {userStore, modalStore, cartStore} = useStore();
  const {userStore: {logout}} = useStore();


  
  const handleCartButtonClick = () => {
    setShowCart(!showCart);
  };
  
  //const {cartStore} = useStore();

  let adminOptions = [
    { key: 'option1', text: 'products', value: '/productlist' },
    { key: 'option2', text: 'categories', value: '/categories' },
  ];

  let userRoles = [];
  
  const renderLinkBasedOnRole = () => {
    if(userRoles.find(role => role == 'SuperAdmin')){
      adminOptions.push({ key: 'option3', text: 'users', value: '/allusers' });
    }
  }

  if(userStore.isLoggedIn){
    userRoles = userStore.getCurrentUserRoles(userStore.user);
    renderLinkBasedOnRole()
  }

  

  const handleDropdownChange = (e, { value }) => {
    window.location.href = value
  };

  return (
    <header className="fixed z-50 w-screen p-3 px-4 md:p-6 md:px-16 bg-primary"> 
        {/* qit div e kena veq per desktop edhe tablet */}
        <div className="hidden md:flex w-full h-full item-center justify-between">

            <Link to={'/'} className="flex items-center gap-2">
                <h2 className="textHeading-Color text-xl">Meal<span className="textHeading-Color text-xl font-bold text-green-600">Path</span></h2>

            </Link>
             

           <div className="flex items-center gap-8">
           <motion.ul initial={{opacity: 0,x: 200}}
           animate={{opacity: 1,x: 0}}
           exit={{opacity: 0,x: 200}}
           className="flex items-center gap-8  ">
              <Link to={'/Menu'}> <motion.li whileTap={{scale: 0.9}} className="text-base text-textColor hover:text-headingColor duration-100
              transition-all ease-in-out cursor-pointer">Menu</motion.li></Link>
              <Link to={'/'}><motion.li whileTap={{scale: 0.9}} className="text-base text-textColor hover:text-headingColor duration-100
              transition-all ease-in-out cursor-pointer">Home</motion.li></Link>
              {userRoles.find(role => ['Admin', 'SuperAdmin'].includes(role)) && 
                <Dropdown text='Manage' 
                  options={adminOptions}  
                  onChange={handleDropdownChange}
                />
              }
             </motion.ul>

             <div  className="relative flex items-center justify-center" >
                
                  <MdOutlineShoppingCart  className="text-textColor text-2xl cursor-pointer" onClick={handleCartButtonClick} />
                
                <div className="absolute -top-2  -right-2 w-4 h-4 rounded-full bg-cartNumBg flex items-center justify-center">
                  <p className="text-xs text-white font-semibold">{cartStore.products.length}</p>
                  {showCart && <CartContainer />}
                </div>
             </div>
            {userStore.isLoggedIn ? (
              <>
             <div className='relative'>
             <motion.img whileTap={{scale: 0.6}} src={Avatar} className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl" alt="userprofile" onClick={() => setIsMenu(true)}/>

             {
                isMenu && (
                  <motion.div initial={{opacity: 0, scale: 0.6}}
                  animate={{opacity: 1, scale: 1}}
                  exit={{opacity: 0, scale: 0.6}}
                  className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0">
                  {/* {user && user.email === "admin@gmail.com" && ( */}
                 {/* <Link to={"/createItem"}>
                      <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100
                      transition-all duration-100 ease-out text-textColor text-base " onClick={() => setIsMenu(false)}>New Item<MdAdd/></p>
                 </Link> */}
                  {/* )} */}
                
                  <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100
                  transition-all duration-100 ease-out text-textColor text-base " onClick={logout}>Logout<MdLogout/></p>
               </motion.div> 
                ) 
             }
             
           </div>
           </>
           )
           : (
            <>
              <Button onClick={() => modalStore.openModal(<LoginForm />)} to='/login' color='green' inverted>
                Login
              </Button>
              <Button onClick={() => modalStore.openModal(<RegisterForm />)} to='/register' color='green'>
                Register
              </Button>
            </>
           )}
           </div>
         
        </div>
        

       { /* qit div e kom bo per mobile size
        <div className="flex items-center justify-between md:hidden w-full h-full">
        <Link to={'/'} className="flex items-center gap-2">
                <h2 className="textHeading-Color text-xl">Meal<span className="textHeading-Color text-xl font-bold">Path</span></h2>

            </Link>

              <div className='relative'>
               {user && user.email === "vetrivel.galaxy@gmail.com" && (
                <Link to={"/createItem"}>
                  <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base">
                    New Item <MdAdd />
                  </p>
                </Link>
              )} 

              <ul className="flex flex-col ">
                <li
                  className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2"
                  onClick={() => setIsMenu(false)}
                >
                  Home
                </li>
                <li
                  className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2"
                  onClick={() => setIsMenu(false)}
                >
                  Menu
                </li>
                <li
                  className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2"
                  onClick={() => setIsMenu(false)}
                >
                  About Us
                </li>
                <li
                  className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2"
                  onClick={() => setIsMenu(false)}
                >
                  Service
                </li>
              </ul>

              <p
                className="m-2 p-2 rounded-md shadow-md flex items-center justify-center bg-gray-200 gap-3 cursor-pointer hover:bg-gray-300 transition-all duration-100 ease-in-out text-textColor text-base"
                onClick={logout}
              >
                Logout <MdLogout />
              </p>
            </motion.div>
          )}
        </div>

        </div>
        */}
  
    </header>
  )
})
