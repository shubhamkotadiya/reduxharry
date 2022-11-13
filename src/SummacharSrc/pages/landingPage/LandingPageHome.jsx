import React from "react";
import '../../assets/css/LandingPage.css';
import '../../assets/css/landingpage-home.css';
// import NavBar from "./NavBar";
import pattern from '../../assets/images/landingpage/Dotted_Pattern.svg';
import circle1 from '../../assets/images/landingpage/circle_pink.svg';
import circle2 from '../../assets/images/landingpage/circle_white.svg';
import arrow from '../../assets/images/landingpage/Arrow_1.svg';
import bg from '../../assets/images/landingpage/Arrow-cricle.svg';
import brain from '../../assets/images/landingpage/brain-collage.svg';
import ring from '../../assets/images/landingpage/home-ring.svg';
import ringright from '../../assets/images/landingpage/home-ring-right.svg';
import grp_11 from '../../assets/images/landingpage/Group_11.svg';

import { NavLink } from 'react-router-dom';

const Home = () => {
    return(
        <div>            
            {/* <NavBar /> */}

            <div className="nurture-outer">
                {/* <div className="pattern left">
                    <img src={pattern} alt="dotted-pattern" />
                </div> */}
                <div className="nurture-inner">
                    <div className="nurture-heading-mobile">
                        Nurture <span className="text-underline">Future Leaders</span>
                    </div>
                    <div className="nurture-left-col">
                        <div className="nurture-heading">
                            Nurture <span className="text-underline">Future Leaders</span>
                        </div>
                        <div className="nurture-desc">
                            The leaders of tomorrow need to be globally aware today. Knowledge is power in the modern information age. Summachar Pathshala is a platform for students to get real world exposure through informative news content, national competitions and master classes with industry leaders.
                        </div>
                        <div className="nurture-desc bold">
                            Empower your child to be a leader of tomorrow by subscribing today!
                        </div>
                        {/* <NavLink to="/" className="landingpage-navbar-text" exact activeClassName="landing-active">Home</NavLink> */}
                        {/*<NavLink to="/pricing" className="landing-home-subscribe">*/}
                        {/*    Subscribe*/}
                        {/*</NavLink>*/}
                    </div>
                    <div className="nurture-right-col">
                        <iframe className="landing-demo-video" src="https://www.youtube.com/embed/mDuX-g-WMeo" title="YouTube video player" frameBorder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </div>
                </div>
                {/* <div className="pattern right">
                    <img src={pattern} alt="dotted-pattern" />
                </div> */}
            </div>

            {/* <div className="holistic-outer">
                <div className="yellow-circle">
                    <img src={circle1} alt="" />
                </div>
                <div className="arrow">
                    <div className="arrow-txt">
                        Equip Your Child’s <span className="text-underline">Knowledge Arsenal</span>
                    </div>
                    <img src={arrow} alt="" />
                </div>
                <div className="white-circle">
                    <img src={circle2} alt="" />
                </div>
            </div> */}

            <div className="holistic-outer">
                    <img className="bg-arrow" src={bg} alt="" />

                <div className="home-ring-left">
                        <img src={ring} alt="" />
                    </div>
                <div className="holistic-inner">
                    
                    <div className="holistic-development">
                        <div className="holistic-development-left-col">
                            <div className="holistic-heading">
                                Holistic <span className="text-underline">Development</span> Through News
                            </div>
                            <div className="holistic-txt">
                                Exclusive Master Classes with industry leaders and experts inspire students and help them better understand career paths.
                            </div>
                            <div className="holistic-txt">
                                Through the Activity Centre, students can interact, compete and collaborate with peers across the country.
                            </div>
                            <div className="holistic-txt">
                                Exclusive Master Classes with industry leaders and experts inspire students and help them better understand career paths.
                            </div>
                            
                            
                        </div>
                        
                        <div className="holistic-development-right-col">
                            
                                <img className="mobile-ring-left" src={ring} alt="" />
                            
                            <img src={grp_11} alt="" />
                            
                                <img className="mobile-ring-right" src={ringright} alt="" />
                            
                        </div>
                        
                    </div>
                    
                </div>
                <div className="home-ring-right">
                        <img src={ringright} alt="" />
                </div>

                <div className="arsenal-heading">
                    Equip Your Child’s <span className="text-underline">Knowledge Arsenal</span>
                </div>
            </div>

            <div className="brain-collage-home">
                <img src={brain} alt="brain-collage" />
            </div>
            
        </div>
    )
}
export default Home;

