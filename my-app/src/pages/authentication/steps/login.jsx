import React, {useEffect, useState} from 'react';
import {Images} from "../images/images";
import {useNavigate} from "react-router";
import {useCartContext} from "../../../CartContext";
import SubmitButton from "../../../components/submitButton/submitButton";
import axios from "axios";
import G_Input from "../../../components/gInput/gInput";
import {Status} from "../../../source/status";
import axiosInstance from "../../../axiosInstance";
// import OAuth from "oauthio-web";

function Login({setLoginCont, setStep, step, setVerifiedCode}) {
    const {setAccountInfo, setVerified, setCartProducts} = useCartContext()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);

    const [message, setMessage] = React.useState({
        username: "", password: "", code: ""
    });
    const [passMessage, setPassMessage] = useState({
        password1: "", password2: ""
    })

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [formData2, setFormData2] = useState({
        password1: "",
        password2: ""
    });

    ////////// Email Mask /////////////////////////
    const [email, setEmail] = useState("")
    const [code, setCode] = useState("")

    function maskEmail(email) {
        if (email.length < 3) {
            return ""
        } else {
            const [localPart, domain] = email.split("@");
            const visiblePart = localPart.slice(0, 3);
            const maskedPart = "*".repeat(10);
            return `${visiblePart}${maskedPart}@${domain}`;
        }
    }


    const handleChange = (e) => {
        setMessage({username: "", password: "", code: ""})
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };
    const handleChange2 = (e) => {
        setPassMessage({password1: "", password2: ""})
        const {name, value} = e.target;
        setFormData2({...formData2, [name]: value});
    }

    const handleLogin = async (e) => {
        setMessage({username: "", password: "", code: ""})
        setLoading(true)

        e.preventDefault();
        axiosInstance.post('/authentication/login', {
            username: formData.username,
            password: formData.password
        })
            .then(res => {
                let status = res.data.status;
                setLoading(false)
                if (status === 4) {
                    setLoginCont(false)
                    navigate("/home")
                    setVerified(true)
                    setAccountInfo(res.data.userData)
                    setCartProducts(res.data.userData.cartProducts)
                } else if (status === 6) {
                    setMessage({...message, ["password"]: Status[6], ["username"]: " "})
                }
            })
            .catch(err => {
                setLoading(false)
                console.log(err)
            })
    }
    const handleSendCode = async (e) => {
        e.preventDefault();
        setMessage({username: "", password: "", code: ""})
        setLoading(true)

        axiosInstance.post('/password/codeSender', {
            username: formData.username,
        })
            .then(res => {
                const status = res.data.status;
                if (status === 0){
                    setLoading(false)
                    setStep(3)
                    setEmail(res.data.email)
                    setFormData({...formData, ["username"]: res.data.username});
                } else {
                    setMessage({...message, ["username"]: Status[status]})
                }
            })
            .catch(err => {
                console.log(err)
            })
            .finally(()=>{
                setLoading(false)
            })
    }
    const handleCheckCode = async (e) => {
        e.preventDefault();
        setMessage({username: "", password: "", code: ""})
        setLoading(true)

        axiosInstance.post('/password/verifyCode', {
            username: formData.username,
            code: code
        })
            .then(res => {
                const status = res.data.status;
                if (status === 0){
                    setLoading(false)
                    setFormData({...formData, ["username"]: res.data.username});
                    setStep(4)
                } else {
                    setMessage({...message, ["code"]: Status[status]})
                }

            })
            .catch(err => {
                console.log(err)
            })
            .finally(()=>{
                setLoading(false)
            })

    }
    const handleChangePassword = async (e) => {
        e.preventDefault()
        setPassMessage({password1: "", password2: ""})
        setLoading(true)

        axiosInstance.post('/password/changePassword', {
            username: formData.username,
            password1: formData2.password1,
            password2: formData2.password2
        })
            .then((res)=>{
                const status = res.data.status;
                if (status === 0){
                    setLoading(false)
                    setVerifiedCode(true)
                    setTimeout(()=>{
                        setStep(1)
                        setVerifiedCode(false)
                    }, 5000)
                } else {
                    setPassMessage({...message, ["password1"]: " ", ["password2"]: Status[status]})
                }
            })
            .catch((err)=>{
                console.log(err)
            })
            .finally(()=>{
                setLoading(false)
            })

    }


    const handleGoogleLogin = () => {

    };



    useEffect(() => {
        setPassMessage({password1: "", password2: ""})
        setMessage({username: "", password: "", code: ""})
        setFormData({username: '', password: ''})
        setFormData2({password1: "", password2: ""})
        setEmail("")
        setCode("")
    }, [])

    return (
        <div className="logInForm">
            {step === 1 &&
                <form onSubmit={handleLogin}>
                    <p className="prg">Enter your username or email and password to login.</p>

                    <G_Input
                        type="text"
                        name={"username"}
                        tabIndex={"1"}
                        onChange={handleChange}
                        message={message.username}
                        formDataValue={formData.username}
                        placeholder={"Username or email"}
                    />
                    <G_Input
                        type="password"
                        name={"password"}
                        tabIndex={"2"}
                        onChange={handleChange}
                        message={message.password}
                        formDataValue={formData.password}
                        placeholder={"Password"}
                    />


                    <button onClick={() => {
                        setStep(2)
                        setMessage({
                            username: "", password: "", code: ""
                        })
                    }} type="button" className="btn2">Forgot Password?
                    </button>

                    <SubmitButton
                        width={100}
                        text={"Login"}
                        loading={loading}
                        tabIndex={3}
                    />
                    <div className="altBlock">
                        <span className="altText">Or login with</span>
                    </div>

                    <button type={"button"} onClick={()=>handleGoogleLogin} tabIndex="4" className="btn3">
                        <img src={Images.googleImg} alt=""/>
                        Login with Google
                    </button>

                    <button type={"button"} tabIndex="5" className="btn3">
                        <img src={Images.facebookImg} alt=""/>
                        Login with Facebook
                    </button>

                </form>
            }

            {step === 2 &&
                <form onSubmit={handleSendCode}>
                    <p className="prg2">Forgot <span> Password</span> ?</p>
                    <div style={{height: "32px"}}></div>

                    <p className="prg">Enter your username or email below to reset your password.</p>

                    <G_Input
                        type="text"
                        name={"username"}
                        tabIndex={"1"}
                        onChange={handleChange}
                        message={message.username}
                        formDataValue={formData.username}
                        placeholder={"Username or email"}
                        defaultValue={formData.username}
                    />
                    <button onClick={() => {
                        setStep(1)
                        setMessage({
                            username: "", password: "", code: ""
                        })
                    }} type="button" className="btn2">Back for login.
                    </button>


                    <SubmitButton
                        width={100}
                        text={"Reset now"}
                        loading={loading}
                        tabIndex={3}
                    />
                    <div style={{height: "32px"}}></div>

                </form>
            }

            {step === 3 &&
                <form onSubmit={handleCheckCode}>
                    <p className="prg2">Verify your <span>Account</span></p>
                    <div style={{height: "32px"}}></div>

                    <p className="prg">An email with a verification code has been sent
                        to <span>{maskEmail(email)}</span></p>


                    <G_Input
                        type="number"
                        name={"code"}
                        tabIndex={"1"}
                        onChange={(e) => setCode(e.target.value)}
                        message={message.code}
                        formDataValue={code}
                        placeholder={"123456"}
                    />
                    <div style={{height: "32px"}}></div>


                    <SubmitButton
                        width={100}
                        text={"Send Code"}
                        loading={loading}
                        tabIndex={3}
                    />
                    <div style={{height: "32px"}}></div>

                </form>
            }

            {step === 4 &&
                <form onSubmit={handleChangePassword}>

                    <p className="prg2">New <span>Password</span></p>
                    <div style={{height: "32px"}}></div>


                    <p className="prg">Create your new password and confirm it below.</p>


                    <G_Input
                        type="password"
                        name={"password1"}
                        tabIndex={"1"}
                        onChange={handleChange2}
                        message={passMessage.password1}
                        formDataValue={formData2.password1}
                        placeholder={"Password"}
                    />

                    <G_Input
                        type="password"
                        name={"password2"}
                        tabIndex={"2"}
                        onChange={handleChange2}
                        message={passMessage.password2}
                        formDataValue={formData2.password2}
                        placeholder={"Confirm password"}
                    />
                    <div style={{height: "32px"}}></div>


                    <SubmitButton
                        width={100}
                        text={"Confirm changes"}
                        loading={loading}
                        tabIndex={3}
                    />
                    <div style={{height: "32px"}}></div>

                </form>
            }


        </div>
    )
}

export default Login;