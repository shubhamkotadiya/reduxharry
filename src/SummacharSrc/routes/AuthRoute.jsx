import React from "react";
import {    
    Switch,
    Route    
  } from "react-router-dom";
import { Redirect } from "react-router";



import SignInController from "../controllers/SignInController";
import SignInMain from "../controllers/signin/SignInMain";


const AuthRoute = ()=>{        
    return(
        <>
            <Switch>
                {/* <Route exact path="/" component={LandingPageHome} />
                <Route exact path="/features" component={Features} />
                <Route exact path="/faq" component={LandingPageFAQ} />
                <Route  path="/pricing" component={PackagesController} />
                <Route exact path="/about" component={LandingPageHome} />
                <Route exact path="/contactus" component={LandingPageHome} />
                <Route exact path="/welcome" component={Welcome} />
                <Route path="/verify_email" component={VerifyEmail} />
                <Route exact path="/privacy-policy" component={PrivacyPolicy} />              
                <Route exact path="/refund-policy" component={RefundPolicy} />              
                <Route exact path="/terms-of-use" component={TermsOfUse} />               */}
                <Route path="/signin" exact component={SignInMain} />
                {/* <Route exact path="/selectPackages" component={PackagesOptionsController} /> */}
                {/* <Route exact path="/premium" component={PackagesController} /> */}
                <Route path="*">                
                    <Redirect to="/signin" />
                </Route>
            </Switch>
            
        </>
    );
}
export default AuthRoute;