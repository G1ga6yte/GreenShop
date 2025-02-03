import React, {useEffect, useState} from 'react';
import "./profile.scss";
import {Link, Outlet, useLocation} from "react-router-dom";
import {useCartContext} from "../../CartContext";
import {useNavigate} from "react-router";
import axios from "axios";
import { HiMenuAlt1 } from "react-icons/hi";

function Profile() {
    const location = useLocation()
    const {accountInfo, handleLogOut, verified, loading} = useCartContext()
    const [tabletWidth, setTabletWidth] = useState(false)
    const [menu, setMenu] = useState(false)
    const [activeRoute, setActiveRoute] = useState("account.details");
    const navigate = useNavigate();


    useEffect(() => {
        if (loading) return;

        if (verified){
            if (location.pathname.includes("/profile/details") || location.pathname === "/profile") setActiveRoute("details");
            else if (location.pathname.includes("/address")) setActiveRoute("address");
            else if (location.pathname.includes("/orders")) setActiveRoute("orders");
            else if (location.pathname.includes("/wishlist")) setActiveRoute("wishlist");
            else if (location.pathname.includes("/reports")) setActiveRoute("reports");
            else if (location.pathname.includes("/products")) setActiveRoute("products");
            else if (location.pathname.includes("/support")) setActiveRoute("support");
        } else {
            navigate("/")
        }
        setMenu(false)

    }, [location, loading, verified, navigate])


    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <=992){
            } else {
                setMenu(false)
            }
        };
        handleResize()

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    return (
        <div className="profile G-container">
            {menu && <div onClick={()=>{
                setMenu(false)
            }} className="backgroundBlock"></div>}

            <div className={`profileNav ${menu && "activeProfileNav"}`}>
                <p className="header">My Account</p>

                <Link to="/profile/details" className={`profileLink ${activeRoute === "details" ? "activeLink" : ""}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="16" viewBox="0 0 12 16" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd"
                              d="M6 1.65385C4.61038 1.65385 3.48387 2.77313 3.48387 4.15385C3.48387 5.53456 4.61038 6.65385 6 6.65385C7.38962 6.65385 8.51613 5.53456 8.51613 4.15385C8.51613 2.77313 7.38962 1.65385 6 1.65385ZM2.32258 4.15385C2.32258 2.13588 3.96902 0.5 6 0.5C8.03098 0.5 9.67742 2.13588 9.67742 4.15385C9.67742 6.17181 8.03098 7.80769 6 7.80769C3.96902 7.80769 2.32258 6.17181 2.32258 4.15385Z"
                              fill="#727272"/>
                        <path fillRule="evenodd" clipRule="evenodd"
                              d="M4.09963 10.5C2.47683 10.5 1.16129 11.8071 1.16129 13.4195C1.16129 13.5042 1.17686 13.5639 1.19319 13.5987C1.20697 13.6281 1.21879 13.6365 1.22866 13.6418C1.67991 13.8858 2.94511 14.3462 6 14.3462C9.05489 14.3462 10.3201 13.8858 10.7713 13.6418C10.7812 13.6365 10.793 13.6281 10.8068 13.5987C10.8231 13.5639 10.8387 13.5042 10.8387 13.4195C10.8387 11.8071 9.52317 10.5 7.90037 10.5H4.09963ZM0 13.4195C0 11.1699 1.83547 9.34615 4.09963 9.34615H7.90037C10.1645 9.34615 12 11.1699 12 13.4195C12 13.8325 11.8495 14.3725 11.3264 14.6553C10.6335 15.03 9.14689 15.5 6 15.5C2.8531 15.5 1.36654 15.03 0.673589 14.6553C0.150475 14.3725 0 13.8325 0 13.4195Z"
                              fill="#727272"/>
                    </svg>

                    Account Details
                </Link>
                <Link to="/profile/address" className={`profileLink ${activeRoute === "address" ? "activeLink" : ""}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="17" viewBox="0 0 15 17" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd"
                              d="M7.20882 6.0835C6.40466 6.0835 5.75049 6.73766 5.75049 7.54266C5.75049 8.34683 6.40466 9.00016 7.20882 9.00016C8.01299 9.00016 8.66715 8.34683 8.66715 7.54266C8.66715 6.73766 8.01299 6.0835 7.20882 6.0835ZM7.20882 10.2502C5.71549 10.2502 4.50049 9.036 4.50049 7.54266C4.50049 6.0485 5.71549 4.8335 7.20882 4.8335C8.70216 4.8335 9.91715 6.0485 9.91715 7.54266C9.91715 9.036 8.70216 10.2502 7.20882 10.2502Z"
                              fill="#727272"/>
                        <mask id="mask0_19899_263"  maskUnits="userSpaceOnUse" x="0" y="0"
                              width="15" height="17">
                            <path fillRule="evenodd" clipRule="evenodd"
                                  d="M0.333496 0.666748H14.0831V16.9167H0.333496V0.666748Z" fill="white"/>
                        </mask>
                        <g mask="url(#mask0_19899_263)">
                            <path fillRule="evenodd" clipRule="evenodd"
                                  d="M7.20801 1.91675C4.10634 1.91675 1.58301 4.46425 1.58301 7.59425C1.58301 11.5767 6.26967 15.4567 7.20801 15.6634C8.14634 15.4559 12.833 11.5759 12.833 7.59425C12.833 4.46425 10.3097 1.91675 7.20801 1.91675ZM7.20801 16.9167C5.71301 16.9167 0.333008 12.2901 0.333008 7.59425C0.333008 3.77425 3.41717 0.666748 7.20801 0.666748C10.9988 0.666748 14.083 3.77425 14.083 7.59425C14.083 12.2901 8.70301 16.9167 7.20801 16.9167Z"
                                  fill="#727272"/>
                        </g>
                    </svg>

                    Address
                </Link>
                <Link to="/profile/orders" className={`profileLink ${activeRoute === "orders" ? "activeLink" : ""}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <g clipPath="url(#clip0_9_1453)">
                            <path
                                d="M12.8646 15.1873H7.41669C5.0909 15.1873 3.19871 13.2951 3.19871 10.9693V6.64588C3.19871 4.48381 2.12108 2.48255 0.316103 1.29245C-0.00804932 1.07874 -0.0975409 0.642736 0.11617 0.318584C0.329881 -0.00560306 0.765845 -0.0951298 1.09007 0.118652C2.12045 0.798029 2.95638 1.69407 3.55414 2.72572C3.68332 2.87043 4.72495 3.97449 6.43253 3.97449H14.5278C16.7364 3.93319 18.4651 6.14963 17.8877 8.28147L16.9558 11.9958C16.4843 13.8749 14.802 15.1873 12.8646 15.1873ZM4.42734 4.98332C4.54421 5.52326 4.6047 6.08 4.6047 6.64588V10.9693C4.6047 12.5198 5.86616 13.7813 7.41669 13.7813H12.8646C14.1562 13.7813 15.2777 12.9064 15.592 11.6536L16.5239 7.93932C16.8671 6.67259 15.8397 5.35598 14.5278 5.38048H6.4325C5.66022 5.38048 4.98801 5.21398 4.42734 4.98332ZM7.06519 17.1205C7.06519 16.6352 6.67176 16.2418 6.18645 16.2418C5.02046 16.2882 5.02147 17.9533 6.18645 17.9993C6.67176 17.9993 7.06519 17.6059 7.06519 17.1205ZM14.06 17.1205C14.06 16.6352 13.6666 16.2418 13.1813 16.2418C12.0153 16.2882 12.0163 17.9533 13.1813 17.9993C13.6666 17.9993 14.06 17.6059 14.06 17.1205ZM15.2308 7.48948C15.2308 7.10121 14.9161 6.78648 14.5278 6.78648H6.71369C5.78096 6.8236 5.78166 8.15567 6.71369 8.19247H14.5278C14.9161 8.19247 15.2308 7.87774 15.2308 7.48948Z"
                                fill="#727272"/>
                        </g>
                        <defs>
                            <clipPath id="clip0_9_1453">
                                <rect width="18" height="18" fill="white"/>
                            </clipPath>
                        </defs>
                    </svg>

                    Orders
                </Link>
                <Link to="/profile/wishlist" className={`profileLink ${activeRoute === "wishlist" ? "activeLink" : ""}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path
                            d="M8 15.1099C7.77222 15.1099 7.55261 15.0273 7.38147 14.8774C6.73511 14.3123 6.11194 13.7811 5.56213 13.3126L5.55933 13.3102C3.94739 11.9365 2.55542 10.7502 1.58691 9.58167C0.504272 8.27527 0 7.03662 0 5.68347C0 4.36877 0.450806 3.15588 1.26929 2.26807C2.09753 1.36975 3.23401 0.875 4.46973 0.875C5.39331 0.875 6.23914 1.16699 6.98364 1.7428C7.35938 2.03345 7.69995 2.38916 8 2.80408C8.30017 2.38916 8.64062 2.03345 9.01648 1.7428C9.76099 1.16699 10.6068 0.875 11.5304 0.875C12.766 0.875 13.9026 1.36975 14.7308 2.26807C15.5493 3.15588 16 4.36877 16 5.68347C16 7.03662 15.4958 8.27527 14.4132 9.58154C13.4447 10.7502 12.0529 11.9364 10.4412 13.3099C9.89038 13.7792 9.26624 14.3112 8.61841 14.8777C8.44739 15.0273 8.22766 15.1099 8 15.1099ZM4.46973 1.81226C3.4989 1.81226 2.60706 2.19971 1.95825 2.90332C1.2998 3.61755 0.937134 4.60486 0.937134 5.68347C0.937134 6.82153 1.36011 7.83936 2.30847 8.98364C3.2251 10.0897 4.5885 11.2516 6.16711 12.5969L6.17004 12.5994C6.72192 13.0697 7.34753 13.6029 7.99866 14.1722C8.65369 13.6018 9.28027 13.0677 9.83325 12.5967C11.4117 11.2513 12.775 10.0897 13.6917 8.98364C14.6399 7.83936 15.0629 6.82153 15.0629 5.68347C15.0629 4.60486 14.7002 3.61755 14.0417 2.90332C13.3931 2.19971 12.5011 1.81226 11.5304 1.81226C10.8192 1.81226 10.1663 2.03833 9.58972 2.48413C9.07593 2.88159 8.71802 3.38403 8.50818 3.7356C8.40027 3.91638 8.21033 4.02429 8 4.02429C7.78967 4.02429 7.59973 3.91638 7.49182 3.7356C7.2821 3.38403 6.92419 2.88159 6.41028 2.48413C5.83374 2.03833 5.18079 1.81226 4.46973 1.81226Z"
                            fill="#727272"/>
                    </svg>

                    Wishlist
                </Link>
                <Link to="/profile/reports" className={`profileLink stroke ${activeRoute === "reports" ? "activeLink strokeActive" : ""}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M4.1875 10.1404L6.43225 7.22368L8.99275 9.23368L11.1895 6.39868" stroke="#727272"
                              strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path fillRule="evenodd" clipRule="evenodd"
                              d="M13.7501 0.762451C14.5466 0.762451 15.1916 1.40745 15.1916 2.20395C15.1916 2.9997 14.5466 3.64545 13.7501 3.64545C12.9536 3.64545 12.3086 2.9997 12.3086 2.20395C12.3086 1.40745 12.9536 0.762451 13.7501 0.762451Z"
                              stroke="#727272" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path
                            d="M14.5664 5.95179C14.6662 6.62304 14.7119 7.37904 14.7119 8.22729C14.7119 13.4308 12.9779 15.1648 7.77441 15.1648C2.57166 15.1648 0.836914 13.4308 0.836914 8.22729C0.836914 3.02454 2.57166 1.28979 7.77441 1.28979C8.60691 1.28979 9.35016 1.33404 10.0117 1.43004"
                            stroke="#727272" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>

                    Reports
                </Link>
                <Link to="/profile/support" className={`profileLink stroke ${activeRoute === "support" ? "activeLink strokeActive" : ""}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd"
                              d="M8 14.75C3.12918 14.75 1.2175 14.404 0.907644 12.6525C0.597792 10.901 2.58037 7.60806 3.19131 6.52135C5.23443 2.88806 6.62279 1.25 8 1.25C9.37721 1.25 10.7656 2.88806 12.8087 6.52135C13.4196 7.60806 15.4022 10.901 15.0924 12.6525C14.7833 14.404 12.8708 14.75 8 14.75Z"
                              stroke="#727272" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M8 5.375V8.29625" stroke="#727272" strokeWidth="1.5" strokeLinecap="round"
                              strokeLinejoin="round"/>
                        <path d="M7.99662 10.9211H8.00337" stroke="#727272" strokeWidth="1.5" strokeLinecap="round"
                              strokeLinejoin="round"/>
                    </svg>

                    Support
                </Link>
                {accountInfo ? accountInfo.admin ? accountInfo.admin.length > 0 &&
                    <Link to="/profile/products"
                          className={`profileLink adminLink stroke ${activeRoute === "products" ? "activeLink strokeActive" : ""}`}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M20.5 7.27777L12 12M12 12L3.49997 7.27777M12 12L12 21.5M21 16.0586V7.94147C21 7.59883 21 7.4275 20.9495 7.27471C20.9049 7.13953 20.8318 7.01545 20.7354 6.91076C20.6263 6.79242 20.4766 6.70922 20.177 6.54282L12.777 2.43171C12.4934 2.27415 12.3516 2.19537 12.2015 2.16448C12.0685 2.13715 11.9315 2.13715 11.7986 2.16448C11.6484 2.19537 11.5066 2.27415 11.223 2.43171L3.82297 6.54282C3.52345 6.70922 3.37369 6.79242 3.26463 6.91076C3.16816 7.01545 3.09515 7.13953 3.05048 7.27471C3 7.42751 3 7.59883 3 7.94147V16.0586C3 16.4012 3 16.5725 3.05048 16.7253C3.09515 16.8605 3.16816 16.9846 3.26463 17.0893C3.37369 17.2076 3.52345 17.2908 3.82297 17.4572L11.223 21.5683C11.5066 21.7259 11.6484 21.8047 11.7986 21.8356C11.9315 21.8629 12.0685 21.8629 12.2015 21.8356C12.3516 21.8047 12.4934 21.7259 12.777 21.5683L20.177 17.4572C20.4766 17.2908 20.6263 17.2076 20.7354 17.0893C20.8318 16.9846 20.9049 16.8605 20.9495 16.7253C21 16.5725 21 16.4012 21 16.0586Z"
                                stroke="#727272" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>

                        Products
                        <span>admin</span>
                    </Link> : "" : ""
                }

                <div className="line"></div>

                <button onClick={handleLogOut} className="logoutBtn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path d="M17.1592 9.1005H7.125" stroke="#46A358" strokeWidth="1.5" strokeLinecap="round"
                              strokeLinejoin="round"/>
                        <path d="M14.7202 6.67041L17.1602 9.10041L14.7202 11.5304" stroke="#46A358" strokeWidth="1.5"
                              strokeLinecap="round" strokeLinejoin="round"/>
                        <path
                            d="M12.6333 5.35817C12.3583 2.37484 11.2416 1.2915 6.79997 1.2915C0.882468 1.2915 0.882468 3.2165 0.882468 8.99984C0.882468 14.7832 0.882468 16.7082 6.79997 16.7082C11.2416 16.7082 12.3583 15.6248 12.6333 12.6415"
                            stroke="#46A358" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>

                    Log Out
                </button>

            </div>

            <div className="outletContainer">
                <button className="Menu" onClick={()=>{setMenu(true)}} ><HiMenuAlt1 className="menuIcon" fill={"#46A358"}  /> Menu</button>
                <Outlet/>
            </div>
        </div>
    )
}

export default Profile;