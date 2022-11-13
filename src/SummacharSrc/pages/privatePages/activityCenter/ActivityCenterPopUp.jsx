import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LiveImage from '../../../assets/images/common/live.gif'
import { getFirstQuizAttempt, isFreeTrial, isApp, premiumInt } from "../../../common/helper";
import Header from "../navbar/Header";
import PremiumPopUp from "../../../components/premiumPop"
import { BreadCrumbContext } from "../../../App";
const ActivityCenterPopUp = (Props) => {
    
    const data = Props.popUpData;
    const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight })
    let [isVisible, changeVisibility] = useState(false);
    let [popupContent, setContent] = useState('');
    let [previosBreadCrunb, setPreviousBreadCrumb] = useState('');

    const onResize = () => {
        let height = window.innerHeight;
        let width = window.innerWidth;
        setWindowSize({ width: width, height: height })
    }
    const breadCrumb = useContext(BreadCrumbContext);
    useEffect(() => {
        // setPreviousBreadCrumb(breadCrumb.get())
        const bread = breadCrumb.get()
        breadCrumb.set(['Rules And Eligibility'])
        return () => { breadCrumb.set([bread]) }
    }, [])


    const setPopUp = (data) => {
        premiumInt("Knowledge/Activities/" + data.slug)
        if (windowSize.innerWidth > 768) {
            Props.closePopUp();
        }
        changeVisibility(!isVisible);
        setContent(data);
    }
    useEffect(() => {
        onResize();
        window.addEventListener('resize', onResize)
        return () => { return window.removeEventListener('resize', onResize) }
    }, [])
    if (windowSize.width > 960) {
        return (
            <>
                {isVisible && <PremiumPopUp changeVisibility={changeVisibility} description={popupContent}> </PremiumPopUp>}
                <div className="pop_up_container row df center" style={{zIndex:'9999999999999999'}}>
                    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                        <div className="grayArea fit-content" onClick={() => { Props.closePopUp() }}></div>

                        {/*<div className="centered_outer_container" style={{ display: "flex", justifyContent: "center" }} >*/}


                          <div onClick={() => { Props.closePopUp() }} style={{ flex: "1 1 auto" }}></div>

                            <div className="news_popUp_Box  common-grid-outer df" style={{ padding: "0px", maxWidth: 960, width: 'auto', height: "auto !important", }}>
                                <div className="activity_live_box df" style={{ margin: "0px" }}>
                                    <div className="live_quiz_content space-between df flex-1" >
                                        <div className="row" style={{ color: "#000" }}>
                                            {/*{!Props.hide_live && <div className="row df row-center">*/}
                                            {/*    <img src={LiveImage} className="liveImage" alt="" /> <h2 className="txt-large">Live Now</h2>*/}
                                            {/*</div>}*/}
                                            <h1 className="activity_heading df row"
                                                style={{
                                                    fontFamily: "Poppins",
                                                    fontSize: 20,
                                                    fontWeight: 600, //semibold,
                                                    color: "#18181b"
                                                }}
                                            >Rules & Eligibility</h1>

                                            {data.type == "objective" &&
                                                <ul className="df row description" >
                                                    <li className="df row ">
                                                        <div className="list_bullet">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                                <path d="M0 7H12.17L6.58 1.41L8 0L16 8L8 16L6.59 14.59L12.17 9H0V7Z" fill="#5C56D4" />
                                                            </svg>
                                                        </div>
                                                        <span className="txt-medium" style={{ fontFamily: 'Source Sans Pro' }}>
                                                            All Pathshala subscribers are eligible for this competition.
                                                        </span>
                                                    </li>
                                                    <li className="df row row-center">
                                                        <div className="list_bullet">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                                <path d="M0 7H12.17L6.58 1.41L8 0L16 8L8 16L6.59 14.59L12.17 9H0V7Z" fill="#5C56D4" />
                                                            </svg>
                                                        </div>
                                                        <span className="txt-medium" style={{ fontFamily: 'Source Sans Pro' }}>
                                                            Your ranking will be shown in your individual app profile.
                                                        </span>
                                                    </li>
                                                    <li className="df row row-center">
                                                        <div className="list_bullet">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                                <path d="M0 7H12.17L6.58 1.41L8 0L16 8L8 16L6.59 14.59L12.17 9H0V7Z" fill="#5C56D4" />
                                                            </svg>
                                                        </div>
                                                        <span className="txt-medium" style={{ fontFamily: 'Source Sans Pro' }}>
                                                            You can check the leaderboard on Pathshala as well!
                                                        </span>
                                                    </li>
                                                    <li className="df row row-center">
                                                        <div className="list_bullet">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                                <path d="M0 7H12.17L6.58 1.41L8 0L16 8L8 16L6.59 14.59L12.17 9H0V7Z" fill="#5C56D4" />
                                                            </svg>
                                                        </div>
                                                        <span className="txt-medium" style={{ fontFamily: 'Source Sans Pro' }}>
                                                            Top 20 winners will be given certificates!
                                                        </span>
                                                    </li>
                                                    <li className="df row row-center">
                                                        <div className="list_bullet">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                                <path d="M0 7H12.17L6.58 1.41L8 0L16 8L8 16L6.59 14.59L12.17 9H0V7Z" fill="#5C56D4" />
                                                            </svg>
                                                        </div>
                                                        <span className="txt-medium" style={{ fontFamily: 'Source Sans Pro' }}>
                                                            Note that certificates will be visible in the Certificates section.
                                                        </span>
                                                    </li>
                                                </ul>
                                            }

                                            {data.type == "subjective" &&
                                                <ul className="df row">
                                                    <li className="df row ">
                                                        <div className="list_bullet">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                                <path d="M0 7H12.17L6.58 1.41L8 0L16 8L8 16L6.59 14.59L12.17 9H0V7Z" fill="#5C56D4" />
                                                            </svg>
                                                        </div>
                                                        <span className="txt-medium" style={{ fontFamily: 'Source Sans Pro' }}>
                                                            All Pathshala subscribers are eligible for this competition.
                                                        </span>
                                                    </li>
                                                    <li className="df row row-center">
                                                        <div className="list_bullet">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                                <path d="M0 7H12.17L6.58 1.41L8 0L16 8L8 16L6.59 14.59L12.17 9H0V7Z" fill="#5C56D4" />
                                                            </svg>
                                                        </div>
                                                        <span className="txt-medium" style={{ fontFamily: 'Source Sans Pro' }}>
                                                            Your ranking will be shown in your individual app profile.
                                                        </span>
                                                    </li>
                                                    <li className="df row row-center">
                                                        <div className="list_bullet">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                                <path d="M0 7H12.17L6.58 1.41L8 0L16 8L8 16L6.59 14.59L12.17 9H0V7Z" fill="#5C56D4" />
                                                            </svg>
                                                        </div>
                                                        <span className="txt-medium" style={{ fontFamily: 'Source Sans Pro' }}>
                                                            You can check the leaderboard on Pathshala as well!
                                                        </span>
                                                    </li>
                                                    <li className="df row row-center">
                                                        <div className="list_bullet">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                                <path d="M0 7H12.17L6.58 1.41L8 0L16 8L8 16L6.59 14.59L12.17 9H0V7Z" fill="#5C56D4" />
                                                            </svg>
                                                        </div>
                                                        <span className="txt-medium" style={{ fontFamily: 'Source Sans Pro' }}>
                                                            Top 20 winners will be given certificates!
                                                        </span>
                                                    </li>
                                                    <li className="df row row-center">
                                                        <div className="list_bullet">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                                <path d="M0 7H12.17L6.58 1.41L8 0L16 8L8 16L6.59 14.59L12.17 9H0V7Z" fill="#5C56D4" />
                                                            </svg>
                                                        </div>
                                                        <span className="txt-medium" style={{ fontFamily: 'Source Sans Pro' }}>
                                                            Note that certificates will be visible in the Certificates section.
                                                        </span>
                                                    </li>
                                                </ul>
                                            }
                                        </div>
                                        <div className="row">



                                            {!isApp() && Object.keys(Props.popUpData).length == 4 && data.user_has_access == false &&
                                                <div className="row df center" style={{ flexDirection: 'column', padding: "3px" }}>
                                                    <span className="txt-medium txt-secondary">Play with your friends   </span>
                                                    <a
                                                        onClick={() => {
                                                            setPopUp("This content is for our premium users. You may contact us on +91 9880678169 or namaskar@summachar.in");
                                                        }}
                                                        className="txt-medium txt-primary pointer"
                                                    >
                                                        Go Premium
                                                    </a> <span className="txt-medium txt-secondary">And access all competitions!

                                                    </span>
                                                </div>
                                            }
                                            {isApp() && Object.keys(Props.popUpData).length == 4 && data.user_has_access == false &&
                                                <div className="row df center" style={{ flexDirection: 'column', padding: "3px" }}>

                                                    <div className="txt-medium txt-primary pointer" onClick={() => { setPopUp("This content is for our premium users") }}>Participate
                                                    </div>
                                                    <span className="txt-medium txt-secondary">in exciting competitions with your friends now!
                                                    </span>

                                                </div>
                                            }

                                            {((Object.keys(Props.popUpData).length == 4 && data.user_has_access == true) || Object.keys(Props.popUpData).length == 3) && data.type == "objective" && <Link to={"/activity/" + data.slug} className="df center btn-primary quiz_link_redirect btn txt-large">
                                                Play Now
                                            </Link>}
                                            {((Object.keys(Props.popUpData).length == 4 && data.user_has_access == true) || Object.keys(Props.popUpData).length == 3) && data.type == "subjective" && <Link to={"/competition-essay/" + data.slug} className="df center btn-primary quiz_link_redirect btn txt-large">
                                                Participate
                                            </Link>}

                                            {data.type == "objective" && Object.keys(Props.popUpData).length == 4 && data.user_has_access == false && <div className="df disabled center btn-primary quiz_link_redirect btn txt-large">
                                                Play Now
                                            </div>}
                                            {data.type == "subjective" && Object.keys(Props.popUpData).length == 4 && data.user_has_access == false && <div className="df disabled center btn-primary quiz_link_redirect btn txt-large">
                                                Participate
                                            </div>}
                                        </div>


                                    </div>
                                </div>

                            </div>
                           <div onClick={() => { Props.closePopUp() }} style={{ flex: "1 1 auto" }}></div>
                       {/* </div>*/}
                    </div>
                </div>
            </>
        )

    } else {
        return (
            <>
                {isVisible && <PremiumPopUp changeVisibility={changeVisibility} description={popupContent}></PremiumPopUp>}

                <div className="pop_up_container row df row-center" style={{ flexDirection: "column", color: "#000",zIndex:'9999999999999999' }}>
                    <Header onBackClick={() => { Props.closePopUp() }} />
                    <div className="news_popUp_Box row-center  df" style={{ flexDirection: "column", animation: "none", width: "100%", overflowY: "scroll" }}>
                        {/* <h1 className="txt-extraalarge df row center" style={{ margin: "10px 0px" }}>Rules & Eligibility</h1> */}
                        <img src={data.image} alt="" style={{ width: "90%", maxWidth: "200px", margin: "10px 0px", borderRadius: "5px" }} />
                        {data.type == "objective" &&
                            <ul className="df row small_rules_list">
                                <li className="df row ">
                                    <div className="list_bullet">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                            <path d="M0 7H12.17L6.58 1.41L8 0L16 8L8 16L6.59 14.59L12.17 9H0V7Z" fill="#5C56D4" />
                                        </svg>
                                    </div>
                                    <span className="txt-medium">
                                        All Pathshala subscribers are eligible for this competition.
                                    </span>
                                </li>
                                <li className="df row row-center">
                                    <div className="list_bullet">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                            <path d="M0 7H12.17L6.58 1.41L8 0L16 8L8 16L6.59 14.59L12.17 9H0V7Z" fill="#5C56D4" />
                                        </svg>
                                    </div>
                                    <span className="txt-medium">
                                        Your ranking will be shown in your individual app profile.
                                    </span>
                                </li>
                                <li className="df row row-center">
                                    <div className="list_bullet">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                            <path d="M0 7H12.17L6.58 1.41L8 0L16 8L8 16L6.59 14.59L12.17 9H0V7Z" fill="#5C56D4" />
                                        </svg>
                                    </div>
                                    <span className="txt-medium">
                                        You can check the leaderboard on Pathshala as well!
                                    </span>
                                </li>
                                <li className="df row row-center">
                                    <div className="list_bullet">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                            <path d="M0 7H12.17L6.58 1.41L8 0L16 8L8 16L6.59 14.59L12.17 9H0V7Z" fill="#5C56D4" />
                                        </svg>
                                    </div>
                                    <span className="txt-medium">
                                        Top 20 winners will be given certificates!
                                    </span>
                                </li>
                                <li className="df row row-center">
                                    <div className="list_bullet">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                            <path d="M0 7H12.17L6.58 1.41L8 0L16 8L8 16L6.59 14.59L12.17 9H0V7Z" fill="#5C56D4" />
                                        </svg>
                                    </div>
                                    <span className="txt-medium">
                                        Note that certificates will be visible in the Certificates section.
                                    </span>
                                </li>
                            </ul>
                        }

                        {data.type == "subjective" &&
                            <ul className="df row small_rules_list">
                                <li className="df row ">
                                    <div className="list_bullet">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                            <path d="M0 7H12.17L6.58 1.41L8 0L16 8L8 16L6.59 14.59L12.17 9H0V7Z" fill="#5C56D4" />
                                        </svg>
                                    </div>
                                    <span className="txt-medium">
                                        All Pathshala subscribers are eligible for this competition.
                                    </span>
                                </li>
                                <li className="df row row-center">
                                    <div className="list_bullet">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                            <path d="M0 7H12.17L6.58 1.41L8 0L16 8L8 16L6.59 14.59L12.17 9H0V7Z" fill="#5C56D4" />
                                        </svg>
                                    </div>
                                    <span className="txt-medium">
                                        Your ranking will be shown in your individual app profile.
                                    </span>
                                </li>
                                <li className="df row row-center">
                                    <div className="list_bullet">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                            <path d="M0 7H12.17L6.58 1.41L8 0L16 8L8 16L6.59 14.59L12.17 9H0V7Z" fill="#5C56D4" />
                                        </svg>
                                    </div>
                                    <span className="txt-medium">
                                        You can check the leaderboard on Pathshala as well!
                                    </span>
                                </li>
                                <li className="df row row-center">
                                    <div className="list_bullet">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                            <path d="M0 7H12.17L6.58 1.41L8 0L16 8L8 16L6.59 14.59L12.17 9H0V7Z" fill="#5C56D4" />
                                        </svg>
                                    </div>
                                    <span className="txt-medium">
                                        Top 20 winners will be given certificates!
                                    </span>
                                </li>
                                <li className="df row row-center">
                                    <div className="list_bullet">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                            <path d="M0 7H12.17L6.58 1.41L8 0L16 8L8 16L6.59 14.59L12.17 9H0V7Z" fill="#5C56D4" />
                                        </svg>
                                    </div>
                                    <span className="txt-medium">
                                        Note that certificates will be visible in the Certificates section.
                                    </span>
                                </li>
                            </ul>
                        }

                        <div className="row df center">



                            {!isApp() && Object.keys(Props.popUpData).length == 4 && data.user_has_access == false &&
                                <div className="row df center" style={{ flexDirection: 'column', padding: "3px" }}>
                                    <span className="txt-medium txt-secondary">Play with your friends   </span>
                                    <a
                                        onClick={() => {
                                            
                                            setPopUp("This content is for our premium users. You may contact us on +91 9880678169 or namaskar@summachar.in");
                                        }}
                                        className="txt-medium txt-primary pointer"
                                    >
                                        Go Premium
                                    </a>
                                    <span className="txt-medium txt-secondary">And access all competitions!
                                    </span>
                                </div>
                            }
                            {isApp() && Object.keys(Props.popUpData).length == 4 && data.user_has_access == false &&
                                <div className="row df center" style={{ flexDirection: 'column', padding: "3px" }}>
                                    <div className="txt-medium txt-primary pointer" onClick={() => { setPopUp("This content is for our premium users") }}>Participate
                                    </div>
                                    <span className="txt-medium txt-secondary">in exciting competitions with your friends now!
                                    </span>

                                </div>
                            }

                            {((Object.keys(Props.popUpData).length == 4 && data.user_has_access == true) || Object.keys(Props.popUpData).length == 3) && data.type == "objective" && <Link to={"/activity/" + data.slug} className="df center btn-primary row m-v-primary typo-btn-primary txt-large radius-primary" style={{ maxWidth: "90%" }}>
                                Play Now
                            </Link>}
                            {((Object.keys(Props.popUpData).length == 4 && data.user_has_access == true) || Object.keys(Props.popUpData).length == 3) && data.type == "subjective" && <Link to={"/competition-essay/" + data.slug} className="df center btn-primary row m-v-primary typo-btn-primary txt-large radius-primary" style={{ maxWidth: "90%" }}>
                                Participate
                            </Link>}

                            {data.type == "objective" && Object.keys(Props.popUpData).length == 4 && data.user_has_access == false && <div className="df disabled center btn-primary row m-v-primary typo-btn-primary txt-large radius-primary" style={{ maxWidth: "90%" }}>
                                Play Now
                            </div>}
                            {data.type == "subjective" && Object.keys(Props.popUpData).length == 4 && data.user_has_access == false && <div className="df disabled center btn-primary row m-v-primary typo-btn-primary txt-large radius-primary" style={{ maxWidth: "90%" }}>
                                Participate
                            </div>}
                        </div>
                    </div>
                </div>
            </>
        )
    }

}
export default ActivityCenterPopUp;