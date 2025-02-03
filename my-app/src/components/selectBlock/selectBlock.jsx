import React from 'react';
import "./selectBlock.scss"

function SelectBlock({options, onChange, message, value}) {
    const [selectBlock, setSelectBlock] = React.useState(false);


    return (
        <div className="selectBlock">
            <button tabIndex="-1" type="button" onClick={()=>{
                setSelectBlock(prev=>!prev)
            }} className={`selectBtn box-shadow ${message.length > 0 ? "redInput" : ""} ${selectBlock ? "activeSelect" : ""}`}>
                {value ? value.length > 0 ? value : <span>Category</span> : <span>Category</span>}

                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 9L12 15L18 9" stroke="#7a7a7a" strokeWidth="2" strokeLinecap="round"
                          strokeLinejoin="round"/>
                </svg>

            </button>

            {selectBlock &&
                <div className="optionsCont">
                    <div className="options">
                        {options.map((option, index) => (
                            <button onClick={() => {
                                setSelectBlock(false)
                                onChange(option)
                            }} key={index}
                                    className={`option ${value === option ? "activeOption" : ""}`}>{option}</button>
                        ))}
                    </div>
                </div>
            }
        </div>
    )
}

export default SelectBlock;