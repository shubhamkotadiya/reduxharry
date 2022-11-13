import React from "react";
import SuccessImage from '../assets/images/common/correct.gif'
import FailImage from '../assets/images/common/wrong.gif'
import styleSheet from "../common/stylesheet";
const InStoryQuiz = (Props) => {
    let fontSize = "16px";

    if (window.innerWidth < 640) {
        // fontSize = Props.data.text.length > 60 ? Props.data.text.length > 200 ? '12px' : '18px' : '24px';
        fontSize = '20px';
    } 
    else if(window.innerWidth>=640 && window.innerWidth<720){
        fontSize = '32px';
    }
    else if(window.innerWidth>=720 && window.innerWidth<960){
        fontSize = '36px';
    }
    else if(window.innerWidth>=960 && window.innerWidth<1280){
        fontSize = '28px';
    }
    else if(window.innerWidth>=1280 && window.innerWidth<1600){
        fontSize = '30px';
    }
    else if(window.innerWidth>=1600 && window.innerWidth<1920){
        fontSize = '30px';
    }
    else{
        fontSize = '32px';
    }
    // else {
    //     fontSize = Props.data.text.length > 60 ? Props.data.text.length > 200 ? '12px' : '14px' : '16px';
    // }

    let optionFontSize = "16px";
    let resFontSize = "16px";
    let borderRadius = "6px";
    if (window.innerWidth < 640) {
        optionFontSize = '20px';
        resFontSize = "18px";
        borderRadius = "6px";
    } 
    else if(window.innerWidth>=640 && window.innerWidth<720){
        optionFontSize = '24px';
        resFontSize = "24px";
        borderRadius = "8px";
    }
    else if(window.innerWidth>=720 && window.innerWidth<960){
        optionFontSize = '28px';
        resFontSize = "28px";
        borderRadius = "10px";
    }
    else if(window.innerWidth>=960 && window.innerWidth<1280){
        optionFontSize = '24px';
        resFontSize = "20px";
        borderRadius = "10px";
    }
    else if(window.innerWidth>=1280 && window.innerWidth<1600){
        optionFontSize = '28px';
        resFontSize = "22px";
        borderRadius = "12px";
    }
    else if(window.innerWidth>=1600 && window.innerWidth<1920){
        optionFontSize = '28px';
        resFontSize = "22px";
        borderRadius = "15px";
    }
    else{
        optionFontSize = '30px';
        resFontSize = "24px";
        borderRadius = "18px";
    }

    return (
        <>
        {Props.data.attempt.attempt_answer &&
            <div className="row margin-v-primary df center quiz-result-animation" style={{ height: "60px",borderRadius:borderRadius}}>
                {Props.data.attempt.attempt_answer && Props.data.attempt.is_correct && <div style={{fontSize:resFontSize, fontWeight:400}}><h2 className="typo-Description-instory-quiz txt-success" >Great Performance!</h2> <img style={{ width: "60px", height: "60px" }} src={SuccessImage} alt="" /></div>}
                {Props.data.attempt.attempt_answer && !Props.data.attempt.is_correct && <div style={{fontSize:resFontSize, fontWeight:400}}><h2 className="typo-Description-instory-quiz txt-danger" >You can do better!</h2> <img style={{ width: "60px", height: "60px" }} src={FailImage} alt="" /></div>}
            </div>
        }
        <div className="bg-primary df fit-content radius-primary quiz_container" style={{ flexDirection: "column", justifyContent: "space-between" }}>
        
            <div className="row margin-v-primary center" style={{ position: "relative" }}>
                {Props.data.text &&
                    <h2 className="row margin-v-primary txt-white typo-Description" style={{ color: "white", fontSize:fontSize,fontWeight:500,lineHeight:1.4 }}>
                        {Props.data.text}
                    </h2>}
                {/*  */}
                {/* {Props.data.attempt.attempt_answer &&
                    <div className="row margin-v-primary df center" style={{ height: "60px" }}>
                        {Props.data.attempt.attempt_answer && Props.data.attempt.is_correct && <><h2 className="typo-Description txt-success">Great Performance!</h2> <img style={{ width: "60px", height: "60px" }} src={SuccessImage} alt="" /></>}
                        {Props.data.attempt.attempt_answer && !Props.data.attempt.is_correct && <><h2 className="typo-Description txt-danger">You can do better!</h2> <img style={{ width: "60px", height: "60px" }} src={FailImage} alt="" /></>}
                    </div>
                } */}
            </div>
            {Props.data.question_type == "MCQ" &&
                <div className="row margin-v-primary center df " style={{ flexDirection: "column" }}>
                    {
                        Props.data.options.map((option, index) => {
                            let backgroundColor = "white";
                            let color = "#000";
                            let isAttempted = false;
                            if (Props.data.attempt.attempt_answer) {
                                isAttempted = true;
                                if (Props.data.attempt.attempt_answer === option) {
                                    backgroundColor = styleSheet.successColor;
                                    color = "#000";
                                }
                                if (!Props.data.attempt.is_correct && option === Props.data.answer) {
                                    backgroundColor = styleSheet.successColor;
                                    color = "#000";
                                }
                                if (Props.data.attempt.attempt_answer === option && !Props.data.attempt.is_correct) {
                                    backgroundColor = styleSheet.dangerColor;
                                    color = "white";
                                }
                            } else {
                                isAttempted = false;
                            }
                            return (
                                <button
                                    key={index}
                                    onClick={Props.onClick && Object.keys(Props.data.attempt).length <= 0 ? () => { Props.onClick(option) } : () => { }}
                                    onFocus={Props.onClick && Object.keys(Props.data.attempt).length <= 0 ? () => { Props.onClick(option) } : () => { }}

                                    className={isAttempted ? "option_box row radius-primary typo-Description" : "option_box row radius-primary hoverable typo-Description"} style={{ backgroundColor: backgroundColor, color: color , fontSize:optionFontSize , fontWeight:500}}>
                                    {option}
                                </button>
                            )
                        })
                    }
                </div>}
        </div></>
    );
}
export default InStoryQuiz;