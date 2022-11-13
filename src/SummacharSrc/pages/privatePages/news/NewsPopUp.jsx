import React, { useContext, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import { setDateToAppFormat, setReadStatus } from "../../../common/helper";
import smallLoader from "../../../assets/images/common/loader_small.gif";
import Slider from "../../../components/Slider";
import Header from "../navbar/Header";
import InnerPopUp from "../../../components/InnerPopUp";
import { Store } from "../../../App";
import HasRead from "../../../components/HasRead";
import BookMarkFilled from "../../../components/icons/BookMarkFilled";
import BookMarkUnFIlled from "../../../components/icons/BookMarkUnFIlled";
import ReactMarkDownCustom from "../../../components/ReactMarkDownCustom";
const NewsPopUp = (Props) => {
    const history = useHistory();
    const news = useContext(Store).news;
    const data = Props.data;
    const [hasQuiestion, setHasQuestion] = useState(false);
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    const [innerPopUpVisiblity, setInnerPopUpVisiblity] = useState(false);
    const onResize = () => {
        let heights = window.innerHeight;
        if (window.innerWidth >= 1280) {
            heights = window.innerHeight - 72;
        } else if (window.innerWidth < 481) {
            heights = window.innerHeight - 48;
        } else if (window.innerWidth < 600) {
            heights = window.innerHeight - 48;
        } else if (window.innerWidth < 700) {
            heights = window.innerHeight - 48;
        } else if (window.innerWidth < 1280) {
            heights = window.innerHeight - 56;
        }
        let width = window.innerWidth;
        setWindowSize({ width: width, height: heights });
    };
    useEffect(() => {
        if (data && Object.keys(data).length > 0) {
            for (let slide of data.slides) {
                if (slide.slide_type === "Question") {
                    setHasQuestion(true);
                    // console.log('soham')
                    break;
                }
            }
        }
    }, []);

    useEffect(() => {
        onResize();
        window.addEventListener("resize", onResize);
        return () => {
            return window.removeEventListener("resize", onResize);
        };
    }, []);


    return (
        <>
            <div className="infographic-main-container centered_outer_container"

                style={{
                    // overflowY:"scroll"
                    // overflowY: (windowSize.width) < 960 ? "scroll" : "visible",
                    // overflowY: (windowSize.width) < 960 ? "scroll" : "visible",
                    // overflowX: "hidden"
                    // overflowY: "scroll",
                }}
            >
                <div className="carousel-container infographic-padding" style={{ paddingTop: 0, paddingBottom: "20px" }} >
                    <div className="fit-content df " >
                        <Slider
                            onRead={() => {
                                if (!data.has_read) {
                                    if (news.currentTarget != "" && news.currentTarget != "from_bookmark") {
                                        news.setRead(data.slug ?? "", data.uuid ?? "");
                                    } else {
                                        const temp = { ...data };
                                        if (temp) {
                                            let total_instory_quiz = 0;
                                            let attepted_quiz = 0;
                                            let read_status = false;
                                            if (!temp.has_read) {
                                                for (let row of temp.slides) {
                                                    if (row.slide_type === "Question") {
                                                        total_instory_quiz += 1;
                                                        if (row.attempt && Object.keys(row.attempt).length > 0) {
                                                            attepted_quiz += 1;
                                                        }
                                                    }
                                                }
                                                if (attepted_quiz === total_instory_quiz) {
                                                    read_status = true;
                                                    temp.read_timestamp = new Date().toISOString()
                                                    setReadStatus(temp.uuid);
                                                }
                                            }
                                            temp.has_read = read_status;

                                            Props.setPopUpData(temp);
                                        }
                                    }
                                }
                            }}
                            onClick={async (option, currentQuizData, currentQuizIndex) => {
                                if (Object.keys(currentQuizData.attempt).length <= 0) {
                                    if (news.currentTarget != "" && news.currentTarget != "from_bookmark") {
                                        await news.setQuiz(data.slug ?? "", data.uuid ?? "", currentQuizData.uuid, option, currentQuizIndex);
                                    } else {
                                        const attempt = {
                                            attempt_answer: option,
                                            user_points: 0.0,
                                            is_correct: currentQuizData.answer === option,
                                            attempt_time: 0,
                                            attempt_file: null,
                                        };
                                        const temp = { ...data };
                                        if (temp) {
                                            temp.slides[currentQuizIndex].attempt = attempt;
                                            let total_instory_quiz = 0;
                                            let attepted_quiz = 0;
                                            let read_status = false;
                                            if (!temp.has_read) {
                                                for (let row of temp.slides) {
                                                    if (row.slide_type === "Question") {
                                                        total_instory_quiz += 1;
                                                        if (row.attempt && Object.keys(row.attempt).length > 0) {
                                                            attepted_quiz += 1;
                                                        }
                                                    }
                                                }
                                                if (attepted_quiz === total_instory_quiz) {
                                                    read_status = true;
                                                    temp.read_timestamp = new Date().toISOString()
                                                    setReadStatus(temp.uuid);
                                                }
                                            }
                                            temp.has_read = read_status;

                                            Props.setPopUpData(temp);
                                        }
                                        await news.setQuiz(data.slug ?? "", data.uuid ?? "", currentQuizData.uuid, option, currentQuizIndex);

                                    }
                                }
                            }}
                            storyHasQuestion={hasQuiestion}
                            data={data}
                        />
                    </div>

                </div>
                <div className="infographic-data infographic-padding" style={{ paddingLeft: windowSize.width > 960 ? 0 : "", paddingTop: 0 }}>
                    <div className="df column fit-content">


                        {windowSize.width < 960 && !Props.hideFunctionButtons &&
                            <div className="df row-center  column-center" style={{ marginTop: 16, marginBottom: 16 }}>
                                {data.has_bookmarked ? (
                                    <BookMarkFilled onClick={() => { Props.bookMark(false); }} />
                                ) : (
                                    <BookMarkUnFIlled onClick={() => { Props.bookMark(true); }} />
                                )}

                                {data.external_link && (
                                    <a href={data.external_link} className="functionality_btn df center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="18" viewBox="0 0 22 18" fill="none">
                                            <path
                                                d="M20.75 0.773438H15.3875C14.2367 0.773438 13.1117 1.10391 12.1437 1.72734L11 2.46094L9.85625 1.72734C8.88924 1.10403 7.76299 0.772823 6.6125 0.773438H1.25C0.835156 0.773438 0.5 1.10859 0.5 1.52344V14.8359C0.5 15.2508 0.835156 15.5859 1.25 15.5859H6.6125C7.76328 15.5859 8.88828 15.9164 9.85625 16.5398L10.8969 17.2102C10.9273 17.2289 10.9625 17.2406 10.9977 17.2406C11.0328 17.2406 11.068 17.2313 11.0984 17.2102L12.1391 16.5398C13.1094 15.9164 14.2367 15.5859 15.3875 15.5859H20.75C21.1648 15.5859 21.5 15.2508 21.5 14.8359V1.52344C21.5 1.10859 21.1648 0.773438 20.75 0.773438ZM6.6125 13.8984H2.1875V2.46094H6.6125C7.44219 2.46094 8.24844 2.69766 8.94453 3.14531L10.0883 3.87891L10.25 3.98438V14.8125C9.13437 14.2125 7.8875 13.8984 6.6125 13.8984ZM19.8125 13.8984H15.3875C14.1125 13.8984 12.8656 14.2125 11.75 14.8125V3.98438L11.9117 3.87891L13.0555 3.14531C13.7516 2.69766 14.5578 2.46094 15.3875 2.46094H19.8125V13.8984ZM8.30234 5.46094H3.94766C3.85625 5.46094 3.78125 5.54063 3.78125 5.63672V6.69141C3.78125 6.7875 3.85625 6.86719 3.94766 6.86719H8.3C8.39141 6.86719 8.46641 6.7875 8.46641 6.69141V5.63672C8.46875 5.54063 8.39375 5.46094 8.30234 5.46094ZM13.5312 5.63672V6.69141C13.5312 6.7875 13.6062 6.86719 13.6977 6.86719H18.05C18.1414 6.86719 18.2164 6.7875 18.2164 6.69141V5.63672C18.2164 5.54063 18.1414 5.46094 18.05 5.46094H13.6977C13.6062 5.46094 13.5312 5.54063 13.5312 5.63672ZM8.30234 8.74219H3.94766C3.85625 8.74219 3.78125 8.82188 3.78125 8.91797V9.97266C3.78125 10.0688 3.85625 10.1484 3.94766 10.1484H8.3C8.39141 10.1484 8.46641 10.0688 8.46641 9.97266V8.91797C8.46875 8.82188 8.39375 8.74219 8.30234 8.74219ZM18.0523 8.74219H13.6977C13.6062 8.74219 13.5312 8.82188 13.5312 8.91797V9.97266C13.5312 10.0688 13.6062 10.1484 13.6977 10.1484H18.05C18.1414 10.1484 18.2164 10.0688 18.2164 9.97266V8.91797C18.2188 8.82188 18.1438 8.74219 18.0523 8.74219Z"
                                                fill="#7671DB"
                                            />
                                        </svg>
                                    </a>
                                )}
                                <HasRead hasRead={data.has_read} />
                            </div>}
                        <div
                            className="infographic-heading"
                            style={{
                                textAlign: "left",
                                // fontFamily: 'Poppins',
                                // fontSize: 20,
                                // fontWeight: 600,
                                // color: "#18181B"
                            }}
                        >
                            {data.headline ?? ""}
                        </div>
                        {
                            <span
                                className="infographic-description"
                                style={{
                                    textAlign: "left",
                                    color: "#b8b8b9",
                                }}
                            >
                                {" "}
                                {setDateToAppFormat(data.published_date ?? "")}
                            </span>}
                        <p
                            className="df row description-text column"
                            style={{
                                textAlign: "left",
                                marginBottom: 32,
                            }}
                        >
                            { }

                            <ReactMarkDownCustom
                                children={data.summary ?? ""}
                            />

                        </p>
                        <div
                            className="df"
                            style={{
                                // flexGrow: 1,
                                flex: 1,
                                paddingBottom: "20px",
                                flexDirection: "column",
                                justifyContent: "flex-end",
                            }}
                        >
                            <div className="df space-between row-center row" style={{}}>
                                {windowSize.width > 960 && !Props.hideFunctionButtons &&
                                    <div className="df row-center  column-center">
                                        {data.has_bookmarked ? (
                                            <BookMarkFilled onClick={() => { Props.bookMark(false); }} />
                                        ) : (
                                            <BookMarkUnFIlled onClick={() => { Props.bookMark(true); }} />
                                        )}

                                        {data.external_link && (
                                            <a href={data.external_link} className="functionality_btn df center">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="18" viewBox="0 0 22 18" fill="none">
                                                    <path
                                                        d="M20.75 0.773438H15.3875C14.2367 0.773438 13.1117 1.10391 12.1437 1.72734L11 2.46094L9.85625 1.72734C8.88924 1.10403 7.76299 0.772823 6.6125 0.773438H1.25C0.835156 0.773438 0.5 1.10859 0.5 1.52344V14.8359C0.5 15.2508 0.835156 15.5859 1.25 15.5859H6.6125C7.76328 15.5859 8.88828 15.9164 9.85625 16.5398L10.8969 17.2102C10.9273 17.2289 10.9625 17.2406 10.9977 17.2406C11.0328 17.2406 11.068 17.2313 11.0984 17.2102L12.1391 16.5398C13.1094 15.9164 14.2367 15.5859 15.3875 15.5859H20.75C21.1648 15.5859 21.5 15.2508 21.5 14.8359V1.52344C21.5 1.10859 21.1648 0.773438 20.75 0.773438ZM6.6125 13.8984H2.1875V2.46094H6.6125C7.44219 2.46094 8.24844 2.69766 8.94453 3.14531L10.0883 3.87891L10.25 3.98438V14.8125C9.13437 14.2125 7.8875 13.8984 6.6125 13.8984ZM19.8125 13.8984H15.3875C14.1125 13.8984 12.8656 14.2125 11.75 14.8125V3.98438L11.9117 3.87891L13.0555 3.14531C13.7516 2.69766 14.5578 2.46094 15.3875 2.46094H19.8125V13.8984ZM8.30234 5.46094H3.94766C3.85625 5.46094 3.78125 5.54063 3.78125 5.63672V6.69141C3.78125 6.7875 3.85625 6.86719 3.94766 6.86719H8.3C8.39141 6.86719 8.46641 6.7875 8.46641 6.69141V5.63672C8.46875 5.54063 8.39375 5.46094 8.30234 5.46094ZM13.5312 5.63672V6.69141C13.5312 6.7875 13.6062 6.86719 13.6977 6.86719H18.05C18.1414 6.86719 18.2164 6.7875 18.2164 6.69141V5.63672C18.2164 5.54063 18.1414 5.46094 18.05 5.46094H13.6977C13.6062 5.46094 13.5312 5.54063 13.5312 5.63672ZM8.30234 8.74219H3.94766C3.85625 8.74219 3.78125 8.82188 3.78125 8.91797V9.97266C3.78125 10.0688 3.85625 10.1484 3.94766 10.1484H8.3C8.39141 10.1484 8.46641 10.0688 8.46641 9.97266V8.91797C8.46875 8.82188 8.39375 8.74219 8.30234 8.74219ZM18.0523 8.74219H13.6977C13.6062 8.74219 13.5312 8.82188 13.5312 8.91797V9.97266C13.5312 10.0688 13.6062 10.1484 13.6977 10.1484H18.05C18.1414 10.1484 18.2164 10.0688 18.2164 9.97266V8.91797C18.2188 8.82188 18.1438 8.74219 18.0523 8.74219Z"
                                                        fill="#7671DB"
                                                    />
                                                </svg>
                                            </a>
                                        )}
                                        <HasRead hasRead={data.has_read} />
                                    </div>}
                                <div>
                                    {/* {data.has_read ? (
                                        <button className="functionality_btn df center" onClick={() => { }}>
                                            <div style={{ height: "20px", width: "20px", borderRadius: "100%", border: "2px solid #5c56d4", background: "#5c56d4" }}>

                                            </div>
                                        </button>
                                    ) : (
                                        <button className="functionality_btn df center" onClick={() => { }}>
                                            <div style={{ height: "20px", width: "20px", borderRadius: "100%", border: "2px solid #5c56d4" }}>

                                            </div>
                                        </button>
                                    )} */}
                                </div>
                            </div>

                            {data.tag_names && data.tag_names.length > 0 && (
                                <>
                                    <div className="df row news_popUp_categories_row">
                                        <h1
                                            className="txt-secondary description-text"
                                            style={{
                                                color: "#777777",
                                            }}
                                        >
                                            This story talks about{" "}
                                        </h1>
                                    </div>
                                    <div className="df row news_popUp_categories_row" style={{ marginTop: 0, marginBottom: (windowSize.width < 960) ? 16 : 0 }}>
                                        {data.tag_names.map((tag, index) => {
                                            return (
                                                <span key={index} className="news_popUp_category metadata-text" style={{ color: "#0c0a29", marginBottom: 0 }}>
                                                    {tag}
                                                </span>
                                            );
                                        })}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
};
export default NewsPopUp;







