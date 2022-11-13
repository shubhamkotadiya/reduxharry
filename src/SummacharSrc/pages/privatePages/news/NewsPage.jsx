import { getTitle, isFreeTrial, isApp, premiumInt } from "../../../common/helper";

import "../../../assets/css/NewsPage.css";
import "../../../assets/css/commonImgDivs.css";
import "../../../assets/css/common-grid.css";
import "../../../../src/index.css";
import LaoderSmall from "../../../assets/images/common/loader_small.gif";
import { Redirect, Route, Switch, useRouteMatch } from "react-router";
import NewsPopUpController from "../../../controllers/NewsPopUpController";
import { BrowserRouter, Link } from "react-router-dom";
import { useContext, useState } from "react";
import PremiumPopUp from "../../../components/premiumPop";
import { Store } from "../../../App";
import { Grid } from "@mui/material";
import { GridContext } from "../../../common/GridConfig";
import AccessBadges from "../../../components/lockingsystem/access_badges_component/AccessBadges";
import '../../../assets/css/enquirenow.css'
import NewsTile from "./NewsTile";
const NewsPage = (props) => {
    let { path, url } = useRouteMatch();
    const user = useContext(Store).user.data;
    let [isVisible, changeVisibility] = useState(false);
    let [popupContent, setContent] = useState("");
    const GridConfig = useContext(GridContext)
    // const setPopUp = (data) => {
    //     premiumInt("Knowledge/News");
    //     changeVisibility(!isVisible);
    //     setContent(data);
    // };
    const setPopUp = (data) => {
        premiumInt("/inquiry");
        props.lockSystem.openPopUp("ENQ_NEWS", "");

        if (isApp()) {
            setContent("This content is for our premium users");
        }
        else {
            setContent("This content is for our premium users. You may contact us on +91 9880678169 or namaskar@summachar.in")
        }
    }

    return (
        <>
            <p className=" row typo-sub-headings p-h-secondary m-b" style={{ color: "#000", marginTop: "0px" }}>News section is updated daily with News and Knowledge infographics!</p>

            <div className="news_container" id="news_container" style={{ paddingTop: "0px" }} onScroll={user.has_news_access ? () => props.onScroll() : () => { props.onScroll() }}>
                <div className="outer-main-container">
                    <div className="common-grid-outer">
                        <div className="inner-container centered_outer_container">
                            {isVisible && <PremiumPopUp changeVisibility={changeVisibility} description={popupContent}></PremiumPopUp>}
                            {
                                user.user_type === "FREE_USER" &&
                                <div className="centered_outer_container p-h-secondary">
                                    <div className="df row column">
                                        {/* <p className="df row typo-sub-headings  m-v-primary" style={{ color: "#000", marginTop: "0px" }}>To access all news stories, get our Premium News Subscription. Contact us to know more</p> */}
                                        {/* {<button className="golden-btn p-relative shimmer" onClick={() => { }}><AccessBadges premium_intrest_string={"/inquiry_from_popup"} calledFrom="ACTIVITY" hide_lock={true} data={{ user_has_access: false }} /> Enquire&nbsp;Now</button>} */}
                                        <Link to={"/pricing"} className="golden-btn p-relative shimmer" onClick={() => { premiumInt("/inquiry_from_popup") }}> Go&nbsp;Premium</Link>
                                        {/* {isApp() && <button className="golden-btn shimmer" onClick={() => premiumInt("/inquiry_from_popup")}><a href="/tel:+919880678169" style={{ color: "#18181B" }}> Enquire&nbsp;Now</a></button>} */}
                                    </div>
                                </div>
                            }
                            {Object.entries(props.data).map(function (data, keyIndex) {
                                return (
                                    <div className="container" key={data[0]}>
                                        <div className="news_div">
                                            <div className="title-div m-v-primary p-h-secondary" style={keyIndex == 0 ? { marginBottom: "0px", marginTop: '0px' } : { marginBottom: "0px" }} to={"/news"} >
                                                <div className="title heading-text"  ><b>{getTitle(data[0])}</b></div>
                                            </div>
                                            <div className="df flex-1 grid-top-padding m-h-primary p-relative" >
                                                <Grid className="row  radius-primary " container spacing={GridConfig.spacing}>
                                                    {Object.entries(data[1]).map(function (news, uuid) {
                                                        return (
                                                            <Grid container key={uuid} item xs={GridConfig.tiles_at_xs} sm={GridConfig.tiles_at_sm} md={GridConfig.tiles_at_md}>
                                                                <NewsTile category={data[0]} slug={news[0]} data={news[1]} setTargetForPopUp={props.setTargetForPopUp} />
                                                            </Grid>
                                                        );
                                                    })}

                                                </Grid>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                            {/* {user.user_type === "FREE_USER" &&
                                <div className="centered_outer_container p-h-secondary">
                                    <p className="typo-description df m-v-primary row" >More such daily news stories available for Premium News Subscribers</p>
                                </div>} */}

                            {props.scrollLoading && (
                                <div className="loader-box">
                                    <img src={LaoderSmall} style={{ width: "50px" }} alt="" />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default NewsPage;
