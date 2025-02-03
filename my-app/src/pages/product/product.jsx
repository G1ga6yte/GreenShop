import React from "react";
import "./product.scss"
import ProductInfo from "./productInfo/productInfo";
import RelatedProducts from "./relatedProducts/relatedProducts";

function Product() {


    return (
        <div className="product G-container">
            <ProductInfo/>
            <RelatedProducts/>
        </div>
    )
}

export default Product;