import { Link } from "react-router-dom";
import AccessBadges from "../../../components/lockingsystem/access_badges_component/AccessBadges";
import { useState } from 'react'
const NewsTile = (props) => {
    const [hide_badge, sethide_badge] = useState(true)
    return (
        <>
            <div className="row p-relative ">
                <div className="toolTipAreaHoverTile" style={{ height: "0px" }}>
                    {!props.hide_badge && <AccessBadges hide_badge={hide_badge} data={props.data} calledFrom="NEWS" premium_intrest_string = {"news/" +props.slug +"/inquiry_from_popup" }/>}
                    <div className="tooltip hidden ">
                        {props.data.has_read && <div className="tooltiptext">Cheers! You read it on {props.data.read_timestamp}!</div>}
                    </div>
                </div>
                <Link
                    to={"/news/" + props.slug}
                    onClick={() => {
                        props.setTargetForPopUp(props.category);
                    }}
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
export default NewsTile