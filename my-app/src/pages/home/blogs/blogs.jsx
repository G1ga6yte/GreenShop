import React from "react";
import "./blogs.scss";
import { Images } from "./images/images.js"

function Blogs() {

    const blogData = [
        {
            Date: "September 12  I Read in 6 minutes",
            header: "Cactus & Succulent Care Tips",
            prg: "Cacti are succulents are easy care plants for any home or patio.",
            img: Images.img1
        },
        {
            Date: "September 13  I Read in 2 minutes",
            header: "Top 10 Succulents for Your Home",
            prg: "Best in hanging baskets. Prefers medium to high light.",
            img: Images.img2
        },
        {
            Date: "September 15  I Read in 3 minutes",
            header: "Cacti & Succulent Care Tips",
            prg: "Cacti and succulents thrive in containers and because most are..",
            img: Images.img3
        },
        {
            Date: "September 15  I Read in 2 minutes",
            header: "Best Houseplants Room by Room",
            prg: "The benefits of houseplants are endless. In addition to..",
            img: Images.img4
        }
    ]



    return (
        <div className="blogs">
            <p className="header">Our Blog Posts</p>
            <p className="underHeader">
                We are an online plant shop offering a wide range of cheap and trendy plants.
            </p>

            <div className="cardsCont">
                {blogData.map((el, index) => {
                    return (
                        <div key={index} className="blogCard">
                            <img src={el.img} className="img" alt="" />
                            <div className="textBlock">
                                <p className="data">{el.Date}</p>
                                <p className="name">{el.header}</p>
                                <p className="prg">{el.prg}</p>
                                <button className="btn">
                                    Read More
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="10" viewBox="0 0 12 10" fill="none">
                                        <path d="M0.666672 4.81714C0.666672 4.56401 0.854774 4.35481 1.09882 4.3217L1.16667 4.31714L11.1667 4.31714C11.4428 4.31714 11.6667 4.541 11.6667 4.81714C11.6667 5.07027 11.4786 5.27947 11.2345 5.31257L11.1667 5.31714L1.16667 5.31714C0.890529 5.31714 0.666672 5.09328 0.666672 4.81714Z" fill="#3D3D3D" />
                                        <path d="M6.78068 1.15514C6.585 0.960302 6.58431 0.64372 6.77915 0.448038C6.95628 0.270145 7.23402 0.25341 7.43008 0.398224L7.48626 0.446515L11.5196 4.46252C11.698 4.64017 11.7142 4.91891 11.5683 5.11496L11.5196 5.17111L7.48629 9.18778C7.29062 9.38264 6.97404 9.38198 6.77918 9.18632C6.60204 9.00844 6.58648 8.73063 6.73212 8.53519L6.78065 8.47921L10.458 4.81663L6.78068 1.15514Z" fill="#3D3D3D" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>


        </div>
    )
}

export default Blogs