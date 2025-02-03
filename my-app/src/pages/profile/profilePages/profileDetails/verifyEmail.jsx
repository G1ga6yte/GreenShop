import React, {useState} from "react";
import "../../../authentication/login.scss"
import {BsFillPatchCheckFill} from "react-icons/bs";
import SubmitButton from "../../../../components/submitButton/submitButton";
import {useCartContext} from "../../../../CartContext";
import axios from "axios";
import G_Input from "../../../../components/gInput/gInput";
import {Status} from "../../../../source/status";
import axiosInstance from "../../../../axiosInstance";

function VerifyEmail({state, setState, email, setMessageStatus, setNotMessage}) {
    const {accountInfo, SessionTest, endMessage, setEndMessage} = useCartContext()

    const [verified, setVerified] = useState(false);
    const [code, setCode] = useState("")
    const [message, setMessage] = useState("")
    const [btnLoading, setBtnLoading] = useState(false);

    const handleVerify = (e) => {
        e.preventDefault()
        setBtnLoading(true)
        let userEmail
        if (email.length === 0) userEmail = accountInfo.email;
        else userEmail = email;

        axiosInstance.post("/authentication/verify", {
            email: userEmail, verifyCode: code
        })
            .then(async res => {
                const status = res.data.status

                if (status === 26) {
                    setVerified(true)
                    setBtnLoading(false)
                    setEndMessage(Status[status])
                    setTimeout(async () => {
                        setState(false)
                        await SessionTest()
                        setNotMessage(Status[status])
                        setMessageStatus(prev => !prev)
                    }, 3000)
                    return;
                }

                if (accountInfo.username){

                    if (status === 15) {
                        console.log(res)
                        setVerified(true)
                        setBtnLoading(false)
                        setEndMessage(Status[status])
                        setTimeout(async () => {
                            setState(false)
                            await SessionTest()
                            setNotMessage(Status[status])
                            setMessageStatus(prev => !prev)
                        }, 3000)
                        return;
                    } else {
                        setBtnLoading(false)
                        setMessage("Wrong Code, check and try again!")
                        return;
                    }
                } else {
                    if (status === 15) {
                        console.log(res)
                        setVerified(true)
                        setBtnLoading(false)
                        setTimeout(async () => {
                            setState(false)
                            await SessionTest()
                            setNotMessage(Status[status])
                            setMessageStatus(prev => !prev)
                        }, 3000)
                        return;
                    } else {
                        setBtnLoading(false)
                        setMessage("Wrong Code, check and try again!")
                        return;
                    }
                }



            })
            .catch(err => {
                setBtnLoading(false)
                setMessage("Wrong Code, check and try again!")
                console.log(err)
            });


    }

    return (
        <div className="loginCont">
            <div onClick={() => {
                setState(false)
            }} className="backgroundClose">
            </div>

            <div className="loginBlock">


                <div className="verifyForm">
                    <p className="prg2">Verify your <span>email</span> address</p>
                    <p className="prg prg3">We have sent a verification code
                        to <span>{email.length === 0 ? accountInfo.email : email}</span></p>
                    <form onSubmit={handleVerify} className="formCont">
                        <label className="label3" htmlFor="input3">
                            <p className="prg">Enter the verification code below to verify your email
                                address.</p>
                        </label>


                        <G_Input
                            tabIndex={"1"}
                            placeholder={"123456"}
                            formDataValue={code}
                            onChange={(e) => {
                                setCode(e.target.value)
                                setMessage("")
                            }}
                            type={"number"}
                            name={"username"}
                            message={message}
                        />


                        <SubmitButton
                            text={"Send Code"}
                            loading={btnLoading}
                            width={100}
                            tabIndex={2}
                        />
                    </form>
                </div>


                {verified && <div className="verifiedForm verifiedAnimation">
                    <div className="verifiedCont">
                        <BsFillPatchCheckFill className="icon" fill="white"/>

                        <p className="prg2">{endMessage}</p>

                    </div>
                    <div className="background">

                    </div>
                </div>}
            </div>
        </div>
    )
}

export default VerifyEmail;