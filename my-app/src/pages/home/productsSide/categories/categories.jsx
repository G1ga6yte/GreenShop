import React, {useEffect, useRef, useState} from "react";
import "./categories.scss";
import Slider from '@mui/material/Slider';
import img1 from "./img1.png"
import { IoClose } from "react-icons/io5";


function Categories({menu, setMenu, tabletView}) {
    const [activeCategory, setActiveCategory] = useState("House Plants")
    const [activeSize, setActiveSize] = useState("")
    const [value, setValue] = React.useState([10, 40]);
    const categories = useRef(null)
    const rangeSelector = (event, newValue) => {
        setValue(newValue);
    };

    const categoriesTypes = [
        { name: "House Plants", count: "33" },
        { name: "Potter Plants", count: "12" },
        { name: "Seeds", count: "65" },
        { name: "Small Plants", count: "39" },
        { name: "Big Plants", count: "23" },
        { name: "Succulents", count: "17" },
        { name: "Trerrariums", count: "19" },
        { name: "Gardening", count: "13" },
        { name: "Accessories", count: "18" }
    ]

    const sizeTypes = [
        { name: "Small", count: "119" },
        { name: "Medium", count: "86" },
        { name: "Large", count: "78" }
    ]

    useEffect(() => {
        setTimeout(()=>{
            categories.current.scrollIntoView({ behavior: "smooth" });
        }, 500)
    }, [menu]);


    return (
        <div className={`categories ${menu && "activeMenu"}`}>
            <div onClick={()=>setMenu(false)} ref={categories} className="closeBtn">
                <div></div>
                <IoClose className="closeIcon" fill={"#46A358"}/>
            </div>
            <div className="sortBlock">
                <div className="miniHeader">Categories</div>

                <div className="categoriesList">
                    {categoriesTypes.map((el, index) => {
                        return (
                            <div onClick={() => {
                                setActiveCategory(el.name)
                            }} key={index} className={`category ${el.name === activeCategory ? "activeCategory" : ""}`}>
                                <span>({el.name})</span>
                                <span>({el.count})</span>
                            </div>
                        )
                    })}
                </div>



                <div className="miniHeader">Price Range</div>
                <div className="rangeBlock">
                    <Slider
                        value={value}
                        onChange={rangeSelector}
                        valueLabelDisplay="auto"
                    />

                    <p className="pricePrg">Price: <span>${value[0] * 15} - ${value[1] * 15}</span></p>
                    <button className="filterBtn">Filter</button>
                </div>

                <div className="miniHeader">Size</div>

                <div className="sizes">
                    {sizeTypes.map((el, index) => {
                        return (
                            <div onClick={() => {
                                setActiveSize(el.name)
                            }} key={index} className={`category ${el.name === activeSize ? "activeCategory" : ""}`}>
                                <span>({el.name})</span>
                                <span>({el.count})</span>
                            </div>
                        )
                    })}
                </div>

            </div>

            <div className="bannerBlock">
                <p className="header">Super Sale</p>
                <p className="underHeader">UP TO 75% OFF</p>
                <img src={img1} className="img1" alt="" />

                <div className="circle1"></div>
                <div className="circle2"></div>
                <div className="circle3"></div>
            </div>
        </div>
    )
}

export default Categories