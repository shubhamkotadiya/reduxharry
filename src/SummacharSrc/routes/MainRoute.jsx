import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { Redirect, Route, Switch, useHistory } from "react-router";

import { Store } from "../App";
// import { getAuthToken, resetToken } from "../common/helper";
import Home from "../pages/landingPage/LandingPageHome";
import { getAuthToken, getFreeTrialToken, getUserUuid, isApp, isFreeTrial, removeFirstQuizAttempt, removeFreeTrialToken, removeRefreshToken, removeToken, removeUserAddressDetails, removeUserUuid, resetToken, setFreeTrialToken, setUserUuid } from "../common/helper";
import Features from "../pages/landingPage/Features";

import AuthRoute from "./AuthRoute";

import 'react-toastify/dist/ReactToastify.css';

import PrivateRoute from "./PrivateRoute";
import Loader from "../components/Loader";
import LandingPageHome from "../pages/landing_page_v2/pages/LandingPageHome";
import LandingPageAcad from "../pages/landing_page_v2/pages/LandingPageAcad";
import LandingPageFAQ from "../pages/landing_page_v2/pages/LandingPageFAQ";
import PackagesController from "../controllers/pricing/PackagesController";
import Welcome from "../pages/Welcome";
import VerifyEmail from "../pages/auth/VerifyEmail";
import PrivacyPolicy from "../pages/landing_page_v2/pages/PrivacyPolicy";
import RefundPolicy from "../pages/landing_page_v2/pages/RefundPolicy";
import Terms from "../pages/landing_page_v2/pages/Terms";
import QuizComepititionController from "../pages/activities/quiz/QuizComepititionController";
import LandingPageAbout from "../pages/landing_page_v2/pages/LandingPageAbout";
import PaymentSucces from "../components/PaymentSucces";
import PaymentFail from "../components/PaymentFail";
import AcademicsVideoPopUp from '../../src/pages/privatePages/Academics/AcademicsVideoPopUp'
import CommonErrorScreen from "../pages/errors/CommonErrorScreen";
const MainRoute = () => {
    const store = useContext(Store);
    const history = useHistory();
    const [isLoading, setLoading] = useState(true);
    const handleResponse = async (response) => {
        if (response.code == 200 || response.code == 201) {

            if (response.status == true) {
                setUserUuid(response.data.uuid);

                const userData = response.data;


                if (userData.subject_list && userData.subject_list != null) {
                    userData.subject_list.includes("News") ? userData['has_news_access'] = true : userData['has_news_access'] = false
                } else {
                    userData['has_news_access'] = false
                }
                store.user.setUserData(userData);

                if (response.data.associated_subscription) {

                    if (new Date(response.data.subscription_endtime).getTime() < new Date().getTime()) {
                        setFreeTrialToken();

                    } else {

                        removeFreeTrialToken();
                    }
                } else {

                    setFreeTrialToken();
                }

                store.user.setLogin(true);
                setLoading(false);
            }
            setLoading(false)
        } else {
            if (response.code && response.code == 401) {

                await resetToken(async () => {
                    const res = await store.user.getUserData(); handleResponse(res);
                },
                    async () => {
                        store.user.setLogin(false);

                        removeToken();
                        removeFreeTrialToken();
                        removeUserUuid();
                        removeUserAddressDetails();
                        removeRefreshToken();
                        removeFirstQuizAttempt();
                        setLoading(false);
                        history.push("/signin");


                    })
            } else if (response.code && response.code == 403) {
                store.user.setLogin(false);

                removeToken();
                removeFreeTrialToken();
                removeUserUuid();
                removeUserAddressDetails();
                removeRefreshToken();
                removeFirstQuizAttempt();
                setLoading(false);
                history.push("/signin");
            }
            else {
                history.replace("/signin");
            }


        }
    }
    const setAuth = async () => {
        if (getAuthToken() && getAuthToken() != "") {
            if (getUserUuid()) {

                setLoading(true)

                const response = await Promise.all([
                    store.user.getUserData(),
                    store.subject.getData()
                    // newsletter.getData(),
                ])
                //  = await store.user.getUserData();
                handleResponse(response[0]);

            } else {
                removeToken()
                setLoading(false);
                store.user.setLogin(false);
                history.replace("/signin");
            }

        } else {
            // if (isFreeTrial()) {
            // store.user.setLogin(true);
            // } else {

            store.user.setLogin(false);
            // history.replace("/signin")
            // }

            setLoading(false);
        }
    }
    useEffect(async () => {
        await setAuth();
    }, [])

    return (
        <>
            {/* {store.user.isLoggedIn?"yes":"no"} */}
            {!isLoading ?

                <Switch>

                    <Route exact path="/" component={LandingPageHome} />
                    <Route exact path="/academic" component={LandingPageAcad} />
                    <Route exact path="/features" component={Features} />
                    <Route exact path="/faq" component={LandingPageFAQ} />
                    <Route path="/premium" component={PackagesController} />
                    <Route exact path="/about" component={LandingPageAbout} />
                    {/* <Route exact path="/contactus" component={LandingPageHome} /> */}
                    <Route exact path="/welcome" component={Welcome} />

                    <Route path="/verify_email" component={VerifyEmail} />
                    <Route exact path="/privacy-policy" component={PrivacyPolicy} />
                    <Route exact path="/refund-policy" component={RefundPolicy} />
                    <Route exact path="/terms-of-use" component={Terms} />
                    <Route path="/tel:+919880678169" />
                    <Route path="/mailto:namaskar@summachar.in" />
                    <Route exact path="/err-500"  ><CommonErrorScreen text={"Server Error!"} description={'Something went wrong on Server!'} /></Route>
                    <Route exact path="/err-502"  >
                        <CommonErrorScreen text={"Server Is Busy!"} description={'Please try After Sometimes!'} />
                    </Route>

                    <Route exact path="/err-404"  >
                        <CommonErrorScreen text={"Page Not Found!"} description="Given URL seems wrong" />
                    </Route>
                    <Route exact path="/err-403"  >
                        <CommonErrorScreen text={"Forbidden!"} description="You are not allowed to access this page!" />
                    </Route>

                    {store.user.isLoggedIn && <Route exact path="/activity/:slug" component={QuizComepititionController} />}
                    {store.user.isLoggedIn && <Route exact path="/activity/:slug/:from_notification" component={QuizComepititionController} />}
                    {store.user.isLoggedIn && <Route exact path="/video/:slug" component={AcademicsVideoPopUp} />}

                    {(store.user.isLoggedIn ?



                        <PrivateRoute /> : <AuthRoute />
                        // <PrivateRoute /> : <PrivateRoute />


                    )} </Switch> :

                <div className="df center flex-1">
                    {!isApp() && <Loader />}
                </div>
            }



        </>
    );
}
export default MainRoute;

