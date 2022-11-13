import { useState } from "react";

const TestimonialCard = (props) => {
    const cardColor = props.cardColor ? props.cardColor : "#F44174";
    const margin_h = props.margin_h ? "0px 32px" : "0px";
    const max_limit = 300;
    const [contentLength, setContentLength] = useState(max_limit);
    return (
        <>
            <div className="radius-primary common-card testimonial_card df fit-content p-relative" style={{ margin: margin_h }}>
                <div className="df fit-content p-primary inner-padding p-relative column flex-1 space-between" style={{ height: "100%", zIndex: 1 }}>
                    <div className="row df column">
                        <div className="df row">
                            {/* {//quate} */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="45" height="32" viewBox="0 0 45 32" fill="none">
                                <g clipPath="url(#clip0_974:536)">
                                    <path d="M-0.00481796 13.6131C0.686474 11.5448 1.37756 9.47555 2.06843 7.40552C2.7618 5.31833 3.45247 3.23031 4.14044 1.14145C4.42302 0.287994 4.80518 0.0062294 5.69647 0.00309181C6.89088 -0.00193024 8.08528 0.00309181 9.27907 0.00309181C10.4554 0.00309181 10.9023 0.44927 10.9023 1.62527C10.9023 5.09304 10.9023 8.56082 10.9023 12.0286V12.5814H11.4195C13.4918 12.5814 15.5636 12.5814 17.6349 12.5814C18.7553 12.5814 19.2377 13.0709 19.2383 14.2011C19.2383 19.5979 19.2383 24.9948 19.2383 30.3916C19.2401 31.4979 18.7572 31.9874 17.6636 31.9874C12.3544 31.9874 7.04523 31.9767 1.73606 32C0.933777 32.0037 0.340618 31.7841 -0.00668716 31.0298L-0.00481796 13.6131Z" fill={cardColor} />
                                    <path d="M35.8918 12.5798H36.437C38.5377 12.5798 40.6383 12.576 42.7389 12.5798C43.6557 12.5835 44.2066 13.1 44.2072 13.9767C44.2122 19.5191 44.2122 25.0613 44.2072 30.6033C44.2072 31.4492 43.6663 31.9839 42.8192 31.9839C37.3374 31.9885 31.8561 31.9885 26.3751 31.9839C25.5037 31.9839 24.9691 31.4517 24.9678 30.5713C24.9616 25.0581 24.9631 19.545 24.9722 14.0319C24.9836 13.7425 25.0398 13.4566 25.139 13.1847C26.4585 9.16848 27.7832 5.15601 29.1131 1.1473C29.4 0.278786 29.7853 0.00329781 30.7102 0.000787735C31.9189 -0.00255966 33.1274 -0.00255966 34.3358 0.000787735C35.4138 0.00392532 35.8918 0.480227 35.8918 1.56963C35.8951 5.05204 35.8951 8.53404 35.8918 12.0156V12.5798Z" fill={cardColor} />
                                </g>
                                <defs>
                                    <clipPath id="clip0_974:536">
                                        <rect width="44.2105" height="32" fill="white" transform="translate(44.2109 32) rotate(-180)" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </div>
                        <div className="row df line-margin">
                            <p className="row txt-gray landing_page_card_content" style={{ fontWeight: "normal" }}  >
                                {props.content.slice(0, contentLength)}

                                {props.content.length >= max_limit &&
                                    <span className="pointer txt-primary underline" >
                                        {/* {contentLength < props.content.length &&
                                            <> */}
                                                <span>{contentLength < props.content.length?"...":""}</span>
                                                <div style={{color:"#5C56D4"}} className="landing_page_card_content" onClick={() => { if (props.content.length >= max_limit) { setContentLength(contentLength < props.content.length ? props.content.length : max_limit) } }}>
                                                {contentLength < props.content.length?"Read More":"Read Less"}
                                                </div>
                                            {/* </>
                                        } */}
                                    </span>}
                            </p>
                        </div>
                    </div>
                    <div className="custom-row testimonial_profile df row-center " style={{marginBottom:"-10px"}}>
                        <div className="rounded-small-img " style={{ background: "black", flex: "none", marginRight: "15px" }}>
                            <img src={props.profile_img} className="fit-content" alt="" />
                        </div>
                        <div className="df column ">
                            <h3 className="row landing_page_card_heading" style={{ color: "white" }}>{props.name}</h3>
                            <span className="landing_page_card_content row" style={{ color: "white" }}>{props.sub_details}</span>
                        </div>
                    </div>
                </div>
                <span className="testimonial_card_bottom">
                    <svg xmlns="http://www.w3.org/2000/svg" style={{ width: "100%" }} height="150" viewBox="0 0 376 121" fill="none">
                        <path d="M66.5 0.5C-39 0.499877 -130 106.667 -174 122.001C-152.333 192.667 -90.3 226.029 -75.5 224.829C-60.7 223.629 268.667 217.329 431.5 214.329C453 139.995 470.6 -4.0709 369 14.3291C242 37.3291 175.944 0.500128 66.5 0.5Z" fill={cardColor} />
                    </svg>
                </span>
            </div>
        </>
    );
}
export default TestimonialCard