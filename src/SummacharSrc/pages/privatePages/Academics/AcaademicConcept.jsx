import React, { useContext, useRef, useState } from "react";
import { Route, Switch, useHistory, useParams } from "react-router";
import { isApp, premiumInt } from "../../../common/helper";
import PremiumPopUp from "../../../components/premiumPop";
import AcadInfoController from "../../../controllers/AcadSubChapteController";
import AcadInfoPopUpController from "../../../controllers/AcadInfoPopUpController";
import InfoTile from "./AcademicConceptComponent/InfoTile";
import VideoTile from "./AcademicConceptComponent/VideoTile";
import AcademicsVideoPopUp from "./AcademicsVideoPopUp";
import { Grid } from "@mui/material";
import { GridContext } from "../../../common/GridConfig";

const AcademicConcept = (props) => {
    let [isVisible, changeVisibility] = useState(false);
    let [popupContent, setContent] = useState("");
    const params = useParams()
    const chapter_number = params.chapter_number
    const history = useHistory();
    const ref = useRef(null)
    const GridConfig = useContext(GridContext)
    const setInfoPopUp = (data) => {
        premiumInt("academics");
        changeVisibility(!isVisible);
        setContent(data);

    };
    return (

        <>
            {isVisible && <PremiumPopUp changeVisibility={changeVisibility} description={popupContent}></PremiumPopUp>}
            <Switch>
                <Route exact path={props.path + "/story/:slug/"}>
                    <AcadInfoPopUpController data={props.storyPopUpData} />
                </Route>
                <Route exact path={props.path + "/videos/:slug/"}>
                    {isApp() ? (
                        <></>
                    ) : (
                        <AcademicsVideoPopUp
                            data={{}}
                            closePopUp={() => {
                                history.goBack();
                            }}
                        />
                    )}
                </Route>
                <Route exact path={props.path}>
                    <div className="news_container enter_animation" ref={ref} onScroll={() => { props.onScroll(ref) }} style={{ height: "100%", paddingTop: "0px" }}>
                        <div className="outer-main-container " style={{ width: 'auto' }}>
                            <div className="common_container_inner  common-grid-outer">
                                <div className="centered_outer_container " style={{ paddingTop: "10px" }}>
                                    <div className="row df" style={{ paddingBottom: "30px", alignSelf: "start" }}>
                                        <div className="df  row" style={{ flexWrap: "wrap", position: "relative" }}>
                                            {props.data &&
                                                props.data.length > 0 &&
                                                props.data.map((subchapter, outerIndex) => {

                                                    const subchapterName = chapter_number + "." + Object.keys(subchapter)[0];
                                                    const subchapterData = Object.values(subchapter)[0];
                                                    return (
                                                        <div className="df row column " key={outerIndex}>
                                                            <div className="news_div ">

                                                                <div className="title-div m-v-primary p-h-secondary" style={outerIndex == 0 ? { marginBottom: "0px", marginTop: '0px' } : { marginBottom: "0px" }} to={"/news"} >
                                                                    <div className="title "  ><b className="typo-sub-headings">{subchapterName}</b></div>
                                                                </div>

                                                                <div className="df m-h-primary flex-1 p-relative" >
                                                                    <Grid className="row grid-top-padding radius-primary " container spacing={GridConfig.spacing}>
                                                                        {subchapterData &&
                                                                            subchapterData.length > 0 &&
                                                                            subchapterData.map((listOfInfoCategory, index) => {
                                                                                return (
                                                                                    <React.Fragment key={index}>
                                                                                        {listOfInfoCategory.results &&
                                                                                            listOfInfoCategory.results.length > 0 &&
                                                                                            listOfInfoCategory.results.map((data, index) => {
                                                                                                if (listOfInfoCategory.type === "video") {
                                                                                                    return <VideoTile setPopUp={setInfoPopUp} openPopUp={props.openVideoPopUp} path={props.path} url={props.url} data={data} key={index} />;
                                                                                                } else if (listOfInfoCategory.type === "story") {
                                                                                                    return <InfoTile setPopUp={setInfoPopUp} openPopUp={props.openPopUp} path={props.path} url={props.url} data={data} key={index} />;
                                                                                                }
                                                                                            })}
                                                                                    </React.Fragment>
                                                                                );
                                                                            })}
                                                                    </Grid>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Route>
            </Switch>
        </>
    );
};
export default AcademicConcept;
