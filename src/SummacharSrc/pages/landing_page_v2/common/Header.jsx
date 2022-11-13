// import react from "react";
import logo from "../../../assets/images/common/Pathshala_icon.svg";
import logo_small from "../../../assets/images/common/Pathshala_icon_small.svg";
import "../../../assets/css/LandingPage.css";
import "../../../assets/css/landingpage-navbar.css";
import "../../../assets/css/landing_typography.css";


import React, { useEffect, useState, Component } from "react";
import { useHistory, useParams, useRouteMatch } from "react-router";
import { Link, useLocation } from "react-router-dom";
import { getAuthToken, premiumInt } from "../../../common/helper";
import { ScrollableLink } from "react-update-url-on-scroll";
// import ScrollShadow from 'react-scroll-shadow';

import { configureAnchors } from "react-update-url-on-scroll";

import ContactUs from "../component/ContactUs";
import About from "../component/About";
import LandingPageHome from "../pages/LandingPageHome";

const Header = (props) => {

    configureAnchors({ offset: 150 });
    const { path, url } = useRouteMatch();

    const location = useLocation();

    const history = useHistory();
    const breakPoint = 960;
    const [menuVisiblity, setMenuVisiblity] = useState(window.innerWidth < breakPoint ? false : true);
    const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight, headerHeight: window.innerWidth < breakPoint ? 50 : 80 });
    const onResize = () => {
        // alert('clled')
        if (window.innerWidth < breakPoint) {
            setMenuVisiblity(false);
        } else {
            setMenuVisiblity(true);
        }
        setWindowSize({ width: window.innerWidth, height: window.innerHeight, headerHeight: window.innerWidth < breakPoint ? 50 : 80 });
    };

    const remove = () => {
        /*  document.getElementById("scrollable").removeEventListener("scroll", navHighlighter);*/
    };
    useEffect(() => {
        onResize();
        window.addEventListener("resize", onResize);
        return () => {
            return window.removeEventListener("resize", onResize);
        };
    }, []);

    useEffect(() => {
        navHighlighter();
    }, []);

    const [currentSec, changeSec] = useState("root");
    const sections = document.querySelectorAll("div[id]");
    const [aboutH, setAbout] = useState(0);
    const [aboutOff, setAboutOff] = useState(0);
    const [contactH, setContact] = useState(0);
    const [contactOff, setContactOff] = useState(0);

    const navHighlighter = () => {
        /*  const sections = document.querySelectorAll("div[id]");*/

        let scrollY = document.getElementById("scrollable")?.scrollTop;

        setAbout(document.getElementById("about")?.offsetHeight);
        setAboutOff(document.getElementById("about")?.offsetTop - 50);
        setContact(document.getElementById("contactus")?.offsetHeight);
        setContactOff(document.getElementById("contactus")?.offsetTop - 50);


        if (scrollY > aboutOff && scrollY <= aboutH + aboutOff) {
            if (currentSec != "about") changeSec("about");

        } else if (scrollY > contactOff - 100 && scrollY <= contactH - 100 + contactOff) {
            if (currentSec != "contactus") changeSec("contactus");
        } else {
            changeSec("");
        }
    };

    useEffect(() => {
        navHighlighter();
    }, [props.paths]);

    return (
        <>
            <header className="df row landing-page-header center column" style={{ height: windowSize.headerHeight + "px", zIndex: 11111111 }}>
                <div className="df landing_page_container space-between row-center fit-content ">
                    <div className="landing_page_header_logo bg-secondary">
                        <img src={logo} alt="logo" className="fit-content" />
                    </div>
                    <div className="landing_page_header_logo_mobile bg-secondary">
                        <img src={logo_small} alt="logo" className="fit-content" />
                    </div>
                    {((menuVisiblity && windowSize.width < breakPoint) || windowSize.width > breakPoint) && (
                        <div
                            className="landing-page-nav-bar-container"

                            onClick={() => {
                                setMenuVisiblity(!menuVisiblity);
                            }}
                        >
                            {/* mobile view tool tip */}
                            <div className="tool-tip-mobile-view">
                                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                                    <path d="M6.76795 1C7.53775 -0.333332 9.46225 -0.333334 10.2321 1L16.7272 12.25C17.497 13.5833 16.5348 15.25 14.9952 15.25H2.00481C0.46521 15.25 -0.497042 13.5833 0.272758 12.25L6.76795 1Z" fill="white" />
                                </svg>
                            </div>

                            <ul className="df row-center flex-1 landing-page-nav-link-area" style={{ whiteSpace: "nowrap" }}>
                                <li
                                    className="df landing-p-primary heading-main landing_page_list_item"
                                    onClick={() => {
                                        history.push("/");
                                    }}
                                >
                                    <Link
                                        to="/"
                                        onClick={() => {
                                            setMenuVisiblity(false);
                                        }}
                                    >
                                        <a
                                            className={
                                                (location.pathname === "/")
                                                    ? "df landing-p-h-primary txt-gray txt-dark landing_btn_nav_footer landing_page_list_item_link active_link"
                                                    : "df landing-p-h-primary txt-gray txt-dark landing_btn_nav_footer landing_page_list_item_link landing-border-bottom-transperent"
                                            }
                                        >
                                            {" "}
                                            News For Kids
                                            {" "}
                                        </a>
                                    </Link>
                                </li>

                                <li
                                    className="df landing-p-primary heading-main landing_page_list_item"
                                    onClick={() => {
                                        history.push("/academic");
                                    }}
                                >
                                    <Link
                                        to="/academic"
                                        onClick={() => {
                                            setMenuVisiblity(false);
                                        }}
                                    >
                                        <a
                                            className={
                                                window.location.pathname == "/academic"
                                                    ? "df landing-p-h-primary txt-gray txt-dark landing_btn_nav_footer landing_page_list_item_link active_link"
                                                    : "df landing-p-h-primary txt-gray txt-dark landing_btn_nav_footer landing_page_list_item_link landing-border-bottom-transperent"
                                            }
                                        >
                                            {" "}
                                            Academics{" "}
                                        </a>
                                    </Link>
                                </li>

                                <li
                                    className="df landing-p-primary landing_btn_nav_footer landing_page_list_item"
                                    onClick={() => {
                                        history.push("/about");
                                    }}
                                >
                                    <Link
                                        to="/about"
                                        onClick={() => {
                                            setMenuVisiblity(false);
                                        }}
                                    >
                                        <a
                                            className={
                                                (location.pathname === "/about")
                                                    ? "df landing-p-h-primary txt-gray txt-dark landing_btn_nav_footer landing_page_list_item_link active_link"
                                                    : "df landing-p-h-primary txt-gray txt-dark landing_btn_nav_footer landing_page_list_item_link landing-border-bottom-transperent"
                                            }
                                        >
                                            {" "}
                                            About Us{" "}
                                        </a>
                                    </Link>
                                </li>
                                {/* <li
                                    className="df landing-p-primary landing_btn_nav_footer landing_page_list_item"
                                    onClick={() => {
                                        history.push("/contactus");
                                    }}
                                >
                                    <Link
                                        to="/contactus"
                                        onClick={() => {
                                            setMenuVisiblity(false);
                                        }}
                                        id="landing_contactus_link"
                                    >
                                        <a
                                            className={
                                                currentSec == "contactus" || ((props.path == "/contactus" || window.location.pathname == "/contactus") && currentSec != "" && currentSec != "about")
                                                    ? "df landing-p-h-primary txt-gray txt-dark landing_btn_nav_footer landing_page_list_item_link active_link"
                                                    : "df landing-p-h-primary txt-gray txt-dark landing_btn_nav_footer landing_page_list_item_link landing-border-bottom-transperent"
                                            }
                                        >
                                            {" "}
                                            Contact Us{" "}
                                        </a>
                                    </Link>
                                </li> */}
                                <li className="df landing-p-primary heading-main landing_page_list_item">
                                    <Link onClick={() => { setMenuVisiblity(false); premiumInt("/pricing"); }} to="/premium" className={location.pathname == "/premium" ? "df landing-p-h-primary txt-gray txt-dark landing_btn_nav_footer  landing_page_list_item_link active_link" : "df landing-p-h-primary txt-gray txt-dark landing_btn_nav_footer landing_page_list_item_link landing-border-bottom-transperent"} >
                                        Pricing
                                    </Link>

                                </li>
                                <li className="df landing-p-primary heading-main landing_page_list_item">
                                    <Link onClick={() => { setMenuVisiblity(false) }} to="/faq" className={location.pathname == "/faq" ? "df landing-p-h-primary txt-gray txt-dark landing_btn_nav_footer  landing_page_list_item_link active_link" : "df landing-p-h-primary txt-gray txt-dark landing_btn_nav_footer landing_page_list_item_link landing-border-bottom-transperent"} >
                                        FAQ
                                    </Link>

                                </li>
                                <li className="df landing-p-primary heading-main landing_page_list_item">
                                    <a target={"_blank"} onClick={() => { setMenuVisiblity(false) }} href="https://www.blog.summacharpathshala.in/ " className={location.pathname == "/blog" ? "df landing-p-h-primary txt-gray txt-dark landing_btn_nav_footer  landing_page_list_item_link active_link" : "df landing-p-h-primary txt-gray txt-dark landing_btn_nav_footer landing_page_list_item_link landing-border-bottom-transperent"} >
                                        Blog
                                    </a>

                                </li>
                                <li className="df landing-p-primary heading-main landing_page_list_item" onClick={() => remove()}>
                                    <Link
                                        onClick={() => {
                                            setMenuVisiblity(false);
                                        }}
                                        to="/signin"
                                        id="landing_signin_link"
                                        className={"df landing-p-h-primary txt-gray txt-dark landing_btn_nav_footer landing_page_list_item_link landing-border-bottom-transperent"}
                                    >
                                        <button className="df landing-p-h-primary txt-gray txt-dark landing_btn_nav_footer landing_page_list_item_link pointer"> {getAuthToken() ? "Open App" : "Sign In"} </button>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    )}

                    <div
                        className="landing-page-hamBurger-icon df center"
                        onClick={() => {
                            setMenuVisiblity(true);
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="16" viewBox="0 0 21 16" fill="none">
                            <g clip-path="url(#clip0_1076:311)">
                                <path d="M1.93457 1.33301H19.2679" stroke="#5C56D4" strokeWidth="3" strokeMiterlimit="1" strokeLinecap="round" />
                                <path d="M1.93457 8H19.2679" stroke="#5C56D4" strokeWidth="3" strokeMiterlimit="1" strokeLinecap="round" />
                                <path d="M1.93457 14.666H19.2679" stroke="#5C56D4" strokeWidth="3" strokeMiterlimit="1" strokeLinecap="round" />
                            </g>
                            <defs>
                                <clipPath id="clip0_1076:311">
                                    <rect x="0.600586" width="20" height="16" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                    </div>
                </div>
            </header>
            <main style={{ height: windowSize.height - windowSize.headerHeight + "px" }}>{props.children}</main>
        </>
    );
};
export default Header;
