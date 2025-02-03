import React from 'react';
import LoadingIcon from "../loadingIcon/loadingIcon";


function SubmitButton({loading, text, width, tabIndex}) {


    return (
        <button style={{width: `${width ? `${width}%` : "fit-content"}`}} disabled={loading} tabIndex={tabIndex} type="submit" className="G-button-save box-shadow">{loading ?
            <LoadingIcon/> : text} </button>
    )
}

export default SubmitButton;