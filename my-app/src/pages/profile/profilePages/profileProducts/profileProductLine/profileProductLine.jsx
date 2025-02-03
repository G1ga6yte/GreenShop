import React, {useState} from 'react';
import "./profileProductLine.scss"
import {FaCheck, FaMinus, FaPlus, FaStar} from "react-icons/fa6";
import {FaEdit} from "react-icons/fa";
import {MdOutlineDeleteSweep} from "react-icons/md";
import {Link} from "react-router-dom";
import axios from "axios";
import axiosInstance from "../../../../../axiosInstance";



function ProfileProductLine({el, index, setProducts, setCount, count, setDeleteItem, setModalVisible, handleCheckProduct}) {
    const [productLoading, setProductLoading] = useState(false)


    ///////// Product Stars /////////////////
    const starsRender = (el) => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(
                <FaStar className="starIcon" fill={el.productRate <= i ? "#C4C4C4" : "#FFAC0C"}/>
            );
        }
        return stars;
    }


    /////////////// Product Count ///////////////////
    const handleChangeCount = (el, newCount) => {
        setProductLoading(true)
        setTimeout(async ()=>{
            axiosInstance.post("/products/productCount", {
                productID: el.productID,
                newCount
            })
                .then(res => {
                    const updatedProduct = res.data.product; // The new product data

                    setProducts(prevProducts => {
                        return prevProducts.map(product =>
                            product.productID === updatedProduct.productID
                                ? updatedProduct
                                : product
                        );
                    });
                })
                .catch(err => {
                    console.log(err)
                })
                .finally(()=>{
                    setProductLoading(false)
                })
        }, 500)
    }

    return (
        <div key={index} className="profileProductLine box-shadow">
            {el.images[0] && <img src={el.images[0]} className="productImg" alt=""/>}

            <div className="infoCont">
                <p className="name"><Link className="nameLink" to={`/product/${el.productID}`}>{el.productName}</Link></p>
                <p className="sku">SKU: <span>{el.productSKU}</span></p>
                <p className="sku">Category: <span>{el.productCategory}</span></p>
            </div>


            <div className="infoCont">
                <p className="sku">Price: <span>${el.productPrice}.00</span></p>
                <div className="sizes">
                    {el.productSizes.map((size, index2) => {
                        return (
                            <div className="size" key={index2}><span>{size}</span></div>
                        )
                    })}
                </div>

                <div className="stars">
                    {starsRender(el)}
                </div>
            </div>

            <div className="tagsCont">
                {el.productTags.map((tag, index) => {
                    return (
                        <div className="tag" key={index}>#{tag}</div>
                    )
                })}
            </div>

            <div className="countCont">
                <form className="countCont" onSubmit={(e) => {
                    e.preventDefault()
                    handleChangeCount(el, count[index])
                }}>

                    {/*maybe error here*/}
                    <div className="countBlock">
                        <button
                            onClick={() => {
                                setCount((prev) => {
                                    const newCount = [...prev]; // Create a copy of the previous count array
                                    newCount[index] = Math.max(0, newCount[index] - 1); // Decrease count but ensure it doesn't go below 0
                                    return newCount;
                                });
                            }}
                            type={"button"}
                            className="minusBtn"
                        >
                            <FaMinus className="plusMinusIcon" fill="#46A358"/>
                        </button>
                        <input
                            value={count[index]}
                            onChange={(e) => {
                                setCount((prev) => {
                                    const newCount = [...prev];
                                    newCount[index] = Math.max(0, Number(e.target.value)); // Ensure count is not negative
                                    return newCount;
                                });
                            }}
                            type="number"
                            className="countInput"
                        />
                        <button
                            onClick={() => {
                                setCount((prev) => {
                                    const newCount = [...prev]; // Create a copy of the previous count array
                                    newCount[index] += 1; // Increase count
                                    return newCount;
                                });
                            }}
                            type={"button"}
                            className="plusBtn"
                        >
                            <FaPlus className="plusMinusIcon" fill="#46A358"/>
                        </button>
                    </div>


                    <button className="saveBtn" disabled={el.productCount === count[index]}
                            type="submit"><FaCheck className="checkIcon" fill="#46A358"/></button>

                    <div className="productButtons">
                        <button type="button" className="productBtn yellowBtn">
                            <FaEdit className="editDeleteIcon" fill="goldenrod"/>
                        </button>
                        <button onClick={() => {
                            setDeleteItem(el)
                            setModalVisible(true)
                        }} type="button" className="productBtn redBtn">
                            <MdOutlineDeleteSweep className="deleteIcon editDeleteIcon" fill="#ff3535"/>
                        </button>
                    </div>
                </form>

            </div>

            <div onClick={() => handleCheckProduct(el, index)}
                 className={`checkbox ${el.checked ? "checked" : ""}`}>
                <FaCheck fill="white"/>
            </div>


        </div>
    )
}

export default ProfileProductLine;