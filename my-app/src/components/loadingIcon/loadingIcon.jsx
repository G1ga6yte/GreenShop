import React from 'react';
import "./loadingIcon.scss"
import loadingImg from "./loading.svg"

function LoadingIcon() {
    return (
        <img className="loadingIcon" src={loadingImg} alt=""/>
    )
}
export default LoadingIcon;