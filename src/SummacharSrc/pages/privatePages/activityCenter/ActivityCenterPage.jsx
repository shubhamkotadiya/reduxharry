import LiveQuizComponent from "./LiveQuizComponent"
import LiveQuizSlider from "./LiveQuizSlider"
import '../../../assets/css/activity.css'
import ActivityCenterPopUp from "./ActivityCenterPopUp"

import ActivityCard from "./ActivityCard"
import { useEffect, useState, useContext } from "react"
import Loader from "../../../components/Loader"

import { Route, Switch, useRouteMatch } from "react-router"
import PremiumPopUp from "../../../components/premiumPop"
import { isApp, premiumInt } from "../../../common/helper"
import { Store } from '../../../App'
// import AccessBadges from "../../../components/lockingsystem/access_badges_component/AccessBadges"
import LaoderSmall from "../../../assets/images/common/loader_small.gif";
import FreeActivityCard from "./FreeActivityCard"

import '../../../assets/css/enquirenow.css'
import { Link } from "react-router-dom"

import { styled } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import NativeSelect from '@mui/material/NativeSelect';
import InputBase from '@mui/material/InputBase';
import { Grid } from "@mui/material"
import { GridContext } from "../../../common/GridConfig"
import UpcomingActivitCard from "./UpcomingActivitCard"

export const BootstrapInput = styled(InputBase)(({ theme }) => ({

    '& .MuiInputBase-input': {

        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 26px 10px 12px',
        transition: theme.transitions.create(['border-color']),
        [`@media screen and (max-width: 720px)`]: {
            fontSize: "12px",
            padding: "5px 10px"
        },
        [`@media screen and (max-width: 350px)`]: {
            fontSize: "10px",
            padding: "5px"
        },
        // Use the system font instead of the default Roboto font.
        '&:focus': {


        },
    },
}));
const ActivityCenterPage = (Props) => {
    let { path, url } = useRouteMatch();
    const GridConfig = useContext(GridContext)
    const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight })

    const onResize = () => {
        let height = window.innerHeight;
        let width = window.innerWidth;

        setWindowSize({ width: width, height: height })
    }
    let [isVisible, changeVisibility] = useState(false);
    let [popupContent, setContent] = useState('');
    const setRestrictionPopup = (data, quizData, category = "recent") => {
        premiumInt("Knowledge/Activities/" + category + '/' + quizData.slug)
        changeVisibility(!isVisible);
        setContent(data);
    }
    useEffect(() => {
        onResize();
        window.addEventListener('resize', onResize)
        return () => { return window.removeEventListener('resize', onResize) }
    }, [])


    const user = useContext(Store).user;

    const setPopUp = (data) => {
        premiumInt("/inquiry");
        changeVisibility(!isVisible);
        if (isApp()) {
            setContent("This content is for our premium users");
        }
        else {
            setContent("This content is for our premium users. You may contact us on +91 9880678169 or namaskar@summachar.in")
        }
    }

    let liveActivityPaddBotTop = "16px";

    if (window.innerWidth < 640) {
        liveActivityPaddBotTop = '16px';
    }
    else if (window.innerWidth >= 640 && window.innerWidth < 720) {
        liveActivityPaddBotTop = '28px';
    }
    else if (window.innerWidth >= 720 && window.innerWidth < 960) {
        liveActivityPaddBotTop = '30px';
    }
    else if (window.innerWidth >= 960 && window.innerWidth < 1280) {
        liveActivityPaddBotTop = '24px';
    }
    else if (window.innerWidth >= 1280 && window.innerWidth < 1600) {
        liveActivityPaddBotTop = '32px';
    }
    else if (window.innerWidth >= 1600 && window.innerWidth < 1920) {
        liveActivityPaddBotTop = '40px';
    }
    else {
        liveActivityPaddBotTop = '48px';
    }

    return (
        <>
            <div className="news_container" id="news_container" onScroll={Props.onScroll} style={{ paddingTop: (Props.liveQuiz && !Props.liveQuiz.loading && Props.liveQuiz.data.length <= 0) ? "0px" : "0px", paddingBottom: "20px" }}>
                <div className="outer-main-container" style={{ paddingTop: ((Props.liveQuiz && !Props.liveQuiz.loading && Props.liveQuiz.data.length <= 0) || user.data.user_type === "FREE_USER") ? "0px" : "" }}>
                    <div className="common-grid-outer">
                        <div className="inner-container centered_outer_container">
                            {isVisible && <PremiumPopUp changeVisibility={changeVisibility} description={popupContent}></PremiumPopUp>}
                            {
                                user.data.user_type === "FREE_USER" &&
                                <div className="centered_outer_container">
                                    <div className="df row column p-h-secondary">
                                        <p className="df row typo-sub-headings  m-v-primary" style={{ color: "#000", marginTop: "0px" }}>To access all activities, get our Premium News Subscription.</p>
                                        {/* { <button className="golden-btn p-relative shimmer" onClick={() => { }}><AccessBadges premium_intrest_string={"/inquiry_from_popup"} calledFrom="ACTIVITY" hide_lock={true} data={{ user_has_access: false }} /> Enquire&nbsp;Now</button>} */}
                                        <Link to={"/pricing"} className="golden-btn p-relative shimmer" onClick={() => { premiumInt("/inquiry_from_popup") }}> Go&nbsp;Premium</Link>
                                        {/* {isApp() && <button className="golden-btn shimmer" onClick={() => premiumInt("/inquiry_from_popup")}><a href="/tel:+919880678169" style={{ color: "#18181B" }}> Enquire&nbsp;Now</a></button>} */}
                                    </div>
                                </div>
                            }
                            <div className="container" >
                                <div className="news_div p-h-secondary" >
                                    {Props.freeQuiz && !Props.freeQuiz.loading && Props.freeQuiz.data.length > 0 &&
                                        <>
                                            <div className="title-div row m-h-primary" style={{ margin: "auto 0" }} >
                                                <div className="title heading-text " style={{ margin: Props.liveQuiz && !Props.liveQuiz.loading && Props.liveQuiz.data.length > 0 ? "0px 0 16px 0" : "0px 0 16px 0" }}><b>Top Quizzes of the Month</b></div>
                                                {/* <div className="grayline"></div> */}
                                            </div>
                                            <Grid className="row" container spacing={2}>
                                                {
                                                    Props.freeQuiz.data.map((data, index) => {
                                                        return (
                                                            <Grid container key={index} item sm={12} md={6} >
                                                                <FreeActivityCard openRestrictionPopUp={(data, quizData) => { setRestrictionPopup(data, quizData, "Free") }} openPopUp={Props.openPopUp} key={data.uuid + "-" + index} data={data} />
                                                            </Grid>
                                                        )
                                                    })
                                                }
                                            </Grid>
                                            <p className="typo-description df m-v-primary row">More such daily quizzes, crosswords and other fun games  available for Premium News Subscribers!</p>
                                        </>}
                                    {Props.liveQuiz && !Props.liveQuiz.loading && Props.liveQuiz.data.length > 0 &&
                                        <div className="title-div row m-v-primary" style={{ marginBottom: "0px" }} >
                                            <div className="title heading-text " ><b>Live Activities</b></div>

                                            {/* <div className="grayline"></div> */}
                                        </div>}
                                        <p className="row typo-sub-headings m-v-primary " style={{color:"#000"}}>Get all questions correct on these Live Activities to win exciting certificates!</p>

                                    {Props.liveQuiz && !Props.liveQuiz.loading && Props.liveQuiz.data.length > 0 && <div className="row live-quiz-slider-area m-v-primary"
                                        style={{ paddingBottom: liveActivityPaddBotTop }}
                                    ><LiveQuizSlider openRestrictionPopUp={(data, quizData) => { setRestrictionPopup(data, quizData, "Live") }} openPopUp={Props.openPopUp} data={Props.liveQuiz.data} /></div>}


                                    {Props.upcomingQuiz && !Props.upcomingQuiz.loading && Props.upcomingQuiz.data.length > 0 &&
                                        <div className="title-div row m-v-primary" style={{ marginBottom: "0px" }} >
                                            <div className="title heading-text " ><b>Upcoming Activities</b></div>
                                            {/* <div className="grayline"></div> */}
                                        </div>


                                    }
                                    {
                                        Props.upcomingQuiz && !Props.upcomingQuiz.loading && Props.upcomingQuiz.data.length > 0 && Props.upcomingQuiz.data.slice(0, 1).map((data, index) => {
                                            return (
                                                <div className="df row m-v-primary" key={index} style={{ marginBottom: "0px" }}>
                                                    <UpcomingActivitCard data={data} />
                                                </div>

                                            )
                                        })
                                    }

                                    {/* <div className="title-div row m-v-primary show-below-mobile" style={{ marginBottom: "0px", marginTop: "50px", display: "none" }} >
                                        <div className="title heading-text " ><b>{user.data.user_type === "FREE_USER" ? "More Activities" : "From the Vault"}</b></div>
                                        
                                    </div> */}

                                    <div className="activityRowSmall m-v-primary row df  row-center space-between" style={{ padding: "0px", marginTop: "30px" }}>
                                        <div className="title heading-text " ><b className="">{user.data.user_type === "FREE_USER" ? <>More&nbsp;Activities</> : <>From&nbsp;the&nbsp;Vault</>}</b></div>
                                        <Select

                                            id="demo-customized-select"
                                            value={Props.dropDown.value}
                                            onChange={(e) => {
                                                Props.setDropdownData(e.target.value)
                                            }}
                                            input={<BootstrapInput />}
                                        >
                                            <MenuItem value={"practice"} >Show newest first</MenuItem>
                                            <MenuItem value={"unattempted_first"}>Show unattempted first</MenuItem>
                                            <MenuItem value={'attempted_first'}>Show attempted first</MenuItem>
                                        </Select>

                                    </div>
                                    <p className="row typo-sub-headings m-v-primary " style={{color:"#000"}}>This section has an archive of all the quizzes that were Live on Pathshala.</p>

                                    <div className="row " style={{ minHeight: "50vh" }}>
                                        {!Props.loading &&
                                            <div className="row ">
                                                {
                                                    Props.dropDown.value === "practice" &&

                                                    <Grid className="row grid-top-padding" container spacing={GridConfig.spacing}>
                                                        {
                                                            Props.newestFirst.data && Props.newestFirst.data && Props.newestFirst.data.map((data, keyIndex) => {
                                                                return (
                                                                    <Grid container key={keyIndex} item xs={GridConfig.tiles_at_xs} sm={GridConfig.tiles_at_sm} md={GridConfig.tiles_at_md}>
                                                                        <ActivityCard data={data} openPopUp={Props.openPopUp} />
                                                                    </Grid>
                                                                )
                                                            })
                                                        }
                                                    </Grid>
                                                }


                                                {
                                                    Props.dropDown.value === "unattempted_first" &&

                                                    <Grid className="row grid-top-padding" container spacing={GridConfig.spacing}>
                                                        {
                                                            Props.unAttemptedFirst.data && Props.unAttemptedFirst.data && Props.unAttemptedFirst.data.map((data, keyIndex) => {
                                                                return (
                                                                    <Grid container key={keyIndex} item xs={GridConfig.tiles_at_xs} sm={GridConfig.tiles_at_sm} md={GridConfig.tiles_at_md}>
                                                                        <ActivityCard data={data} openPopUp={Props.openPopUp} />
                                                                    </Grid>
                                                                )
                                                            })
                                                        }
                                                    </Grid>
                                                }

                                                {
                                                    Props.dropDown.value === "attempted_first" &&

                                                    <Grid className="row grid-top-padding" container spacing={GridConfig.spacing}>
                                                        {
                                                            Props.attemptedFirst.data && Props.attemptedFirst.data && Props.attemptedFirst.data.map((data, keyIndex) => {
                                                                return (
                                                                    <Grid container key={keyIndex} item xs={GridConfig.tiles_at_xs} sm={GridConfig.tiles_at_sm} md={GridConfig.tiles_at_md}>
                                                                        <ActivityCard data={data} openPopUp={Props.openPopUp} />
                                                                    </Grid>
                                                                )
                                                            })
                                                        }
                                                    </Grid>
                                                }


                                            </div>
                                        }
                                        {Props.loading &&
                                            <div className="row ">
                                                <Grid className="row grid-top-padding" container spacing={GridConfig.spacing}>
                                                    <Grid container item xs={GridConfig.tiles_at_xs} sm={GridConfig.tiles_at_sm} md={GridConfig.tiles_at_md}>
                                                        <div style={{ paddingTop: "100%" }} className="activity_card df row-center splash-loader">

                                                        </div>
                                                    </Grid>
                                                    <Grid container item xs={GridConfig.tiles_at_xs} sm={GridConfig.tiles_at_sm} md={GridConfig.tiles_at_md}>
                                                        <div style={{ paddingTop: "100%" }} className="activity_card df row-center splash-loader">

                                                        </div>
                                                    </Grid>
                                                    <Grid container item xs={GridConfig.tiles_at_xs} sm={GridConfig.tiles_at_sm} md={GridConfig.tiles_at_md}>
                                                        <div style={{ paddingTop: "100%" }} className="activity_card df row-center splash-loader">

                                                        </div>
                                                    </Grid>
                                                    <Grid container item xs={GridConfig.tiles_at_xs} sm={GridConfig.tiles_at_sm} md={GridConfig.tiles_at_md}>
                                                        <div style={{ paddingTop: "100%" }} className="activity_card df row-center splash-loader">

                                                        </div>
                                                    </Grid>

                                                </Grid>
                                            </div>}
                                        {Props.scrollLoading &&

                                            <div className="loader-box">
                                                <img src={LaoderSmall} style={{ width: "50px" }} alt="" />
                                            </div>

                                        }
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}
export default ActivityCenterPage