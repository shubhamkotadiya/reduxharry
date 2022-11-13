import React, { useContext, useEffect, useState } from "react";
import LiveImage from '../../../assets/images/common/live.gif'
import { getTimerData, isApp, setDateToAppFormat } from "../../../common/helper";
import "../../../assets/css/livequizcomponent.css"
import { Grid } from "@mui/material";
import { GridContext } from "../../../common/GridConfig";
import AccessBadges from "../../../components/lockingsystem/access_badges_component/AccessBadges";
import { useHistory } from "react-router-dom";
import ReactMarkDownCustom from "../../../components/ReactMarkDownCustom";
const LiveQuizComponent = (Props) => {
    const data = Props.data;
    const history = useHistory()
    const GridConfig = useContext(GridContext)
    const [timer, setTimer] = useState(getTimerData(data.end_time));
    const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight })
    useEffect(() => {
        var counter = setInterval(() => {
            setTimer(getTimerData(data.end_time))

        }, 1000)
        return () => { return clearInterval(counter) }
    }, [])

    const onResize = () => {
        let height = window.innerHeight;
        let width = window.innerWidth;

        setWindowSize({ width: width, height: height })

    }
    useEffect(() => {
        onResize();
        window.addEventListener('resize', onResize)
        return () => { return window.removeEventListener('resize', onResize) }
    }, [])
    // if (windowSize.width > 719) {
    return (
        <>

            <div className="row df p-relative ">
                <div className="live-quiz-container border-primary row radius-primary df p-relative p-primary" >
                    <div className="fit-content p-relative">
                        {(!data.user_has_access || (data.user_has_access && !(timer.day > 0 || timer.hours > 0 || timer.minutes > 0 || timer.seconds > 0))) && <div className="df fit-content space-between activity-card-small column row-center " style={{ zIndex: 3 }}>
                            <AccessBadges has_ended={!(timer.day > 0 || timer.hours > 0 || timer.minutes > 0 || timer.seconds > 0)} category="live" premium_intrest_string={"Knowledge/Activities/" + 'Live' + "/" + data.slug + "/inquiry_from_popup"} calledFrom="ACTIVITY" hide_lock={false} data={data} />
                        </div>}
                        <div className="row pointer" onClick={() => {
                            if (data.has_attempted) {
                                history.push("/activity/" + data.slug)
                            } else {
                                if (data.activity_type == "objective") {
                                    Props.openPopUp("objective", data.slug, data.promo_image)
                                } else {
                                    Props.openPopUp("subjective", data.slug, data.promo_image)
                                }
                            }
                        }}>
                            <Grid className="row" container spacing={2}>
                                <Grid container item xs={6} md={5} >
                                    <div className="row p-relative ">
                                        <img src={data.promo_image ? data.promo_image : ""} className="radius-primary fit-content live-quiz-image" style={{ minHeight: "100%", height: "auto" }} alt="" />
                                    </div>
                                </Grid>
                                <Grid container item xs={6} md={7} >
                                    <div className=" df column space-between row " style={{ alignItems: "flex-start", minHeight: "100%" }}>
                                        {/* <h1 className="row typo-sub-headings df" style={{textAlign:"left"}}>{data.activity_name ? data.activity_name : ""} </h1> */}
                                        <div>
                                            <div className="row df row-center  hide-below-mobile">
                                                <img src={LiveImage} className="liveImage" alt="" style={{ height: "30px", width: "30px" }} /> <span className="typo-headings ">Live Now</span>
                                            </div>
                                            <h1 className="df row line-margin-small typo-live-quiz-heading" >{data.activity_name ? data.activity_name : ""}</h1>
                                            <span className="typo-Description df row hide-below-mobile" style={{ textAlign: "left" }}>

                                                {}

                                                <ReactMarkDownCustom
                                                    children={data.description ? data.description : ""}
                                                />


                                            </span>
                                        </div>

                                        <div className="row">
                                            {/* <h2 className="txt-medium txt-gray font-bold df row typo-headings" style={{ margin: "10px 0px" }}>This quiz ends in</h2> */}
                                            {(timer.day > 0 || timer.hours > 0 || timer.minutes > 0 || timer.seconds > 0) ?
                                                <div className="df  column row">
                                                    {<>
                                                        <h2 className="txt-medium txt-primary df row m-v-primary live-quiz-subheading" style={{ marginBottom: "5px" }}>This quiz ends in</h2>
                                                        <div className="df  row " >
                                                            {<div className="timer_box btn-primary df center">
                                                                <span className=" typo-sub-headings" style={{ color: "white" }}>{timer.day != 0 ? timer.day : "0"}d</span>
                                                            </div>}
                                                            <div className="timer_box btn-primary df center">
                                                                <span className=" typo-sub-headings" style={{ color: "white" }}>{timer.hours != 0 ? timer.hours : "0"}h</span>
                                                            </div>
                                                            <div className="timer_box btn-primary df center">
                                                                <span className=" typo-sub-headings" style={{ color: "white" }}>{timer.minutes != 0 ? timer.minutes : "0"}m</span>
                                                            </div>
                                                            {windowSize.width > 720 && <div className="timer_box btn-primary df center">
                                                                <span className=" typo-sub-headings" style={{ color: "white" }}>{timer.seconds != 0 ? timer.seconds : "0"}s</span>
                                                            </div>}

                                                        </div>
                                                    </>}
                                                </div> : <h1 className=" txt-danger row typo-sub-headings">You just missed the live quiz.You can still find it in practice quiz list. Refresh to check it now!</h1>
                                            }

                                        </div>

                                    </div>


                                </Grid>

                            </Grid>
                        </div>
                    </div>



                </div>
            </div>
        </>
    )

    // } else {
    //     return <>
    //         <div className="row df p-relative ">
    //             <div className="live-quiz-container border-primary row radius-primary df p-relative p-primary" >
    //                 <div className="fit-content p-relative">

    //                     {(!data.user_has_access || (data.user_has_access && !(timer.day > 0 || timer.hours > 0 || timer.minutes > 0 || timer.seconds > 0))) && <div className="df fit-content space-between activity-card-small column row-center " style={{ zIndex: 3 }}>
    //                         <AccessBadges has_ended={(!timer.day > 0 || timer.hours > 0 || timer.minutes > 0 || timer.seconds > 0)} category="live" premium_intrest_string={"Knowledge/Activities/" + 'Live' + "/" + data.slug} calledFrom="ACTIVITY" hide_lock={false} data={data} />
    //                     </div>}
    //                     <div className="row" onClick={() => {
    //                         if (data.has_attempted) {
    //                             history.push("/activity/" + data.slug)
    //                         } else {
    //                             if (data.activity_type == "objective") {
    //                                 Props.openPopUp("objective", data.slug, data.promo_image)
    //                             } else {
    //                                 Props.openPopUp("subjective", data.slug, data.promo_image)
    //                             }
    //                         }
    //                     }}>
    //                         <Grid className="row" container spacing={2}>
    //                             <Grid container item xs={6} >
    //                                 <div className=" df column space-between row " style={{ alignItems: "flex-start", minHeight: "100%" }}>
    //                                     {/* <h1 className="row typo-sub-headings df" style={{textAlign:"left"}}>{data.activity_name ? data.activity_name : ""} </h1> */}
    //                                     <div className="row df row-center" style={{ marginLeft: "2.5%" }}>
    //                                         <img src={LiveImage} className="liveImage" alt="" style={{ height: "20px", width: "20px" }} /> <span className="typo-sub-headings ">Live Now</span>
    //                                     </div>
    //                                     {(timer.day > 0 || timer.hours > 0 || timer.minutes > 0 || timer.seconds > 0) ?
    //                                         <div className="df  column row">
    //                                             <h2 className="txt-medium txt-primary df row live-quiz-subheading" style={{ margin: "4px 0px" }}>This quiz ends in</h2>
    //                                             <div className="df  row " style={{ marginBottom: "15px" }}>
    //                                                 {<div className="timer_box btn-primary df center">
    //                                                     <span className=" typo-sub-headings" style={{ color: "white" }}>{timer.day != 0 ? timer.day : "0"}d</span>
    //                                                 </div>}
    //                                                 <div className="timer_box btn-primary df center">
    //                                                     <span className=" typo-sub-headings" style={{ color: "white" }}>{timer.hours != 0 ? timer.hours : "0"}h</span>
    //                                                 </div>
    //                                                 <div className="timer_box btn-primary df center">
    //                                                     <span className=" typo-sub-headings" style={{ color: "white" }}>{timer.minutes != 0 ? timer.minutes : "0"}m</span>
    //                                                 </div>
    //                                                 {/* {timer.day <= 0 && <div className="timer_box btn-primary df center">
    //                                                 <h2 className="live-quiz-title typo-sub-headings" style={{ color: "white" }}>{timer.seconds != 0 ? timer.seconds : "0"}</h2>
    //                                                 <h3 className="live-quiz-metadata typo-menu-secondary" style={{ color: "white" }}>Seconds</h3>
    //                                             </div>} */}

    //                                             </div></div> : <h1 className=" txt-danger row typo-sub-headings">You just missed the live quiz.You can still find it in practice quiz list. Refresh to check it now!</h1>
    //                                     }
    //                                 </div>


    //                             </Grid>
    //                             <Grid container item xs={6} >
    //                                 <div className="row p-relative ">
    //                                     {/* <div

    //                                         className=" center df bottom-play-btn  row m-v-primary  border-none txt-large">

    //                                         <svg width="30" height="35" viewBox="0 0 72 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    //                                             <g filter="url(#filter0_d_495:2102)">
    //                                                 <path d="M64 33.0718C69.3333 36.151 69.3333 43.849 64 46.9282L16 74.641C10.6667 77.7202 4 73.8712 4 67.7128L4 12.2872C4 6.12878 10.6667 2.27978 16 5.35898L64 33.0718Z" fill="white" />
    //                                             </g>
    //                                             <defs>
    //                                                 <filter id="filter0_d_495:2102" x="0" y="0.275391" width="72" height="79.4492" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
    //                                                     <feFlood floodOpacity="0" result="BackgroundImageFix" />
    //                                                     <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
    //                                                     <feOffset />
    //                                                     <feGaussianBlur stdDeviation="2" />
    //                                                     <feComposite in2="hardAlpha" operator="out" />
    //                                                     <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" />
    //                                                     <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_495:2102" />
    //                                                     <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_495:2102" result="shape" />
    //                                                 </filter>
    //                                             </defs>
    //                                         </svg>
    //                                     </div> */}
    //                                     <img src={data.promo_image ? data.promo_image : ""} className="radius-primary fit-content live-quiz-image" style={{ minHeight: "100%", height: "auto" }} alt="" />
    //                                 </div>
    //                             </Grid>
    //                         </Grid>
    //                     </div>
    //                 </div>



    //             </div>
    //         </div>
    //     </>
    // }
    // } else {
    //     return (
    //         <>
    //             <div className="small_live_box btn-primary df space-between row-center relative">
    //                 {!data.user_has_access &&
    //                     <div style={{ position: "absolute", right: "7px", top: "-5px" }}>
    //                         <svg className="quiz_lock_content_svg" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    //                             <rect x="1" y="1" width="46" height="46" rx="23" fill="#5C56D4" />
    //                             <path d="M29 21V19C29 16.2 26.8 14 24 14C21.2 14 19 16.2 19 19V21C17.3 21 16 22.3 16 24V31C16 32.7 17.3 34 19 34H29C30.7 34 32 32.7 32 31V24C32 22.3 30.7 21 29 21ZM21 19C21 17.3 22.3 16 24 16C25.7 16 27 17.3 27 19V21H21V19Z" fill="white" />
    //                             <path d="M28 22H29C30.1477 22 31 22.8523 31 24V31C31 32.1477 30.1477 33 29 33H19C17.8523 33 17 32.1477 17 31V24C17 22.8523 17.8523 22 19 22H20H21H27H28Z" fill="white" stroke="white" strokeWidth="2" />
    //                             <rect x="1" y="1" width="46" height="46" rx="23" stroke="white" strokeWidth="2" />
    //                         </svg>
    //                     </div>
    //                 }
    //                 <h1 className="df row center" >{data.activity_name ? data.activity_name : ""}</h1>
    //                 {(timer.day > 0 || timer.hours > 0 || timer.minutes > 0 || timer.seconds > 0) ?
    //                     <span className="txt-medium">This quiz ends in {timer.day}D {timer.hours}H {timer.minutes}M {timer.seconds}S</span> : <span className="txt-medium txt-danger">This quiz is Ended</span>}



    //                 {data.activity_type == "subjective" && data.user_has_access &&
    //                     <button onClick={() => { Props.openPopUp("subjective", data.slug, data.promo_image) }} className="btn-primary btn txt-large">
    //                         <svg _ngcontent-tct-c42="" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none"><path _ngcontent-tct-c42="" d="M9.07378 2.95611C7.74233 2.1088 6 3.06522 6 4.64342V27.6897C6 29.2679 7.74228 30.2243 9.07373 29.3771L27.1815 17.8543C28.4165 17.0684 28.4165 15.2656 27.1815 14.4796L9.07378 2.95611Z" fill="white"></path></svg>
    //                     </button>
    //                 }
    //                 {data.activity_type == "objective" && data.user_has_access &&
    //                     <button onClick={() => { Props.openPopUp("objective", data.slug, data.promo_image) }} className="btn-primary btn txt-large">
    //                         <svg _ngcontent-tct-c42="" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none"><path _ngcontent-tct-c42="" d="M9.07378 2.95611C7.74233 2.1088 6 3.06522 6 4.64342V27.6897C6 29.2679 7.74228 30.2243 9.07373 29.3771L27.1815 17.8543C28.4165 17.0684 28.4165 15.2656 27.1815 14.4796L9.07378 2.95611Z" fill="white"></path></svg>
    //                     </button>
    //                 }
    //                 {data.activity_type == "subjective" && !data.user_has_access &&
    //                     <button onClick={Props.openRestrictionPopUp ? () => { Props.openRestrictionPopUp(isApp() ? "This content is available only for exclusive members." : "This content is for our premium users. You may contact us on +91 9880678169 or namaskar@summachar.in", data) } : () => { }} className="btn-primary btn txt-large">
    //                         <svg _ngcontent-tct-c42="" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none"><path _ngcontent-tct-c42="" d="M9.07378 2.95611C7.74233 2.1088 6 3.06522 6 4.64342V27.6897C6 29.2679 7.74228 30.2243 9.07373 29.3771L27.1815 17.8543C28.4165 17.0684 28.4165 15.2656 27.1815 14.4796L9.07378 2.95611Z" fill="white"></path></svg>
    //                     </button>
    //                 }
    //                 {data.activity_type == "objective" && !data.user_has_access &&
    //                     <button onClick={Props.openRestrictionPopUp ? () => { Props.openRestrictionPopUp(isApp() ? "This content is available only for exclusive members." : "This content is for our premium users. You may contact us on +91 9880678169 or namaskar@summachar.in", data) } : () => { }} className="btn-primary btn txt-large">
    //                         <svg _ngcontent-tct-c42="" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none"><path _ngcontent-tct-c42="" d="M9.07378 2.95611C7.74233 2.1088 6 3.06522 6 4.64342V27.6897C6 29.2679 7.74228 30.2243 9.07373 29.3771L27.1815 17.8543C28.4165 17.0684 28.4165 15.2656 27.1815 14.4796L9.07378 2.95611Z" fill="white"></path></svg>
    //                     </button>
    //                 }

    //                 <span className="txt-medium">{setDateToAppFormat(data.start_time)} </span>
    //             </div>
    //         </>
    //     )
    // }

}
export default LiveQuizComponent;