import React, { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { focusStyle, inputStyle, inputSmallSize, inputMiniSize } from "../common/stylesheet";
import '../assets/css/landing_page_common.css';
import { useLocation } from "react-router-dom";
const CustomInput = (Props) => {
    const [type, setType] = useState(Props.type ?? "text")
    const location = useLocation();

    return (
        <>
            {Props.type && Props.type != "otp" && Props.type != "textarea" &&
                <div className={Props.error && Props.error != "" ? "form_field row error" : "form_field row "} style={Props.disabled == true ? { opacity: 1 } : {}}>
                    <label htmlFor="" className={Props.error && Props.error != "" ? "txt-medium txt-danger" : "txt-medium txt-gray"}>{Props.title}</label>
                    <div className="df row-center fit-content" style={{ flexDirection: "row" }}>

                        {Props.type && Props.type == "number" && location.pathname.search("pricing/details") === -1 &&
                            <span style={{ paddingLeft: "10px", display: "flex", flexDirection: "row", alignItems: "center" }} className={Props.disabled == true ?"prefix typo-sub-headings txt-gray input-ele-color-disabled" :"prefix typo-sub-headings txt-gray input-ele-color"}>
                                +91  <svg style={{ marginLeft: "10px" }} width="1" height="20" viewBox="0 0 1 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect y="0.217377" width="1" height="32" rx="0.5" fill="#777777" />
                                </svg>
                            </span>}
                        <input
                            type={type}
                            disabled={Props.disabled == true ? true : false}
                            value={Props.value}
                            style={{borderRadius:"100px"}}
                            name={Props.name ?? ""}
                            onChange={(e) => { Props.onChange(e) }}
                            onInput={Props.onInput ? (e) => { Props.onInput(e) } : () => { }}
                            onBlur={Props.onBlur ? (e) => { Props.onBlur(e) } : () => { }}
                            autoFocus={Props.autoFocus ? Props.autoFocus : false}
                            placeholder={Props.placeholder ?? ""}
                            className={Props.disabled == true ? "df row-center   input-ele-color-disabled fit-content flex-1 typo-sub-headings " : "df row-center   input-ele-color fit-content flex-1 typo-sub-headings "}
                            
                            
                            
                        />
                        {Props.external_element ? Props.external_element : null

                        }

                        {Props.type && Props.type == "password" && type == "text" &&
                            <button className="open-eye center df" onClick={(e) => { e.preventDefault(); setType("password") }}>
                                <svg _ngcontent-jlj-c33="" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path _ngcontent-jlj-c33="" d="M21.2565 10.962C21.7305 11.582 21.7305 12.419 21.2565 13.038C19.7635 14.987 16.1815 19 11.9995 19C7.81752 19 4.23552 14.987 2.74252 13.038C2.51191 12.7411 2.38672 12.3759 2.38672 12C2.38672 11.6241 2.51191 11.2589 2.74252 10.962C4.23552 9.013 7.81752 5 11.9995 5C16.1815 5 19.7635 9.013 21.2565 10.962V10.962Z" stroke={Props.error && Props.error != "" ? "red" : "#777777"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path><path _ngcontent-jlj-c33="" d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke={Props.error && Props.error != "" ? "red" : "#777777"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                            </button>
                        }
                        {Props.type && Props.type == "password" && type == "password" &&
                            <button className="close-eye center df" onClick={(e) => { e.preventDefault(); setType("text") }}>
                                <svg _ngcontent-jlj-c33="" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path _ngcontent-jlj-c33="" d="M10.9402 6.08C11.2909 6.02624 11.6453 5.99949 12.0002 6C15.1802 6 18.1702 8.29 19.9102 12C19.6441 12.5646 19.3435 13.1123 19.0102 13.64C18.9044 13.8038 18.8487 13.995 18.8502 14.19C18.8524 14.4082 18.926 14.6198 19.0596 14.7923C19.1933 14.9648 19.3798 15.0889 19.5905 15.1455C19.8013 15.2022 20.0248 15.1883 20.227 15.1061C20.4291 15.0238 20.5988 14.8777 20.7102 14.69C21.1761 13.9579 21.5808 13.1887 21.9202 12.39C21.9738 12.2652 22.0015 12.1308 22.0015 11.995C22.0015 11.8592 21.9738 11.7248 21.9202 11.6C19.9002 6.91 16.1002 4 12.0002 4C11.5309 3.99764 11.0623 4.0378 10.6002 4.12C10.4689 4.14233 10.3432 4.1903 10.2304 4.26118C10.1177 4.33206 10.0199 4.42446 9.94287 4.5331C9.8658 4.64175 9.81088 4.76451 9.78125 4.89438C9.75162 5.02425 9.74786 5.15868 9.77018 5.29C9.79251 5.42132 9.84048 5.54696 9.91136 5.65975C9.98224 5.77253 10.0746 5.87024 10.1833 5.94732C10.2919 6.02439 10.4147 6.07931 10.5446 6.10894C10.6744 6.13857 10.8089 6.14233 10.9402 6.12V6.08ZM3.71019 2.29C3.61695 2.19676 3.50626 2.1228 3.38443 2.07234C3.26261 2.02188 3.13204 1.99591 3.00019 1.99591C2.86833 1.99591 2.73776 2.02188 2.61594 2.07234C2.49411 2.1228 2.38342 2.19676 2.29019 2.29C2.10188 2.47831 1.99609 2.7337 1.99609 3C1.99609 3.2663 2.10188 3.5217 2.29019 3.71L5.39019 6.8C3.97576 8.16153 2.85004 9.79399 2.08019 11.6C2.02512 11.7262 1.9967 11.8623 1.9967 12C1.9967 12.1377 2.02512 12.2738 2.08019 12.4C4.10019 17.09 7.90019 20 12.0002 20C13.7973 19.9876 15.552 19.4525 17.0502 18.46L20.2902 21.71C20.3831 21.8037 20.4937 21.8781 20.6156 21.9289C20.7375 21.9797 20.8682 22.0058 21.0002 22.0058C21.1322 22.0058 21.2629 21.9797 21.3848 21.9289C21.5066 21.8781 21.6172 21.8037 21.7102 21.71C21.8039 21.617 21.8783 21.5064 21.9291 21.3846C21.9798 21.2627 22.006 21.132 22.006 21C22.006 20.868 21.9798 20.7373 21.9291 20.6154C21.8783 20.4936 21.8039 20.383 21.7102 20.29L3.71019 2.29ZM10.0702 11.48L12.5202 13.93C12.3512 13.9785 12.176 14.002 12.0002 14C11.4698 14 10.961 13.7893 10.586 13.4142C10.2109 13.0391 10.0002 12.5304 10.0002 12C9.99814 11.8242 10.0217 11.649 10.0702 11.48ZM12.0002 18C8.82018 18 5.83019 15.71 4.10019 12C4.74627 10.5738 5.66326 9.28658 6.80019 8.21L8.57019 10C8.15443 10.7588 7.99593 11.6319 8.11844 12.4885C8.24096 13.345 8.6379 14.1387 9.24971 14.7505C9.86152 15.3623 10.6552 15.7592 11.5117 15.8817C12.3682 16.0043 13.2414 15.8458 14.0002 15.43L15.5902 17C14.5013 17.6409 13.2636 17.9856 12.0002 18Z" fill={Props.error && Props.error != "" ? "red" : "#777777"}></path></svg>
                            </button>
                        }
                    </div>
                </div>}
            {Props.type === "textarea" &&
                <div className={Props.error && Props.error != "" ? "form_field row error" : "form_field row "} style={Props.disabled == true ? { opacity: 1, height: "auto" } : { height: "auto" }}>
                    <label htmlFor="" className={Props.error && Props.error != "" ? "txt-medium txt-danger" : "txt-medium txt-gray"}>{Props.title}</label>
                    <div className="df row-center fit-content" style={{ flexDirection: "row" }}>
                        <textarea name="" id="" cols="30" rows="3" style={{ resize: "none" }}
                            disabled={Props.disabled == true ? true : false}
                            value={Props.value}
                            name={Props.name ?? ""}
                            onChange={(e) => { Props.onChange(e) }}
                            onInput={Props.onInput ? (e) => { Props.onInput(e) } : () => { }}
                            onBlur={Props.onBlur ? (e) => { Props.onBlur(e) } : () => { }}
                            placeholder={Props.placeholder ?? ""}
                            className={Props.disabled == true ? "df row-center radius-primary input-ele-color-disabled fit-content typo-sub-headings " : "df row-center radius-primary input-ele-color fit-content typo-sub-headings "}

                        />


                        {Props.type && Props.type == "password" && type == "text" &&
                            <button className="open-eye center df" onClick={(e) => { e.preventDefault(); setType("password") }}>
                                <svg _ngcontent-jlj-c33="" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path _ngcontent-jlj-c33="" d="M21.2565 10.962C21.7305 11.582 21.7305 12.419 21.2565 13.038C19.7635 14.987 16.1815 19 11.9995 19C7.81752 19 4.23552 14.987 2.74252 13.038C2.51191 12.7411 2.38672 12.3759 2.38672 12C2.38672 11.6241 2.51191 11.2589 2.74252 10.962C4.23552 9.013 7.81752 5 11.9995 5C16.1815 5 19.7635 9.013 21.2565 10.962V10.962Z" stroke={Props.error && Props.error != "" ? "red" : "#777777"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path><path _ngcontent-jlj-c33="" d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke={Props.error && Props.error != "" ? "red" : "#777777"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                            </button>
                        }
                        {Props.type && Props.type == "password" && type == "password" &&
                            <button className="close-eye center df" onClick={(e) => { e.preventDefault(); setType("text") }}>
                                <svg _ngcontent-jlj-c33="" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path _ngcontent-jlj-c33="" d="M10.9402 6.08C11.2909 6.02624 11.6453 5.99949 12.0002 6C15.1802 6 18.1702 8.29 19.9102 12C19.6441 12.5646 19.3435 13.1123 19.0102 13.64C18.9044 13.8038 18.8487 13.995 18.8502 14.19C18.8524 14.4082 18.926 14.6198 19.0596 14.7923C19.1933 14.9648 19.3798 15.0889 19.5905 15.1455C19.8013 15.2022 20.0248 15.1883 20.227 15.1061C20.4291 15.0238 20.5988 14.8777 20.7102 14.69C21.1761 13.9579 21.5808 13.1887 21.9202 12.39C21.9738 12.2652 22.0015 12.1308 22.0015 11.995C22.0015 11.8592 21.9738 11.7248 21.9202 11.6C19.9002 6.91 16.1002 4 12.0002 4C11.5309 3.99764 11.0623 4.0378 10.6002 4.12C10.4689 4.14233 10.3432 4.1903 10.2304 4.26118C10.1177 4.33206 10.0199 4.42446 9.94287 4.5331C9.8658 4.64175 9.81088 4.76451 9.78125 4.89438C9.75162 5.02425 9.74786 5.15868 9.77018 5.29C9.79251 5.42132 9.84048 5.54696 9.91136 5.65975C9.98224 5.77253 10.0746 5.87024 10.1833 5.94732C10.2919 6.02439 10.4147 6.07931 10.5446 6.10894C10.6744 6.13857 10.8089 6.14233 10.9402 6.12V6.08ZM3.71019 2.29C3.61695 2.19676 3.50626 2.1228 3.38443 2.07234C3.26261 2.02188 3.13204 1.99591 3.00019 1.99591C2.86833 1.99591 2.73776 2.02188 2.61594 2.07234C2.49411 2.1228 2.38342 2.19676 2.29019 2.29C2.10188 2.47831 1.99609 2.7337 1.99609 3C1.99609 3.2663 2.10188 3.5217 2.29019 3.71L5.39019 6.8C3.97576 8.16153 2.85004 9.79399 2.08019 11.6C2.02512 11.7262 1.9967 11.8623 1.9967 12C1.9967 12.1377 2.02512 12.2738 2.08019 12.4C4.10019 17.09 7.90019 20 12.0002 20C13.7973 19.9876 15.552 19.4525 17.0502 18.46L20.2902 21.71C20.3831 21.8037 20.4937 21.8781 20.6156 21.9289C20.7375 21.9797 20.8682 22.0058 21.0002 22.0058C21.1322 22.0058 21.2629 21.9797 21.3848 21.9289C21.5066 21.8781 21.6172 21.8037 21.7102 21.71C21.8039 21.617 21.8783 21.5064 21.9291 21.3846C21.9798 21.2627 22.006 21.132 22.006 21C22.006 20.868 21.9798 20.7373 21.9291 20.6154C21.8783 20.4936 21.8039 20.383 21.7102 20.29L3.71019 2.29ZM10.0702 11.48L12.5202 13.93C12.3512 13.9785 12.176 14.002 12.0002 14C11.4698 14 10.961 13.7893 10.586 13.4142C10.2109 13.0391 10.0002 12.5304 10.0002 12C9.99814 11.8242 10.0217 11.649 10.0702 11.48ZM12.0002 18C8.82018 18 5.83019 15.71 4.10019 12C4.74627 10.5738 5.66326 9.28658 6.80019 8.21L8.57019 10C8.15443 10.7588 7.99593 11.6319 8.11844 12.4885C8.24096 13.345 8.6379 14.1387 9.24971 14.7505C9.86152 15.3623 10.6552 15.7592 11.5117 15.8817C12.3682 16.0043 13.2414 15.8458 14.0002 15.43L15.5902 17C14.5013 17.6409 13.2636 17.9856 12.0002 18Z" fill={Props.error && Props.error != "" ? "red" : "#777777"}></path></svg>
                            </button>
                        }
                    </div>
                </div>}


            {

                Props.type && Props.type == "otp" &&

                <div className={Props.error && Props.error != "" ? "form_field row error" : "form_field row "} style={Props.disabled == true ? { opacity: 1 } : {}}>
                    <label htmlFor="" className={Props.error && Props.error != "" ? "txt-medium txt-danger" : "txt-medium txt-gray"}>{Props.title}</label>
                    <div className="df row-center fit-content" style={{ flexDirection: "row" }}>
                        <input
                            type={'number'}
                            autoFocus={Props.autoFocus ? Props.autoFocus : false}
                            disabled={Props.disabled == true ? true : false}
                            value={Props.value}
                            name={Props.name ?? ""}
                            style={{borderRadius:"100px"}}
                            onChange={(e) => { Props.onChange(e) }}
                            onInput={Props.onInput ? (e) => { Props.onInput(e) } : () => { }}
                            onBlur={Props.onBlur ? (e) => { Props.onBlur(e) } : () => { }}

                            placeholder={Props.placeholder ?? ""}
                            className={Props.disabled == true ? "df row-center  input-ele-color-disabled fit-content flex-1 typo-sub-headings " : "df row-center  input-ele-color fit-content flex-1 typo-sub-headings "}
                            
                        />
                    </div>
                    {/* <OtpInput
                    value={Props.value}
                    onChange={(e) => { Props.onChange(e) }}
                    numInputs={4}
                    isDisabled={Props.disabled ? Props.disabled : false}
                    shouldAutoFocus={true}
                    isInputNum={true}
                    focusStyle={focusStyle}
                    inputStyle={{ ...(window.innerWidth > 550 ? inputStyle : (window.innerWidth < 365 ? inputMiniSize : inputSmallSize)), fontWeight: "bold", fontSize: "20px" }}
                    separator={<span style={{ margin: "0px 5px" }}> </span>}
                /> */}
                </div>


            }
            {Props.error && Props.error != "" && <div className="err_box" >   <span className="txt-small txt-danger">{Props.error}</span> </div>}
        </>
    )
}
export default CustomInput;