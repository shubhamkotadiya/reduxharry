
import React, { useContext, useEffect, useState } from "react";
import { Link, Switch, Route, useRouteMatch } from "react-router-dom";
import { getMaximumLatestStroyHomePage, getTitle, isFreeTrial, setDateToAppFormat, setText, getNav, todayDate } from "../../../common/helper";
import ActivityCenterPopUp from "../activityCenter/ActivityCenterPopUp";
import PremiumPopUp from "../../../components/premiumPop";
import "../../../assets/css/homefeed.css"
import "../../../assets/css/eventsCalendar.css"
import "../../../assets/css/common-grid.css"
import "../../../index.css"
import { isApp, premiumInt } from "../../../common/helper"
import ReactTooltip from 'react-tooltip';
// import { isApp } from "../../../App";
import curio from '../../../assets/images/curio_79.png';
import calendarIcon from '../../../assets/images/Calendar_icon.svg';
import AccessBadges from "../../../components/lockingsystem/access_badges_component/AccessBadges";
import { Store } from "../../../App";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { GridContext } from "../../../common/GridConfig";
import ActivityCard from "../activityCenter/ActivityCard";
import FreeActivityCard from "../activityCenter/FreeActivityCard";
import '../../../assets/css/enquirenow.css'
import { StuffGridContext } from "../../../common/StuffGridConfig";
import QuizofTheDay from "../../../components/homeStuff/quizofTheDay"
import CustomizedSlider from "../../../components/homeStuff/jokeofTheDay"
import NewsTile from "../news/NewsTile";


// const Item = styled(Paper)(({ theme }) => ({
//     ...theme.typography.body2,
//     padding: theme.spacing(1),
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
// }));

const HomePage = (props) => {
    const { url } = useRouteMatch();
    const [nav, setNav] = useState(getNav());
    const [windowSize, setWindowSize] = useState({ width: window.innerWidth });
    const user = useContext(Store).user.data;
    const GridConfig = useContext(GridContext)
    const StuffGridConfig = useContext(StuffGridContext);
    const onResize = () => {
        setWindowSize({ width: window.innerWidth })
    }
    useEffect(() => {
        onResize();
        window.addEventListener('resize', onResize)
        return () => { return window.removeEventListener('resize', onResize) }
    }, [])


    useEffect(() => {
        setNav(getNav());
    }, [localStorage.getItem("nav")])

    let [isVisible, changeVisibility] = useState(false);
    let [popupContent, setContent] = useState('');

    const setPopUp = (data) => {
        premiumInt("/inquiry");
        //changeVisibility(!isVisible);
        props.lockSystem.openPopUp("ENQ_HOME", "");

        if (isApp()) {
            setContent("This content is for our premium users");
        }
        else {
            setContent("This content is for our premium users. You may contact us on +91 9880678169 or namaskar@summachar.in")
        }
    }
    const stuffList = [{}, {}, {}, {}]

    return (

        <>
            {props.popUpData.type != "" &&
                <Switch>
                    <Route path={props.path + "/rules-and-eligibility"}>
                        <ActivityCenterPopUp popUpData={props.popUpData} closePopUp={() => { props.openPopUp("", "", "") }} />
                    </Route>
                </Switch>


            }
            {/* <Link to="calendar" className="events-calendar-icon">
                <img src={calendarIcon} alt="Calendar" className="calendar-img" />
            </Link> */}
            <div className="news_container home_container" id="news_container" style={{ height: "100%", maxHeight: "100%" }}>

                <div className="common_container_inner common-grid-outer">
                    <div className="newsletter_main_container centered_outer_container">
                        {isVisible && <PremiumPopUp changeVisibility={changeVisibility} description={popupContent}></PremiumPopUp>}
                        {
                            user.user_type === "FREE_USER" &&
                            <div className="centered_outer_container p-h-secondary">
                                <div className="df row column">
                                    <p className="df row typo-sub-headings  m-v-primary" style={{ color: "#000", marginTop: "0px" }}>Get access to daily dose of news, knowledge and fun activities along with school events and student submissions with our Premium News Subscription.{/* To avail these benefits click the enquire now button or contact your school.*/}</p>
                                    {/* { <button className="golden-btn p-relative shimmer" onClick={() => { }}><AccessBadges premium_intrest_string={"/inquiry_from_popup"} calledFrom="ACTIVITY" hide_lock={true} data={{ user_has_access: false }} /> Enquire&nbsp;Now</button>} */}
                                    <Link to={"/pricing"} className="golden-btn p-relative shimmer" onClick={() => { premiumInt("/inquiry_from_popup") }}> Go&nbsp;Premium</Link>
                                    {/* {isApp() && <button className="golden-btn shimmer" onClick={() => premiumInt("/inquiry_from_popup")}><a href="/tel:+919880678169" style={{ color: "#18181B" }}> Enquire&nbsp;Now</a></button>} */}
                                </div>
                            </div>
                        }
                        {
                            user.user_type !== "FREE_USER" && (!user.associated_school || user.associated_school == null) && <div className="centered_outer_container p-h-secondary">
                                <div className="df row column" style={{ alignItems: "flex-start" }}>
                                    {/* <p className="row typo-sub-headings  " style={{ color: "#000", marginTop: "0px" }}>Contribute</p> */}
                                    <p className=" row typo-sub-headings m-v-primary" style={{ color: "#000", marginTop: "0px" }}>
                                        <Link to={{ pathname: "/profile/profile", state: { from: "campussBuzz" } }} className="txt-primary">Click here </Link>and tell us which school you are from to get your school featured on our platform and create buzz!
                                    </p>


                                </div>
                            </div>}
                        {props.user.data.subject_list && props.user.data.subject_list.length >= 2 &&
                            <div className="news_div" >
                                <Link className="title-div p-h-secondary" to={"/academics"} style={{ marginTop: user.user_type === "FREE_USER" ? 0 : 32 + "px !important" }}>
                                    <div className="title heading-text"  ><b>Academics</b></div>
                                </Link>

                                {
                                    props.subjectList.length > 0 &&
                                    <div className="df flex-1 m-h-primary" >
                                        {/* <Grid className="row grid-top-padding small-horizontal-scrollable" container spacing={GridConfig.spacing}> */}
                                        <Grid className="row grid-top-padding " container spacing={GridConfig.spacing}>
                                            {props.subjectList.slice(0, getMaximumLatestStroyHomePage().academics).map(function (sub, keyIndex) {
                                                if (sub.has_content) {
                                                    return (
                                                        <Grid key={sub.uuid} container key={keyIndex} item xs={6} md={GridConfig.tiles_at_md}>
                                                            {/* <Grid key={sub.uuid} container key={keyIndex} item xs={GridConfig.tiles_at_xs} sm={GridConfig.tiles_at_sm} md={GridConfig.tiles_at_md}> */}
                                                            <Link to={keyIndex === getMaximumLatestStroyHomePage().academics - 1 ? "/academics" : "/academics/" + sub.subject_name} className="row p-relative info-tile  ">
                                                                <div className="hover-tile radius-primary fit-content pointer" >
                                                                </div>
                                                                <img className="df row radius-primary" src={sub.cover_image} alt="" />
                                                                {keyIndex === getMaximumLatestStroyHomePage().academics - 1 && <div className="gray-parda df center " style={{ paddingTop: "0px", cursor: "default", backgroundColor: "#E7E6F9" }}><Link to="/academics" className="typo-menu-primary  underline txt-primary" style={{ color: "#777777" }}>View All <br /> Subjects</Link></div>}
                                                            </Link>

                                                        </Grid>
                                                    )
                                                }


                                            })}
                                        </Grid>
                                    </div>
                                }
                            </div>
                        }

                        {/* {
                            Object.entries(props.news).map(function (data, keyIndex) {
                                if (data[0] == 'latest') {
                                    return (
                                        <div className="container" key={data[0]}>
                                            <div className="news_div" >
                                                <Link className={props.user.data.subject_list && props.user.data.subject_list.length >= 2 ? "title-div m-v-primary p-h-secondary" : "title-div  p-h-secondary"} style={{ marginBottom: "0px" }} to={"/news"} >
                                                    <div className="title heading-text"  ><b>Latest News</b></div>
                                                </Link>
                                                <div className="df flex-1 m-h-primary" >
                                                    <Grid className="row grid-top-padding small-horizontal-scrollable" container spacing={GridConfig.spacing}>

                                                        {
                                                            Object.entries(data[1]).slice().map(function (news, index) {
                                                                if (index < getMaximumLatestStroyHomePage().news) {
                                                                    return (
                                                                        <Grid container key={index} item sm={GridConfig.tiles_at_sm} md={GridConfig.tiles_at_md}>

                                                                            <Link to={index == getMaximumLatestStroyHomePage().news - 1 ? "/news" : "/news/" + news[0]} onClick={index == getMaximumLatestStroyHomePage().news - 1 ? () => { } : () => { props.setTargetForPopUp("latest") }} style={{ position: "relative" }} className="row info-tile" >
                                                                                {index !== getMaximumLatestStroyHomePage().news - 1 && <div className="toolTipAreaHoverTile" style={{ height: "0px" }}>
                                                                                    <AccessBadges data={news[1]} calledFrom="NEWS" data-tip={`"Cheers! You read it on "+{news[1].read_timestamp}+"!"`} />
                                                                                    <div className="tooltip hidden ">

                                                                                        {news[1].has_read && <div className="tooltiptext">Cheers! You read it on {news[1].read_timestamp}!</div>}
                                                                                    </div>
                                                                                </div>}
                                                                                <div className="hover-tile radius-primary fit-content pointer" >

                                                                                </div>
                                                                                {index != getMaximumLatestStroyHomePage().news - 1 ? <img className="df radius-primary row" src={news[1].slides[0].media} alt="" /> : <div className="gray-parda df center" style={{ paddingTop: "0px", cursor: "default", backgroundColor: "#E7E6F9", height: "100%", width: "100%" }}><Link to="/news" className="typo-menu-primary underline txt-primary" style={{ color: "#777777" }}>View All<br /> News </Link></div>}
                                                                            </Link>
                                                                        </Grid>

                                                                    )
                                                                }

                                                            })
                                                        }
                                                        {isFreeTrial() && data[0] != 'latest' &&
                                                            <div className="gray-parda">
                                                                <span className="gray">To see more stories</span><a href="/signin" className="">Go To Premium</a>
                                                            </div>}
                                                    </Grid>
                                                </div>

                                            </div>
                                        </div>)
                                }
                            })

                        } */}



                        <div className="container" >
                            <div className="news_div" >
                                <Link className={props.user.data.subject_list && props.user.data.subject_list.length >= 2 ? "title-div m-v-primary p-h-secondary" : "title-div  p-h-secondary"} style={{ marginBottom: "0px" }} to={"/news"} >
                                    <div className="title heading-text"  ><b>{props.user.data.user_type === "FREE_USER" ? 'Top News of the Month' : 'Latest News'}</b></div>
                                </Link>
                                <p className="row typo-sub-headings m-v-primary p-h-secondary" style={{color:"#000"}}>News section is updated 3 times daily with News and Knowledge infographics!</p>

                                <div className="df flex-1 m-h-primary column" >
                                    {/* <Grid className="row grid-top-padding small-horizontal-scrollable" container spacing={GridConfig.spacing}> */}
                                    <Grid className="row grid-top-padding " container spacing={GridConfig.spacing}>
                                        {
                                            props.news && !props.loading && props.news.length > 0 && props.news.map((data, index) => {
                                                return (
                                                    <Grid container key={index} item xs={6} md={GridConfig.tiles_at_md}>
                                                        {/* <Grid container key={index} item xs={6} sm={GridConfig.tiles_at_sm} md={GridConfig.tiles_at_md}> */}
                                                        {/* <Link to={index == getMaximumLatestStroyHomePage().news - 1 ? "/news" : "/news/" + data.slug} onClick={index == getMaximumLatestStroyHomePage().news - 1 ? () => { } : () => { props.setTargetForPopUp("") }} style={{ position: "relative" }} className="row info-tile hover-zoom  " >
                                                            {index !== getMaximumLatestStroyHomePage().news - 1 && <div className="toolTipAreaHoverTile" style={{ height: "0px" }}>
                                                                {props.user.data.user_type !== "FREE_USER" && <AccessBadges data={data} calledFrom="NEWS" data-tip={`"Cheers! You read it on "+{data.read_timestamp}+"!"`} />}
                                                                <div className="tooltip hidden ">

                                                                    {data.has_read && <div className="tooltiptext">Cheers! You read it on {data.read_timestamp}!</div>}
                                                                </div>
                                                            </div>}
                                                            <div className="hover-tile radius-primary fit-content pointer" >

                                                            </div>
                                                            {index != getMaximumLatestStroyHomePage().news - 1 ? <img className="df radius-primary row " src={data.slides[0].media} alt="" /> : <div className="gray-parda df center " style={{ paddingTop: "0px", cursor: "default", backgroundColor: "#E7E6F9", height: "100%", width: "100%" }}><Link to="/news" className="typo-menu-primary underline txt-primary no-hover-zoom" style={{ color: "#777777" }}>View All<br /> News </Link></div>}
                                                        </Link> */}

                                                        {index != getMaximumLatestStroyHomePage().news - 1 ?
                                                            <NewsTile hide_badge={true} data={data} slug={data.slug} setTargetForPopUp={() => { props.setTargetForPopUp("latest") }} loading={props.loading} />
                                                            :

                                                            <div className="p-relative row radius-primary">
                                                                <NewsTile hide_badge={true} data={data} slug={data.slug} setTargetForPopUp={() => { props.setTargetForPopUp("latest") }} />
                                                                <Link to="/news" className="gray-parda df center typo-menu-primary underline txt-primary no-hover-zoom" style={{ color: "#777777", backgroundColor: "rgba(231, 230, 249,.95)" }}>View All<br /> News </Link>
                                                            </div>
                                                        }
                                                    </Grid>
                                                )
                                            })
                                        }
                                        {
                                            props.loading && [1, 2, 3, 4].map((data, index) => {
                                                return <Grid container key={index} item xs={6} md={GridConfig.tiles_at_md} ><div className="row splash-loader " style={{ paddingTop: "125%", }}></div></Grid>
                                            })
                                        }
                                    </Grid>
                                    {user.user_type === "FREE_USER" && <p className="typo-description df m-v-primary row" style={{ marginBottom: "0px" }}>More such daily news stories available for Premium News Subscribers!</p>}
                                </div>
                            </div>
                        </div>


                        {
                            user.user_type === "FREE_USER" && props.freeQuiz.data.length > 0 &&
                            <>
                                <div className="container " >
                                    <div className="news_div" >
                                        <Link className={"title-div m-v-primary p-h-secondary"} style={{ marginBottom: "0px" }} to={"/activities"} >
                                            <div className="title heading-text"  ><b>Top Quizzes of the Month</b></div>
                                        </Link>
                                        <div className="df flex-1 m-h-primary column" >
                                            {/* <Grid className="row grid-top-padding small-horizontal-scrollable" container spacing={GridConfig.spacing}> */}
                                            <Grid className="row grid-top-padding " container spacing={GridConfig.spacing}>
                                                {props.freeQuiz.data.slice(0, 2).map(function (comp, index) {
                                                    return (
                                                        <Grid container key={index} item sm={12} md={6} >
                                                            <FreeActivityCard openPopUp={props.openPopUp} data={comp} />
                                                        </Grid>
                                                    )
                                                })}
                                            </Grid>
                                            <p className="typo-description df m-v-primary row">More such daily quizzes, crosswords and other fun games  available for Premium News Subscribers!</p>
                                        </div>

                                    </div>
                                </div>
                            </>
                        }



                        {props.user.data.user_type !== "FREE_USER" && props.stuffData && props.stuffData.length > 0 && props.stuffData[0].live_date == todayDate() &&
                            <div className="news_div" >
                                <Link className="title-div p-h-secondary m-v-primary" to={"/activities"} >
                                    <div className="title heading-text"  ><b>Fun and Games</b></div>
                                </Link>
                                <p className="row typo-sub-headings m-v-primary p-h-secondary" style={{color:"#000"}}>This section is updated everyday with a thought, fact, joke and question of the day.</p>

                                {
                                    <div className="df flex-1 m-h-primary" >
                                        {/* <Grid className="row grid-top-padding small-horizontal-scrollable" container spacing={GridConfig.spacing}> */}
                                        <Grid className="row grid-top-padding" container spacing={StuffGridConfig.spacing}>
                                            {props.stuffData.map(function (stuff, keyIndex) {
                                                return (

                                                    <Grid key={"stuff" + keyIndex} container key={"stuffs" + keyIndex} item xs={StuffGridConfig.tiles_at_xs} sm={StuffGridConfig.tiles_at_sm} md={StuffGridConfig.tiles_at_md} direction="row"
                                                        justifyContent="center"
                                                        alignItems="stretch" style={{ aspectRatio: 4 / 3 }}>
                                                        {keyIndex < 3 &&
                                                            <div className="row p-relative relative info-tile" style={{ position: "relative" }}  >
                                                                <img src={stuff.image} className="df row radius-primary " alt="" />
                                                                {stuff.stuffofday_type == "Joke" &&
                                                                    <div className="blue-bottom df col radius-primary">

                                                                        <span class="jokeQue">How funny was the Joke?</span>
                                                                        <CustomizedSlider data={stuff} submitRange={props.submitRange} />
                                                                    </div>}
                                                            </div>
                                                        }
                                                        {
                                                            keyIndex >= 3 &&
                                                            <QuizofTheDay data={stuff} submitQue={props.submitQue} />
                                                        }
                                                    </Grid>
                                                )
                                            }

                                            )}
                                        </Grid>
                                    </div>
                                }
                                <div className="click-color-change">
                                    <Link className=" p-h-secondary m-v-secondary stuff-checkout" to={"/activities"} >
                                        <div className="typo-menu-primary "  ><b>  Check Out More Fun Activities {'>>'}</b></div>
                                    </Link>
                                </div>
                            </div>
                        }
                        {user.user_type === "NEWS_USER" && props.popularQuiz.data.length > 0 &&
                            <div className="container " >
                                <div className="news_div" >
                                    <Link className={"title-div m-v-primary p-h-secondary"} style={{ marginBottom: "0px" }} to={"/activities"} >
                                        <div className="title heading-text"  ><b>Popular Activities</b></div>
                                    </Link>
                                    <p className="row typo-sub-headings m-v-primary p-h-secondary" style={{color:"#000"}}>Checkout the activities section for a new activity daily!</p>

                                    <div className="df flex-1 m-h-primary" >
                                        <Grid className="row grid-top-padding" container spacing={GridConfig.spacing}>
                                            {/* <Grid className="row grid-top-padding small-horizontal-scrollable" container spacing={GridConfig.spacing}> */}
                                            {props.popularQuiz.data.slice(0, getMaximumLatestStroyHomePage().quiz).map(function (comp, index) {

                                                return (
                                                    <Grid container key={index} item xs={6} md={GridConfig.tiles_at_md}>
                                                        {/* <Grid container key={index} item sm={GridConfig.tiles_at_sm} md={GridConfig.tiles_at_md}> */}
                                                        <div className="row p-relative radius-primary info-tile   ">

                                                            <div className="toolTipAreaHoverTile" style={{ height: "0px" }}>
                                                                {index != getMaximumLatestStroyHomePage().quiz - 1 ? <AccessBadges
                                                                    is_free_badge_not_allowed={user.subject_list && user.subject_list.length > 0}
                                                                    premium_intrest_string={"Knowledge/Activities/Most Participated/" + comp.slug}
                                                                    calledFrom={"QUIZ"}
                                                                    data={comp}
                                                                /> : null}
                                                                <div className="tooltip hidden ">

                                                                    {comp.has_read && <div className="tooltiptext">Cheers! You read it on {comp.read_timestamp}!</div>}
                                                                </div>
                                                            </div>

                                                            {index == getMaximumLatestStroyHomePage().quiz - 1 ? <>
                                                                <Link to="/activities" className="gray-parda df center" style={{ overflow: "hidden", backgroundColor: "rgba(231, 230, 249,0.9)", height: "100%", width: "100%" }}>  <div className="typo-menu-primary underline txt-primary" style={{ color: "#777777" }}>View All<br /> Activities </div></Link>
                                                            </> : null}
                                                            <div className="row">
                                                                <div style={{ width: "100%", height: "100%", zIndex: 0 }} className="hover-tile radius-primary pointer" onClick={() => { comp.activity_type == "subjective" ? props.openPopUp("subjective", comp.slug, comp.promo_image) : props.openPopUp("objective", comp.slug, comp.promo_image) }} ></div>
                                                                <img src={comp.promo_image} className="df row radius-primary" alt="" />
                                                            </div>

                                                        </div>
                                                    </Grid>
                                                )
                                            })}
                                        </Grid>
                                    </div>
                                    <ReactTooltip />

                                </div>
                            </div>
                        }





                        <div className="loader-box" >
                            <img src="" style={{ width: 200 + 'px', height: 'auto' }} alt="" />
                        </div>


                    </div >
                </div >


            </div>
        </>
    )
}
export default HomePage;
