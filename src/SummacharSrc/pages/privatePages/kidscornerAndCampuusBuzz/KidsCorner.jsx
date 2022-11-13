import { Grid } from "@mui/material";
import { useContext } from "react";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { GridContext } from "../../../common/GridConfig";
import { isApp, openLink } from "../../../common/helper";
// import { Route, Switch, useLocation, useRouteMatch } from "react-router-dom";
import UploadPopUpController from "../../../controllers/kidscornerAndCampussBuzz/UploadPopUpController";
import KidsCornerTile from "./KidsCornerTile";
// import kidsCornerTile from "./kidsCornerTile";
const KidsCorner = (props) => {
    const GridConfig = useContext(GridContext)
    const history = useHistory()
    const { path, url } = useRouteMatch()


    return (
        <>

            {props.withUpload && <UploadPopUpController />}

            <div className="news_container fit-content" id="news_container" style={{paddingBottom:"20px"}}>
                <div className="outer-main-container">
                    <div className="common-grid-outer">
                        <div className="inner-container centered_outer_container">

                            <div className="centered_outer_container p-h-secondary">
                                <div className="df row column" style={{ alignItems: "flex-start" }}>
                                    {/* <p className="row typo-sub-headings  " style={{ color: "#000", marginTop: "0px" }}>Contribute</p> */}
                                    <p className=" row typo-sub-headings " style={{ color: "#000", marginTop: "0px" }}>
                                        To get featured in the Kids’ Corner, you can send your drawings, paintings, stories, essays, poems or anything else to

                                        {isApp() ? <a style={{ display: "inline" }} className="txt-primary" onClick={() => { openLink("mail","pathshala@summachar.in") }}> pathshala@summachar.in </a> : <a style={{ display: "inline" }} className="txt-primary" target={"_blank"} href="mailto:pathshala@summachar.in"> pathshala@summachar.in </a>}
                                        or upload here:
                                    </p>
                                    {<button className=" btn p-relative m-v-primary golden-btn" style={{ marginLeft: "0px", marginRight: "0px" }} onClick={() => { history.push(path + "/upload") }}> Upload</button>}

                                </div>
                            </div>

                            {props.data && Object.entries(props.data).map(function (data, keyIndex) {
                                return (
                                    <div className="container " key={keyIndex}>
                                        <div className="news_div ">
                                            <div className="title-div m-v-primary p-h-secondary" style={keyIndex == 0 ? { marginBottom: "0px", marginTop: '0px' } : { marginBottom: "0px" }} to={"/news"} >
                                                <div className="title heading-text"  ><b>{props.getTitle(data[0])}</b></div>
                                            </div>
                                            <div className="df flex-1 grid-top-padding m-h-primary p-relative" >
                                                <Grid className="row  radius-primary " container spacing={GridConfig.spacing}>
                                                    {Object.entries(data[1]).map(function (tileData, index) {
                                                        return (
                                                            <Grid container key={index} item xs={GridConfig.tiles_at_xs} sm={GridConfig.tiles_at_sm} md={GridConfig.tiles_at_md}>
                                                                <KidsCornerTile data={tileData[1]} showStatus={data[0]==="your_submissions"} onClick={props.showHideView}/>

                                                            </Grid>
                                                        );
                                                    })}
                                                </Grid>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default KidsCorner