import React, { useState } from "react";
import { isApp } from "../../../common/helper";
import PremiumPopUp from "../../../components/premiumPop";


const AcadVideoPage = (props) => {
    let [isVisible, changeVisibility] = useState(false);
    let [popupContent, setContent] = useState('');

    const setPopUp = (data,topic) => {
        changeVisibility(!isVisible);
        setContent(data);
    }
    return (
        <>
        {isVisible && <PremiumPopUp changeVisibility={changeVisibility} description={popupContent}></PremiumPopUp>}
            <div className="news_container enter_animation" id="news_container" style={{ height: "90%" }}>
                <div className="outer-main-container">
                    <div className="inner-main-container" style={{ paddingBottom: "30px" }}>

                        {
                            props.data.length > 0 &&
                            <div className="content-grid">
                                {props.data.map(function (video, keyIndex) {
                                    if (video.user_has_access) {
                                        return (
                                            <button onClick={() => { props.openPopUp(video) }} className="activity-outer-grid" key={video.uuid}>
                                                <div className="activity-grid-item" style={{ background: "#E5E5E5", overflow: "hidden" }}>
                                                    <img src={video.thumbnail} className="fit-content" alt="" />
                                                </div>

                                            </button>


                                        )
                                    } else {
                                        return (

                                            <button className="activity-outer-grid" key={video.uuid} 
                                                onClick={() => { setPopUp(isApp() ? "This content is available only for exclusive members." : "This content is for our premium users. You may contact us on +91 9880678169 or namaskar@summachar.in") }}
                                            >

                                                <div className="activity-grid-item" style={{ background: "#E5E5E5", overflow: "hidden", position: "relative" }}>
                                                    <div style={{ position: "absolute", top: "0px", right: "10px" }}>
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M0 0H24V20C24 22.2091 22.2091 24 20 24H4C1.79086 24 0 22.2091 0 20V0Z" fill="#ECC249" />
                                                            <path d="M16.1668 9.50002V7.83335C16.1668 6.72829 15.7278 5.66848 14.9464 4.88708C14.165 4.10567 13.1052 3.66669 12.0002 3.66669C10.8951 3.66669 9.83529 4.10567 9.05388 4.88708C8.27248 5.66848 7.8335 6.72829 7.8335 7.83335V9.50002C7.17045 9.50002 6.53457 9.76341 6.06573 10.2323C5.59689 10.7011 5.3335 11.337 5.3335 12V17.8334C5.3335 18.4964 5.59689 19.1323 6.06573 19.6011C6.53457 20.07 7.17045 20.3334 7.8335 20.3334H16.1668C16.8299 20.3334 17.4658 20.07 17.9346 19.6011C18.4034 19.1323 18.6668 18.4964 18.6668 17.8334V12C18.6668 11.337 18.4034 10.7011 17.9346 10.2323C17.4658 9.76341 16.8299 9.50002 16.1668 9.50002ZM9.50016 7.83335C9.50016 7.17031 9.76355 6.53443 10.2324 6.06559C10.7012 5.59675 11.3371 5.33335 12.0002 5.33335C12.6632 5.33335 13.2991 5.59675 13.7679 6.06559C14.2368 6.53443 14.5002 7.17031 14.5002 7.83335V9.50002H9.50016V7.83335ZM17.0002 17.8334C17.0002 18.0544 16.9124 18.2663 16.7561 18.4226C16.5998 18.5789 16.3878 18.6667 16.1668 18.6667H7.8335C7.61248 18.6667 7.40052 18.5789 7.24424 18.4226C7.08796 18.2663 7.00016 18.0544 7.00016 17.8334V12C7.00016 11.779 7.08796 11.567 7.24424 11.4108C7.40052 11.2545 7.61248 11.1667 7.8335 11.1667H16.1668C16.3878 11.1667 16.5998 11.2545 16.7561 11.4108C16.9124 11.567 17.0002 11.779 17.0002 12V17.8334Z" fill="#18181B" />
                                                        </svg>
                                                    </div>

                                                    <img src={video.thumbnail} className="fit-content" alt="" />
                                                </div>
                                                <div className="activity-grid-item txt-medium" style={{ minHeight: "0px", height: "auto", display: "block" }}>{video.title} </div>

                                            </button>
                                        )
                                    }

                                })}
                            </div>
                        }

                    </div>
                    {props.data && props.data.length <= 0 && <h1 className="fit-content df center ">Section available with Humanities course subscription!</h1>}
                </div>


            </div>

        </>
    )
}
export default AcadVideoPage;
