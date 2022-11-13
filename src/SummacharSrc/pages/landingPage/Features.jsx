import React from "react";
import '../../index.css';
import '../../assets/css/LandingPage.css';
import '../../assets/css/landingpage-features.css';
import NavBar from "./NavBar";
import Footer from "./Footer";
import newsicon from '../../assets/images/landingpage/Newsicon.svg';
import simplified from '../../assets/images/landingpage/Frame_3.svg';
import infographics from '../../assets/images/landingpage/Infographics.svg';
import book from '../../assets/images/landingpage/Book.svg';
import datadriven from '../../assets/images/landingpage/Datadriven.svg';
import scale from '../../assets/images/landingpage/Scale.svg';
import quiz from '../../assets/images/landingpage/Quiz.svg';
import grp_5 from '../../assets/images/landingpage/Group_5.svg';
// import grp_7 from '../../assets/images/landingpage/Group_7.svg';
// import image_5 from '../../assets/images/landingpage/image_5.svg';
// import curiopedia_1 from '../../assets/images/landingpage/curiopedia_1.svg';
// import qv1 from '../../assets/images/landingpage/Quiz_vault_1.svg';
import grp_941 from '../../assets/images/landingpage/activity-center.png';
import grp_95 from '../../assets/images/landingpage/Group_95.svg';
import bulb from '../../assets/images/landingpage/Bulb_collage.svg';
import grp_16 from '../../assets/images/landingpage/Group_16.svg';
import grp_94 from '../../assets/images/landingpage/E-magazine.png';
import vec_2 from '../../assets/images/landingpage/Vector_2.svg';
import vec_2_mobile from '../../assets/images/landingpage/Vector_2_mobile.svg';
import card1 from '../../assets/images/landingpage/demo story for deck 1.svg';
import card2 from '../../assets/images/landingpage/demo story for deck 2.svg';
import card3 from '../../assets/images/landingpage/demo story for deck 3.svg';
import card4 from '../../assets/images/landingpage/demo story for deck 4.svg';
import card5 from '../../assets/images/landingpage/demo story for deck 5.svg';
import masterclassvid from '../../assets/images/landingpage/Masterclass_Teaser.mp4';
import LandingPageSlider from "../../components/LandingPageSlider";

const Features = () =>{
    return(
        <div className="wrapper_container">  
            <NavBar />
                
                <div className="f-outer-container">
                <img src={vec_2} className="genre-vec-2" alt="" />
                    <div className="curious-txt">Genre&nbsp;
                            <span className="text-underline">Focus</span>
                    </div>
                    
                    <div className="outer-card-container">
                        {/* <img src={vec_2} className="genre-vec-2" alt="" /> */}
                    <div className="outer-card">
                        
                        <div className="card">
                            <img src={card1} alt="" />
                            <h3 className="card-desc">Policy Making & Financial Literacy</h3>
                        </div>
                        <div className="card">
                            <img src={card2} alt="" />
                            <h3 className="card-desc">Geopolitics & Social Awareness</h3>
                        </div>
                        <div className="card">
                            <img src={card3} alt="" />
                            <h3 className="card-desc">Science & Technology</h3>
                        </div>
                        <div className="card">
                            <img src={card4} alt="" />
                            <h3 className="card-desc">Sports & Medicine</h3>
                        </div>
                        <div className="card">
                            <img src={card5} alt="" />
                            <h3 className="card-desc">Renewables & Climate Change</h3>
                        </div>
                    </div>
                    </div>



                    <div className="row df row-center landing-features-slider" style={{flexDirection:"column"}}>
                        <img src={vec_2_mobile} className="genre-vec-2-mobile" alt="" />
                        <LandingPageSlider data={[card1,card2,card3,card4,card5]} dataText={["Policy Making & Financial Literacy","Geopolitics & Social Awareness","Science & Technology","Sports & Medicine","Renewables & Climate Change"]} />
                    </div>
                </div>

                <div className="activity-outer">
                    <div className="activity-inner">

                        <div className="activity-left-col">
                            <div className="activity-txt">
                                <span className="text-underline">Activity</span> Centre
                            </div>
                            <div className="activity-icon-txt">
                                Platform to interact, compete and collaborate with peers across the country.
                            </div>
                            <div className="activity-functionalities">
                                <div className="functionalities ac-func-1">
                                    Inter-school quiz tournaments and leagues.
                                </div>
                                <div className="functionalities ac-func-2">
                                    Weekly Digital Contests - white papers, essays, creative writing, art, debates and  much more.
                                </div>
                                <div className="functionalities ac-func-3">
                                    Monthly E-Magazine for showcasing students’ talents & school activities.
                                </div>
                                <div className="functionalities ac-func-4">
                                    Masterclass sessions with Industry Experts.
                                </div>
                            </div>
                        </div>

                        <div className="activity-right-col">
                            <img src={grp_941} className="qv1" alt="" />
                        </div>
                        
                    </div>
                </div>

                <div className="emagazine-outer">
                    <div className="emagazine-inner">
                        <div className="emagazine-left-col">
                                <div className="emagazine-txt">
                                    <span className="text-underline">E-Magazine</span>
                                </div>
                                <div className="emagazine-txt-2">
                                    For the students, by the students
                                </div>

                                <div className="emagazine-grid">
                                    <div className="emagazine-txt-desc">
                                        The best submissions by students across schools will be compiled in a beautiful E-Magazine every month.
                                    </div> 
                                    <div className="emagazine-txt-desc">
                                        This will be a platform for students to express themselves and showcase their writing and artistic talent for their peers to see. 
                                    </div>
                                    <div className="emagazine-txt-desc">
                                        The E-Magazine will also be a proud memento for parents to cherish and share!
                                    </div>
                                </div>
                        </div>

                        <div className="emagazine-right-col">
                            <img src={grp_94} className="curiopedia1" alt="" />
                        </div>
                    </div>

                </div>

                <div className="masterclass-outer">
                    <div className="masterclass-txt-center">Exclusive&nbsp;

                        <span className="text-underline">Masterclasses</span>

                    </div>
                    <div className="masterclass-inner">
                        <div className="masterclass-left-col">
                            <h2 className="masterclass-txt">
                                Inspire Students
                            </h2>
                            <div className="masterclass-txt-2 place-end">
                                Interact with Industry leaders like
                                <ul className="masterclass-ul">
                                    <li>startup founders</li>
                                    <li>scientists</li>
                                    <li>sportspersons</li>
                                    <li>authors</li>
                                </ul>
                            </div>
                            <h2 className="masterclass-txt">
                                Understand Career Paths
                            </h2>
                            <div className="masterclass-txt-2">
                                Engage with Industry experts from fields like
                                <ul className="masterclass-ul">
                                    <li>tech</li>
                                    <li>medicine</li>
                                    <li>design</li>
                                    <li>management</li>
                                </ul>
                            </div>
                            {/* <div className="functionalities">
                                Recordings of Sessions will be available for 
                                students to watch later
                            </div> */}
                        </div>
                        <div className="masterclass-right-col">
                            <video src={masterclassvid} className="masterclass-video" controls="controls"></video>
                        </div>
                        <div style={{width:"67%",marginTop:"46px"}} className="functionalities">
                                Recordings of Sessions will be available for 
                                students to watch later
                        </div>
                    </div>
                </div>

                <div className="performance-outer">
                    <div className="masterclass-txt-center">
                        <span className="text-underline">Performance & Feedback</span>
                    </div>
                    <div className="performance-inner">

                        <div className="performance-left-col">
                            <div className="functionalities">
                                Students will earn Certificates and Badges for every activity
                            </div>
                            <div className="functionalities">
                                Gauge aptitude of students for different fields
                            </div>
                            <div className="functionalities">
                                Improvement areas for Holistic Growth of students
                            </div>
                            <div className="functionalities">
                                Recommendations for best future Career Directions for a student
                            </div>
                            <div className="functionalities">
                                Subject and topic-wise Reports will be provided on a semesterly basis
                            </div>
                        </div>

                        <div className="performance-right-col">
                            <img src={grp_16} alt="" />
                        </div>
                        
                    </div>
                </div>

                <Footer />
        </div>
        
    )
}
export default Features;

