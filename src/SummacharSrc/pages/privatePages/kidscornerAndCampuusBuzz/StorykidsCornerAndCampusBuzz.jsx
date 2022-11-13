import { Grid } from "@mui/material";
import { useContext, useRef } from "react";

import { GridContext } from "../../../common/GridConfig";


import CampussBuzzTile from "./CampussBuzzTile";

import LaoderSmall from "../../../assets/images/common/loader_small.gif";
import UploadPopUpController from "../../../controllers/kidscornerAndCampussBuzz/UploadPopUpController";
import { isApp, openLink, setDateToAppFormat } from "../../../common/helper";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { Store } from "../../../App";
import MySubmissionTable from "./MySubmissionTable.";
import {
    
    useLocation,
    
} from "react-router";
const StorykidsCornerAndCampusBuzz = (props) => {
    const GridConfig = useContext(GridContext)
    const user = useContext(Store).user.data
    const ref = useRef(null)
    const history = useHistory()
    const { path, url } = useRouteMatch()
    const location = useLocation();
    return (
        <>
            { location.pathname==="/campus-buzz" &&<p className=" row typo-sub-headings p-h-secondary m-b" style={{ color: "#000", marginTop: "0px" }}>Checkout what differnt schools have been upto in this section!</p>}

            {props.withUpload && <UploadPopUpController onUpload={props.onUpload ? props.onUpload : () => { }} />}
            <div className="news_container fit-content" ref={ref} id="news_container" onScroll={async () => { if (!props.scrollLoading) { await props.onScroll(ref) } }} style={{ overflowY: "scroll", paddingBottom: "20px" }}>
                <div className="outer-main-container">
                    <div className="common-grid-outer">
                        <div className="inner-container centered_outer_container">
                            {props.fromKidsCorner &&
                                <div className="centered_outer_container p-h-secondary">
                                    <div className="df row column" style={{ alignItems: "flex-start" }}>
                                        {/* <p className="row typo-sub-headings  " style={{ color: "#000", marginTop: "0px" }}>Contribute</p> */}
                                        <p className=" row typo-sub-headings " style={{ color: "#000", marginTop: "0px" }}>
                                            To get featured in the Kids’ Corner, you can send your drawings, paintings, stories, essays, poems or anything else to

                                            {isApp() ? <a style={{ display: "inline" }} className="txt-primary" onClick={() => { openLink("mail", "pathshala@summachar.in") }}> pathshala@summachar.in </a> : <a style={{ display: "inline" }} className="txt-primary" target={"_blank"} href="mailto:pathshala@summachar.in"> pathshala@summachar.in </a>}
                                            or upload here:
                                        </p>
                                        {<button className=" btn p-relative m-v-primary golden-btn" style={{ marginLeft: "0px", marginRight: "0px" }} onClick={() => { history.push(path + "/upload") }}> Upload</button>}

                                    </div>
                                </div>}
                            {!props.fromKidsCorner && (!user.associated_school || user.associated_school == '') &&
                                <div className="centered_outer_container p-h-secondary">
                                    <div className="df row column" style={{ alignItems: "flex-start" }}>
                                        {/* <p className="row typo-sub-headings  " style={{ color: "#000", marginTop: "0px" }}>Contribute</p> */}
                                        <p className=" row typo-sub-headings m-v-primary" style={{ color: "#000", marginTop: "0px" }}>
                                            <Link to={{ pathname: "/profile/profile", state: { from: "campussBuzz" } }} className="txt-primary">Click here </Link>and tell us which school you are from to get your school featured on our platform and create buzz!
                                        </p>


                                    </div>
                                </div>
                            }

                            {props.fromKidsCorner && props.mySubmissionData && props.mySubmissionData.length > 0 &&
                                <div className="container ">
                                    <div className="news_div  m-v-primary row " style={{ marginTop: "0px" }}>
                                        <div className="title-div p-h-secondary"  >
                                            <div className="title heading-text"  ><b>My Sumbissions</b></div>
                                        </div>
                                        <div className="df flex-1 grid-top-padding m-h-primary column p-relative" >
                                            <MySubmissionTable onClick={props.onViewClick} data={props.mySubmissionData} onDltBtnClick={props.onDltBtnClick} />

                                        </div>
                                    </div>
                                </div>
                            }
                            {
                                props.data && Object.entries(props.data).map(function (data, keyIndex) {
                                    return (
                                        <div className="container " key={keyIndex}>
                                            <div className="news_div ">
                                                <div className="title-div m-v-primary p-h-secondary" style={keyIndex == 0 ? { marginBottom: "0px", marginTop: '0px' } : { marginBottom: "0px" }} to={"/news"} >
                                                    <div className="title heading-text"  ><b>{props.getTitle(data[0])}</b></div>
                                                </div>
                                                <div className="df flex-1 grid-top-padding m-h-primary p-relative" >
                                                    <Grid className="row  radius-primary " container spacing={GridConfig.spacing}>
                                                        {


                                                            Object.entries(data[1]).slice(0, props.notMoreThan4 ? data[0] == 'My School' ? 2 : 4 : undefined).map(function (story, index) {
                                                                if (data[0] == 'latest' || data[0] == 'My School' || (props.fromCampussBuzzSchool && index < 2)) {
                                                                    return (
                                                                        <Grid container key={index} item xs={12} sm={12} md={6}>
                                                                            {/* <KidsCornerTile story={story[1]} onClick={props.showHideView}/> */}
                                                                            <CampussBuzzTile fromKidsCorner={props.fromKidsCorner ? true : false} descriptiveView={true} data={story[1]} slug={story[1].slug} />

                                                                        </Grid>
                                                                    );
                                                                } else {
                                                                    return (
                                                                        <Grid container key={index} item xs={GridConfig.tiles_at_xs} sm={GridConfig.tiles_at_sm} md={GridConfig.tiles_at_md}>
                                                                            {
                                                                                <div className="p-relative row">
                                                                                    {console.log(path + "/school/" + data[0])}
                                                                                    {index == 3 && props.notMoreThan4 && <div className="gray-parda df center " style={{ paddingTop: "0px", cursor: "default", backgroundColor: "rgba(231, 230, 249,.95)" }}>
                                                                                        <Link to={path + "/school/" + data[0]} className="typo-menu-primary fit-content center df  underline txt-primary" style={{ color: "#777777" }}>View  <br />more </Link>
                                                                                    </div>}
                                                                                    <CampussBuzzTile fromKidsCorner={props.fromKidsCorner ? true : false} data={story[1]} slug={story[1].slug} />
                                                                                </div>
                                                                            }


                                                                        </Grid>
                                                                    );
                                                                }

                                                            })}

                                                        {
                                                            data[0] == 'My School' && user.associated_school && user.associated_school != "" && <div className="row df center line-margin-small"><div className="click-color-change">
                                                                <Link className="txt-primary typo-sub-headings pointer center" to={path + "/school/" + user.associated_school}> <span className="pointer">Check Out More School Activities {'>>'}</span> </Link></div>
                                                            </div>
                                                        }

                                                    </Grid>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                                )
                            }
                            {
                                props.scrollLoading && (
                                    <div className="loader-box">
                                        <img src={LaoderSmall} style={{ width: "50px" }} alt="" />
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default StorykidsCornerAndCampusBuzz