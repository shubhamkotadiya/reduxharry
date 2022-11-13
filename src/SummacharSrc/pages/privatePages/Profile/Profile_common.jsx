import React, { useContext, useState } from "react";
import { Link } from "react-router-dom"
import "../../../assets/css/ProfileView.css"
import { Route, Switch, useRouteMatch } from "react-router";
import { useLocation } from 'react-router-dom'
import { isFreeTrial, premiumInt } from "../../../common/helper";
import { Store } from "../../../App";

const ProfileView = (Props) => {
    const location = useLocation();
    const user = useContext(Store).user.data
    let { path, url } = useRouteMatch();
    const [Url, changeUrl] = useState(useLocation().pathname.slice(9))
    console.log()
    if (!(location.pathname.slice(0, 19) == "/profile/bookmarks/" && location.pathname.slice(-9) != "bookmarks") ) {
        return (

            <div className="wrapper_container  df column flex-1">
                <div className="app-profile-container  df column flex-1">
                    <div className="profile-inner-container df column flex-1">
                        <div className="common-grid-outer p-h-primary">
                            <div className="centered_outer_container p-h-primary">
                                {!(location.pathname.slice(0, 19) == "/profile/bookmarks/" && location.pathname.slice(-9) != "bookmarks") && location.pathname.slice(-4)!="view" && 
                                    <nav className="nav-bar column " style={{ margin: "0px" }}>

                                        <ul className="p-h-primary">
                                            <Link onClick={() => { changeUrl('profile') }} to="/profile/profile" className={location.pathname.slice(-7) == 'profile' ? 'active' : 'tab-hoverable'} >Profile </Link>
                                            <Link onClick={() => { changeUrl('certificates') }} to="/profile/certificates" className={location.pathname.slice(-12) == 'certificates' ? 'active' : ''} >Certificates </Link>
                                            <Link onClick={() => { changeUrl('bookmarks') }} to="/profile/bookmarks" className={location.pathname.slice(-9) == 'bookmarks' ? 'active' : 'tab-hoverable'}>Bookmarks</Link>
                                        </ul>
                                        {user.user_type === "FREE_USER" && <Link to={"/pricing"} className="golden-btn df p-relative shimmer m-v-primary" onClick={() => { premiumInt("/inquiry_from_popup") }}> Go&nbsp;Premium</Link>}
                                    </nav>}
                            </div>
                        </div>
                        {(location.pathname.slice(0, 19) == "/profile/bookmarks/" && location.pathname.slice(-9) != "bookmarks") || location.pathname.slice(0,21) == "/profile/certificates"? <>{Props.children}</> :
                            <div className="body df flex-1">
                                {Props.children}
                            </div>}
                    </div>
                </div>
            </div>

        )
    } else {
        return (
            // <div className="wrapper_container">
            // {/* <div className="app-profile-container"> */}
            // {/* <div className="profile-inner-container"> */}
            <div className="common-grid-outer" id="swipe_scrol_disabled" style={{ flex: 1, overflowY: "scroll" }}>
                {Props.children}
            </div>
            // </div>
            // </div>
            // </div>
        )
    }

}

export default ProfileView;