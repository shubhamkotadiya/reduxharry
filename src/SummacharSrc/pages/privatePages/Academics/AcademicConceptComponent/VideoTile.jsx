import { isApp } from "../../../../common/helper";
import React, { useContext, useEffect, useState } from "react";
import { Store } from "../../../../App";
import { useHistory, useParams, useRouteMatch } from "react-router";
import "../../../../assets/css/infoVideoTile.css";
import AccessBadges from "../../../../components/lockingsystem/access_badges_component/AccessBadges";
import { Grid } from "@mui/material";
import { GridContext } from "../../../../common/GridConfig";

const VideoTile = (props) => {
    const user = useContext(Store).user.data;
    const GridConfig = useContext(GridContext)
    const video = props.data;
    const params = useParams();

    const subject = params.subject;
    const chapter_name = params.chapter_name;


    return (
        <Grid container item xs={GridConfig.tiles_at_xs} sm={GridConfig.tiles_at_sm} md={GridConfig.tiles_at_md}>
        <button className="p-relative row center df radius-primary info-tile  " key={video.uuid} >

            {!props.noBadges && <AccessBadges premium_intrest_string={"academics/" + subject + "/" + chapter_name + "/" + video.slug} calledFrom="VIDEO" data={video} subject_has_access={user.subject_list && user.subject_list.indexOf(subject) !== -1} />}
            <div className="df fit-content center df radius-primary video_grid hover-zoom " onClick={() => props.openPopUp(video)} style={{ overflow: "hidden", position: "relative", marginLeft: "0px !important", marginRight: "0px !important" }}>
                <div className="hover-tile radius-primary fit-content pointer" style={{ zIndex: '0' }} >

                </div>
                <div className="df center fit-content radius-primary pointer" style={{ position: "absolute" }}>
                    <svg width="50" height="56" viewBox="0 0 72 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g filter="url(#filter0_d_495:2102)">
                            <path d="M64 33.0718C69.3333 36.151 69.3333 43.849 64 46.9282L16 74.641C10.6667 77.7202 4 73.8712 4 67.7128L4 12.2872C4 6.12878 10.6667 2.27978 16 5.35898L64 33.0718Z" fill="white" />
                        </g>
                        <defs>
                            <filter id="filter0_d_495:2102" x="0" y="0.275391" width="72" height="79.4492" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                <feOffset />
                                <feGaussianBlur stdDeviation="2" />
                                <feComposite in2="hardAlpha" operator="out" />
                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" />
                                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_495:2102" />
                                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_495:2102" result="shape" />
                            </filter>
                        </defs>
                    </svg>

                </div>

                <img className="fit-content  df acad_sub_grids radius-primary" src={video.thumbnail} alt="" />
                <div className="df row " style={{ position: "absolute", height: "20px", bottom: "0px", left: "0px", width: video.has_watched ? "100%" : (video.progress_seconds / video.video_length) * 100 + '%', background: " #ECC249", borderTop: "1px solid white" }} ></div>
            </div>
        </button>
        </Grid>
    )
}
export default VideoTile;