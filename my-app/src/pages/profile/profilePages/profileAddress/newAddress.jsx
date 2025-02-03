import React from 'react';
import G_Input from "../../../../components/gInput/gInput";
import SubmitButton from "../../../../components/submitButton/submitButton";

function NewAddress({handleAddNewAddress, handleChange, message, formData, btnLoading}){

    return <div id="addressCont" className="newAddressCont">
        <form onSubmit={handleAddNewAddress}>
            <p className="miniHeader">New Address</p>

            <div className="inputsLine">
                <label className="inputsLabel" htmlFor="firstName">
                    <p className="overInputText">First Name <span>*</span></p>
                    <G_Input
                        placeholder=""
                        type="text"
                        name="firstName"
                        tabIndex="1"
                        onChange={handleChange}
                        message={message.firstName}
                        formDataValue={formData.firstName}
                        id="firstName"
                    />
                </label>
                <label className="inputsLabel" htmlFor="lastName">
                    <p className="overInputText">Last Name <span>*</span></p>
                    <G_Input
                        placeholder=""
                        type="text"
                        name="lastName"
                        tabIndex="2"
                        onChange={handleChange}
                        message={message.lastName}
                        formDataValue={formData.lastName}
                        id="lastName"
                    />
                </label>
            </div>

            <div className="inputsLine">
                <label className="inputsLabel" htmlFor="country">
                    <p className="overInputText">Country / Region <span>*</span></p>
                    <G_Input
                        placeholder=""
                        type="text"
                        name="country"
                        tabIndex="3"
                        onChange={handleChange}
                        message={message.country}
                        formDataValue={formData.country}
                        id="country"
                    />
                </label>
                <label className="inputsLabel" htmlFor="town">
                    <p className="overInputText">Town / City <span>*</span></p>
                    <G_Input
                        placeholder=""
                        type="text"
                        name="town"
                        tabIndex="4"
                        onChange={handleChange}
                        message={message.town}
                        formDataValue={formData.town}
                        id="town"
                    />
                </label>
            </div>

            <div className="inputsLine">
                <label className="inputsLabel" htmlFor="country">
                    <p className="overInputText">Street Address <span>*</span></p>
                    <G_Input
                        placeholder="House number and street name"
                        type="text"
                        name="street"
                        tabIndex="5"
                        onChange={handleChange}
                        message={message.street}
                        formDataValue={formData.street}
                        id="street"
                    />
                </label>
                <label className="inputsLabel" htmlFor="aprt">
                    <p className="overInputText"><span></span></p>
                    <G_Input
                        placeholder="Appartment, suite, unit, etc. (optional)"
                        type="text"
                        name="aprt"
                        tabIndex="6"
                        onChange={handleChange}
                        message={message.aprt}
                        formDataValue={formData.aprt}
                        id="aprt"
                    />
                </label>
            </div>

            <div className="inputsLine">
                <label className="inputsLabel" htmlFor="state">
                    <p className="overInputText">State <span>*</span></p>
                    <G_Input
                        placeholder="Select a state"
                        type="text"
                        name="state"
                        tabIndex="7"
                        onChange={handleChange}
                        message={message.state}
                        formDataValue={formData.state}
                        id="state"
                    />
                </label>
                <label className="inputsLabel" htmlFor="zip">
                    <p className="overInputText">Zip <span>*</span></p>
                    <G_Input
                        placeholder=""
                        type="text"
                        name="zip"
                        tabIndex="8"
                        onChange={handleChange}
                        message={message.zip}
                        formDataValue={formData.zip}
                        id="zip"
                    />
                </label>
            </div>

            <div className="inputsLine">
                <label className="inputsLabel" htmlFor="email">
                    <p className="overInputText">Email address <span>*</span></p>
                    <G_Input
                        placeholder="example@example.com"
                        type="email"
                        name="email"
                        tabIndex="9"
                        onChange={handleChange}
                        message={message.email}
                        formDataValue={formData.email}
                        id="email"
                    />
                </label>
                <label className="inputsLabel" htmlFor="phone">
                    <p className="overInputText">Phone Number <span>*</span></p>
                    <G_Input
                        placeholder=""
                        type="text"
                        name="phone"
                        tabIndex="10"
                        onChange={handleChange}
                        message={message.phone}
                        formDataValue={formData.phone}
                        id="phone"
                    />
                </label>
            </div>

           <div className="buttonsCont">
               <SubmitButton
                   loading={btnLoading}
                   text={"Save Address"}
                   tabIndex={"11"}
                   width={"100"}
               />
           </div>


        </form>
    </div>
}

export default NewAddress;