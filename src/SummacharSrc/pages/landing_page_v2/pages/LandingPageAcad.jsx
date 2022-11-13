import { useEffect, useState, useRef } from "react";
import { useHistory, useLocation, useRouteMatch } from "react-router";

import Header from "../common/Header";
import Features from "../component/Features";
import Edge from "../component/edge";
import LearnBetter from "../component/LearnBetter";
import Perks from "../component/Perks";
import { configureAnchors } from 'react-update-url-on-scroll'
import Footer from "../component/Footer";

/*import div, {  } from 'react-update-url-on-scroll';*/

import Testimonial from "../component/Testimonial";

const LandingPageAcad = () => {
    configureAnchors({ offset: 150 })
  
    return (
        <>

            <Header >
                <div  className="fit-content scrollable" >


                    <div name={"academic"} className="component-container p-h-primary" >
                        <div className="row center title-margin df column" style={{ marginTop: "10px" }}>
                            <h1 className="row  landing_section_header" >Learn Better Faster</h1>
                            <h3 className="row landing_section_sub_header txt-gray">The Perfect Learning Platform for Students</h3>
                        </div>
                        <LearnBetter />
                    </div >
                    <div className="component-container p-h-primary" name={"academic"}>
                        <div className="row center title-margin df column" style={{ marginTop: "5px" }}>
                            <h1 className="row  landing_section_header" >Excel in Academics the Easy Way</h1>
                        </div>
                        <Features />
                    </div >
                    <div className="component-container p-h-primary" name={"academic"}>
                        <div className="row center title-margin df column" style={{ marginTop: "5px" }}>
                            <h1 className="row  landing_section_header"> The Pathshala Edge </h1>
                        </div>
                        <Edge />
                    </div >
                    
                   
                    <div className="component-container p-h-primary" name={"academic"}>

                        <div className="row center title-margin  df column">
                            <h3 className="row landing_section_sub_header  txt-gray"> See what </h3>
                            <h1 className="row landing_section_header">Parents, Students and Experts</h1>
                            <h3 className="row landing_section_sub_header txt-gray">have to say about us</h3>
                        </div>
                        <Testimonial />
                    </div >
                    
                   

                    <Footer />
                </div>
            </Header>
         
        </>
    )
}
export default LandingPageAcad;