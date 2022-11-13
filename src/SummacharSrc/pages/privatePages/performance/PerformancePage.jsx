import React, { useEffect, useState, useContext } from "react";
import "../../../assets/css/PerformancePage.css";
import ActivityRings from "./ActivityRings";
import ActivityRings2 from "./ActivityRings2";

import { useLocation, useHistory } from "react-router";

import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import { FormControl, Grid } from "@mui/material";

import axios from "axios";
import apiUrl from "../../../common/apiUrl";
import { getHeaders, getUserUuid, handleError } from "../../../common/helper";

import { Store } from "../../../App";
import { createContext } from "react";
import { Link } from "react-router-dom";

export const infographicReadShowContext = createContext();
export const infographicReadShowContextactivityring2 = createContext();

let subjectWisePerformance = {};
let chapterPerformance = {};
let chapterList = {};

const PerformancePage = (props) => {

    const [loading, setLoading] = useState(true);


    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,

    });
    const onResize = () => {
        let height = window.innerHeight;
        let width = window.innerWidth;

        setWindowSize({ width: width, height: height });

    };



    useEffect(() => {
        onResize();
        window.addEventListener("resize", onResize);
        return () => {
            return window.removeEventListener("resize", onResize);
        };
    }, []);



    // Initial Declarations

    // Values to be passed into performance data
    const [infographicsReadNum, setInfographicsReadNum] = useState(0);
    const [infographicsReadDenom, setInfographicsReadDenom] = useState(0);
    const [infographicsReadPercent, setInfographicsReadPercent] = useState(0);


    const [instoryAttemptedNum, setInstoryAttemptedNum] = useState(0);
    const [instoryAttemptedDenom, setInstoryAttemptedDenom] = useState(0);
    const [instoryAttemptedPercent, setInstoryAttemptedPercent] = useState(0);

    const [instoryAccuracyPercent, setInstoryAccuracyPercent] = useState(0);

    const [minutesWatched, setMinutesWatched] = useState(0);
    const [minutesWatchedPercent, setMinutesWatchedPercent] = useState(0);

    const [quizzesAttempted, setQuizzesAttempted] = useState(0);
    const [averageTimeTaken, setAverageTimeTaken] = useState(0);
    const [quizzAccuracy, setQuizzAccuracy] = useState(0);
    const [quizzTotal, setQuizzTotal] = useState(0);

    const [quizzesAttemptedPercent, setQuizzesAttemptedPercent] = useState(0);
    const [quizAverageTimePercent, setQuizAverageTimePercent] = useState(0);

    const [infographicReadShow, setInfographicReadShow] = useState(true);
    const [instoryquizAttemptShow, setInstoryquizAttemptShow] = useState(true);
    const [instoryquizAccuracyShow, setInstoryquizAccuracyShow] = useState(true);
    const [videosWatchedShow, setVideosWatchedShow] = useState(true);

    const infographicReadShowVal = {
        value: infographicReadShow,
        set: (val) => {
            setInfographicReadShow(val)
        },
        setinstoryquizAttemptShowVal: (val) => {
            setInstoryquizAttemptShow(val)
        },
        setInstoryquizAccuracyShowVal: (val) => {
            setInstoryquizAccuracyShow(val)
        },
        setVideosWatchedShowVal: (val) => {
            setVideosWatchedShow(val);
        },

    }

    const [quizzesAttempt, setQuizzesAttempt] = useState(true);
    const [quizzesAccuracy, setQuizzesAccuracy] = useState(true);
    const [quizAverageTime, setQuizAverageTime] = useState(true);


    const infographicReadShowValactivityring2 = {
        value: infographicReadShow,
        setQuizzesAttemptedVal: (val) => {
            setQuizzesAttempt(val)
        },
        setQuizzesAccuracyVal: (val) => {
            setQuizzesAccuracy(val)
        },
        setQuizAverageTimeVal: (val) => {
            setQuizAverageTime(val)
        },


    }

    // Other declarations
    const location = useLocation();
    const [currentSubject, setCurrentSubject] = useState(location.pathname.split('/')[2]);

    // Setting chapter based on dropdown value
    const [chapter, setChapter] = React.useState('');
    const handleChange = (event) => {
        if (event.target.value === "Overall") {
            setChapter("");
        } else {
            setChapter(event.target.value);
            removeData();
        }
    };
    const history = useHistory()
    const handlechangeForSUbFropDown = (event) => {
        history.replace('/performance/' + event.target.value)
    }

    // Setting current subject based on url
    useEffect(() => {
        // if (location.pathname.split('/')[2] !== undefined) {
        let temp = location.pathname.split('/')[2];
        setCurrentSubject(temp);
        // } else {
        //     setCurrentSubject("");
        // }
        setChapter("");
        removeData();
    }, [location]);


    const [isChapterPerformanceLoading, setIsChapterPerformanceLoading] = useState(true);
    let getChapterPerformance = async (chapter) => {
        await axios({
            url: apiUrl.performanceUrl + currentSubject + "/" + chapter + "?user-uuid=" + getUserUuid(),
            method: "GET",
            headers: getHeaders(),
        }).then((res) => {
            setIsChapterPerformanceLoading(false);
            chapterPerformance[chapter] = res.data;

        }).catch(async (error) => {
            handleError(error)
            setIsChapterPerformanceLoading(true);
        })
    }

    // api call is made here
    useEffect(async () => {
        if (chapter !== "" || chapter === "Overall") {
            if (!chapterPerformance[chapter]) {
                await getChapterPerformance(chapter);
            }
        }
        assignPerformanceData();
    }, [chapter]);

    // const [subjectWisePerformance, setSubjectWisePerformance] = useState({});

    useEffect(async () => {
        // console.log(subjectWisePerformance)
        // console.log("currentSubject", currentSubject, "changed")
        // clearData();
        if (!subjectWisePerformance[currentSubject]) {
            if (currentSubject !== "All") {
                await getSubjectPerformance(currentSubject);

            }
        }
        assignPerformanceData();
    }, [currentSubject]);

    let getSubjectPerformance = async (subject) => {
        await axios({
            url: apiUrl.performanceUrl + subject + "?user-uuid=" + getUserUuid(),
            method: "GET",
            headers: getHeaders(),
        }).then((res) => {
            subjectWisePerformance[subject] = res.data;
        }).catch(async (error) => {
            handleError(error)
        })

    }





    let assignPerformanceData = () => {


        if ((!currentSubject || currentSubject === "All") && !chapter) {
            setInfographicsReadNum(props.performanceData.story_read_count);
            setInfographicsReadDenom(props.performanceData.story_total_count);
            setInfographicsReadPercent(Math.round(100 * props.performanceData.story_read_count / props.performanceData.story_total_count));

            setInstoryAttemptedNum(props.performanceData.instory_ques_attempted_count);
            setInstoryAttemptedDenom(props.performanceData.instory_questions_total_count);
            setInstoryAttemptedPercent(Math.round(100 * props.performanceData.instory_ques_attempted_count / props.performanceData.instory_questions_total_count));

            setInstoryAccuracyPercent(props.performanceData.instory_ques_accuracy);

            setMinutesWatched(props.performanceData.Video_watched_secs);
            setMinutesWatchedPercent(Math.round(100 * props.performanceData.Video_watched_secs / props.performanceData.video_total_secs));

            setQuizzesAttempted(props.performanceData.quiz_attempted_count);
            setAverageTimeTaken(props.performanceData.quiz_avg_time_taken_secs);
            setQuizzAccuracy(props.performanceData.quiz_accuracy);
            setQuizzTotal(props.performanceData.quiz_total_count);

            setQuizzesAttemptedPercent(Math.round(props.performanceData.quiz_attempted_count / props.performanceData.quiz_total_count * 100));
            setQuizAverageTimePercent(Math.round(props.performanceData.quiz_avg_time_taken_secs / props.performanceData.quiz_attempted_count * 100));


        } else if (currentSubject && !chapter) {
            // If there are no chapters but there is a subject
            if (subjectWisePerformance[currentSubject]) {
                // Making sure the value is not undefined
                setInfographicsReadNum(subjectWisePerformance[currentSubject].story_read_count);
                setInfographicsReadDenom(subjectWisePerformance[currentSubject].story_total_count);
                setInfographicsReadPercent(Math.round(100 * subjectWisePerformance[currentSubject].story_read_count / subjectWisePerformance[currentSubject].story_total_count));

                setInstoryAttemptedNum(subjectWisePerformance[currentSubject].instory_ques_attempted_count);
                setInstoryAttemptedDenom(subjectWisePerformance[currentSubject].instory_questions_total_count);
                setInstoryAttemptedPercent(Math.round(100 * subjectWisePerformance[currentSubject].instory_ques_attempted_count / subjectWisePerformance[currentSubject].instory_questions_total_count));

                setInstoryAccuracyPercent(subjectWisePerformance[currentSubject].instory_ques_accuracy);

                setMinutesWatched(subjectWisePerformance[currentSubject].Video_watched_secs);
                setMinutesWatchedPercent(Math.round(100 * subjectWisePerformance[currentSubject].Video_watched_secs / subjectWisePerformance[currentSubject].video_total_secs));

                setQuizzesAttempted(subjectWisePerformance[currentSubject].quiz_attempted_count);
                setAverageTimeTaken(subjectWisePerformance[currentSubject].quiz_avg_time_taken_secs);
                setQuizzAccuracy(subjectWisePerformance[currentSubject].quiz_accuracy);
                setQuizzTotal(subjectWisePerformance[currentSubject].quiz_total_count);

                setQuizzesAttemptedPercent(Math.round(subjectWisePerformance[currentSubject].quiz_attempted_count / subjectWisePerformance[currentSubject].quiz_total_count * 100));
                setQuizAverageTimePercent(Math.round(subjectWisePerformance[currentSubject].quiz_avg_time_taken_secs / subjectWisePerformance[currentSubject].quiz_attempted_count * 100));


            }

        } else if (currentSubject != "" && chapter != "") {

            if (chapterPerformance[chapter]) {

                setInfographicsReadNum(chapterPerformance[chapter].story_read_count);
                setInfographicsReadDenom(chapterPerformance[chapter].story_total_count);
                setInfographicsReadPercent(Math.round(100 * chapterPerformance[chapter].story_read_count / chapterPerformance[chapter].story_total_count));

                setInstoryAttemptedNum(chapterPerformance[chapter].instory_ques_attempted_count);
                setInstoryAttemptedDenom(chapterPerformance[chapter].instory_questions_total_count);
                setInstoryAttemptedPercent(Math.round(100 * chapterPerformance[chapter].instory_ques_attempted_count / chapterPerformance[chapter].instory_questions_total_count));

                setInstoryAccuracyPercent(chapterPerformance[chapter].instory_ques_accuracy);

                setMinutesWatched(chapterPerformance[chapter].Video_watched_secs);
                setMinutesWatchedPercent(Math.round(100 * chapterPerformance[chapter].Video_watched_secs / chapterPerformance[chapter].video_total_secs));

                setQuizzesAttempted(chapterPerformance[chapter].quiz_attempted_count);
                setAverageTimeTaken(chapterPerformance[chapter].quiz_avg_time_taken_secs);
                setQuizzAccuracy(chapterPerformance[chapter].quiz_accuracy);
                setQuizzTotal(chapterPerformance[chapter].quiz_total_count);

                setQuizzesAttemptedPercent(Math.round(chapterPerformance[chapter].quiz_attempted_count / chapterPerformance[chapter].quiz_total_count * 100));
                setQuizAverageTimePercent(Math.round(chapterPerformance[chapter].quiz_avg_time_taken_secs / chapterPerformance[chapter].quiz_attempted_count * 100));
            }
        }
    }

    const context = useContext(Store);
    const subjectList = context.subject.data;

    const [isChapterDataAvailable, setIsChapterDataAvailable] = useState(false);

    const [chapterData, setChapterData] = useState({});

    useEffect(() => {



        // Chapter list is obtained using this
        let getChapterList = async (subject) => {
            await axios({
                url: apiUrl.topicUrl + "?user-uuid=" + getUserUuid() + "&subject=" + subject,
                method: "GET",
                headers: getHeaders(),
            }).then((res) => {
                // setChapterList(...chapterList, { subject: res.data.results });
                // console.log(res.data);
                chapterList[subject] = res.data;
                return res.data
            }).catch(async (error) => {
                handleError(error)
            })
        }

        // Chapter wise performance is obtained here
        let gatherChapterData = async () => {
            for (let i = 0; i < subjectList.length; i++) {


                let subject = subjectList[i];
                await getChapterList(subject.subject_name);
                //console.log(chapterList);
            }
        };

        (async () => {
            await gatherChapterData();
            setChapterData(chapterList);
            setIsChapterDataAvailable(true);


        })();

    }, []);

    let removeData = () => {
        setInfographicsReadNum(0);
        setInfographicsReadDenom(0);
        setInfographicsReadPercent(0);

        setInstoryAttemptedNum(0);
        setInstoryAttemptedDenom(0);
        setInstoryAttemptedPercent(0);

        setInstoryAccuracyPercent(0);

        setMinutesWatched(0);
        setMinutesWatchedPercent(0);

        setQuizzesAttempted(0);
        setAverageTimeTaken(0);
        setQuizzAccuracy(0);
        setQuizzTotal(0);

        setQuizzesAttemptedPercent(0);
        setQuizAverageTimePercent(0);
    }


    return (
        <>

            <div className="wrapper_container performance-wrapper" style={{ color: "#777777", display: "flex", alignItems: "flex-start", padding: "0 32px" }}>
                <div className="performance-title df" style={{ justifyContent: "space-between", alignItems: "center", width: "100%", minHeight: 50, paddingTop: 10 }}>


                    <Grid container className="row" spacing={2}>
                        <Grid container item xs={6}>
                            {props.width <= 960 ?
                                <FormControl size="small">
                                    <InputLabel id="demo-simple-select-label" sx={{
                                        fontFamily: "Poppins, sans-seriff",
                                        backgroundColor: "#FFF",
                                        color: "#777",
                                        // '&:hover': {
                                        //     backgroundColor: "F5f5f5f5",
                                        //     color: "#000"
                                        // },
                                        // height: "50px"
                                    }}>Subject</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        autoWidth
                                        value={currentSubject}
                                        label="Chapter"
                                        onChange={handlechangeForSUbFropDown}
                                        sx={{
                                            width: "200px",
                                            maxWidth: "100%",
                                            // borderRadius: 4,
                                            backgroundColor: "#FFF",
                                            color: "#777",
                                            fontFamily: "Poppins, sans-serif",

                                            height: "50px"
                                        }}
                                        className="border-primary"
                                    >
                                        <MenuItem value={'All'}>

                                            All

                                        </MenuItem>
                                        {subjectList && subjectList.length > 0 &&
                                            subjectList.map((sub, keyIndex) => {
                                                return (
                                                    <MenuItem key={keyIndex} value={sub.subject_name}>

                                                        {sub.subject_name}

                                                    </MenuItem>
                                                );
                                            }
                                            )
                                        }
                                    </Select>
                                </FormControl>
                                :
                                <span className="fit-content df row-center">
                                    Concepts
                                </span>}
                        </Grid>
                        <Grid container item xs={6} style={{ justifyContent: "flex-end" }}>
                            {!(currentSubject == "" || currentSubject == "All") &&
                                <FormControl size="small">
                                    <InputLabel id="demo-simple-select-label" sx={{
                                        fontFamily: "Poppins, sans-seriff",
                                        backgroundColor: "#FFF",
                                        color: "#777",
                                        // '&:hover': {
                                        //     backgroundColor: "F5f5f5f5",
                                        //     color: "#000"
                                        // },
                                        // height: "50px"
                                    }}>Chapter</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        autoWidth
                                        value={chapter == "" ? "Overall" : chapter}
                                        label="Chapter"
                                        onChange={handleChange}
                                        sx={{
                                            width: "200px",
                                            maxWidth: "100%",

                                            backgroundColor: "#FFF",
                                            color: "#777",
                                            fontFamily: "Poppins, sans-serif",

                                            height: "50px"
                                        }}
                                        className="border-primary"
                                    >
                                        <MenuItem value="Overall">
                                            <em>Overall</em>
                                        </MenuItem>
                                        {
                                            isChapterDataAvailable &&
                                            chapterData[currentSubject].map((sub, keyIndex) => {
                                                return (
                                                    <MenuItem key={keyIndex} value={sub.chapter_name}>{sub.sequence_no} {sub.chapter_name}</MenuItem>
                                                );
                                            }
                                            )
                                        }
                                    </Select>
                                </FormControl>
                            }
                        </Grid>
                    </Grid>

                </div>
                <div className="performance-container">
                    <infographicReadShowContext.Provider value={infographicReadShowVal}>
                        <ActivityRings percent1={infographicsReadPercent} percent2={instoryAttemptedPercent} percent3={instoryAccuracyPercent} percent4={minutesWatchedPercent} width={windowSize.width < 960 ? 180 : 250} height={windowSize.width < 960 ? 180 : 250}
                            infographicsRead={infographicsReadNum} infographicsReadTotal={infographicsReadDenom}
                            instoryquizAttempt={instoryAttemptedNum} instoryquizAttemptTotal={instoryAttemptedDenom}
                            instoryquizAccuracy={instoryAccuracyPercent} instoryquizAccuracyTotal={100}
                            videoWatched={Math.round(minutesWatched / 60)}
                            activityRingN0={1}

                        />
                    </infographicReadShowContext.Provider>
                    <div className="performance-data">
                        <div className="performance-data-row">

                            {infographicReadShow && <div className="performance-data-row-item performance-infographics-read performance-data-padding">
                                <div className="performance-svg-text">

                                    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0 12C0 5.37258 5.37258 0 12 0H52C58.6274 0 64 5.37258 64 12V52C64 58.6274 58.6274 64 52 64H12C5.37258 64 0 58.6274 0 52V12Z" fill="#FCE4EC" />
                                        <path d="M40.3101 50H23.6901C21.8547 49.998 20.0951 49.268 18.7973 47.9703C17.4995 46.6725 16.7696 44.9129 16.7676 43.0775V20.9225C16.7696 19.0871 17.4995 17.3275 18.7973 16.0297C20.0951 14.732 21.8547 14.002 23.6901 14H40.3101C42.1454 14.002 43.905 14.732 45.2028 16.0297C46.5006 17.3275 47.2306 19.0871 47.2326 20.9225V43.0775C47.2306 44.9129 46.5006 46.6725 45.2028 47.9703C43.905 49.268 42.1454 49.998 40.3101 50ZM23.6901 16.7675C22.5887 16.7695 21.533 17.2079 20.7542 17.9867C19.9755 18.7654 19.5371 19.8211 19.5351 20.9225V43.0775C19.5371 44.1789 19.9755 45.2346 20.7542 46.0133C21.533 46.7921 22.5887 47.2305 23.6901 47.2325H40.3101C41.4114 47.2305 42.4671 46.7921 43.2459 46.0133C44.0247 45.2346 44.4631 44.1789 44.4651 43.0775V20.9225C44.4631 19.8211 44.0247 18.7654 43.2459 17.9867C42.4671 17.2079 41.4114 16.7695 40.3101 16.7675H23.6901Z" fill="#E7316F" />
                                        <path d="M40.3102 26.8097H23.6902C23.3222 26.8097 22.9693 26.6635 22.7091 26.4033C22.4489 26.1431 22.3027 25.7902 22.3027 25.4222C22.3027 25.0542 22.4489 24.7013 22.7091 24.4411C22.9693 24.1809 23.3222 24.0347 23.6902 24.0347H40.3102C40.6782 24.0347 41.0311 24.1809 41.2913 24.4411C41.5516 24.7013 41.6977 25.0542 41.6977 25.4222C41.6977 25.7902 41.5516 26.1431 41.2913 26.4033C41.0311 26.6635 40.6782 26.8097 40.3102 26.8097Z" fill="#E7316F" />
                                        <path d="M40.3099 32.6078H23.6899C23.3405 32.5821 23.0137 32.4251 22.7753 32.1685C22.5368 31.9118 22.4043 31.5744 22.4043 31.2241C22.4043 30.8737 22.5368 30.5364 22.7753 30.2797C23.0137 30.023 23.3405 29.8661 23.6899 29.8403H40.3099C40.6593 29.8661 40.986 30.023 41.2244 30.2797C41.4629 30.5364 41.5954 30.8737 41.5954 31.2241C41.5954 31.5744 41.4629 31.9118 41.2244 32.1685C40.986 32.4251 40.6593 32.5821 40.3099 32.6078Z" fill="#E7316F" />
                                        <path d="M31.9999 38.2327H23.6899C23.3405 38.2069 23.0137 38.05 22.7753 37.7933C22.5368 37.5366 22.4043 37.1993 22.4043 36.8489C22.4043 36.4986 22.5368 36.1612 22.7753 35.9045C23.0137 35.6479 23.3405 35.4909 23.6899 35.4652H31.9999C32.1901 35.4512 32.3813 35.4765 32.5613 35.5397C32.7413 35.6029 32.9064 35.7025 33.0462 35.8324C33.186 35.9623 33.2975 36.1196 33.3737 36.2945C33.4499 36.4694 33.4893 36.6581 33.4893 36.8489C33.4893 37.0397 33.4499 37.2285 33.3737 37.4034C33.2975 37.5783 33.186 37.7356 33.0462 37.8654C32.9064 37.9953 32.7413 38.0949 32.5613 38.1581C32.3813 38.2213 32.1901 38.2467 31.9999 38.2327Z" fill="#E7316F" />
                                    </svg>
                                    <div className="performance-data-txt">

                                        <span className="performance-numerator performance-big-number" style={{ color: "#E7316F" }}>
                                            {infographicsReadNum}
                                        </span>
                                        /
                                        <span className="performance-denominator typo-title">
                                            {infographicsReadDenom}
                                        </span>
                                    </div>
                                </div>

                                <div className="typo-Description">
                                    Infographics read
                                </div>
                            </div>}
                            {!infographicReadShow && <div className="performance-data-row-item performance-infographics-read performance-data-padding">
                                <div className="performance-svg-text">

                                    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0 12C0 5.37258 5.37258 0 12 0H52C58.6274 0 64 5.37258 64 12V52C64 58.6274 58.6274 64 52 64H12C5.37258 64 0 58.6274 0 52V12Z" fill="#e5e5e5" />
                                        <path d="M40.3101 50H23.6901C21.8547 49.998 20.0951 49.268 18.7973 47.9703C17.4995 46.6725 16.7696 44.9129 16.7676 43.0775V20.9225C16.7696 19.0871 17.4995 17.3275 18.7973 16.0297C20.0951 14.732 21.8547 14.002 23.6901 14H40.3101C42.1454 14.002 43.905 14.732 45.2028 16.0297C46.5006 17.3275 47.2306 19.0871 47.2326 20.9225V43.0775C47.2306 44.9129 46.5006 46.6725 45.2028 47.9703C43.905 49.268 42.1454 49.998 40.3101 50ZM23.6901 16.7675C22.5887 16.7695 21.533 17.2079 20.7542 17.9867C19.9755 18.7654 19.5371 19.8211 19.5351 20.9225V43.0775C19.5371 44.1789 19.9755 45.2346 20.7542 46.0133C21.533 46.7921 22.5887 47.2305 23.6901 47.2325H40.3101C41.4114 47.2305 42.4671 46.7921 43.2459 46.0133C44.0247 45.2346 44.4631 44.1789 44.4651 43.0775V20.9225C44.4631 19.8211 44.0247 18.7654 43.2459 17.9867C42.4671 17.2079 41.4114 16.7695 40.3101 16.7675H23.6901Z" fill="#b8b8b9" />
                                        <path d="M40.3102 26.8097H23.6902C23.3222 26.8097 22.9693 26.6635 22.7091 26.4033C22.4489 26.1431 22.3027 25.7902 22.3027 25.4222C22.3027 25.0542 22.4489 24.7013 22.7091 24.4411C22.9693 24.1809 23.3222 24.0347 23.6902 24.0347H40.3102C40.6782 24.0347 41.0311 24.1809 41.2913 24.4411C41.5516 24.7013 41.6977 25.0542 41.6977 25.4222C41.6977 25.7902 41.5516 26.1431 41.2913 26.4033C41.0311 26.6635 40.6782 26.8097 40.3102 26.8097Z" fill="#b8b8b9" />
                                        <path d="M40.3099 32.6078H23.6899C23.3405 32.5821 23.0137 32.4251 22.7753 32.1685C22.5368 31.9118 22.4043 31.5744 22.4043 31.2241C22.4043 30.8737 22.5368 30.5364 22.7753 30.2797C23.0137 30.023 23.3405 29.8661 23.6899 29.8403H40.3099C40.6593 29.8661 40.986 30.023 41.2244 30.2797C41.4629 30.5364 41.5954 30.8737 41.5954 31.2241C41.5954 31.5744 41.4629 31.9118 41.2244 32.1685C40.986 32.4251 40.6593 32.5821 40.3099 32.6078Z" fill="#b8b8b9" />
                                        <path d="M31.9999 38.2327H23.6899C23.3405 38.2069 23.0137 38.05 22.7753 37.7933C22.5368 37.5366 22.4043 37.1993 22.4043 36.8489C22.4043 36.4986 22.5368 36.1612 22.7753 35.9045C23.0137 35.6479 23.3405 35.4909 23.6899 35.4652H31.9999C32.1901 35.4512 32.3813 35.4765 32.5613 35.5397C32.7413 35.6029 32.9064 35.7025 33.0462 35.8324C33.186 35.9623 33.2975 36.1196 33.3737 36.2945C33.4499 36.4694 33.4893 36.6581 33.4893 36.8489C33.4893 37.0397 33.4499 37.2285 33.3737 37.4034C33.2975 37.5783 33.186 37.7356 33.0462 37.8654C32.9064 37.9953 32.7413 38.0949 32.5613 38.1581C32.3813 38.2213 32.1901 38.2467 31.9999 38.2327Z" fill="#b8b8b9" />
                                    </svg>
                                    <div className="performance-data-txt">

                                        <span className="performance-numerator performance-big-number" style={{ color: "#e5e5e5" }}>
                                            {infographicsReadNum}
                                        </span>
                                        <span style={{ color: "#e5e5e5" }}>
                                            /
                                        </span>
                                        <span className="performance-denominator typo-title" style={{ color: "#e5e5e5" }}>
                                            {infographicsReadDenom}
                                        </span>
                                    </div>
                                </div>

                                <div className="typo-Description" style={{ color: "#e5e5e5" }}>
                                    Infographics read
                                </div>
                            </div>}

                            {instoryquizAttemptShow &&
                                <div className="performance-data-row-item performance-quiz-attempted performance-data-padding typo-Description">
                                    <div className="performance-svg-text">


                                        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M0 12C0 5.37258 5.37258 0 12 0H52C58.6274 0 64 5.37258 64 12V52C64 58.6274 58.6274 64 52 64H12C5.37258 64 0 58.6274 0 52V12Z" fill="#E1F3FF" />
                                            <path d="M18.9797 25.7302C19.3162 22.2946 20.9987 19.1317 23.6597 16.9327V17.0002C25.4131 15.5586 27.5106 14.5966 29.7471 14.2084C31.9836 13.8202 34.2826 14.019 36.4192 14.7854C38.5559 15.5518 40.4571 16.8595 41.937 18.5807C43.4169 20.302 44.4248 22.3778 44.8622 24.6052C45.2164 26.5162 45.1524 28.4813 44.6747 30.3652C44.1833 32.2413 43.2874 33.9871 42.0497 35.4802C40.898 36.788 40.2377 38.456 40.1822 40.1977V45.1102C40.1822 45.7542 40.0549 46.392 39.8078 46.9867C39.5606 47.5815 39.1984 48.1215 38.742 48.5759C38.2855 49.0303 37.7438 49.39 37.1479 49.6344C36.552 49.8789 35.9137 50.0031 35.2697 50.0002H28.7147C28.0718 50.0021 27.4348 49.8772 26.8403 49.6327C26.2457 49.3882 25.7052 49.0288 25.2497 48.5752C24.3328 47.6544 23.8155 46.4096 23.8097 45.1102V40.5052C23.7586 38.5784 23.0522 36.7266 21.8072 35.2552C19.6463 32.5768 18.6302 29.1537 18.9797 25.7302ZM27.0872 45.1102C27.0911 45.5406 27.2638 45.9523 27.5682 46.2567C27.8725 46.561 28.2842 46.7338 28.7147 46.7377H35.2697C35.7014 46.7357 36.115 46.5639 36.421 46.2593C36.727 45.9547 36.9007 45.5419 36.9047 45.1102V43.4602H27.0872V45.1102ZM24.3497 33.2452C26 35.1997 26.9618 37.6427 27.0872 40.1977H30.3647V35.2702C30.3612 35.0562 30.4021 34.8437 30.4847 34.6463C30.5673 34.4488 30.6899 34.2705 30.8447 34.1227C30.9955 33.9698 31.1754 33.8486 31.3737 33.7661C31.5721 33.6837 31.7849 33.6417 31.9997 33.6427C32.4371 33.645 32.8566 33.8171 33.1697 34.1227C33.4698 34.429 33.6369 34.8414 33.6347 35.2702V40.1977H36.9122C36.9502 37.6901 37.8657 35.2752 39.4997 33.3727C40.5834 32.0799 41.3168 30.5304 41.6297 28.8727C41.9266 27.1986 41.7898 25.4764 41.2322 23.8702C40.6766 22.2736 39.7181 20.8476 38.4497 19.7302C37.1652 18.61 35.6165 17.8356 33.9497 17.4802C32.5201 17.1934 31.0448 17.2267 29.6297 17.5777C28.2086 17.91 26.884 18.5672 25.7597 19.4977C24.6231 20.4156 23.7101 21.58 23.0897 22.9027C22.467 24.2179 22.1442 25.655 22.1447 27.1102C22.1396 29.3501 22.9199 31.5209 24.3497 33.2452Z" fill="#348FD9" />
                                        </svg>
                                        <div className="performance-data-txt">

                                            <span className="performance-numerator performance-big-number" style={{ color: "#017DCB" }}>
                                                {instoryAttemptedNum}
                                            </span>
                                            /
                                            <span className="performance-denominator typo-title">
                                                {instoryAttemptedDenom}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="typo-Description">
                                        In-story quizzes attempted
                                    </div>
                                </div>
                            }
                            {!instoryquizAttemptShow &&
                                <div className="performance-data-row-item performance-quiz-attempted performance-data-padding typo-Description">
                                    <div className="performance-svg-text">


                                        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M0 12C0 5.37258 5.37258 0 12 0H52C58.6274 0 64 5.37258 64 12V52C64 58.6274 58.6274 64 52 64H12C5.37258 64 0 58.6274 0 52V12Z" fill="#e5e5e5" />
                                            <path d="M18.9797 25.7302C19.3162 22.2946 20.9987 19.1317 23.6597 16.9327V17.0002C25.4131 15.5586 27.5106 14.5966 29.7471 14.2084C31.9836 13.8202 34.2826 14.019 36.4192 14.7854C38.5559 15.5518 40.4571 16.8595 41.937 18.5807C43.4169 20.302 44.4248 22.3778 44.8622 24.6052C45.2164 26.5162 45.1524 28.4813 44.6747 30.3652C44.1833 32.2413 43.2874 33.9871 42.0497 35.4802C40.898 36.788 40.2377 38.456 40.1822 40.1977V45.1102C40.1822 45.7542 40.0549 46.392 39.8078 46.9867C39.5606 47.5815 39.1984 48.1215 38.742 48.5759C38.2855 49.0303 37.7438 49.39 37.1479 49.6344C36.552 49.8789 35.9137 50.0031 35.2697 50.0002H28.7147C28.0718 50.0021 27.4348 49.8772 26.8403 49.6327C26.2457 49.3882 25.7052 49.0288 25.2497 48.5752C24.3328 47.6544 23.8155 46.4096 23.8097 45.1102V40.5052C23.7586 38.5784 23.0522 36.7266 21.8072 35.2552C19.6463 32.5768 18.6302 29.1537 18.9797 25.7302ZM27.0872 45.1102C27.0911 45.5406 27.2638 45.9523 27.5682 46.2567C27.8725 46.561 28.2842 46.7338 28.7147 46.7377H35.2697C35.7014 46.7357 36.115 46.5639 36.421 46.2593C36.727 45.9547 36.9007 45.5419 36.9047 45.1102V43.4602H27.0872V45.1102ZM24.3497 33.2452C26 35.1997 26.9618 37.6427 27.0872 40.1977H30.3647V35.2702C30.3612 35.0562 30.4021 34.8437 30.4847 34.6463C30.5673 34.4488 30.6899 34.2705 30.8447 34.1227C30.9955 33.9698 31.1754 33.8486 31.3737 33.7661C31.5721 33.6837 31.7849 33.6417 31.9997 33.6427C32.4371 33.645 32.8566 33.8171 33.1697 34.1227C33.4698 34.429 33.6369 34.8414 33.6347 35.2702V40.1977H36.9122C36.9502 37.6901 37.8657 35.2752 39.4997 33.3727C40.5834 32.0799 41.3168 30.5304 41.6297 28.8727C41.9266 27.1986 41.7898 25.4764 41.2322 23.8702C40.6766 22.2736 39.7181 20.8476 38.4497 19.7302C37.1652 18.61 35.6165 17.8356 33.9497 17.4802C32.5201 17.1934 31.0448 17.2267 29.6297 17.5777C28.2086 17.91 26.884 18.5672 25.7597 19.4977C24.6231 20.4156 23.7101 21.58 23.0897 22.9027C22.467 24.2179 22.1442 25.655 22.1447 27.1102C22.1396 29.3501 22.9199 31.5209 24.3497 33.2452Z" fill="#b8b8b9" />
                                        </svg>
                                        <div className="performance-data-txt">

                                            <span className="performance-numerator performance-big-number" style={{ color: "#e5e5e5" }}>
                                                {instoryAttemptedNum}
                                            </span>
                                            <span style={{ color: "#e5e5e5" }}>/</span>
                                            <span className="performance-denominator typo-title" style={{ color: "#e5e5e5" }}>
                                                {instoryAttemptedDenom}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="typo-Description" style={{ color: "#e5e5e5" }}>
                                        In-story quizzes attempted
                                    </div>
                                </div>
                            }

                        </div>
                        <div className="performance-data-row">

                            {instoryquizAccuracyShow &&
                                <div className="performance-data-row-item performance-accuracy performance-data-padding">
                                    <div className="performance-svg-text">
                                        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M0 12C0 5.37258 5.37258 0 12 0H52C58.6274 0 64 5.37258 64 12V52C64 58.6274 58.6274 64 52 64H12C5.37258 64 0 58.6274 0 52V12Z" fill="#E1FEFD" />
                                            <path d="M42.395 23.4048L40.25 25.5648C42.7271 28.2031 44.0773 31.7037 44.0136 35.3222C43.9498 38.9406 42.477 42.3914 39.9085 44.9409C37.3399 47.4903 33.8782 48.9373 30.2594 48.974C26.6406 49.0108 23.1502 47.6345 20.5304 45.1377C17.9105 42.641 16.368 39.2208 16.2307 35.6044C16.0934 31.988 17.3723 28.4607 19.7952 25.7726C22.2182 23.0844 25.5943 21.4474 29.2054 21.2097C32.8166 20.972 36.3781 22.1524 39.1325 24.4998L41.3075 22.3323C38.044 19.3734 33.752 17.8094 29.3499 17.9748C24.9478 18.1402 20.7853 20.022 17.7531 23.2174C14.7208 26.4129 13.0596 30.6682 13.1249 35.0729C13.1902 39.4776 14.9769 43.6818 18.1026 46.7859C21.2282 49.89 25.4447 51.6475 29.8497 51.6824C34.2548 51.7172 38.4985 50.0266 41.6729 46.9723C44.8473 43.918 46.7002 39.7425 46.8351 35.3394C46.9701 30.9363 45.3764 26.6553 42.395 23.4123V23.4048Z" fill="#05948F" />
                                            <path d="M38.0605 27.7327L35.893 29.9002C37.1417 31.4068 37.7635 33.3356 37.63 35.2878C37.4966 37.24 36.6179 39.0663 35.1758 40.3888C33.7337 41.7114 31.8385 42.4292 29.8821 42.3937C27.9256 42.3583 26.0577 41.5722 24.6644 40.1983C23.2712 38.8243 22.4594 36.9674 22.3967 35.0116C22.3341 33.0559 23.0255 31.1509 24.3279 29.6906C25.6303 28.2302 27.4442 27.3263 29.3943 27.1657C31.3445 27.0051 33.2818 27.6001 34.8055 28.8277L36.973 26.6602C34.8653 24.8594 32.1409 23.9467 29.3737 24.1143C26.6064 24.282 24.0122 25.5169 22.1372 27.559C20.2623 29.6011 19.2529 32.2912 19.3217 35.0626C19.3904 37.8341 20.5319 40.4708 22.5058 42.4174C24.4797 44.3641 27.1319 45.4689 29.9041 45.4991C32.6763 45.5294 35.352 44.4827 37.3679 42.5796C39.3838 40.6764 40.5825 38.0653 40.7117 35.296C40.8409 32.5267 39.8905 29.8153 38.0605 27.7327Z" fill="#05948F" />
                                            <path d="M33.0653 34.79C33.0653 35.3952 32.8858 35.9868 32.5496 36.49C32.2134 36.9932 31.7355 37.3855 31.1763 37.6171C30.6172 37.8487 30.0019 37.9093 29.4083 37.7912C28.8148 37.6731 28.2695 37.3817 27.8416 36.9537C27.4136 36.5258 27.1222 35.9805 27.0041 35.387C26.886 34.7934 26.9466 34.1781 27.1782 33.619C27.4098 33.0598 27.8021 32.5819 28.3053 32.2457C28.8085 31.9095 29.4001 31.73 30.0053 31.73C30.5315 31.7286 31.0488 31.8657 31.5053 32.1275L29.4278 34.205C29.3552 34.275 29.2975 34.3588 29.2581 34.4516C29.2186 34.5444 29.1983 34.6442 29.1983 34.745C29.1983 34.8458 29.2186 34.9456 29.2581 35.0384C29.2975 35.1311 29.3552 35.215 29.4278 35.285C29.4975 35.3581 29.5813 35.4164 29.6741 35.4564C29.7669 35.4963 29.8668 35.5171 29.9678 35.5175C30.0676 35.5161 30.1661 35.4948 30.2575 35.4549C30.3489 35.415 30.4315 35.3572 30.5003 35.285L32.6078 33.185C32.9091 33.666 33.0677 34.2225 33.0653 34.79Z" fill="#05948F" />
                                            <path d="M47.7257 16.5728L41.6641 22.645L42.0728 23.053L48.1344 16.9807L47.7257 16.5728Z" fill="white" />
                                            <path d="M30.1706 34.9553L29.7656 34.5503L31.9331 32.3828L32.3381 32.7878L30.1706 34.9553Z" fill="white" />
                                            <path d="M53.1943 16.8126L47.7493 22.2501L43.0168 22.7826L42.3643 23.4351L40.2493 25.5651L38.0893 27.7326L35.8918 29.9001L32.6068 33.1851L30.4993 35.2851C30.4305 35.3573 30.3479 35.4151 30.2565 35.455C30.165 35.4949 30.0665 35.5162 29.9668 35.5176C29.8658 35.5172 29.7658 35.4964 29.6731 35.4564C29.5803 35.4165 29.4965 35.3582 29.4268 35.2851C29.3542 35.2151 29.2965 35.1312 29.257 35.0385C29.2176 34.9457 29.1973 34.8459 29.1973 34.7451C29.1973 34.6443 29.2176 34.5445 29.257 34.4517C29.2965 34.3589 29.3542 34.275 29.4268 34.2051L31.5043 32.1276L36.9718 26.6601L39.1318 24.5001L41.3068 22.3326L41.9668 21.6726L42.4993 16.9251L47.9143 11.5176L47.3743 16.2501C47.4447 16.1703 47.5312 16.1064 47.6282 16.0626C47.7252 16.0188 47.8304 15.9962 47.9368 15.9962C48.0432 15.9962 48.1484 16.0188 48.2454 16.0626C48.3423 16.1064 48.4289 16.1703 48.4993 16.2501C48.5707 16.3199 48.6275 16.4033 48.6662 16.4954C48.705 16.5875 48.7249 16.6864 48.7249 16.7863C48.7249 16.8862 48.705 16.9851 48.6662 17.0772C48.6275 17.1693 48.5707 17.2527 48.4993 17.3226L53.1943 16.8126Z" fill="#05948F" />
                                            <path d="M29.9674 35.8025C29.8277 35.803 29.6893 35.7753 29.5604 35.7212C29.4316 35.6671 29.3149 35.5876 29.2174 35.4875C29.1163 35.3908 29.0361 35.2743 28.9819 35.1453C28.9277 35.0163 28.9007 34.8775 28.9024 34.7375C28.902 34.5978 28.9296 34.4594 28.9838 34.3305C29.0379 34.2017 29.1173 34.085 29.2174 33.9875L41.6899 21.5L42.2224 16.7675L48.2824 10.7075L47.7499 15.755C47.9205 15.7231 48.0963 15.733 48.2622 15.7839C48.4281 15.8349 48.5792 15.9253 48.7024 16.0475C48.8026 16.1446 48.8816 16.2613 48.9345 16.3904C48.9874 16.5195 49.0131 16.6581 49.0099 16.7975C49.0136 16.865 49.0136 16.9326 49.0099 17L54.0199 16.445L47.9599 22.505L43.1749 23L30.7099 35.4875C30.6141 35.5877 30.4988 35.6674 30.3711 35.7215C30.2435 35.7757 30.1061 35.8032 29.9674 35.8025ZM42.7699 17.0525L42.2374 21.785L29.6299 34.4075C29.5544 34.4989 29.5153 34.615 29.5203 34.7334C29.5252 34.8518 29.5738 34.9643 29.6567 35.049C29.7396 35.1338 29.8509 35.1848 29.9692 35.1924C30.0875 35.2 30.2044 35.1635 30.2974 35.09L42.9124 22.475L47.6524 21.95L52.4149 17.1875L47.7499 17.705L48.2899 17.135C48.3379 17.091 48.3765 17.0377 48.4036 16.9785C48.4307 16.9192 48.4456 16.8551 48.4474 16.79C48.4464 16.6631 48.3952 16.5418 48.3049 16.4525C48.2121 16.3666 48.0902 16.3189 47.9637 16.3189C47.8372 16.3189 47.7153 16.3666 47.6224 16.4525L46.9999 17L47.5249 12.2675L42.7699 17.0525Z" fill="white" />
                                        </svg>
                                        <div className="performance-data-txt">

                                            <span className="performance-numerator performance-big-number" style={{ color: "#05948F" }}>
                                                {instoryAccuracyPercent}
                                            </span>
                                            <span className="performance-denominator typo-title">
                                                %
                                            </span>
                                        </div>

                                    </div>
                                    <div className="typo-Description">
                                        Accuracy of in-story quizzes
                                    </div>
                                </div>
                            }
                            {!instoryquizAccuracyShow &&
                                <div className="performance-data-row-item performance-accuracy performance-data-padding">
                                    <div className="performance-svg-text">
                                        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M0 12C0 5.37258 5.37258 0 12 0H52C58.6274 0 64 5.37258 64 12V52C64 58.6274 58.6274 64 52 64H12C5.37258 64 0 58.6274 0 52V12Z" fill="#e5e5e5" />
                                            <path d="M42.395 23.4048L40.25 25.5648C42.7271 28.2031 44.0773 31.7037 44.0136 35.3222C43.9498 38.9406 42.477 42.3914 39.9085 44.9409C37.3399 47.4903 33.8782 48.9373 30.2594 48.974C26.6406 49.0108 23.1502 47.6345 20.5304 45.1377C17.9105 42.641 16.368 39.2208 16.2307 35.6044C16.0934 31.988 17.3723 28.4607 19.7952 25.7726C22.2182 23.0844 25.5943 21.4474 29.2054 21.2097C32.8166 20.972 36.3781 22.1524 39.1325 24.4998L41.3075 22.3323C38.044 19.3734 33.752 17.8094 29.3499 17.9748C24.9478 18.1402 20.7853 20.022 17.7531 23.2174C14.7208 26.4129 13.0596 30.6682 13.1249 35.0729C13.1902 39.4776 14.9769 43.6818 18.1026 46.7859C21.2282 49.89 25.4447 51.6475 29.8497 51.6824C34.2548 51.7172 38.4985 50.0266 41.6729 46.9723C44.8473 43.918 46.7002 39.7425 46.8351 35.3394C46.9701 30.9363 45.3764 26.6553 42.395 23.4123V23.4048Z" fill="#b8b8b9" />
                                            <path d="M38.0605 27.7327L35.893 29.9002C37.1417 31.4068 37.7635 33.3356 37.63 35.2878C37.4966 37.24 36.6179 39.0663 35.1758 40.3888C33.7337 41.7114 31.8385 42.4292 29.8821 42.3937C27.9256 42.3583 26.0577 41.5722 24.6644 40.1983C23.2712 38.8243 22.4594 36.9674 22.3967 35.0116C22.3341 33.0559 23.0255 31.1509 24.3279 29.6906C25.6303 28.2302 27.4442 27.3263 29.3943 27.1657C31.3445 27.0051 33.2818 27.6001 34.8055 28.8277L36.973 26.6602C34.8653 24.8594 32.1409 23.9467 29.3737 24.1143C26.6064 24.282 24.0122 25.5169 22.1372 27.559C20.2623 29.6011 19.2529 32.2912 19.3217 35.0626C19.3904 37.8341 20.5319 40.4708 22.5058 42.4174C24.4797 44.3641 27.1319 45.4689 29.9041 45.4991C32.6763 45.5294 35.352 44.4827 37.3679 42.5796C39.3838 40.6764 40.5825 38.0653 40.7117 35.296C40.8409 32.5267 39.8905 29.8153 38.0605 27.7327Z" fill="#b8b8b9" />
                                            <path d="M33.0653 34.79C33.0653 35.3952 32.8858 35.9868 32.5496 36.49C32.2134 36.9932 31.7355 37.3855 31.1763 37.6171C30.6172 37.8487 30.0019 37.9093 29.4083 37.7912C28.8148 37.6731 28.2695 37.3817 27.8416 36.9537C27.4136 36.5258 27.1222 35.9805 27.0041 35.387C26.886 34.7934 26.9466 34.1781 27.1782 33.619C27.4098 33.0598 27.8021 32.5819 28.3053 32.2457C28.8085 31.9095 29.4001 31.73 30.0053 31.73C30.5315 31.7286 31.0488 31.8657 31.5053 32.1275L29.4278 34.205C29.3552 34.275 29.2975 34.3588 29.2581 34.4516C29.2186 34.5444 29.1983 34.6442 29.1983 34.745C29.1983 34.8458 29.2186 34.9456 29.2581 35.0384C29.2975 35.1311 29.3552 35.215 29.4278 35.285C29.4975 35.3581 29.5813 35.4164 29.6741 35.4564C29.7669 35.4963 29.8668 35.5171 29.9678 35.5175C30.0676 35.5161 30.1661 35.4948 30.2575 35.4549C30.3489 35.415 30.4315 35.3572 30.5003 35.285L32.6078 33.185C32.9091 33.666 33.0677 34.2225 33.0653 34.79Z" fill="#b8b8b9" />
                                            <path d="M47.7257 16.5728L41.6641 22.645L42.0728 23.053L48.1344 16.9807L47.7257 16.5728Z" fill="b8b8b9" />
                                            <path d="M30.1706 34.9553L29.7656 34.5503L31.9331 32.3828L32.3381 32.7878L30.1706 34.9553Z" fill="b8b8b9" />
                                            <path d="M53.1943 16.8126L47.7493 22.2501L43.0168 22.7826L42.3643 23.4351L40.2493 25.5651L38.0893 27.7326L35.8918 29.9001L32.6068 33.1851L30.4993 35.2851C30.4305 35.3573 30.3479 35.4151 30.2565 35.455C30.165 35.4949 30.0665 35.5162 29.9668 35.5176C29.8658 35.5172 29.7658 35.4964 29.6731 35.4564C29.5803 35.4165 29.4965 35.3582 29.4268 35.2851C29.3542 35.2151 29.2965 35.1312 29.257 35.0385C29.2176 34.9457 29.1973 34.8459 29.1973 34.7451C29.1973 34.6443 29.2176 34.5445 29.257 34.4517C29.2965 34.3589 29.3542 34.275 29.4268 34.2051L31.5043 32.1276L36.9718 26.6601L39.1318 24.5001L41.3068 22.3326L41.9668 21.6726L42.4993 16.9251L47.9143 11.5176L47.3743 16.2501C47.4447 16.1703 47.5312 16.1064 47.6282 16.0626C47.7252 16.0188 47.8304 15.9962 47.9368 15.9962C48.0432 15.9962 48.1484 16.0188 48.2454 16.0626C48.3423 16.1064 48.4289 16.1703 48.4993 16.2501C48.5707 16.3199 48.6275 16.4033 48.6662 16.4954C48.705 16.5875 48.7249 16.6864 48.7249 16.7863C48.7249 16.8862 48.705 16.9851 48.6662 17.0772C48.6275 17.1693 48.5707 17.2527 48.4993 17.3226L53.1943 16.8126Z" fill="#b8b8b9" />
                                            <path d="M29.9674 35.8025C29.8277 35.803 29.6893 35.7753 29.5604 35.7212C29.4316 35.6671 29.3149 35.5876 29.2174 35.4875C29.1163 35.3908 29.0361 35.2743 28.9819 35.1453C28.9277 35.0163 28.9007 34.8775 28.9024 34.7375C28.902 34.5978 28.9296 34.4594 28.9838 34.3305C29.0379 34.2017 29.1173 34.085 29.2174 33.9875L41.6899 21.5L42.2224 16.7675L48.2824 10.7075L47.7499 15.755C47.9205 15.7231 48.0963 15.733 48.2622 15.7839C48.4281 15.8349 48.5792 15.9253 48.7024 16.0475C48.8026 16.1446 48.8816 16.2613 48.9345 16.3904C48.9874 16.5195 49.0131 16.6581 49.0099 16.7975C49.0136 16.865 49.0136 16.9326 49.0099 17L54.0199 16.445L47.9599 22.505L43.1749 23L30.7099 35.4875C30.6141 35.5877 30.4988 35.6674 30.3711 35.7215C30.2435 35.7757 30.1061 35.8032 29.9674 35.8025ZM42.7699 17.0525L42.2374 21.785L29.6299 34.4075C29.5544 34.4989 29.5153 34.615 29.5203 34.7334C29.5252 34.8518 29.5738 34.9643 29.6567 35.049C29.7396 35.1338 29.8509 35.1848 29.9692 35.1924C30.0875 35.2 30.2044 35.1635 30.2974 35.09L42.9124 22.475L47.6524 21.95L52.4149 17.1875L47.7499 17.705L48.2899 17.135C48.3379 17.091 48.3765 17.0377 48.4036 16.9785C48.4307 16.9192 48.4456 16.8551 48.4474 16.79C48.4464 16.6631 48.3952 16.5418 48.3049 16.4525C48.2121 16.3666 48.0902 16.3189 47.9637 16.3189C47.8372 16.3189 47.7153 16.3666 47.6224 16.4525L46.9999 17L47.5249 12.2675L42.7699 17.0525Z" fill="b8b8b9" />
                                        </svg>
                                        <div className="performance-data-txt">

                                            <span className="performance-numerator performance-big-number" style={{ color: "#e5e5e5" }}>
                                                {instoryAccuracyPercent}
                                            </span>
                                            <span className="performance-denominator typo-title" style={{ color: "#e5e5e5" }}>
                                                %
                                            </span>
                                        </div>

                                    </div>
                                    <div className="typo-Description" style={{ color: "#e5e5e5" }}>
                                        Accuracy of in-story quizzes
                                    </div>
                                </div>
                            }
                            {videosWatchedShow &&
                                <div className="performance-data-row-item performance-videos-watched performance-data-padding">
                                    <div className="performance-svg-text">
                                        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M0 12C0 5.37258 5.37258 0 12 0H52C58.6274 0 64 5.37258 64 12V52C64 58.6274 58.6274 64 52 64H12C5.37258 64 0 58.6274 0 52V12Z" fill="#FDF8E2" />
                                            <path d="M32 50C28.4399 50 24.9598 48.9443 21.9997 46.9665C19.0397 44.9886 16.7326 42.1774 15.3702 38.8883C14.0078 35.5992 13.6513 31.98 14.3459 28.4884C15.0404 24.9967 16.7547 21.7894 19.2721 19.2721C21.7894 16.7547 24.9967 15.0404 28.4884 14.3459C31.98 13.6513 35.5992 14.0078 38.8883 15.3702C42.1774 16.7326 44.9886 19.0397 46.9665 21.9997C48.9443 24.9598 50 28.4399 50 32C50 36.7739 48.1036 41.3523 44.7279 44.7279C41.3523 48.1036 36.7739 50 32 50ZM32 16.7675C28.9873 16.7675 26.0423 17.6609 23.5373 19.3346C21.0323 21.0084 19.0799 23.3874 17.927 26.1708C16.7741 28.9542 16.4724 32.0169 17.0602 34.9717C17.6479 37.9265 19.0987 40.6407 21.229 42.771C23.3593 44.9013 26.0735 46.3521 29.0283 46.9398C31.9831 47.5276 35.0459 47.2259 37.8292 46.073C40.6126 44.9201 42.9916 42.9677 44.6654 40.4627C46.3391 37.9578 47.2325 35.0127 47.2325 32C47.2285 27.9613 45.6224 24.0892 42.7666 21.2334C39.9108 18.3776 36.0387 16.7715 32 16.7675Z" fill="#D7B00F" />
                                            <path d="M39.2143 30.275L29.5918 24.725C29.2895 24.546 28.9451 24.4504 28.5938 24.4478C28.2425 24.4452 27.8967 24.5359 27.5918 24.7104C27.2869 24.885 27.0337 25.1372 26.8581 25.4415C26.6824 25.7458 26.5905 26.0912 26.5918 26.4425V37.5575C26.5905 37.9088 26.6824 38.2542 26.8581 38.5585C27.0337 38.8628 27.2869 39.115 27.5918 39.2896C27.8967 39.4641 28.2425 39.5548 28.5938 39.5522C28.9451 39.5496 29.2895 39.454 29.5918 39.275L39.2143 33.725C39.5163 33.5495 39.767 33.2979 39.9412 32.9951C40.1154 32.6924 40.2071 32.3493 40.2071 32C40.2071 31.6507 40.1154 31.3076 39.9412 31.0049C39.767 30.7021 39.5163 30.4505 39.2143 30.275Z" fill="#D7B00F" />
                                        </svg>
                                        <div className="performance-data-txt">

                                            <span className="performance-numerator performance-big-number" style={{ color: "#D7B00F" }}>
                                                {isNaN(Math.round(minutesWatched / 60)) ? 0 : Math.round(minutesWatched / 60)}
                                            </span>
                                            <span className="performance-denominator typo-title">
                                                mins
                                            </span>
                                        </div>
                                    </div>

                                    <div className="typo-Description">
                                        Videos watched
                                    </div>
                                </div>
                            }
                            {!videosWatchedShow &&
                                <div className="performance-data-row-item performance-videos-watched performance-data-padding">
                                    <div className="performance-svg-text">
                                        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M0 12C0 5.37258 5.37258 0 12 0H52C58.6274 0 64 5.37258 64 12V52C64 58.6274 58.6274 64 52 64H12C5.37258 64 0 58.6274 0 52V12Z" fill="#e5e5e5" />
                                            <path d="M32 50C28.4399 50 24.9598 48.9443 21.9997 46.9665C19.0397 44.9886 16.7326 42.1774 15.3702 38.8883C14.0078 35.5992 13.6513 31.98 14.3459 28.4884C15.0404 24.9967 16.7547 21.7894 19.2721 19.2721C21.7894 16.7547 24.9967 15.0404 28.4884 14.3459C31.98 13.6513 35.5992 14.0078 38.8883 15.3702C42.1774 16.7326 44.9886 19.0397 46.9665 21.9997C48.9443 24.9598 50 28.4399 50 32C50 36.7739 48.1036 41.3523 44.7279 44.7279C41.3523 48.1036 36.7739 50 32 50ZM32 16.7675C28.9873 16.7675 26.0423 17.6609 23.5373 19.3346C21.0323 21.0084 19.0799 23.3874 17.927 26.1708C16.7741 28.9542 16.4724 32.0169 17.0602 34.9717C17.6479 37.9265 19.0987 40.6407 21.229 42.771C23.3593 44.9013 26.0735 46.3521 29.0283 46.9398C31.9831 47.5276 35.0459 47.2259 37.8292 46.073C40.6126 44.9201 42.9916 42.9677 44.6654 40.4627C46.3391 37.9578 47.2325 35.0127 47.2325 32C47.2285 27.9613 45.6224 24.0892 42.7666 21.2334C39.9108 18.3776 36.0387 16.7715 32 16.7675Z" fill="#b8b8b9" />
                                            <path d="M39.2143 30.275L29.5918 24.725C29.2895 24.546 28.9451 24.4504 28.5938 24.4478C28.2425 24.4452 27.8967 24.5359 27.5918 24.7104C27.2869 24.885 27.0337 25.1372 26.8581 25.4415C26.6824 25.7458 26.5905 26.0912 26.5918 26.4425V37.5575C26.5905 37.9088 26.6824 38.2542 26.8581 38.5585C27.0337 38.8628 27.2869 39.115 27.5918 39.2896C27.8967 39.4641 28.2425 39.5548 28.5938 39.5522C28.9451 39.5496 29.2895 39.454 29.5918 39.275L39.2143 33.725C39.5163 33.5495 39.767 33.2979 39.9412 32.9951C40.1154 32.6924 40.2071 32.3493 40.2071 32C40.2071 31.6507 40.1154 31.3076 39.9412 31.0049C39.767 30.7021 39.5163 30.4505 39.2143 30.275Z" fill="#b8b8b9" />
                                        </svg>
                                        <div className="performance-data-txt">

                                            <span className="performance-numerator performance-big-number" style={{ color: "#e5e5e5" }}>
                                                {isNaN(Math.round(minutesWatched / 60)) ? 0 : Math.round(minutesWatched / 60)}
                                            </span>
                                            <span className="performance-denominator typo-title" style={{ color: "#e5e5e5" }}>
                                                mins
                                            </span>
                                        </div>
                                    </div>

                                    <div className="typo-Description" style={{ color: "#e5e5e5" }}>
                                        Videos watched
                                    </div>
                                </div>
                            }

                        </div>
                    </div>
                </div>



                <div className="performance-title df" style={{ justifyContent: "space-between", alignItems: "center", width: "100%", height: 70 }}>

                    <span>
                        Quizzes
                    </span>
                </div>
                <div className="performance-container" style={{ width: "100 %", marginBottom: (windowSize.width < 1280) ? "" : "32px", paddingBottom: "30px" }}>
                    <infographicReadShowContextactivityring2.Provider value={infographicReadShowValactivityring2}>
                        <ActivityRings2 percent1={quizzesAttemptedPercent} percent2={quizzAccuracy} width={windowSize.width < 960 ? 186 : 256} height={windowSize.width < 960 ? 186 : 256}
                            quizzesAttempted={quizzesAttempted} quizzesAttemptedTotal={quizzTotal}
                            averageTimeTaken={averageTimeTaken}
                            quizzAccuracy={quizzAccuracy}
                            activityRingN0={2}
                        />
                    </infographicReadShowContextactivityring2.Provider>
                    <div className="performance-data">
                        <div className="performance-data-row" style={{ display: "flex" }}>
                            <div className="performance-data-column" style={{ width: "100%" }}>
                                <div className="performance-data-column-item" >

                                    {quizzesAttempt &&
                                        <div className="performance-quizzes-attempted performance-data-padding" style={{}}>
                                            <div className="performance-svg-text">
                                                <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M0 12C0 5.37258 5.37258 0 12 0H52C58.6274 0 64 5.37258 64 12V52C64 58.6274 58.6274 64 52 64H12C5.37258 64 0 58.6274 0 52V12Z" fill="#FCE4EC" />
                                                    <path d="M18.9797 25.7302C19.3162 22.2946 20.9987 19.1317 23.6597 16.9327V17.0002C25.4131 15.5586 27.5106 14.5966 29.7471 14.2084C31.9836 13.8202 34.2826 14.019 36.4192 14.7854C38.5559 15.5518 40.4571 16.8595 41.937 18.5807C43.4169 20.302 44.4248 22.3778 44.8622 24.6052C45.2164 26.5162 45.1524 28.4813 44.6747 30.3652C44.1833 32.2413 43.2874 33.9871 42.0497 35.4802C40.898 36.788 40.2377 38.456 40.1822 40.1977V45.1102C40.1822 45.7542 40.0549 46.392 39.8078 46.9867C39.5606 47.5815 39.1984 48.1215 38.742 48.5759C38.2855 49.0303 37.7438 49.39 37.1479 49.6344C36.552 49.8789 35.9137 50.0031 35.2697 50.0002H28.7147C28.0718 50.0021 27.4348 49.8772 26.8403 49.6327C26.2457 49.3882 25.7052 49.0288 25.2497 48.5752C24.3328 47.6544 23.8155 46.4096 23.8097 45.1102V40.5052C23.7586 38.5784 23.0522 36.7266 21.8072 35.2552C19.6463 32.5768 18.6302 29.1537 18.9797 25.7302ZM27.0872 45.1102C27.0911 45.5406 27.2638 45.9523 27.5682 46.2567C27.8725 46.561 28.2842 46.7338 28.7147 46.7377H35.2697C35.7014 46.7357 36.115 46.5639 36.421 46.2593C36.727 45.9547 36.9007 45.5419 36.9047 45.1102V43.4602H27.0872V45.1102ZM24.3497 33.2452C26 35.1997 26.9618 37.6427 27.0872 40.1977H30.3647V35.2702C30.3612 35.0562 30.4021 34.8437 30.4847 34.6463C30.5673 34.4488 30.6899 34.2705 30.8447 34.1227C30.9955 33.9698 31.1754 33.8486 31.3737 33.7661C31.5721 33.6837 31.7849 33.6417 31.9997 33.6427C32.4371 33.645 32.8566 33.8171 33.1697 34.1227C33.4698 34.429 33.6369 34.8414 33.6347 35.2702V40.1977H36.9122C36.9502 37.6901 37.8657 35.2752 39.4997 33.3727C40.5834 32.0799 41.3168 30.5304 41.6297 28.8727C41.9266 27.1986 41.7898 25.4764 41.2322 23.8702C40.6766 22.2736 39.7181 20.8476 38.4497 19.7302C37.1652 18.61 35.6165 17.8356 33.9497 17.4802C32.5201 17.1934 31.0448 17.2267 29.6297 17.5777C28.2086 17.91 26.884 18.5672 25.7597 19.4977C24.6231 20.4156 23.7101 21.58 23.0897 22.9027C22.467 24.2179 22.1442 25.655 22.1447 27.1102C22.1396 29.3501 22.9199 31.5209 24.3497 33.2452Z" fill="#E7316F" />
                                                </svg>

                                                <div className="performance-data-txt">
                                                    <span className="performance-numerator performance-big-number" style={{ color: "#E7316F" }}>
                                                        {quizzesAttempted}
                                                    </span>
                                                    /
                                                    <span className="performance-denominator typo-title">
                                                        {quizzTotal}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="typo-Description performance-svg-alignment">
                                                Quizzes attempted
                                            </div>
                                        </div>
                                    }
                                    {!quizzesAttempt &&
                                        <div className="performance-quizzes-attempted performance-data-padding" style={{}}>
                                            <div className="performance-svg-text">
                                                <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M0 12C0 5.37258 5.37258 0 12 0H52C58.6274 0 64 5.37258 64 12V52C64 58.6274 58.6274 64 52 64H12C5.37258 64 0 58.6274 0 52V12Z" fill="#e5e5e5" />
                                                    <path d="M18.9797 25.7302C19.3162 22.2946 20.9987 19.1317 23.6597 16.9327V17.0002C25.4131 15.5586 27.5106 14.5966 29.7471 14.2084C31.9836 13.8202 34.2826 14.019 36.4192 14.7854C38.5559 15.5518 40.4571 16.8595 41.937 18.5807C43.4169 20.302 44.4248 22.3778 44.8622 24.6052C45.2164 26.5162 45.1524 28.4813 44.6747 30.3652C44.1833 32.2413 43.2874 33.9871 42.0497 35.4802C40.898 36.788 40.2377 38.456 40.1822 40.1977V45.1102C40.1822 45.7542 40.0549 46.392 39.8078 46.9867C39.5606 47.5815 39.1984 48.1215 38.742 48.5759C38.2855 49.0303 37.7438 49.39 37.1479 49.6344C36.552 49.8789 35.9137 50.0031 35.2697 50.0002H28.7147C28.0718 50.0021 27.4348 49.8772 26.8403 49.6327C26.2457 49.3882 25.7052 49.0288 25.2497 48.5752C24.3328 47.6544 23.8155 46.4096 23.8097 45.1102V40.5052C23.7586 38.5784 23.0522 36.7266 21.8072 35.2552C19.6463 32.5768 18.6302 29.1537 18.9797 25.7302ZM27.0872 45.1102C27.0911 45.5406 27.2638 45.9523 27.5682 46.2567C27.8725 46.561 28.2842 46.7338 28.7147 46.7377H35.2697C35.7014 46.7357 36.115 46.5639 36.421 46.2593C36.727 45.9547 36.9007 45.5419 36.9047 45.1102V43.4602H27.0872V45.1102ZM24.3497 33.2452C26 35.1997 26.9618 37.6427 27.0872 40.1977H30.3647V35.2702C30.3612 35.0562 30.4021 34.8437 30.4847 34.6463C30.5673 34.4488 30.6899 34.2705 30.8447 34.1227C30.9955 33.9698 31.1754 33.8486 31.3737 33.7661C31.5721 33.6837 31.7849 33.6417 31.9997 33.6427C32.4371 33.645 32.8566 33.8171 33.1697 34.1227C33.4698 34.429 33.6369 34.8414 33.6347 35.2702V40.1977H36.9122C36.9502 37.6901 37.8657 35.2752 39.4997 33.3727C40.5834 32.0799 41.3168 30.5304 41.6297 28.8727C41.9266 27.1986 41.7898 25.4764 41.2322 23.8702C40.6766 22.2736 39.7181 20.8476 38.4497 19.7302C37.1652 18.61 35.6165 17.8356 33.9497 17.4802C32.5201 17.1934 31.0448 17.2267 29.6297 17.5777C28.2086 17.91 26.884 18.5672 25.7597 19.4977C24.6231 20.4156 23.7101 21.58 23.0897 22.9027C22.467 24.2179 22.1442 25.655 22.1447 27.1102C22.1396 29.3501 22.9199 31.5209 24.3497 33.2452Z" fill="#b8b8b9" />
                                                </svg>

                                                <div className="performance-data-txt">
                                                    <span className="performance-numerator performance-big-number" style={{ color: "#e5e5e5" }}>
                                                        {quizzesAttempted}
                                                    </span>
                                                    <span style={{ color: "#e5e5e5" }}>/</span>
                                                    <span className="performance-denominator typo-title" style={{ color: "#e5e5e5" }}>
                                                        {quizzTotal}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="typo-Description performance-svg-alignment" style={{ color: "#e5e5e5" }}>
                                                Quizzes attempted
                                            </div>
                                        </div>
                                    }
                                    {quizzesAccuracy &&
                                        <div className="performance-average-time performance-data-padding" style={{}}>
                                            <div className="performance-svg-text">
                                                <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M0 12C0 5.37258 5.37258 0 12 0H52C58.6274 0 64 5.37258 64 12V52C64 58.6274 58.6274 64 52 64H12C5.37258 64 0 58.6274 0 52V12Z" fill="#E1F3FF" />
                                                    <path d="M42.395 23.4048L40.25 25.5648C42.7271 28.2031 44.0773 31.7037 44.0136 35.3222C43.9498 38.9406 42.477 42.3914 39.9085 44.9409C37.3399 47.4903 33.8782 48.9373 30.2594 48.974C26.6406 49.0108 23.1502 47.6345 20.5304 45.1377C17.9105 42.641 16.368 39.2208 16.2307 35.6044C16.0934 31.988 17.3723 28.4607 19.7952 25.7726C22.2182 23.0844 25.5943 21.4474 29.2054 21.2097C32.8166 20.972 36.3781 22.1524 39.1325 24.4998L41.3075 22.3323C38.044 19.3734 33.752 17.8094 29.3499 17.9748C24.9478 18.1402 20.7853 20.022 17.7531 23.2174C14.7208 26.4129 13.0596 30.6682 13.1249 35.0729C13.1902 39.4776 14.9769 43.6818 18.1026 46.7859C21.2282 49.89 25.4447 51.6475 29.8497 51.6824C34.2548 51.7172 38.4985 50.0266 41.6729 46.9723C44.8473 43.918 46.7002 39.7425 46.8351 35.3394C46.9701 30.9363 45.3764 26.6553 42.395 23.4123V23.4048Z" fill="#017DCB" />
                                                    <path d="M38.0605 27.7327L35.893 29.9002C37.1417 31.4068 37.7635 33.3356 37.63 35.2878C37.4966 37.24 36.6179 39.0663 35.1758 40.3888C33.7337 41.7114 31.8385 42.4292 29.8821 42.3937C27.9256 42.3583 26.0577 41.5722 24.6644 40.1983C23.2712 38.8243 22.4594 36.9674 22.3967 35.0116C22.3341 33.0559 23.0255 31.1509 24.3279 29.6906C25.6303 28.2302 27.4442 27.3263 29.3943 27.1657C31.3445 27.0051 33.2818 27.6001 34.8055 28.8277L36.973 26.6602C34.8653 24.8594 32.1409 23.9467 29.3737 24.1143C26.6064 24.282 24.0122 25.5169 22.1372 27.559C20.2623 29.6011 19.2529 32.2912 19.3217 35.0626C19.3904 37.8341 20.5319 40.4708 22.5058 42.4174C24.4797 44.3641 27.1319 45.4689 29.9041 45.4991C32.6763 45.5294 35.352 44.4827 37.3679 42.5796C39.3838 40.6764 40.5825 38.0653 40.7117 35.296C40.8409 32.5267 39.8905 29.8153 38.0605 27.7327Z" fill="#017DCB" />
                                                    <path d="M33.0653 34.79C33.0653 35.3952 32.8858 35.9868 32.5496 36.49C32.2134 36.9932 31.7355 37.3855 31.1763 37.6171C30.6172 37.8487 30.0019 37.9093 29.4083 37.7912C28.8148 37.6731 28.2695 37.3817 27.8416 36.9537C27.4136 36.5258 27.1222 35.9805 27.0041 35.387C26.886 34.7934 26.9466 34.1781 27.1782 33.619C27.4098 33.0598 27.8021 32.5819 28.3053 32.2457C28.8085 31.9095 29.4001 31.73 30.0053 31.73C30.5315 31.7286 31.0488 31.8657 31.5053 32.1275L29.4278 34.205C29.3552 34.275 29.2975 34.3588 29.2581 34.4516C29.2186 34.5444 29.1983 34.6442 29.1983 34.745C29.1983 34.8458 29.2186 34.9456 29.2581 35.0384C29.2975 35.1311 29.3552 35.215 29.4278 35.285C29.4975 35.3581 29.5813 35.4164 29.6741 35.4564C29.7669 35.4963 29.8668 35.5171 29.9678 35.5175C30.0676 35.5161 30.1661 35.4948 30.2575 35.4549C30.3489 35.415 30.4315 35.3572 30.5003 35.285L32.6078 33.185C32.9091 33.666 33.0677 34.2225 33.0653 34.79Z" fill="#017DCB" />
                                                    <path d="M47.7257 16.5728L41.6641 22.645L42.0728 23.053L48.1344 16.9807L47.7257 16.5728Z" fill="white" />
                                                    <path d="M30.1706 34.9553L29.7656 34.5503L31.9331 32.3828L32.3381 32.7878L30.1706 34.9553Z" fill="white" />
                                                    <path d="M53.1943 16.8126L47.7493 22.2501L43.0168 22.7826L42.3643 23.4351L40.2493 25.5651L38.0893 27.7326L35.8918 29.9001L32.6068 33.1851L30.4993 35.2851C30.4305 35.3573 30.3479 35.4151 30.2565 35.455C30.165 35.4949 30.0665 35.5162 29.9668 35.5176C29.8658 35.5172 29.7658 35.4964 29.6731 35.4564C29.5803 35.4165 29.4965 35.3582 29.4268 35.2851C29.3542 35.2151 29.2965 35.1312 29.257 35.0385C29.2176 34.9457 29.1973 34.8459 29.1973 34.7451C29.1973 34.6443 29.2176 34.5445 29.257 34.4517C29.2965 34.3589 29.3542 34.275 29.4268 34.2051L31.5043 32.1276L36.9718 26.6601L39.1318 24.5001L41.3068 22.3326L41.9668 21.6726L42.4993 16.9251L47.9143 11.5176L47.3743 16.2501C47.4447 16.1703 47.5312 16.1064 47.6282 16.0626C47.7252 16.0188 47.8304 15.9962 47.9368 15.9962C48.0432 15.9962 48.1484 16.0188 48.2454 16.0626C48.3423 16.1064 48.4289 16.1703 48.4993 16.2501C48.5707 16.3199 48.6275 16.4033 48.6662 16.4954C48.705 16.5875 48.7249 16.6864 48.7249 16.7863C48.7249 16.8862 48.705 16.9851 48.6662 17.0772C48.6275 17.1693 48.5707 17.2527 48.4993 17.3226L53.1943 16.8126Z" fill="#017DCB" />
                                                    <path d="M29.9674 35.8025C29.8277 35.803 29.6893 35.7753 29.5604 35.7212C29.4316 35.6671 29.3149 35.5876 29.2174 35.4875C29.1163 35.3908 29.0361 35.2743 28.9819 35.1453C28.9277 35.0163 28.9007 34.8775 28.9024 34.7375C28.902 34.5978 28.9296 34.4594 28.9838 34.3305C29.0379 34.2017 29.1173 34.085 29.2174 33.9875L41.6899 21.5L42.2224 16.7675L48.2824 10.7075L47.7499 15.755C47.9205 15.7231 48.0963 15.733 48.2622 15.7839C48.4281 15.8349 48.5792 15.9253 48.7024 16.0475C48.8026 16.1446 48.8816 16.2613 48.9345 16.3904C48.9874 16.5195 49.0131 16.6581 49.0099 16.7975C49.0136 16.865 49.0136 16.9326 49.0099 17L54.0199 16.445L47.9599 22.505L43.1749 23L30.7099 35.4875C30.6141 35.5877 30.4988 35.6674 30.3711 35.7215C30.2435 35.7757 30.1061 35.8032 29.9674 35.8025ZM42.7699 17.0525L42.2374 21.785L29.6299 34.4075C29.5544 34.4989 29.5153 34.615 29.5203 34.7334C29.5252 34.8518 29.5738 34.9643 29.6567 35.049C29.7396 35.1338 29.8509 35.1848 29.9692 35.1924C30.0875 35.2 30.2044 35.1635 30.2974 35.09L42.9124 22.475L47.6524 21.95L52.4149 17.1875L47.7499 17.705L48.2899 17.135C48.3379 17.091 48.3765 17.0377 48.4036 16.9785C48.4307 16.9192 48.4456 16.8551 48.4474 16.79C48.4464 16.6631 48.3952 16.5418 48.3049 16.4525C48.2121 16.3666 48.0902 16.3189 47.9637 16.3189C47.8372 16.3189 47.7153 16.3666 47.6224 16.4525L46.9999 17L47.5249 12.2675L42.7699 17.0525Z" fill="white" />
                                                </svg>

                                                <div className="performance-data-txt">
                                                    <span className="performance-numerator performance-big-number" style={{ color: "#017DCB" }}>
                                                        {quizzAccuracy}
                                                    </span>
                                                    <span className="performance-denominator typo-title">
                                                        %
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="typo-Description performance-svg-alignment">
                                                Accuracy of quizzes
                                            </div>
                                        </div>
                                    }
                                    {!quizzesAccuracy &&
                                        <div className="performance-average-time performance-data-padding" style={{}}>
                                            <div className="performance-svg-text">
                                                <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M0 12C0 5.37258 5.37258 0 12 0H52C58.6274 0 64 5.37258 64 12V52C64 58.6274 58.6274 64 52 64H12C5.37258 64 0 58.6274 0 52V12Z" fill="#e5e5e5" />
                                                    <path d="M42.395 23.4048L40.25 25.5648C42.7271 28.2031 44.0773 31.7037 44.0136 35.3222C43.9498 38.9406 42.477 42.3914 39.9085 44.9409C37.3399 47.4903 33.8782 48.9373 30.2594 48.974C26.6406 49.0108 23.1502 47.6345 20.5304 45.1377C17.9105 42.641 16.368 39.2208 16.2307 35.6044C16.0934 31.988 17.3723 28.4607 19.7952 25.7726C22.2182 23.0844 25.5943 21.4474 29.2054 21.2097C32.8166 20.972 36.3781 22.1524 39.1325 24.4998L41.3075 22.3323C38.044 19.3734 33.752 17.8094 29.3499 17.9748C24.9478 18.1402 20.7853 20.022 17.7531 23.2174C14.7208 26.4129 13.0596 30.6682 13.1249 35.0729C13.1902 39.4776 14.9769 43.6818 18.1026 46.7859C21.2282 49.89 25.4447 51.6475 29.8497 51.6824C34.2548 51.7172 38.4985 50.0266 41.6729 46.9723C44.8473 43.918 46.7002 39.7425 46.8351 35.3394C46.9701 30.9363 45.3764 26.6553 42.395 23.4123V23.4048Z" fill="#b8b8b9" />
                                                    <path d="M38.0605 27.7327L35.893 29.9002C37.1417 31.4068 37.7635 33.3356 37.63 35.2878C37.4966 37.24 36.6179 39.0663 35.1758 40.3888C33.7337 41.7114 31.8385 42.4292 29.8821 42.3937C27.9256 42.3583 26.0577 41.5722 24.6644 40.1983C23.2712 38.8243 22.4594 36.9674 22.3967 35.0116C22.3341 33.0559 23.0255 31.1509 24.3279 29.6906C25.6303 28.2302 27.4442 27.3263 29.3943 27.1657C31.3445 27.0051 33.2818 27.6001 34.8055 28.8277L36.973 26.6602C34.8653 24.8594 32.1409 23.9467 29.3737 24.1143C26.6064 24.282 24.0122 25.5169 22.1372 27.559C20.2623 29.6011 19.2529 32.2912 19.3217 35.0626C19.3904 37.8341 20.5319 40.4708 22.5058 42.4174C24.4797 44.3641 27.1319 45.4689 29.9041 45.4991C32.6763 45.5294 35.352 44.4827 37.3679 42.5796C39.3838 40.6764 40.5825 38.0653 40.7117 35.296C40.8409 32.5267 39.8905 29.8153 38.0605 27.7327Z" fill="#b8b8b9" />
                                                    <path d="M33.0653 34.79C33.0653 35.3952 32.8858 35.9868 32.5496 36.49C32.2134 36.9932 31.7355 37.3855 31.1763 37.6171C30.6172 37.8487 30.0019 37.9093 29.4083 37.7912C28.8148 37.6731 28.2695 37.3817 27.8416 36.9537C27.4136 36.5258 27.1222 35.9805 27.0041 35.387C26.886 34.7934 26.9466 34.1781 27.1782 33.619C27.4098 33.0598 27.8021 32.5819 28.3053 32.2457C28.8085 31.9095 29.4001 31.73 30.0053 31.73C30.5315 31.7286 31.0488 31.8657 31.5053 32.1275L29.4278 34.205C29.3552 34.275 29.2975 34.3588 29.2581 34.4516C29.2186 34.5444 29.1983 34.6442 29.1983 34.745C29.1983 34.8458 29.2186 34.9456 29.2581 35.0384C29.2975 35.1311 29.3552 35.215 29.4278 35.285C29.4975 35.3581 29.5813 35.4164 29.6741 35.4564C29.7669 35.4963 29.8668 35.5171 29.9678 35.5175C30.0676 35.5161 30.1661 35.4948 30.2575 35.4549C30.3489 35.415 30.4315 35.3572 30.5003 35.285L32.6078 33.185C32.9091 33.666 33.0677 34.2225 33.0653 34.79Z" fill="#b8b8b9" />
                                                    <path d="M47.7257 16.5728L41.6641 22.645L42.0728 23.053L48.1344 16.9807L47.7257 16.5728Z" fill="b8b8b9" />
                                                    <path d="M30.1706 34.9553L29.7656 34.5503L31.9331 32.3828L32.3381 32.7878L30.1706 34.9553Z" fill="b8b8b9" />
                                                    <path d="M53.1943 16.8126L47.7493 22.2501L43.0168 22.7826L42.3643 23.4351L40.2493 25.5651L38.0893 27.7326L35.8918 29.9001L32.6068 33.1851L30.4993 35.2851C30.4305 35.3573 30.3479 35.4151 30.2565 35.455C30.165 35.4949 30.0665 35.5162 29.9668 35.5176C29.8658 35.5172 29.7658 35.4964 29.6731 35.4564C29.5803 35.4165 29.4965 35.3582 29.4268 35.2851C29.3542 35.2151 29.2965 35.1312 29.257 35.0385C29.2176 34.9457 29.1973 34.8459 29.1973 34.7451C29.1973 34.6443 29.2176 34.5445 29.257 34.4517C29.2965 34.3589 29.3542 34.275 29.4268 34.2051L31.5043 32.1276L36.9718 26.6601L39.1318 24.5001L41.3068 22.3326L41.9668 21.6726L42.4993 16.9251L47.9143 11.5176L47.3743 16.2501C47.4447 16.1703 47.5312 16.1064 47.6282 16.0626C47.7252 16.0188 47.8304 15.9962 47.9368 15.9962C48.0432 15.9962 48.1484 16.0188 48.2454 16.0626C48.3423 16.1064 48.4289 16.1703 48.4993 16.2501C48.5707 16.3199 48.6275 16.4033 48.6662 16.4954C48.705 16.5875 48.7249 16.6864 48.7249 16.7863C48.7249 16.8862 48.705 16.9851 48.6662 17.0772C48.6275 17.1693 48.5707 17.2527 48.4993 17.3226L53.1943 16.8126Z" fill="#b8b8b9" />
                                                    <path d="M29.9674 35.8025C29.8277 35.803 29.6893 35.7753 29.5604 35.7212C29.4316 35.6671 29.3149 35.5876 29.2174 35.4875C29.1163 35.3908 29.0361 35.2743 28.9819 35.1453C28.9277 35.0163 28.9007 34.8775 28.9024 34.7375C28.902 34.5978 28.9296 34.4594 28.9838 34.3305C29.0379 34.2017 29.1173 34.085 29.2174 33.9875L41.6899 21.5L42.2224 16.7675L48.2824 10.7075L47.7499 15.755C47.9205 15.7231 48.0963 15.733 48.2622 15.7839C48.4281 15.8349 48.5792 15.9253 48.7024 16.0475C48.8026 16.1446 48.8816 16.2613 48.9345 16.3904C48.9874 16.5195 49.0131 16.6581 49.0099 16.7975C49.0136 16.865 49.0136 16.9326 49.0099 17L54.0199 16.445L47.9599 22.505L43.1749 23L30.7099 35.4875C30.6141 35.5877 30.4988 35.6674 30.3711 35.7215C30.2435 35.7757 30.1061 35.8032 29.9674 35.8025ZM42.7699 17.0525L42.2374 21.785L29.6299 34.4075C29.5544 34.4989 29.5153 34.615 29.5203 34.7334C29.5252 34.8518 29.5738 34.9643 29.6567 35.049C29.7396 35.1338 29.8509 35.1848 29.9692 35.1924C30.0875 35.2 30.2044 35.1635 30.2974 35.09L42.9124 22.475L47.6524 21.95L52.4149 17.1875L47.7499 17.705L48.2899 17.135C48.3379 17.091 48.3765 17.0377 48.4036 16.9785C48.4307 16.9192 48.4456 16.8551 48.4474 16.79C48.4464 16.6631 48.3952 16.5418 48.3049 16.4525C48.2121 16.3666 48.0902 16.3189 47.9637 16.3189C47.8372 16.3189 47.7153 16.3666 47.6224 16.4525L46.9999 17L47.5249 12.2675L42.7699 17.0525Z" fill="b8b8b9" />
                                                </svg>

                                                <div className="performance-data-txt">
                                                    <span className="performance-numerator performance-big-number" style={{ color: "#e5e5e5" }}>
                                                        {quizzAccuracy}
                                                    </span>
                                                    <span className="performance-denominator typo-title" style={{ color: "#e5e5e5" }}>
                                                        %
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="typo-Description performance-svg-alignment" style={{ color: "#e5e5e5" }}>
                                                Accuracy of quizzes
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className="performance-data-column-item">

                                {quizAverageTime &&
                                    <div className="performance-time-taken performance-data-padding">
                                        <div className="performance-svg-text">
                                            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M0 12C0 5.37258 5.37258 0 12 0H52C58.6274 0 64 5.37258 64 12V52C64 58.6274 58.6274 64 52 64H12C5.37258 64 0 58.6274 0 52V12Z" fill="#E1FEFD" />
                                                <path d="M41.5107 20.0828L42.2007 18.8903C42.2903 18.7319 42.3139 18.5446 42.2661 18.369C42.2184 18.1934 42.1032 18.0438 41.9457 17.9528L40.5357 17.1428C40.458 17.097 40.372 17.0672 40.2827 17.0549C40.1933 17.0426 40.1025 17.0481 40.0153 17.0711C39.9281 17.0941 39.8464 17.1341 39.7748 17.1889C39.7032 17.2437 39.6432 17.3121 39.5982 17.3903L38.9157 18.5753C37.2088 17.7796 35.3764 17.2873 33.5007 17.1203V14.6303C33.5007 14.4492 33.4287 14.2756 33.3008 14.1477C33.1728 14.0197 32.9992 13.9478 32.8182 13.9478H31.1832C31.0021 13.9478 30.8285 14.0197 30.7006 14.1477C30.5726 14.2756 30.5007 14.4492 30.5007 14.6303V17.1203C26.6424 17.4682 23.0295 19.1625 20.295 21.9066C17.5604 24.6506 15.8786 28.2693 15.5441 32.1288C15.2096 35.9882 16.2437 39.8423 18.4653 43.016C20.6869 46.1896 23.9543 48.4803 27.6952 49.4869C31.4361 50.4934 35.4119 50.1517 38.9261 48.5214C42.4403 46.8912 45.2688 44.0764 46.9162 40.5702C48.5636 37.064 48.9248 33.0899 47.9365 29.3441C46.9482 25.5984 44.6734 22.3198 41.5107 20.0828ZM30.6282 47.0003C28.0901 46.7398 25.6778 45.7654 23.6709 44.19C21.6639 42.6146 20.1445 40.5027 19.2887 38.0992C18.4328 35.6956 18.2757 33.0987 18.8353 30.6094C19.395 28.1202 20.6486 25.8405 22.4509 24.0345C24.2532 22.2286 26.5304 20.9704 29.0185 20.4056C31.5066 19.8409 34.1038 19.9928 36.5091 20.8438C38.9144 21.6948 41.0294 23.2099 42.6088 25.2137C44.1882 27.2174 45.1675 29.6277 45.4332 32.1653C45.6324 34.1601 45.3866 36.1743 44.7135 38.0626C44.0403 39.951 42.9566 41.6665 41.5405 43.0855C40.1244 44.5045 38.4111 45.5917 36.5241 46.2686C34.6371 46.9456 32.6234 47.1955 30.6282 47.0003Z" fill="#05948F" />
                                                <path d="M39.4263 28.2499L34.9263 32.7499C35.0578 33.2429 35.0614 33.7612 34.9367 34.256C34.812 34.7508 34.5632 35.2056 34.2138 35.5774C33.854 35.9814 33.3853 36.273 32.8638 36.4174C32.4451 36.5374 32.0052 36.5648 31.5748 36.4977C31.1443 36.4305 30.7337 36.2705 30.3714 36.0286C30.0091 35.7867 29.7038 35.4688 29.4767 35.097C29.2497 34.7252 29.1064 34.3085 29.0567 33.8757C29.007 33.4429 29.0522 33.0045 29.1891 32.5909C29.3259 32.1773 29.5512 31.7985 29.8493 31.4808C30.1474 31.1631 30.5111 30.9142 30.9151 30.7513C31.3191 30.5883 31.7538 30.5153 32.1888 30.5374C32.3968 30.5473 32.603 30.5799 32.8038 30.6349L37.3038 26.1349C37.5887 25.8758 37.9623 25.7362 38.3473 25.745C38.7322 25.7538 39.099 25.9103 39.3718 26.1821C39.6445 26.4539 39.8023 26.8202 39.8125 27.2051C39.8226 27.59 39.6844 27.9641 39.4263 28.2499Z" fill="#05948F" />
                                            </svg>

                                            <div className="performance-data-txt">
                                                <span className="performance-numerator performance-big-number" style={{ color: "#05948F" }}>
                                                    {Math.round(averageTimeTaken)}
                                                </span>
                                                <span className="performance-denominator typo-title">
                                                    s
                                                </span>
                                            </div>
                                        </div>
                                        <div className="typo-Description performance-svg-alignment">
                                            Average time taken
                                        </div>
                                    </div>
                                }
                                {!quizAverageTime &&
                                    <div className="performance-time-taken performance-data-padding">
                                        <div className="performance-svg-text">
                                            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M0 12C0 5.37258 5.37258 0 12 0H52C58.6274 0 64 5.37258 64 12V52C64 58.6274 58.6274 64 52 64H12C5.37258 64 0 58.6274 0 52V12Z" fill="#e5e5e5" />
                                                <path d="M41.5107 20.0828L42.2007 18.8903C42.2903 18.7319 42.3139 18.5446 42.2661 18.369C42.2184 18.1934 42.1032 18.0438 41.9457 17.9528L40.5357 17.1428C40.458 17.097 40.372 17.0672 40.2827 17.0549C40.1933 17.0426 40.1025 17.0481 40.0153 17.0711C39.9281 17.0941 39.8464 17.1341 39.7748 17.1889C39.7032 17.2437 39.6432 17.3121 39.5982 17.3903L38.9157 18.5753C37.2088 17.7796 35.3764 17.2873 33.5007 17.1203V14.6303C33.5007 14.4492 33.4287 14.2756 33.3008 14.1477C33.1728 14.0197 32.9992 13.9478 32.8182 13.9478H31.1832C31.0021 13.9478 30.8285 14.0197 30.7006 14.1477C30.5726 14.2756 30.5007 14.4492 30.5007 14.6303V17.1203C26.6424 17.4682 23.0295 19.1625 20.295 21.9066C17.5604 24.6506 15.8786 28.2693 15.5441 32.1288C15.2096 35.9882 16.2437 39.8423 18.4653 43.016C20.6869 46.1896 23.9543 48.4803 27.6952 49.4869C31.4361 50.4934 35.4119 50.1517 38.9261 48.5214C42.4403 46.8912 45.2688 44.0764 46.9162 40.5702C48.5636 37.064 48.9248 33.0899 47.9365 29.3441C46.9482 25.5984 44.6734 22.3198 41.5107 20.0828ZM30.6282 47.0003C28.0901 46.7398 25.6778 45.7654 23.6709 44.19C21.6639 42.6146 20.1445 40.5027 19.2887 38.0992C18.4328 35.6956 18.2757 33.0987 18.8353 30.6094C19.395 28.1202 20.6486 25.8405 22.4509 24.0345C24.2532 22.2286 26.5304 20.9704 29.0185 20.4056C31.5066 19.8409 34.1038 19.9928 36.5091 20.8438C38.9144 21.6948 41.0294 23.2099 42.6088 25.2137C44.1882 27.2174 45.1675 29.6277 45.4332 32.1653C45.6324 34.1601 45.3866 36.1743 44.7135 38.0626C44.0403 39.951 42.9566 41.6665 41.5405 43.0855C40.1244 44.5045 38.4111 45.5917 36.5241 46.2686C34.6371 46.9456 32.6234 47.1955 30.6282 47.0003Z" fill="#b8b8b9" />
                                                <path d="M39.4263 28.2499L34.9263 32.7499C35.0578 33.2429 35.0614 33.7612 34.9367 34.256C34.812 34.7508 34.5632 35.2056 34.2138 35.5774C33.854 35.9814 33.3853 36.273 32.8638 36.4174C32.4451 36.5374 32.0052 36.5648 31.5748 36.4977C31.1443 36.4305 30.7337 36.2705 30.3714 36.0286C30.0091 35.7867 29.7038 35.4688 29.4767 35.097C29.2497 34.7252 29.1064 34.3085 29.0567 33.8757C29.007 33.4429 29.0522 33.0045 29.1891 32.5909C29.3259 32.1773 29.5512 31.7985 29.8493 31.4808C30.1474 31.1631 30.5111 30.9142 30.9151 30.7513C31.3191 30.5883 31.7538 30.5153 32.1888 30.5374C32.3968 30.5473 32.603 30.5799 32.8038 30.6349L37.3038 26.1349C37.5887 25.8758 37.9623 25.7362 38.3473 25.745C38.7322 25.7538 39.099 25.9103 39.3718 26.1821C39.6445 26.4539 39.8023 26.8202 39.8125 27.2051C39.8226 27.59 39.6844 27.9641 39.4263 28.2499Z" fill="#b8b8b9" />
                                            </svg>

                                            <div className="performance-data-txt">
                                                <span className="performance-numerator performance-big-number" style={{ color: "#e5e5e5" }}>
                                                    {Math.round(averageTimeTaken)}
                                                </span>
                                                <span className="performance-denominator typo-title" style={{ color: "#e5e5e5" }}>
                                                    s
                                                </span>
                                            </div>
                                        </div>
                                        <div className="typo-Description performance-svg-alignment" style={{ color: "#e5e5e5" }}>
                                            Average time taken
                                        </div>
                                    </div>
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PerformancePage;