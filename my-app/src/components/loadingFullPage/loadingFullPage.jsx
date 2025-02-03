import React from 'react';
import "./loadingFullPage.scss"
import loadingImg from './loading.svg'

function LoadingFullPage() {
    return (
        <div className="loadingFullPage">
            <img src={loadingImg} alt=""/>
        </div>
    )
}

export default LoadingFullPage;