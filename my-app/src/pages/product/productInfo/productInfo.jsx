import React, {useEffect, useState} from 'react';
import "./productInfo.scss"
import {useCartContext} from "../../../CartContext";
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import {FaStar, FaMinus, FaPlus } from "react-icons/fa6";
import {IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import { FaFacebookF, FaTwitter, FaLinkedinIn   } from "react-icons/fa";
import { BiLike, BiSolidLike  } from "react-icons/bi";
import axiosInstance from "../../../axiosInstance";

function ProductInfo() {
    const {lastRoute} = useCartContext()

    const {id} = useParams();
    const {accountInfo} = useCartContext()
    const [itemInfo, setItemInfo] = useState({})
    const [companyInfo, setCompanyInfo] = useState({})

    const [loading, setLoading] = useState(false);
    const [activeDesc, setActiveDesc] = useState(true)


    const [activeImg, setActiveImg] = useState(null);
    const [activeSize, setActiveSize] = useState(null);
    const [countValue, setCountValue] = useState(1);
    const [imgLoading, setImgLoading] = useState(false);

    useEffect(() => {
        setLoading(true)
        console.log(Date.now())

        if (id) {
            axiosInstance.get(`/products/getProduct`, {
                params: {
                    productID: id
                },
            })
                .then(res => {
                    if (res.data.productInfo) {
                        setItemInfo(res.data.productInfo)
                        if (res.data.companyInfo) {
                            setCompanyInfo(res.data.companyInfo)
                        }
                        //////////// Def values /////////////////////
                        setActiveImg(res.data.productInfo.images[0])
                        setActiveSize(res.data.productInfo.productSizes[0])
                    } else {
                        console.log(res.data)
                    }
                })
                .catch(err => {
                    console.log(err)
                })
                .finally(() => {
                    setLoading(false)
                })
        }

    }, [id])

    const starsRender = (rates) => {

        if (rates) {
            if (rates.length === 0) {
                const stars = [];
                for (let i = 0; i < 5; i++) {
                    stars.push(
                        <FaStar key={i} className="starIcon" fill={"#FFAC0C"}/>
                    );
                }
                return stars;
            } else {
                let rate = 0
                rates.forEach((el) => {
                    rate = rate + el.rate
                })

                const stars = [];
                for (let i = 0; i < 5; i++) {
                    stars.push(
                        <FaStar key={i} className="starIcon"
                                fill={Number(Math.round(rate / rates.length)) <= i ? "#C4C4C4" : "#FFAC0C"}/>
                    );
                }
                return stars;

            }
        } else {
            const stars = [];
            for (let i = 0; i < 5; i++) {
                stars.push(
                    <FaStar key={i} className="starIcon" fill={"#FFAC0C"}/>
                );
            }
            return stars;
        }

    }
    const starsRenderByRate = (rate) => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(
                <FaStar className="starIcon" fill={Number(rate) <= i ? "#C4C4C4" : "#FFAC0C"}/>
            );
        }
        return stars;
    }
    const rateRender = (rates) => {
        let rate = 0
        rates.forEach((el) => {
            rate = rate + el.rate
        })
        return Math.round((rate/rates.length) *10)/10
    }

    return (
        <div className="productInfo">
            <div className="routePrg">
                <Link to={`/${lastRoute.toLowerCase()}`}
                      className="boldText">{lastRoute}</Link> / {itemInfo.productName}
            </div>

            <div className="itemMainCont">
                <div className="imagesContainer">
                    <div className="images">
                        {itemInfo.images && itemInfo.images.map((img, index) => {
                            return <img onClick={() => {
                                setImgLoading(true)
                                setActiveImg(img)
                                setTimeout(() => {
                                    setImgLoading(false)
                                }, 500)
                            }} className={`smallImg ${img === activeImg && "activeSmallImg"} `} key={index} src={img}
                                        alt=""/>
                        })}
                    </div>

                    <img src={activeImg} className={`mainImg ${imgLoading && "imgLoading"}`} alt=""/>


                </div>

                <div className="itemInfoContainer">
                    <p className="name">{itemInfo.productName}</p>

                    <div className="priceBlock">
                        <p className="price">${itemInfo.productPrice}.00</p>

                        <div className="starsLine">
                            {starsRender(itemInfo.productRate)}
                            <span>
                                {itemInfo.productRate && itemInfo.productRate.length > 0 &&
                                    `${itemInfo.productRate.length} Customer Review`
                                }
                            </span>
                        </div>

                    </div>

                    <div className="miniHeader">Short Description:</div>
                    <p className="descPrg">{itemInfo.productShortDesc}</p>

                    <div className="miniHeader">Size:</div>
                    <div className="sizesCont">
                        {itemInfo.productSizes && itemInfo.productSizes.map((size, index) => {
                            return (
                                <div onClick={() => setActiveSize(size)} key={index}
                                     className={`size ${size === activeSize && "activeSize"}`}>
                                    <span>{size}</span>
                                </div>
                            )
                        })}
                    </div>

                    <div className="buttonsBlock">
                        <div className={"countBlock"}>
                            <button onClick={() => countValue > 1 && setCountValue(prev => Number(prev) - 1)}
                                    className="countBtn">
                                <FaMinus fill={"white"} className="btnIcon"/>
                            </button>
                            <input className="countInput" value={countValue} onChange={(e) => {
                                if (e.target.value < 0) {
                                    setCountValue(0)
                                } else {
                                    setCountValue(e.target.value)
                                }
                            }} type="number"/>
                            <button onClick={() => setCountValue(prev => Number(prev) + 1)} className="countBtn">
                                <FaPlus fill={"white"} className="btnIcon"/>
                            </button>
                        </div>

                        <button className="buyBtn">
                            BUY NOW
                        </button>

                        <button className="cartBtn">
                            ADD TO CART
                        </button>

                        <button className="saveBtn">
                            <IoIosHeartEmpty fill={"#46A358"} className="btnIcon"/>
                        </button>

                    </div>

                    <div className="infoLine">SKU: <span>{itemInfo.productSKU}</span></div>
                    <div className="infoLine">Categories: <span>{itemInfo.productCategory}</span></div>
                    <div className="infoLine">Tags: {itemInfo.productTags && itemInfo.productTags.map((tag, index)=>{
                        return(
                            <span key={index} className="productTag">{String(tag).charAt(0).toUpperCase() + String(tag).slice(1)}{index+1 < itemInfo.productTags.length && ", "}</span>
                        )
                    })}</div>

                    <div className="endLine">
                        <p className="miniHeader">Share this products:</p>

                        <button className="webIconBtn"><FaFacebookF fill={"#3D3D3D"}/></button>
                        <button className="webIconBtn"><FaTwitter fill={"#3D3D3D"}/></button>
                        <button className="webIconBtn"><FaLinkedinIn fill={"#3D3D3D"}/></button>

                    </div>
                </div>
            </div>

            <div className="itemDescCont">

                <div className="buttonsCont">
                    <button onClick={()=>setActiveDesc(true)} className={`descBtn ${activeDesc && "activeBtn"}`}>Product Description</button>
                    {itemInfo.productRate && itemInfo.productRate.length > 0 &&
                        <button onClick={()=>setActiveDesc(false)} className={`descBtn ${!activeDesc && "activeBtn"}`}>Reviews ({itemInfo.productRate.length})</button>
                    }
                </div>

                {activeDesc &&
                    <div className="descCont">
                        <p className="descPrg">{itemInfo.productDescription}</p>

                        {itemInfo.productAltDesc && itemInfo.productAltDesc.length > 0 && itemInfo.productAltDesc.map((el)=>{
                            return(
                                <div key={el.id}>
                                    <div className="descHeader">{el.name}</div>
                                    <div className="descPrg">{el.prg}</div>
                                </div>
                            )
                        })}
                    </div>
                }

                {!activeDesc &&
                    <div className="reviewsCont">

                        {companyInfo &&
                            <div className="companyInfo">
                                <img src={companyInfo.logo} className="companyLogo" alt=""/>
                                <div className="textInfo">
                                    <p className="companyName">{companyInfo.name}</p>
                                    <p className="companyPrg">{companyInfo.address}</p>
                                </div>
                            </div>
                        }

                        <div className="rateLine">
                            <div className="rate">{itemInfo.productRate && itemInfo.productRate.length > 0 ?
                                rateRender(itemInfo.productRate)
                                : "5.0"
                            }</div>

                            <div className="stars">
                                {starsRender(itemInfo.productRate)}
                            </div>
                        </div>

                        {itemInfo.productRate && itemInfo.productRate.map((el, index)=>{
                            return(
                                <div className="userRateCont">
                                    <div className="userLogo">
                                        <span>{el.userName.charAt(0)}</span>
                                    </div>

                                    <div className="reviewBlock">
                                        <p className="username">{el.userName} {el.userSurname}</p>
                                        <p className="userReviews">1 review</p>

                                        <div className="userRate">
                                            {starsRenderByRate(el.rate)}

                                            <span>25 minutes ago</span>
                                        </div>

                                        <div className="message">{el.message}</div>
                                        <button className={`likeBtn`}><BiSolidLike stroke={"#72727"} className="icon"/> Like</button>
                                    </div>
                                </div>
                            )
                        })}

                    </div>
                }

            </div>


        </div>
    )
}

export default ProductInfo;