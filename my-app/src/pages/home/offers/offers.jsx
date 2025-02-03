import React, { useEffect, useState } from "react";
import { Data } from "../../../data.js"
import "./offers.scss"

function Offers() {
    const [randomItems, setRandomItems] = useState([]);



    useEffect(() => {
        const index1 = Math.floor(Math.random() * Data.length);
        let index2 = Math.floor(Math.random() * Data.length);

        while (index1 === index2) {
            index2 = Math.floor(Math.random() * Data.length);
        }

        setRandomItems([Data[index1], Data[index2]])
    }, [])


    return (
        <div className="Offers G-flex">
            <div className="offerCard">
                <p className="miniHeader">Summer cactus & succulents</p>
                <p className="prg">We are an online plant shop offering a wide range of cheap and trendy plants</p>
                <button className="btn">
                    Find More
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="12" viewBox="0 0 14 12" fill="none">
                        <path d="M12.8126 5.79419L1.56258 5.79419" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M8.27485 1.27587C8.27485 1.27587 12.8123 3.72162 12.8123 5.79312C12.8123 7.86612 8.27485 10.3126 8.27485 10.3126" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>

                {randomItems[0] && randomItems[0].Image && (
                    <img src={randomItems[0].Image} alt="" className="mainImg" />
                )}

                <div className="circleCont">
                    <div className="circle1"></div>
                    <div className="circle2"></div>
                </div>
            </div>


            <div className="offerCard">
                <p className="miniHeader">Styling Trends & much more</p>
                <p className="prg">We are an online plant shop offering a wide range of cheap and trendy plants</p>
                <button className="btn">
                    Find More
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="12" viewBox="0 0 14 12" fill="none">
                        <path d="M12.8126 5.79419L1.56258 5.79419" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M8.27485 1.27587C8.27485 1.27587 12.8123 3.72162 12.8123 5.79312C12.8123 7.86612 8.27485 10.3126 8.27485 10.3126" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>

                {randomItems[1] && randomItems[1].Image && (
                    <img src={randomItems[1].Image} alt="" className="mainImg" />
                )}

                <div className="circleCont">
                    <div className="circle1"></div>
                    <div className="circle2"></div>
                </div>
            </div>
        </div>
    )
}

export default Offers