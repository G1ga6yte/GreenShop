import React, {useEffect, useState} from 'react';
import {Images} from "../images/images";
import {useNavigate} from "react-router";
import {useCartContext} from "../../../CartContext";
import SubmitButton from "../../../components/submitButton/submitButton";
import axios from "axios";
import G_Input from "../../../components/gInput/gInput";
import {Status} from "../../../source/status";
import axiosInstance from "../../../axiosInstance";

function Reg({setVerified, setLoginCont}) {
    const {SessionTest} = useCartContext()

    const [message, setMessage] = useState({
        username: "", email: "", password1: "", password2: "", code: "", inputs: ""
    })
    const [verifyCode, setVerifyCode] = useState('');
    const [regStep, setRegStep] = useState(1);
    const [email, setEmail] = useState('');
    const [btnLoading, setBtnLoading] = useState(false);

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password1: '',
        password2: ''
    });

    const handleChange = (e) => {
        setMessage({
            username: "", email: "", password1: "", password2: "", code: "", inputs: ""
        })
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleCodeChange = (e) => {
        setMessage({
            username: "", email: "", password1: "", password2: "", code: "", inputs: ""
        })
        setVerifyCode(e.target.value)
    }

    const handleReg = async (e) => {
        e.preventDefault();
        setBtnLoading(true)
        setMessage({
            username: "", email: "", password1: "", password2: "", code: "", inputs: ""
        })

        if (formData.username.length === 0 || formData.password1.length === 0 || formData.email.length === 0 || formData.password2.length === 0) {
            setMessage({...message, ["inputs"]: Status[5]})
            setBtnLoading(false)
        } else if (formData.username.length < 6 || formData.username.length>16){
            setMessage({...message, ["username"]: Status[9]})
            setBtnLoading(false)
        } else if(formData.email.length < 15 ){
            setMessage({...message, ["email"]: Status[10]})
            setBtnLoading(false)
        } else if (formData.password1.length < 8 || formData.password1.length > 16) {
            setMessage({...message, ["password1"]: Status[12]})
            setBtnLoading(false)
        } else if (formData.password1 !== formData.password2) {
            setMessage({...message, ["password1"]: " ", ["password2"]: Status[23]})
            setBtnLoading(false)
        } else {

            axiosInstance.post('/authentication/register', {
                username: formData.username,
                email: formData.email,
                password1: formData.password1,
                password2: formData.password2
            })
                .then(res => {
                    let status = res.data.status;
                    if (status === 7 && res.data.email){
                        setRegStep(2)
                        setEmail(res.data.email)
                        setBtnLoading(false)
                    } else {
                        if (status === 9) setMessage({...message, ["username"]: Status[9]})
                        else if (status === 10) setMessage({...message, ["email"]: Status[10]})
                        else if (status === 12) setMessage({...message, ["password1"]: Status[12]})
                        else if (status === 23) setMessage({...message, ["password2"]: Status[23], ["password1"]: " "})
                        else if (status === 13) setMessage({...message, ["username"]: Status[13]})
                        else if (status === 14) setMessage({...message, ["email"]: Status[14]})
                        else alert("Server error, try again later")
                    }
                })
                .catch(err => {
                    setBtnLoading(false)
                    console.log(err)
                })
        }
    };

    const handleVerify = async (e) => {
        setMessage({
            username: "", email: "", password1: "", password2: "", code: "", inputs: ""
        })
        setBtnLoading(false)
        e.preventDefault();
        let formData = {
            email: email,
            verifyCode: verifyCode
        }

        if (verifyCode.length === 6) {
            axiosInstance.post('/authentication/verify', formData)
                .then(res => {
                    let status = res.data.status;
                    if (status === 15){
                        setVerified(true)
                        setBtnLoading(false)
                        setTimeout(async () => {
                            await SessionTest()
                            navigate("/home")
                            setLoginCont(false)
                        }, 3000)
                    } else if (status === 16) {
                        setBtnLoading(false)
                        setMessage({...message, ["code"]: Status[16]})
                    }
                    else if (status === 2) {
                        setBtnLoading(false)
                        alert(Status[2])
                    }
                })
                .catch(err => {
                    setBtnLoading(false)
                    return console.log(err)
                })
        } else {
            setMessage({...message, ["code"]: Status[17]})
        }
    }


    return (
        regStep === 1 ?
            <div className="signInForm">
                <form onSubmit={handleReg}>
                    <p className="prg">Enter your username, email and password to register.</p>

                    <G_Input
                        type="text"
                        name={"username"}
                        tabIndex={"1"}
                        onChange={handleChange}
                        message={message.username}
                        formDataValue={formData.username}
                        placeholder={"Username"}
                    />

                    <G_Input
                        type="email"
                        name={"email"}
                        tabIndex={"2"}
                        onChange={handleChange}
                        message={message.email}
                        formDataValue={formData.email}
                        placeholder={"Enter your email address"}
                    />

                    <G_Input
                        type="password"
                        name={"password1"}
                        tabIndex={"3"}
                        onChange={handleChange}
                        message={message.password1}
                        formDataValue={formData.password1}
                        placeholder={"Password"}
                    />

                    <G_Input
                        type="password"
                        name={"password2"}
                        tabIndex={"4"}
                        onChange={handleChange}
                        message={message.password2}
                        formDataValue={formData.password2}
                        placeholder={"Confirm password"}
                    />

                    {message.inputs.length > 0 && <div className="message">
                        <p className="errorMessage">{message.inputs}</p>
                    </div>}


                    <SubmitButton
                        loading={btnLoading}
                        width={100}
                        text="Register"
                        tabIndex={5}
                    />

                    <div className="altBlock">
                        <span className="altText">Or register with</span>
                    </div>

                    <button tabIndex="6" className="btn3">
                        <img src={Images.googleImg} alt=""/>
                        Continue with Google
                    </button>

                    <button tabIndex="7" className="btn3">
                        <img src={Images.facebookImg} alt=""/>
                        Continue with Facebook
                    </button>
                </form>
            </div>
            : <div className="verifyForm">
                <p className="prg2">Verify your <span>email</span> address</p>
                <p className="prg prg3">We have sent a verification code to <span>{email}</span></p>
                <form onSubmit={handleVerify}>
                    <label className="label3" htmlFor="input3">
                        <p className="prg">Enter the verification code below to verify your email
                            address.</p>
                    </label>

                    <G_Input
                        type="number"
                        name={"code"}
                        tabIndex={"1"}
                        onChange={handleCodeChange}
                        message={message.code}
                        formDataValue={verifyCode}
                        placeholder={"123456"}
                    />


                    <SubmitButton
                        text={"Send Code"}
                        loading={btnLoading}
                        width={100}
                        tabIndex={2}
                    />
                </form>
            </div>
    )
}

export default Reg