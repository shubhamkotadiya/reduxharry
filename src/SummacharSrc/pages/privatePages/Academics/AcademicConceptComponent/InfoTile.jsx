import { isApp } from "../../../../common/helper";
import React, { useContext, useEffect, useState } from "react";
import { Store } from "../../../../App";
import { useHistory, useParams, useRouteMatch } from "react-router";
import "../../../../assets/css/infoVideoTile.css";
import AccessBadges from "../../../../components/lockingsystem/access_badges_component/AccessBadges";
import { Grid } from "@mui/material";
import { GridContext } from "../../../../common/GridConfig";
const InfoTile = (props) => {
    const info = props.data;
    const params = useParams();
    const subject = params.subject;
    const user = useContext(Store).user.data;

    const GridConfig = useContext(GridContext)
    // return (
    //     <Grid container item xs={GridConfig.tiles_at_xs} sm={GridConfig.tiles_at_sm} md={GridConfig.tiles_at_md}>
    //         <div

    //             className="df row info-tile"
    //             key={info.uuid}
    //         >


    //             <div className="df row p-relative ">
    //                 {!props.noBadges && <AccessBadges premium_intrest_string={"academics/" + subject + "/" + info.slug} calledFrom="INFOGRAPHICS" data={info} subject_has_access={user.subject_list && user.subject_list.indexOf(subject) !== -1} />}
    //                 <div className=" row p-relative hover-zoom ">
    //                     <div className="hover-tile radius-primary fit-content pointer" onClick={() => { props.openPopUp(info) }}>

    //                     </div>

    //                     <img
    //                         onClick={() => props.openPopUp(info)}
    //                         className="row df radius-primary"
    //                         src={info.slides[0].media}
    //                         alt=""
    //                     />
    //                 </div>

    //             </div>

    //         </div>
    //     </Grid>
    // )

    const [hide_badge, sethide_badge] = useState(true)
    return (
        <>
            <Grid container item xs={GridConfig.tiles_at_xs} sm={GridConfig.tiles_at_sm} md={GridConfig.tiles_at_md}>
                <div className="row p-relative ">
                    <div className="toolTipAreaHoverTile" style={{ height: "0px" }}>
                        {!props.noBadges && <AccessBadges premium_intrest_string={"academics/" + subject + "/" + info.slug} calledFrom="INFOGRAPHICS" data={info} subject_has_access={user.subject_list && user.subject_list.indexOf(subject) !== -1} />}
                        <div className="tooltip hidden ">
                            {info.has_read && <div className="tooltiptext">Cheers! You read it on {info.read_timestamp}!</div>}
                        </div>
                    </div>
                    <div

                        onClick={() => {
                            props.openPopUp(info)
                        }}
                        className="p-relative row hover-zoom "
                        style={{ display: "block" }}

                    >


                        <div className="info-tile  row">
                            <img className="df row radius-primary" onLoad={() => { sethide_badge(false) }} src={info.slides[0].media} alt="" />
                            <div className="hover-tile radius-primary fit-content pointer " style={{ top: "0px", left: "0px" }}></div>
                        </div>

                    </div>
                </div>
            </Grid>
        </>
    )



};
export default InfoTile;





















