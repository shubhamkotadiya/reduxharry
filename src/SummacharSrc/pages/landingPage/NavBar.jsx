// import react from "react";
import logo from '../../assets/images/common/Pathshala_icon.svg';
import '../../assets/css/LandingPage.css';
import '../../assets/css/landingpage-navbar.css';
import hamburger from '../../assets/images/landingpage/hamburger.svg';
import React, { useContext, useEffect, useState } from "react"
import polygon from '../../assets/images/landingpage/Polygon_1.svg';

import { NavLink } from 'react-router-dom';
import { getAuthToken } from '../../common/helper';
// import ScrollShadow from 'react-scroll-shadow';

const NavBar = () => {
    const [hamburgers, openHamburger] = useState(false);
    const [windowSize, setWindowSize] = useState({ width: window.innerWidth });
    const onResize = () => {
        setWindowSize({ width: window.innerWidth })
    }
    useEffect(() => {
        onResize();
        window.addEventListener('resize', onResize)
        return () => { return window.removeEventListener('resize', onResize) }
    }, [])

    return(
        
        // <ScrollShadow>
        <>
           
            <header className="landingpage-navbar-container landingpage-navbar-outer-container">
                <div className="landingpage-navbar-container landingpage-navbar-inner-container">
                    <div className="landingpage-navbar-container landingpage-navbar-logo">
                        <img src={logo} alt="paatshala-logo" />
                    </div>
                    <div className="landingpage-navbar-hamburger-menu" onClick={() => {openHamburger(!hamburgers)}}>
                        <img src={hamburger} alt="" />
                    </div>
                    {/* <img src={polygon} className="landing-navbar-polygon" /> */}
                    <nav className="landingpage-navbar landing-navbar-visible">
                        {
                            windowSize.width <= 850 && hamburgers &&
                            <div className="landingpopUpGrayArea" >
                                <div className="landinggrayArea" onClick={(e) => { openHamburger(!hamburgers) }}></div>

                            </div>
                        }
                        <img src={polygon} className="landing-navbar-polygon" alt="" />

                        {windowSize.width > 850 &&
                            <ul className="landingpage-navbar-container landingpage-navbar-links">
                                <li><NavLink to="/" className="landingpage-navbar-text" exact activeClassName="landing-active">Home</NavLink></li>
                                <li><NavLink to="about" className="landingpage-navbar-text" exact activeClassName="landing-active">About Us</NavLink></li>
                            <li className="paddingRight"><NavLink to="features" className="landingpage-navbar-text" exact activeClassName="landing-active">Features</NavLink></li>
                                {/*<li ><NavLink to="pricing" className="landingpage-navbar-text" exact activeClassName="landing-active">Pricing</NavLink></li>                                */}
                                {!getAuthToken() ? <li className="landingpage-signin">
                                    {/* <div className="signin-animation"> */}
                                        <div className="outer-signin">
                                            <NavLink to="/signin" className="landingpage-navbar-login-btn">Sign In</NavLink>
                                        </div>
                            {/* </div> */}
                            </li> : <li className="landingpage-signin">
                                {/* <div className="signin-animation"> */}
                                        <div className="outer-signin outer-signin-open">
                                            <NavLink to="/home" className="landingpage-navbar-login-btn">Open app</NavLink>
                                        </div>
                                {/* </div> */}
                                
                            </li>
                            }
                            </ul>
                        }
                        {
                        windowSize.width <= 850 && hamburgers && <ul className="landingpage-navbar-container landingpage-navbar-links background-white" >
                        <li><NavLink to="/" className="landingpage-navbar-text" exact activeClassName="landing-active">Home</NavLink></li>
                        <li><NavLink to="about" className="landingpage-navbar-text" exact activeClassName="landing-active">About Us</NavLink></li>
                        <li><NavLink to="features" className="landingpage-navbar-text" exact activeClassName="landing-active">Features</NavLink></li>
                        {/*<li><NavLink to="pricing" className="landingpage-navbar-text" exact activeClassName="landing-active">Pricing</NavLink></li>*/}
                        {/* <li><button className="landingpage-navbar-login-btn">Sign in</button></li> */}
                        {!getAuthToken() ? <li className="landingpage-signin-mobile">
                            {/* <div className="signin-animation"> */}
                                <div className="outer-signin">
                                    <NavLink to="/signin" className="landingpage-navbar-login-btn">Sign In</NavLink>
                                </div>
                            {/* </div> */}
                            </li> : <li className="landingpage-signin-mobile">
                                {/* <div className="signin-animation"> */}
                                    <div className="outer-signin outer-signin-open">
                                        <NavLink to="/home" className="landingpage-navbar-login-btn">Open app</NavLink>
                                    </div>
                                {/* </div> */}
                                
                            </li>
                                }
                    </ul>

                    }
                    </nav>
                </div>
            </header>
            </>
            
        // </ScrollShadow>
        // <header className="landingpage-navbar-container landingpage-navbar-outer-container">
        //     <div className="landingpage-navbar-container landingpage-navbar-inner-container">
        //         <div className="landingpage-navbar-container landingpage-navbar-logo">
        //             <img src={logo} alt="paatshala-logo" />
        //         </div>
        //         <div className="landingpage-navbar-hamburger-menu">
        //             <img src={hamburger} alt="" />
        //         </div>
        //         {/* <img src={polygon} className="landing-navbar-polygon" /> */}
        //         <nav className="landingpage-navbar landing-navbar-visible">
        //         <img src={polygon} className="landing-navbar-polygon" alt="" />
        //             <ul className="landingpage-navbar-container landingpage-navbar-links">
        //                 <li><NavLink to="/" className="landingpage-navbar-text" exact activeClassName="landing-active">Home</NavLink></li>
        //                 <li><NavLink to="about" className="landingpage-navbar-text" exact activeClassName="landing-active">About Us</NavLink></li>
        //                 <li><NavLink to="features" className="landingpage-navbar-text" exact activeClassName="landing-active">Features</NavLink></li>
        //                 <li><NavLink to="pricing" className="landingpage-navbar-text" exact activeClassName="landing-active">Pricing</NavLink></li>
        //                 <li><button className="landingpage-navbar-login-btn">Sign in</button></li>

        //             </ul>
        //         </nav>
        //     </div>
        // </header>
    )
}
export default NavBar;

