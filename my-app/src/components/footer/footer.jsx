import React from "react";
import "./footer.scss";
import NewsLetters from "./newsLetters/newsLetters";
import FooterMiddle from "./footerMiddle/footerMiddle";
import FooterSide from "./footerSide/footerSide";

function Footer() {

    return (
        <div className="footer G-container">
            <NewsLetters />
            <FooterMiddle />
            <FooterSide />

            <div className="rights">
                © 2021 GreenShop. All Rights Reserved.
            </div>
        </div>
    )
}

export default Footer