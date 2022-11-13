import React, { useEffect } from "react";
import { getTitle, isFreeTrial, setText, isApp, premiumInt } from "../../../common/helper";
import "../../../assets/css/news-letter.css";
import "../../../assets/css/commonImgDivs.css";
import "../../../../src/index.css";
import { Link, useRouteMatch } from "react-router-dom";
import { useState } from "react";
import PremiumPopUp from "../../../components/premiumPop";

const NewsLetterPage = (props) => {

    let [isVisible, changeVisibility] = useState(false);
    let [popupContent, setContent] = useState('');

    const setPopUp = (data) => {
        premiumInt("magazines")
        changeVisibility(!isVisible);
        setContent(data);
    }
    const { path, url } = useRouteMatch();
    return (
        <>
            {isVisible && <PremiumPopUp changeVisibility={changeVisibility} description={popupContent}></PremiumPopUp>}
            {/* <div className="wrapper_container outer_newsletter" id="newsletter_container" onScroll={() => { props.onScroll() }}>
                <div className="letter_container">
                    <div className="newsletter_main_container" > */}
            <div className="news_container" id="newsletter_container" style={{maxHeight:"100%",height:"inherit"}} onScroll={() => props.onScroll()}>
                <div className="outer-main-container">
                    <div className="inner-main-container">
                        {
                            Object.entries(props.data).map(function (data, keyIndex) {
                                return (
                                    <div className="inner_container" key={data[0]}>
                                        <div className="title-div">
                                            <div className="title"><b>{getTitle(data[0])}</b></div>
                                            {/* <div className="grayline"></div> */}
                                        </div>
                                        {
                                            Object.entries(data[1]).map(function (newsletter, uuid) {
                                                return (
                                                    <Link to={url + "/" + newsletter[0]} className="newsletter_container" key={newsletter[0]} >

                                                        <img className="newsletter_image" src={newsletter[1].cover_image} />

                                                        <div className="newsletter_write">
                                                            <div className="newsletter_title">
                                                                {newsletter[1].headline}
                                                            </div>
                                                            <div className="newsletter_content">
                                                                {setText(newsletter[1].summary)}
                                                            </div>
                                                            <div className="newsletter_tags">
                                                                {
                                                                    Object.entries(newsletter[1].categories).map(function (tags, id) {
                                                                        return (< div className="tag" key={tags[1]}>
                                                                            #{tags[0]}
                                                                        </div>)
                                                                    })
                                                                }
                                                            </div>
                                                        </div>




                                                        {

                                                            isFreeTrial() && data[0] != 'latest' &&
                                                            <div className="gray-parda">

                                                                {!isApp() &&
                                                                    <><span className="gray">Enjoy the creativity of students</span>
                                                                    <Link to="/premium" onClick={() => premiumInt("magazines")} className="primary">Go To Premium</Link>
                                                                        <span className="gray">And access all E-magazines!</span>
                                                                    </>
                                                                }

                                                                {isApp() &&
                                                                    <>
                                                                        <span className="gray"><a onClick={() => { setPopUp("This content is for our premium users") }} className="primary">Enjoy </a>the creativity of students
                                                                            and access all E-magazines!</span>
                                                                    </>
                                                                }

                                                            </div>

                                                        }
                                                    </Link >

                                                )
                                            })
                                        }
                                        
                                    </div >

                                )
                            })
                        }

                    </div >
                </div >
            </div >
        </>
    )
}
export default NewsLetterPage;