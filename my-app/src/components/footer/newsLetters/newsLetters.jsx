import React from "react";
import "./newsLetters.scss";
import { Images } from "./images/images.js"

function NewsLetters() {
    return (
        <div className="newsLetters">

            <div className="newsCont">
                <div className="newsBlock">
                    <div className="circle">
                        <img src={Images.group1SVG} className="img" alt="" />
                    </div>
                    <p className="header">Garden Care</p>
                    <p className="prg">We are an online plant shop offering a wide range of cheap and trendy plants.</p>
                </div>
                <div className="midline"></div>
                <div className="newsBlock">
                    <div className="circle">
                        <img src={Images.group2SVG} className="img" alt="" />
                    </div>
                    <p className="header">Plant Renovation</p>
                    <p className="prg">We are an online plant shop offering a wide range of cheap and trendy plants.</p>
                </div>
                <div className="midline"></div>
                <div className="newsBlock">
                    <div className="circle">
                        <img src={Images.group3SVG} className="img" alt="" />
                    </div>
                    <p className="header">Watering Graden</p>
                    <p className="prg">We are an online plant shop offering a wide range of cheap and trendy plants.</p>
                </div>
            </div>


            <div className="registrCont">
                <p className="header">Would you like to join newsletters?</p>
                <div className="inputBlock">
                    <input type="text" placeholder="enter your email address..." className="input" />
                    <button className="btn">Join</button>
                </div>
                <p className="prg">We usually post offers and challenges in newsletter. We’re your online houseplant destination. We offer a wide range of houseplants and accessories shipped directly from our (green)house to yours! </p>

            </div>

        </div>
    )
}

export default NewsLetters