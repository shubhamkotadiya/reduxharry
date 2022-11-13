import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import left_1 from '../../../assets/images/landing_page_new/left_1.png'
import middle from '../../../assets/images/landing_page_new/middle.png'
import left_2 from '../../../assets/images/landing_page_new/left_2.png'
import right_1 from '../../../assets/images/landing_page_new/right_1.png'
import right_2 from '../../../assets/images/landing_page_new/right_2.png'
import learn_better_web from '../../../assets/images/landing_page_new/learn_better_web.png';
import learn_better_mobile from '../../../assets/images/landing_page_new/learn_better_mobile.png';

const LearnBetter = () => {
    const OuterContainerref = useRef();
    const SmallOuterContainerRed = useRef();
    const [outercontainerSize, setOuterContainerSize] = useState({ height: 0, width: 0 })
    const [SmallOutercontainerSize, setSmallOuterContainerSize] = useState({ height: 0, width: 0 })
    // useEffect(() => {
    //     if (OuterContainerref) {
    //         setOuterContainerSize({ height: OuterContainerref.current.clientHeight, width: OuterContainerref.current.clientWidth })
    //     }
    //     if (SmallOuterContainerRed) {
    //         setSmallOuterContainerSize({ height: SmallOuterContainerRed.current.clientHeight, width: SmallOuterContainerRed.current.clientWidth })
    //     }
    // }, [OuterContainerref, SmallOuterContainerRed])
    // const onResize = () => {
    //     if (OuterContainerref && window.innerWidth > 650) {
    //         setOuterContainerSize({ height: OuterContainerref.current.clientHeight, width: OuterContainerref.current.clientWidth })
    //     }
    //     if (SmallOutercontainerSize && window.innerWidth < 650) {
    //         setSmallOuterContainerSize({ height: SmallOuterContainerRed.current.clientHeight, width: SmallOuterContainerRed.current.clientWidth })
    //     }
    // }
    // useEffect(() => {
    //     onResize();
    //     window.addEventListener('resize', onResize)
    //     return () => { return window.removeEventListener('resize', onResize) }
    // }, [])
    return (
        <>
            <div className="landing_page_container df row center column" >
                {/* <div className="df p-relative row learn_better_container " ref={OuterContainerref} style={{ alignItems: "flex-end", height: outercontainerSize.width * 0.26 }}>
                    <div className="fit-content df center" style={{ position: "absolute", zIndex: 4 }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="69" height="78" viewBox="0 0 69 78" fill="none">
                            <g filter="url(#filter0_dd_1067:1287)">
                                <path d="M63.8916 37.0294C65.2249 37.7992 65.2249 39.7237 63.8916 40.4935L7.80464 72.8753C6.47131 73.6451 4.80464 72.6828 4.80464 71.1432L4.80465 6.3796C4.80465 4.84 6.47131 3.87775 7.80465 4.64755L63.8916 37.0294Z" fill="white" />
                            </g>
                            <defs>
                                <filter id="filter0_dd_1067:1287" x="0.804688" y="0.376465" width="68.0869" height="76.7695" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                    <feOffset dx="2" dy="2" />
                                    <feGaussianBlur stdDeviation="1" />
                                    <feComposite in2="hardAlpha" operator="out" />
                                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1067:1287" />
                                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                    <feOffset dx="-2" dy="-2" />
                                    <feGaussianBlur stdDeviation="1" />
                                    <feComposite in2="hardAlpha" operator="out" />
                                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                                    <feBlend mode="normal" in2="effect1_dropShadow_1067:1287" result="effect2_dropShadow_1067:1287" />
                                    <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_1067:1287" result="shape" />
                                </filter>
                            </defs>
                        </svg>
                    </div>
                    <div className="df learn_better_tiles_box center" style={{ zIndex: 3 }}>
                        <div className="learn_better_tiles radius-primary df" style={{ width: outercontainerSize.width * 0.5 + "px", height: 0.7 * (outercontainerSize.width * 0.4) + "px" }}>
                            <img className="fit-content  df" src={middle} alt="" />
                        </div>
                    </div>
                    <div className="df learn_better_tiles_box space-between" style={{ zIndex: 2 }}>
                        <div className="learn_better_tiles radius-primary df" style={{ width: outercontainerSize.width * 0.2 + "px", height: 1.25 * (outercontainerSize.width * 0.2) + "px", marginLeft: outercontainerSize.width * 0.2 / 2 + "px" }}>
                            <img className="fit-content  df" src={left_1} alt="" />
                        </div>
                        <div className="learn_better_tiles radius-primary df" style={{ width: outercontainerSize.width * 0.2 + "px", height: 1.25 * (outercontainerSize.width * 0.2) + "px", marginRight: outercontainerSize.width * 0.2 / 2 + "px" }}>
                            <img className="fit-content  df" src={right_1} alt="" />
                        </div>
                    </div>
                    <div className="df learn_better_tiles_box space-between" style={{ zIndex: 1 }}>
                        <div className="learn_better_tiles radius-primary df" style={{ width: outercontainerSize.width * 0.17 + "px", height: 1.25 * (outercontainerSize.width * 0.17) + "px" }}>
                            <img className="fit-content  df" src={left_2} alt="" />
                        </div>
                        <div className="learn_better_tiles radius-primary df" style={{ width: outercontainerSize.width * 0.17 + "px", height: 1.25 * (outercontainerSize.width * 0.17) + "px" }}>
                            <img className="fit-content  df" src={right_2} alt="" />
                        </div>
                    </div>
                </div> */}

                <div className="df p-relative row learn_better_container">
                    <div className="learn_better_web_img">
                        <embed src={learn_better_web} alt="Learn Better" />
                    </div>
                </div>
                <div className="df p-relative row learn_better_small_container">
                    <div className="learn_better_mobile_img">
                        <embed src={learn_better_mobile} alt="Learn Better" />
                    </div>
                </div>

                {/* <div className="learn_better_container_small df p-relative row " ref={SmallOuterContainerRed} style={{ height: SmallOutercontainerSize.width * 1.05, marginTop: "-5px", marginBottom: "15px" }} >

                    <div className="learn_better_tiles_box_small df row space-between" style={{ zIndex: 1 }}>
                        <div className="learn_better_tile df row radius-primary" style={{ width: SmallOutercontainerSize.width * 0.3 + "px", height: 1.25 * (SmallOutercontainerSize.width * 0.3) + "px" }}>
                            <img className="df fit-content radius-primary" src={left_2} alt="" />
                        </div>
                        <div className="learn_better_tile df row radius-primary" style={{ width: SmallOutercontainerSize.width * 0.3 + "px", height: 1.25 * (SmallOutercontainerSize.width * 0.3) + "px" }}>
                            <img className="df fit-content radius-primary" src={right_1} alt="" />
                        </div>
                    </div>

                    <div className="learn_better_tiles_box_small df row center" style={{ zIndex: 1 }}>
                        <div className="learn_better_tile bg-primary center df row radius-primary" style={{ width: SmallOutercontainerSize.width * 0.9 + "px", height: 0.7 * (SmallOutercontainerSize.width * 0.73) + "px", marginLeft: outercontainerSize.width * 0.3 / 2 + "px" }}>
                            <img className="df fit-content radius-primary" src={middle} alt="" />
                            <div className="fit-content df" style={{ position: "absolute", zIndex: 1,width:"auto",height:"auto" }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="45" viewBox="0 0 69 78" fill="none">
                                    <g filter="url(#filter0_dd_1067:1287)">
                                        <path d="M63.8916 37.0294C65.2249 37.7992 65.2249 39.7237 63.8916 40.4935L7.80464 72.8753C6.47131 73.6451 4.80464 72.6828 4.80464 71.1432L4.80465 6.3796C4.80465 4.84 6.47131 3.87775 7.80465 4.64755L63.8916 37.0294Z" fill="white" />
                                    </g>
                                    <defs>
                                        <filter id="filter0_dd_1067:1287" x="0.804688" y="0.376465" width="68.0869" height="76.7695" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                            <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                            <feOffset dx="2" dy="2" />
                                            <feGaussianBlur stdDeviation="1" />
                                            <feComposite in2="hardAlpha" operator="out" />
                                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1067:1287" />
                                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                            <feOffset dx="-2" dy="-2" />
                                            <feGaussianBlur stdDeviation="1" />
                                            <feComposite in2="hardAlpha" operator="out" />
                                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                                            <feBlend mode="normal" in2="effect1_dropShadow_1067:1287" result="effect2_dropShadow_1067:1287" />
                                            <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_1067:1287" result="shape" />
                                        </filter>
                                    </defs>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="learn_better_tiles_box_small df row space-between" style={{ zIndex: 1 }}>
                        <div className="learn_better_tile df row radius-primary" style={{ width: SmallOutercontainerSize.width * 0.3 + "px", height: 1.25 * (SmallOutercontainerSize.width * 0.3) + "px" }}>
                            <img className="df fit-content radius-primary" src={left_1} alt="" />
                        </div>
                        <div className="learn_better_tile df row radius-primary" style={{ width: SmallOutercontainerSize.width * 0.3 + "px", height: 1.25 * (SmallOutercontainerSize.width * 0.3) + "px" }}>
                            <img className="df fit-content radius-primary" src={right_2} alt="" />
                        </div>
                    </div>


                </div> */}
                <div className="contact_us_form">
                    <Link to="/signin" className="line-margin-small row df center btn btn-primary landing_page_btn_priamry radius-primary">
                        Sign up for FREE
                    </Link>
                    <div className="row df">
                        <a style={{ alignItems: "center", justifyContent: "center" }} target="_blank" rel="noreferrer" className="df btn-secondary btn flex-1 radius-primary m-r-primary" href="https://play.google.com/store/apps/details?id=in.summachar.pathshala&hl=en_IN&gl=US">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 23" fill="none">
                                <path d="M12.9753 2.51879L13.9351 0.787201C13.9474 0.764986 13.9552 0.740563 13.9581 0.715326C13.961 0.690089 13.9589 0.664532 13.9519 0.640116C13.9449 0.615699 13.9331 0.5929 13.9173 0.573021C13.9015 0.553142 13.8819 0.536571 13.8597 0.524256C13.8148 0.499384 13.7619 0.493353 13.7126 0.507491C13.6633 0.521628 13.6216 0.554776 13.5968 0.599641L12.6263 2.35042C11.7983 1.98743 10.904 1.80002 9.99993 1.80002C9.09585 1.80002 8.20158 1.98743 7.37356 2.35042L6.40308 0.599641C6.37821 0.554776 6.33653 0.521628 6.28722 0.507491C6.23791 0.493353 6.185 0.499384 6.14013 0.524256C6.09527 0.549128 6.06212 0.590804 6.04798 0.640116C6.03385 0.689427 6.03988 0.742335 6.06475 0.787201L7.0246 2.5188C6.11093 2.96917 5.33894 3.66247 4.79331 4.52265C4.24768 5.38283 3.94949 6.37667 3.93144 7.39515H16.0684C16.0504 6.37667 15.7522 5.38283 15.2066 4.52265C14.6609 3.66246 13.8889 2.96916 12.9753 2.51879ZM7.19903 5.17439C7.09879 5.17439 7.00081 5.14467 6.91747 5.08898C6.83412 5.03329 6.76916 4.95414 6.73081 4.86153C6.69245 4.76893 6.68241 4.66703 6.70197 4.56872C6.72152 4.47041 6.76979 4.38011 6.84067 4.30923C6.91154 4.23835 7.00185 4.19008 7.10016 4.17053C7.19847 4.15097 7.30037 4.16101 7.39297 4.19937C7.48558 4.23773 7.56473 4.30269 7.62042 4.38603C7.67611 4.46937 7.70583 4.56736 7.70583 4.66759C7.70568 4.80196 7.65224 4.93078 7.55722 5.02579C7.46221 5.1208 7.33339 5.17424 7.19903 5.17439ZM12.8008 5.17439C12.7006 5.17439 12.6026 5.14467 12.5192 5.08898C12.4359 5.03329 12.3709 4.95414 12.3326 4.86153C12.2942 4.76893 12.2842 4.66703 12.3037 4.56872C12.3233 4.47041 12.3716 4.38011 12.4424 4.30923C12.5133 4.23835 12.6036 4.19008 12.7019 4.17053C12.8002 4.15097 12.9021 4.16101 12.9948 4.19937C13.0874 4.23773 13.1665 4.30269 13.2222 4.38603C13.2779 4.46937 13.3076 4.56736 13.3076 4.66759C13.3075 4.80196 13.254 4.93078 13.159 5.02579C13.064 5.1208 12.9352 5.17424 12.8008 5.17439ZM3.93135 16.6714C3.93135 17.0605 4.08592 17.4337 4.36106 17.7088C4.6362 17.9839 5.00937 18.1385 5.39848 18.1385H6.37208V21.1395C6.37159 21.3184 6.40642 21.4957 6.47458 21.6612C6.54273 21.8267 6.64286 21.9771 6.76924 22.1038C6.89562 22.2306 7.04576 22.3311 7.21106 22.3997C7.37636 22.4683 7.55357 22.5036 7.73253 22.5036C7.9115 22.5036 8.08871 22.4683 8.25401 22.3997C8.41931 22.3311 8.56945 22.2306 8.69583 22.1038C8.82221 21.9771 8.92234 21.8267 8.99049 21.6612C9.05864 21.4957 9.09347 21.3184 9.09299 21.1395V18.1385H10.9068V21.1395C10.9064 21.3184 10.9412 21.4957 11.0093 21.6612C11.0775 21.8267 11.1776 21.9771 11.304 22.1038C11.4304 22.2306 11.5805 22.3311 11.7458 22.3997C11.9111 22.4683 12.0883 22.5036 12.2673 22.5036C12.4463 22.5036 12.6235 22.4683 12.7888 22.3997C12.9541 22.3311 13.1042 22.2306 13.2306 22.1038C13.357 21.9771 13.4571 21.8267 13.5253 21.6612C13.5934 21.4957 13.6282 21.3184 13.6278 21.1395V18.1385H14.6014C14.9905 18.1385 15.3637 17.9839 15.6388 17.7088C15.914 17.4337 16.0685 17.0605 16.0685 16.6714V7.87525H3.93135V16.6714ZM2.06407 7.64184C1.70338 7.64225 1.35758 7.78572 1.10253 8.04076C0.847489 8.29581 0.704026 8.64161 0.703618 9.0023V14.6708C0.703133 14.8497 0.737964 15.027 0.806116 15.1925C0.874268 15.358 0.974401 15.5084 1.10078 15.6351C1.22716 15.7619 1.3773 15.8624 1.5426 15.931C1.70789 15.9996 1.88511 16.0349 2.06407 16.0349C2.24304 16.0349 2.42025 15.9996 2.58555 15.931C2.75085 15.8624 2.90099 15.7619 3.02737 15.6351C3.15375 15.5084 3.25388 15.358 3.32203 15.1925C3.39018 15.027 3.42501 14.8497 3.42453 14.6708V9.0023C3.42412 8.64161 3.28066 8.29581 3.02561 8.04076C2.77056 7.78571 2.42476 7.64225 2.06407 7.64184ZM17.9358 7.64184C17.5751 7.64225 17.2293 7.78571 16.9742 8.04076C16.7192 8.29581 16.5757 8.64161 16.5753 9.0023V14.6708C16.5748 14.8497 16.6097 15.027 16.6778 15.1925C16.746 15.358 16.8461 15.5084 16.9725 15.6351C17.0989 15.7619 17.249 15.8624 17.4143 15.931C17.5796 15.9996 17.7568 16.0349 17.9358 16.0349C18.1147 16.0349 18.2919 15.9996 18.4572 15.931C18.6225 15.8624 18.7727 15.7619 18.8991 15.6351C19.0254 15.5084 19.1256 15.358 19.1937 15.1925C19.2619 15.027 19.2967 14.8497 19.2962 14.6708V9.0023C19.2958 8.64161 19.1523 8.29581 18.8973 8.04076C18.6423 7.78572 18.2965 7.64225 17.9358 7.64184Z" />
                            </svg>
                        </a>
                        <a style={{ alignItems: "center", justifyContent: "center" }} target="_blank" rel="noreferrer" className="df btn-secondary btn flex-1 radius-primary" href="https://apps.apple.com/in/app/summachar-pathshala/id1583563951">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 21" fill="none">
                                <path d="M11.9399 3.69C12.318 3.25428 12.6062 2.74817 12.7881 2.20074C12.97 1.6533 13.042 1.07533 12.9999 0.5C11.8393 0.593687 10.7619 1.13956 9.99991 2.02C9.63501 2.44198 9.35849 2.93288 9.18672 3.46364C9.01495 3.99441 8.95143 4.55424 8.99991 5.11C9.56606 5.11472 10.1257 4.9891 10.6355 4.74286C11.1453 4.49662 11.5916 4.13637 11.9399 3.69ZM14.4599 11.13C14.4666 10.3637 14.6685 9.61182 15.0464 8.9452C15.4243 8.27859 15.9659 7.71926 16.6199 7.32C16.2071 6.72524 15.6615 6.23483 15.0262 5.88767C14.3909 5.54052 13.6834 5.34615 12.9599 5.32C11.3999 5.16 9.95991 6.23 9.12991 6.23C8.29991 6.23 7.12991 5.34 5.82991 5.36C4.98004 5.388 4.15193 5.63578 3.42636 6.07919C2.70079 6.52259 2.10252 7.14648 1.68991 7.89C-0.0700884 10.95 1.23991 15.5 2.99991 17.97C3.79991 19.18 4.79991 20.55 6.11991 20.5C7.43991 20.45 7.86991 19.68 9.39991 19.68C10.9299 19.68 11.3999 20.5 12.6999 20.47C13.9999 20.44 14.9199 19.23 15.7599 18.02C16.355 17.1415 16.8198 16.1816 17.1399 15.17C16.3474 14.832 15.6712 14.2693 15.195 13.5513C14.7187 12.8333 14.4631 11.9916 14.4599 11.13Z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}
export default LearnBetter;