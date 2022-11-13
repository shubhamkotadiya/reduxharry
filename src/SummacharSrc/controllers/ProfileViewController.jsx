import React, { useContext, useEffect, useState } from "react";
import { Store } from "../App";
import ProfileView from "../pages/privatePages/Profile/Profile_common";
import BookmarksController from "../controllers/BookmarksController"
import ProfileController from "../controllers/ProfileController";
import CategoriesController from "../controllers/CategoriesController";
import NavBar from "../pages/privatePages/navbar/NavBar";
import { Route, Switch, useRouteMatch } from "react-router";
import { useLocation } from 'react-router-dom'
import CertificateController from "./certificate/CertificateController";


const ProfileViewController = () => {
    let { path, url } = useRouteMatch();
    const [currentUrl,changeUrl] = useState(useLocation().pathname.slice(9))
    
    return (
        <>
            <ProfileView url={currentUrl} changeUrl={changeUrl} >
                <Switch>
                    <Route path={path+"/profile"} component={ProfileController} />                    
                    <Route path={path+"/bookmarks"} component={BookmarksController} />
                    <Route path={path+"/certificates"} component={CertificateController} />
                    {/*<Route path={path+"/categories"} component={CategoriesController} />*/}
                </Switch>
            </ProfileView>
            
        </>)
}


export default ProfileViewController;