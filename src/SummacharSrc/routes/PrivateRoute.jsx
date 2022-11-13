import React, { createContext, useContext, useState } from "react";
import {
    Switch,
    Route,
    Redirect,
    Link
} from "react-router-dom";
import HomePageController from "../controllers/HomePageController";
import PerformancePageController from "../controllers/PerformanceController";

import NewsController from "../controllers/NewsController";

import NavBar from "../pages/privatePages/navbar/NavBar";

import NewsLetterController from "../controllers/NewsLetterController";

import ProfileViewController from "../controllers/ProfileViewController";

import EssayCompetitionController from "../pages/activities/quiz/EssayCompetitionController";
import NewsLetterPopUpController from "../controllers/NewsLetterPopUpController";
// import ActivityCenterController from "../controllers/activitycenter/ActivityCenterController";

import Welcome from "../pages/Welcome";

import AcademicMainPathController from "../controllers/AcademicMainPathController";
import EventsCalendarController from "../controllers/EventsCalendarController";

import KnowledgePageController from "../controllers/KnowledgeController"
import VerifyEmail from "../pages/auth/VerifyEmail";
import ActivityCenterMain from "../controllers/activitycenter/ActivityCenterMain";
import KidsCornerController from "../controllers/kidscornerAndCampussBuzz/KidsCornerController";
import PullToRefresh from 'react-simple-pull-to-refresh';
import { isApp } from "../common/helper";
import NewsPopUpController from "../controllers/NewsPopUpController";
import CampussBuzzController from "../controllers/kidscornerAndCampussBuzz/CampussBuzzController";
import StoryKidsCornerController from "../controllers/kidscornerAndCampussBuzz/StoryKidsCornerController";
import SearchPage from "../pages/privatePages/search/SearchPage";
import SudokuController from "../controllers/games/SudokuController";
import GamesController from "../controllers/games/GamesController";
import PackagesController from "../controllers/pricing/PackagesController";
import PaymentSucces from "../components/PaymentSucces";
import PaymentFail from "../components/PaymentFail";
import SchoolNamePopup from "../components/SchoolNamePopup";
export const PulltoRefreshWork = createContext();

const PrivateRoute = () => {
    // const pulltorefreshtruefalse = useContext(PulltoRefreshWork);
    const [pulltorefresh, setPulltorefresh] = useState(true);
    const pullTorfreshVal = {
        value: pulltorefresh,
        set: (val) => {
            setPulltorefresh(val)
        }
    }
    return (
        <>
            <PulltoRefreshWork.Provider value={pullTorfreshVal}>
                <PullToRefresh

                    isPullable={isApp() && pulltorefresh}

                    pullingContent={null}
                    onRefresh={async () => { window.location.reload() }}>
                    
                    <SchoolNamePopup>
                    <NavBar>
                        <Switch>
                            {/* <Route exact path="/" component={LandingPageHome} />
                    <Route exact path="/faq" component={LandingPageFAQ} />
                    <Route exact path="/features" component={Features} />
                    <Route  path="/pricing" component={PackagesController} />
                    <Route exact path="/about" component={LandingPageHome} />
                    <Route exact path="/contactus" component={LandingPageHome} />
                    <Route exact path="/privacy-policy" component={PrivacyPolicy} />
                    <Route exact path="/refund-policy" component={RefundPolicy} />
                    <Route exact path="/terms-of-use" component={TermsOfUse} /> */}


                            <Route path="/home" component={HomePageController} />
                            <Route path="/search" component={SearchPage}/>
                            <Route path="/news" component={NewsController} />
                            <Route path="/story/:slug" component={NewsPopUpController} />
                            <Route path="/knowledge" component={KnowledgePageController} />
                            <Route exact path="/e-magazine" component={NewsLetterController} />
                            <Route exact path="/e-magazine/:slug" component={NewsLetterPopUpController} />
                            {/* <Route exact path="/performance" component={PerformancePageController} /> */}
                            <Route exact path="/performance/:slug" component={PerformancePageController} />

                            <Route path="/activities" component={ActivityCenterMain} />
                            <Route path="/games" component={GamesController} />


                            <Route path="/competition-essay/:slug" component={EssayCompetitionController} />
                            <Route path="/profile" component={ProfileViewController} />
                            <Route exact path="/welcome"  component={Welcome} />
                            <Route path="/verify_email" component={VerifyEmail} />
                            <Route path="/pricing" >
                                <PackagesController from="app" />
                            </Route>
                            <Route exact path="/payment-success" component={PaymentSucces} />
                            <Route exact path="/payment-fail" component={PaymentFail} />

                            <Route path="/academics" component={AcademicMainPathController} />
                            {/* <Route  path="/academics/:subject" component={AcademicController} /> */}
                            <Route path="/calendar" component={EventsCalendarController} />
                            <Route path="/kids-corner" component={StoryKidsCornerController} />
                            <Route path="/campus-buzz" component={CampussBuzzController} />
                            <Route path="/tel:+919880678169" />


                            <Route path="*" >
                                <Redirect to="/home" />
                            </Route>

                            {/* <Route component={PageNotFound} /> */}


                        </Switch>

                    </NavBar>
                    </SchoolNamePopup>
                </PullToRefresh>
            </PulltoRefreshWork.Provider>

        </>
    );
}
export default PrivateRoute;