import React from "react";
import '../../assets/css/LandingPage.css';
import '../../assets/css/landingpage-about.css';
import NavBar from "./NavBar";
import Footer from "./Footer";
import openbook from '../../assets/images/landingpage/Book_1.svg';
import grp_99 from '../../assets/images/landingpage/Group_95.png';

const About = () =>{
    const institutes=['IIT Kanpur','IIT Delhi','IIT Roorkee','IIT Guwahati','IIM Ahmedabad','IIM Indore','IIM Shillong','IIT Jodhpur','IIT Patna','Whistling Woods International, Mumbai','IISER Kolkata','IIFT Delhi','IIM Shillong','Deshbandhu College, DU','NIT Warangal','RVCE Bengaluru','PES Bengaluru','LDCE, Ahmedabad'];
    return(
        <div style={{height: "100%",width: "100%",overflowX: "hidden",overflowY: "scroll"}}>         
            <NavBar />   
            <div className="about-outer">
                <div className="about-inner">
                    <div className="about-left-col">
                        <div className="about-txt">
                            <span className="text-underline">
                                About Us
                            </span>
                        </div>
                        <div className="about-desc">
                            Our vision is to make news an avenue for the youth to gain meaningful knowledge about the real world.
                        </div>
                        <div className="about-desc">
                            Summachar is led by IIT alumni and seasoned professionals with extensive experience in education and deep-tech. We are a young, creative and passionate team looking to revolutionise how news is consumed and working on bringing real-world knowledge and exposure to school students. 
                        </div>
                        <div className="about-desc">
                            Our sister product, Summachar provides a fresh take on news by presenting all important stories and their context in engaging infographics and quizzes. With a rapidly growing user base, it has become the hottest news app for millennials in India.
                        </div>
                    </div>

                    <div className="about-right-col">
                        <img src={grp_99} alt="" className="about-us-img" />
                    </div>
                </div>
            </div>

            <div className="partner-outer">
                <div className="partner-inner">
                    <div className="education-txt">
                        <span className="text-underline">Education Partners</span>
                    </div>
                    <div className="partner-names">{
                        institutes.map(function(data,keyIndex) {
                            return (
                                <div className="institute" key={keyIndex}>{data}</div>
                            )
                        })
                    }
                        
                        {/* <div className="institute">IIT Delhi</div>
                        <div className="institute">IIT Roorkee</div>
                        <div className="institute">IIT Guwahati</div>
                        <div className="institute">IIM Ahmedabad</div>
                        <div className="institute">IIM Indore</div>
                        <div className="institute">IIM Shillong</div>
                        <div className="institute">IIT Jodhpur</div>
                        <div className="institute">IIT Patna</div>
                        <div className="institute">Whistling Woods International, Mumbai</div>
                        <div className="institute">IISER Kolkata</div>
                        <div className="institute">IIFT Delhi</div>
                        <div className="institute">Deshbandhu College, DU</div>
                        <div className="institute">NIT Warangal</div>
                        <div className="institute">RVCE Bengaluru</div>
                        <div className="institute">PES Bengaluru</div>
                        <div className="institute">LDCE, Ahmedabad</div> */}
                    </div>
                    <div className="many-txt">
                        and many more...
                    </div>
                    <div className="book-img">
                        <img src={openbook} alt="" />
                    </div>
                </div>
            </div>

            <Footer />
        </div>
        
    )
}
export default About;

