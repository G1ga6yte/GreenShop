import React, {useEffect, useState} from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import './App.scss';
import Navbar from './components/navbar/navbar';
import Footer from './components/footer/footer';
import Authentication from "./pages/authentication/Authentication";
import {useCartContext} from "./CartContext";
import LoadingFullPage from "./components/loadingFullPage/loadingFullPage";
import ProfileProducts from "./pages/profile/profilePages/profileProducts/profileProducts";
import ProfileAddNewProduct
    from "./pages/profile/profilePages/profileProducts/profileAddNewProduct/profileAddNewProduct";
import ProfileDetails from "./pages/profile/profilePages/profileDetails/profileDetails";
import Profile from "./pages/profile/profile";
import Home from './pages/home/home';
import Cart from "./pages/cart/cart";
import NotificationBlock from "./components/notificationBlock/notificationBlock";
import Product from "./pages/product/product";
import ProfileAddress from "./pages/profile/profilePages/profileAddress/profileAddress";

function App() {
    const {verified, loading, messageStatus, setMessageStatus, message, setMessage} = useCartContext()
    const location = useLocation();

    useEffect(()=>{
        window.scrollTo(0,0);
    }, [location])

  return (
    <div className={`App`}>
        {loading && <LoadingFullPage/>}

      <Navbar />

        <Authentication/>

        <NotificationBlock
            status={messageStatus}
            setStatus={setMessageStatus}
            message={message}
        />

        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/cart" element={<Cart/>}/>
            <Route path={`/product/:id`} element={<Product/>}/>


            <Route path="/profile" element={<Profile/>} >
                <Route path="/profile/" element={<ProfileDetails/>}/>
                <Route path="/profile/details" element={<ProfileDetails/>}/>
                <Route path="/profile/products" element={<ProfileProducts/>}/>
                <Route path="/profile/products/new" element={<ProfileAddNewProduct/>}/>
                <Route path="/profile/address" element={<ProfileAddress/>}/>

            </Route>
        </Routes>

      <Footer/>


    </div>
  );
}

export default App;
