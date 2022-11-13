import { useEffect, useState, useRef } from "react";
import { useHistory, useLocation, useRouteMatch } from "react-router";

import Header from "../common/Header";
import About from "../component/About";
import ContactUs from "../component/ContactUs";
import Features from "../component/Features";
import LearnBetter from "../component/LearnBetter";
import Perks from "../component/Perks";
import { configureAnchors } from 'react-update-url-on-scroll'

/*import div, {  } from 'react-update-url-on-scroll';*/

import Testimonial from "../component/Testimonial";
import HeroImageBox from "../component/HeroImageBox";
import KidsCornerFeatures from "../component/KidsCornerFeatures";
import PlayParticipateAndWin from "../component/PlayParticipateAndWin";
import EducationPartners from "../component/EducationPartners";
import Footer from "../component/Footer";
import KidsCornerAndCampussBuzz from "../component/KidsCornerAndCampussBuzz";

const LandingPageHome = () => {
    configureAnchors({ offset: 150 })
    const { path, url } = useRouteMatch();
    const [paths, setPath] = useState(window.location.pathname)
    const location = useLocation();
    const history = useHistory();

    const scrollableRef = useRef();
    const aboutUsRef = useRef();
    const contactUsRef = useRef();
    const [scroll, setScroll] = useState(0)
    const setScreen = () => {
        // if (location.pathname == "/about") {
        //     setTimeout(() => {
        //         scrollableRef.current.scrollTo({
        //             top: document.getElementById("about").offsetTop,
        //             behavior: 'smooth'
        //         })
        //     }, 50)

        // } else if (window.location.pathname == "/contactus") {
        //     setTimeout(() => {
        //         scrollableRef.current.scrollTo({
        //             top: document.getElementById("contactus").offsetTop,
        //             behavior: 'smooth'
        //         })
        //     }, 50)

        // } else {
        //     if (scrollableRef.current.scrollTop > 0) {
        //         scrollableRef.current.scrollTo({
        //             top: 0,
        //             behavior: 'smooth'
        //         })
        //     } else {
        //         scrollableRef.current.scrollTo({
        //             top: 0,
        //         })
        //     }
        // }
    }
    useEffect(() => {
        setScreen();
        setPath(window.location.pathname)
    }, [])

    useEffect(() => {
        if (history.location.pathname != window.location.pathname)
            history.push(paths)
    }, [paths])

    useEffect(() => {
        if (window.location.pathname != paths) {
            setScreen();
            setPath(window.location.pathname)
        }
    }, [window.location.pathname])
    const onscroll = () => {
        setScroll(document.getElementById("scrollable").scrollTop)
    }

    return (
        <>

            <Header path={paths} paths={scroll}>
                <div id="scrollable" className="fit-content scrollable" ref={scrollableRef} onScroll={() => { onscroll() }}>


                    <div name={""} className="component-container p-h-primary" style={{ marginTop: "10px" }}>
                        <div className="row center title-margin df column" style={{ marginTop: "0px" }}>
                            <h1 className="row  landing_section_header" style={{ marginTop: "0px" }} >Knowledge is Power!
                            </h1>
                            <h3 className="row landing_section_sub_header txt-gray">Get smarter everyday with Pathshala’s daily dose of news, knowledge and brain-games!
                            </h3>
                        </div>
                        <HeroImageBox />
                    </div >

                    <div className="component-container p-h-primary" name={"academic"}>
                        <div className="row center title-margin df column" style={{ marginTop: "5px" }}>
                            <h1 className="row  landing_section_header" >Stay Updated With Our Beautiful Newsographics!</h1>
                        </div>
                        <KidsCornerFeatures />
                    </div >
                    <div className="component-container p-h-primary" name={""}>
                        <div className="row center df">
                            <h1 className="row title-margin landing_section_header" >Extra Perks</h1>
                        </div>
                        {/* <Perks /> */}
                        <PlayParticipateAndWin />
                    </div >
                    <div className="component-container p-h-primary" name={""}>
                        <div className="row center df">
                            <h1 className="row title-margin landing_section_header" >Added Benefits</h1>
                        </div>
                        {/* <Perks /> */}
                        <KidsCornerAndCampussBuzz />
                    </div >

                    <div name={""} className="component-container p-h-primary" style={{ marginTop: "10px" }}>
                        <div className="row center title-margin df column" style={{ marginTop: "0px" }}>
                            <h1 className="row  landing_section_header" style={{ marginTop: "0px" }} >Education Partners
                            </h1>
                            <h3 className="row landing_section_sub_header txt-gray">Pathshala is partnered with the top educational institutions across the country!
                            </h3>
                        </div>
                        <EducationPartners />
                    </div >


                    {/* <div className="component-container p-h-primary" name={"about"} id="about" ref={aboutUsRef}>
                        <div className="row center df">
                            <h1 className="row title-margin landing_section_header">About Us</h1>
                        </div>
                        <About />
                    </div>
                    <div className="component-container" name={"contactus"} id="contactus" ref={contactUsRef} style={{ paddingBottom: "0px" }}>
                        <div className="row center df">
                            <h1 className="row title-margin landing_section_header" >Contact Us</h1>
                        </div>
                        <ContactUs />
                    </div > */}

                    <Footer />
                </div>
            </Header>
            {/* <TestimonialCard /> */}
        </>
    )
}
export default LandingPageHome;