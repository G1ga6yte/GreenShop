import React, {createContext, useContext, useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router";
import axiosInstance from "./axiosInstance";


const CartContext = createContext();

export const CartProvider = ({children}) => {
    axios.defaults.withCredentials = true;

    const navigate = useNavigate();

    //////// Login / Reg - Cont handle //////////////////////////////////
    const [loginCont, setLoginCont] = useState(false);

    /////// Account Info ////////////////////////////////////////////////
    const [accountInfo, setAccountInfo] = useState({logo: null})
    const [verified, setVerified] = useState(false);
    const [loading, setLoading] = useState(true);
    const [cartProducts, setCartProducts] = useState([]);


    const SessionTest  = async () => {
        try {
            const res = await axiosInstance.get("/session");
            console.log(res)
            if (res.data.valid){
                await setVerified(true);
                await setAccountInfo(res.data.userData);
                setCartProducts(res.data.userData.cartProducts);
            }
        } catch (error) {
            setVerified(false)
            if (!error.response?.data?.valid) {
                setLoginCont(true);
            }
        } finally {
            setLoading(false);
        }
    }

    useEffect(()=> {
        console.log(process.env.REACT_APP_BASEURL);
        axiosInstance.get("/session")
            .then(res => {
                if (res.data.valid){
                    setVerified(true);
                    setAccountInfo(res.data.userData);
                    setCartProducts(res.data.userData.cartProducts);
                }
                setLoading(false);
            })
            .catch(err => {
                if (!err.response?.data?.valid) {
                    setLoginCont(true);
                }
                setLoading(false);
            })
    }, [])

    /////////// Login Reg end message ///////////
    const [endMessage, setEndMessage] = useState("Account created successfully!")


    ////////////// Cart /////////////////////////////
    // useEffect(() => {
    //     if (loading) return;
    //
    //     if (accountInfo) {
    //         if (accountInfo.cartProducts){
    //             if (accountInfo.cartProducts.length > 0) {
    //                 setCartProducts(accountInfo.cartProducts)
    //             }
    //         }
    //     }
    //
    // }, [loading, verified])


    ///////////// Log out ////////////////////
    const handleLogOut = async () => {
        try {
            // Send logout request to the server
            await axiosInstance.post('/logout', {}, { withCredentials: true });
            document.cookie = 'connect.sid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
            setAccountInfo({})
            setVerified(false)
            setCartProducts([])
            navigate("/home")
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };


    /////////////////// Home products //////////////////////
    const [products, setProducts] = useState([]);
    const [fetchedIDs, setFetchedIDs] = useState([]);



    /////////////////// Notifications //////////////////////
    const [messageStatus, setMessageStatus] = useState(false)
    const [message, setMessage] = useState("")

    /////////////////// last Route ////////////////////////
    const [lastRoute, setLastRoute] = useState("Home")

    return(<CartContext.Provider value={{
        loginCont, setLoginCont,
        accountInfo, setAccountInfo,
        verified, setVerified,
        SessionTest, loading, setLoading,
        endMessage, setEndMessage,
        cartProducts, setCartProducts,
        handleLogOut,
        messageStatus, setMessageStatus,
        message, setMessage,
        products, setProducts, fetchedIDs, setFetchedIDs,
        lastRoute, setLastRoute
    }}>
        {children}
    </CartContext.Provider> );
};

export const useCartContext = () => {
    return useContext(CartContext);
}
