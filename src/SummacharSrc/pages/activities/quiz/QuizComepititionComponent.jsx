import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import '../../../assets/css/quiz.css'
import { getCorrectAnswer, getSelctionPercentage } from "../../../common/helper";
import styleSheet from "../../../common/stylesheet";
import Loader from "../../../components/Loader";
import CloseBtn from "./CloseBtn";
import CountDownTimer from "./CountDownTimer";
import SubmitedQuiz from "./SubmitedQuiz";
import CountdownTimerImg from '../../../assets/images/common/countdown.gif'
const QuizComepititionComponent = (Props) => {
    const currentQuestion = Props.currentQuestion;
    const history = useHistory();
    const [animationTIme, setAnimationTime] = useState(0);
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,

    });
    const [time, setTime] = useState(new Date().getTime())
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
    const onCountDownImageStart = () => {
        if (!Props.hasAttempted) {
            let tempTime = 1;
            const timeAnimated = setInterval(() => {

                if (tempTime < 5) {
                    tempTime = tempTime + 1
                    setAnimationTime(tempTime)
                } else {
                    clearInterval(timeAnimated)
                }
            }, 1000)
        }
    }
    if (Props.isLoading) {
        return (
            <div className="main_quiz_container row row-center df " style={{ height: windowSize.height + 'px' }}>
                {/* //  <div className="main_quiz_container_inner row-cent">  */}

                <div className="df center row" style={{ height: "100vh" }}>
                    <Loader />
                </div>

            </div>
        )
    } else {
        if (Props.showResult.status) {
            return (
                <>

                    <div className="main_quiz_container flex-1 row row-center df " style={{ height: windowSize.height + 'px' }}>
                        {/* <CloseBtn submitQuiz={Props.submitQuiz} isSubmited={true} hasAttempted={Props.hasAttempted} /> */}
                        <div className="main_quiz_container_inner m-v-primary row-center space-between df main_quiz_indicator_box">
                            {
                                Props.data.map((data, index) => {
                                    const indicatorSTyle = {};
                                    let className = "main_quiz_indicator ";
                                    //if (currentQuestion == index) {
                                    //  indicatorSTyle['border'] = "2px solid " + styleSheet.primaryColor
                                    //}
                                    if (data.attempt && data.attempt.is_correct == true) {
                                        className += " bg-success"
                                    }
                                    if (data.attempt && data.attempt.is_correct == false) {
                                        className += " bg-danger"
                                    }
                                    return (<button key={index} className={className} style={indicatorSTyle} onClick={() => { if (Props.hasAttempted == true) { Props.setCurrentQuestion(index); } }}></button>)
                                })
                            }
                        </div>
                        <SubmitedQuiz
                            correct={Props.showResult.data.correct_count}
                            inCorrect={Props.showResult.data.incorrect_count}
                            missed={Props.showResult.data.unattempted_count}
                            score={Props.showResult.data.score}
                            totalScore={Props.showResult.data.total_score}

                            submitQuiz={Props.submitQuiz}
                            hasAttempted={Props.hasAttempted}
                        />
                    </div>
                </>
            )
        } else {
            const selctionPercentage = getSelctionPercentage(Props.data[currentQuestion].options_count);

            return (
                <>

                    <div className="main_quiz_container row row-center df " style={{ height: windowSize.height + 'px' }}>

                        {!Props.hasAttempted && animationTIme <= 4 ?
                            (<>
                                <div className="quiztimeranimation">
                                <div className="row df row-center p-primary column flex-1 " style={{ marginBottom: "0px" }}>
                                    <div><img src={CountdownTimerImg + "?random_no=" + time}  style={{ maxWidth: "100%" }} onLoad={() => {
                                        onCountDownImageStart()
                                    }} alt="loading..." /></div>
                                    <button className="btn-primary row m-v-primary radius-primary  typo-btn-primary " style={{ maxWidth: "798px" }} onClick={() => { Props.goBack() }}>
                                        Not Now
                                    </button>
                                </div>
                                </div>
                            </>) :

                            (<>
                                <div className="main_quiz_container_inner m-v-primary row-center space-between df main_quiz_indicator_box" style={{ marginBottom: "0px" }}>
                                    {
                                        Props.data.map((data, index) => {
                                            const indicatorSTyle = {};
                                            let className = "main_quiz_indicator ";
                                            if (currentQuestion == index) {
                                                indicatorSTyle['border'] = "2px solid " + styleSheet.primaryColor
                                            }
                                            if (data.attempt && data.attempt.is_correct == true) {
                                                className += " bg-success"
                                            }
                                            if (data.attempt && data.attempt.is_correct == false) {
                                                className += " bg-danger"
                                            }
                                            return (<button key={index} className={className} style={indicatorSTyle} onClick={() => { if (Props.hasAttempted == true) { Props.setCurrentQuestion(index); } }}></button>)
                                        })
                                    }
                                </div>

                                <div className="main_quiz_container_inner df row main_quiz_body p-h-primary flex-1 m-v-primary" >
                                    <div className="quiz-side-container">
                                        <span className="row df txt-primary sub-headings-typography ">
                                            {Props.data[currentQuestion].points_per_question} points
                                        </span>
                                        {((Object.keys(Props.data[currentQuestion].attempt) <= 0 && Props.time[currentQuestion] > 0) && !Props.hasAttempted) &&
                                            <div className="main_quiz_score buttons-cards-radius p-primary df center">
                                                <h2 className="question-typography">{Props.time[currentQuestion]}</h2>
                                                <h1 className=" sub-headings-typography txt-primary">Time Left</h1>
                                            </div>}
                                        {!((Object.keys(Props.data[currentQuestion].attempt) <= 0 && Props.time[currentQuestion] > 0) && !Props.hasAttempted) &&
                                            <div className="main_quiz_score buttons-cards-radius p-primary df center" style={{ border: "none" }}>

                                            </div>}
                                    </div>
                                    
                                    <div className="column flex-1 df row-center quiz-side-container-2">
                                        <div>
                                        <div className="space-between row df center main_quiz_question_details">
                                            <div className="main_quiz_sm_close_btn">
                                                <CloseBtn isSubmited={false} submitQuiz={Props.submitQuiz} hasAttempted={Props.hasAttempted} />
                                            </div>
                                            <div className="df row column">
                                                <h1 className="txt-gray sub-headings-typography">
                                                    Question {currentQuestion + 1}/{Props.data.length}
                                                </h1>
                                                <div className="df row-center column">
                                                    <span className="quiz-sm-txt txt-primary  df row center quiz-meta-data">Points : {Props.data[currentQuestion].points_per_question}</span>
                                                    <span className="quiz-sm-txt   df row center quiz-meta-data" style={{ color: "#000" }}>Score : {Props.score ?? 0}</span>
                                                </div>

                                            </div>


                                            <div className="main_quiz_sm_timer">
                                                {((Object.keys(Props.data[currentQuestion].attempt) <= 0 && Props.time[currentQuestion] > 0) && !Props.hasAttempted) &&
                                                    <CountDownTimer
                                                        isPlaying={!(Props.hasAttempted || Object.keys(Props.data[currentQuestion].attempt).length > 0)}
                                                        setTime={Props.setTime}
                                                        timeArray={Props.time}
                                                        totalTIme={Props.data[currentQuestion].time_per_question}
                                                        currentQuestion={currentQuestion}
                                                        time={Props.time[currentQuestion]}
                                                        onComplete={() => {
                                                            let temp = [...Props.time]
                                                            temp[currentQuestion] = 0;
                                                            Props.setTime(temp);
                                                        }}
                                                    />
                                                }
                                            </div>
                                        </div>
                                        <h1 className="main_quiz_body_container main_quiz_quetion question-typography " style={{ color: '#131319' }}>
                                            {Props.data[currentQuestion].text}
                                        </h1>
                                        {Props.data[currentQuestion].media && Props.data[currentQuestion].media != "" &&
                                            <div className="main_quiz_image_box">
                                                <img src={Props.data[currentQuestion].media} className="radius-primary fit-content" alt="" />
                                            </div>}
                                        <div className="m-v-primary" />
                                        
                                        {/* <div className="row df column-center p-relative">
                                    <hr className="m-v-primary" />

                                    <div className="main_quiz_timer">

                                        {!Props.hasAttempted &&
                                            <CountDownTimer
                                                isPlaying={!(Props.hasAttempted || Object.keys(Props.data[currentQuestion].attempt).length > 0)}
                                                setTime={Props.setTime}
                                                timeArray={Props.time}
                                                totalTIme={Props.data[currentQuestion].time_per_question}
                                                currentQuestion={currentQuestion}
                                                time={Props.time[currentQuestion]}
                                                onComplete={() => {
                                                    let temp = [...Props.time]
                                                    temp[currentQuestion] = 0;
                                                    Props.setTime(temp);
                                                }}
                                            />
                                        }
                                    </div>
                                </div> */}
                                        {((Object.keys(Props.data[currentQuestion].attempt) <= 0 && Props.time[currentQuestion] > 0) && !Props.hasAttempted) &&
                                            <div className="main_quiz_option_container row">

                                                {
                                                    Props.data[currentQuestion].options &&
                                                    Props.data[currentQuestion].options.map((option, index) => {
                                                        let letter = "A";
                                                        let className = "main_quiz_option_box buttons-cards-radius row line-margin-small btn-p-primary df row-center"
                                                        if (Props.time[currentQuestion] <= 0) {
                                                            className += " disabled"
                                                        } else {
                                                            className += " hoverable"
                                                        }
                                                        switch (index) {
                                                            case 0: letter = "A"; break;
                                                            case 1: letter = "B"; break;
                                                            case 2: letter = "C"; break;
                                                            case 3: letter = "D"; break;
                                                        }
                                                        return (
                                                            <button key={index} className={className} onClick={() => {
                                                                if (Props.time[currentQuestion] > 0) {
                                                                    Props.submitAnswer(option, index)
                                                                }

                                                            }}>
                                                                {/* <div className="main_quiz_option_title typo-sub-headings df center  txt-primary">
                                                            {letter}
                                                        </div> */}
                                                                <div className="main_quiz_option df row center  typo-sub-headings">
                                                                    {option}
                                                                </div>
                                                            </button>
                                                        )
                                                    })
                                                }


                                            </div>
                                        }

                                        {(Object.keys(Props.data[currentQuestion].attempt).length > 0 || Props.hasAttempted || Props.time[currentQuestion] <= 0) &&
                                            <>
                                                <div className="main_quiz_option_container row  submitted_quiz">
                                                    {Props.data[currentQuestion] &&
                                                        Props.data[currentQuestion].options.map((option, index) => {
                                                            let className = "p-relative main_quiz_option_box buttons-cards-radius row line-margin-small  btn-p-primary row-center df ";
                                                            if (option == Props.data[currentQuestion].answer) {
                                                                className += " btn-success";
                                                            } else if (Props.data[currentQuestion].attempt.is_correct == false && option == Props.data[currentQuestion].attempt.attempt_answer) {
                                                                className += " btn-danger";
                                                            }
                                                            return (

                                                                <div key={index} className={className} style={{ justifyContent: "space-between" }}>
                                                                    {selctionPercentage[index] > 0 ? <div className="btn main_quiz_slider radius-primary" style={{ width: selctionPercentage[index] + "%" }}></div> : <></>}
                                                                    <span className="typo-sub-headings">{option}</span>
                                                                    <span className="typo-sub-headings">{selctionPercentage[index]}%</span>
                                                                </div>

                                                            )
                                                        })

                                                    }
                                                </div>

                                                {/* <div className="main_quiz_explaination main_quiz_body_container">
                                            {Props.data[currentQuestion] && <h1 className="txt-medium">Exaplaination : Answer {getCorrectAnswer(Props.data[currentQuestion].options, Props.data[currentQuestion].answer)}</h1>}
                                            {Props.data[currentQuestion] && <h1 className="txt-medium">Answer is {Props.data[currentQuestion].answer}</h1>}
                                            {Props.data[currentQuestion] && <p className="txt-medium">{Props.data[currentQuestion].explanation}</p>}
                                        </div> */}
                                            </>}

                                        {/* {(Object.keys(Props.data[currentQuestion].attempt).length > 0 || Props.hasAttempted || Props.time[currentQuestion] <= 0) && <div className="btn-area row m-v-primary df center p-sticky-bottom" >
                                            {currentQuestion < Props.data.length - 1 &&
                                                <button className="btn-primary buttons-cards-radius radius-primary  typo-btn-primary " onClick={() => { Props.setCurrentQuestion(currentQuestion + 1) }}>
                                                    Next Question
                                                </button>}
                                            {currentQuestion == Props.data.length - 1 && !Props.hasAttempted &&
                                                <button className="btn-primary  radius-primary typo-btn-primary " onClick={async () => {

                                                    await Props.submitQuiz()
                                                }}>
                                                    Submit
                                                </button>}
                                            {currentQuestion == Props.data.length - 1 && Props.hasAttempted &&
                                                <button className="btn-primary  radius-primary typo-btn-primary " onClick={
                                                    () => {
                                                        Props.goBack();
                                                    }
                                                }>
                                                    Done
                                                </button>}
                                        </div>}
                                        {!(Object.keys(Props.data[currentQuestion].attempt).length > 0 || Props.hasAttempted || Props.time[currentQuestion] <= 0) && <div className="btn-area row m-v-primary df center p-sticky-bottom" >
                                            {currentQuestion < Props.data.length - 1 &&
                                                <button className="btn-primary buttons-cards-radius radius-primary  typo-btn-primary " onClick={() => { Props.setCurrentQuestion(currentQuestion + 1) }}>
                                                    Skip
                                                </button>}
                                            {currentQuestion == Props.data.length - 1 && !Props.hasAttempted &&
                                                <button className="btn-primary  radius-primary typo-btn-primary " onClick={async () => {

                                                    await Props.submitQuiz()
                                                }}>
                                                    Submit
                                                </button>}

                                        </div>} */}
                                        </div>
                                        <div className="y-space-between">
                                        {(Object.keys(Props.data[currentQuestion].attempt).length > 0 || Props.hasAttempted || Props.time[currentQuestion] <= 0) && <div className="btn-area row m-v-primary df center p-sticky-bottom" >
                                            {currentQuestion < Props.data.length - 1 &&
                                                <button className="btn-primary buttons-cards-radius radius-primary  typo-btn-primary " onClick={() => { Props.setCurrentQuestion(currentQuestion + 1) }}>
                                                    Next Question
                                                </button>}
                                            {currentQuestion == Props.data.length - 1 && !Props.hasAttempted &&
                                                <button className="btn-primary  radius-primary typo-btn-primary " onClick={async () => {

                                                    await Props.submitQuiz()
                                                }}>
                                                    Submit
                                                </button>}
                                            {currentQuestion == Props.data.length - 1 && Props.hasAttempted &&
                                                <button className="btn-primary  radius-primary typo-btn-primary " onClick={
                                                    () => {
                                                        Props.goBack();
                                                    }
                                                }>
                                                    Done
                                                </button>}
                                        </div>}
                                        {!(Object.keys(Props.data[currentQuestion].attempt).length > 0 || Props.hasAttempted || Props.time[currentQuestion] <= 0) && <div className="btn-area row m-v-primary df center p-sticky-bottom" >
                                            {currentQuestion < Props.data.length - 1 &&
                                                <button className="btn-primary buttons-cards-radius radius-primary  typo-btn-primary " onClick={() => { Props.setCurrentQuestion(currentQuestion + 1) }}>
                                                    Skip
                                                </button>}
                                            {currentQuestion == Props.data.length - 1 && !Props.hasAttempted &&
                                                <button className="btn-primary  radius-primary typo-btn-primary " onClick={async () => {

                                                    await Props.submitQuiz()
                                                }}>
                                                    Submit
                                                </button>}

                                        </div>}
                                        </div>
                                    </div>
                                    <div className="quiz-side-container">
                                        <CloseBtn isSubmited={false} submitQuiz={Props.submitQuiz} hasAttempted={Props.hasAttempted} />
                                        <div className="main_quiz_score buttons-cards-radius p-primary df center">

                                            <h2 className="question-typography">{Props.score ?? "0"}</h2>
                                            <h1 className="sub-headings-typography  txt-primary">Score</h1>
                                        </div>
                                    </div>
                                </div></>)
                        }

                    </div>
                </>
            )
        }

    }

}
export default QuizComepititionComponent;