import React from "react";
import '../../assets/css/LandingPage.css';
import '../../assets/css/Packages.css';
import NavBar from "./NavBar";

import { NavLink } from 'react-router-dom';

const Pricing = (props) => {
    return (
        <>
            <NavBar />
            <div className="wrapper_container">
                <div className="landing_packages_container">
                    {/* <div className="packages_title">
                    Select Your Package
                </div> */}
                    <div className="package_details landingpage-package_details">
                        {
                            props.plans && Object.entries(props.plans).length > 0 && Object.entries(props.plans).map(function (data, keyIndex) {
                                return (
                                    <div className="outerPlan" key={keyIndex} className={data[1].uuid == props.uuid ? "focus" : "outerPlan"} >
                                        <div className="plan" key={data[1].uuid} onClick={() => props.selectPackage(data[1])}>
                                            <div className="plans_title">
                                                <div className="plans_amount">
                                                    ₹{props.amounts[keyIndex]}
                                                </div>
                                                <div className="gray_duration">/ Month</div>
                                            </div>
                                            <div className="gray_small">for {data[1].duration} </div>
                                            {(!props.isSmall || data[1].uuid == props.uuid) && <div className="plan_benefits">
                                                {data[1].description.map(function (desc, keyIndex) {
                                                    return (
                                                        <div className="benefits" key={keyIndex}>
                                                            <svg width="20" height="20" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <g clipPath="url(#clip0)">
                                                                    <rect y="0.5" width="20" height="20" rx="10" fill="#ECC249" />
                                                                    <path d="M15.5917 7.00834C15.5142 6.93023 15.4221 6.86824 15.3205 6.82593C15.219 6.78362 15.1101 6.76184 15 6.76184C14.89 6.76184 14.7811 6.78362 14.6796 6.82593C14.578 6.86824 14.4858 6.93023 14.4084 7.00834L8.20004 13.225L5.59171 10.6083C5.51127 10.5306 5.41632 10.4695 5.31227 10.4285C5.20823 10.3875 5.09713 10.3674 4.98531 10.3694C4.87349 10.3713 4.76315 10.3952 4.66058 10.4398C4.55802 10.4844 4.46524 10.5487 4.38754 10.6292C4.30984 10.7096 4.24875 10.8046 4.20774 10.9086C4.16674 11.0127 4.14663 11.1238 4.14856 11.2356C4.1505 11.3474 4.17444 11.4577 4.21902 11.5603C4.2636 11.6629 4.32794 11.7556 4.40837 11.8333L7.60837 15.0333C7.68584 15.1114 7.77801 15.1734 7.87956 15.2157C7.98111 15.2581 8.09003 15.2798 8.20004 15.2798C8.31005 15.2798 8.41897 15.2581 8.52052 15.2157C8.62207 15.1734 8.71424 15.1114 8.79171 15.0333L15.5917 8.23334C15.6763 8.1553 15.7438 8.06059 15.79 7.95518C15.8361 7.84976 15.86 7.73592 15.86 7.62084C15.86 7.50575 15.8361 7.39192 15.79 7.2865C15.7438 7.18108 15.6763 7.08637 15.5917 7.00834Z" fill="white" />
                                                                </g>
                                                                <defs>
                                                                    <clipPath id="clip0">
                                                                        <rect y="0.5" width="20" height="20" rx="10" fill="white" />
                                                                    </clipPath>
                                                                </defs>
                                                            </svg>
                                                            {desc}
                                                        </div>
                                                    )
                                                })}

                                            </div>
                                            }
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    {/* <div className="btn_outer">
                <button className="plans_btn " ><span style={{color:"white"}}>Click to Play</span><span style={{color:"white"}}> ₹{props.amount_with_gst}</span></button>
                </div> */}

                    <div className="full-access-txt">
                        +Full Access to Recorded Masterclasses
                    </div>

                    <div className="pricing-signin-button">
                        <NavLink to="/signin" className="landing-pricing-signin">
                            Sign In
                        </NavLink>
                    </div>

                </div>

            </div>
        </>

    )
}
export default Pricing;