import React, { useContext, useEffect, useState } from "react";
import { Store } from "../../../App";
import { setUserDataAction } from "../../../actions/userActions";
import "../../../assets/css/Profile.css";
import profileImage from "../../../assets/images/avtar/profileImg.svg";
import { useHistory, useLocation, useRouteMatch, useParams } from "react-router";

import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import DatePicker from "@mui/lab/DatePicker";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import { ImWarning } from "react-icons/im";
import { isApp, premiumInt } from "../../../common/helper";

const ProfilePage = (props) => {
    const [pathshalaDrop, openPathshala] = useState(false);
    const [gradeDrop, openGrade] = useState(false);
    const [boardDrop, openBoard] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const user = useContext(Store).user;
    const history = useHistory();
    const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
    const [value, setValue] = useState(null);
    const [isForPathShala, setisForPathShala] = useState(false);
    useEffect(() => {
        if (props.from != '') {
            setisForPathShala(true)
        }
    }, [props.from])
    const [tool, showTool] = useState(false);
    const onResize = () => {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    useEffect(() => {
        onResize();
        window.addEventListener("resize", onResize);
        return () => {
            return window.removeEventListener("resize", onResize);
        };
    }, []);


    const buyNow = () => {
        if (!isApp()) {
            premiumInt("/buy_now");
            history.push("/pricing");
        }

    }

    const logOut = async () => {
        const reponse = await user.logOut();
        if (reponse.status) {
            setShowPopup(false);
            history.replace("/signin");
        } else {
            setShowPopup(false);
            alert("Something went wrong");
        }
    };

    const changeVal = (which, val) => {
        if (which == "pathshala") {
            document.getElementById("associated_school").value = val;
            props.setDeatils("associated_school", val);
            openPathshala(false);
        } else if (which == "grade") {
            document.getElementById("grade").value = val;
            props.setDeatils("grade", val);
            openGrade(false);
        }
        else {
            document.getElementById("board").value = val;
            props.setDeatils("board", val);
            openBoard(false);
        }
    };
    return (
        <>
            <div className="common-grid-outer">
                <div className="profile-view centered_outer_container">
                    {(gradeDrop || pathshalaDrop || boardDrop) && (
                        <div className="pop_up_container_profile">
                            <div
                                className="grayArea_profile"
                                onClick={() => {
                                    gradeDrop ? openGrade(false) : (boardDrop ? openBoard(false) : openPathshala(false));
                                }}
                            ></div>
                        </div>
                    )}

                    <div className="profile">
                        <img src={profileImage} />
                        <div className="profile-name">
                            <a>{props.name}</a>
                        </div>
                    </div>
                    <form className="form">
                        <div className="form-field">
                            <div className="title">
                                <label>Full Name</label>
                            </div>
                            <input
                                name="full_name"
                                value={props.name}
                                maxLength={30}
                                onChange={(event) => {
                                    props.saveUserDeatils("full_name", event);
                                }}
                            />
                        </div>

                        <div className="form-field">
                            <div className="title">
                                <label>Username</label>
                            </div>
                            <input
                                type="text"
                                name="username"
                                value={props.username}
                                onChange={(event) => {
                                    props.saveUserDeatils("username", event);
                                }}
                            />
                        </div>

                        <div className="form-field relative">
                            <div className="title">
                                <label>Board</label>
                            </div>
                            <svg
                                onClick={(event) => {
                                    openBoard(true);
                                }}
                                className="profile-dow-ar"
                                width="20"
                                height="20"
                                viewBox="0 0 32 32"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M22.6664 12.2267C22.4166 11.9783 22.0787 11.839 21.7264 11.839C21.3742 11.839 21.0363 11.9783 20.7864 12.2267L15.9998 16.9467L11.2798 12.2267C11.03 11.9783 10.692 11.839 10.3398 11.839C9.98752 11.839 9.64959 11.9783 9.39977 12.2267C9.2748 12.3506 9.1756 12.4981 9.10791 12.6606C9.04022 12.8231 9.00537 12.9973 9.00537 13.1733C9.00537 13.3494 9.04022 13.5236 9.10791 13.6861C9.1756 13.8486 9.2748 13.9961 9.39977 14.12L15.0531 19.7733C15.1771 19.8983 15.3245 19.9975 15.487 20.0652C15.6495 20.1329 15.8238 20.1677 15.9998 20.1677C16.1758 20.1677 16.3501 20.1329 16.5125 20.0652C16.675 19.9975 16.8225 19.8983 16.9464 19.7733L22.6664 14.12C22.7914 13.9961 22.8906 13.8486 22.9583 13.6861C23.026 13.5236 23.0608 13.3494 23.0608 13.1733C23.0608 12.9973 23.026 12.8231 22.9583 12.6606C22.8906 12.4981 22.7914 12.3506 22.6664 12.2267Z"
                                    fill="#777777"
                                />
                            </svg>
                            <input
                                style={{ caretColor: "transparent" }}
                                name="board"
                                id="board"
                                autocomplete="off"
                                type="text"
                                value={props.board}
                                onClick={(event) => {
                                    openBoard(true);
                                }}
                                onChange={(event) => {
                                    props.saveUserDeatils("board", event);
                                }}
                            />
                            {boardDrop == true && (
                                <div
                                    className="profile-drop"
                                    onMouseLeave={() => {
                                        openBoard(false);
                                    }}
                                >
                                    {props.boards.map(function (name, index) {
                                        return (
                                            <div
                                                className="profile-drop-list"
                                                style={{ cursor: "pointer" }}
                                                value={name}
                                                key={index}
                                                onClick={(event) => {
                                                    changeVal("board", name);
                                                }}
                                            >
                                                {name} - {props.fullboards[index]}
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        <div className="form-field relative">
                            <div className="title">
                                <label>Grade</label>
                            </div>
                            <svg
                                onClick={(event) => {
                                    openGrade(true);
                                }}
                                className="profile-dow-ar"
                                width="20"
                                height="20"
                                viewBox="0 0 32 32"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M22.6664 12.2267C22.4166 11.9783 22.0787 11.839 21.7264 11.839C21.3742 11.839 21.0363 11.9783 20.7864 12.2267L15.9998 16.9467L11.2798 12.2267C11.03 11.9783 10.692 11.839 10.3398 11.839C9.98752 11.839 9.64959 11.9783 9.39977 12.2267C9.2748 12.3506 9.1756 12.4981 9.10791 12.6606C9.04022 12.8231 9.00537 12.9973 9.00537 13.1733C9.00537 13.3494 9.04022 13.5236 9.10791 13.6861C9.1756 13.8486 9.2748 13.9961 9.39977 14.12L15.0531 19.7733C15.1771 19.8983 15.3245 19.9975 15.487 20.0652C15.6495 20.1329 15.8238 20.1677 15.9998 20.1677C16.1758 20.1677 16.3501 20.1329 16.5125 20.0652C16.675 19.9975 16.8225 19.8983 16.9464 19.7733L22.6664 14.12C22.7914 13.9961 22.8906 13.8486 22.9583 13.6861C23.026 13.5236 23.0608 13.3494 23.0608 13.1733C23.0608 12.9973 23.026 12.8231 22.9583 12.6606C22.8906 12.4981 22.7914 12.3506 22.6664 12.2267Z"
                                    fill="#777777"
                                />
                            </svg>
                            <input
                                style={{ caretColor: "transparent" }}
                                name="grade"
                                id="grade"
                                // disabled={true}
                                autocomplete="off"
                                type="number"
                                value={props.grade}
                                onClick={(event) => {
                                    openGrade(true);
                                }}
                                onChange={(event) => {
                                    props.saveUserDeatils("grade", event);
                                }}
                            />
                            {gradeDrop == true && (
                                <div
                                    className="profile-drop"
                                    onMouseLeave={() => {
                                        openGrade(false);
                                    }}
                                >
                                    {props.grades.map(function (name, index) {
                                        return (
                                            <div
                                                className="profile-drop-list"
                                                style={{ cursor: "pointer" }}
                                                value={name}
                                                key={index}
                                                onClick={(event) => {
                                                    changeVal("grade", name);
                                                }}
                                            >
                                                {name}
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                        <div className="form-field relative"  >
                            <div className="title">
                                <label style={isForPathShala ? { color: "red" } : {}}>Pathshala</label>
                            </div>
                            <svg
                                onClick={(event) => {
                                    openPathshala(true);
                                }}
                                className="profile-dow-ar"
                                width="20"
                                height="20"
                                viewBox="0 0 32 32"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M22.6664 12.2267C22.4166 11.9783 22.0787 11.839 21.7264 11.839C21.3742 11.839 21.0363 11.9783 20.7864 12.2267L15.9998 16.9467L11.2798 12.2267C11.03 11.9783 10.692 11.839 10.3398 11.839C9.98752 11.839 9.64959 11.9783 9.39977 12.2267C9.2748 12.3506 9.1756 12.4981 9.10791 12.6606C9.04022 12.8231 9.00537 12.9973 9.00537 13.1733C9.00537 13.3494 9.04022 13.5236 9.10791 13.6861C9.1756 13.8486 9.2748 13.9961 9.39977 14.12L15.0531 19.7733C15.1771 19.8983 15.3245 19.9975 15.487 20.0652C15.6495 20.1329 15.8238 20.1677 15.9998 20.1677C16.1758 20.1677 16.3501 20.1329 16.5125 20.0652C16.675 19.9975 16.8225 19.8983 16.9464 19.7733L22.6664 14.12C22.7914 13.9961 22.8906 13.8486 22.9583 13.6861C23.026 13.5236 23.0608 13.3494 23.0608 13.1733C23.0608 12.9973 23.026 12.8231 22.9583 12.6606C22.8906 12.4981 22.7914 12.3506 22.6664 12.2267Z"
                                    fill={isForPathShala ? 'red' : "#777777"}
                                />
                            </svg>
                            <div className="pointer" onClick={(event) => {
                                openPathshala(true);
                            }}>


                                <input
                                    autocomplete="off"

                                    className="pointer"
                                    disabled={true}
                                    name="associated_school"
                                    id="associated_school"
                                    type="text"
                                    value={props.school == "-" ? "" : props.school}

                                    onChange={(event) => {                                        
                                        setisForPathShala(false)
                                        props.saveUserDeatils("associated_school", event);
                                    }}
                                    placeholder="-"
                                    style={isForPathShala ? { borderBottom: "1px solid red", color: "red" } : {}}
                                />
                            </div>
                            {pathshalaDrop == true && (
                                <div
                                    className="profile-drop"
                                    onMouseLeave={() => {
                                        openPathshala(false);
                                    }}
                                >

                                    {props.pathshala
                                        // .filter((item) => {
                                        //   if (props.school != "") {
                                        //     return item.toLowerCase().includes(props.school.toLowerCase());
                                        //} else {
                                        //  return 1
                                        // }
                                        //item.toLowerCase().indexOf(props.school == "-" ? "" : "") !== -1;
                                        //})
                                        .map(function (name, index) {
                                            return (
                                                <div
                                                    className="profile-drop-list"
                                                    style={{ cursor: "pointer" }}
                                                    value={name}
                                                    key={index}
                                                    onClick={(event) => {
                                                        setisForPathShala(false)
                                                        changeVal("pathshala", name);
                                                    }}
                                                >
                                                    {name}
                                                </div>
                                            );
                                        })}
                                </div>
                            )}
                        </div>


                        <div
                            className="form-field relative"
                            onMouseEnter={() => {
                                showTool(true);
                            }}
                            onMouseLeave={() => {
                                showTool(false);
                            }}
                        >
                            <div className="title">
                                <label>Email </label>
                            </div>
                            <input
                                type="text"
                                name="email"
                                value={props.email}
                                onChange={(event) => {
                                    props.saveUserDeatils("email", event);
                                }}
                                onMouseEnter={() => {
                                    showTool(true);
                                }}
                                onMouseLeave={() => {
                                    showTool(false);
                                }}
                                style={{ paddingRight: "20px" }}
                            />
                            {props.emailChanged && props.email != "-" && props.email != "" && <ImWarning style={{ height: windowSize.width > 600 ? "40px" : "25px", width: windowSize.width > 600 ? "40px" : "20px", color: "#ecc249", position: "absolute", right: "0px", bottom: "2px", padding: windowSize.width > 600 ? "0px 0px 10px 10px" : "0px 0px 5px 3px", backgroundColor: "white" }} />}
                            {tool && props.emailChanged && props.email != "-" && props.email != "" && (
                                <div className="tooltip ">
                                    <div className="tooltiptext">Verification Pending</div>
                                </div>
                            )}
                        </div>

                        <div className="form-field  gray-field" style={{ position: "relative" }}>
                            <div className="title">
                                <label>Plan Details ({props.user.course_name != null && props.user.course_name != "" ? props.user.course_name : "Free User"})</label>
                            </div>
                            <input type="text" className="readOnly small-horizontal-scrollable" defaultValue={props.user.course_name != null && props.user.course_name != "" ? (!props.isExpired ? props.subscription : "Plan expired on " + props.end_date) : "-"} readOnly />
                            {/* {props.isExpired && <span onClick={() => buyNow()} style={{ position: "absolute", bottom: "3px", color: "#66FF00", right: "5px", cursor: "pointer" }}>Renew</span>} */}
                        </div>

                        <div className="form-field gray-field">
                            <div className="title">
                                <label>Phone Number </label>
                            </div>
                            <input type="text" name="phone" className="readOnly" maxLength="10" defaultValue={props.user.parent_phone} readOnly />
                        </div>

                        <div className="df row row-align-center profile_btns" style={{
                            justifyContent: "center",
                        }}>
                            <div
                                className="df"
                            >
                                <div

                                    className={!props.change ? "btn-primary-small pri-small total-center save_disabled" : "btn-primary-small pri-small total-center"}
                                    onClick={() => props.change ?
                                        props.setUserDeatils() : function () { }
                                    }
                                >
                                    Save
                                </div>
                                <div
                                    className="btn-sec-small sec-small total-center"
                                    onClick={() => {
                                        props.cancel();
                                    }}
                                >
                                    {" "}
                                    Cancel
                                </div>
                            </div>
                            <div
                                className="ul total-center btn-sec-small"
                                style={{
                                    cursor: "pointer",
                                    border: "none",
                                    color: "gray",
                                    backgroundColor: "white",
                                    marginTop: windowSize.width < 521 ? "0px" : "20px",
                                    marginLeft: windowSize.width < 521 ? "10px" : "20px",

                                }}
                                onClick={() => setShowPopup(true)}
                            >
                                Sign Out
                            </div>


                        </div>
                    </form>
                </div>
                {showPopup && (
                    <div className="inner_pop_up_container row df center" style={{ height: windowSize.height + 'px', position: "fixed" }}>
                        <div className="logout-dialog-box pop_up_box p-primary df quiz_popUp radius-primary" style={{
                            border: "1px solid lightgray",
                            padding: "16px ",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}>

                            <h1 className="typo-headings" style={{ color: "#000", fontSize: (windowSize.width < 960) ? ((windowSize.width < 420) ? 18 : 20) : "" }}>
                                Are you sure you want to sign out?
                            </h1>
                            <h1 className="row df center">
                                <button className="btn-secondary txt-medium" onClick={() => logOut()}>
                                    Sign Out
                                </button>
                                <button
                                    className="btn-secondary txt-medium"
                                    style={{
                                        backgroundColor: "#5C56D4",
                                        color: "white",
                                    }}
                                    onClick={() => {
                                        setShowPopup(false);
                                    }}
                                >
                                    Cancel
                                </button>
                            </h1>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};
export default ProfilePage;
