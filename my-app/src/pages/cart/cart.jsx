import React, {useEffect, useState} from "react";
import "./cart.scss"
import {useCartContext} from "../../CartContext";


function Cart({}) {
    const {location, loading, verified, navigate, accountInfo} = useCartContext()

    const [cartItems, setCartItems] = useState([])
    useEffect(()=>{
        if (loading) return;

        if (accountInfo){
            if (accountInfo.cartProducts.length > 0){
                setCartItems(accountInfo.cartProducts)
            }
        }

    }, [location, loading, verified, navigate])



    return (
        <div className="cart G-container">

        </div>
    )
}

export default Cart;