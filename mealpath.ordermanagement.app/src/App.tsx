import React, { useEffect } from "react";
import { Header, CreateContainer, MainContainer, Login, Signup, MenuContainer } from "./components";
import { AnimatePresence } from "framer-motion";
import { Route, Routes } from "react-router-dom";
import Products from './components/Admin/ProductList';
import LoginForm from './app/features/Users/LoginForm';
import CategoryDashboard from './app/features/Categories/dashboard/CategoryDashboard';
import TestErrors from './app/features/errors/TestError';
import ServerError from './app/features/errors/ServerError';
import LoadingComponent from './app/layout/LoadingComponent';
import { useStore } from './app/stores/store';
import ModalContainer from './app/common/modals/modalContainer'
import { ToastContainer } from 'react-toastify';
import { Container } from "semantic-ui-react";
import NotFound from "./app/features/errors/NotFound";
import UserDashboard from "./app/features/Users/Dashboard/UserDashboard";
import { observer } from "mobx-react-lite";
import {FoodContainer1} from "./components";
import  Success  from "./components/Success";
import  Cancelled  from "./components/Cancelled";
import RequireAuth from "./components/RequireAuth";
import UnauthorizedComponent from "./components/notAuthorized";

const App = () => {
    const {commonStore, userStore} = useStore();

    useEffect(() => {
        document.title = 'MealPath Pizza';
      if(commonStore.token){
        userStore.getUser().finally(() => commonStore.setAppLoaded());
      }else{
        commonStore.setAppLoaded();
      }
    }, [commonStore, userStore]);

    if(!commonStore.appLoaded) return <LoadingComponent content='Loading app...' />
            
    return (
        <>
        <AnimatePresence /*exitBeforeEnter*/ >
        <ToastContainer position='bottom-right' hideProgressBar />
        <ModalContainer />
            <div className="w-screen h-auto flex flex-col bg-primary">
            <Header />
                <Container style={{marginTop:'7em'}}>
                    <main className="mt-14 md:mt-20 px-4 md:px-16 py-4  w-full">
                        <Routes>



                            {/**Routes accessible Anonymous users */}
                            <Route path="/" element={<MainContainer />} />
                            <Route path="/menu" element={<MenuContainer />} />
                            <Route path='/foodContainer' element={<FoodContainer1/>} />
                            <Route path='/login' Component={LoginForm} />
                            <Route path='/success' element={<Success/>} />
                            <Route path='/cancelled' element={<Cancelled/>} />
                            <Route path='/unauthorized' element={<UnauthorizedComponent />} />

                            <Route path='*' Component={NotFound} />
                            <Route path='/server-error' Component={ServerError} />
                            <Route path='/errors' Component={TestErrors} />

                            {/**Routes accessible authenticated users */}

                            {/**Routes accessible only to SuperAdmin and Admin Role */}
                            <Route element={<RequireAuth allowedRoles={['Admin', 'SuperAdmin']}/>}>
                                <Route path='/categories' Component={CategoryDashboard} />
                                <Route path="/productList" element={<Products />} />
                                <Route path="/createItem" element={<CreateContainer />} />
                            </Route>

                            {/**Routes accessible only to only SuperAdmin Role */}
                            <Route element={<RequireAuth allowedRoles={['SuperAdmin']}/>}>
                                <Route path="/allUsers" Component={UserDashboard} />
                            </Route>
                        </Routes>
                    </main>
                </Container>
            </div>
        </AnimatePresence>
        </>
    );
};


export default observer(App);
