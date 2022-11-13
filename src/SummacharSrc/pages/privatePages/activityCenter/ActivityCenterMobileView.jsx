import LiveQuizComponent from "./LiveQuizComponent"
import '../../../assets/css/activity.css'
import ActivityCenterPopUp from "./ActivityCenterPopUp"
import LiveImage from '../../../assets/images/common/live.gif'
import ActivityCard from "./ActivityCard"
import { useEffect, useState, useContext } from "react"
import Loader from "../../../components/Loader"
import Nodata from '../../../components/NoData'
import { Route, Switch, useRouteMatch } from "react-router"
import PremiumPopUp from "../../../components/premiumPop"
import { isApp, premiumInt } from "../../../common/helper"
import { Store } from '../../../App'
import AccessBadges from "../../../components/lockingsystem/access_badges_component/AccessBadges"
import LiveQuizSlider from "./LiveQuizSlider"
import { Grid } from "@mui/material"
import FreeActivityCard from "./FreeActivityCard"
import '../../../assets/css/enquirenow.css'
import { Link } from "react-router-dom"
const ActivityCenterMobileView = (Props) => {
    let { path, url } = useRouteMatch();
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

    return (
        <>
            <div className="news_container" id="news_container" style={{ paddingTop: (Props.liveQuiz && !Props.liveQuiz.loading && Props.liveQuiz.data.length <= 0) ? "0px" : "" }}>
                <div className="outer-main-container" style={{ paddingTop: ((Props.liveQuiz && !Props.liveQuiz.loading && Props.liveQuiz.data.length <= 0) || user.data.user_type === "FREE_USER") ? "0px" : "" }}>
                    <div className="common-grid-outer row">
                        <div className="inner-container centered_outer_container">
                            {isVisible && <PremiumPopUp changeVisibility={changeVisibility} description={popupContent}></PremiumPopUp>}
                            {
                                user.data.user_type === "FREE_USER" &&
                                <div className="centered_outer_container">
                                    <div className="df row column p-h-secondary">
                                        <p className="df row typo-sub-headings  m-v-primary" style={{ color: "#000", marginTop: "0px" }}>To access all activities, get our Premium News Subscription. </p>
                                        {/* { <button className="golden-btn p-relative shimmer" style={{ left: "0px" }} ><AccessBadges premium_intrest_string={"/inquiry_from_popup"} calledFrom="ACTIVITY" hide_lock={true} data={{ user_has_access: false }} /> Enquire&nbsp;Now</button>} */}
                                        <Link to={"/pricing"} className="golden-btn p-relative shimmer" onClick={() => { premiumInt("/inquiry_from_popup") }}> Go&nbsp;Premium</Link>
                                        {/* {isApp() && <button className="golden-btn shimmer" onClick={() => premiumInt("/inquiry_from_popup")}><a href="/tel:+919880678169" style={{ color: "#18181B" }}> Enquire&nbsp;Now</a></button>} */}
                                    </div>
                                </div>
                            }


                            <div className="container" >
                                <div className="news_div p-h-secondary" style={{ minHeight: windowSize.height + 'px' }} >
                                    {Props.freeQuiz && !Props.freeQuiz.loading && Props.freeQuiz.data.length > 0 &&
                                        <>
                                            <div className="row df row-center m-v-primary" style={{marginTop:"0px"}}>
                                                <h2 className="txt-large">Top Quizzes of the Month</h2>
                                            </div>
                                            <Grid className="row " container spacing={2}>
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
                                            <p className="typo-description  df m-v-primary row">More such daily quizzes, crosswords and other fun games  available for Premium News Subscribers!</p>
                                        </>}
                                    {windowSize.width <= 720 && Props.liveQuiz && !Props.liveQuiz.loading && Props.liveQuiz.data.length > 0 &&
                                        <div className="row df row-center m-v-primary" style={{marginBottom:"0px" }}>
                                            <h2 className="txt-large " >Live Quiz</h2>
                                        </div>}
                                    {/* {
                                        Props.liveQuiz && !Props.liveQuiz.loading && Props.liveQuiz.data.length > 0 && Props.liveQuiz.data.map((data, index) => {
                                            return (
                                                <LiveQuizComponent openRestrictionPopUp={(data, quizData) => { setRestrictionPopup(data, quizData, "Live") }} openPopUp={Props.openPopUp} key={data.uuid + "-" + index} data={data} />
                                            )
                                        })
                                    } */}

                                    {Props.liveQuiz && !Props.liveQuiz.loading && Props.liveQuiz.data.length > 0 && <div className="row live-quiz-slider-area m-v-primary"><LiveQuizSlider openRestrictionPopUp={(data, quizData) => { setRestrictionPopup(data, quizData, "Live") }} openPopUp={Props.openPopUp} data={Props.liveQuiz.data} /></div>}

                                    <div className=" row df" style={{ justifyContent: "flex-end" }}>
                                        {/* <h1 className="txt-secondary txt-large row df" style={{ marginLeft: "1.6%" }}> {Props.dropDown.value} </h1> */}
                                        <div className="activity_dropDown space-between df  p-relative" >
                                            <span className="txt-medium" onClick={() => { Props.setDropdownData("", !Props.dropDown.visiblity) }}>{Props.dropDown.value}</span>
                                            <span onClick={() => { Props.setDropdownData("", !Props.dropDown.visiblity) }} style={{ marginTop: "-3px" }}><svg _ngcontent-hjn-c43="" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path _ngcontent-hjn-c43="" d="M16.59 8.58984L12 13.1698L7.41 8.58984L6 9.99984L12 15.9998L18 9.99984L16.59 8.58984Z" fill="#131319"></path></svg></span>
                                            {
                                                Props.dropDown.visiblity &&
                                                <ul className="df " style={{ flexDirection: "column" }}>
                                                    <div onClick={() => { Props.setDropdownData("", !Props.dropDown.visiblity) }} style={{ width: "100%", height: "100vh", position: "fixed", top: "0px", left: "0px", background: "transparent", zIndex: -1 }}></div>
                                                    <li className={Props.dropDown.value === "Popular" ? "df row active" : "df row"} onClick={() => { Props.setDropdownData("Popular") }}>Popular</li>
                                                    <li className={Props.dropDown.value === "Attempted" ? "df row  active" : "df row"} onClick={() => { Props.setDropdownData("Attempted") }}>Attempted </li>
                                                    <li className={Props.dropDown.value === "Upcoming" ? "df row  active" : "df row"} onClick={() => { Props.setDropdownData("Upcoming") }}>Upcoming</li>
                                                    <li className={Props.dropDown.value === "Practice" ? "df row  active" : "df row"} onClick={() => { Props.setDropdownData("Practice") }}>Practice</li>
                                                </ul>}
                                        </div>
                                    </div>
                                    <div className="p-v-primary row df" style={{ flexDirection: "column" }}>
                                        <div className="df row" style={{ flexWrap: "wrap", minHeight: "200px" }}>


                                            {
                                                Props.data[Props.dropDown.value] && !Props.loading && Props.data[Props.dropDown.value].length > 0 && Props.data[Props.dropDown.value].map((data, index) => {

                                                    return (

                                                        <div key={data.uuid + "-" + index} className="quiz_grid df" >
                                                            <ActivityCard category={Props.dropDown.value == "Popular" ? "Most Participated" : Props.dropDown.value} openRestrictionPopUp={(data, quizData) => { setRestrictionPopup(data, quizData, "Most Participated") }} openPopUp={Props.openPopUp} data={data} />
                                                        </div>

                                                    )
                                                })
                                            }
                                            {
                                                Props.loading && <Loader />
                                            }
                                            {
                                                !Props.loading && Props.data[Props.dropDown.value] && Props.data[Props.dropDown.value].length <= 0 && <Nodata />
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>






                            {Props.popUpData.type != "" &&
                                <Switch>
                                    <Route path={path + "/rules-and-eligibility"}>
                                        <ActivityCenterPopUp popUpData={Props.popUpData} closePopUp={() => { Props.openPopUp("", "", "") }} />
                                    </Route>

                                </Switch>

                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ActivityCenterMobileView