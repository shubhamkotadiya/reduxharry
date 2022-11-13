import React, { useContext, useEffect, useState } from "react";
import { Link, Switch, Route } from "react-router-dom";
import { getMaximumLatestStroyHomePage, getMaximumLatestActivityKnowledgePage, getTitle, isFreeTrial, setDateToAppFormat, setText } from "../../../common/helper";
import ActivityCenterPopUp from "../activityCenter/ActivityCenterPopUp";
import "../../../assets/css/homefeed.css"
import { Store } from "../../../App";
import AccessBadges from "../../../components/lockingsystem/access_badges_component/AccessBadges";
import { Grid } from "@mui/material";
import { GridContext } from "../../../common/GridConfig";

const KnowledgePage = (props) => {
    const [windowSize, setWindowSize] = useState({ width: window.innerWidth })
    const GridConfig = useContext(GridContext)
    const onResize = () => {
        setWindowSize({ width: window.innerWidth })
    }
    const user = useContext(Store).user.data
    useEffect(() => {
        onResize()
        window.addEventListener('resize', onResize)
        return () => {
            return window.removeEventListener('resize', onResize)
        }
    }, [])

    return (
        <>
            {props.popUpData.type != "" &&
                <Switch>
                    <Route path={props.path + "/rules-and-eligibility"}>
                        <ActivityCenterPopUp popUpData={props.popUpData} closePopUp={() => { props.openPopUp("", "", "", "") }} />
                    </Route>
                </Switch>


            }
            <div className="news_container home_container" style={{ height: "100%", maxHeight: "100%" }}>


                <div className="common_container_inner common-grid-outer">
                    <div className="newsletter_main_container centered_outer_container">





                        {/* {
                            Object.entries(props.news).map(function (data, keyIndex) {
                                if (data[0] == 'latest') {
                                    return (
                                        <div className="container" key={data[0]}>
                                            <div className="news_div" >
                                                <Link className="title-div  p-h-secondary" style={{ marginBottom: "0px" }} to={"/news"} >
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
                                <Link className={ "title-div  p-h-secondary"} style={{ marginBottom: "0px" }} to={"/news"} >
                                    <div className="title heading-text"  ><b>Latest News</b></div>
                                </Link>
                                <p className="row typo-sub-headings m-v-primary p-h-secondary" style={{color:"#000"}}>News section is updated 3 times daily with News and Knowledge infographics!</p>
                                <div className="df flex-1 m-h-primary" >
                                    <Grid className="row grid-top-padding " container spacing={GridConfig.spacing}>
                                    {/* <Grid className="row grid-top-padding small-horizontal-scrollable" container spacing={GridConfig.spacing}></Grid> */}
                                        {
                                            props.news && props.news.length > 0 && props.news.map((data, index) => {
                                                return (
                                                    
                                                    
                                                    <Grid container key={index} item xs={6} sm={6} md={GridConfig.tiles_at_md}>
                                                    {/* <Grid container key={index} item sm={GridConfig.tiles_at_sm} md={GridConfig.tiles_at_md}> */}
                                                        <Link to={index == getMaximumLatestStroyHomePage().news - 1 ? "/news" : "/news/" + data.slug} onClick={index == getMaximumLatestStroyHomePage().news - 1 ? () => { } : () => { props.setTargetForPopUp("") }} style={{ position: "relative" }} className="row info-tile  hover-zoom" >
                                                            {index !== getMaximumLatestStroyHomePage().news - 1 && <div className="toolTipAreaHoverTile" style={{ height: "0px" }}>
                                                                <AccessBadges data={data} calledFrom="NEWS" data-tip={`"Cheers! You read it on "+{data.read_timestamp}+"!"`} />
                                                                <div className="tooltip hidden ">

                                                                    {data.has_read && <div className="tooltiptext">Cheers! You read it on {data.read_timestamp}!</div>}
                                                                </div>
                                                            </div>}
                                                            <div className="hover-tile radius-primary fit-content pointer" >

                                                            </div>
                                                            {index != getMaximumLatestStroyHomePage().news - 1 ? <img className="df radius-primary row " src={data.slides[0].media} alt="" /> : <div className="gray-parda df center  hover-zoom " style={{ paddingTop: "0px", cursor: "default", backgroundColor: "#E7E6F9", height: "100%", width: "100%" }}><Link to="/news" className="typo-menu-primary underline txt-primary" style={{ color: "#777777" }}>View All<br /> News </Link></div>}
                                                        </Link>
                                                    </Grid>
                                                )
                                            })
                                        }
                                    </Grid>
                                </div>
                            </div>
                        </div>
                        {props.popularQuiz.data.length > 0 && <div className="container" >
                            <div className="news_div" >
                                <Link className="title-div m-v-primary p-h-secondary " style={{ marginBottom: "0px" }} to={"/activities"} >
                                    <div className="title heading-text"  ><b>Popular Activities</b></div>
                                </Link>
                                <p className="row typo-sub-headings m-v-primary p-h-secondary" style={{color:"#000"}}>Checkout the activities section for a new activity daily!</p>

                                <div className="df flex-1 m-h-primary" >
                                <Grid className="row grid-top-padding " container spacing={GridConfig.spacing}>
                                    {/* <Grid className="row grid-top-padding small-horizontal-scrollable" container spacing={GridConfig.spacing}> */}
                                        {props.popularQuiz.data.slice(0, getMaximumLatestActivityKnowledgePage().activity).map(function (comp, index) {
                                            return (
                                                <Grid container key={index} item xs={6}  sm={6} md={GridConfig.tiles_at_md}>
                                                    <div className="df row p-relative radius-primary info-tile">
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
                                                            <Link to="/activities" className="gray-parda df center hover-zoom" style={{ overflow: "hidden", backgroundColor: "#E7E6F9", height: "100%", width: "100%" }}> <div className="hover-tile fit-content radius-primary"></div> <div className="typo-menu-primary underline txt-primary" style={{ color: "#777777" }}>View All<br /> Activities </div></Link>
                                                        </> :
                                                            <div className="df row">
                                                                <div style={{ width: "100%", height: "100%", zIndex: 0 }} className="hover-tile radius-primary pointer" onClick={() => { comp.activity_type == "subjective" ? props.openPopUp("subjective", comp.slug, comp.promo_image, comp.user_has_access) : props.openPopUp("objective", comp.slug, comp.promo_image, comp.user_has_access) }} ></div>
                                                                <img src={comp.promo_image} className="df row radius-primary hover-zoom" alt="" />
                                                            </div>
                                                        }
                                                    </div>
                                                </Grid>
                                            );

                                        }
                                        )
                                        }
                                    </Grid>
                                </div>
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
export default KnowledgePage;