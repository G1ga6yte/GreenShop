import React, {useEffect, useState} from 'react';
import "./profileDetails.scss"
import {useCartContext} from "../../../../CartContext";
import {useLocation} from "react-router-dom";
import {useNavigate} from "react-router";
import axios from "axios";
import NotificationBlock from "../../../../components/notificationBlock/notificationBlock";
import SubmitButton from "../../../../components/submitButton/submitButton";
import VerifyEmail from "./verifyEmail";
import {Status} from "../../../../source/status";
import G_Input from "../../../../components/gInput/gInput";
import LoadingIcon from "../../../../components/loadingIcon/loadingIcon";
import axiosInstance from "../../../../axiosInstance";

function ProfileDetails() {
    const {accountInfo, loading, verified, SessionTest, messageStatus, setMessageStatus, message, setMessage} = useCartContext()
    const location = useLocation();
    const navigate = useNavigate();

    const [verifyBlock, setVerifyBlock] = useState(false)

    const [passChangeStatus, setPassChangeStatus] = useState(1) // 2-current fail 3-match fail 4-valid Fail 5-fill all

    // useEffect(() => {
    //     SessionTest()
    // }, [])

    ///////////////// buttons loading toggle ////////////////////////////
    const [btnLoading1, setBtnLoading1] = useState(false);
    const [btnLoading2, setBtnLoading2] = useState(false);
    const [btnLoading3, setBtnLoading3] = useState(false);
    const [btnLoading4, setBtnLoading4] = useState(false);


    const [formData, setFormData] = React.useState({
        firstName: '', lastName: '', phoneNumber: ''
    })
    const [formData2, setFormData2] = React.useState({
        oldPassword: "", password1: "", password2: ""
    })
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")


    const [image, setImage] = useState(null);
    const [showImg, setShowImg] = useState(null);
    const handleImageChange = (e) => {
        if (e.target.files[0].size > 4000000) {
            alert("Image must be not more than 4 mb")
        } else {
            setImage(e.target.files[0]);
            let img = e.target.files[0]
            if (img){
                let imgBlob = new Blob([img], { type: img.type });
                setShowImg(URL.createObjectURL(imgBlob));
            }
        }
    };

    //////////////////// input massages and placeholders
    const [defEmail, setDefEmail] = useState("")
    const [defUsername, setDefUsername] = useState("")



    const [emailMessage, setEmailMessage] = useState("")
    const [usernameMessage, setUsernameMessage] = useState("")

    const [defValues, setDefValues] = useState({
        firstName: '', lastName: '', phoneNumber: ''
    })

    function reloadInfo() {

        setFormData({
            firstName: '',
            lastName: '',
            phoneNumber: ''
        })
        setDefValues({
            firstName: accountInfo.userInfo?.firstName,
            lastName: accountInfo.userInfo?.lastName,
            phoneNumber: accountInfo.userInfo?.phoneNumber
        })
        setEmail("")
        setUsername("")

        setDefEmail(accountInfo.email)
        setDefUsername(accountInfo.username)
    }

    useEffect(() => {
        if (loading) return;

        if (accountInfo) {
            reloadInfo()
        }

    }, [location, loading, verified, navigate, accountInfo])

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };
    const handleChange2 = (e) => {
        setPassChangeStatus(1)
        const {name, value} = e.target;
        setFormData2({...formData2, [name]: value});
    };


    const handleChangeInfo = async (event) => {
        event.preventDefault();
        setBtnLoading1(true)

        let form = new FormData()

        if(image){
            form.append('image', image);
        }
        form.append('userID', accountInfo.userID)
        form.append('firstName', formData.firstName);
        form.append('lastName', formData.lastName);
        form.append('phoneNumber', formData.phoneNumber);

        axiosInstance.post("/userDetailsChange/userInfo", form, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(async res => {
                await SessionTest()
                await reloadInfo()
                setMessage(Status[21])
                setMessageStatus(prev => !prev)
                setBtnLoading1(false)


            })
            .catch(err => {
                setBtnLoading1(false)
                console.log(err)
            });
    }

    const handleVerifyEmail = async (e) => {
        e.preventDefault();
        setBtnLoading2(true)


        if (email.length === 0 || email.length > 15) {
            setVerifyBlock(true);
            axiosInstance.post("/userDetailsChange/sendMailCode", {
                email,
                userID: accountInfo.userID
            })
                .then(async res => {
                    await SessionTest()
                    await reloadInfo()
                    setMessage("Your information is successfully updated!")
                    console.log(res.data.message)
                    setBtnLoading2(false)
                })
                .catch(err => {
                    setBtnLoading2(false)
                    console.log(err)
                });
        } else {
            setBtnLoading2(false)
            setEmailMessage("Please enter a valid email address")
        }
    }

    const handleChangeUsername = async (event) => {
        event.preventDefault()

        if (username === accountInfo.username) {
            setUsernameMessage(Status[22])
        } else if (username.length < 6 || username.length > 16) {
            setUsernameMessage(Status[9])
        } else {
            setBtnLoading3(true)

            axiosInstance.post("/userDetailsChange/usernameChange", {
                newUsername: username,
                oldUsername: accountInfo.username,
                userID: accountInfo.userID
            })
                .then(async res => {
                    const status = res.data.Status
                    setBtnLoading3(false)
                    if (status === 2){
                        setUsernameMessage(Status[status])
                    } else if (status ===22){
                        setUsernameMessage(Status[status])
                    } else {
                        setVerifyBlock(true)
                    }
                })
                .catch(err => {
                    setBtnLoading3(false)
                    console.log(err)
                });
        }
    }

    const handleChangePassword = async (event) => {
        event.preventDefault();
        setPassChangeStatus(1)

        if (formData2.password1.length ===0 || formData2.password2.length===0 || formData2.oldPassword.length === 0){
            setPassChangeStatus(5)
        } else if (formData2.password1 !== formData2.password2) {
            setPassChangeStatus(3)
        } else if (formData2.password1.length < 8 || formData2.password1.length > 16) {
            setPassChangeStatus(4)
        } else {
            setBtnLoading4(true)
            axiosInstance.post("/userDetailsChange/userPasswordChange", {
                userInfo: formData2,
                userID: accountInfo.userID
            })
                .then(res => {
                    const status = res.data.Status
                    setBtnLoading4(false)
                    if (status === 24) {
                        setFormData2({
                            oldPassword: "",
                            password1: "",
                            password2: ""
                        })
                        setMessage(Status[status])
                        setMessageStatus(prev => !prev)
                    } else if (status === 25 || status === 2) {
                        setFormData2({
                            oldPassword: "",
                            password1: "",
                            password2: ""
                        })
                        setMessage(Status[status])
                        setMessageStatus(prev => !prev)
                    } else {
                        setPassChangeStatus(status)
                    }
                })
                .catch(err => {
                    setPassChangeStatus(err.response.data)
                    console.log(err)
                    setBtnLoading4(false)
                });
        }
        setBtnLoading4(false)
    }


    return (
        <div className="profileDetails">

            {verifyBlock &&
                <VerifyEmail
                    state={verifyBlock}
                    setState={setVerifyBlock}
                    email={email}
                    setMessageStatus={setMessageStatus}
                    setNotMessage={setMessage}
                />
            }

            <p className="miniHeader">Personal Information</p>

            <form className="infoCont" onSubmit={handleChangeInfo}>
                <label className="label50" htmlFor="firstName">
                    <p className="labelText">First Name <span>*</span></p>
                    <G_Input
                        type="text"
                        name="firstName"
                        tabIndex="1"
                        onChange={handleChange}
                        message={""}
                        formDataValue={formData.firstName}
                        placeholder={defValues.firstName}
                        id="firstName"
                    />
                </label>

                <label className="label50" htmlFor="lastName">
                    <p className="labelText">Last Name <span>*</span></p>
                    <G_Input
                        type="text"
                        name="lastName"
                        tabIndex="2"
                        onChange={handleChange}
                        message={""}
                        formDataValue={formData.lastName}
                        placeholder={defValues.lastName}
                        id="lastName"
                    />
                </label>

                <label className="label50" htmlFor="phoneNumber">
                    <p className="labelText">Phone Number <span>*</span></p>
                    <G_Input
                        type="text"
                        name="phoneNumber"
                        tabIndex="3"
                        onChange={handleChange}
                        message={""}
                        formDataValue={formData.phoneNumber}
                        placeholder={defValues.phoneNumber}
                        id="phoneNumber"
                    />
                </label>

                <div className="actionBlock">
                    <p className="labelText">Photo <span>*</span></p>

                    <label htmlFor={"image"} className="photoBlock">

                        {showImg ? <div className="photoImg" style={{backgroundImage: `url(${showImg})`}}></div>
                            : accountInfo.userInfo ?
                                accountInfo.userInfo.profileImage ?
                                    <div className="photoImg"
                                         style={{backgroundImage: `url(${accountInfo.userInfo.profileImage})`}}></div>
                                    : <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"
                                           fill="none">
                                        <path fillRule="evenodd" clipRule="evenodd"
                                              d="M0.75 10C0.75 16.937 3.063 19.25 10 19.25C16.937 19.25 19.25 16.937 19.25 10C19.25 3.063 16.937 0.75 10 0.75C3.063 0.75 0.75 3.063 0.75 10Z"
                                              stroke="#46A358" strokeWidth="1.5" strokeLinecap="round"
                                              strokeLinejoin="round"/>
                                        <path fillRule="evenodd" clipRule="evenodd"
                                              d="M8.59866 6.78419C8.59866 7.75719 7.81066 8.54519 6.83766 8.54519C5.86566 8.54519 5.07666 7.75719 5.07666 6.78419C5.07666 5.81119 5.86566 5.02319 6.83766 5.02319C7.81066 5.02319 8.59866 5.81119 8.59866 6.78419Z"
                                              stroke="#46A358" strokeWidth="1.5" strokeLinecap="round"
                                              strokeLinejoin="round"/>
                                        <path
                                            d="M19.1203 12.6664C18.2393 11.7604 16.9933 9.92944 14.7043 9.92944C12.4153 9.92944 12.3653 13.9674 10.0293 13.9674C7.69231 13.9674 6.75131 12.5964 5.22831 13.3124C3.70631 14.0274 2.46631 16.8734 2.46631 16.8734"
                                            stroke="#46A358" strokeWidth="1.5" strokeLinecap="round"
                                            strokeLinejoin="round"/>
                                    </svg> : ""
                        }


                        <input id={"image"} style={{display: "none"}} type="file" onChange={handleImageChange}/>
                    </label>

                    <SubmitButton
                        tabIndex={"5"}
                        text={"Save Changes"}
                        loading={btnLoading1}
                    />
                </div>
            </form>

            {
                accountInfo.verified ? "" : <div className="infoCont">
                    <p className="miniHeader">Verify Email Address</p>
                    <form onSubmit={handleVerifyEmail} className="infoCont emailCont">
                        <label className="label50" htmlFor="email">
                            <p className="labelText">Email Address <span>*</span></p>
                            <G_Input
                                type="email"
                                name="email"
                                tabIndex="6"
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                    setEmailMessage("")
                                }}
                                message={emailMessage.length > 0 ? emailMessage : " "}
                                formDataValue={email}
                                placeholder={defEmail}
                                id="email"
                            />

                            <button tabIndex="7" className="saveBtn" type="submit">Verify</button>
                        </label>
                    </form>
                </div>
            }

            {
                accountInfo.verified && <>
                    <p className="miniHeader">Username change</p>

                    <form onSubmit={handleChangeUsername} className="infoCont passwordsCont">
                        <label className="label50" htmlFor="username">
                            <p className="labelText">Username</p>
                            <G_Input
                                type="text"
                                name="username"
                                tabIndex="8"
                                onChange={(e) => {
                                    setUsername(e.target.value)
                                    setUsernameMessage("")
                                }}
                                message={usernameMessage}
                                formDataValue={username}
                                placeholder={defUsername}
                                id="username"
                            />
                        </label>

                        <SubmitButton
                            tabIndex={"9"}
                            text={"Save Changes"}
                            loading={btnLoading3}
                        />
                        {/*<button tabIndex="9" className="saveBtn" type="submit">Save Changes</button>*/}
                    </form>
                </>
            }


            <p className="miniHeader">Password change</p>

            <form className="infoCont passwordsCont" onSubmit={handleChangePassword}>

                <label className="label50" htmlFor="oldPassword">
                    <p className="labelText">Current password</p>
                    <G_Input
                        type="password"
                        name="oldPassword"
                        tabIndex="10"
                        onChange={handleChange2}
                        message={passChangeStatus === 2 ? Status[19] : passChangeStatus === 5 ? " " : ""}
                        formDataValue={formData2.oldPassword}
                        placeholder={""}
                        id="oldPassword"
                    />
                </label>

                <label className="label50" htmlFor="newPassword1">
                    <p className="labelText">New password</p>
                    <G_Input
                        type="password"
                        name="password1"
                        tabIndex="11"
                        onChange={handleChange2}
                        message={passChangeStatus === 3 ? " " : passChangeStatus === 4 ? " " : passChangeStatus === 5 ? " " : ""}
                        formDataValue={formData2.password1}
                        placeholder={""}
                        id="newPassword1"
                    />
                </label>

                <label className="label50" htmlFor="firstName">
                    <p className="labelText">Confirm new password</p>
                    <G_Input
                        type="password"
                        name="password2"
                        tabIndex="12"
                        onChange={handleChange2}
                        message={passChangeStatus === 3 ? Status[23] : passChangeStatus === 4 ? Status[12] : passChangeStatus === 5 ? Status[5] : ""}
                        formDataValue={formData2.password2}
                        placeholder={""}
                        id="newPassword2"
                    />
                </label>

                <SubmitButton
                    width={100}
                    text={"Save Change"}
                    loading={btnLoading4}
                    tabIndex={"13"}
                />

            </form>


        </div>
    )
}

export default ProfileDetails;
