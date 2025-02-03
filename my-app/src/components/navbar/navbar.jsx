import React, { useEffect, useState } from "react";
import "./navbar.scss";
import { Link, useLocation } from "react-router-dom";
import { Images } from "./images/images";
import {useCartContext} from "../../CartContext";
import { FaCircleUser } from "react-icons/fa6";
import {useNavigate} from "react-router";
import Cookies from "js-cookie";
import {Status} from "../../source/status";
import { HiOutlineMenuAlt1, HiOutlineMail } from "react-icons/hi";
import { FiPhone } from "react-icons/fi";
import { IoClose } from "react-icons/io5";


function Navbar() {
    const {setLoginCont, accountInfo, verified, cartProducts, messageStatus, setMessageStatus, message, setMessage} = useCartContext()

    const [menu, setMenu] = useState(false)
    const [mobileWidth, setMobileWidth] = useState(false)

    const [activeLink, setActiveLink] = useState("/home")
    const [activeInput, setActiveInput] = useState(false)
    const [searchInput, setSearchInput] = useState("");

    const location = useLocation()
    const navigate = useNavigate();

    useEffect(() => {
        setActiveLink(location.pathname)
    }, [location])


    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <=576){
                setMobileWidth(true)
            } else {
                setMobileWidth(false)
            }
        };
        handleResize()

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault()
        console.log(searchInput)
        // search code
        setSearchInput("")
    }

    // Cookies.set("profileProductsGrid", "grid", { expires: 7 })
    // const gridCookie = Cookies.get('profileProductsGrid');
    // if (gridCookie && gridCookie === "grid"){
    //     setGrid(true)
    // } else if (gridCookie && gridCookie === "line") {
    //     setGrid(false)
    // }
    return (
        <div className="navbar G-flex">
            {mobileWidth && <div className={`menuCont ${menu ? "activeMenu" : ""}`}>

                <div className="links">
                    <div className="closeCont">
                        <div></div>
                        <button onClick={() => setMenu(false)} className="closeBtn">
                            <IoClose className="closeIcon" fill={"#46A358"}/>
                        </button>
                    </div>

                    <Link onClick={() => setMenu(false)}
                          className={`menuLink lightText ${activeLink === "/home" ? "activeLink" : activeLink === "/" ? "activeLink" : ""}`}
                          to="/home">Home</Link>
                    <Link onClick={() => setMenu(false)}
                          className={`menuLink lightText ${activeLink === "/shop" ? "activeLink" : ""}`}
                          to="/shop">Shop</Link>
                    <Link onClick={() => setMenu(false)}
                          className={`menuLink lightText ${activeLink === "/care" ? "activeLink" : ""}`} to="/care">Plant
                        Care</Link>
                    <Link onClick={() => setMenu(false)}
                          className={`menuLink lightText ${activeLink === "/blogs" ? "activeLink" : ""}`}
                          to="/blogs">Blogs</Link>
                    <button onClick={() => {
                        if (cartProducts.length !== 0) {
                            navigate("/cart")
                            setMenu(false)
                        }
                    }}
                            className={`menuLink lightText ${activeLink === "/cart" ? "activeLink" : ""}`}>Cart {cartProducts.length !== 0 && `(${cartProducts.length})`}</button>

                </div>


                <div className="links">
                    <a onClick={() => setMenu(false)} href="tel:+8801911717490" className="phoneMailLink"><FiPhone
                        stroke={"#46A358"}/> +88 01911 717
                        490</a>
                    <a onClick={() => setMenu(false)} href="mailto:contact@greenshop.com"
                       className="phoneMailLink"><HiOutlineMail
                        stroke={"#46A358"}/> contact@greenshop.com</a>

                    <div className="webSites">
                        <a onClick={() => setMenu(false)} href="" className="link"><img className="img"
                                                                                        src={Images.facebookSVG}
                                                                                        alt=""/></a>
                        <a onClick={() => setMenu(false)} href="" className="link"><img className="img"
                                                                                        src={Images.instagramSVG}
                                                                                        alt=""/></a>
                        <a onClick={() => setMenu(false)} href="" className="link"><img className="img"
                                                                                        src={Images.twitterSVG} alt=""/></a>
                        <a onClick={() => setMenu(false)} href="" className="link"><img className="img"
                                                                                        src={Images.linkedinSVG}
                                                                                        alt=""/></a>
                        <a onClick={() => setMenu(false)} href="" className="link"><img className="img"
                                                                                        src={Images.unionSVG}
                                                                                        alt=""/></a>
                    </div>
                </div>

            </div>}


            <div className="leftLinks">
                <button onClick={() => setMenu(true)} className="menuBtn"><HiOutlineMenuAlt1 className="menuIcon"
                                                                                             stroke={"#46A358"}/>
                </button>
                <Link className="logo" to="/home"><img src={Images.logoSVG} alt=""/></Link>
            </div>


            <div className="middleLinks G-flex">
                <Link
                    className={`midLink lightText ${activeLink === "/home" ? "activeLink" : activeLink === "/" ? "activeLink" : ""}`}
                    to="/home">Home</Link>
                <Link className={`midLink lightText ${activeLink === "/shop" ? "activeLink" : ""}`}
                      to="/shop">Shop</Link>
                <Link className={`midLink lightText ${activeLink === "/care" ? "activeLink" : ""}`} to="/care">Plant
                    Care</Link>
                <Link className={`midLink lightText ${activeLink === "/blogs" ? "activeLink" : ""}`}
                      to="/blogs">Blogs</Link>
            </div>

            <div className="rightLinks G-flex">
                <form className="searchForm" onSubmit={handleSearch}>
                    <label htmlFor="searchInput" className={`searchBox ${activeInput ? "activeInput" : ""}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path
                                d="M14.5726 16.0029C10.5755 19.1865 4.988 18.3056 2.02842 14.6542C-0.828088 11.129 -0.64944 6.04347 2.44943 2.82482C5.65137 -0.500594 10.6854 -0.944524 14.3346 1.78337C15.642 2.76051 16.6183 4.00364 17.2542 5.50838C17.8938 7.02186 18.0881 8.59654 17.8663 10.2205C17.6452 11.837 17 13.2775 15.9499 14.6217C16.0349 14.6773 16.1255 14.7173 16.1904 14.7822C17.3448 15.9311 18.4947 17.0843 19.6491 18.2331C19.9227 18.5054 20.0589 18.8225 19.9776 19.2047C19.8165 19.9651 18.9107 20.2586 18.3298 19.7366C18.0575 19.4925 17.807 19.2234 17.5484 18.9649C16.6002 18.0177 15.6526 17.0699 14.7044 16.1227C14.665 16.0853 14.6238 16.0503 14.5726 16.0029ZM15.9605 8.98677C15.9705 5.12689 12.8529 2.00627 8.98261 2.00065C5.12292 1.99503 2.00781 5.09068 1.99094 8.94806C1.97408 12.8173 5.08544 15.9467 8.96762 15.9648C12.8117 15.9829 15.9505 12.8504 15.9605 8.98677Z"
                                fill="#3D3D3D"/>
                        </svg>
                        <input placeholder={activeInput ? "Search" : ""} onFocus={()=>{
                            setActiveInput(true);
                        }} onBlur={()=>{
                            setActiveInput(false);
                            setSearchInput("")
                        }}
                               id="searchInput" value={searchInput} onChange={(e) => setSearchInput(e.target.value)}
                               type="text"/>
                        <button type="submit" style={{display: "none"}} tabIndex="-1" ></button>
                    </label>
                </form>



                <div onClick={()=>{
                    if (cartProducts.length === 0){
                        setMessageStatus(prev=>!prev)
                        setMessage(Status[33])
                    } else {
                        navigate("/cart")
                    }
                }} className={`cartBox ${activeLink === "/cart" ? "activeLink" : ""}`}>
                    <img src={Images.cartSVG} alt=""/>
                    {cartProducts.length > 0 &&
                        <div className="count">{cartProducts.length}</div>
                    }
                </div>


                {
                    verified ?
                        accountInfo ?
                        accountInfo.userInfo ?
                        accountInfo.userInfo.profileImage ?
                            <div className={"accountImg"} onClick={()=>navigate("/profile")} style={{backgroundImage: `url(${accountInfo.userInfo.profileImage})`}}></div>
                            :
                            <FaCircleUser onClick={()=>navigate("/profile")} className="accountIcon" fill="#46A358"/>
                        :
                        <button onClick={() => setLoginCont(true)} className="logInBtn G-flex">
                            <img src={Images.logoutSVG} alt=""/>
                            Login
                        </button> : "" : ""
                }



            </div>
        </div>
    )
}

export default Navbar