import React from "react";
import "./headBanner.scss";
import { Fade } from 'react-slideshow-image';
import { Images } from "./images/images";


function HeadBanner() {
    const indicators = (index) => (<div className="indicator"></div>)


    return (
        <div  className="headBanner">
            <Fade arrows={false} indicators={indicators} cssClass="MainBlock">
                <div className="pageContainer G-flex">
                    <div className="textBlock">
                        <p className="overHeader">Welcome to GreenShop</p>
                        <h1 className="header">
                            Let’s Make a
                            Better <span>Planet 1</span>
                        </h1>
                        <p className="prg">
                            We are an online plant shop offering a wide range of cheap and trendy plants. Use our plants to create an unique Urban Jungle. Order your favorite plants!
                        </p>
                        <button className="btn1">SHOW NOW</button>
                    </div>

                    <div className="imgBlock">
                        <img src={Images.img1} className="img1" alt="" />
                        <img src={Images.img1} className="img2" alt="" />
                    </div>
                </div>




                <div className="pageContainer G-flex">
                    <div className="textBlock">
                        <p className="overHeader">Welcome to GreenShop</p>
                        <h1 className="header">
                            Let’s Make a
                            Better <span>Planet 2</span>
                        </h1>
                        <p className="prg">
                            We are an online plant shop offering a wide range of cheap and trendy plants. Use our plants to create an unique Urban Jungle. Order your favorite plants!
                        </p>
                        <button className="btn1">SHOW NOW</button>

                    </div>

                    <div className="imgBlock">
                        <img src={Images.img1} className="img1" alt="" />
                        <img src={Images.img1} className="img2" alt="" />
                    </div>
                </div>

                <div className="pageContainer G-flex">
                    <div className="textBlock">
                        <p className="overHeader">Welcome to GreenShop</p>
                        <h1 className="header">
                            Let’s Make a
                            Better <span>Planet 3</span>
                        </h1>
                        <p className="prg">
                            We are an online plant shop offering a wide range of cheap and trendy plants. Use our plants to create an unique Urban Jungle. Order your favorite plants!
                        </p>
                        <button className="btn1">SHOW NOW</button>

                    </div>

                    <div className="imgBlock">
                        <img src={Images.img1} className="img1" alt="" />
                        <img src={Images.img1} className="img2" alt="" />
                    </div>
                </div>

            </Fade>
        </div>
    )
}


export default HeadBanner