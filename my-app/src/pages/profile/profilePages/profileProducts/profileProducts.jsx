import React, {useEffect, useState} from 'react';
import {useCartContext} from "../../../../CartContext";
import {useNavigate} from "react-router";
import "./profileProducts.scss"
import {Link} from "react-router-dom";
import axios from "axios";
import NotificationBlock from "../../../../components/notificationBlock/notificationBlock";
import {Status} from "../../../../source/status";
import {GrAppsRounded} from "react-icons/gr";
import {LuAlignEndVertical} from "react-icons/lu";
import ProfileProductGrid from "./profileProductGrid/profileProductGrid";
import ProfileProductLine from "./profileProductLine/profileProductLine";
import Cookies from 'js-cookie';
import axiosInstance from "../../../../axiosInstance";

function ProfileProducts() {
    const {accountInfo, loading, setLoading, messageStatus, setMessageStatus, message, setMessage} = useCartContext()
    const navigate = useNavigate()
    const [products, setProducts] = useState([])
    const [count, setCount] = useState([]);

    //////////// Grid Line Cookie ////////////////
    const [grid, setGrid] = useState(false)


    ////////////// products load ///////////////
    const loadProducts = async () => {
        setLoading(true)
        axiosInstance.get("/products/userProducts", {
            params: {
                userID: accountInfo.userID,
            },
        })
            .then(res => {
                if (res.data.products && res.data.products.length > 0) {
                    let resProducts = res.data.products
                    resProducts.forEach(product => {
                        product.checked = false
                        setCount(prev => [...prev, product.productCount])
                    })
                    setProducts(resProducts)
                }
                setLoading(false)
            })
            .catch(err => {
                setLoading(false)
                console.log(err)
            })
        setLoading(false)

    }
    useEffect(() => {
        if (loading) return;
        if (!accountInfo.admin) {
            navigate("/")
        }

        const gridCookie = Cookies.get('profileProductsGrid');
        if (gridCookie && gridCookie === "grid"){
            setGrid(true)
        } else if (gridCookie && gridCookie === "line") {
            setGrid(false)
        }

        setLoading(true)
        axiosInstance.get("/products/userProducts", {
            params: {
                userID: accountInfo.userID,
            },
        })
            .then(res => {
                if (res.data.products && res.data.products.length > 0) {
                    let resProducts = res.data.products
                    resProducts.forEach(product => {
                        product.checked = false
                        setCount(prev => [...prev, product.productCount])
                    })
                    setProducts(resProducts)
                }
                setLoading(false)
            })
            .catch(err => {
                setLoading(false)
                console.log(err)
            })
        setLoading(false)
        console.log(products)

    }, [accountInfo]);



    //////////// Checked Products //////////////////////
    const [checkedProducts, setCheckedProducts] = useState([])
    const handleCheckProduct = (el, index) => {
        let newProducts = [...products];
        newProducts[index] = {...newProducts[index], checked: !newProducts[index].checked};
        setProducts(newProducts);

        const updatedCheckedProducts = newProducts[index].checked
            ? [...checkedProducts, newProducts[index]] // Add the product
            : checkedProducts.filter((product) => product.productID !== newProducts[index].productID); // Remove by matching the ID

        setCheckedProducts(updatedCheckedProducts);
    };
    ///////////////// Delete /////////////////////////////////


    const [modalVisible, setModalVisible] = useState(false);
    const [deleteItem, setDeleteItem] = useState(null);
    const handleDeleteProducts = () => {
        const formData = new FormData();
        formData.append("userID", accountInfo.userID);

        if (deleteItem) {
            formData.append("productsIDs[]", deleteItem.productID); // Append a single product ID
        } else if (checkedProducts.length > 0) {
            // Extract and append product IDs from the checkedProducts array
            checkedProducts.forEach(product => {
                formData.append("productsIDs[]", product.productID); // Ensure only the ID is appended
            });
        }

        axiosInstance.post("/products/deleteProducts", formData)
            .then(res => {
                const status = res.data.status
                if (status === 28 || status === 29) {
                    setMessageStatus(prev => !prev)
                    setMessage(Status[status])
                    loadProducts()
                    setModalVisible(false);
                    setDeleteItem(null)
                    setCheckedProducts([])
                } else {
                    console.log(res.data)
                }
            })
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <div className="profileProducts">

            <div className="mainButton">
                <Link to="/profile/products/new" className="addProductBtn box-shadow">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5V11H5C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13H11V19C11 19.5523 11.4477 20 12 20C12.5523 20 13 19.5523 13 19V13H19C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11H13V5Z"
                            fill="#46A358"/>
                    </svg>
                </Link>

            </div>

            <div className="searchCont">
                <input type="text" placeholder="Search..." className={`searchInput`}/>

                <button onClick={() => {
                    setGrid(true)
                    Cookies.set("profileProductsGrid", "grid", { expires: 7 })
                }} className={`gridBtn ${grid ? "activeGrid" : ""}`}><GrAppsRounded stroke={"#3D3D3D"}
                                                                                    className="gridIcon"/></button>
                <button onClick={() => {
                    setGrid(false)
                    Cookies.set("profileProductsGrid", "line", { expires: 7 })
                }} className={`gridBtn ${grid ? "" : "activeGrid"}`}><LuAlignEndVertical stroke={"#3D3D3D"}
                                                                                         className="gridIcon"/></button>
                <button onClick={() => {
                    setDeleteItem(null)
                    setModalVisible(true)
                }} disabled={checkedProducts.length === 0} className="deleteBtn">Delete Items
                </button>
            </div>

            {modalVisible &&
                <div className="modalCont">
                    <div onClick={() => setModalVisible(false)} className="backgroundBlock"></div>
                    <div className="modalBlock">
                        <p className="prg">Are you sure you want to continue delete this products? </p>
                        <p className="boldPrg">({deleteItem ? deleteItem.productName : checkedProducts.map((el, index) => {
                            return (<span
                                key={index}>{el.productName}{checkedProducts.length - 1 !== index ? "," : ""} </span>)
                        })})</p>

                        <div className="buttonsCont">
                            <button onClick={handleDeleteProducts} className="deleteBtn">Delete</button>
                            <button onClick={() => setModalVisible(false)} className="cancelBtn">Cancel</button>
                        </div>
                    </div>
                </div>
            }



            <div className="productsContainer">
                {grid ?
                    products.map((el, index)=>{
                        return (
                            <ProfileProductGrid
                                el={el}
                                index={index}
                                setCount={setCount}
                                setProducts={setProducts}
                                count={count}
                                setDeleteItem={setDeleteItem}
                                setModalVisible={setModalVisible}
                                handleCheckProduct={handleCheckProduct}
                                products={products}
                            />
                        )
                    })
                    :
                    products.map((el, index)=>{
                        return(
                            <ProfileProductLine
                                el={el}
                                index={index}
                                handleCheckProduct={handleCheckProduct}
                                setCount={setCount}
                                count={count}
                                setProducts={setProducts}
                                setDeleteItem={setDeleteItem}
                                setModalVisible={setModalVisible}
                            />
                        )
                    })
                }
            </div>





        </div>
    )
}

export default ProfileProducts;