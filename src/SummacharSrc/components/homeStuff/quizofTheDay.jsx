import React, { useContext, useEffect, useState } from "react";
import styleSheet from "../../common/stylesheet";
import curio from '../../assets/images/curio_79.png';
import correct from '../../assets/images/correct.gif'
import wrongs from '../../assets/images/wrong-hover.gif'
const QuizofTheDay = (Props) => {
    let fontSize = "16px";
    const [show, set] = useState(false)
    const [wrong, setWrong] = useState(false);
    const showAnimation = () => {

        if (Object.keys(Props.data.question.attempt).length > 0 && Props.data.question.attempt.is_correct) {
            setTimeout(function () {
                set(true);
            }, 100)
            setTimeout(function () {
                set(false);
            }, 6000)
        }
        else {
            setTimeout(function () {
                setWrong(true);
            }, 1000)
            setTimeout(function () {
                setWrong(false);
            }, 6000)
        }

    }

    if (window.innerWidth > 769) {
        fontSize = Props.data.question.text.length > 60 ? Props.data.question.text.length > 200 ? '12px' : '18px' : '24px';
    } else {
        fontSize = Props.data.question.text.length > 60 ? Props.data.question.text.length > 200 ? '12px' : '14px' : '16px';
    }
    return (



        <div className="p-relative row">
            <div className="row" style={{ paddingTop: "75%" }}>

            </div>
            <div className="fit-content fit-absolute ">
                <div className=" df fit-content radius-primary quiz_container stuff-quiz relative" style={{ flexDirection: "column", justifyContent: "space-between", alignItems: "center", backgroundColor: "#FCF6E3" }} onClick={() => showAnimation()}>

                    {show && Object.keys(Props.data.question.attempt).length > 0 && Props.data.question.attempt.is_correct &&
                        <div className="animation-tile radius-primary fit-content df center pointer right" >
                            <img src={correct} />
                        </div>
                    }
                    {wrong && Object.keys(Props.data.question.attempt).length > 0 && !Props.data.question.attempt.is_correct &&
                        <div className="animation-tile radius-primary fit-content df center column pointer wrong"  >
                            <div >You got this wrong but no worries.<br />
                                Learning is a process!<br />
                                Try again tomorrow <br />
                            </div>
                            <img src={wrongs} className="fit-content " />
                        </div>
                    }
                    {!(wrong && Object.keys(Props.data.question.attempt).length > 0 && !Props.data.question.attempt.is_correct) &&
                        <div className="row margin-v-primary center" style={{ position: "relative" }}>
                            {Props.data.question.text &&
                                <h2 className="row margin-v-primary quiz-que typo-Description" >
                                    {Props.data.question.text}

                                </h2>}

                        </div>
                    }
                    {Props.data.question.media != null &&
                        <img className="center df fit-content " src={Props.data.question.media != null ? Props.data.question.media : curio} alt="" style={{ width: "160px", height: "106px", borderRadius: "6px" }} />
                    }
                    {Props.data.question.question_type == "MCQ" &&
                        <div className="row margin-v-primary center df " style={{ flexDirection: "column" }}>
                            {
                                Props.data.question.options.map((option, index) => {
                                    let backgroundColor = "transparent";
                                    let color = "#000";
                                    let isAttempted = false;
                                    if (Object.keys(Props.data.question.attempt).length > 0 && Props.data.is_attempted) {
                                        isAttempted = true;
                                        if (Props.data.question.attempt.attempt_answer === option) {
                                            backgroundColor = styleSheet.successColor;
                                            color = "#000";
                                        }
                                        if (!Props.data.question.attempt.is_correct && option === Props.data.question.answer) {
                                            backgroundColor = styleSheet.successColor;
                                            color = "#000";
                                        }
                                        if (Props.data.question.attempt.attempt_answer === option && !Props.data.question.attempt.is_correct) {
                                            backgroundColor = styleSheet.dangerColor;
                                            color = "white";
                                        }
                                    } else {
                                        isAttempted = false;
                                    }
                                    { console.log(Props.data) }
                                    return (
                                        <button
                                            key={index}
                                            onClick={Object.keys(Props.data.question.attempt).length <= 0 ? () => { showAnimation(); Props.submitQue(option, Props.data.uuid); } : () => { }}
                                            className={isAttempted ? "option_box_stuff row radius-primary typo-Description" : "option_box_stuff row radius-primary hoverable typo-Description"} style={{ backgroundColor: backgroundColor, color: color, width: "100%" }}>
                                            {option}
                                        </button>
                                    )
                                })
                            }
                        </div>}
                </div>
            </div>
        </div>
    );
}
export default QuizofTheDay;