import { Link } from "react-router-dom";
import AccessBadges from "../../../components/lockingsystem/access_badges_component/AccessBadges";
import { useState } from 'react'
import { Grid } from "@mui/material";
import ReactMarkDownCustom from "../../../components/ReactMarkDownCustom";
const CampussBuzzTile = (props) => {
    const [hide_badge, sethide_badge] = useState(true)

    if (props.descriptiveView) {
        return (
            <>
                <div className="row p-relative">
                    {/* <div className="toolTipAreaHoverTile" style={{ height: "0px" }}>
                        {<AccessBadges hide_badge={hide_badge} data={props.data} calledFrom="NEWS" />}
                        <div className="tooltip hidden ">
                            {props.data.has_read && <div className="tooltiptext">Cheers! You read it on {props.data.read_timestamp}!</div>}
                        </div>
                    </div> */}
                    <Link
                        to={props.fromKidsCorner ? "/kids-corner/" + props.slug : "/campus-buzz/" + props.slug}
                        className="p-relative row hover-zoom border-primary radius-primary p-primary"
                        style={{ display: "block" }}

                    >
                        <Grid className="row " container spacing={2}>
                            <Grid container item xs={6}>
                                <div className="info-tile  row">

                                    <img className="df row radius-primary" onLoad={() => { sethide_badge(false) }} src={props.data.slides[0] ? props.data.slides[0].media : ""} alt="" />
                                    {/* <div className="hover-tile radius-primary fit-content pointer " style={{ top: "0px", left: "0px" }}></div> */}
                                </div>
                            </Grid>
                            <Grid container item xs={6}>
                                <div className="fit-content column center" style={{ alignItems: 'flex-start' }}>
                                    <h1  className="typo-sub-headings" style={{ color: "#000", textAlign: "left"  }}>{props.data.headline}</h1>
                                    <p style={{ textAlign: "left" }} className="typo-Description show-below-tablet column">
                                        <ReactMarkDownCustom
                                            children={props.data.summary && props.data.summary.length > 80 ? props.data.summary.slice(0, 77) + "..." : props.data.summary}
                                        />

                                    </p>
                                    <p style={{ textAlign: "left" }} className="typo-Description hide-below-tablet column">

                                        <ReactMarkDownCustom
                                            children={props.data.summary && props.data.summary.length > 120 ? props.data.summary.slice(0, 117) + "..." : props.data.summary}
                                        />

                                    </p>
                                </div>
                            </Grid>
                        </Grid>

                    </Link>
                </div>

            </>
        )
    } else {
        return (
            <>
                <div className="row p-relative ">
                    {/* <div className="toolTipAreaHoverTile" style={{ height: "0px" }}>
                        {<AccessBadges hide_badge={hide_badge} data={props.data} calledFrom="NEWS" />}
                        <div className="tooltip hidden ">
                            {props.data.has_read && <div className="tooltiptext">Cheers! You read it on {props.data.read_timestamp}!</div>}
                        </div>
                    </div> */}
                    <Link
                        to={props.fromKidsCorner ? "/kids-corner/" + props.slug : "/campus-buzz/" + props.slug}

                        className="p-relative row hover-zoom "
                        style={{ display: "block" }}

                    >


                        <div className="info-tile  row">
                            <img className="df row radius-primary" onLoad={() => { sethide_badge(false) }} src={props.data.slides[0].media} alt="" />
                            <div className="hover-tile radius-primary fit-content pointer " style={{ top: "0px", left: "0px" }}></div>
                        </div>

                    </Link>
                </div>

            </>
        )
    }

}
export default CampussBuzzTile