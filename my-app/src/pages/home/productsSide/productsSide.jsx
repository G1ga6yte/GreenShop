import React, {useEffect, useState} from "react";
import "./productsSide.scss";
import Categories from "./categories/categories";
import Products from "./products/products";

function ProductsSide (){
    const [menu, setMenu] = useState(false);
    const [tabletView, setTabletView] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <=876){
                setTabletView(true)
            } else {
                setTabletView(false)
            }
        };
        handleResize()
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return(
        <div className="productsCont G-flex">
            {tabletView && menu && <div onClick={() => setMenu(false)} className="backgroundBlock"></div>}
            <Categories menu={menu} tabletView={tabletView} setMenu={setMenu} />
            <Products menu={menu} tabletView={tabletView} setMenu={setMenu}/>
        </div>
    )
}

export default ProductsSide