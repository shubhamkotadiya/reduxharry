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

const LandingPageAbout = () => {
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




                    <div className="component-container p-h-primary" name={"about"} id="about" style={{marginTop:"0px"}} ref={aboutUsRef}>
                        <div className="row center df">
                            <h1 className="row  landing_section_header" style={{ marginTop: "0px" }}>About Us</h1>
                        </div>
                        <About />
                    </div>
                    <div className="component-container p-h-primary" name={"contactus"} id="contactus" ref={contactUsRef} style={{ paddingBottom: "0px" }}>
                        <div className="row center df">
                            <h1 className="row title-margin landing_section_header" >Contact Us</h1>
                        </div>
                        <ContactUs />
                    </div >
                <Footer />

                </div>
            </Header>
            {/* <TestimonialCard /> */}
        </>
    )
}
export default LandingPageAbout;