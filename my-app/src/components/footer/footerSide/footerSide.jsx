import React from "react";
import {Link} from "react-router-dom";
import {Images} from "./images/images.js"
import "./footerSide.scss";


function FooterSide() {



    return (
        <div className="footerSide">

            <div className="linksLine">
                <p className="linkHeader">My Account</p>
                <Link to="/" className="link">My Account</Link>
                <Link to="/" className="link">Our stores</Link>
                <Link to="/" className="link">Contact us</Link>
                <Link to="/" className="link">Career</Link>
                <Link to="/" className="link">Specials</Link>
            </div>

            <div className="linksLine">
                <p className="linkHeader">Help & Guide</p>
                <Link to="/" className="link">Help Center</Link>
                <Link to="/" className="link">How to Buy</Link>
                <Link to="/" className="link">Shipping & Delivery</Link>
                <Link to="/" className="link">Product Policy</Link>
                <Link to="/" className="link">How to Return</Link>

            </div>

            <div className="linksLine">
                <p className="linkHeader">Categories</p>
                <Link to="/" className="link">House Plants</Link>
                <Link to="/" className="link">Potter Plants</Link>
                <Link to="/" className="link">Seeds</Link>
                <Link to="/" className="link">Small Plants</Link>
                <Link to="/" className="link">Accessories</Link>

            </div>

            <div className="linksLine">
                <p className="linkHeader">Social Media</p>

                <div className="webSites">
                    <a href="" className="link"><img className="img" src={Images.facebookSVG} alt="" /></a>
                    <a href="" className="link"><img className="img" src={Images.instagramSVG} alt="" /></a>
                    <a href="" className="link"><img className="img" src={Images.twitterSVG} alt="" /></a>
                    <a href="" className="link"><img className="img" src={Images.linkedinSVG} alt="" /></a>
                    <a href="" className="link"><img className="img" src={Images.unionSVG} alt="" /></a>
                </div>

                <p className="linkHeader">We accept</p>
                    <img src={Images.cardTypes} className="cardImg" alt="" />

            </div>

        </div>
    )
}

export default FooterSide