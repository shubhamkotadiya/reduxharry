import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../../assets/css/navigationbar.css";
import NavRoundedCorner from "./NavRoundedCorner";
import {
    useHistory,
    useLocation,
    useRouteMatch,
    useParams,
} from "react-router";
import BarsIcon from "../../../assets/images/common/bars.svg";
import Logo from "../../../assets/images/common/summachar_logo_white.svg";
import Avtar from "../../../assets/images/avtar/profileImg.svg";
import { Store } from "../../../App";

const NavBar = (Props) => {
    const { path, url } = useRouteMatch();
    const params = useParams();
    const context = useContext(Store);
    const [nameVisiblity, setNameVisiblity] = useState(true);
    const [dropDownVisiblity, setdropDownVisiblity] = useState(false);
    const [profile, setProfile] = useState(0);
    const [vis1, setVis1] = useState(true);
    const [vis2, setVis2] = useState(true);
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight - 76,
        marginTop: 76,
    });
    const location = useLocation();
    const user = useContext(Store).user;
    const userData = user.data;
    const history = useHistory();
    const subjectList = context.subject.data;
    const onResize = () => {
        let height = window.innerHeight;
        let width = window.innerWidth;
        if (width < 768) {
            setNameVisiblity(false);
            setWindowSize({ width: width, height: height - 48, marginTop: 48 });
        } else if (width < 1000) {
            setNameVisiblity(false);
            setWindowSize({ width: width, height: height - 48, marginTop: 48 });
        } else {
            setNameVisiblity(true);
            setWindowSize({ width: width, height: height - 76, marginTop: 76 });
        }
    };
    useEffect(() => {
        onResize();
        window.addEventListener("resize", onResize);
        return () => {
            return window.removeEventListener("resize", onResize);
        };
    }, []);
    const logOut = async () => {
        const reponse = await user.logOut();
        if (reponse.status) {
            setdropDownVisiblity(false);
            history.replace("/signin");
        } else {
            alert("something went wrong");
        }
    };
    //const goToProfile = () => {
    //    setdropDownVisiblity(!dropDownVisiblity);
    //    //console.log(dropDownVisiblity)
    //    history.push("/profile/profile");

    //}

    // Used to determine header text;
    // //console.log(history.location.pathname.slice(-9))
    var headerTitle;
    if(history.location.pathname.split("/").length>2){
        headerTitle = history.location.pathname.split("/")[2];
    }else{
        headerTitle = history.location.pathname.split("/")[1];
    }

    // Used to determine header color
    var color = windowSize.width<1000 ? "white" : "#5c56d4"
    
    return location.pathname == "/" ||
        location.pathname == "/premium" ||
        location.pathname == "/features" ||
        location.pathname == "/pricing" ||
        location.pathname == "/about" ||
        location.pathname == "/welcome" ||
        location.pathname == "/privacy-policy" ||
        location.pathname == "/refund-policy" ||
        location.pathname == "/terms-of-use" ? (
        <>{Props.children}</>
    ) : (
        <>
                {(location.pathname != "/activity" && location.pathname.slice(0, 18) !="/competition-essay") && (
                <header 
                className="df main_page_header row row-center bg-primary"
                style={{ backgroundColor: color }}
                >
                    <div className="df row-center">
                        <div className="df logo_area  big_logo_area row-center">
                            {!(
                                (location.pathname.slice(0, 5) == "/news" &&
                                    location.pathname.length > 6) ||
                                (location.pathname.slice(0, 5) == "/home" &&
                                    location.pathname.length > 6) ||
                                location.pathname.slice(-8) == "/details" ||
                                location.pathname.slice(-22) ==
                                    "/rules-and-eligibility" ||
                                location.pathname.slice(-5) == "/test" ||
                                location.pathname.slice(-9) == "/concepts" ||
                                location.pathname.slice(0,10) == "/academics" ||
                                location.pathname.slice(0,8) == "/profile" ||
                                location.pathname.slice(0,10) == "/knowledge" ||
                                location.pathname.slice(0,5) == "/news" ||
                                location.pathname.slice(0,11) == "/activities" ||
                                location.pathname.slice(0,9) == "/activity" ||
                                location.pathname.slice(0,9) == "/calendar"
                            ) &&
                                windowSize.width <= 1000 && (
                                    <button
                                        className="bar_icon"
                                        onClick={() => {
                                            setNameVisiblity(!nameVisiblity);
                                        }}
                                        style={{marginBottom: -5}}
                                    >
                                        <svg
                                            width="21"
                                            height="16"
                                            viewBox="0 0 21 16"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <g clipPath="url(#clip0_382:231)">
                                                <path
                                                    d="M1.93408 1.33398H19.2674"
                                                    stroke="#5c56d4"
                                                    strokeWidth="3"
                                                    strokeMiterlimit="1"
                                                    strokeLinecap="round"
                                                />
                                                <path
                                                    d="M1.93408 8H19.2674"
                                                    stroke="#5c56d4"
                                                    strokeWidth="3"
                                                    strokeMiterlimit="1"
                                                    strokeLinecap="round"
                                                />
                                                <path
                                                    d="M1.93408 14.668H19.2674"
                                                    stroke="#5c56d4"
                                                    strokeWidth="3"
                                                    strokeMiterlimit="1"
                                                    strokeLinecap="round"
                                                />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_382:231">
                                                    <rect
                                                        x="0.600586"
                                                        width="20"
                                                        height="16"
                                                        fill="white"
                                                    />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </button>
                                )}
                            {((location.pathname.slice(0, 5) == "/news" &&
                                location.pathname.length > 6) ||
                                (location.pathname.slice(0, 5) == "/home" &&
                                    location.pathname.length > 6) ||
                                location.pathname.slice(-8) == "/details" ||
                                location.pathname.slice(-22) ==
                                    "/rules-and-eligibility" ||
                                location.pathname.slice(-5) == "/test" ||
                                location.pathname.slice(-9) == "/concepts" ||
                                location.pathname.slice(0,10) == "/academics" ||
                                location.pathname.slice(0,8) == "/profile" ||
                                location.pathname.slice(0,10) == "/knowledge" ||
                                location.pathname.slice(0,5) == "/news" ||
                                location.pathname.slice(0,11) == "/activities" ||
                                // location.pathname.slice(0,9) == "/activity" ||
                                location.pathname.slice(0,9) == "/calendar"
                                ) &&
                                windowSize.width < 1000 && (
                                    <button
                                        className="df center"
                                        style={{ margin: "5px 10px 5px 0px" }}
                                        onClick={() => {
                                            if(history.location.pathname.slice(-10)==="/academics" || history.location.pathname.slice(-8)==="/profile" || history.location.pathname.slice(-10)==="/bookmarks" || history.location.pathname.slice(-11)==="/categories"){
                                                history.replace("/home");
                                            }else if (history.location.pathname.slice(-9)==="/concepts" ||history.location.pathname.slice(-5)==="/test" ){
                                                history.replace("/academics")
                                            }else if(history.location.pathname.slice(-11)==="/activities" || history.location.pathname.slice(-5)==="/news"){
                                                history.replace("/knowledge")
                                            }else{
                                                history.goBack();
                                            }
                                        }
                                        }
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="18"
                                            viewBox="0 0 16 18"
                                            fill="none"
                                        >
                                            <path
                                                d="M14.6669 7.66669H4.54685L8.94685 3.28002C9.19793 3.02895 9.33898 2.68843 9.33898 2.33336C9.33898 1.97829 9.19793 1.63776 8.94685 1.38669C8.69578 1.13562 8.35526 0.994568 8.00019 0.994568C7.64512 0.994568 7.30459 1.13562 7.05352 1.38669L0.386854 8.05336C0.265467 8.18016 0.170313 8.32969 0.106854 8.49336C-0.0265034 8.81797 -0.0265034 9.18208 0.106854 9.50669C0.170313 9.67036 0.265467 9.81989 0.386854 9.94669L7.05352 16.6134C7.17747 16.7383 7.32494 16.8375 7.48742 16.9052C7.6499 16.9729 7.82417 17.0078 8.00019 17.0078C8.1762 17.0078 8.35048 16.9729 8.51296 16.9052C8.67544 16.8375 8.8229 16.7383 8.94685 16.6134C9.07183 16.4894 9.17102 16.3419 9.23871 16.1795C9.3064 16.017 9.34125 15.8427 9.34125 15.6667C9.34125 15.4907 9.3064 15.3164 9.23871 15.1539C9.17102 14.9914 9.07183 14.844 8.94685 14.72L4.54685 10.3334H14.6669C15.0205 10.3334 15.3596 10.1929 15.6097 9.94283C15.8597 9.69278 16.0002 9.35365 16.0002 9.00002C16.0002 8.6464 15.8597 8.30726 15.6097 8.05722C15.3596 7.80717 15.0205 7.66669 14.6669 7.66669Z"
                                                fill="#5c56d4"
                                            />
                                        </svg>
                                    </button>
                                )}
                                {(
                                    location.pathname.slice(0,9) == "/activity" 
                                    ) &&
                                    windowSize.width < 1000 && (
                                        <button
                                            className="df center"
                                            style={{ margin: "5px 10px 5px 0px" }}
                                            onClick={() => {
                                                    history.goBack();
                                                }
                                            }
                                        >
                                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M24.1768 9.57678L24.3536 9.4L24.1768 9.22322L22.7768 7.82322L22.6 7.64645L22.4232 7.82322L16 14.2464L9.57678 7.82322L9.4 7.64645L9.22322 7.82322L7.82322 9.22322L7.64645 9.4L7.82322 9.57678L14.2464 16L7.82322 22.4232L7.64645 22.6L7.82322 22.7768L9.22322 24.1768L9.4 24.3536L9.57678 24.1768L16 17.7536L22.4232 24.1768L22.6 24.3536L22.7768 24.1768L24.1768 22.7768L24.3536 22.6L24.1768 22.4232L17.7536 16L24.1768 9.57678Z" fill="#5C56D4" stroke="#5C56D4" strokeWidth="0.5"/>
                                            </svg>

                                        </button>
                                    )
                                }

                            {location.pathname.slice(-12) == "infographics" && (
                                <button
                                    className="df center"
                                    style={{ margin: "5px 10px 5px 0px" }}
                                    onClick={() => {
                                        history.goBack();
                                    }}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="18"
                                        viewBox="0 0 16 18"
                                        fill="none"
                                    >
                                        <path
                                            d="M14.6669 7.66669H4.54685L8.94685 3.28002C9.19793 3.02895 9.33898 2.68843 9.33898 2.33336C9.33898 1.97829 9.19793 1.63776 8.94685 1.38669C8.69578 1.13562 8.35526 0.994568 8.00019 0.994568C7.64512 0.994568 7.30459 1.13562 7.05352 1.38669L0.386854 8.05336C0.265467 8.18016 0.170313 8.32969 0.106854 8.49336C-0.0265034 8.81797 -0.0265034 9.18208 0.106854 9.50669C0.170313 9.67036 0.265467 9.81989 0.386854 9.94669L7.05352 16.6134C7.17747 16.7383 7.32494 16.8375 7.48742 16.9052C7.6499 16.9729 7.82417 17.0078 8.00019 17.0078C8.1762 17.0078 8.35048 16.9729 8.51296 16.9052C8.67544 16.8375 8.8229 16.7383 8.94685 16.6134C9.07183 16.4894 9.17102 16.3419 9.23871 16.1795C9.3064 16.017 9.34125 15.8427 9.34125 15.6667C9.34125 15.4907 9.3064 15.3164 9.23871 15.1539C9.17102 14.9914 9.07183 14.844 8.94685 14.72L4.54685 10.3334H14.6669C15.0205 10.3334 15.3596 10.1929 15.6097 9.94283C15.8597 9.69278 16.0002 9.35365 16.0002 9.00002C16.0002 8.6464 15.8597 8.30726 15.6097 8.05722C15.3596 7.80717 15.0205 7.66669 14.6669 7.66669Z"
                                            fill="#FAFAFF"
                                        />
                                    </svg>
                                </button>
                            )}
                            <div
                                className="logo bigLogo"
                                style={{ padding: "0px" }}
                            >
                                <img src={Logo} alt="" />
                            </div>
                        </div>
                        <h3 className={"txt-large school_name txt-white"}>
                            {userData.associated_school ?? ""}
                        </h3>
                    </div>
                    {
                        windowSize.width < 1000 &&
                        !(
                            location.pathname.slice(0,8) == "/profile" ||
                            location.pathname == "/home"
                        ) &&
                        (
                            <span
                                className="txt-white user_name "
                                style={{ color: "black", textAlign:"start", fontSize: 20}}
                            >
                                {headerTitle.charAt(0).toUpperCase() + headerTitle.slice(1)}
                            </span>
                        )
                    }


                    {
                        windowSize.width < 1000 &&
                        (
                            location.pathname.slice(0,8) == "/profile" ||
                            location.pathname == "/home"
                        ) &&
                        (
                            <span
                                className="txt-white user_name "
                                style={{ color: "#5c56d4" , textAlign:"end", flexGrow:1, margin:"auto 0 auto auto"}}
                            >
                                {userData.full_name
                                    ? "Hi, " + userData.username + "!"
                                    : "Guest!"}
                            </span>
                        )
                    }

                    {windowSize.width > 1000 && (
                        <span className="txt-white user_name " style={{flexGrow:1,textAlign:"end", margin:"auto 0 auto auto"}}>
                            {userData.full_name
                                ? "Hi, " + userData.username + "!"
                                : "Guest!"}
                        </span>
                    )}
                </header>
            )}
            {windowSize.width > 1000 && (
                <div className="df nav_container flex-1">
                    {location.pathname.slice(0, 9) != "/activity" && (
                        <nav
                                className={
                                    nameVisiblity
                                        ? "df vertical_nav_bar"
                                        : "df vertical_nav_bar small_nav"
                                }

                            
                        >
                                <ul className="df fit-content" style={{ maxHeight: windowSize.height - 100 + "px" }}>
                                <div className="df logo_area row-center smallNavLogoArea">
                                    <button
                                        className="bar_icon"
                                        onClick={() => {
                                            setNameVisiblity(!nameVisiblity);
                                        }}
                                    >
                                        <svg
                                            width="21"
                                            height="16"
                                            viewBox="0 0 21 16"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <g clipPath="url(#clip0_187:275)">
                                                <path
                                                    d="M1.93408 1.33301H19.2674"
                                                    stroke="#5C56D4"
                                                    strokeWidth="3"
                                                    strokeMiterlimit="1"
                                                    strokeLinecap="round"
                                                />
                                                <path
                                                    d="M1.93408 8H19.2674"
                                                    stroke="#5C56D4"
                                                    strokeWidth="3"
                                                    strokeMiterlimit="1"
                                                    strokeLinecap="round"
                                                />
                                                <path
                                                    d="M1.93408 14.666H19.2674"
                                                    stroke="#5C56D4"
                                                    strokeWidth="3"
                                                    strokeMiterlimit="1"
                                                    strokeLinecap="round"
                                                />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_187:275">
                                                    <rect
                                                        x="0.600586"
                                                        width="20"
                                                        height="16"
                                                        fill="white"
                                                    />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </button>

                                    <div
                                        className="logo"
                                        style={{ padding: "0px" }}
                                    >
                                        <img src={Logo} alt="" />
                                    </div>
                                </div>
                                <li className="df row">
                                    {/*<NavRoundedCorner show={location.pathname == "/home"} type="upper" />*/}
                                    {/*<NavRoundedCorner show={location.pathname == "/home"} type="lower" />*/}
                                    <Link
                                        className={
                                            location.pathname == "/home"
                                                ? "df row active row-center flex-1"
                                                : "df row row-center inactive flex-1"
                                        }
                                        to="/home"
                                    >
                                        <span>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                            >
                                                <path
                                                    d="M3 10.4673C3 9.54148 3.42742 8.66756 4.15818 8.09919L10.1582 3.43253C11.2415 2.58994 12.7585 2.58994 13.8418 3.43253L19.8418 8.0992C20.5726 8.66756 21 9.54148 21 10.4673V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V10.4673Z"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                                <path
                                                    d="M9 22V12.5C9 12.2239 9.22386 12 9.5 12H14.5C14.7761 12 15 12.2239 15 12.5V22"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </span>
                                        {nameVisiblity && (
                                            <span className="txt-medium">
                                                Home
                                            </span>
                                        )}
                                    </Link>
                                </li>

                                <li
                                    className="df col"
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                >
                                    <Link
                                        className={
                                            location.pathname == "/academics"
                                                ? "df row active row-center flex-1"
                                                : "df row row-center  inactive flex-1"
                                        }
                                        to="/academics"
                                    >
                                        <span>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="19"
                                                viewBox="0 0 24 19"
                                                fill="none"
                                            >
                                                <g clipPath="url(#clip0)">
                                                    <path
                                                        d="M21.0014 6.42139L10.8989 11.9431L1.03418 6.29731L11.2918 1.03406L21.0014 6.42139Z"
                                                        stroke="#5C56D4"
                                                        strokeWidth="2"
                                                        strokeLinejoin="round"
                                                    />
                                                    <path
                                                        d="M18.1372 7.98276V15.2831C18.1372 15.7712 17.9433 16.2394 17.5981 16.5846C17.2529 16.9297 16.7848 17.1236 16.2966 17.1236H5.73911C5.25 17.1237 4.78077 16.9301 4.43395 16.5852C4.08713 16.2403 3.89092 15.7722 3.88818 15.2831V7.92072"
                                                        stroke="#5C56D4"
                                                        strokeWidth="2"
                                                        strokeLinejoin="round"
                                                    />
                                                    <path
                                                        d="M21.0015 6.42139H22.9661V12.2327"
                                                        stroke="#5C56D4"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0">
                                                        <rect
                                                            width="24"
                                                            height="18.1577"
                                                            fill="white"
                                                        />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                        </span>

                                        {nameVisiblity && (
                                            <span className="txt-medium">
                                                Academics
                                            </span>
                                        )}
                                    </Link>

                                    <div className="innerNav df col">
                                        {subjectList.map(function (
                                            sub,
                                            keyIndex
                                        ) {
                                            if (sub.has_content) {
                                                return (
                                                    <Link
                                                        key={keyIndex}
                                                        to={
                                                            "/academics/" +
                                                            sub.subject_name +
                                                            "/concepts"
                                                        }
                                                        className={
                                                            location.pathname.search(
                                                                "/academics/" +
                                                                    sub.subject_name +
                                                                    "/concepts"
                                                            ) != -1 ||
                                                            location.pathname ===
                                                                "/academics/" +
                                                                    sub.subject_name +
                                                                    "/test"
                                                                ? "nestedLink active"
                                                                : "nestedLink inactive"
                                                        }
                                                    >
                                                        {sub.subject_name}
                                                    </Link>
                                                );
                                            }
                                        })}
                                    </div>
                                </li>

                                <li
                                    className="df  col"
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                >
                                    <Link
                                        className={
                                            location.pathname.slice(0, 10) ==
                                            "/knowledge"
                                                ? "df row active row-center flex-1"
                                                : " inactive df row row-center flex-1"
                                        }
                                        to="/knowledge"
                                    >
                                        <span>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="23"
                                                height="24"
                                                viewBox="0 0 23 24"
                                                fill="none"
                                            >
                                                <path
                                                    d="M9.05005 4C8.49776 4 8.05005 4.44772 8.05005 5V11.2C8.05005 13.4 9.67922 15.2 11.7875 15.2C13.8959 15.2 15.5251 13.4 15.5251 11.2V5C15.5251 4.44772 15.0773 4 14.5251 4H9.05005Z"
                                                    stroke="#787E95"
                                                    strokeWidth="2"
                                                    strokeMiterlimit="10"
                                                />
                                                <path
                                                    d="M15.4292 5.7998H18.2084H18.3042C18.6875 5.7998 18.975 6.2998 19.0709 6.2998C19.1667 6.4998 19.1667 6.7998 19.1667 6.9998C19.2625 7.4998 19.2625 7.9998 19.0709 8.6998C18.975 9.1998 18.7834 9.9998 18.1125 10.6998C17.9209 10.9998 17.25 11.5998 16.2917 11.8998C16.1959 11.8998 16.1 11.8998 16.0042 11.9998H15.2375"
                                                    stroke="#787E95"
                                                    strokeWidth="2"
                                                    strokeMiterlimit="10"
                                                />
                                                <path
                                                    d="M8.04992 5.7998H5.27075H5.17492C4.79159 5.7998 4.50409 6.2998 4.40825 6.2998C4.31242 6.4998 4.21659 6.7998 4.21659 6.9998C4.21659 7.4998 4.12075 7.9998 4.31242 8.5998C4.40825 9.0998 4.59992 9.8998 5.27075 10.5998C5.46242 10.8998 6.13325 11.4998 7.09158 11.7998C7.18742 11.7998 7.28325 11.7998 7.37908 11.8998H8.14575"
                                                    stroke="#787E95"
                                                    strokeWidth="2"
                                                    strokeMiterlimit="10"
                                                />
                                                <path
                                                    d="M11.5 15.2002V20.2002"
                                                    stroke="#787E95"
                                                    strokeWidth="2"
                                                    strokeMiterlimit="10"
                                                />
                                                <path
                                                    d="M6.70825 19C6.15597 19 5.70825 19.4477 5.70825 20C5.70825 20.5523 6.15597 21 6.70825 21V19ZM16.2916 21C16.8439 21 17.2916 20.5523 17.2916 20C17.2916 19.4477 16.8439 19 16.2916 19V21ZM6.70825 21C6.71556 21 6.72286 21 6.73016 21C6.73746 21 6.74475 21 6.75203 21C6.75932 21 6.7666 21 6.77387 21C6.78114 21 6.78841 21 6.79567 21C6.80293 21 6.81018 21 6.81743 21C6.82468 21 6.83192 21 6.83915 21C6.84639 21 6.85362 21 6.86084 21C6.86806 21 6.87528 21 6.88249 21C6.8897 21 6.89691 21 6.90411 21C6.9113 21 6.9185 21 6.92568 21C6.93287 21 6.94005 21 6.94723 21C6.9544 21 6.96157 21 6.96873 21C6.97589 21 6.98305 21 6.9902 21C6.99735 21 7.0045 21 7.01164 21C7.01877 21 7.02591 21 7.03303 21C7.04016 21 7.04728 21 7.0544 21C7.06151 21 7.06862 21 7.07572 21C7.08283 21 7.08993 21 7.09702 21C7.10411 21 7.1112 21 7.11828 21C7.12536 21 7.13243 21 7.1395 21C7.14657 21 7.15363 21 7.16069 21C7.16774 21 7.17479 21 7.18184 21C7.18889 21 7.19593 21 7.20296 21C7.20999 21 7.21702 21 7.22404 21C7.23107 21 7.23808 21 7.2451 21C7.25211 21 7.25911 21 7.26611 21C7.27311 21 7.28011 21 7.2871 21C7.29408 21 7.30107 21 7.30805 21C7.31502 21 7.32199 21 7.32896 21C7.33593 21 7.34289 21 7.34984 21C7.3568 21 7.36375 21 7.37069 21C7.37764 21 7.38458 21 7.39151 21C7.39844 21 7.40537 21 7.41229 21C7.41922 21 7.42613 21 7.43304 21C7.43996 21 7.44686 21 7.45376 21C7.46066 21 7.46756 21 7.47445 21C7.48134 21 7.48822 21 7.4951 21C7.50198 21 7.50885 21 7.51572 21C7.52259 21 7.52945 21 7.53631 21C7.54317 21 7.55002 21 7.55687 21C7.56371 21 7.57056 21 7.57739 21C7.58423 21 7.59106 21 7.59789 21C7.60471 21 7.61153 21 7.61835 21C7.62516 21 7.63197 21 7.63878 21C7.64558 21 7.65238 21 7.65918 21C7.66597 21 7.67276 21 7.67955 21C7.68633 21 7.69311 21 7.69989 21C7.70666 21 7.71343 21 7.72019 21C7.72696 21 7.73372 21 7.74047 21C7.74722 21 7.75397 21 7.76072 21C7.76746 21 7.7742 21 7.78093 21C7.78766 21 7.79439 21 7.80112 21C7.80784 21 7.81456 21 7.82127 21C7.82799 21 7.83469 21 7.8414 21C7.8481 21 7.8548 21 7.86149 21C7.86819 21 7.87488 21 7.88156 21C7.88824 21 7.89492 21 7.9016 21C7.90827 21 7.91494 21 7.92161 21C7.92827 21 7.93493 21 7.94158 21C7.94824 21 7.95489 21 7.96153 21C7.96818 21 7.97482 21 7.98146 21C7.98809 21 7.99472 21 8.00135 21C8.00797 21 8.0146 21 8.02121 21C8.02783 21 8.03444 21 8.04105 21C8.04765 21 8.05426 21 8.06085 21C8.06745 21 8.07405 21 8.08063 21C8.08722 21 8.09381 21 8.10039 21C8.10696 21 8.11354 21 8.12011 21C8.12668 21 8.13324 21 8.1398 21C8.14637 21 8.15292 21 8.15947 21C8.16602 21 8.17257 21 8.17911 21C8.18566 21 8.19219 21 8.19873 21C8.20526 21 8.21179 21 8.21831 21C8.22484 21 8.23136 21 8.23787 21C8.24439 21 8.2509 21 8.25741 21C8.26391 21 8.27042 21 8.27691 21C8.28341 21 8.28991 21 8.29639 21C8.30288 21 8.30937 21 8.31585 21C8.32233 21 8.3288 21 8.33528 21C8.34175 21 8.34821 21 8.35468 21C8.36114 21 8.3676 21 8.37405 21C8.38051 21 8.38696 21 8.3934 21C8.39985 21 8.40629 21 8.41273 21C8.41916 21 8.4256 21 8.43203 21C8.43845 21 8.44488 21 8.4513 21C8.45772 21 8.46414 21 8.47055 21C8.47696 21 8.48337 21 8.48977 21C8.49618 21 8.50257 21 8.50897 21C8.51537 21 8.52176 21 8.52814 21C8.53453 21 8.54091 21 8.54729 21C8.55367 21 8.56005 21 8.56642 21C8.57279 21 8.57916 21 8.58552 21C8.59188 21 8.59824 21 8.6046 21C8.61095 21 8.6173 21 8.62365 21C8.63 21 8.63634 21 8.64268 21C8.64902 21 8.65535 21 8.66168 21C8.66801 21 8.67434 21 8.68066 21C8.68699 21 8.69331 21 8.69962 21C8.70594 21 8.71225 21 8.71856 21C8.72487 21 8.73117 21 8.73747 21C8.74377 21 8.75007 21 8.75636 21C8.76265 21 8.76894 21 8.77523 21C8.78151 21 8.78779 21 8.79407 21C8.80035 21 8.80662 21 8.81289 21C8.81916 21 8.82543 21 8.83169 21C8.83795 21 8.84421 21 8.85047 21C8.85672 21 8.86297 21 8.86922 21C8.87547 21 8.88171 21 8.88795 21C8.89419 21 8.90043 21 8.90666 21C8.9129 21 8.91913 21 8.92535 21C8.93158 21 8.9378 21 8.94402 21C8.95024 21 8.95646 21 8.96267 21C8.96888 21 8.97509 21 8.98129 21C8.9875 21 8.9937 21 8.9999 21C9.0061 21 9.01229 21 9.01848 21C9.02467 21 9.03086 21 9.03704 21C9.04323 21 9.04941 21 9.05559 21C9.06176 21 9.06794 21 9.07411 21C9.08028 21 9.08644 21 9.09261 21C9.09877 21 9.10493 21 9.11109 21C9.11725 21 9.1234 21 9.12955 21C9.1357 21 9.14185 21 9.14799 21C9.15414 21 9.16028 21 9.16641 21C9.17255 21 9.17869 21 9.18482 21C9.19095 21 9.19707 21 9.2032 21C9.20932 21 9.21544 21 9.22156 21C9.22768 21 9.2338 21 9.23991 21C9.24602 21 9.25213 21 9.25823 21C9.26434 21 9.27044 21 9.27654 21C9.28264 21 9.28873 21 9.29483 21C9.30092 21 9.30701 21 9.3131 21C9.31918 21 9.32527 21 9.33135 21C9.33743 21 9.34351 21 9.34958 21C9.35566 21 9.36173 21 9.3678 21C9.37386 21 9.37993 21 9.38599 21C9.39205 21 9.39811 21 9.40417 21C9.41023 21 9.41628 21 9.42233 21C9.42838 21 9.43443 21 9.44048 21C9.44652 21 9.45256 21 9.4586 21C9.46464 21 9.47068 21 9.47671 21C9.48275 21 9.48878 21 9.4948 21C9.50083 21 9.50686 21 9.51288 21C9.5189 21 9.52492 21 9.53094 21C9.53696 21 9.54297 21 9.54898 21C9.55499 21 9.561 21 9.56701 21C9.57301 21 9.57902 21 9.58502 21C9.59102 21 9.59701 21 9.60301 21C9.609 21 9.615 21 9.62099 21C9.62698 21 9.63296 21 9.63895 21C9.64493 21 9.65091 21 9.65689 21C9.66287 21 9.66885 21 9.67482 21C9.6808 21 9.68677 21 9.69274 21C9.69871 21 9.70467 21 9.71064 21C9.7166 21 9.72256 21 9.72852 21C9.73448 21 9.74043 21 9.74639 21C9.75234 21 9.75829 21 9.76424 21C9.77019 21 9.77614 21 9.78208 21C9.78803 21 9.79397 21 9.79991 21C9.80585 21 9.81178 21 9.81772 21C9.82365 21 9.82958 21 9.83551 21C9.84144 21 9.84737 21 9.8533 21C9.85922 21 9.86514 21 9.87106 21C9.87698 21 9.8829 21 9.88882 21C9.89473 21 9.90065 21 9.90656 21C9.91247 21 9.91838 21 9.92429 21C9.93019 21 9.9361 21 9.942 21C9.9479 21 9.9538 21 9.9597 21C9.9656 21 9.97149 21 9.97739 21C9.98328 21 9.98917 21 9.99506 21C10.001 21 10.0068 21 10.0127 21C10.0186 21 10.0245 21 10.0304 21C10.0363 21 10.0421 21 10.048 21C10.0539 21 10.0598 21 10.0656 21C10.0715 21 10.0774 21 10.0832 21C10.0891 21 10.095 21 10.1008 21C10.1067 21 10.1126 21 10.1184 21C10.1243 21 10.1302 21 10.136 21C10.1419 21 10.1477 21 10.1536 21C10.1594 21 10.1653 21 10.1711 21C10.177 21 10.1828 21 10.1887 21C10.1945 21 10.2004 21 10.2062 21C10.212 21 10.2179 21 10.2237 21C10.2296 21 10.2354 21 10.2412 21C10.2471 21 10.2529 21 10.2587 21C10.2646 21 10.2704 21 10.2762 21C10.282 21 10.2879 21 10.2937 21C10.2995 21 10.3053 21 10.3112 21C10.317 21 10.3228 21 10.3286 21C10.3344 21 10.3402 21 10.3461 21C10.3519 21 10.3577 21 10.3635 21C10.3693 21 10.3751 21 10.3809 21C10.3867 21 10.3925 21 10.3983 21C10.4041 21 10.41 21 10.4158 21C10.4216 21 10.4274 21 10.4332 21C10.4389 21 10.4447 21 10.4505 21C10.4563 21 10.4621 21 10.4679 21C10.4737 21 10.4795 21 10.4853 21C10.4911 21 10.4969 21 10.5027 21C10.5084 21 10.5142 21 10.52 21C10.5258 21 10.5316 21 10.5374 21C10.5431 21 10.5489 21 10.5547 21C10.5605 21 10.5663 21 10.572 21C10.5778 21 10.5836 21 10.5893 21C10.5951 21 10.6009 21 10.6067 21C10.6124 21 10.6182 21 10.624 21C10.6297 21 10.6355 21 10.6413 21C10.647 21 10.6528 21 10.6586 21C10.6643 21 10.6701 21 10.6758 21C10.6816 21 10.6874 21 10.6931 21C10.6989 21 10.7046 21 10.7104 21C10.7161 21 10.7219 21 10.7277 21C10.7334 21 10.7392 21 10.7449 21C10.7507 21 10.7564 21 10.7622 21C10.7679 21 10.7737 21 10.7794 21C10.7852 21 10.7909 21 10.7966 21C10.8024 21 10.8081 21 10.8139 21C10.8196 21 10.8254 21 10.8311 21C10.8368 21 10.8426 21 10.8483 21C10.8541 21 10.8598 21 10.8655 21C10.8713 21 10.877 21 10.8828 21C10.8885 21 10.8942 21 10.9 21C10.9057 21 10.9114 21 10.9172 21C10.9229 21 10.9286 21 10.9344 21C10.9401 21 10.9458 21 10.9515 21C10.9573 21 10.963 21 10.9687 21C10.9745 21 10.9802 21 10.9859 21C10.9916 21 10.9974 21 11.0031 21C11.0088 21 11.0145 21 11.0203 21C11.026 21 11.0317 21 11.0374 21C11.0431 21 11.0489 21 11.0546 21C11.0603 21 11.066 21 11.0717 21C11.0775 21 11.0832 21 11.0889 21C11.0946 21 11.1003 21 11.1061 21C11.1118 21 11.1175 21 11.1232 21C11.1289 21 11.1346 21 11.1403 21C11.1461 21 11.1518 21 11.1575 21C11.1632 21 11.1689 21 11.1746 21C11.1803 21 11.1861 21 11.1918 21C11.1975 21 11.2032 21 11.2089 21C11.2146 21 11.2203 21 11.226 21C11.2317 21 11.2375 21 11.2432 21C11.2489 21 11.2546 21 11.2603 21C11.266 21 11.2717 21 11.2774 21C11.2831 21 11.2888 21 11.2945 21C11.3002 21 11.3059 21 11.3117 21C11.3174 21 11.3231 21 11.3288 21C11.3345 21 11.3402 21 11.3459 21C11.3516 21 11.3573 21 11.363 21C11.3687 21 11.3744 21 11.3801 21C11.3858 21 11.3915 21 11.3972 21C11.4029 21 11.4087 21 11.4144 21C11.4201 21 11.4258 21 11.4315 21C11.4372 21 11.4429 21 11.4486 21C11.4543 21 11.46 21 11.4657 21C11.4714 21 11.4771 21 11.4828 21C11.4885 21 11.4942 21 11.4999 21C11.5056 21 11.5113 21 11.517 21C11.5227 21 11.5284 21 11.5341 21C11.5398 21 11.5456 21 11.5513 21C11.557 21 11.5627 21 11.5684 21C11.5741 21 11.5798 21 11.5855 21C11.5912 21 11.5969 21 11.6026 21C11.6083 21 11.614 21 11.6197 21C11.6254 21 11.6311 21 11.6368 21C11.6425 21 11.6482 21 11.6539 21C11.6596 21 11.6654 21 11.6711 21C11.6768 21 11.6825 21 11.6882 21C11.6939 21 11.6996 21 11.7053 21C11.711 21 11.7167 21 11.7224 21C11.7281 21 11.7338 21 11.7396 21C11.7453 21 11.751 21 11.7567 21C11.7624 21 11.7681 21 11.7738 21C11.7795 21 11.7852 21 11.7909 21C11.7966 21 11.8024 21 11.8081 21C11.8138 21 11.8195 21 11.8252 21C11.8309 21 11.8366 21 11.8423 21C11.8481 21 11.8538 21 11.8595 21C11.8652 21 11.8709 21 11.8766 21C11.8824 21 11.8881 21 11.8938 21C11.8995 21 11.9052 21 11.9109 21C11.9167 21 11.9224 21 11.9281 21C11.9338 21 11.9395 21 11.9453 21C11.951 21 11.9567 21 11.9624 21C11.9681 21 11.9739 21 11.9796 21C11.9853 21 11.991 21 11.9968 21C12.0025 21 12.0082 21 12.0139 21C12.0197 21 12.0254 21 12.0311 21C12.0368 21 12.0426 21 12.0483 21C12.054 21 12.0598 21 12.0655 21C12.0712 21 12.0769 21 12.0827 21C12.0884 21 12.0941 21 12.0999 21C12.1056 21 12.1113 21 12.1171 21C12.1228 21 12.1286 21 12.1343 21C12.14 21 12.1458 21 12.1515 21C12.1572 21 12.163 21 12.1687 21C12.1745 21 12.1802 21 12.186 21C12.1917 21 12.1974 21 12.2032 21C12.2089 21 12.2147 21 12.2204 21C12.2262 21 12.2319 21 12.2377 21C12.2434 21 12.2492 21 12.2549 21C12.2607 21 12.2664 21 12.2722 21C12.2779 21 12.2837 21 12.2894 21C12.2952 21 12.301 21 12.3067 21C12.3125 21 12.3182 21 12.324 21C12.3298 21 12.3355 21 12.3413 21C12.347 21 12.3528 21 12.3586 21C12.3643 21 12.3701 21 12.3759 21C12.3816 21 12.3874 21 12.3932 21C12.3989 21 12.4047 21 12.4105 21C12.4163 21 12.422 21 12.4278 21C12.4336 21 12.4394 21 12.4451 21C12.4509 21 12.4567 21 12.4625 21C12.4683 21 12.474 21 12.4798 21C12.4856 21 12.4914 21 12.4972 21C12.503 21 12.5088 21 12.5145 21C12.5203 21 12.5261 21 12.5319 21C12.5377 21 12.5435 21 12.5493 21C12.5551 21 12.5609 21 12.5667 21C12.5725 21 12.5783 21 12.5841 21C12.5899 21 12.5957 21 12.6015 21C12.6073 21 12.6131 21 12.6189 21C12.6247 21 12.6305 21 12.6363 21C12.6421 21 12.648 21 12.6538 21C12.6596 21 12.6654 21 12.6712 21C12.677 21 12.6829 21 12.6887 21C12.6945 21 12.7003 21 12.7061 21C12.712 21 12.7178 21 12.7236 21C12.7294 21 12.7353 21 12.7411 21C12.7469 21 12.7528 21 12.7586 21C12.7644 21 12.7703 21 12.7761 21C12.782 21 12.7878 21 12.7936 21C12.7995 21 12.8053 21 12.8112 21C12.817 21 12.8229 21 12.8287 21C12.8346 21 12.8404 21 12.8463 21C12.8521 21 12.858 21 12.8638 21C12.8697 21 12.8755 21 12.8814 21C12.8873 21 12.8931 21 12.899 21C12.9049 21 12.9107 21 12.9166 21C12.9225 21 12.9283 21 12.9342 21C12.9401 21 12.946 21 12.9518 21C12.9577 21 12.9636 21 12.9695 21C12.9753 21 12.9812 21 12.9871 21C12.993 21 12.9989 21 13.0048 21C13.0107 21 13.0166 21 13.0224 21C13.0283 21 13.0342 21 13.0401 21C13.046 21 13.0519 21 13.0578 21C13.0637 21 13.0696 21 13.0756 21C13.0815 21 13.0874 21 13.0933 21C13.0992 21 13.1051 21 13.111 21C13.1169 21 13.1229 21 13.1288 21C13.1347 21 13.1406 21 13.1465 21C13.1525 21 13.1584 21 13.1643 21C13.1703 21 13.1762 21 13.1821 21C13.1881 21 13.194 21 13.1999 21C13.2059 21 13.2118 21 13.2178 21C13.2237 21 13.2296 21 13.2356 21C13.2415 21 13.2475 21 13.2534 21C13.2594 21 13.2654 21 13.2713 21C13.2773 21 13.2832 21 13.2892 21C13.2952 21 13.3011 21 13.3071 21C13.3131 21 13.319 21 13.325 21C13.331 21 13.337 21 13.3429 21C13.3489 21 13.3549 21 13.3609 21C13.3669 21 13.3729 21 13.3789 21C13.3848 21 13.3908 21 13.3968 21C13.4028 21 13.4088 21 13.4148 21C13.4208 21 13.4268 21 13.4328 21C13.4388 21 13.4448 21 13.4509 21C13.4569 21 13.4629 21 13.4689 21C13.4749 21 13.4809 21 13.487 21C13.493 21 13.499 21 13.505 21C13.5111 21 13.5171 21 13.5231 21C13.5292 21 13.5352 21 13.5412 21C13.5473 21 13.5533 21 13.5594 21C13.5654 21 13.5715 21 13.5775 21C13.5836 21 13.5896 21 13.5957 21C13.6017 21 13.6078 21 13.6138 21C13.6199 21 13.626 21 13.632 21C13.6381 21 13.6442 21 13.6503 21C13.6563 21 13.6624 21 13.6685 21C13.6746 21 13.6807 21 13.6867 21C13.6928 21 13.6989 21 13.705 21C13.7111 21 13.7172 21 13.7233 21C13.7294 21 13.7355 21 13.7416 21C13.7477 21 13.7538 21 13.7599 21C13.766 21 13.7722 21 13.7783 21C13.7844 21 13.7905 21 13.7966 21C13.8028 21 13.8089 21 13.815 21C13.8212 21 13.8273 21 13.8334 21C13.8396 21 13.8457 21 13.8518 21C13.858 21 13.8641 21 13.8703 21C13.8764 21 13.8826 21 13.8887 21C13.8949 21 13.9011 21 13.9072 21C13.9134 21 13.9196 21 13.9257 21C13.9319 21 13.9381 21 13.9443 21C13.9504 21 13.9566 21 13.9628 21C13.969 21 13.9752 21 13.9814 21C13.9875 21 13.9937 21 13.9999 21C14.0061 21 14.0123 21 14.0185 21C14.0247 21 14.031 21 14.0372 21C14.0434 21 14.0496 21 14.0558 21C14.062 21 14.0683 21 14.0745 21C14.0807 21 14.0869 21 14.0932 21C14.0994 21 14.1056 21 14.1119 21C14.1181 21 14.1244 21 14.1306 21C14.1369 21 14.1431 21 14.1494 21C14.1556 21 14.1619 21 14.1681 21C14.1744 21 14.1807 21 14.1869 21C14.1932 21 14.1995 21 14.2058 21C14.212 21 14.2183 21 14.2246 21C14.2309 21 14.2372 21 14.2435 21C14.2498 21 14.2561 21 14.2624 21C14.2687 21 14.275 21 14.2813 21C14.2876 21 14.2939 21 14.3002 21C14.3065 21 14.3128 21 14.3192 21C14.3255 21 14.3318 21 14.3382 21C14.3445 21 14.3508 21 14.3572 21C14.3635 21 14.3698 21 14.3762 21C14.3825 21 14.3889 21 14.3952 21C14.4016 21 14.408 21 14.4143 21C14.4207 21 14.427 21 14.4334 21C14.4398 21 14.4462 21 14.4525 21C14.4589 21 14.4653 21 14.4717 21C14.4781 21 14.4845 21 14.4909 21C14.4973 21 14.5037 21 14.5101 21C14.5165 21 14.5229 21 14.5293 21C14.5357 21 14.5421 21 14.5485 21C14.555 21 14.5614 21 14.5678 21C14.5742 21 14.5807 21 14.5871 21C14.5935 21 14.6 21 14.6064 21C14.6129 21 14.6193 21 14.6258 21C14.6322 21 14.6387 21 14.6452 21C14.6516 21 14.6581 21 14.6646 21C14.671 21 14.6775 21 14.684 21C14.6905 21 14.697 21 14.7034 21C14.7099 21 14.7164 21 14.7229 21C14.7294 21 14.7359 21 14.7424 21C14.7489 21 14.7554 21 14.762 21C14.7685 21 14.775 21 14.7815 21C14.788 21 14.7946 21 14.8011 21C14.8076 21 14.8142 21 14.8207 21C14.8273 21 14.8338 21 14.8404 21C14.8469 21 14.8535 21 14.86 21C14.8666 21 14.8732 21 14.8797 21C14.8863 21 14.8929 21 14.8995 21C14.906 21 14.9126 21 14.9192 21C14.9258 21 14.9324 21 14.939 21C14.9456 21 14.9522 21 14.9588 21C14.9654 21 14.972 21 14.9786 21C14.9852 21 14.9919 21 14.9985 21C15.0051 21 15.0117 21 15.0184 21C15.025 21 15.0317 21 15.0383 21C15.0449 21 15.0516 21 15.0583 21C15.0649 21 15.0716 21 15.0782 21C15.0849 21 15.0916 21 15.0982 21C15.1049 21 15.1116 21 15.1183 21C15.125 21 15.1316 21 15.1383 21C15.145 21 15.1517 21 15.1584 21C15.1651 21 15.1719 21 15.1786 21C15.1853 21 15.192 21 15.1987 21C15.2054 21 15.2122 21 15.2189 21C15.2256 21 15.2324 21 15.2391 21C15.2459 21 15.2526 21 15.2594 21C15.2661 21 15.2729 21 15.2796 21C15.2864 21 15.2932 21 15.3 21C15.3067 21 15.3135 21 15.3203 21C15.3271 21 15.3339 21 15.3407 21C15.3475 21 15.3543 21 15.3611 21C15.3679 21 15.3747 21 15.3815 21C15.3883 21 15.3951 21 15.402 21C15.4088 21 15.4156 21 15.4224 21C15.4293 21 15.4361 21 15.443 21C15.4498 21 15.4567 21 15.4635 21C15.4704 21 15.4772 21 15.4841 21C15.491 21 15.4979 21 15.5047 21C15.5116 21 15.5185 21 15.5254 21C15.5323 21 15.5392 21 15.5461 21C15.553 21 15.5599 21 15.5668 21C15.5737 21 15.5806 21 15.5875 21C15.5945 21 15.6014 21 15.6083 21C15.6153 21 15.6222 21 15.6291 21C15.6361 21 15.643 21 15.65 21C15.6569 21 15.6639 21 15.6709 21C15.6778 21 15.6848 21 15.6918 21C15.6988 21 15.7058 21 15.7127 21C15.7197 21 15.7267 21 15.7337 21C15.7407 21 15.7477 21 15.7547 21C15.7618 21 15.7688 21 15.7758 21C15.7828 21 15.7898 21 15.7969 21C15.8039 21 15.811 21 15.818 21C15.825 21 15.8321 21 15.8392 21C15.8462 21 15.8533 21 15.8603 21C15.8674 21 15.8745 21 15.8816 21C15.8886 21 15.8957 21 15.9028 21C15.9099 21 15.917 21 15.9241 21C15.9312 21 15.9383 21 15.9454 21C15.9526 21 15.9597 21 15.9668 21C15.9739 21 15.9811 21 15.9882 21C15.9953 21 16.0025 21 16.0096 21C16.0168 21 16.0239 21 16.0311 21C16.0383 21 16.0454 21 16.0526 21C16.0598 21 16.067 21 16.0742 21C16.0813 21 16.0885 21 16.0957 21C16.1029 21 16.1101 21 16.1173 21C16.1246 21 16.1318 21 16.139 21C16.1462 21 16.1534 21 16.1607 21C16.1679 21 16.1752 21 16.1824 21C16.1897 21 16.1969 21 16.2042 21C16.2114 21 16.2187 21 16.226 21C16.2332 21 16.2405 21 16.2478 21C16.2551 21 16.2624 21 16.2697 21C16.277 21 16.2843 21 16.2916 21V19C16.2843 19 16.277 19 16.2697 19C16.2624 19 16.2551 19 16.2478 19C16.2405 19 16.2332 19 16.226 19C16.2187 19 16.2114 19 16.2042 19C16.1969 19 16.1897 19 16.1824 19C16.1752 19 16.1679 19 16.1607 19C16.1534 19 16.1462 19 16.139 19C16.1318 19 16.1246 19 16.1173 19C16.1101 19 16.1029 19 16.0957 19C16.0885 19 16.0813 19 16.0742 19C16.067 19 16.0598 19 16.0526 19C16.0454 19 16.0383 19 16.0311 19C16.0239 19 16.0168 19 16.0096 19C16.0025 19 15.9953 19 15.9882 19C15.9811 19 15.9739 19 15.9668 19C15.9597 19 15.9526 19 15.9454 19C15.9383 19 15.9312 19 15.9241 19C15.917 19 15.9099 19 15.9028 19C15.8957 19 15.8886 19 15.8816 19C15.8745 19 15.8674 19 15.8603 19C15.8533 19 15.8462 19 15.8392 19C15.8321 19 15.825 19 15.818 19C15.811 19 15.8039 19 15.7969 19C15.7898 19 15.7828 19 15.7758 19C15.7688 19 15.7618 19 15.7547 19C15.7477 19 15.7407 19 15.7337 19C15.7267 19 15.7197 19 15.7127 19C15.7058 19 15.6988 19 15.6918 19C15.6848 19 15.6778 19 15.6709 19C15.6639 19 15.6569 19 15.65 19C15.643 19 15.6361 19 15.6291 19C15.6222 19 15.6153 19 15.6083 19C15.6014 19 15.5945 19 15.5875 19C15.5806 19 15.5737 19 15.5668 19C15.5599 19 15.553 19 15.5461 19C15.5392 19 15.5323 19 15.5254 19C15.5185 19 15.5116 19 15.5047 19C15.4979 19 15.491 19 15.4841 19C15.4772 19 15.4704 19 15.4635 19C15.4567 19 15.4498 19 15.443 19C15.4361 19 15.4293 19 15.4224 19C15.4156 19 15.4088 19 15.402 19C15.3951 19 15.3883 19 15.3815 19C15.3747 19 15.3679 19 15.3611 19C15.3543 19 15.3475 19 15.3407 19C15.3339 19 15.3271 19 15.3203 19C15.3135 19 15.3067 19 15.3 19C15.2932 19 15.2864 19 15.2796 19C15.2729 19 15.2661 19 15.2594 19C15.2526 19 15.2459 19 15.2391 19C15.2324 19 15.2256 19 15.2189 19C15.2122 19 15.2054 19 15.1987 19C15.192 19 15.1853 19 15.1786 19C15.1719 19 15.1651 19 15.1584 19C15.1517 19 15.145 19 15.1383 19C15.1316 19 15.125 19 15.1183 19C15.1116 19 15.1049 19 15.0982 19C15.0916 19 15.0849 19 15.0782 19C15.0716 19 15.0649 19 15.0583 19C15.0516 19 15.0449 19 15.0383 19C15.0317 19 15.025 19 15.0184 19C15.0117 19 15.0051 19 14.9985 19C14.9919 19 14.9852 19 14.9786 19C14.972 19 14.9654 19 14.9588 19C14.9522 19 14.9456 19 14.939 19C14.9324 19 14.9258 19 14.9192 19C14.9126 19 14.906 19 14.8995 19C14.8929 19 14.8863 19 14.8797 19C14.8732 19 14.8666 19 14.86 19C14.8535 19 14.8469 19 14.8404 19C14.8338 19 14.8273 19 14.8207 19C14.8142 19 14.8076 19 14.8011 19C14.7946 19 14.788 19 14.7815 19C14.775 19 14.7685 19 14.762 19C14.7554 19 14.7489 19 14.7424 19C14.7359 19 14.7294 19 14.7229 19C14.7164 19 14.7099 19 14.7034 19C14.697 19 14.6905 19 14.684 19C14.6775 19 14.671 19 14.6646 19C14.6581 19 14.6516 19 14.6452 19C14.6387 19 14.6322 19 14.6258 19C14.6193 19 14.6129 19 14.6064 19C14.6 19 14.5935 19 14.5871 19C14.5807 19 14.5742 19 14.5678 19C14.5614 19 14.555 19 14.5485 19C14.5421 19 14.5357 19 14.5293 19C14.5229 19 14.5165 19 14.5101 19C14.5037 19 14.4973 19 14.4909 19C14.4845 19 14.4781 19 14.4717 19C14.4653 19 14.4589 19 14.4525 19C14.4462 19 14.4398 19 14.4334 19C14.427 19 14.4207 19 14.4143 19C14.408 19 14.4016 19 14.3952 19C14.3889 19 14.3825 19 14.3762 19C14.3698 19 14.3635 19 14.3572 19C14.3508 19 14.3445 19 14.3382 19C14.3318 19 14.3255 19 14.3192 19C14.3128 19 14.3065 19 14.3002 19C14.2939 19 14.2876 19 14.2813 19C14.275 19 14.2687 19 14.2624 19C14.2561 19 14.2498 19 14.2435 19C14.2372 19 14.2309 19 14.2246 19C14.2183 19 14.212 19 14.2058 19C14.1995 19 14.1932 19 14.1869 19C14.1807 19 14.1744 19 14.1681 19C14.1619 19 14.1556 19 14.1494 19C14.1431 19 14.1369 19 14.1306 19C14.1244 19 14.1181 19 14.1119 19C14.1056 19 14.0994 19 14.0932 19C14.0869 19 14.0807 19 14.0745 19C14.0683 19 14.062 19 14.0558 19C14.0496 19 14.0434 19 14.0372 19C14.031 19 14.0247 19 14.0185 19C14.0123 19 14.0061 19 13.9999 19C13.9937 19 13.9875 19 13.9814 19C13.9752 19 13.969 19 13.9628 19C13.9566 19 13.9504 19 13.9443 19C13.9381 19 13.9319 19 13.9257 19C13.9196 19 13.9134 19 13.9072 19C13.9011 19 13.8949 19 13.8887 19C13.8826 19 13.8764 19 13.8703 19C13.8641 19 13.858 19 13.8518 19C13.8457 19 13.8396 19 13.8334 19C13.8273 19 13.8212 19 13.815 19C13.8089 19 13.8028 19 13.7966 19C13.7905 19 13.7844 19 13.7783 19C13.7722 19 13.766 19 13.7599 19C13.7538 19 13.7477 19 13.7416 19C13.7355 19 13.7294 19 13.7233 19C13.7172 19 13.7111 19 13.705 19C13.6989 19 13.6928 19 13.6867 19C13.6807 19 13.6746 19 13.6685 19C13.6624 19 13.6563 19 13.6503 19C13.6442 19 13.6381 19 13.632 19C13.626 19 13.6199 19 13.6138 19C13.6078 19 13.6017 19 13.5957 19C13.5896 19 13.5836 19 13.5775 19C13.5715 19 13.5654 19 13.5594 19C13.5533 19 13.5473 19 13.5412 19C13.5352 19 13.5292 19 13.5231 19C13.5171 19 13.5111 19 13.505 19C13.499 19 13.493 19 13.487 19C13.4809 19 13.4749 19 13.4689 19C13.4629 19 13.4569 19 13.4509 19C13.4448 19 13.4388 19 13.4328 19C13.4268 19 13.4208 19 13.4148 19C13.4088 19 13.4028 19 13.3968 19C13.3908 19 13.3848 19 13.3789 19C13.3729 19 13.3669 19 13.3609 19C13.3549 19 13.3489 19 13.3429 19C13.337 19 13.331 19 13.325 19C13.319 19 13.3131 19 13.3071 19C13.3011 19 13.2952 19 13.2892 19C13.2832 19 13.2773 19 13.2713 19C13.2654 19 13.2594 19 13.2534 19C13.2475 19 13.2415 19 13.2356 19C13.2296 19 13.2237 19 13.2178 19C13.2118 19 13.2059 19 13.1999 19C13.194 19 13.1881 19 13.1821 19C13.1762 19 13.1703 19 13.1643 19C13.1584 19 13.1525 19 13.1465 19C13.1406 19 13.1347 19 13.1288 19C13.1229 19 13.1169 19 13.111 19C13.1051 19 13.0992 19 13.0933 19C13.0874 19 13.0815 19 13.0756 19C13.0696 19 13.0637 19 13.0578 19C13.0519 19 13.046 19 13.0401 19C13.0342 19 13.0283 19 13.0224 19C13.0166 19 13.0107 19 13.0048 19C12.9989 19 12.993 19 12.9871 19C12.9812 19 12.9753 19 12.9695 19C12.9636 19 12.9577 19 12.9518 19C12.946 19 12.9401 19 12.9342 19C12.9283 19 12.9225 19 12.9166 19C12.9107 19 12.9049 19 12.899 19C12.8931 19 12.8873 19 12.8814 19C12.8755 19 12.8697 19 12.8638 19C12.858 19 12.8521 19 12.8463 19C12.8404 19 12.8346 19 12.8287 19C12.8229 19 12.817 19 12.8112 19C12.8053 19 12.7995 19 12.7936 19C12.7878 19 12.782 19 12.7761 19C12.7703 19 12.7644 19 12.7586 19C12.7528 19 12.7469 19 12.7411 19C12.7353 19 12.7294 19 12.7236 19C12.7178 19 12.712 19 12.7061 19C12.7003 19 12.6945 19 12.6887 19C12.6829 19 12.677 19 12.6712 19C12.6654 19 12.6596 19 12.6538 19C12.648 19 12.6421 19 12.6363 19C12.6305 19 12.6247 19 12.6189 19C12.6131 19 12.6073 19 12.6015 19C12.5957 19 12.5899 19 12.5841 19C12.5783 19 12.5725 19 12.5667 19C12.5609 19 12.5551 19 12.5493 19C12.5435 19 12.5377 19 12.5319 19C12.5261 19 12.5203 19 12.5145 19C12.5088 19 12.503 19 12.4972 19C12.4914 19 12.4856 19 12.4798 19C12.474 19 12.4683 19 12.4625 19C12.4567 19 12.4509 19 12.4451 19C12.4394 19 12.4336 19 12.4278 19C12.422 19 12.4163 19 12.4105 19C12.4047 19 12.3989 19 12.3932 19C12.3874 19 12.3816 19 12.3759 19C12.3701 19 12.3643 19 12.3586 19C12.3528 19 12.347 19 12.3413 19C12.3355 19 12.3298 19 12.324 19C12.3182 19 12.3125 19 12.3067 19C12.301 19 12.2952 19 12.2894 19C12.2837 19 12.2779 19 12.2722 19C12.2664 19 12.2607 19 12.2549 19C12.2492 19 12.2434 19 12.2377 19C12.2319 19 12.2262 19 12.2204 19C12.2147 19 12.2089 19 12.2032 19C12.1974 19 12.1917 19 12.186 19C12.1802 19 12.1745 19 12.1687 19C12.163 19 12.1572 19 12.1515 19C12.1458 19 12.14 19 12.1343 19C12.1286 19 12.1228 19 12.1171 19C12.1113 19 12.1056 19 12.0999 19C12.0941 19 12.0884 19 12.0827 19C12.0769 19 12.0712 19 12.0655 19C12.0598 19 12.054 19 12.0483 19C12.0426 19 12.0368 19 12.0311 19C12.0254 19 12.0197 19 12.0139 19C12.0082 19 12.0025 19 11.9968 19C11.991 19 11.9853 19 11.9796 19C11.9739 19 11.9681 19 11.9624 19C11.9567 19 11.951 19 11.9453 19C11.9395 19 11.9338 19 11.9281 19C11.9224 19 11.9167 19 11.9109 19C11.9052 19 11.8995 19 11.8938 19C11.8881 19 11.8824 19 11.8766 19C11.8709 19 11.8652 19 11.8595 19C11.8538 19 11.8481 19 11.8423 19C11.8366 19 11.8309 19 11.8252 19C11.8195 19 11.8138 19 11.8081 19C11.8024 19 11.7966 19 11.7909 19C11.7852 19 11.7795 19 11.7738 19C11.7681 19 11.7624 19 11.7567 19C11.751 19 11.7453 19 11.7396 19C11.7338 19 11.7281 19 11.7224 19C11.7167 19 11.711 19 11.7053 19C11.6996 19 11.6939 19 11.6882 19C11.6825 19 11.6768 19 11.6711 19C11.6654 19 11.6596 19 11.6539 19C11.6482 19 11.6425 19 11.6368 19C11.6311 19 11.6254 19 11.6197 19C11.614 19 11.6083 19 11.6026 19C11.5969 19 11.5912 19 11.5855 19C11.5798 19 11.5741 19 11.5684 19C11.5627 19 11.557 19 11.5513 19C11.5456 19 11.5398 19 11.5341 19C11.5284 19 11.5227 19 11.517 19C11.5113 19 11.5056 19 11.4999 19C11.4942 19 11.4885 19 11.4828 19C11.4771 19 11.4714 19 11.4657 19C11.46 19 11.4543 19 11.4486 19C11.4429 19 11.4372 19 11.4315 19C11.4258 19 11.4201 19 11.4144 19C11.4087 19 11.4029 19 11.3972 19C11.3915 19 11.3858 19 11.3801 19C11.3744 19 11.3687 19 11.363 19C11.3573 19 11.3516 19 11.3459 19C11.3402 19 11.3345 19 11.3288 19C11.3231 19 11.3174 19 11.3117 19C11.3059 19 11.3002 19 11.2945 19C11.2888 19 11.2831 19 11.2774 19C11.2717 19 11.266 19 11.2603 19C11.2546 19 11.2489 19 11.2432 19C11.2375 19 11.2317 19 11.226 19C11.2203 19 11.2146 19 11.2089 19C11.2032 19 11.1975 19 11.1918 19C11.1861 19 11.1803 19 11.1746 19C11.1689 19 11.1632 19 11.1575 19C11.1518 19 11.1461 19 11.1403 19C11.1346 19 11.1289 19 11.1232 19C11.1175 19 11.1118 19 11.1061 19C11.1003 19 11.0946 19 11.0889 19C11.0832 19 11.0775 19 11.0717 19C11.066 19 11.0603 19 11.0546 19C11.0489 19 11.0431 19 11.0374 19C11.0317 19 11.026 19 11.0203 19C11.0145 19 11.0088 19 11.0031 19C10.9974 19 10.9916 19 10.9859 19C10.9802 19 10.9745 19 10.9687 19C10.963 19 10.9573 19 10.9515 19C10.9458 19 10.9401 19 10.9344 19C10.9286 19 10.9229 19 10.9172 19C10.9114 19 10.9057 19 10.9 19C10.8942 19 10.8885 19 10.8828 19C10.877 19 10.8713 19 10.8655 19C10.8598 19 10.8541 19 10.8483 19C10.8426 19 10.8368 19 10.8311 19C10.8254 19 10.8196 19 10.8139 19C10.8081 19 10.8024 19 10.7966 19C10.7909 19 10.7852 19 10.7794 19C10.7737 19 10.7679 19 10.7622 19C10.7564 19 10.7507 19 10.7449 19C10.7392 19 10.7334 19 10.7277 19C10.7219 19 10.7161 19 10.7104 19C10.7046 19 10.6989 19 10.6931 19C10.6874 19 10.6816 19 10.6758 19C10.6701 19 10.6643 19 10.6586 19C10.6528 19 10.647 19 10.6413 19C10.6355 19 10.6297 19 10.624 19C10.6182 19 10.6124 19 10.6067 19C10.6009 19 10.5951 19 10.5893 19C10.5836 19 10.5778 19 10.572 19C10.5663 19 10.5605 19 10.5547 19C10.5489 19 10.5431 19 10.5374 19C10.5316 19 10.5258 19 10.52 19C10.5142 19 10.5084 19 10.5027 19C10.4969 19 10.4911 19 10.4853 19C10.4795 19 10.4737 19 10.4679 19C10.4621 19 10.4563 19 10.4505 19C10.4447 19 10.4389 19 10.4332 19C10.4274 19 10.4216 19 10.4158 19C10.41 19 10.4041 19 10.3983 19C10.3925 19 10.3867 19 10.3809 19C10.3751 19 10.3693 19 10.3635 19C10.3577 19 10.3519 19 10.3461 19C10.3402 19 10.3344 19 10.3286 19C10.3228 19 10.317 19 10.3112 19C10.3053 19 10.2995 19 10.2937 19C10.2879 19 10.282 19 10.2762 19C10.2704 19 10.2646 19 10.2587 19C10.2529 19 10.2471 19 10.2412 19C10.2354 19 10.2296 19 10.2237 19C10.2179 19 10.212 19 10.2062 19C10.2004 19 10.1945 19 10.1887 19C10.1828 19 10.177 19 10.1711 19C10.1653 19 10.1594 19 10.1536 19C10.1477 19 10.1419 19 10.136 19C10.1302 19 10.1243 19 10.1184 19C10.1126 19 10.1067 19 10.1008 19C10.095 19 10.0891 19 10.0832 19C10.0774 19 10.0715 19 10.0656 19C10.0598 19 10.0539 19 10.048 19C10.0421 19 10.0363 19 10.0304 19C10.0245 19 10.0186 19 10.0127 19C10.0068 19 10.001 19 9.99506 19C9.98917 19 9.98328 19 9.97739 19C9.97149 19 9.9656 19 9.9597 19C9.9538 19 9.9479 19 9.942 19C9.9361 19 9.93019 19 9.92429 19C9.91838 19 9.91247 19 9.90656 19C9.90065 19 9.89473 19 9.88882 19C9.8829 19 9.87698 19 9.87106 19C9.86514 19 9.85922 19 9.8533 19C9.84737 19 9.84144 19 9.83551 19C9.82958 19 9.82365 19 9.81772 19C9.81178 19 9.80585 19 9.79991 19C9.79397 19 9.78803 19 9.78208 19C9.77614 19 9.77019 19 9.76424 19C9.75829 19 9.75234 19 9.74639 19C9.74043 19 9.73448 19 9.72852 19C9.72256 19 9.7166 19 9.71064 19C9.70467 19 9.69871 19 9.69274 19C9.68677 19 9.6808 19 9.67482 19C9.66885 19 9.66287 19 9.65689 19C9.65091 19 9.64493 19 9.63895 19C9.63296 19 9.62698 19 9.62099 19C9.615 19 9.609 19 9.60301 19C9.59701 19 9.59102 19 9.58502 19C9.57902 19 9.57301 19 9.56701 19C9.561 19 9.55499 19 9.54898 19C9.54297 19 9.53696 19 9.53094 19C9.52492 19 9.5189 19 9.51288 19C9.50686 19 9.50083 19 9.4948 19C9.48878 19 9.48275 19 9.47671 19C9.47068 19 9.46464 19 9.4586 19C9.45256 19 9.44652 19 9.44048 19C9.43443 19 9.42838 19 9.42233 19C9.41628 19 9.41023 19 9.40417 19C9.39811 19 9.39205 19 9.38599 19C9.37993 19 9.37386 19 9.3678 19C9.36173 19 9.35566 19 9.34958 19C9.34351 19 9.33743 19 9.33135 19C9.32527 19 9.31918 19 9.3131 19C9.30701 19 9.30092 19 9.29483 19C9.28873 19 9.28264 19 9.27654 19C9.27044 19 9.26434 19 9.25823 19C9.25213 19 9.24602 19 9.23991 19C9.2338 19 9.22768 19 9.22156 19C9.21544 19 9.20932 19 9.2032 19C9.19707 19 9.19095 19 9.18482 19C9.17869 19 9.17255 19 9.16641 19C9.16028 19 9.15414 19 9.14799 19C9.14185 19 9.1357 19 9.12955 19C9.1234 19 9.11725 19 9.11109 19C9.10493 19 9.09877 19 9.09261 19C9.08644 19 9.08028 19 9.07411 19C9.06794 19 9.06176 19 9.05559 19C9.04941 19 9.04323 19 9.03704 19C9.03086 19 9.02467 19 9.01848 19C9.01229 19 9.0061 19 8.9999 19C8.9937 19 8.9875 19 8.98129 19C8.97509 19 8.96888 19 8.96267 19C8.95646 19 8.95024 19 8.94402 19C8.9378 19 8.93158 19 8.92535 19C8.91913 19 8.9129 19 8.90666 19C8.90043 19 8.89419 19 8.88795 19C8.88171 19 8.87547 19 8.86922 19C8.86297 19 8.85672 19 8.85047 19C8.84421 19 8.83795 19 8.83169 19C8.82543 19 8.81916 19 8.81289 19C8.80662 19 8.80035 19 8.79407 19C8.78779 19 8.78151 19 8.77523 19C8.76894 19 8.76265 19 8.75636 19C8.75007 19 8.74377 19 8.73747 19C8.73117 19 8.72487 19 8.71856 19C8.71225 19 8.70594 19 8.69962 19C8.69331 19 8.68699 19 8.68066 19C8.67434 19 8.66801 19 8.66168 19C8.65535 19 8.64902 19 8.64268 19C8.63634 19 8.63 19 8.62365 19C8.6173 19 8.61095 19 8.6046 19C8.59824 19 8.59188 19 8.58552 19C8.57916 19 8.57279 19 8.56642 19C8.56005 19 8.55367 19 8.54729 19C8.54091 19 8.53453 19 8.52814 19C8.52176 19 8.51537 19 8.50897 19C8.50257 19 8.49618 19 8.48977 19C8.48337 19 8.47696 19 8.47055 19C8.46414 19 8.45772 19 8.4513 19C8.44488 19 8.43845 19 8.43203 19C8.4256 19 8.41916 19 8.41273 19C8.40629 19 8.39985 19 8.3934 19C8.38696 19 8.38051 19 8.37405 19C8.3676 19 8.36114 19 8.35468 19C8.34821 19 8.34175 19 8.33528 19C8.3288 19 8.32233 19 8.31585 19C8.30937 19 8.30288 19 8.29639 19C8.28991 19 8.28341 19 8.27691 19C8.27042 19 8.26391 19 8.25741 19C8.2509 19 8.24439 19 8.23787 19C8.23136 19 8.22484 19 8.21831 19C8.21179 19 8.20526 19 8.19873 19C8.19219 19 8.18566 19 8.17911 19C8.17257 19 8.16602 19 8.15947 19C8.15292 19 8.14637 19 8.1398 19C8.13324 19 8.12668 19 8.12011 19C8.11354 19 8.10696 19 8.10039 19C8.09381 19 8.08722 19 8.08063 19C8.07405 19 8.06745 19 8.06085 19C8.05426 19 8.04765 19 8.04105 19C8.03444 19 8.02783 19 8.02121 19C8.0146 19 8.00797 19 8.00135 19C7.99472 19 7.98809 19 7.98146 19C7.97482 19 7.96818 19 7.96153 19C7.95489 19 7.94824 19 7.94158 19C7.93493 19 7.92827 19 7.92161 19C7.91494 19 7.90827 19 7.9016 19C7.89492 19 7.88824 19 7.88156 19C7.87488 19 7.86819 19 7.86149 19C7.8548 19 7.8481 19 7.8414 19C7.83469 19 7.82799 19 7.82127 19C7.81456 19 7.80784 19 7.80112 19C7.79439 19 7.78766 19 7.78093 19C7.7742 19 7.76746 19 7.76072 19C7.75397 19 7.74722 19 7.74047 19C7.73372 19 7.72696 19 7.72019 19C7.71343 19 7.70666 19 7.69989 19C7.69311 19 7.68633 19 7.67955 19C7.67276 19 7.66597 19 7.65918 19C7.65238 19 7.64558 19 7.63878 19C7.63197 19 7.62516 19 7.61835 19C7.61153 19 7.60471 19 7.59789 19C7.59106 19 7.58423 19 7.57739 19C7.57056 19 7.56371 19 7.55687 19C7.55002 19 7.54317 19 7.53631 19C7.52945 19 7.52259 19 7.51572 19C7.50885 19 7.50198 19 7.4951 19C7.48822 19 7.48134 19 7.47445 19C7.46756 19 7.46066 19 7.45376 19C7.44686 19 7.43996 19 7.43304 19C7.42613 19 7.41922 19 7.41229 19C7.40537 19 7.39844 19 7.39151 19C7.38458 19 7.37764 19 7.37069 19C7.36375 19 7.3568 19 7.34984 19C7.34289 19 7.33593 19 7.32896 19C7.32199 19 7.31502 19 7.30805 19C7.30107 19 7.29408 19 7.2871 19C7.28011 19 7.27311 19 7.26611 19C7.25911 19 7.25211 19 7.2451 19C7.23808 19 7.23107 19 7.22404 19C7.21702 19 7.20999 19 7.20296 19C7.19593 19 7.18889 19 7.18184 19C7.17479 19 7.16774 19 7.16069 19C7.15363 19 7.14657 19 7.1395 19C7.13243 19 7.12536 19 7.11828 19C7.1112 19 7.10411 19 7.09702 19C7.08993 19 7.08283 19 7.07572 19C7.06862 19 7.06151 19 7.0544 19C7.04728 19 7.04016 19 7.03303 19C7.02591 19 7.01877 19 7.01164 19C7.0045 19 6.99735 19 6.9902 19C6.98305 19 6.97589 19 6.96873 19C6.96157 19 6.9544 19 6.94723 19C6.94005 19 6.93287 19 6.92568 19C6.9185 19 6.9113 19 6.90411 19C6.89691 19 6.8897 19 6.88249 19C6.87528 19 6.86806 19 6.86084 19C6.85362 19 6.84639 19 6.83915 19C6.83192 19 6.82468 19 6.81743 19C6.81018 19 6.80293 19 6.79567 19C6.78841 19 6.78114 19 6.77387 19C6.7666 19 6.75932 19 6.75203 19C6.74475 19 6.73746 19 6.73016 19C6.72286 19 6.71556 19 6.70825 19V21Z"
                                                    fill="#787E95"
                                                />
                                            </svg>
                                        </span>
                                        {nameVisiblity && (
                                            <span className="txt-medium">
                                                Knowledge
                                            </span>
                                        )}
                                    </Link>

                                    <div className="innerNav df col">
                                        <Link
                                            className={
                                                location.pathname.slice(0, 5) ==
                                                "/news"
                                                    ? "nestedLink active "
                                                    : " inactive nestedLink"
                                            }
                                            to="/news"
                                        >
                                            News
                                        </Link>
                                        <Link
                                            className={
                                                location.pathname.slice(
                                                    0,
                                                    11
                                                ) == "/activities"
                                                    ? "nestedLink active "
                                                    : " inactive nestedLink"
                                            }
                                            to="/activities"
                                        >
                                            Activities
                                        </Link>
                                    </div>
                                </li>
                                <li
                                    className="df  col"
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                >
                                    <div
                                        className="df row"
                                        style={{
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <Link
                                            className={
                                                (location.pathname ==
                                                    "/profile/profile" &&
                                                    profile == 0) ||
                                                location.pathname ==
                                                    "/profile/categories"
                                                    ? "df row active row-center flex-1"
                                                    : "df row row-center flex-1 inactive"
                                            }
                                            onClick={() => {
                                                setProfile(0);
                                            }}
                                            to="/profile/profile"
                                        >
                                            <span>
                                                <svg
                                                    width="20"
                                                    height="22"
                                                    viewBox="0 0 20 22"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M13.71 11.7101C14.6904 10.9388 15.406 9.88105 15.7572 8.68407C16.1085 7.48709 16.0779 6.21039 15.6698 5.03159C15.2617 3.85279 14.4963 2.83052 13.4801 2.10698C12.4639 1.38344 11.2474 0.994629 10 0.994629C8.75255 0.994629 7.53611 1.38344 6.51993 2.10698C5.50374 2.83052 4.73834 3.85279 4.33021 5.03159C3.92208 6.21039 3.89151 7.48709 4.24276 8.68407C4.59401 9.88105 5.3096 10.9388 6.29 11.7101C4.61007 12.3832 3.14428 13.4995 2.04889 14.94C0.953495 16.3806 0.26956 18.0914 0.0699967 19.8901C0.0555513 20.0214 0.0671132 20.1543 0.104022 20.2812C0.140931 20.408 0.202464 20.5264 0.285108 20.6294C0.452016 20.8376 0.69478 20.971 0.959997 21.0001C1.22521 21.0293 1.49116 20.9519 1.69932 20.785C1.90749 20.6181 2.04082 20.3753 2.07 20.1101C2.28958 18.1553 3.22168 16.3499 4.68822 15.0389C6.15475 13.7279 8.0529 13.0032 10.02 13.0032C11.9871 13.0032 13.8852 13.7279 15.3518 15.0389C16.8183 16.3499 17.7504 18.1553 17.97 20.1101C17.9972 20.3558 18.1144 20.5828 18.2991 20.7471C18.4838 20.9115 18.7228 21.0016 18.97 21.0001H19.08C19.3421 20.97 19.5817 20.8374 19.7466 20.6314C19.9114 20.4253 19.9881 20.1625 19.96 19.9001C19.7595 18.0963 19.0719 16.3811 17.9708 14.9383C16.8698 13.4955 15.3969 12.3796 13.71 11.7101ZM10 11.0001C9.20887 11.0001 8.43551 10.7655 7.77772 10.326C7.11992 9.88648 6.60723 9.26176 6.30448 8.53086C6.00173 7.79995 5.92251 6.99569 6.07686 6.21976C6.2312 5.44384 6.61216 4.73111 7.17157 4.1717C7.73098 3.61229 8.44371 3.23132 9.21964 3.07698C9.99556 2.92264 10.7998 3.00186 11.5307 3.30461C12.2616 3.60736 12.8863 4.12005 13.3259 4.77784C13.7654 5.43564 14 6.209 14 7.00012C14 8.06099 13.5786 9.07841 12.8284 9.82855C12.0783 10.5787 11.0609 11.0001 10 11.0001Z"
                                                        fill="#545454"
                                                    />
                                                </svg>
                                            </span>
                                            {nameVisiblity && (
                                                <span className="txt-medium">
                                                    Profile
                                                </span>
                                            )}
                                        </Link>
                                    </div>
                                    <div className="innerNav df col">
                                        <Link
                                            to="/profile/profile"
                                            onClick={() => {
                                                setProfile(1);
                                            }}
                                            className={
                                                location.pathname ==
                                                    "/profile/profile" &&
                                                profile != 0
                                                    ? "active nestedLink"
                                                    : " inactive nestedLink"
                                            }
                                        >
                                            My Profile
                                        </Link>
                                        <Link
                                            to="/profile/bookmarks"
                                            onClick={() => {
                                                setProfile(2);
                                            }}
                                            className={
                                                location.pathname ==
                                                "/profile/bookmarks"
                                                    ? "active nestedLink"
                                                    : " inactive nestedLink"
                                            }
                                        >
                                            Bookmarks
                                        </Link>

                                        <Link
                                            onClick={() => {
                                                logOut();
                                            }}
                                                className="nestedLink inactive margin20"
                                            to=""
                                        >
                                            Logout
                                        </Link>
                                    </div>
                                </li>
                            </ul>
                        </nav>
                    )}
                    <main
                        className="df flex-1 bg-primary row bg-white"
                        style={{
                            flexDirection: "column",
                            top: windowSize.marginTop,
                            position:
                                windowSize.width < 1000 ? "fixed" : "unset",
                            height: windowSize.height,
                            maxHeight: windowSize.height,
                        }}
                    >
                        {Props.children}
                    </main>
                </div>
            )}

            {windowSize.width <= 1000 && (
                <>
                    <div className="df nav_container flex-1">
                        {nameVisiblity && (
                            <div className="pop_up_container">
                                <div
                                    className="grayArea"
                                    onClick={() => {
                                        setNameVisiblity(!nameVisiblity);
                                    }}
                                ></div>
                            </div>
                        )}
                        {location.pathname.slice(0, 9) != "/activity" &&
                            nameVisiblity && (
                                <nav
                                    className={
                                        nameVisiblity
                                            ? "df vertical_nav_bar"
                                            : "df vertical_nav_bar small_nav"
                                    }
                                >
                                    <ul className="df fit-content">
                                        <div className="df logo_area row-center smallNavLogoArea fixed">
                                            <button
                                                className="bar_icon"
                                                onClick={() => {
                                                    setNameVisiblity(
                                                        !nameVisiblity
                                                    );
                                                }}
                                                style={{marginBottom: -5}}
                                            >
                                                {/* <svg
                                                    width="21"
                                                    height="16"
                                                    viewBox="0 0 21 16"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <g clipPath="url(#clip0_187:275)">
                                                        <path
                                                            d="M1.93408 1.33301H19.2674"
                                                            stroke="#5C56D4"
                                                            strokeWidth="3"
                                                            strokeMiterlimit="1"
                                                            strokeLinecap="round"
                                                        />
                                                        <path
                                                            d="M1.93408 8H19.2674"
                                                            stroke="#5C56D4"
                                                            strokeWidth="3"
                                                            strokeMiterlimit="1"
                                                            strokeLinecap="round"
                                                        />
                                                        <path
                                                            d="M1.93408 14.666H19.2674"
                                                            stroke="#5C56D4"
                                                            strokeWidth="3"
                                                            strokeMiterlimit="1"
                                                            strokeLinecap="round"
                                                        />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_187:275">
                                                            <rect
                                                                x="0.600586"
                                                                width="20"
                                                                height="16"
                                                                fill="white"
                                                            />
                                                        </clipPath>
                                                    </defs>
                                                </svg> */}
                                            </button>
                                            {((location.pathname.slice(0, 5) ==
                                                "/news" &&
                                                location.pathname.length > 6) ||
                                                (location.pathname.slice(
                                                    0,
                                                    5
                                                ) == "/home" &&
                                                    location.pathname.length >
                                                        6) ||
                                                location.pathname.slice(-8) ==
                                                    "/details" ||
                                                location.pathname.slice(-22) ==
                                                    "/rules-and-eligibility") &&
                                                windowSize.width < 1000 && (
                                                    <button
                                                        className="df center"
                                                        style={{
                                                            margin: "5px 10px 5px 0px",
                                                        }}
                                                        onClick={() => {
                                                            history.goBack();
                                                        }}
                                                    >
                                                        <svg
                                                            width="146"
                                                            height="32"
                                                            viewBox="0 0 146 32"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <g clipPath="url(#clip0_187:282)">
                                                                <path
                                                                    fillRule="evenodd"
                                                                    clipRule="evenodd"
                                                                    d="M15.1202 32.0002H1.75732L2.3151 30.7759H14.5615L15.1202 32.0002Z"
                                                                    fill="#5C56D4"
                                                                />
                                                                <path
                                                                    fillRule="evenodd"
                                                                    clipRule="evenodd"
                                                                    d="M12.9387 13.4677L10.4949 0.489538L9.02927 0V15.4279L9.51781 15.9174L9.89857 17.0626C10.4969 17.3864 10.9705 17.9 11.2448 18.5225C11.5192 19.145 11.5787 19.8411 11.414 20.5011C11.2494 21.1611 10.8698 21.7477 10.3352 22.1683C9.80058 22.589 9.14123 22.8199 8.46097 22.8247C7.7807 22.8294 7.11817 22.6078 6.57769 22.1947C6.03721 21.7816 5.64947 21.2005 5.47554 20.5428C5.3016 19.8852 5.35134 19.1883 5.61693 18.562C5.88252 17.9357 6.34887 17.4156 6.94255 17.0834L7.33022 15.9174L7.81877 15.4279V0L6.35312 0.489538L3.90939 13.4677L0 18.1208L2.31517 30.3514H14.5615L16.848 18.1208L12.9387 13.4677ZM2.06002 19.5717C2.06002 19.5279 2.06865 19.4846 2.08541 19.4443C2.10217 19.4039 2.12673 19.3672 2.15769 19.3363C2.18865 19.3055 2.2254 19.281 2.26583 19.2644C2.30626 19.2477 2.34958 19.2392 2.3933 19.2394H4.25058C4.29581 19.2369 4.34106 19.2437 4.38358 19.2593C4.42611 19.2749 4.465 19.299 4.49789 19.3302C4.53078 19.3613 4.55697 19.3988 4.57487 19.4404C4.59278 19.482 4.60201 19.5269 4.60201 19.5721C4.60201 19.6174 4.59278 19.6623 4.57487 19.7039C4.55697 19.7455 4.53078 19.783 4.49789 19.8141C4.465 19.8453 4.42611 19.8694 4.38358 19.885C4.34106 19.9006 4.29581 19.9074 4.25058 19.9049H2.39132C2.3031 19.9047 2.21858 19.8694 2.15629 19.807C2.094 19.7445 2.05903 19.6599 2.05903 19.5717H2.06002ZM4.96263 21.9788L3.3526 22.9084C3.30217 22.9378 3.24481 22.9532 3.18645 22.9529C3.11298 22.9533 3.04145 22.9293 2.98305 22.8848C2.92465 22.8402 2.88267 22.7775 2.86368 22.7065C2.8447 22.6355 2.84977 22.5603 2.87811 22.4925C2.90644 22.4247 2.95645 22.3682 3.0203 22.3319L4.62935 21.4022C4.70552 21.3624 4.79412 21.3536 4.87666 21.3775C4.95919 21.4015 5.02928 21.4564 5.07229 21.5308C5.1153 21.6052 5.12791 21.6934 5.10747 21.7768C5.08704 21.8603 5.03515 21.9327 4.96263 21.9788ZM6.61223 23.4217L5.6826 25.0317C5.6534 25.0825 5.61133 25.1247 5.56063 25.154C5.50994 25.1834 5.4524 25.1988 5.39382 25.1989C5.33629 25.1979 5.27999 25.1821 5.23035 25.153C5.18071 25.1239 5.13942 25.0825 5.11048 25.0328C5.08154 24.9831 5.06592 24.9267 5.06514 24.8692C5.06436 24.8116 5.07845 24.7549 5.10603 24.7044L6.03566 23.0944C6.07973 23.0179 6.15236 22.9621 6.23758 22.9392C6.32281 22.9163 6.41364 22.9282 6.49009 22.9722C6.56655 23.0163 6.62237 23.0889 6.64528 23.1741C6.66818 23.2594 6.65629 23.3502 6.61223 23.4266V23.4217ZM8.76225 25.7062C8.7576 25.7913 8.72052 25.8714 8.65862 25.9301C8.59672 25.9887 8.51471 26.0213 8.42946 26.0213C8.34421 26.0213 8.2622 25.9887 8.2003 25.9301C8.1384 25.8714 8.10131 25.7913 8.09667 25.7062V23.847C8.10131 23.7618 8.1384 23.6817 8.2003 23.6231C8.2622 23.5645 8.34421 23.5318 8.42946 23.5318C8.51471 23.5318 8.59672 23.5645 8.65862 23.6231C8.72052 23.6817 8.7576 23.7618 8.76225 23.847V25.7062ZM11.6441 25.2048C11.5937 25.2342 11.5363 25.2496 11.4779 25.2493C11.4194 25.2496 11.3619 25.2344 11.3112 25.2052C11.2604 25.176 11.2183 25.1339 11.1892 25.0832L10.2546 23.4781C10.2148 23.4019 10.2059 23.3133 10.2299 23.2308C10.2538 23.1482 10.3088 23.0781 10.3832 23.0351C10.4576 22.9921 10.5457 22.9795 10.6292 22.9999C10.7127 23.0204 10.785 23.0723 10.8312 23.1448L11.7608 24.7548C11.8034 24.8308 11.8145 24.9205 11.7917 25.0046C11.769 25.0887 11.7142 25.1606 11.6391 25.2048H11.6441ZM14.0107 22.8748C13.9816 22.9256 13.9395 22.9679 13.8888 22.9972C13.8381 23.0266 13.7805 23.042 13.7219 23.0419C13.6638 23.0419 13.6067 23.0262 13.5568 22.9964L11.9467 22.0678C11.8703 22.0237 11.8144 21.9511 11.7915 21.8659C11.7686 21.7807 11.7805 21.6898 11.8246 21.6134C11.8686 21.5369 11.9413 21.4811 12.0265 21.4582C12.1117 21.4353 12.2026 21.4472 12.279 21.4912L13.889 22.4209C13.9645 22.4657 14.0192 22.5387 14.0411 22.6238C14.0629 22.7088 14.0502 22.7991 14.0057 22.8748H14.0107ZM14.5635 20.0068H12.7043C12.659 20.0093 12.6138 20.0025 12.5713 19.9869C12.5287 19.9713 12.4898 19.9472 12.457 19.916C12.4241 19.8849 12.3979 19.8473 12.38 19.8057C12.3621 19.7641 12.3528 19.7193 12.3528 19.674C12.3528 19.6287 12.3621 19.5839 12.38 19.5423C12.3979 19.5007 12.4241 19.4632 12.457 19.432C12.4898 19.4009 12.5287 19.3768 12.5713 19.3611C12.6138 19.3455 12.659 19.3388 12.7043 19.3412H14.5556C14.6407 19.3459 14.7208 19.3829 14.7795 19.4449C14.8381 19.5068 14.8707 19.5888 14.8707 19.674C14.8707 19.7593 14.8381 19.8413 14.7795 19.9032C14.7208 19.9651 14.6407 20.0022 14.5556 20.0068H14.5635Z"
                                                                    fill="#5C56D4"
                                                                />
                                                                <path
                                                                    d="M32.3254 3.36896C31.2751 2.78514 30.3655 2.49406 29.5964 2.49571C29.167 2.47015 28.7402 2.57944 28.3759 2.8083C28.2307 2.9162 28.1148 3.05882 28.039 3.22308C27.9631 3.38734 27.9297 3.568 27.9417 3.74853C27.9529 3.95702 28.0165 4.15932 28.1266 4.33669C28.2368 4.51406 28.3899 4.66076 28.5719 4.76318C29.0976 5.10802 29.6633 5.38792 30.2563 5.59675C30.7689 5.77915 31.2584 6.02059 31.7151 6.31619C32.1349 6.60183 32.4802 6.98375 32.7223 7.43007C33.0097 7.98469 33.1482 8.60445 33.1242 9.22867C33.127 9.84118 32.9595 10.4424 32.6404 10.9653C32.2992 11.5152 31.8077 11.956 31.2239 12.2354C30.5266 12.5644 29.7618 12.7251 28.9911 12.7043C28.2596 12.7026 27.5324 12.5931 26.8328 12.3793C26.1211 12.1602 25.4505 11.8249 24.8481 11.387L25.8975 9.52142C26.3346 9.84085 26.8149 10.0965 27.324 10.2806C27.7831 10.464 28.2711 10.5648 28.7654 10.5782C29.2238 10.5899 29.6769 10.4785 30.0777 10.2557C30.2593 10.151 30.4077 9.99727 30.506 9.81213C30.6043 9.62698 30.6484 9.41791 30.6334 9.20883C30.6334 8.58035 30.0488 8.0354 28.8795 7.57397C28.2911 7.34479 27.717 7.08052 27.1603 6.78258C26.6853 6.51542 26.2779 6.14283 25.9695 5.6935C25.6222 5.16611 25.4487 4.54325 25.4733 3.91226C25.454 3.44258 25.5355 2.97421 25.7122 2.53861C25.8889 2.10301 26.1568 1.71027 26.4979 1.38678C27.1809 0.748382 28.0906 0.401893 29.2268 0.347314C29.9826 0.32922 30.7364 0.432241 31.4595 0.652459C32.087 0.868761 32.6834 1.16652 33.2333 1.53811L32.3254 3.36896ZM38.907 8.05276C38.9107 8.44517 39.0288 8.82797 39.2469 9.15425C39.4766 9.50879 39.788 9.80313 40.1549 10.0126C40.5227 10.2306 40.9429 10.3447 41.3705 10.3426C41.822 10.3502 42.2673 10.2372 42.6605 10.0151C43.0293 9.80896 43.34 9.51282 43.5635 9.15425C43.7801 8.82745 43.8973 8.44483 43.9009 8.05276V0.394451H46.2651V8.10238C46.2753 8.93237 46.049 9.74811 45.6127 10.4542C45.1819 11.1486 44.5705 11.7128 43.8438 12.0866C43.0846 12.4715 42.2453 12.6721 41.394 12.6721C40.5428 12.6721 39.7035 12.4715 38.9442 12.0866C38.2227 11.712 37.6171 11.1476 37.1927 10.4542C36.7616 9.74631 36.5389 8.93116 36.5502 8.10238V0.394451H38.912L38.907 8.05276ZM63.0653 0V12.6051H60.5696V6.78507L56.6796 12.4736H56.6449L52.8319 7.14975V12.6076H50.5991V0L56.7367 8.70522L63.0206 0H63.0653ZM79.8704 0V12.6051H77.5062V6.78507L73.584 12.4736H73.5518L69.761 7.14975V12.6076H67.3968V0H67.4142L73.5518 8.70522L79.8357 0H79.8704ZM105.381 11.5706C104.936 11.8968 104.444 12.1529 103.922 12.3297C103.224 12.5881 102.485 12.7167 101.741 12.7093C100.593 12.7373 99.4595 12.4517 98.4617 11.8832C97.5576 11.357 96.8194 10.5878 96.3307 9.66282C95.8335 8.71958 95.5778 7.66776 95.5865 6.60148C95.5686 5.46843 95.8239 4.34775 96.3307 3.33423C96.7947 2.40963 97.5112 1.63546 98.3972 1.10149C99.3235 0.557572 100.382 0.280257 101.456 0.300178C102.145 0.293752 102.83 0.394182 103.488 0.59788C104.064 0.775206 104.615 1.02531 105.128 1.34213L104.192 3.60216C103.444 2.98327 102.509 2.6338 101.538 2.60983C100.926 2.60956 100.328 2.78805 99.8163 3.12336C99.2752 3.46842 98.8339 3.94909 98.5362 4.51759C98.2174 5.1194 98.0546 5.7915 98.0623 6.47248C98.0462 7.18236 98.1975 7.88605 98.5039 8.5266C98.7837 9.09806 99.2221 9.5769 99.7667 9.90594C100.348 10.2456 101.012 10.4173 101.684 10.4021C102.228 10.4104 102.768 10.3127 103.275 10.1143C103.685 9.95739 104.063 9.72518 104.388 9.42962L105.381 11.5706ZM119.256 12.6051H116.894V7.61614H111.511V12.6051H109.147V0.394451H111.511V5.25191H116.894V0.394451H119.256V12.6051ZM129.705 10.2409H125.736L124.759 12.6051H122.407L127.84 0H127.971L133.404 12.6051H130.636L129.705 10.2409ZM128.931 8.14208L127.768 5.18493L126.555 8.1396L128.931 8.14208ZM143.022 12.6076L140.517 8.7995H138.949V12.6076H136.587V0.394451H140.222C141.71 0.394451 142.868 0.762443 143.695 1.49842C144.522 2.2344 144.935 3.23831 144.935 4.51014C144.939 5.24037 144.781 5.96234 144.471 6.62381C144.167 7.27533 143.669 7.81688 143.045 8.17432L145.831 12.6051L143.022 12.6076ZM138.949 6.42534H140.653C141.301 6.42534 141.773 6.23432 142.067 5.85227C142.354 5.50254 142.511 5.06422 142.511 4.61186C142.51 4.1619 142.379 3.72189 142.134 3.34415C141.886 2.94226 141.39 2.74131 140.671 2.74131H138.959L138.949 6.42534ZM88.9279 0.0148844L89.9525 0.359715L91.6618 9.46932L94.3907 12.7366H89.7813L89.2703 11.1885L88.9279 10.8462V0.0148844ZM88.01 0.0148844V10.8462L87.6677 11.1885L87.1566 12.7366H82.5448L85.2737 9.46932L86.9805 0.359715L88.01 0.0148844Z"
                                                                    fill="#5C56D4"
                                                                />
                                                                <path
                                                                    d="M29.4118 16.7733C30.4969 16.7405 31.5753 16.9546 32.5656 17.3995C33.3817 17.7756 34.0657 18.3886 34.5286 19.1588C34.9958 19.9764 35.2297 20.9065 35.2047 21.8479C35.2029 22.4752 35.1097 23.099 34.9281 23.6994C34.7474 24.3146 34.4486 24.8887 34.0484 25.3897C33.6134 25.918 33.0591 26.3354 32.4312 26.6074C31.645 26.9364 30.7976 27.0935 29.9457 27.0684H27.8137V31.851H24.8481V16.7733H29.4118ZM29.9227 24.1681C30.3113 24.1824 30.6976 24.102 31.0482 23.9338C31.3284 23.7969 31.571 23.5938 31.7551 23.3422C31.9265 23.1172 32.0566 22.8636 32.1392 22.5931C32.2096 22.3744 32.2484 22.1467 32.2544 21.917C32.247 21.7143 32.2226 21.5126 32.1815 21.3139C32.1258 21.0433 32.0258 20.7837 31.8857 20.5456C31.718 20.2711 31.4808 20.0458 31.198 19.8926C30.8167 19.6953 30.3899 19.6025 29.9611 19.6237H27.8291V24.1681H29.9227Z"
                                                                    fill="#5C56D4"
                                                                />
                                                                <path
                                                                    d="M34.6323 31.8511L41.4278 16.1934H41.593L48.3885 31.8511H44.9504L40.6096 20.8377L42.7608 19.3664L37.5595 31.8511H34.6323ZM39.2805 26.4078H43.8018L44.8467 28.9047H38.3585L39.2805 26.4078Z"
                                                                    fill="#5C56D4"
                                                                />
                                                                <path
                                                                    d="M48.3271 16.7734H58.4801V19.6391H54.8153V31.8511H51.8498V19.6391H48.3271V16.7734Z"
                                                                    fill="#5C56D4"
                                                                />
                                                                <path
                                                                    d="M74.0186 16.7734V31.8511H71.0492V25.7048H64.3151V31.8511H61.3457V16.7734H64.3151V22.8544H71.0492V16.7734H74.0186Z"
                                                                    fill="#5C56D4"
                                                                />
                                                                <path
                                                                    d="M85.9543 20.4188C85.3929 20.1141 84.807 19.8571 84.2026 19.6505C83.6676 19.4566 83.1043 19.3528 82.5354 19.3432C82.0033 19.3114 81.4744 19.4456 81.0219 19.7273C80.84 19.8572 80.6939 20.031 80.5971 20.2325C80.5004 20.4339 80.4562 20.6566 80.4687 20.8798C80.4695 21.0588 80.507 21.2357 80.5791 21.3996C80.6511 21.5635 80.7561 21.7108 80.8874 21.8325C81.2055 22.1392 81.5714 22.3922 81.9707 22.5815C82.4214 22.802 82.8829 22.9995 83.3536 23.1731C83.7994 23.3405 84.2343 23.5355 84.6559 23.757C85.0783 23.9808 85.4664 24.2641 85.8083 24.5983C86.162 24.9554 86.4402 25.38 86.6265 25.8468C86.8465 26.4319 86.9509 27.0542 86.9338 27.6791C86.9365 28.43 86.7304 29.1668 86.3384 29.8073C85.9155 30.4862 85.3133 31.0352 84.5982 31.3938C83.7203 31.8218 82.751 32.0288 81.7748 31.9969C81.1867 31.9953 80.6001 31.9374 80.0231 31.824C79.424 31.7054 78.8384 31.5265 78.2752 31.2901C77.6908 31.0474 77.1344 30.7422 76.6157 30.3797L77.9257 28.0748C78.2876 28.3382 78.6734 28.5672 79.0781 28.7586C79.4817 28.9537 79.9038 29.1082 80.3381 29.2195C80.7136 29.3233 81.1009 29.3788 81.4905 29.3847C81.8545 29.3843 82.2166 29.3326 82.5661 29.2311C82.908 29.1399 83.2195 28.9596 83.4689 28.7086C83.5928 28.5702 83.6882 28.4087 83.7495 28.2334C83.8108 28.058 83.8368 27.8723 83.8261 27.6868C83.8264 27.3867 83.7218 27.0959 83.5303 26.8647C83.3033 26.5977 83.0332 26.3705 82.7313 26.1925C82.3845 25.9795 82.0178 25.8007 81.6365 25.6585C81.1717 25.4818 80.6953 25.2744 80.2036 25.0439C79.7125 24.8132 79.2487 24.5284 78.8207 24.1949C78.3501 23.837 77.973 23.3706 77.7216 22.8355C77.4701 22.3004 77.3516 21.7125 77.3763 21.1218C77.3572 20.3244 77.5593 19.5372 77.9602 18.8476C78.3579 18.1937 78.9281 17.6621 79.6082 17.3111C80.3717 16.9246 81.2113 16.7121 82.0667 16.6888C83.0704 16.6553 84.0721 16.801 85.0246 17.119C85.7394 17.3824 86.4223 17.7251 87.0606 18.1408L85.9543 20.4188Z"
                                                                    fill="#5C56D4"
                                                                />
                                                                <path
                                                                    d="M102.515 16.7734V31.8511H99.553V25.7048H92.8112V31.8511H89.8418V16.7734H92.8112V22.8544H99.553V16.7734H102.515Z"
                                                                    fill="#5C56D4"
                                                                />
                                                                <path
                                                                    d="M104.704 31.8511L111.5 16.1934H111.665L118.46 31.8511H115.003L110.693 20.8261L112.844 19.3549L107.62 31.8511H104.704ZM109.352 26.4078H113.877L114.918 28.9047H108.43L109.352 26.4078Z"
                                                                    fill="#5C56D4"
                                                                />
                                                                <path
                                                                    d="M120.654 16.7734H123.619V28.9738H130.703V31.8511H120.654V16.7734Z"
                                                                    fill="#5C56D4"
                                                                />
                                                                <path
                                                                    d="M132.074 31.8511L138.87 16.1934H139.035L145.83 31.8511H142.373L138.032 20.8377L140.183 19.3664L135.001 31.8511H132.074ZM136.722 26.4078H141.248L142.289 28.9047H135.8L136.722 26.4078Z"
                                                                    fill="#5C56D4"
                                                                />
                                                            </g>
                                                            <defs>
                                                                <clipPath id="clip0_187:282">
                                                                    <rect
                                                                        width="146"
                                                                        height="32"
                                                                        fill="white"
                                                                    />
                                                                </clipPath>
                                                            </defs>
                                                        </svg>
                                                    </button>
                                                )}

                                            {location.pathname.slice(-12) ==
                                                "infographics" && (
                                                <button
                                                    className="df center"
                                                    style={{
                                                        margin: "5px 10px 5px 0px",
                                                    }}
                                                    onClick={() => {
                                                        history.goBack();
                                                    }}
                                                ></button>
                                            )}
                                            <div
                                                className="logo"
                                                style={{ padding: "0px" }}
                                            >
                                                <svg
                                                    width="146"
                                                    height="32"
                                                    viewBox="0 0 146 32"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <g clipPath="url(#clip0_187:282)">
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M15.1202 32.0002H1.75732L2.3151 30.7759H14.5615L15.1202 32.0002Z"
                                                            fill="#5C56D4"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M12.9387 13.4677L10.4949 0.489538L9.02927 0V15.4279L9.51781 15.9174L9.89857 17.0626C10.4969 17.3864 10.9705 17.9 11.2448 18.5225C11.5192 19.145 11.5787 19.8411 11.414 20.5011C11.2494 21.1611 10.8698 21.7477 10.3352 22.1683C9.80058 22.589 9.14123 22.8199 8.46097 22.8247C7.7807 22.8294 7.11817 22.6078 6.57769 22.1947C6.03721 21.7816 5.64947 21.2005 5.47554 20.5428C5.3016 19.8852 5.35134 19.1883 5.61693 18.562C5.88252 17.9357 6.34887 17.4156 6.94255 17.0834L7.33022 15.9174L7.81877 15.4279V0L6.35312 0.489538L3.90939 13.4677L0 18.1208L2.31517 30.3514H14.5615L16.848 18.1208L12.9387 13.4677ZM2.06002 19.5717C2.06002 19.5279 2.06865 19.4846 2.08541 19.4443C2.10217 19.4039 2.12673 19.3672 2.15769 19.3363C2.18865 19.3055 2.2254 19.281 2.26583 19.2644C2.30626 19.2477 2.34958 19.2392 2.3933 19.2394H4.25058C4.29581 19.2369 4.34106 19.2437 4.38358 19.2593C4.42611 19.2749 4.465 19.299 4.49789 19.3302C4.53078 19.3613 4.55697 19.3988 4.57487 19.4404C4.59278 19.482 4.60201 19.5269 4.60201 19.5721C4.60201 19.6174 4.59278 19.6623 4.57487 19.7039C4.55697 19.7455 4.53078 19.783 4.49789 19.8141C4.465 19.8453 4.42611 19.8694 4.38358 19.885C4.34106 19.9006 4.29581 19.9074 4.25058 19.9049H2.39132C2.3031 19.9047 2.21858 19.8694 2.15629 19.807C2.094 19.7445 2.05903 19.6599 2.05903 19.5717H2.06002ZM4.96263 21.9788L3.3526 22.9084C3.30217 22.9378 3.24481 22.9532 3.18645 22.9529C3.11298 22.9533 3.04145 22.9293 2.98305 22.8848C2.92465 22.8402 2.88267 22.7775 2.86368 22.7065C2.8447 22.6355 2.84977 22.5603 2.87811 22.4925C2.90644 22.4247 2.95645 22.3682 3.0203 22.3319L4.62935 21.4022C4.70552 21.3624 4.79412 21.3536 4.87666 21.3775C4.95919 21.4015 5.02928 21.4564 5.07229 21.5308C5.1153 21.6052 5.12791 21.6934 5.10747 21.7768C5.08704 21.8603 5.03515 21.9327 4.96263 21.9788ZM6.61223 23.4217L5.6826 25.0317C5.6534 25.0825 5.61133 25.1247 5.56063 25.154C5.50994 25.1834 5.4524 25.1988 5.39382 25.1989C5.33629 25.1979 5.27999 25.1821 5.23035 25.153C5.18071 25.1239 5.13942 25.0825 5.11048 25.0328C5.08154 24.9831 5.06592 24.9267 5.06514 24.8692C5.06436 24.8116 5.07845 24.7549 5.10603 24.7044L6.03566 23.0944C6.07973 23.0179 6.15236 22.9621 6.23758 22.9392C6.32281 22.9163 6.41364 22.9282 6.49009 22.9722C6.56655 23.0163 6.62237 23.0889 6.64528 23.1741C6.66818 23.2594 6.65629 23.3502 6.61223 23.4266V23.4217ZM8.76225 25.7062C8.7576 25.7913 8.72052 25.8714 8.65862 25.9301C8.59672 25.9887 8.51471 26.0213 8.42946 26.0213C8.34421 26.0213 8.2622 25.9887 8.2003 25.9301C8.1384 25.8714 8.10131 25.7913 8.09667 25.7062V23.847C8.10131 23.7618 8.1384 23.6817 8.2003 23.6231C8.2622 23.5645 8.34421 23.5318 8.42946 23.5318C8.51471 23.5318 8.59672 23.5645 8.65862 23.6231C8.72052 23.6817 8.7576 23.7618 8.76225 23.847V25.7062ZM11.6441 25.2048C11.5937 25.2342 11.5363 25.2496 11.4779 25.2493C11.4194 25.2496 11.3619 25.2344 11.3112 25.2052C11.2604 25.176 11.2183 25.1339 11.1892 25.0832L10.2546 23.4781C10.2148 23.4019 10.2059 23.3133 10.2299 23.2308C10.2538 23.1482 10.3088 23.0781 10.3832 23.0351C10.4576 22.9921 10.5457 22.9795 10.6292 22.9999C10.7127 23.0204 10.785 23.0723 10.8312 23.1448L11.7608 24.7548C11.8034 24.8308 11.8145 24.9205 11.7917 25.0046C11.769 25.0887 11.7142 25.1606 11.6391 25.2048H11.6441ZM14.0107 22.8748C13.9816 22.9256 13.9395 22.9679 13.8888 22.9972C13.8381 23.0266 13.7805 23.042 13.7219 23.0419C13.6638 23.0419 13.6067 23.0262 13.5568 22.9964L11.9467 22.0678C11.8703 22.0237 11.8144 21.9511 11.7915 21.8659C11.7686 21.7807 11.7805 21.6898 11.8246 21.6134C11.8686 21.5369 11.9413 21.4811 12.0265 21.4582C12.1117 21.4353 12.2026 21.4472 12.279 21.4912L13.889 22.4209C13.9645 22.4657 14.0192 22.5387 14.0411 22.6238C14.0629 22.7088 14.0502 22.7991 14.0057 22.8748H14.0107ZM14.5635 20.0068H12.7043C12.659 20.0093 12.6138 20.0025 12.5713 19.9869C12.5287 19.9713 12.4898 19.9472 12.457 19.916C12.4241 19.8849 12.3979 19.8473 12.38 19.8057C12.3621 19.7641 12.3528 19.7193 12.3528 19.674C12.3528 19.6287 12.3621 19.5839 12.38 19.5423C12.3979 19.5007 12.4241 19.4632 12.457 19.432C12.4898 19.4009 12.5287 19.3768 12.5713 19.3611C12.6138 19.3455 12.659 19.3388 12.7043 19.3412H14.5556C14.6407 19.3459 14.7208 19.3829 14.7795 19.4449C14.8381 19.5068 14.8707 19.5888 14.8707 19.674C14.8707 19.7593 14.8381 19.8413 14.7795 19.9032C14.7208 19.9651 14.6407 20.0022 14.5556 20.0068H14.5635Z"
                                                            fill="#5C56D4"
                                                        />
                                                        <path
                                                            d="M32.3254 3.36896C31.2751 2.78514 30.3655 2.49406 29.5964 2.49571C29.167 2.47015 28.7402 2.57944 28.3759 2.8083C28.2307 2.9162 28.1148 3.05882 28.039 3.22308C27.9631 3.38734 27.9297 3.568 27.9417 3.74853C27.9529 3.95702 28.0165 4.15932 28.1266 4.33669C28.2368 4.51406 28.3899 4.66076 28.5719 4.76318C29.0976 5.10802 29.6633 5.38792 30.2563 5.59675C30.7689 5.77915 31.2584 6.02059 31.7151 6.31619C32.1349 6.60183 32.4802 6.98375 32.7223 7.43007C33.0097 7.98469 33.1482 8.60445 33.1242 9.22867C33.127 9.84118 32.9595 10.4424 32.6404 10.9653C32.2992 11.5152 31.8077 11.956 31.2239 12.2354C30.5266 12.5644 29.7618 12.7251 28.9911 12.7043C28.2596 12.7026 27.5324 12.5931 26.8328 12.3793C26.1211 12.1602 25.4505 11.8249 24.8481 11.387L25.8975 9.52142C26.3346 9.84085 26.8149 10.0965 27.324 10.2806C27.7831 10.464 28.2711 10.5648 28.7654 10.5782C29.2238 10.5899 29.6769 10.4785 30.0777 10.2557C30.2593 10.151 30.4077 9.99727 30.506 9.81213C30.6043 9.62698 30.6484 9.41791 30.6334 9.20883C30.6334 8.58035 30.0488 8.0354 28.8795 7.57397C28.2911 7.34479 27.717 7.08052 27.1603 6.78258C26.6853 6.51542 26.2779 6.14283 25.9695 5.6935C25.6222 5.16611 25.4487 4.54325 25.4733 3.91226C25.454 3.44258 25.5355 2.97421 25.7122 2.53861C25.8889 2.10301 26.1568 1.71027 26.4979 1.38678C27.1809 0.748382 28.0906 0.401893 29.2268 0.347314C29.9826 0.32922 30.7364 0.432241 31.4595 0.652459C32.087 0.868761 32.6834 1.16652 33.2333 1.53811L32.3254 3.36896ZM38.907 8.05276C38.9107 8.44517 39.0288 8.82797 39.2469 9.15425C39.4766 9.50879 39.788 9.80313 40.1549 10.0126C40.5227 10.2306 40.9429 10.3447 41.3705 10.3426C41.822 10.3502 42.2673 10.2372 42.6605 10.0151C43.0293 9.80896 43.34 9.51282 43.5635 9.15425C43.7801 8.82745 43.8973 8.44483 43.9009 8.05276V0.394451H46.2651V8.10238C46.2753 8.93237 46.049 9.74811 45.6127 10.4542C45.1819 11.1486 44.5705 11.7128 43.8438 12.0866C43.0846 12.4715 42.2453 12.6721 41.394 12.6721C40.5428 12.6721 39.7035 12.4715 38.9442 12.0866C38.2227 11.712 37.6171 11.1476 37.1927 10.4542C36.7616 9.74631 36.5389 8.93116 36.5502 8.10238V0.394451H38.912L38.907 8.05276ZM63.0653 0V12.6051H60.5696V6.78507L56.6796 12.4736H56.6449L52.8319 7.14975V12.6076H50.5991V0L56.7367 8.70522L63.0206 0H63.0653ZM79.8704 0V12.6051H77.5062V6.78507L73.584 12.4736H73.5518L69.761 7.14975V12.6076H67.3968V0H67.4142L73.5518 8.70522L79.8357 0H79.8704ZM105.381 11.5706C104.936 11.8968 104.444 12.1529 103.922 12.3297C103.224 12.5881 102.485 12.7167 101.741 12.7093C100.593 12.7373 99.4595 12.4517 98.4617 11.8832C97.5576 11.357 96.8194 10.5878 96.3307 9.66282C95.8335 8.71958 95.5778 7.66776 95.5865 6.60148C95.5686 5.46843 95.8239 4.34775 96.3307 3.33423C96.7947 2.40963 97.5112 1.63546 98.3972 1.10149C99.3235 0.557572 100.382 0.280257 101.456 0.300178C102.145 0.293752 102.83 0.394182 103.488 0.59788C104.064 0.775206 104.615 1.02531 105.128 1.34213L104.192 3.60216C103.444 2.98327 102.509 2.6338 101.538 2.60983C100.926 2.60956 100.328 2.78805 99.8163 3.12336C99.2752 3.46842 98.8339 3.94909 98.5362 4.51759C98.2174 5.1194 98.0546 5.7915 98.0623 6.47248C98.0462 7.18236 98.1975 7.88605 98.5039 8.5266C98.7837 9.09806 99.2221 9.5769 99.7667 9.90594C100.348 10.2456 101.012 10.4173 101.684 10.4021C102.228 10.4104 102.768 10.3127 103.275 10.1143C103.685 9.95739 104.063 9.72518 104.388 9.42962L105.381 11.5706ZM119.256 12.6051H116.894V7.61614H111.511V12.6051H109.147V0.394451H111.511V5.25191H116.894V0.394451H119.256V12.6051ZM129.705 10.2409H125.736L124.759 12.6051H122.407L127.84 0H127.971L133.404 12.6051H130.636L129.705 10.2409ZM128.931 8.14208L127.768 5.18493L126.555 8.1396L128.931 8.14208ZM143.022 12.6076L140.517 8.7995H138.949V12.6076H136.587V0.394451H140.222C141.71 0.394451 142.868 0.762443 143.695 1.49842C144.522 2.2344 144.935 3.23831 144.935 4.51014C144.939 5.24037 144.781 5.96234 144.471 6.62381C144.167 7.27533 143.669 7.81688 143.045 8.17432L145.831 12.6051L143.022 12.6076ZM138.949 6.42534H140.653C141.301 6.42534 141.773 6.23432 142.067 5.85227C142.354 5.50254 142.511 5.06422 142.511 4.61186C142.51 4.1619 142.379 3.72189 142.134 3.34415C141.886 2.94226 141.39 2.74131 140.671 2.74131H138.959L138.949 6.42534ZM88.9279 0.0148844L89.9525 0.359715L91.6618 9.46932L94.3907 12.7366H89.7813L89.2703 11.1885L88.9279 10.8462V0.0148844ZM88.01 0.0148844V10.8462L87.6677 11.1885L87.1566 12.7366H82.5448L85.2737 9.46932L86.9805 0.359715L88.01 0.0148844Z"
                                                            fill="#5C56D4"
                                                        />
                                                        <path
                                                            d="M29.4118 16.7733C30.4969 16.7405 31.5753 16.9546 32.5656 17.3995C33.3817 17.7756 34.0657 18.3886 34.5286 19.1588C34.9958 19.9764 35.2297 20.9065 35.2047 21.8479C35.2029 22.4752 35.1097 23.099 34.9281 23.6994C34.7474 24.3146 34.4486 24.8887 34.0484 25.3897C33.6134 25.918 33.0591 26.3354 32.4312 26.6074C31.645 26.9364 30.7976 27.0935 29.9457 27.0684H27.8137V31.851H24.8481V16.7733H29.4118ZM29.9227 24.1681C30.3113 24.1824 30.6976 24.102 31.0482 23.9338C31.3284 23.7969 31.571 23.5938 31.7551 23.3422C31.9265 23.1172 32.0566 22.8636 32.1392 22.5931C32.2096 22.3744 32.2484 22.1467 32.2544 21.917C32.247 21.7143 32.2226 21.5126 32.1815 21.3139C32.1258 21.0433 32.0258 20.7837 31.8857 20.5456C31.718 20.2711 31.4808 20.0458 31.198 19.8926C30.8167 19.6953 30.3899 19.6025 29.9611 19.6237H27.8291V24.1681H29.9227Z"
                                                            fill="#5C56D4"
                                                        />
                                                        <path
                                                            d="M34.6323 31.8511L41.4278 16.1934H41.593L48.3885 31.8511H44.9504L40.6096 20.8377L42.7608 19.3664L37.5595 31.8511H34.6323ZM39.2805 26.4078H43.8018L44.8467 28.9047H38.3585L39.2805 26.4078Z"
                                                            fill="#5C56D4"
                                                        />
                                                        <path
                                                            d="M48.3271 16.7734H58.4801V19.6391H54.8153V31.8511H51.8498V19.6391H48.3271V16.7734Z"
                                                            fill="#5C56D4"
                                                        />
                                                        <path
                                                            d="M74.0186 16.7734V31.8511H71.0492V25.7048H64.3151V31.8511H61.3457V16.7734H64.3151V22.8544H71.0492V16.7734H74.0186Z"
                                                            fill="#5C56D4"
                                                        />
                                                        <path
                                                            d="M85.9543 20.4188C85.3929 20.1141 84.807 19.8571 84.2026 19.6505C83.6676 19.4566 83.1043 19.3528 82.5354 19.3432C82.0033 19.3114 81.4744 19.4456 81.0219 19.7273C80.84 19.8572 80.6939 20.031 80.5971 20.2325C80.5004 20.4339 80.4562 20.6566 80.4687 20.8798C80.4695 21.0588 80.507 21.2357 80.5791 21.3996C80.6511 21.5635 80.7561 21.7108 80.8874 21.8325C81.2055 22.1392 81.5714 22.3922 81.9707 22.5815C82.4214 22.802 82.8829 22.9995 83.3536 23.1731C83.7994 23.3405 84.2343 23.5355 84.6559 23.757C85.0783 23.9808 85.4664 24.2641 85.8083 24.5983C86.162 24.9554 86.4402 25.38 86.6265 25.8468C86.8465 26.4319 86.9509 27.0542 86.9338 27.6791C86.9365 28.43 86.7304 29.1668 86.3384 29.8073C85.9155 30.4862 85.3133 31.0352 84.5982 31.3938C83.7203 31.8218 82.751 32.0288 81.7748 31.9969C81.1867 31.9953 80.6001 31.9374 80.0231 31.824C79.424 31.7054 78.8384 31.5265 78.2752 31.2901C77.6908 31.0474 77.1344 30.7422 76.6157 30.3797L77.9257 28.0748C78.2876 28.3382 78.6734 28.5672 79.0781 28.7586C79.4817 28.9537 79.9038 29.1082 80.3381 29.2195C80.7136 29.3233 81.1009 29.3788 81.4905 29.3847C81.8545 29.3843 82.2166 29.3326 82.5661 29.2311C82.908 29.1399 83.2195 28.9596 83.4689 28.7086C83.5928 28.5702 83.6882 28.4087 83.7495 28.2334C83.8108 28.058 83.8368 27.8723 83.8261 27.6868C83.8264 27.3867 83.7218 27.0959 83.5303 26.8647C83.3033 26.5977 83.0332 26.3705 82.7313 26.1925C82.3845 25.9795 82.0178 25.8007 81.6365 25.6585C81.1717 25.4818 80.6953 25.2744 80.2036 25.0439C79.7125 24.8132 79.2487 24.5284 78.8207 24.1949C78.3501 23.837 77.973 23.3706 77.7216 22.8355C77.4701 22.3004 77.3516 21.7125 77.3763 21.1218C77.3572 20.3244 77.5593 19.5372 77.9602 18.8476C78.3579 18.1937 78.9281 17.6621 79.6082 17.3111C80.3717 16.9246 81.2113 16.7121 82.0667 16.6888C83.0704 16.6553 84.0721 16.801 85.0246 17.119C85.7394 17.3824 86.4223 17.7251 87.0606 18.1408L85.9543 20.4188Z"
                                                            fill="#5C56D4"
                                                        />
                                                        <path
                                                            d="M102.515 16.7734V31.8511H99.553V25.7048H92.8112V31.8511H89.8418V16.7734H92.8112V22.8544H99.553V16.7734H102.515Z"
                                                            fill="#5C56D4"
                                                        />
                                                        <path
                                                            d="M104.704 31.8511L111.5 16.1934H111.665L118.46 31.8511H115.003L110.693 20.8261L112.844 19.3549L107.62 31.8511H104.704ZM109.352 26.4078H113.877L114.918 28.9047H108.43L109.352 26.4078Z"
                                                            fill="#5C56D4"
                                                        />
                                                        <path
                                                            d="M120.654 16.7734H123.619V28.9738H130.703V31.8511H120.654V16.7734Z"
                                                            fill="#5C56D4"
                                                        />
                                                        <path
                                                            d="M132.074 31.8511L138.87 16.1934H139.035L145.83 31.8511H142.373L138.032 20.8377L140.183 19.3664L135.001 31.8511H132.074ZM136.722 26.4078H141.248L142.289 28.9047H135.8L136.722 26.4078Z"
                                                            fill="#5C56D4"
                                                        />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_187:282">
                                                            <rect
                                                                width="146"
                                                                height="32"
                                                                fill="white"
                                                            />
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="marTop_50">
                                            <li
                                                className="df row "
                                                onClick={() => {
                                                    setNameVisiblity(
                                                        !nameVisiblity
                                                    );
                                                }}
                                            >
                                                {/*<NavRoundedCorner show={location.pathname == "/home"} type="upper" />*/}
                                                {/*<NavRoundedCorner show={location.pathname == "/home"} type="lower" />*/}
                                                <Link
                                                    className={
                                                        location.pathname ==
                                                        "/home"
                                                            ? "df row active row-center flex-1"
                                                            : "df row row-center flex-1 inactive"
                                                    }
                                                    to="/home"
                                                >
                                                    <span>
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="24"
                                                            height="24"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                        >
                                                            <path
                                                                d="M3 10.4673C3 9.54148 3.42742 8.66756 4.15818 8.09919L10.1582 3.43253C11.2415 2.58994 12.7585 2.58994 13.8418 3.43253L19.8418 8.0992C20.5726 8.66756 21 9.54148 21 10.4673V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V10.4673Z"
                                                                strokeWidth="2"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            />
                                                            <path
                                                                d="M9 22V12.5C9 12.2239 9.22386 12 9.5 12H14.5C14.7761 12 15 12.2239 15 12.5V22"
                                                                strokeWidth="2"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            />
                                                        </svg>
                                                    </span>
                                                    {nameVisiblity && (
                                                        <span className="txt-medium">
                                                            Home
                                                        </span>
                                                    )}
                                                </Link>
                                            </li>

                                            <li
                                                className="df col "
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                }}
                                            >
                                                <div className="df row space-between relative">
                                                    <Link
                                                        onClick={() => {
                                                            setNameVisiblity(
                                                                !nameVisiblity
                                                            );
                                                        }}
                                                        className={
                                                            location.pathname.slice(
                                                                0,
                                                                10
                                                            ) == "/academics" &&
                                                            location.pathname
                                                                .length == 10 &&
                                                            !params.subject
                                                                ? "df row active row-center flex-1"
                                                                : "df row row-center flex-1 inactive"
                                                        }
                                                        to="/academics"
                                                    >
                                                        <span>
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="24"
                                                                height="19"
                                                                viewBox="0 0 24 19"
                                                                fill="none"
                                                            >
                                                                <g clipPath="url(#clip0)">
                                                                    <path
                                                                        d="M21.0014 6.42139L10.8989 11.9431L1.03418 6.29731L11.2918 1.03406L21.0014 6.42139Z"
                                                                        stroke="#5C56D4"
                                                                        strokeWidth="2"
                                                                        strokeLinejoin="round"
                                                                    />
                                                                    <path
                                                                        d="M18.1372 7.98276V15.2831C18.1372 15.7712 17.9433 16.2394 17.5981 16.5846C17.2529 16.9297 16.7848 17.1236 16.2966 17.1236H5.73911C5.25 17.1237 4.78077 16.9301 4.43395 16.5852C4.08713 16.2403 3.89092 15.7722 3.88818 15.2831V7.92072"
                                                                        stroke="#5C56D4"
                                                                        strokeWidth="2"
                                                                        strokeLinejoin="round"
                                                                    />
                                                                    <path
                                                                        d="M21.0015 6.42139H22.9661V12.2327"
                                                                        stroke="#5C56D4"
                                                                        strokeWidth="2"
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                    />
                                                                </g>
                                                                <defs>
                                                                    <clipPath id="clip0">
                                                                        <rect
                                                                            width="24"
                                                                            height="18.1577"
                                                                            fill="white"
                                                                        />
                                                                    </clipPath>
                                                                </defs>
                                                            </svg>
                                                        </span>

                                                        {nameVisiblity && (
                                                            <span className="txt-medium">
                                                                Academics
                                                            </span>
                                                        )}
                                                    </Link>
                                                    <div
                                                        className="droparrows"
                                                        onClick={() =>
                                                            setVis1(!vis1)
                                                        }
                                                    >
                                                        {!vis1 && (
                                                            <svg
                                                                width="11"
                                                                height="8"
                                                                viewBox="0 0 11 8"
                                                                fill="none"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                className="downArr"
                                                            >
                                                                <path
                                                                    d="M10.6101 1.17019C10.4227 0.983936 10.1692 0.879395 9.90506 0.879395C9.64087 0.879395 9.38742 0.983936 9.20006 1.17019L5.61006 4.71019L2.07006 1.17019C1.88269 0.983936 1.62924 0.879395 1.36506 0.879395C1.10087 0.879395 0.847419 0.983936 0.660056 1.17019C0.566328 1.26315 0.491933 1.37375 0.441164 1.49561C0.390396 1.61747 0.364258 1.74818 0.364258 1.88019C0.364258 2.0122 0.390396 2.1429 0.441164 2.26476C0.491933 2.38662 0.566328 2.49722 0.660056 2.59019L4.90006 6.83019C4.99302 6.92392 5.10362 6.99831 5.22548 7.04908C5.34734 7.09985 5.47804 7.12599 5.61006 7.12599C5.74207 7.12599 5.87277 7.09985 5.99463 7.04908C6.11649 6.99831 6.22709 6.92392 6.32006 6.83019L10.6101 2.59019C10.7038 2.49722 10.7782 2.38662 10.8289 2.26476C10.8797 2.1429 10.9059 2.0122 10.9059 1.88019C10.9059 1.74818 10.8797 1.61747 10.8289 1.49561C10.7782 1.37375 10.7038 1.26315 10.6101 1.17019Z"
                                                                    fill={
                                                                        location.pathname.slice(
                                                                            0,
                                                                            11
                                                                        ) ==
                                                                        "/academics"
                                                                            ? "#5c56d4"
                                                                            : "#545454"
                                                                    }
                                                                />
                                                            </svg>
                                                        )}
                                                        {vis1 && (
                                                            <svg
                                                                width="12"
                                                                height="8"
                                                                viewBox="0 0 12 8"
                                                                fill="none"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                className="downArr"
                                                            >
                                                                <path
                                                                    d="M11.0002 6.82981C10.8128 7.01606 10.5594 7.12061 10.2952 7.12061C10.031 7.12061 9.77756 7.01606 9.59019 6.82981L6.00019 3.28981L2.46019 6.82981C2.27283 7.01606 2.01938 7.12061 1.75519 7.12061C1.49101 7.12061 1.23756 7.01606 1.05019 6.82981C0.956464 6.73685 0.88207 6.62625 0.831301 6.50439C0.780533 6.38253 0.754395 6.25182 0.754395 6.11981C0.754395 5.9878 0.780533 5.8571 0.831301 5.73524C0.88207 5.61338 0.956464 5.50278 1.05019 5.40981L5.29019 1.16981C5.38316 1.07608 5.49376 1.00169 5.61562 0.950922C5.73747 0.900153 5.86818 0.874015 6.00019 0.874015C6.1322 0.874015 6.26291 0.900153 6.38477 0.950922C6.50663 1.00169 6.61723 1.07608 6.71019 1.16981L11.0002 5.40981C11.0939 5.50278 11.1683 5.61338 11.2191 5.73524C11.2699 5.8571 11.296 5.9878 11.296 6.11981C11.296 6.25182 11.2699 6.38253 11.2191 6.50439C11.1683 6.62625 11.0939 6.73685 11.0002 6.82981Z"
                                                                    fill={
                                                                        location.pathname.slice(
                                                                            0,
                                                                            11
                                                                        ) ==
                                                                        "/academics"
                                                                            ? "#5c56d4"
                                                                            : "#545454"
                                                                    }
                                                                />
                                                            </svg>
                                                        )}
                                                    </div>
                                                </div>
                                                {vis1 && (
                                                    <div className="innerNav df col">
                                                        {subjectList.map(
                                                            function (
                                                                sub,
                                                                keyIndex
                                                            ) {
                                                                if (
                                                                    sub.has_content
                                                                ) {
                                                                    return (
                                                                        <Link
                                                                            onClick={() => {
                                                                                setNameVisiblity(
                                                                                    !nameVisiblity
                                                                                );
                                                                            }}
                                                                            key={
                                                                                keyIndex
                                                                            }
                                                                            to={
                                                                                "/academics/" +
                                                                                sub.subject_name +
                                                                                "/concepts"
                                                                            }
                                                                            className={
                                                                                location.pathname.search(
                                                                                    "/academics/" +
                                                                                        sub.subject_name +
                                                                                        "/concepts"
                                                                                ) !=
                                                                                -1
                                                                                    ? "nestedLink active"
                                                                                    : "nestedLink inactive"
                                                                            }
                                                                        >
                                                                            {
                                                                                sub.subject_name
                                                                            }
                                                                        </Link>
                                                                    );
                                                                }
                                                            }
                                                        )}
                                                    </div>
                                                )}
                                            </li>

                                            <li
                                                className="df  col"
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                }}
                                            >
                                                <div className="df row space-between relative">
                                                    <Link
                                                        className={
                                                            location.pathname.slice(
                                                                0,
                                                                10
                                                            ) == "/knowledge"
                                                                ? "df row active row-center flex-1"
                                                                : "df row row-center flex-1 inactive"
                                                        }
                                                        to="/knowledge"
                                                        onClick={() => {
                                                            setNameVisiblity(
                                                                !nameVisiblity
                                                            );
                                                        }}
                                                    >
                                                        <span>
                                                            <svg
                                                                width="24"
                                                                height="24"
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <g clipPath="url(#clip0_187:327)">
                                                                    <path
                                                                        d="M1.45904 8.66787C0.969611 9.04664 0.683105 9.63066 0.683105 10.2495V21.5123C0.683105 22.6168 1.57854 23.5123 2.68311 23.5123H21.1221C22.2267 23.5123 23.1221 22.6168 23.1221 21.5123V10.2495C23.1221 9.63066 22.8356 9.04665 22.3462 8.66787L13.1267 1.53277C12.406 0.974989 11.3993 0.974988 10.6785 1.53277L1.45904 8.66787Z"
                                                                        stroke="#545454"
                                                                        strokeWidth="2"
                                                                        strokeMiterlimit="10"
                                                                    />
                                                                    <path
                                                                        d="M3.31689 5.90234C3.31689 4.79777 4.21233 3.90234 5.31689 3.90234H18.1949C19.2995 3.90234 20.1949 4.79777 20.1949 5.90234V12.0847C20.1949 12.7077 19.9047 13.295 19.4098 13.6734L13.0779 18.5155C12.3794 19.0497 11.4139 19.0649 10.6988 18.553L4.15267 13.8665C3.6281 13.491 3.31689 12.8855 3.31689 12.2403V5.90234Z"
                                                                        fill="white"
                                                                        stroke="#545454"
                                                                        strokeWidth="2"
                                                                        strokeMiterlimit="10"
                                                                    />
                                                                    <path
                                                                        d="M7.02441 6.63428H16.4878"
                                                                        stroke="#545454"
                                                                        strokeWidth="2"
                                                                        strokeMiterlimit="10"
                                                                    />
                                                                    <path
                                                                        d="M7.02441 9.85352H16.4878"
                                                                        stroke="#545454"
                                                                        strokeWidth="2"
                                                                        strokeMiterlimit="10"
                                                                    />
                                                                    <path
                                                                        d="M7.02441 12.9756H16.4878"
                                                                        stroke="#545454"
                                                                        strokeWidth="2"
                                                                        strokeMiterlimit="10"
                                                                    />
                                                                </g>
                                                                <defs>
                                                                    <clipPath id="clip0_187:327">
                                                                        <rect
                                                                            width="23.6098"
                                                                            height="24"
                                                                            fill="white"
                                                                        />
                                                                    </clipPath>
                                                                </defs>
                                                            </svg>
                                                        </span>
                                                        {nameVisiblity && (
                                                            <span className="txt-medium">
                                                                Knowledge
                                                            </span>
                                                        )}
                                                    </Link>
                                                    <div
                                                        className="droparrows"
                                                        onClick={() =>
                                                            setVis2(!vis2)
                                                        }
                                                    >
                                                        {!vis2 && (
                                                            <svg
                                                                width="11"
                                                                height="8"
                                                                viewBox="0 0 11 8"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                className="downArr"
                                                                onClick={() =>
                                                                    setVis2(
                                                                        !vis2
                                                                    )
                                                                }
                                                            >
                                                                <path
                                                                    d="M10.6101 1.17019C10.4227 0.983936 10.1692 0.879395 9.90506 0.879395C9.64087 0.879395 9.38742 0.983936 9.20006 1.17019L5.61006 4.71019L2.07006 1.17019C1.88269 0.983936 1.62924 0.879395 1.36506 0.879395C1.10087 0.879395 0.847419 0.983936 0.660056 1.17019C0.566328 1.26315 0.491933 1.37375 0.441164 1.49561C0.390396 1.61747 0.364258 1.74818 0.364258 1.88019C0.364258 2.0122 0.390396 2.1429 0.441164 2.26476C0.491933 2.38662 0.566328 2.49722 0.660056 2.59019L4.90006 6.83019C4.99302 6.92392 5.10362 6.99831 5.22548 7.04908C5.34734 7.09985 5.47804 7.12599 5.61006 7.12599C5.74207 7.12599 5.87277 7.09985 5.99463 7.04908C6.11649 6.99831 6.22709 6.92392 6.32006 6.83019L10.6101 2.59019C10.7038 2.49722 10.7782 2.38662 10.8289 2.26476C10.8797 2.1429 10.9059 2.0122 10.9059 1.88019C10.9059 1.74818 10.8797 1.61747 10.8289 1.49561C10.7782 1.37375 10.7038 1.26315 10.6101 1.17019Z"
                                                                    fill={
                                                                        location.pathname.slice(
                                                                            0,
                                                                            10
                                                                        ) ==
                                                                        "/knowledge"
                                                                            ? "#5c56d4"
                                                                            : "#545454"
                                                                    }
                                                                />
                                                            </svg>
                                                        )}
                                                        {vis2 && (
                                                            <svg
                                                                width="12"
                                                                height="8"
                                                                viewBox="0 0 12 8"
                                                                fill={
                                                                    location.pathname.slice(
                                                                        0,
                                                                        10
                                                                    ) ==
                                                                    "/knowledge"
                                                                        ? "#5c56d4"
                                                                        : "none"
                                                                }
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                className="downArr"
                                                                onClick={() => {
                                                                    setVis2(
                                                                        !vis2
                                                                    );
                                                                }}
                                                            >
                                                                <path
                                                                    d="M11.0002 6.82981C10.8128 7.01606 10.5594 7.12061 10.2952 7.12061C10.031 7.12061 9.77756 7.01606 9.59019 6.82981L6.00019 3.28981L2.46019 6.82981C2.27283 7.01606 2.01938 7.12061 1.75519 7.12061C1.49101 7.12061 1.23756 7.01606 1.05019 6.82981C0.956464 6.73685 0.88207 6.62625 0.831301 6.50439C0.780533 6.38253 0.754395 6.25182 0.754395 6.11981C0.754395 5.9878 0.780533 5.8571 0.831301 5.73524C0.88207 5.61338 0.956464 5.50278 1.05019 5.40981L5.29019 1.16981C5.38316 1.07608 5.49376 1.00169 5.61562 0.950922C5.73747 0.900153 5.86818 0.874015 6.00019 0.874015C6.1322 0.874015 6.26291 0.900153 6.38477 0.950922C6.50663 1.00169 6.61723 1.07608 6.71019 1.16981L11.0002 5.40981C11.0939 5.50278 11.1683 5.61338 11.2191 5.73524C11.2699 5.8571 11.296 5.9878 11.296 6.11981C11.296 6.25182 11.2699 6.38253 11.2191 6.50439C11.1683 6.62625 11.0939 6.73685 11.0002 6.82981Z"
                                                                    fill={
                                                                        location.pathname.slice(
                                                                            0,
                                                                            10
                                                                        ) ==
                                                                        "/knowledge"
                                                                            ? "#5c56d4"
                                                                            : "#545454"
                                                                    }
                                                                />
                                                            </svg>
                                                        )}
                                                    </div>
                                                </div>
                                                {vis2 && (
                                                    <div className="innerNav df col">
                                                        <Link
                                                            className={
                                                                location.pathname.slice(
                                                                    0,
                                                                    5
                                                                ) == "/news"
                                                                    ? "nestedLink active"
                                                                    : "nestedLink inactive"
                                                            }
                                                            to="/news"
                                                            onClick={() => {
                                                                setNameVisiblity(
                                                                    !nameVisiblity
                                                                );
                                                            }}
                                                        >
                                                            News
                                                        </Link>
                                                        <Link
                                                            className={
                                                                location.pathname.slice(
                                                                    0,
                                                                    11
                                                                ) ==
                                                                "/activities"
                                                                    ? "nestedLink active"
                                                                    : "nestedLink inactive"
                                                            }
                                                            to="/activities"
                                                            onClick={() => {
                                                                setNameVisiblity(
                                                                    !nameVisiblity
                                                                );
                                                            }}
                                                        >
                                                            Activities
                                                        </Link>
                                                    </div>
                                                )}
                                            </li>
                                            <li
                                                className="df  col"
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                }}
                                                onClick={() => {
                                                    setNameVisiblity(
                                                        !nameVisiblity
                                                    );
                                                }}
                                            >
                                                <div
                                                    className="df row"
                                                    style={{
                                                        justifyContent:
                                                            "space-between",
                                                    }}
                                                >
                                                    <Link
                                                        className={
                                                            location.pathname.slice(
                                                                0,
                                                                8
                                                            ) == "/profile"
                                                                ? "df row active row-center flex-1"
                                                                : "df row row-center flex-1 inactive"
                                                        }
                                                        to="/profile/profile"
                                                    >
                                                        <span>
                                                            <svg
                                                                width="20"
                                                                height="22"
                                                                viewBox="0 0 20 22"
                                                                fill="none"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path
                                                                    d="M13.71 11.7101C14.6904 10.9388 15.406 9.88105 15.7572 8.68407C16.1085 7.48709 16.0779 6.21039 15.6698 5.03159C15.2617 3.85279 14.4963 2.83052 13.4801 2.10698C12.4639 1.38344 11.2474 0.994629 10 0.994629C8.75255 0.994629 7.53611 1.38344 6.51993 2.10698C5.50374 2.83052 4.73834 3.85279 4.33021 5.03159C3.92208 6.21039 3.89151 7.48709 4.24276 8.68407C4.59401 9.88105 5.3096 10.9388 6.29 11.7101C4.61007 12.3832 3.14428 13.4995 2.04889 14.94C0.953495 16.3806 0.26956 18.0914 0.0699967 19.8901C0.0555513 20.0214 0.0671132 20.1543 0.104022 20.2812C0.140931 20.408 0.202464 20.5264 0.285108 20.6294C0.452016 20.8376 0.69478 20.971 0.959997 21.0001C1.22521 21.0293 1.49116 20.9519 1.69932 20.785C1.90749 20.6181 2.04082 20.3753 2.07 20.1101C2.28958 18.1553 3.22168 16.3499 4.68822 15.0389C6.15475 13.7279 8.0529 13.0032 10.02 13.0032C11.9871 13.0032 13.8852 13.7279 15.3518 15.0389C16.8183 16.3499 17.7504 18.1553 17.97 20.1101C17.9972 20.3558 18.1144 20.5828 18.2991 20.7471C18.4838 20.9115 18.7228 21.0016 18.97 21.0001H19.08C19.3421 20.97 19.5817 20.8374 19.7466 20.6314C19.9114 20.4253 19.9881 20.1625 19.96 19.9001C19.7595 18.0963 19.0719 16.3811 17.9708 14.9383C16.8698 13.4955 15.3969 12.3796 13.71 11.7101ZM10 11.0001C9.20887 11.0001 8.43551 10.7655 7.77772 10.326C7.11992 9.88648 6.60723 9.26176 6.30448 8.53086C6.00173 7.79995 5.92251 6.99569 6.07686 6.21976C6.2312 5.44384 6.61216 4.73111 7.17157 4.1717C7.73098 3.61229 8.44371 3.23132 9.21964 3.07698C9.99556 2.92264 10.7998 3.00186 11.5307 3.30461C12.2616 3.60736 12.8863 4.12005 13.3259 4.77784C13.7654 5.43564 14 6.209 14 7.00012C14 8.06099 13.5786 9.07841 12.8284 9.82855C12.0783 10.5787 11.0609 11.0001 10 11.0001Z"
                                                                    fill="#545454"
                                                                />
                                                            </svg>
                                                        </span>
                                                        {nameVisiblity && (
                                                            <span className="txt-medium">
                                                                Profile
                                                            </span>
                                                        )}
                                                    </Link>
                                                </div>
                                            </li>
                                            <li
                                                className="df  col"
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                }}
                                            >
                                                <a
                                                    className={
                                                        "df row row-center flex-1 inactive margin20"
                                                    }
                                                    onClick={() => {
                                                        logOut();
                                                    }}
                                                >
                                                    <span>
                                                        <svg
                                                            width="21"
                                                            height="23"
                                                            viewBox="0 0 21 23"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                d="M10.995 22.9587C8.6704 22.9623 6.41741 22.1683 4.62458 20.7138C2.83176 19.2593 1.61151 17.2354 1.17428 14.9911C0.737062 12.7469 1.11028 10.423 2.22958 8.42026C3.34887 6.41755 5.14406 4.86158 7.30552 4.0207C7.44946 3.95935 7.60449 3.92708 7.76138 3.92582C7.91826 3.92456 8.0738 3.95434 8.21874 4.01338C8.36368 4.07242 8.49506 4.15952 8.60505 4.26949C8.71505 4.37946 8.80141 4.51006 8.85901 4.65351C8.91661 4.79696 8.94426 4.95034 8.94033 5.10451C8.93639 5.25869 8.90094 5.41051 8.83609 5.55094C8.77124 5.69137 8.67832 5.81755 8.56285 5.92195C8.44738 6.02636 8.31172 6.10687 8.16395 6.15868C6.7371 6.70585 5.51231 7.66501 4.65087 8.90982C3.78943 10.1546 3.33174 11.6267 3.33808 13.1323C3.32076 14.1316 3.50604 15.1243 3.88311 16.0526C4.26018 16.9808 4.8215 17.8259 5.53433 18.5387C6.24716 19.2514 7.09723 19.8175 8.03495 20.2039C8.97268 20.5904 9.9793 20.7894 10.9961 20.7894C12.0129 20.7894 13.0195 20.5904 13.9572 20.2039C14.8949 19.8175 15.745 19.2514 16.4578 18.5387C17.1707 17.8259 17.732 16.9808 18.1091 16.0526C18.4861 15.1243 18.6714 14.1316 18.6541 13.1323C18.6604 11.6267 18.2027 10.1546 17.3413 8.90982C16.4799 7.66501 15.2551 6.70585 13.8282 6.15868C13.6805 6.10687 13.5448 6.02636 13.4293 5.92195C13.3139 5.81755 13.2209 5.69137 13.1561 5.55094C13.0912 5.41051 13.0558 5.25869 13.0518 5.10451C13.0479 4.95034 13.0756 4.79696 13.1332 4.65351C13.1908 4.51006 13.2771 4.37946 13.3871 4.26949C13.4971 4.15952 13.6285 4.07242 13.7734 4.01338C13.9184 3.95434 14.0739 3.92456 14.2308 3.92582C14.3877 3.92708 14.5427 3.95935 14.6867 4.0207C16.8483 4.86165 18.6436 6.4178 19.7629 8.42074C20.8821 10.4237 21.2552 12.7478 20.8177 14.9922C20.3802 17.2366 19.1595 19.2605 17.3663 20.7149C15.5731 22.1692 13.3197 22.9628 10.995 22.9587Z"
                                                                fill="#545454"
                                                            />
                                                            <path
                                                                d="M10.9943 13.8807C10.8408 13.8807 10.6888 13.8509 10.547 13.7931C10.4052 13.7353 10.2764 13.6506 10.168 13.5438C10.0595 13.437 9.97357 13.3102 9.91503 13.1707C9.85649 13.0312 9.8265 12.8817 9.8268 12.7308V2.15898C9.81991 2.00391 9.84504 1.84907 9.90067 1.70379C9.9563 1.55852 10.0413 1.42582 10.1505 1.31369C10.2597 1.20157 10.3908 1.11233 10.5361 1.05137C10.6813 0.990412 10.8375 0.958984 10.9955 0.958984C11.1534 0.958984 11.3096 0.990412 11.4549 1.05137C11.6001 1.11233 11.7312 1.20157 11.8404 1.31369C11.9496 1.42582 12.0346 1.55852 12.0902 1.70379C12.1459 1.84907 12.171 2.00391 12.1641 2.15898V12.7308C12.1644 12.8819 12.1344 13.0316 12.0757 13.1712C12.017 13.3108 11.9308 13.4377 11.8222 13.5446C11.7135 13.6514 11.5844 13.7361 11.4423 13.7938C11.3003 13.8514 11.148 13.881 10.9943 13.8807V13.8807Z"
                                                                fill="#545454"
                                                            />
                                                        </svg>
                                                    </span>
                                                    {nameVisiblity && (
                                                        <span className="txt-medium">
                                                            Logout
                                                        </span>
                                                    )}
                                                </a>
                                            </li>
                                        </div>
                                    </ul>
                                </nav>
                            )}
                        <main
                            className="df flex-1 bg-primary row bg-white"
                            style={{
                                flexDirection: "column",
                                top: windowSize.marginTop,
                                position:
                                    windowSize.width < 1000 ? "fixed" : "unset",
                                height: windowSize.height,
                                maxHeight: windowSize.height,
                            }}
                        >
                            {Props.children}
                        </main>
                    </div>
                </>
            )}
        </>
    );
};
export default NavBar;
