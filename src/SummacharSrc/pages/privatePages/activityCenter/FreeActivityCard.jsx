import React, { useContext, useEffect, useState } from "react";
import LiveImage from '../../../assets/images/common/live.gif'
import { getTimerData, isApp, setDateToAppFormat } from "../../../common/helper";
import "../../../assets/css/livequizcomponent.css"
import { Grid } from "@mui/material";
import { GridContext } from "../../../common/GridConfig";
import AccessBadges from "../../../components/lockingsystem/access_badges_component/AccessBadges";
import { useHistory } from "react-router-dom";
import ReactMarkDownCustom from "../../../components/ReactMarkDownCustom";
const FreeActivityCard = (Props) => {
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

    return <>
        <div className="row df p-relative ">
            <div className="live-quiz-container border-primary row radius-primary df p-relative " >


                <div className="row pointer"
                    onClick={() => {
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
                    <Grid className="row" container spacing={0}>
                        <Grid container item xs={6} >
                            <div className="row p-relative p-primary">
                                <div

                                    className=" center df bottom-play-btn  row m-v-primary  border-none txt-large">
                                </div>
                                <img src={data.promo_image ? data.promo_image : ""} className="radius-primary fit-content " style={{ minHeight: "100%", height: "auto" }} alt="" />
                            </div>
                        </Grid>
                        <Grid container item xs={6} >
                            <div className=" df column center row p-primary" style={{ alignItems: "flex-start", minHeight: "100%" }}>
                                <h1 className="row typo-headings df" style={{ textAlign: "left" }}>{data.activity_name ? data.activity_name : ""} </h1>

                                <h1 className="row typo-Description df" style={{ textAlign: "left" }}>
                                    <ReactMarkDownCustom
                                        children={data.description ? data.description : ""}
                                    />
                                </h1>
                                {/* <button onClick={() => {
                                    if (data.has_attempted) {
                                        history.push("/activity/" + data.slug)
                                    } else {
                                        if (data.activity_type == "objective") {
                                            Props.openPopUp("objective", data.slug, data.promo_image)
                                        } else {
                                            Props.openPopUp("subjective", data.slug, data.promo_image)
                                        }
                                    }
                                }}
                                    className="typo-btn-primary radius-primary btn-primary p-h-primary">
                                    Play Now
                                </button> */}

                            </div>


                        </Grid>

                    </Grid>
                </div>
            </div>
        </div>
    </>

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
export default FreeActivityCard;