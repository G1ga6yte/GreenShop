import React, {useState} from 'react';
import "./profileAddNewProduct.scss"
import {Link} from "react-router-dom";
import G_Input from "../../../../../components/gInput/gInput";
import {Status} from "../../../../../source/status";
import SelectBlock from "../../../../../components/selectBlock/selectBlock";
import {categories} from "./categories";
import SubmitButton from "../../../../../components/submitButton/submitButton";
import {BsImageFill} from "react-icons/bs";
import axios from "axios";
import {useCartContext} from "../../../../../CartContext";
import {useNavigate} from "react-router";
import axiosInstance from "../../../../../axiosInstance";

function ProfileAddNewProduct() {
    const {accountInfo} = useCartContext()
    const navigate = useNavigate();

    const [btn1, setBtn1] = useState(false)
    const [messagePrg, setMessagePrg] = useState("")
    const [formData, setFormData] = React.useState({
        productName: "", productPrice: "", productShortDesc: "",
        productSKU: "", productCategory: "", productSizes: [], productTags: [],
        productDescription: "", productAltDesc: [], productImages: []
    })

    const [message, setMessage] = React.useState({
        productName: "", productPrice: "", productShortDesc: "",
        productSKU: "", productCategory: "", productSizes: "", productTags: "",
        productDescription: "", productAltDesc: "", productImages: ""
    })
    const handleMessageZero = () => {
        setMessage({
            productName: "", productPrice: "", productShortDesc: "",
            productSKU: "", productCategory: "", productSizes: "", productTags: "",
            productDescription: "", productAltDesc: "", productImages: ""
        })
        setMessagePrg("")
    }


    /////////////// Check Sizes ////////////////////
    const sizes = [
        "XS", "S", "M", "L", "XL", "XXl", "3XL"
    ]
    const handleSizeChange = (size) => {
        handleMessageZero()
        setFormData(prevData => {
            const updatedSizes = prevData.productSizes.includes(size)
                ? prevData.productSizes.filter((s) => s !== size) // Remove the size
                : [...prevData.productSizes, size]; // Add the size

            return {
                ...prevData,
                productSizes: updatedSizes,
            };
        });
    };
    ////////////////// Alt Desc //////////////////////
    const handleAddPrg = () => {
        handleMessageZero()
        setFormData(prev => {
            const updatedPrg = [...prev.productAltDesc, {name: "", prg: "", id: formData.productAltDesc.length + 1}]
            return {
                ...prev,
                productAltDesc: updatedPrg
            }
        });
    }
    const handleDeletePrg = (id) => {
        handleMessageZero()
        setFormData(prev => {
            const updatedPrg = prev.productAltDesc.filter((s) => s.id !== id);
            return {
                ...prev,
                productAltDesc: updatedPrg
            }
        })
    }

    ////////////////// Inputs ///////////////////
    const handleChange = (e) => {
        handleMessageZero()
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    ////////// Category /////////////////////////
    const handleCategory = (type) => {
        handleMessageZero()
        setFormData({...formData, ["productCategory"]: type})
    }

    ///////////// Tags //////////////////
    const [tagVal, setTagVal] = useState("");
    const handleTag = (e) => {
        e.preventDefault()
        handleMessageZero()

        if (tagVal.length <= 35 && tagVal.length > 2) {
            if (formData.productTags.length <= 10) {
                setFormData(prevData => {
                    const updatedTags = prevData.productTags.includes(tagVal)
                        ? prevData.productTags.filter((s) => s !== "")  // skips
                        : [...prevData.productTags, tagVal]; // Add the tag

                    return {
                        ...prevData,
                        productTags: updatedTags,
                    };
                });
            }
        }
        setTagVal("")
    }
    const handleRemoveTag = (tag) => {
        handleMessageZero()
        setFormData(prevData => {
            const updatedTags = prevData.productTags.includes(tag)
                ? prevData.productTags.filter((s) => s !== tag)  // skips
                : [...prevData.productTags, tag]; // Add the tag

            return {
                ...prevData,
                productTags: updatedTags,
            };
        });
    }

    ////////////Main image ////////////////////////
    const [loading, setLoading] = useState(false);
    const handleAddImages = (e) => {
        handleMessageZero()
        const files = Array.from(e.target.files); // Convert FileList to Array
        if (files.length > 0 && files.length <= 4) {
            setFormData((prev) => ({
                ...prev,
                productImages: files, // Save images directly to productImages
            }));
        }
    }

    function createImage(img) {
        let imgBlob = new Blob([img], {type: img.type});
        return (
            <img className={`img ${loading && "blurImg"}`} src={URL.createObjectURL(imgBlob)} alt=""/>
        )
    }

    const handlePutImage = (index) => {
        handleMessageZero()
        setLoading(true)
        setFormData((prev) => {
            const updatedImages = [...prev.productImages];
            const [selectedImage] = updatedImages.splice(index, 1); // Remove the selected image
            updatedImages.unshift(selectedImage); // Add the selected image to the start of the array
            return {
                ...prev,
                productImages: updatedImages,
            };
        });
        setTimeout(() => {
            setLoading(false)
        }, 200)
    }


    ////////////////// Submit ////////////////////
    const handleAddNewProduct = async (e) => {
        e.preventDefault();
        setBtn1(true)
        handleMessageZero()

        const data = new FormData();
        data.append("userID", accountInfo.userID)
        data.append("productName", formData.productName);
        data.append("productPrice", formData.productPrice);
        data.append("productShortDesc", formData.productShortDesc);
        data.append("productSKU", formData.productSKU);
        data.append("productCategory", formData.productCategory);
        data.append("productDescription", formData.productDescription);
        data.append("productSizes", JSON.stringify(formData.productSizes)); // Convert array to JSON
        data.append("productTags", JSON.stringify(formData.productTags)); // Convert array to JSON
        data.append("productAltDesc", JSON.stringify(formData.productAltDesc)); // Convert array to JSON

        // Add images to FormData
        formData.productImages.forEach((image) => {
            data.append("productImages", image); // Add each image
        });

        axiosInstance.post("/products/newProduct", data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(res => {
                if (res.data.status === 5) {
                    const updatedMessage = Object.keys(message).reduce((acc, key) => {
                        if (Array.isArray(formData[key])) {
                            // Check if array is empty
                            acc[key] = formData[key].length === 0 ? " " : message[key];
                        } else {
                            // Check for empty string in other cases
                            acc[key] = formData[key] === "" ? " " : message[key];
                        }
                        return acc;
                    }, {});

                    setMessage(updatedMessage);
                    setMessagePrg(Status[5])
                    setBtn1(false)

                } else if (res.data.status === 27) {
                    setMessage(Status[27])
                    setMessage({...message, ["productImages"]: " "});
                    setBtn1(false)
                } else if (res.data.status === 0) {
                    setTimeout(()=>{
                        setFormData({
                            productName: "", productPrice: "", productShortDesc: "",
                            productSKU: "", productCategory: "", productSizes: [], productTags: [],
                            productDescription: "", productAltDesc: [], productImages: []
                        })
                        navigate("/profile/products")
                        setBtn1(false)
                    }, 1000)
                }
            })
            .catch(err => {
                console.log(err)
                setBtn1(false)
            })


    }


    // 5 - "Please fill up all fields!"
    return (
        <div className="ProfileAddNewProducts">
            <p className="miniHeader"><Link className="productsLink" to="/profile/products">Products</Link> <span>/New product</span>
            </p>

            <form onSubmit={handleAddNewProduct}>

                <div className="headCont">

                    <div className="inputsCont">
                        <G_Input
                            type="text"
                            name="productName"
                            tabIndex={"1"}
                            onChange={handleChange}
                            message={message.productName.length > 0 ? " " : ""}
                            formDataValue={formData.productName}
                            placeholder={"Product Name"}
                            id={"productName"}
                        />

                        <G_Input
                            type="number"
                            name="productPrice"
                            tabIndex={"2"}
                            onChange={handleChange}
                            message={message.productPrice.length > 0 ? " " : ""}
                            formDataValue={formData.productPrice}
                            placeholder={"Product Price ($)"}
                            id={"productPrice"}
                        />

                        <textarea
                            className={`textarea box-shadow ${message.productShortDesc.length > 0 ? "redInput" : ""}`}
                            name="productShortDesc"
                            id="productShortDesc"
                            cols="30"
                            rows="10"
                            placeholder={"Product Short Description"}
                            onChange={handleChange}
                            tabIndex="3"
                            value={formData.productShortDesc}
                        ></textarea>
                    </div>

                    <div className="imagesCont">

                        <label htmlFor="images"
                               className={`mainImage box-shadow ${message.productImages.length > 0 ? "redInput" : ""}`}>


                            {formData.productImages[0] ? createImage(formData.productImages[0])
                                :
                                <BsImageFill className="mainIcon" fill={"white"}/>
                            }

                        </label>

                        <div className="altImagesCont">


                            {formData.productImages[1] ?
                                <div onClick={() => {
                                    handlePutImage(1)
                                }} className={`altImage box-shadow ${loading && "blurImg"}`}>
                                    {formData.productImages[1] ? createImage(formData.productImages[1]) : ""}
                                </div>
                                :
                                <label htmlFor="images" className={`altImage box-shadow ${loading && "blurImg"}`}>
                                    <BsImageFill className="altIcon" fill={"white"}/>
                                </label>}

                            {formData.productImages[2] ?
                                <div onClick={() => {
                                    handlePutImage(2)
                                }} className={`altImage box-shadow ${loading && "blurImg"}`}>
                                    {formData.productImages[2] ? createImage(formData.productImages[2]) : ""}
                                </div>
                                :
                                <label htmlFor="images" className={`altImage box-shadow ${loading && "blurImg"}`}>
                                    <BsImageFill className="altIcon" fill={"white"}/>
                                </label>}

                            {formData.productImages[3] ?
                                <div onClick={() => {
                                    handlePutImage(3)
                                }} className={`altImage box-shadow ${loading && "blurImg"}`}>
                                    {formData.productImages[3] ? createImage(formData.productImages[3]) : ""}
                                </div>
                                :
                                <label htmlFor="images" className={`altImage box-shadow ${loading && "blurImg"}`}>
                                    <BsImageFill className="altIcon" fill={"white"}/>
                                </label>}

                        </div>

                        <input multiple={true} accept="image/*" type="file" id="images" style={{display: "none"}}
                               onChange={handleAddImages}/>

                    </div>

                </div>

                <div className="nextCont">
                    <div className="leftCont">
                        <G_Input
                            type="number"
                            name="productSKU"
                            tabIndex={"4"}
                            onChange={handleChange}
                            message={message.productSKU.length > 0 ? " " : ""}
                            formDataValue={formData.productSKU}
                            placeholder={"SKU"}
                            id={"SKU"}
                        />

                        <SelectBlock
                            options={categories}
                            value={formData.productCategory}
                            onChange={handleCategory}
                            message={message.productCategory.length > 0 ? " " : ""}
                        />

                        <div className="sizes">
                            {sizes.map((size, index) => (
                                <button type="button" onClick={() => {
                                    handleSizeChange(size)
                                }} key={index}
                                        className={`sizeBtn box-shadow ${formData.productSizes.includes(size) ? "activeBtn" : ""} ${message.productSizes.length > 0 ? "redInput" : ""}`}>
                                    <span>{size}</span>
                                </button>
                            ))}
                        </div>

                    </div>
                    <div className="rightCont">

                        <form onSubmit={handleTag}>
                            <div className="inputsBlock">
                                <input
                                    type="text"
                                    name="tag"
                                    tabIndex={"5"}
                                    value={tagVal}
                                    placeholder={"Tag"}
                                    className={`input box-shadow ${message.productTags.length > 0 ? "redInput" : ""}`}
                                    onChange={(e) => setTagVal(e.target.value)}
                                />
                                <button onClick={handleTag} className="addBtn">Add</button>
                            </div>
                        </form>

                        <div className="tagsCont">
                            {formData.productTags.map((tag, index) => (
                                <button
                                    onClick={() => handleRemoveTag(tag)}
                                    key={index}
                                    className="tagBtn"
                                >#{tag}</button>
                            ))}
                        </div>


                    </div>
                </div>

                <div className="endCont">
                    <textarea
                        name="productDescription"
                        id="productDescription"
                        className={`textarea box-shadow ${message.productDescription.length > 0 ? "redInput" : ""}`}
                        placeholder={"Product Description"}
                        cols="30"
                        tabIndex="6"
                        rows="10"
                        value={formData.productDescription}
                        onChange={handleChange}
                    ></textarea>

                    {messagePrg.length > 0 && <p className="errorMessage">{messagePrg}</p>}

                    {formData.productAltDesc.map((el, index) => {
                        return (<div className="altDescBlock" key={index}>
                            <p className="num">Alternative Description {index + 1}</p>
                            <input
                                type="text"
                                name={`productAltDescName${index}`}
                                id={`productAltDescName${index}`}
                                className={`textarea box-shadow}`}
                                placeholder={`Name`}
                                value={formData.productAltDesc[index].name}
                                onChange={(e) => {
                                    setFormData((prev) => {
                                        const updatedAltDesc = [...prev.productAltDesc];
                                        updatedAltDesc[index] = {
                                            ...updatedAltDesc[index],
                                            name: e.target.value,
                                        };
                                        return {
                                            ...prev,
                                            productAltDesc: updatedAltDesc,
                                        };
                                    });
                                }}
                            />
                            <textarea
                                name={`productAltDescPrg${index}`}
                                id={`productAltDescPrg${index}`}
                                className={`textarea textarea100 box-shadow}`}
                                placeholder={`Description`}
                                value={formData.productAltDesc[index].prg}
                                onChange={(e) => {
                                    setFormData((prev) => {
                                        const updatedAltDesc = [...prev.productAltDesc];
                                        updatedAltDesc[index] = {
                                            ...updatedAltDesc[index],
                                            prg: e.target.value,
                                        };
                                        return {
                                            ...prev,
                                            productAltDesc: updatedAltDesc,
                                        };
                                    });
                                }}
                            ></textarea>

                            <button className="deleteBtn" onClick={() => {
                                handleDeletePrg(el.id)
                            }}>Delete "Alternative Description {index + 1}"
                            </button>
                        </div>)
                    })}

                    {formData.productAltDesc.length < 3 &&
                        <button
                            className="altBtn"
                            type="button"
                            onClick={handleAddPrg}
                        >
                            New Paragraph

                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5V11H5C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13H11V19C11 19.5523 11.4477 20 12 20C12.5523 20 13 19.5523 13 19V13H19C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11H13V5Z"
                                    fill="#46A358"/>
                            </svg>
                        </button>
                    }


                </div>

                <SubmitButton
                    width={100}
                    text={"Add new product"}
                    loading={btn1}
                    tabIndex="7"
                />


            </form>


        </div>
    )
}

export default ProfileAddNewProduct;