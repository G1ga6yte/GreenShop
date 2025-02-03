import React, {useEffect, useState} from "react";
import "./products.scss";
import {Images} from "./images/images.js"
import {Data} from "../../../../data.js"
import ProductCard from "./productCard/productCard.jsx";
import axios from "axios";
import loadingIcon from "./loading.svg"
import {useCartContext} from "../../../../CartContext";
import NotificationBlock from "../../../../components/notificationBlock/notificationBlock";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import axiosInstance from "../../../../axiosInstance";

function Products({menu, setMenu, tabletView}) {
    const {cartProducts, products, setProducts, fetchedIDs, setFetchedIDs} = useCartContext()
    const sortTypes = [
        "All Plants", "New Arrivals", "Sale"
    ]
    const menuSortTypes = [
        "Sort Type 1", "Sort Type 2", "Sort Type 3", "Sort Type 4", "Sort Type 5",
    ]
    const [sort, setSort] = useState("All Plants")

    const [menuToggle, setMenuToggle] = useState(false)
    const [activeMenuSort, setActiveMenuSort] = useState("Default sorting")

    /////////// Products ///////////////////////////////
    const [loading, setLoading] = useState(false)

    const fetchMoreProducts = async () => {
        setLoading(true)
        setTimeout(async () => {
            try {
                const response = await axiosInstance.get(`/products/productsHome`, {
                    params: {
                        exclude: fetchedIDs, // Send already fetched product IDs
                    },
                });

                const newProducts = response.data.products;

                setFetchedIDs([...fetchedIDs, ...newProducts.map((p) => p.productID)]);
                setProducts([...products, ...newProducts]);

            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false)
            }
        }, 1000)
    };

    useEffect(() => {
        if (products.length === 0){
            fetchMoreProducts(); // Initial fetch
        }
    }, []);


    //////////// Notification ////////////////////
    const [messageStatus, setMessageStatus] = useState(false)
    const [message, setMessage] = useState("")


    return (
        <div className="products">

            <NotificationBlock
                status={messageStatus}
                setStatus={setMessageStatus}
                message={message}
            />

            <div className="sortBlock">
                <div className="sorts G-flex">
                    {tabletView &&
                        <button onClick={()=>setMenu(true)} className="sortMenuBtn">
                            <HiOutlineMenuAlt1 className="menuIcon" stroke={"#46A358"}/>
                        </button>
                    }


                    {sortTypes.map((el, index) => {
                        return (
                            <div onClick={() => {
                                setSort(el)
                            }} key={index} className={`sortItem ${sort === el ? "activeSortItem" : ""}`}>
                                {el}
                            </div>
                        )
                    })}
                </div>


                <div className="shorts">
                    <span>Short by: </span>
                    <button onClick={() => {
                        setMenuToggle(prev => !prev)
                    }} className="menuBtn">
                        <span>{activeMenuSort}</span>
                        <img className={`arrowImg ${menuToggle ? "activeArrow" : ""}`} src={Images.arrowDownSVG}
                             alt=""/>
                        {menuToggle &&
                            <div className="sortMenuBlock">
                                {menuSortTypes.map((el, index) => {
                                    return (
                                        <button onClick={() => {
                                            setActiveMenuSort(el)
                                        }} key={index} className="menuSortItem">
                                            {el}
                                        </button>
                                    )
                                })}
                            </div>
                        }
                    </button>
                </div>
            </div>

            <div className="productList">
                {products.length > 0 ? products.map((el, index) => {
                    return (
                        <ProductCard
                            setMessageStatus={setMessageStatus}
                            setMessage={setMessage}
                            productInfo={el}
                            key={index}
                            addedInCart={cartProducts.includes(el.productID)}
                        />
                    )
                }) : ""}

            </div>

            {loading ?
                <div className="loadingBtnCont">
                    <img src={loadingIcon} alt=""/>
                </div>
                :
                <div className="loadingBtnCont">
                    <button onClick={fetchMoreProducts} className="loadBtn box-shadow">
                        Show more
                    </button>
                </div>
            }

        </div>
    )
}

export default Products