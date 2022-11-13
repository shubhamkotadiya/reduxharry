import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useHistory, useRouteMatch, Switch, Route, useLocation } from "react-router";
import { Link } from 'react-router-dom'
import { setData } from "../../actions/newsAction";
import { BreadCrumbContext, Store } from "../../App";
import apiUrl from "../../common/apiUrl";
import { getHeaders, getUserUuid, resetToken, setAuthToken } from "../../common/helper";
import ActivityCenterController from "./ActivityCenterController";
import ActivityCenterMobileViewController from "./ActivityCenterMobileViewController";
import { LockingSystemContext } from "../../components/lockingsystem/LockingSysytemPopUp";
import ActivityCenterPopUp from "../../pages/privatePages/activityCenter/ActivityCenterPopUp";
import GamesController from "../games/GamesController";
const ActivityCenterMain = () => {
    const breadCrumb = useContext(BreadCrumbContext);
    const history = useHistory();
    const location = useLocation()
    const { path, url } = useRouteMatch()
    const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight })
    const [popUpData, setpopUpData] = useState({ type: "", slug: "", image: "" });
    const mainbreadCrumb = useContext(BreadCrumbContext);
    useEffect(() => {
        if(location.pathname === "/activities/games"){
            
            // breadCrumb.set([<span className="color-blue">Activities</span>,'Games']);
            mainbreadCrumb.set([<span className="color-blue" onClick={()=>{history.push("/activities")}}>Activities</span>,'Games'])
            
        }
        else{
             breadCrumb.set(['Activities'])
        }
    }, [location,breadCrumb])
    
    

    const onResize = () => {
        let height = window.innerHeight;
        let width = window.innerWidth;

        setWindowSize({ width: width, height: height })
    }
    const lockSystem = useContext(LockingSystemContext)

    const openPopUp = (type, slug, image) => {
        setpopUpData({ type: type, slug: slug, image: image });
        if (type != "") {
            history.push(path + "/rules-and-eligibility")
        } else {
            history.push(path);
        }

    }
    useEffect(() => {
        onResize();
        window.addEventListener('resize', onResize)
        return () => { return window.removeEventListener('resize', onResize) }
    }, [])
    return (
        <>
                <p className=" row typo-sub-headings p-h-secondary m-b" style={{ color: "#000", marginTop: "0px" }}>A new activity and a game is made Live everyday!</p>

            <div className="wrapper_container" style={{ overflowY: "hidden", height: "100%" }}>
                <div className="app-profile-container Acad_container" style={{ height: "100%", justifyContent: "flex-start" }}>
                    <div className="profile-inner-container" style={{ height: "100%", justifyContent: "flex-start", display: "block", MarginTop: "30px", padding: "10px 0px 10px 10px!important" }}>
                        <div className="df row column fit-content">
                            <div className="common-grid-outer">


                                <div className="df column centered_outer_container">
                                    <nav
                                        className="nav-bar m-primary p-h-primary"
                                        style={{
                                            padding: "0px",
                                            //   marginLeft: 36,
                                        }}
                                    >
                                        <ul
                                            style={{
                                                fontSize: 16,
                                                fontFamily: "Poppins",
                                                fontWeight: 600,
                                            }}
                                        >


                                            <Link to={url} className={location.pathname.slice(-10) == "activities" || location.pathname.slice(-32) == "activities/rules-and-eligibility" ? "active" : "tab-hoverable"}>
                                                Activties
                                            </Link>
                                            <Link to={url + "/games"} className={location.pathname.search("games") != -1 || location.pathname.slice(-5) == "games" ? "active" : "tab-hoverable"}>
                                                Games
                                            </Link>

                                        </ul>
                                    </nav>
                                </div>
                            </div>
                            <Switch>
                                <Route exact path={path + '/'}>
                                    <ActivityCenterController popUpData={popUpData} openPopUp={openPopUp} lockSystem={lockSystem} />
                                </Route>

                                <Route exact path={path + "/rules-and-eligibility"}>
                                    <ActivityCenterController popUpData={popUpData} openPopUp={openPopUp} lockSystem={lockSystem} />
                                    <ActivityCenterPopUp popUpData={popUpData} closePopUp={() => { openPopUp("", "", "") }} />
                                </Route>

                                <Route exact path={path + '/games'}>
                                    <GamesController />
                                </Route>
                            </Switch>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )



}
export default ActivityCenterMain;