import React, {useState} from 'react';
import "./profileProductGrid.scss"
import ReactCardFlip from "react-card-flip";
import {FaCheck, FaMinus, FaPlus, FaStar} from "react-icons/fa6";
import {FaEdit} from "react-icons/fa";
import {MdOutlineDeleteSweep, MdOutlineIosShare} from "react-icons/md";
import {Link} from "react-router-dom";
import axios from "axios";
import loadingIcon from '../loading.svg'
import axiosInstance from "../../../../../axiosInstance";


function ProfileProductGrid({
                                el,
                                index,
                                setCount,
                                setDeleteItem,
                                setProducts,
                                setModalVisible,
                                count,
                                handleCheckProduct
                            }) {
    const [flip, setFlip] = useState(false)
    const [activeImage, setActiveImage] = useState(0)
    const [productLoading, setProductLoading] = useState(false)

    const starsRender = (el) => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(
                <FaStar className="starIcon" fill={Number(el.productRate) <= i ? "#C4C4C4" : "#FFAC0C"}/>
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
                    console.log(updatedProduct);

                    setProducts(prevProducts => {
                        return prevProducts.map(product => {
                            // Deep copy product to avoid shared references
                            return product.productName === updatedProduct.productName
                                ? { ...updatedProduct } // Replace the updated product
                                : { ...product };       // Copy existing products
                        });
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
        <div  className="profileProductGrid">

            {productLoading &&
                <div className="loadingBlock">
                    <img src={loadingIcon} className="loadingIcon" alt=""/>
                </div>
            }

            <div onMouseOver={() => setFlip(true)} onMouseLeave={() => setFlip(false)}>
                <ReactCardFlip containerClassName={"cardCont"} flipDirection={"horizontal"} isFlipped={flip}>
                    <div onMouseOver={() => setFlip(true)} onMouseLeave={() => setFlip(false)} className="cardSide faceSide box-shadow">
                        {el.images[activeImage] && <img className="img" src={el.images[activeImage]} alt=""/>}

                        <div className="textBlock">
                            {el.productName && <p className="productName">{el.productName}</p>}

                            <div className="priceLine">
                                {el.productPrice && <p className="price">${el.productPrice}.00</p>}
                                <div className="starsCont">{starsRender(el)}</div>
                            </div>

                            <p className="sku">Category: <span>{el.productCategory}</span></p>

                        </div>


                    </div>

                    <div className="cardSide backSide box-shadow">

                        <div>
                            {el.productName && <p className="productName"><Link to={`/product/${el.productID}`} className="nameLink">{el.productName}</Link></p>}

                            <span className="descName">Short Description</span>

                            {el.productShortDesc && <p className="productDescription">{el.productShortDesc}</p>}

                            {el.productSKU && <p className="sku">SKU: <span>{el.productSKU}</span></p>}

                            <div className="sizes">
                                {el.productSizes.map((size, index2) => {
                                    return (
                                        <div className="size" key={index2}><span>{size}</span></div>
                                    )
                                })}
                            </div>


                        </div>

                        <div>

                            <div className="buttonsCont">
                                <div className="countCont">
                                    <form className="countCont"  onSubmit={(e) => {
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


                                <div className="checkboxLinkCont">
                                    <div onClick={() => handleCheckProduct(el, index)}
                                         className={`checkbox ${el.checked ? "checked" : ""}`}>
                                        <FaCheck fill="white"/>
                                    </div>

                                    <Link to={`/product/${el.productID}`} className="linkBtn">
                                        <MdOutlineIosShare className="linkIcon"/>
                                    </Link>
                                </div>

                            </div>

                        </div>

                    </div>
                </ReactCardFlip>

            </div>


        </div>
    )
}

export default ProfileProductGrid;