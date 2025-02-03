import React, {useEffect} from "react";
import "./home.scss"
import HeadBanner from "./headBanner/headBanner";
import ProductsSide from "./productsSide/productsSide";
import Offers from "./offers/offers";
import Blogs from "./blogs/blogs";
import {useCartContext} from "../../CartContext";

function Home (){
    const {setLastRoute} = useCartContext()
    useEffect(()=>{
        setLastRoute("Home")
    }, [])


    return(
        <div className="home G-container">
            <HeadBanner/>
            <ProductsSide/>
            <Offers/>
            <Blogs/>
        </div>
    )
}

export default Home