import React from "react";
import { Link } from "react-router-dom";
import "./footerMiddle.scss";
import { Images } from "./images/images.js"

function FooterMiddle() {


    return (
        <div className="FooterMiddle">
            <Link onClick={()=>window.scrollTo(0, 0)} to="/home" className="link"><img src={Images.logoSVG} alt="" /></Link>

            <a href="https://www.google.com/maps?q=70+West+Buckingham+Ave,+Farmingdale,+NY+11735" className="addressLink">
                <img src={Images.gpsSVG} alt="" />
                <span>70 West Buckingham Ave. Farmingdale, NY 11735</span>
            </a>

            <a href="mailto:contact@greenshop.com" className="addressLink">
                <img src={Images.messageSVG} alt="" />
                <span>contact@greenshop.com</span>
            </a>

            <a href="tel:+8801911717490" className="addressLink">
                <img src={Images.phoneSVG} alt="" />
                <span>+88 01911 717 490</span>
            </a>

        </div>
    )
}

export default FooterMiddle