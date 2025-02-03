import React, {useEffect, useState} from 'react';
import "./profileAddress.scss"
import {useCartContext} from "../../../../CartContext";
import G_Input from "../../../../components/gInput/gInput";
import NewAddress from "./newAddress";
import axios from "axios";
import mapImg from "./mapImage.png";
import {useNavigate} from "react-router";
import {useLocation} from "react-router-dom";
import axiosInstance from "../../../../axiosInstance";


function ProfileAddress() {
    const {accountInfo, messageStatus, setMessageStatus, message, setMessage, verified, loading, setLoading} = useCartContext()
    const navigate = useNavigate();
    const location = useLocation();

    const [addresses, setAddresses] = useState([])
    const [activeAddress, setActiveAddress] = useState(null)
    const [newAddress, setNewAddress] = useState(false)



    useEffect(() => {
        if (loading) return;
        if (accountInfo) {
            console.log(accountInfo)
            if (accountInfo.address) {
                setAddresses(accountInfo.address)
                if (accountInfo.address.length === 0) {
                    setNewAddress(true)
                }
            } else {
                if (accountInfo.address.length === 0) {
                    setNewAddress(true)
                }
            }
        }

    }, [location, loading, verified, navigate]);

    const [formData, setFormData] = useState({
        firstName: "", lastName: "", country: "", town: "", street: "", aprt: "", state: "", zip: "", email: "", phone: ""
    });
    const [inputMessage, setInputMessage] = useState({
        firstName: "", lastName: "", country: "", town: "", street: "", aprt: "", state: "", zip: "", email: "", phone: ""
    })
    function FormZero () {
        setFormData({
            firstName: "", lastName: "", country: "", town: "", street: "", aprt: "", state: "", zip: "", email: "", phone: ""
        })
    }
    function MessageZero (){
        setInputMessage({
            firstName: "", lastName: "", country: "", town: "", street: "", aprt: "", state: "", zip: "", email: "", phone: ""
        })
    }

    const handleChange = (e) => {
        MessageZero()
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };



    const [btnLoading, setBtnLoading] = useState(false);
    const handleAddNewAddress = async (e) => {
        e.preventDefault();
        setBtnLoading(true)

        axiosInstance.post("/address/newAddress", {
            userID: accountInfo.userID,
            formData: formData
        })
            .then((res) => {
                let status = res.data.status

                if (status === 0){
                    setAddresses(res.data.addresses)
                    MessageZero()
                    FormZero()
                    setMessage("Address successfully added!")
                    setMessageStatus(true)
                    setNewAddress(false)
                    window.scrollTo(0, 0)
                } else {
                    console.log(res.data.message)
                }

            })
            .catch((err) => {
                console.log(err)
            })
            .finally(()=>{
                setBtnLoading(false)
            })


    }
    const handleDefaultAddress = async (address) => {
        if (!address.active) {
            axiosInstance.post("/address/defaultAddress", {
                userID: accountInfo.userID,
                addressID: address.addressID
            })
                .then((res) => {
                    let status = res.data.status

                    if (status === 0){
                        setAddresses(res.data.addresses)
                        setMessage("Default address successfully changed!")
                        setMessageStatus(true)
                        setNewAddress(false)
                    } else {
                        console.log(res.data.message)
                    }

                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }

    const [deletingAddress, setDeletingAddress] = useState({})
    const [deleteModal, setDeleteModal] = useState(false)
    const handleDeleteAddress = async (e) => {
        e.stopPropagation()
        axiosInstance.post("/address/deleteAddress", {
            userID: accountInfo.userID,
            addressID: deletingAddress.addressID
        })
            .then((res) => {
                let status = res.data.status

                if (status === 0){
                    setAddresses(res.data.addresses)
                    setDeleteModal(false)
                    setDeletingAddress({})
                    setMessage("Address has been successfully deleted!")
                    setMessageStatus(true)
                    setNewAddress(false)
                } else {
                    console.log(res.data.message)
                }

            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div className="profileAddress G-container">

            {deleteModal &&
                <div className="deleteModalCont">
                    <div onClick={()=>{
                        setDeletingAddress({})
                        setDeleteModal(false)
                    }} className="backgroundBlock"></div>

                    <div className="modalBlock">
                        <p className="prg2">Are you sure you want to continue delete this address? </p>
                        <p className="boldPrg">{deletingAddress.firstName && deletingAddress.firstName}
                            {deletingAddress.lastName && deletingAddress.lastName}
                            <br/>{deletingAddress.aprt && `${deletingAddress.aprt}, `}
                            {deletingAddress.state && deletingAddress.street && `${deletingAddress.state} ${deletingAddress.street}, `}
                            {deletingAddress.town && deletingAddress.zip && `${deletingAddress.town} ${deletingAddress.zip}, `}
                            {deletingAddress.country && `${deletingAddress.country}`}
                            <br/> {deletingAddress.phone && deletingAddress.phone}
                        </p>

                        <div className="buttonsCont">
                            <button onClick={handleDeleteAddress} className="deleteBtn">Delete</button>
                            <button onClick={() => setDeleteModal(false)} className="cancelBtn">Cancel</button>
                        </div>
                    </div>

                </div>
            }

            {addresses.length > 0 &&
                <div className="headerCont">
                    <div>
                        <p className="header">Shipping Addresses</p>
                        <p className="prg">Set up the address where your order will be delivered.</p>
                    </div>
                    <button onClick={() => {
                        setNewAddress(true)
                    }} className="AddBtn">Add
                    </button>
                </div>
            }

            {addresses.length > 0 &&
                <div className="addressesCont">
                    {addresses.map((address, index) => {
                        return (
                            <div onClick={() => {
                                handleDefaultAddress(address)
                            }} key={index} className={`addressCont ${address.active && "activeCont"}`}>
                                <img src={mapImg} className="mapImg" alt=""/>
                                <div className="textBlock">
                                    {address.active && <p className="default">By default</p>}
                                    <p className="name">{address.firstName} {address.lastName}</p>
                                    <p className="number">Phone Number: {address.phone}</p>
                                    <p className="address">
                                        {address.aprt && `${address.aprt}, `}
                                        {address.state && address.street && `${address.state} ${address.street}, `}
                                        {address.town && address.zip && `${address.town} ${address.zip}, `}
                                        {address.country && `${address.country}`}
                                    </p>

                                </div>
                                <div style={{flexGrow: '1'}}></div>

                                <div className="buttonsCont">
                                    <div className={`radio ${address.active && "activeRadio"}`}></div>
                                    <div className="buttonsBlock">
                                        <button onClick={(e)=>{
                                            e.stopPropagation()
                                            setFormData(address)
                                            setAddresses((prevItems) => prevItems.filter((item) => item.addressID !== address.addressID))
                                            setNewAddress(true)
                                        }} className="edit-delete-Btn">Edit address</button>
                                        <button onClick={(e)=>{
                                            e.stopPropagation()
                                            setDeleteModal(true)
                                            setDeletingAddress(address)
                                        }} className="edit-delete-Btn">Delete address</button>
                                    </div>
                                </div>

                            </div>
                        )
                    })}
                </div>
            }

            {newAddress &&
                <NewAddress
                    handleAddNewAddress={handleAddNewAddress}
                    handleChange={handleChange}
                    message={inputMessage}
                    formData={formData}
                    btnLoading={btnLoading}
                />
            }


        </div>
    )
}

export default ProfileAddress;