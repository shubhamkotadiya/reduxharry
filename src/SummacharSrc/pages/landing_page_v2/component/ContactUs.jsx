import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import apiUrl from "../../../common/apiUrl";
import CustomInput from "../../../components/CustomInput";

import Footer from "../component/Footer";

const ContactUs = () => {
    const defaultVal = {
        name: "",
        email: "",
        message: ""
    }
    const [loading, setLoading] = useState(false)
    const [contactUsData, setContactUsData] = useState(defaultVal);
    const submitForm = async (e) => {
        e.preventDefault();
        setLoading(true)
        if (contactUsData.name === "") {
            toast.error("Name is a required Field.")
            setLoading(false)
            return 0;
        }
        if (contactUsData.email === "" || !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(contactUsData.email)) {
            toast.error("Please enter valid Email")
            setLoading(false)
            return 0;
        }
        if (contactUsData.message === "") {
            toast.error("Please enter a smaller message.")
            setLoading(false)
            return 0;
        }
        await axios({
            url: apiUrl.contactUsUrl,
            method: "post",
            data: {
                name: contactUsData.name,
                email: contactUsData.email,
                message: contactUsData.message
            }
        }).then(() => {
            toast.success("We have received your message and will revert within 24 hours")
        }).catch(() => {
            toast.error("Oops! Something went wrong!")
        })

        setLoading(false)
        return 1;
    }
    return (
        <>
            <div className="landing_page_container df row center" style={{ marginTop: "-10px" }}>
                <form onSubmit={submitForm} className="contact_us_form ">
                    <span className="df font-normal landing_page_content center" >For queries about subscriptions and scholarships, write to us!</span>
                    <span className="line-margin-small df center landing_page_content font-normal" >We will get back to you within 24 hours.</span>
                    <div className="custom-row df column ">
                        <CustomInput
                            disabled={false}
                            type='text'
                            value={contactUsData.name}
                            // error= {props.signin.numbererr}
                            placeholder={"Enter Full Name"}
                            name='Name'
                            title='Name'
                            onChange={e => {
                                setContactUsData({ ...contactUsData, name: e.target.value })
                            }}
                            onBlur={e => {
                                // props.setLoginDetails({...props.loginDetails,emailErr:props.validate(e.target.value,{required:true,email:true},"Email").message})
                            }}
                        />
                    </div>

                    <div className="custom-row df column">
                        <CustomInput
                            disabled={false}
                            type='email'
                            value={contactUsData.email}
                            // error= {props.signin.numbererr}
                            // placeHolder="jsbfisdf"
                            placeholder={"Enter Email Address"}
                            name='Email'
                            title='Email'
                            onChange={e => {
                                setContactUsData({ ...contactUsData, email: e.target.value })
                            }}
                            onBlur={e => {
                                // props.setLoginDetails({...props.loginDetails,emailErr:props.validate(e.target.value,{required:true,email:true},"Email").message})
                            }}
                        />
                    </div>
                    <div className="custom-row df column">
                        <CustomInput
                            disabled={false}
                            type='textarea'
                            value={contactUsData.message}
                            // error= {props.signin.numbererr}
                            name='Message'
                            title='Message'
                            placeholder={"Enter Your Message"}
                            onChange={e => {
                                setContactUsData({ ...contactUsData, message: e.target.value })
                            }}
                            onBlur={e => {
                                // props.setLoginDetails({...props.loginDetails,emailErr:props.validate(e.target.value,{required:true,email:true},"Email").message})
                            }}
                        />
                    </div>
                    {!loading && <button className="btn row btn-primary line-margin landing_page_btn_priamry df center radius-primary">
                        Send
                    </button>}
                    {loading && <button disabled className="btn disabled line-margin landing_page_btn_priamry row btn-primary df center radius-primary">
                        Send
                    </button>}
                </form>
            </div>
            {/* <Footer /> */}
        </>
    )
}
export default ContactUs;