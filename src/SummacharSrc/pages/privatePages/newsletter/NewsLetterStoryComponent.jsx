import React, { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router"
import { setDateToAppFormat } from "../../../common/helper";
import smallLoader from "../../../assets/images/common/loader_small.gif"
import Slider from "../../../components/Slider";
import Header from "../navbar/Header";
import InnerPopUp from "../../../components/InnerPopUp";
import { Store } from "../../../App";

const NewsLetterStoryComponent = (Props) => {
    const history = useHistory();
    const newsletter = useContext(Store).newsletter;
    const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight })
    const [innerPopUpVisiblity, setInnerPopUpVisiblity] = useState(false);
    const onResize = () => {
        let height = window.innerHeight;
        let width = window.innerWidth;
        // if (width < 768) {
        setWindowSize({ width: width, height: height })
        // } else if (width < 1000) {
        // setWindowSize({ width: width, height: height })
        // } else {
        //     setWindowSize({ width: width, height: height })
        // }
    }
    const data = Props.data;
    
    useEffect(() => {
        onResize();
        window.addEventListener('resize', onResize)
        return () => { return window.removeEventListener('resize', onResize) }
    }, [])
    if (windowSize.width >= 768) {
        return (
            <>
                {/* {Props.loading ? <Loader /> : ( */}
                <div className="row df">
                    <div className="news_popUp_Box df" style={{ boxShadow: "none", width: "100%" ,animation:"none"}}>
                        <div className="news_PopUp_carousal_area df flex-1">
                            <Slider data={data ?? {}}
                                onClick={(option, currentQuizData, currentQuizIndex) => {
                                    if (Object.keys(currentQuizData.attempt).length <= 0) {
                                        if (Object.keys(currentQuizData.attempt).length <= 0) {
                                            
                                            if (newsletter.currentTarget != "") {
                                                newsletter.setQuiz(data.slug ?? "", data.uuid ?? "", currentQuizData.uuid, option, currentQuizIndex)
                                            } else {
                                                // newsletter.setQuiz(data.slug ?? "", data.uuid ?? "", currentQuizData.uuid, option, currentQuizIndex)
                                                const attempt = {
                                                    attempt_answer: option,
                                                    user_points: 0.00,
                                                    is_correct: currentQuizData.answer === option,
                                                    attempt_time: 0,
                                                    attempt_file: null
                                                }
                                                const temp = { ...Props.popUpData }
                                                if (temp) {
                                                    temp.content_associated[Props.popUpdataIndex].slides[currentQuizIndex].attempt = attempt
                                                    Props.setPopUpData(temp);
                                                }

                                            }

                                        }
                                    }
                                }}

                            />
                        </div>
                        <div className="news_popUp_content df flex-1">
                            <h1 className="txt-extraalarge df row">{data.headline ?? ""}</h1>
                            <span className="txt-medium df row txt-secondary">{setDateToAppFormat(data.published_date ?? "")}</span>
                            <p className="txt-medium df row">
                                {data.summary ?? ""}
                            </p>
                            <div className="df space-between row-center row">
                                <div className="df row-center">

                                    {/* {data.has_bookmarked ? (
                                        <button className="functionality_btn df center" onClick={() => { Props.bookMark(false) }}>
                                            {Props.bookMarkLoader ? (<img src={smallLoader} className="fit-content" />) :
                                                (<svg xmlns="http://www.w3.org/2000/svg" width="14" height="18" viewBox="0 0 14 18" fill="none">
                                                    <g >
                                                        <path d="M12 0H2C0.9 0 0 0.9 0 2V18L7 15L14 18V2C14 0.9 13.1 0 12 0ZM11 2H7H2V3C2 2.5 2.45 2 3 2H11C11.55 2 12 2.45 12 3V2H11.5H11Z" fill="#5C56D4" />
                                                    </g>
                                                </svg>)}
                                        </button>
                                    ) : (
                                        <button className="functionality_btn df center" onClick={() => { Props.bookMark(true) }}>
                                            {Props.bookMarkLoader ? (<img src={smallLoader} className="fit-content" />) :
                                                (<svg xmlns="http://www.w3.org/2000/svg" width="14" height="18" viewBox="0 0 14 18" fill="#5C56D4">
                                                    <path d="M12 0H2C0.9 0 0 0.9 0 2V18L7 15L14 18V2C14 0.9 13.1 0 12 0ZM12 15L7 12.82L2 15V3C2 2.45 2.45 2 3 2H11C11.55 2 12 2.45 12 3V15Z" fill="#5C56D4" />
                                                </svg>)}

                                        </button>
                                    )} */}

                                    {data.external_link && (
                                        <a href={data.external_link} className="functionality_btn df center">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="18" viewBox="0 0 22 18" fill="none">
                                                <path d="M20.75 0.773438H15.3875C14.2367 0.773438 13.1117 1.10391 12.1437 1.72734L11 2.46094L9.85625 1.72734C8.88924 1.10403 7.76299 0.772823 6.6125 0.773438H1.25C0.835156 0.773438 0.5 1.10859 0.5 1.52344V14.8359C0.5 15.2508 0.835156 15.5859 1.25 15.5859H6.6125C7.76328 15.5859 8.88828 15.9164 9.85625 16.5398L10.8969 17.2102C10.9273 17.2289 10.9625 17.2406 10.9977 17.2406C11.0328 17.2406 11.068 17.2313 11.0984 17.2102L12.1391 16.5398C13.1094 15.9164 14.2367 15.5859 15.3875 15.5859H20.75C21.1648 15.5859 21.5 15.2508 21.5 14.8359V1.52344C21.5 1.10859 21.1648 0.773438 20.75 0.773438ZM6.6125 13.8984H2.1875V2.46094H6.6125C7.44219 2.46094 8.24844 2.69766 8.94453 3.14531L10.0883 3.87891L10.25 3.98438V14.8125C9.13437 14.2125 7.8875 13.8984 6.6125 13.8984ZM19.8125 13.8984H15.3875C14.1125 13.8984 12.8656 14.2125 11.75 14.8125V3.98438L11.9117 3.87891L13.0555 3.14531C13.7516 2.69766 14.5578 2.46094 15.3875 2.46094H19.8125V13.8984ZM8.30234 5.46094H3.94766C3.85625 5.46094 3.78125 5.54063 3.78125 5.63672V6.69141C3.78125 6.7875 3.85625 6.86719 3.94766 6.86719H8.3C8.39141 6.86719 8.46641 6.7875 8.46641 6.69141V5.63672C8.46875 5.54063 8.39375 5.46094 8.30234 5.46094ZM13.5312 5.63672V6.69141C13.5312 6.7875 13.6062 6.86719 13.6977 6.86719H18.05C18.1414 6.86719 18.2164 6.7875 18.2164 6.69141V5.63672C18.2164 5.54063 18.1414 5.46094 18.05 5.46094H13.6977C13.6062 5.46094 13.5312 5.54063 13.5312 5.63672ZM8.30234 8.74219H3.94766C3.85625 8.74219 3.78125 8.82188 3.78125 8.91797V9.97266C3.78125 10.0688 3.85625 10.1484 3.94766 10.1484H8.3C8.39141 10.1484 8.46641 10.0688 8.46641 9.97266V8.91797C8.46875 8.82188 8.39375 8.74219 8.30234 8.74219ZM18.0523 8.74219H13.6977C13.6062 8.74219 13.5312 8.82188 13.5312 8.91797V9.97266C13.5312 10.0688 13.6062 10.1484 13.6977 10.1484H18.05C18.1414 10.1484 18.2164 10.0688 18.2164 9.97266V8.91797C18.2188 8.82188 18.1438 8.74219 18.0523 8.74219Z" fill="#7671DB" />
                                            </svg>
                                        </a>)}

                                </div>

                            </div>

                            {data.categories && Object.keys(data.categories).length > 0 && (
                                <>
                                    <div className="df row news_popUp_categories_row">
                                        <h1 className="txt-medium txt-secondary"> This story talks about</h1>
                                    </div>
                                    <div className="df row news_popUp_categories_row">
                                        {
                                            Object.keys(data.categories).map((category, index) => {
                                                return (
                                                    <span key={index} className="txt-small news_popUp_category">{category}</span>
                                                )
                                            })
                                        }
                                    </div>
                                </>)
                            }


                        </div>
                    </div>
                </div>
                {/* )} */}
            </>
        )
    } else {
        return (
            <div className="row df row-center" style={{ flexDirection: "column" }}>
                {innerPopUpVisiblity &&
                    <InnerPopUp
                        setVisiblity={(status) => { setInnerPopUpVisiblity(status) }}
                        heading={data.headline}
                        description={data.summary}
                        categories={data.categories}

                    />
                }
                {/* <div className="grayArea fit-content" onClick={() => { history.replace("/news") }}></div> */}
                <div className="news_popUp_Box" style={{ flexDirection: "column" }}>
                    <div className="news_PopUp_carousal_area row  flex-1">
                        <Slider data={data ?? {}}
                            onClick={(option, currentQuizData, currentQuizIndex) => {
                                    if (Object.keys(currentQuizData.attempt).length <= 0) {
                                        if (Object.keys(currentQuizData.attempt).length <= 0) {
                                            
                                            if (newsletter.currentTarget != "") {
                                                newsletter.setQuiz(data.slug ?? "", data.uuid ?? "", currentQuizData.uuid, option, currentQuizIndex)
                                            } else {
                                                // newsletter.setQuiz(data.slug ?? "", data.uuid ?? "", currentQuizData.uuid, option, currentQuizIndex)
                                                const attempt = {
                                                    attempt_answer: option,
                                                    user_points: 0.00,
                                                    is_correct: currentQuizData.answer === option,
                                                    attempt_time: 0,
                                                    attempt_file: null
                                                }
                                                const temp = { ...Props.popUpData }
                                                if (temp) {
                                                    temp.content_associated[Props.popUpdataIndex].slides[currentQuizIndex].attempt = attempt
                                                    Props.setPopUpData(temp);
                                                }

                                            }

                                        }
                                    }
                                }}
                         />
                    </div>

                    <div className="df space-between action_area  row-center row">
                        <div className="df flex-1 row-center">
                            {/* {data.has_bookmarked ? (
                                <button className="functionality_btn df center" onClick={() => { Props.bookMark(false) }}>
                                    {Props.bookMarkLoader ? (<img src={smallLoader} className="fit-content" />) :
                                        (<svg xmlns="http://www.w3.org/2000/svg" width="14" height="18" viewBox="0 0 14 18" fill="none">
                                            <g >
                                                <path d="M12 0H2C0.9 0 0 0.9 0 2V18L7 15L14 18V2C14 0.9 13.1 0 12 0ZM11 2H7H2V3C2 2.5 2.45 2 3 2H11C11.55 2 12 2.45 12 3V2H11.5H11Z" fill="#5C56D4" />
                                            </g>
                                        </svg>)}
                                </button>
                            ) : (
                                <button className="functionality_btn df center" onClick={() => { Props.bookMark(true) }}>
                                    {Props.bookMarkLoader ? (<img src={smallLoader} className="fit-content" />) :
                                        (<svg xmlns="http://www.w3.org/2000/svg" width="14" height="18" viewBox="0 0 14 18" fill="#5C56D4">
                                            <path d="M12 0H2C0.9 0 0 0.9 0 2V18L7 15L14 18V2C14 0.9 13.1 0 12 0ZM12 15L7 12.82L2 15V3C2 2.45 2.45 2 3 2H11C11.55 2 12 2.45 12 3V15Z" fill="#5C56D4" />
                                        </svg>)}

                                </button>
                            )} */}

                            {data.external_link && (
                                <a href={data.external_link} className="functionality_btn df center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="18" viewBox="0 0 22 18" fill="none">
                                        <path d="M20.75 0.773438H15.3875C14.2367 0.773438 13.1117 1.10391 12.1437 1.72734L11 2.46094L9.85625 1.72734C8.88924 1.10403 7.76299 0.772823 6.6125 0.773438H1.25C0.835156 0.773438 0.5 1.10859 0.5 1.52344V14.8359C0.5 15.2508 0.835156 15.5859 1.25 15.5859H6.6125C7.76328 15.5859 8.88828 15.9164 9.85625 16.5398L10.8969 17.2102C10.9273 17.2289 10.9625 17.2406 10.9977 17.2406C11.0328 17.2406 11.068 17.2313 11.0984 17.2102L12.1391 16.5398C13.1094 15.9164 14.2367 15.5859 15.3875 15.5859H20.75C21.1648 15.5859 21.5 15.2508 21.5 14.8359V1.52344C21.5 1.10859 21.1648 0.773438 20.75 0.773438ZM6.6125 13.8984H2.1875V2.46094H6.6125C7.44219 2.46094 8.24844 2.69766 8.94453 3.14531L10.0883 3.87891L10.25 3.98438V14.8125C9.13437 14.2125 7.8875 13.8984 6.6125 13.8984ZM19.8125 13.8984H15.3875C14.1125 13.8984 12.8656 14.2125 11.75 14.8125V3.98438L11.9117 3.87891L13.0555 3.14531C13.7516 2.69766 14.5578 2.46094 15.3875 2.46094H19.8125V13.8984ZM8.30234 5.46094H3.94766C3.85625 5.46094 3.78125 5.54063 3.78125 5.63672V6.69141C3.78125 6.7875 3.85625 6.86719 3.94766 6.86719H8.3C8.39141 6.86719 8.46641 6.7875 8.46641 6.69141V5.63672C8.46875 5.54063 8.39375 5.46094 8.30234 5.46094ZM13.5312 5.63672V6.69141C13.5312 6.7875 13.6062 6.86719 13.6977 6.86719H18.05C18.1414 6.86719 18.2164 6.7875 18.2164 6.69141V5.63672C18.2164 5.54063 18.1414 5.46094 18.05 5.46094H13.6977C13.6062 5.46094 13.5312 5.54063 13.5312 5.63672ZM8.30234 8.74219H3.94766C3.85625 8.74219 3.78125 8.82188 3.78125 8.91797V9.97266C3.78125 10.0688 3.85625 10.1484 3.94766 10.1484H8.3C8.39141 10.1484 8.46641 10.0688 8.46641 9.97266V8.91797C8.46875 8.82188 8.39375 8.74219 8.30234 8.74219ZM18.0523 8.74219H13.6977C13.6062 8.74219 13.5312 8.82188 13.5312 8.91797V9.97266C13.5312 10.0688 13.6062 10.1484 13.6977 10.1484H18.05C18.1414 10.1484 18.2164 10.0688 18.2164 9.97266V8.91797C18.2188 8.82188 18.1438 8.74219 18.0523 8.74219Z" fill="#7671DB" />
                                    </svg>
                                </a>)}

                        </div>
                        <div className="df">
                            <button className="functionality_btn df center" onClick={() => { setInnerPopUpVisiblity(true) }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M10 0C8.02219 0 6.08879 0.58649 4.4443 1.6853C2.79981 2.78412 1.51809 4.3459 0.761209 6.17317C0.00433284 8.00043 -0.193701 10.0111 0.192152 11.9509C0.578004 13.8907 1.53041 15.6725 2.92894 17.0711C4.32746 18.4696 6.10929 19.422 8.0491 19.8079C9.98891 20.1937 11.9996 19.9957 13.8268 19.2388C15.6541 18.4819 17.2159 17.2002 18.3147 15.5557C19.4135 13.9112 20 11.9778 20 10C19.9971 7.34874 18.9425 4.80691 17.0678 2.93219C15.1931 1.05746 12.6513 0.00294858 10 0ZM10 18C8.41775 18 6.87104 17.5308 5.55544 16.6518C4.23985 15.7727 3.21447 14.5233 2.60897 13.0615C2.00347 11.5997 1.84504 9.99113 2.15372 8.43928C2.4624 6.88743 3.22433 5.46197 4.34315 4.34315C5.46197 3.22433 6.88743 2.4624 8.43928 2.15372C9.99113 1.84504 11.5997 2.00346 13.0615 2.60896C14.5233 3.21447 15.7727 4.23984 16.6518 5.55544C17.5308 6.87103 18 8.41775 18 10C17.9976 12.121 17.1539 14.1544 15.6542 15.6542C14.1544 17.1539 12.121 17.9976 10 18ZM10 9.5C9.73479 9.5 9.48043 9.60536 9.2929 9.79289C9.10536 9.98043 9 10.2348 9 10.5V13.5C9 13.7652 9.10536 14.0196 9.2929 14.2071C9.48043 14.3946 9.73479 14.5 10 14.5C10.2652 14.5 10.5196 14.3946 10.7071 14.2071C10.8946 14.0196 11 13.7652 11 13.5V10.5C11 10.2348 10.8946 9.98043 10.7071 9.79289C10.5196 9.60536 10.2652 9.5 10 9.5ZM10 5.5C9.75278 5.5 9.5111 5.57331 9.30554 5.71066C9.09998 5.84801 8.93976 6.04324 8.84516 6.27165C8.75055 6.50005 8.72579 6.75139 8.77402 6.99386C8.82225 7.23634 8.94131 7.45907 9.11612 7.63388C9.29094 7.8087 9.51367 7.92775 9.75614 7.97598C9.99862 8.02421 10.25 7.99946 10.4784 7.90485C10.7068 7.81024 10.902 7.65002 11.0393 7.44446C11.1767 7.2389 11.25 6.99723 11.25 6.75C11.25 6.41848 11.1183 6.10054 10.8839 5.86612C10.6495 5.6317 10.3315 5.5 10 5.5Z" fill="#5C56D4" />
                                </svg>
                            </button>
                        </div>

                    </div>




                </div>
            </div>
        )
    }
}
export default NewsLetterStoryComponent;