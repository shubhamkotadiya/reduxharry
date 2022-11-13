import React, { useContext, useEffect, useState, useRef  } from "react";
import { Route, Switch, useRouteMatch } from "react-router";
import { Link } from "react-router-dom";
import Boy from '../../../assets/images/avtar/boy.svg'
import { isApp, premiumInt } from "../../../common/helper";
import PremiumPopUp from "../../../components/premiumPop";
import ActivityCard from "../activityCenter/ActivityCardQuizList";
import ActivityCenterPopUp from "../activityCenter/ActivityCenterPopUp";
import "../../../assets/css/acadQuizList.css";
import { Store } from "../../../App";
import { useHistory, useParams } from "react-router";
import AcadInfoPopUpController from "./../../../controllers/AcadInfoPopUpController";
import LaoderSmall from "../../../assets/images/common/loader_small.gif"
import NoData from "../../../components/NoData";


const AcadTestPage = (props) => {

    const ref = useRef(null)


    const { path, url } = useRouteMatch();
    let [isVisible, changeVisibility] = useState(false);
    let [popupContent, setContent] = useState('');
    const params = useParams();
    const subject = params.subject;

    const user = useContext(Store).user.data;

    const setInfoPopUpData = (str) => {
        changeVisibility(true);
        props.setInfoPopUpData(str)
    }
    const setPopUp = (data) => {
        premiumInt("stories")
        changeVisibility(!isVisible);
        setContent(data);
    }
    return (
        <>
            {props.popUpData.type != "" &&
                <Switch>
                    <Route path={path + "/rules-and-eligibility"}>
                        <ActivityCenterPopUp hide_live={true} popUpData={props.popUpData} closePopUp={() => { props.openPopUp("", "", "") }} />
                    </Route>
                </Switch>
            }
            {isVisible && <PremiumPopUp changeVisibility={changeVisibility} description={props.InfopopUpData}></PremiumPopUp>}

            <div className="news_container enter_animation relative" id="acadTest_container" style={{ height: "100%",paddingTop:"20px" }} ref={ref} onScroll={() => props.onScroll(ref)}>
                {props.visibility &&
                    <Switch>
                        <Route path={url + "/details"}>
                            <AcadInfoPopUpController setInfo={props.setInfo} allInfoData={props.infoList} data={props.InfopopUpData} changeVisibility={props.setVisibility} />
                        </Route>
                    </Switch>

                }
                <div className="outer-main-container">
                <div className='common-grid-outer'>
                <div className="centered_outer_container">
                    <div className="quiz-list-inner  df" style={{ paddingBottom: "10px" }}>

                        <div className="quiz-list-grid df row" style={{ flexWrap: "wrap", position: "relative" }}>
                            {props.data && props.data.length > 0 && props.data.map((test, index) => {
                                return (
                                    <div key={test.uuid} className="quiz-grid-item df">

                                        <ActivityCard hide_attempt_quiz={true} hideDate={true} openPopUp={props.openPopUp} data={test} />

                                    </div>
                                )
                            }

                            )}

                            {props.data.length == 0 &&  <NoData />}
                        </div>
                    </div>
                </div>
                </div>
                </div>
                {props.scrollLoading && <div className="loader-box" >
                    <img src={LaoderSmall} style={{ width: "50px" }} alt="" />
                </div>}

            </div>


        </>
    )
}
export default AcadTestPage;
