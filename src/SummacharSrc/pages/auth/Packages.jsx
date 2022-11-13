
import React, { useContext, useEffect, useState } from "react";
import '../../assets/css/Packages.css';
import confectionary from '../../assets/images/confectionary.gif'
import { Link, useHistory } from "react-router-dom";
import Header from "../landing_page_v2/common/Header";
// import Footer from "../landingPage/Footer";
import { styled } from '@mui/material/styles';
import '../../assets/css/landingpageprice.css'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import PricingListItem from "../landing_page_v2/common/PricingListItem";
import OfferBox from "./OfferBox";
import FeatureList from "../landing_page_v2/common/FeatureList";
import { createTheme, ThemeProvider } from "@mui/material";
import Footer from "../landing_page_v2/component/Footer";
import { isApp, openLink } from "../../common/helper";
// const Item = styled(Paper)(({ theme }) => ({
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: 'center',
//   color: theme.palette.text.secondary,
// }));
const theme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 650,
            md: 720,
            lg: 961,
            xl: 1536,
        },
    },
});
const Packages = (props) => {
    const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight })
    const cardClassName = "landing-page-price-card bg-white pointer  column space-between df row-center fit-content p-secondary p-relative border-primary radius-primary"
    const onResize = () => {
        let height = window.innerHeight;
        let width = window.innerWidth;

        setWindowSize({ width: width, height: height })

    }
    useEffect(() => {
        onResize();
        window.addEventListener('resize', onResize)
        return () => { return window.removeEventListener('resize', onResize) }
    }, [])
    const history = useHistory();

    const [animationTime1, setAnimationTime1] = useState(5);
    const [animationTime2, setAnimationTime2] = useState(5);
    const [animationTime3, setAnimationTime3] = useState(5);
    const [animationTime4, setAnimationTime4] = useState(5);

    const clickAnimStop1 = () => {
        let tempTime = 0.1;
        const timeAnimated = setInterval(() => {
            if (tempTime <= 1.5) {
                tempTime=tempTime+0.1;
                setAnimationTime1(tempTime);
            } else {
                clearInterval(timeAnimated)
            }
        }, 100)
    }
    const clickAnimStop2 = () => {
        let tempTime = 0.1;
        const timeAnimated = setInterval(() => {
            if (tempTime <= 1.5) {
                tempTime=tempTime+0.1;
                setAnimationTime2(tempTime);
            } else {
                clearInterval(timeAnimated)
            }
        }, 100)
    }
    const clickAnimStop3 = () => {
        let tempTime = 0.1;
        const timeAnimated = setInterval(() => {
            if (tempTime <= 1.5) {
                tempTime=tempTime+0.1;
                setAnimationTime3(tempTime);
            } else {
                clearInterval(timeAnimated)
            }
        }, 100)
    }
    const clickAnimStop4 = () => {
        let tempTime = 0.1;
        const timeAnimated = setInterval(() => {
            if (tempTime <= 1.5) {
                tempTime=tempTime+0.1;
                setAnimationTime4(tempTime);
            } else {
                clearInterval(timeAnimated)
            }
        }, 100)
    }

    return (
        <>
            <ThemeProvider theme={theme}>
                <Header>
                    <div id="scrollable" className="fit-content scrollable">
                        <div className="df row" style={{ minHeight: windowSize.height + 'px' }}>
                            {props.plans && Object.keys(props.plans).length > 0 &&
                                <div className="component-container" style={{ marginBottom: "0px" }}>
                                    <div className="row center title-margin df column" style={{ marginTop: "10px" }}>
                                        <span className="row  landing_section_header" >Choose Your Plan</span>
                                    </div>
                                    <div className="df  landing_page_container m-v-primary space-between">
                                        <Grid className=" m-v-primary" style={{ marginTop: "0px" }} container spacing={2}>
                                            {/* { Object.entries(props.plans).map((data, keyIndex)=>{
                                    if(data[1].course==="Class XI Arts"){
                                        
                                    }else if(data[1].course==="Class XI, XII Arts"){

                                    }else{

                                    }

                            }) } */}
                                            <Grid item xs={12} sm={12} md={12} lg={3}>
                                                <div className="fit-content pricing-card df column" onClick={() => {setAnimationTime2(3);setAnimationTime3(3);setAnimationTime4(3); setAnimationTime1(0) }}>
                                                    <div id="tobecovered1" className={(props.selectedPlan.plan === "News and More") ? cardClassName + " landing-page-price-card-selcted" : cardClassName}
                                                        onClick={windowSize.width > 960 ? () => { props.setPlan('News and More', props.plans['News and More'].uuid, props.plans['News and More'].amount_with_gst) } : () => { }}
                                                    >
                                                        {
                                                            animationTime1 <= 1.5 ? (
                                                                <img src={confectionary} onLoad={() => { clickAnimStop1() }} className="cover" />
                                                            ) : (() => { })
                                                        }

                                                        <div className="df row column row-center">
                                                            <h2 className="landing_section_header font-bold row" style={{ textAlign: "center", color: "#ff913d" }}>Explorer</h2>
                                                            <span className="landing_page_content" style={{ color: "#000" }}>1 year access </span>
                                                            <span className="landing_section_sub_header" style={{ textAlign: "center", color: "#000" }}>News & More</span>
                                                        </div>
                                                        <div className="row df">
                                                            <ul className="df column  m-v-primary" style={{ flexWrap: "wrap" }}>

                                                                <PricingListItem fullWidth={true} title={"Daily Infographic News"} />
                                                                <PricingListItem fullWidth={true} title={"Fun Activities"} />
                                                                <PricingListItem fullWidth={true} title={"Best Student Submissions will be showcased"} />

                                                            </ul>
                                                        </div>

                                                        <div className="df column row row-center">
                                                            <h2 className="landing_section_header font-bold">₹{props.amountToString(props.plans['News and More'].amount_with_gst)}</h2>
                                                            <button className="btn-primary buttons-cards-radius radius-primary  typo-btn-primary small-view-visisble" onClick={() => { props.buyNowForMobile(props.plans['News and More'].amount_with_gst, props.plans['News and More'].uuid, 'News and More'); }}>Buy now</button>
                                                            <span className="landing_page_content txt-danger" style={{ color: "#E44E5C" }}> &nbsp;</span>

                                                        </div>


                                                    </div>
                                                    <div className=" row small-view-visisble">
                                                        {/* <FeatureList /> */}
                                                    </div>
                                                </div>

                                            </Grid>
                                            <Grid item xs={12} sm={12} md={12} lg={3}>
                                                <div className="fit-content pricing-card df column of-hidden" >
                                                    <div
                                                        id="tobecovered2"
                                                        className={(props.selectedPlan.plan === "explorer") ? cardClassName + " landing-page-price-card-selcted" : cardClassName}
                                                        onClick={windowSize.width > 960 ? () => { props.setPlan('explorer', "", props.plans['explorer'].amount_with_gst) } : () => { }}
                                                    >

                                                        {
                                                            animationTime2 <= 1.5 ? (
                                                                <img src={confectionary} onLoad={() => { clickAnimStop2() }} className="cover" style={{width:"100%" , height:"100%"}}  />
                                                            ) : (() => { })
                                                        }

                                                        <div className="df row column row-center">
                                                            <h2 className="landing_section_header font-bold row" style={{ textAlign: "center", color: "#304FFD" }}>Hero</h2>
                                                            <span className="landing_page_content" style={{ color: "#000" }}>1 year access </span>
                                                            <span className="landing_section_sub_header" style={{ textAlign: "center", color: "#000" }}>XI Arts 1 Subject</span>
                                                        </div>
                                                        <div className="row df">
                                                            <ul className="df small-column  m-v-primary" style={{ flexWrap: "wrap" }} >

                                                                <PricingListItem isRadio={true}
                                                                    selected={props.selectedPlan.plan === "explorer" && props.selectedPlan.subPlan === "Economics"}
                                                                    onChange={() => { props.setPlan('explorer', props.plans['explorer']['Economics'].uuid, props.plans['explorer']['Economics'].amount_with_gst, "Economics"); setAnimationTime2(0); }}
                                                                    title={"Economics"}

                                                                />
                                                                <PricingListItem isRadio={true}
                                                                    selected={props.selectedPlan.plan === "explorer" && props.selectedPlan.subPlan === "Psychology"}
                                                                    onChange={() => { props.setPlan('explorer', props.plans['explorer']['Psychology'].uuid, props.plans['explorer']['Psychology'].amount_with_gst, "Psychology"); setAnimationTime2(0); }}
                                                                    title={"Psychology"}
                                                                />
                                                                <PricingListItem isRadio={true}
                                                                    selected={props.selectedPlan.plan === "explorer" && props.selectedPlan.subPlan === "History"}
                                                                    onChange={() => { props.setPlan('explorer', props.plans['explorer']['History'].uuid, props.plans['explorer']['History'].amount_with_gst, "History"); setAnimationTime2(0); setAnimationTime1(3);setAnimationTime3(3);setAnimationTime4(3);}}
                                                                    title={"History"}
                                                                />
                                                                <PricingListItem isRadio={true}
                                                                    selected={props.selectedPlan.plan === "explorer" && props.selectedPlan.subPlan === "Geography"}
                                                                    onChange={() => { props.setPlan('explorer', props.plans['explorer']['Geography'].uuid, props.plans['explorer']['Geography'].amount_with_gst, "Geography"); setAnimationTime2(0);setAnimationTime1(3);setAnimationTime3(3);setAnimationTime4(3); }}
                                                                    title={"Geography"}

                                                                />
                                                                <PricingListItem isRadio={true}
                                                                    selected={props.selectedPlan.plan === "explorer" && props.selectedPlan.subPlan === "Political Science"}
                                                                    onChange={() => { props.setPlan('explorer', props.plans['explorer']['Political Science'].uuid, props.plans['explorer']['Political Science'].amount_with_gst, "Political Science"); setAnimationTime2(0); setAnimationTime1(3);setAnimationTime3(3);setAnimationTime4(3);}}
                                                                    title={"Political Science "}
                                                                />
                                                                <PricingListItem isRadio={true}
                                                                    selected={props.selectedPlan.plan === "explorer" && props.selectedPlan.subPlan === "Sociology"}
                                                                    onChange={() => { props.setPlan('explorer', props.plans['explorer']['Sociology'].uuid, props.plans['explorer']['Sociology'].amount_with_gst, "Sociology"); setAnimationTime2(0);setAnimationTime1(3);setAnimationTime3(3);setAnimationTime4(3); }}
                                                                    title={"Sociology"}
                                                                />
                                                            </ul>
                                                        </div>
                                                        <div className="df column row row-center">
                                                            <h2 className="landing_section_header font-bold">₹{props.amountToString(props.plans['explorer'].amount_with_gst)}</h2>
                                                            {(props.selectedPlan.plan != "" && (props.selectedPlan.plan === "explorer")) ? <button className="btn-primary buttons-cards-radius radius-primary  typo-btn-primary small-view-visisble" onClick={() => { props.buyNowForMobile(); }}>Buy now</button> : <button className="btn-primary buttons-cards-radius radius-primary  typo-btn-primary disabled small-view-visisble" onClick={() => { }}>Buy now</button>}
                                                            {windowSize.width > 960 && <span className="landing_page_content txt-danger" style={{ color: "#E44E5C" }} dangerouslySetInnerHTML={{ __html: props.selectedPlan.plan === "explorer" && props.selectedPlan.subPlan === "" ? "Select one subject" : '&nbsp' }} />}
                                                            {windowSize.width <= 960 && <span className="landing_page_content txt-danger" style={{ color: "#E44E5C" }} dangerouslySetInnerHTML={{ __html: props.selectedPlan.plan !== "explorer" ? "Select one subject" : '&nbsp' }} />}

                                                        </div>

                                                    </div>
                                                    <div className=" row small-view-visisble">
                                                        <FeatureList />
                                                    </div>
                                                </div>
                                            </Grid>
                                            <Grid item xs={12} sm={12} md={12} lg={3}>
                                                <div className="fit-content pricing-card df column" onClick={() => { setAnimationTime3(0); setAnimationTime1(3);setAnimationTime2(3);setAnimationTime4(3); }}>
                                                    <div id="tobecovered3" className={(props.selectedPlan.plan === "Class XI Arts") ? cardClassName + " landing-page-price-card-selcted" : cardClassName}
                                                        onClick={windowSize.width > 960 ? () => { props.setPlan('Class XI Arts', props.plans['Class XI Arts'].uuid, props.plans['Class XI Arts'].amount_with_gst) } : () => { }}
                                                    >

                                                        {
                                                            animationTime3 <= 1.5 ? (
                                                                <img src={confectionary} onLoad={() => { clickAnimStop3() }} className="cover" />
                                                            ) : (() => { })
                                                        }

                                                        <div className="df row column row-center">
                                                            <h2 className="landing_section_header font-bold row" style={{ textAlign: "center", color: "#2ABB63" }}>Super Hero</h2>
                                                            <span className="landing_page_content" style={{ color: "#000" }}>1 year access </span>
                                                            <span className="landing_section_sub_header" style={{ textAlign: "center", color: "#000" }}>XI Arts</span>
                                                        </div>
                                                        <div className="row df">
                                                            <ul className="df small-column  m-v-primary" style={{ flexWrap: "wrap" }}>

                                                                <PricingListItem title={"Economics"} />
                                                                <PricingListItem title={"Psychology"} />
                                                                <PricingListItem title={"History"} />
                                                                <PricingListItem title={"Geography"} />
                                                                <PricingListItem title={"Political Science "} />
                                                                <PricingListItem title={"Sociology"} />
                                                            </ul>
                                                        </div>
                                                        <div className="df column row row-center">
                                                            <h2 className="landing_section_header font-bold">₹{props.amountToString(props.plans['Class XI Arts'].amount_with_gst)}</h2>
                                                            <button className="btn-primary buttons-cards-radius radius-primary  typo-btn-primary small-view-visisble" onClick={() => { props.buyNowForMobile(props.plans['Class XI Arts'].amount_with_gst, props.plans['Class XI Arts'].uuid, 'Class XI Arts') }}>Buy now</button>
                                                            <span className="landing_page_content txt-danger" style={{ color: "#E44E5C" }}> &nbsp;</span>

                                                        </div>


                                                    </div>
                                                    <div className=" row small-view-visisble">
                                                        <FeatureList />
                                                    </div>
                                                </div>


                                            </Grid>
                                            <Grid item xs={12} sm={12} md={12} lg={3}>
                                                <div className="fit-content pricing-card df column" onClick={() => { setAnimationTime4(0) ; setAnimationTime1(3);setAnimationTime3(3);setAnimationTime2(3); }}>
                                                    <div id="tobecovered4" className={(props.selectedPlan.plan === "Class XI, XII Arts") ? cardClassName + " landing-page-price-card-selcted" : cardClassName}
                                                        onClick={windowSize.width > 960 ? () => { props.setPlan('Class XI, XII Arts', props.plans['Class XI, XII Arts'].uuid, props.plans['Class XI, XII Arts'].amount_with_gst) } : () => { }}

                                                    >

                                                        {
                                                            animationTime4 <= 1.5 ? (
                                                                <img src={confectionary} onLoad={() => { clickAnimStop4() }} className="cover" />
                                                            ) : (() => { })
                                                        }

                                                        <OfferBox />
                                                        <div className="df row column row-center">
                                                            <h2 className="landing_section_header font-bold row" style={{ textAlign: "center", color: "#E7316F" }}>Legend</h2>
                                                            <span className="landing_page_content" style={{ color: "#000" }}>2 year access </span>
                                                            <span className="landing_section_sub_header" style={{ textAlign: "center", color: "#000" }}>XI & XII Arts</span>
                                                        </div>
                                                        <div className="row df">
                                                            <ul className="df small-column  m-v-primary" style={{ flexWrap: "wrap" }}>

                                                                <PricingListItem title={"Economics"} />
                                                                <PricingListItem title={"Psychology"} />
                                                                <PricingListItem title={"History"} />
                                                                <PricingListItem title={"Geography"} />
                                                                <PricingListItem title={"Political Science "} />
                                                                <PricingListItem title={"Sociology"} />
                                                            </ul>
                                                        </div>
                                                        <div className="df column row row-center">
                                                            <h2 className="landing_section_header font-bold">₹{props.amountToString(props.plans['Class XI, XII Arts'].amount_with_gst)}</h2>
                                                            <button className="btn-primary buttons-cards-radius radius-primary  typo-btn-primary small-view-visisble" onClick={() => { props.buyNowForMobile(props.plans['Class XI, XII Arts'].amount_with_gst, props.plans['Class XI, XII Arts'].uuid, 'Class XI, XII Arts') }}>Buy now</button>
                                                            <span className="landing_page_content txt-danger" style={{ color: "#E7316F" }}> &nbsp;</span>

                                                        </div>

                                                    </div>
                                                    <div className=" row small-view-visisble">
                                                        <FeatureList />
                                                    </div>
                                                </div>
                                            </Grid>
                                            {/* <Grid  item xs={12} sm={12} md={12} lg={3}>
                                            <div className="fit-content pricing-card df column">
                                                <div
                                                    className={(props.selectedPlan.plan === "explorer") ? cardClassName + " landing-page-price-card-selcted" : cardClassName}
                                                    onClick={windowSize.width>960?() => { props.setPlan('explorer', "", props.plans['explorer'].amount_with_gst) }:()=>{}}
                                                >
                                                    <div className="df row column row-center">
                                                        <h2 className="landing_section_header font-bold row" style={{textAlign:"center", color: "#E7316F" }}>Legend</h2>
                                                        <span className="landing_page_content" style={{ color: "#000" }}>1 year access </span>
                                                        <span className="landing_section_sub_header" style={{ textAlign:"center",color: "#000" }}>XI Arts 1 Subject</span>
                                                    </div>
                                                    <ul className="df small-column row m-v-primary" style={{ flexWrap: "wrap" }}>
                                                        <PricingListItem isRadio={true}
                                                            selected={props.selectedPlan.plan === "explorer" && props.selectedPlan.subPlan === "Economics"}
                                                            onChange={() => { props.setPlan('explorer', props.plans['explorer']['Economics'].uuid, props.plans['explorer']['Economics'].amount_with_gst, "Economics") }} title={"Economics"}

                                                        />
                                                        <PricingListItem isRadio={true}
                                                            selected={props.selectedPlan.plan === "explorer" && props.selectedPlan.subPlan === "Psychology"}
                                                            onChange={() => { props.setPlan('explorer', props.plans['explorer']['Psychology'].uuid, props.plans['explorer']['Psychology'].amount_with_gst, "Psychology") }}
                                                            title={"Psychology"} />
                                                        <PricingListItem isRadio={true}
                                                            selected={props.selectedPlan.plan === "explorer" && props.selectedPlan.subPlan === "History"}
                                                            onChange={() => { props.setPlan('explorer', props.plans['explorer']['History'].uuid, props.plans['explorer']['History'].amount_with_gst, "History") }}
                                                            title={"History"} />
                                                        <PricingListItem isRadio={true}
                                                            selected={props.selectedPlan.plan === "explorer" && props.selectedPlan.subPlan === "Geography"}
                                                            onChange={() => { props.setPlan('explorer', props.plans['explorer']['Geography'].uuid, props.plans['explorer']['Geography'].amount_with_gst, "Geography") }}
                                                            title={"Geography"} />
                                                        <PricingListItem isRadio={true}
                                                            selected={props.selectedPlan.plan === "explorer" && props.selectedPlan.subPlan === "Political Science"}
                                                            onChange={() => { props.setPlan('explorer', props.plans['explorer']['Political Science'].uuid, props.plans['explorer']['Political Science'].amount_with_gst, "Political Science") }}
                                                            title={"Political Science "} />
                                                        <PricingListItem isRadio={true}
                                                            selected={props.selectedPlan.plan === "explorer" && props.selectedPlan.subPlan === "Sociology"}
                                                            onChange={() => { props.setPlan('explorer', props.plans['explorer']['Sociology'].uuid, props.plans['explorer']['Sociology'].amount_with_gst, "Sociology") }}
                                                            title={"Sociology"} />
                                                    </ul>
                                                    <div className="df column row row-center">
                                                        <h2 className="landing_section_header font-bold">₹{props.amountToString(props.plans['explorer'].amount_with_gst)}</h2>
                                                        {!(props.selectedPlan.plan != "" && (props.selectedPlan.plan === "explorer" && props.selectedPlan.subPlan === "")) ? <button className="btn-primary buttons-cards-radius radius-primary  typo-btn-primary small-view-visisble" onClick={() => { props.getRazorPayData() }}>Buy now</button> : <button className="btn-primary buttons-cards-radius radius-primary  typo-btn-primary disabled small-view-visisble" onClick={() => { }}>Buy now</button>}
                                                        <span className="landing_page_content txt-danger" style={{ color: "#E44E5C" }}>{props.selectedPlan.plan === "explorer" && props.selectedPlan.subPlan === "" ? "Select one subject" : ''}</span>

                                                    </div>

                                                </div>
                                                <div className=" row small-view-visisble">
                                                    <FeatureList />
                                                </div>
                                            </div>
                                        </Grid> */}

                                        </Grid>
                                    </div>

                                    <div className="df column  landing_page_container small-view-hide space-between">

                                        <div className="row df">
                                            <ul className="df small-column  m-v-primary" style={{ flexWrap: "wrap" }}>

                                                <PricingListItem isStar={true} title={"Study All Arts Stream Subjects for Standards 11 and 12"} />
                                                <PricingListItem isStar={true} title={"Perfect for Last Minute Revision"} />
                                                <PricingListItem isStar={true} title={"Learn Complex Concepts in 2 Minutes"} />

                                                <PricingListItem isStar={true} title={"Vast Question Banks to Help Excel in Exams"} />

                                                <PricingListItem isStar={true} title={"Easy-to-consume Videos, Infographics and Flashcards"} />
                                                <PricingListItem isStar={true} title={"Unlimited Doubt Solving"} />
                                            </ul>
                                        </div>
                                        <div className="df row    m-v-primary center">
                                            <p className="landing_section_sub_header txt-gray " style={{ lineHeight: "100%" }}>To get more than 50% discount through school tie ups contact us at

                                                {isApp() ? <a onClick={() => { openLink() }} className="txt-primary"> {" "}+91 98806 78169</a> : <a href={"tel:+919880678169"} target={"_blank"} className="txt-primary"> +91 98806 78169 </a>}{" "}
                                                or
                                                {isApp() ? <a className="txt-primary" onClick={() => { openLink("mail") }}>{" "} namaskar@summachar.in</a> : <a href={"mailto:namaskar@summachar.in"} className="txt-primary" target={"_blank"}> {" "}namaskar@summachar.in</a>}
                                            </p>
                                        </div>
                                        <div className="df row    m-v-primary center">
                                            <Link to="/signin" className="btn-secondary buttons-cards-radius radius-primary  typo-btn-primary ">Start a FREE Trial</Link>
                                            {(props.selectedPlan.plan != "") ? (props.selectedPlan.plan === "explorer" && props.selectedPlan.subPlan === "") ? <button className="btn-primary buttons-cards-radius disabled radius-primary  typo-btn-primary  m-h-primary" onClick={() => { }} >Buy NOW ₹ {props.amountToString(props.selectedPlan.amount)}</button> : <button className="btn-primary buttons-cards-radius radius-primary  typo-btn-primary  m-h-primary" onClick={() => { props.manageStep() }} >Buy NOW ₹ {props.amountToString(props.selectedPlan.amount)}</button> :
                                                <button className="btn-primary buttons-cards-radius disabled radius-primary  typo-btn-primary  m-h-primary" onClick={() => { }} >Buy NOW ₹ {props.amountToString(props.selectedPlan.amount)}</button>}
                                        </div>
                                    </div>

                                    <div className="df column landing_page_container small-view-visisble">
                                        <div className=" row m-v-primary center">
                                            {windowSize.width > 790 && windowSize.width < 960 &&
                                                <p className="landing_section_sub_header txt-gray " style={{ lineHeight: "120%" }}>To get more than 50% discount through school tie ups contact us at
                                                    {isApp() ? <a style={{ display: "inline" }} onClick={() => { openLink() }} className="txt-primary"> +91&nbsp;9880678169</a> : <a style={{ display: "inline" }} href={"tel:+919880678169"} target={"_blank"} className="txt-primary"> +91&nbsp;9880678169 </a>} or
                                                    {isApp() ? <a style={{ display: "inline" }} onClick={() => { openLink("mail") }} className="txt-primary"> namaskar@summachar.in </a> : <a style={{ display: "inline" }} href={"mailto:namaskar@summachar.in"} className="txt-primary" target={"_blank"}> namaskar@summachar.in </a>}
                                                </p>
                                            }
                                            {windowSize.width <= 790 &&
                                                <p className="landing_section_sub_header txt-gray " style={{ lineHeight: "120%" }}>To get more than 50% discount trough school tie ups contact us at <br />
                                                    {isApp() ? <a style={{ display: "inline" }} onClick={() => { openLink() }} className="txt-primary"> +91&nbsp;9880678169 </a> : <a style={{ display: "inline" }} href={"tel:+919880678169"} target={"_blank"} className="txt-primary"> +91&nbsp;9880678169 </a>} or<br />
                                                    {isApp() ? <a style={{ display: "inline" }} onClick={() => { openLink("mail") }} className="txt-primary"> namaskar@summachar.in </a> : <a style={{ display: "inline" }} href={"mailto:namaskar@summachar.in"} className="txt-primary" target={"_blank"}> namaskar@summachar.in </a>}
                                                </p>
                                            }
                                        </div>
                                        <Link to="/signin" className="btn-secondary buttons-cards-radius radius-primary  m-v-primary row center df  typo-btn-primary ">Start a FREE Trial</Link>
                                    </div>
                                </div>}
                        </div>
                        {!isApp()&&<Footer />}
                    </div>


                </Header>
            </ThemeProvider>
        </>
    )
}
export default Packages;