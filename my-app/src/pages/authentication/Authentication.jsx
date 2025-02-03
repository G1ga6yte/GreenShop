import React, {useEffect, useState} from "react";
import "./login.scss"
import {useCartContext} from "../../CartContext";
import {Images} from "./images/images";
import axios from "axios";
import { BsFillPatchCheckFill } from "react-icons/bs";
import {useNavigate} from "react-router";
import Login from "./steps/login";
import Reg from "./steps/reg";


function Authentication() {
    const {loginCont, setLoginCont} = useCartContext()
    const [login, setLogin] = useState(true) // false = register
    const [verified,setVerified] = useState(false);
    const [step, setStep] = useState(1);

    useEffect(() => {
        setVerified(false)
        setLogin(true)
        setStep(1)
    }, [loginCont]);

    return (
        loginCont &&
            <div className="loginCont">
                <div onClick={()=>{
                    setLoginCont(false)
                    setLogin(true)
                }} className="backgroundClose"></div>

                <div className="loginBlock">
                    <button onClick={() => {
                        setLoginCont(false)
                    }} className="closeBtn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                            <path fillRule="evenodd" clipRule="evenodd"
                                  d="M3.17007 3.17007C3.39682 2.94331 3.76447 2.94331 3.99122 3.17007L9 8.17884L14.0088 3.17007C14.2355 2.94331 14.6032 2.94331 14.8299 3.17007C15.0567 3.39682 15.0567 3.76447 14.8299 3.99122L9.82116 9L14.8299 14.0088C15.0567 14.2355 15.0567 14.6032 14.8299 14.8299C14.6032 15.0567 14.2355 15.0567 14.0088 14.8299L9 9.82116L3.99122 14.8299C3.76447 15.0567 3.39682 15.0567 3.17007 14.8299C2.94331 14.6032 2.94331 14.2355 3.17007 14.0088L8.17884 9L3.17007 3.99122C2.94331 3.76447 2.94331 3.39682 3.17007 3.17007Z"
                                  fill="#727272"/>
                        </svg>
                    </button>

                    {step === 1 &&
                        <div className="headerBlock">
                            <button onClick={() => {
                                setLogin(true)
                            }} className={`btn1 ${login ? "activeBtn1" : ""}`}>Login
                            </button>
                            <div className="midLine"></div>
                            <button onClick={() => {
                                setLogin(false)
                            }} className={`btn1 ${!login ? "activeBtn1" : ""}`}>Register
                            </button>
                        </div>
                    }

                    {login ?
                        <Login
                            setLoginCont={setLoginCont}
                            setStep={setStep}
                            step={step}
                            setVerifiedCode={setVerified}
                        />
                        :
                        <Reg
                            setVerified={setVerified}
                            setLoginCont={setLoginCont}
                        />
                    }

                    {verified && <div className="verifiedForm verifiedAnimation">
                        <div className="verifiedCont">
                            <BsFillPatchCheckFill className="icon" fill="white" />

                            <p className="prg2">Account created successfully!</p>

                        </div>
                        <div className="background">

                        </div>
                    </div>}

                </div>
            </div>
    )
}

export default Authentication;