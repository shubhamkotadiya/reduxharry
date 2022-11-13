import React, { useState } from "react";
import '../../../assets/css/eventsCalendar.css';
import vec1 from '../../../assets/images/up-vec.svg';
import vec2 from '../../../assets/images/vector-small.svg';
import { checkDateBetween, getDateAndDayname } from "../../../common/helper";

import LiveImage from '../../../assets/images/common/live.gif'
const Calendar = (props) => {
    const quiz = props.data;
    const monthsList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const buttonColors = ['#F0E0FF', '#E0F0FF', '#FFE0E0'];



    return (
        <>
            <div className="news_container" id="news_container" style={{ height: "100%",paddingBottom:"20px", paddingTop: "0px", overflowY: "scroll" }} >
                <div className="outer-main-container" >

                    <div className="inner-container centered_outer_container" style={{ margin: "auto" }}>
                        <div className="df common-grid-outer row column">
                            <div className="calendar-outer p-h-primary row" style={{ margin: "0px auto" }}>
                                <div className="calendar-inner p-h-primary">
                                    <div className="title-div row m-v-primary" style={{ marginTop: "0px" }} >
                                        <div className="title heading-text " ><b>Upcoming Activities</b></div>
                                        {/* <div className="grayline"></div> */}
                                    </div>
                                    {/* {
                                            quiz && Object.keys(quiz).length > 0 && Object.keys(quiz).slice(props.startIndex, props.startIndex + props.maximumShowCount).map((totalSeconds, Index) => {

                                                return (
                                                    <React.Fragment key={Index}>
                                                        <button style={{ backgroundColor: buttonColors[Index % buttonColors.length] }} onClick={() => props.changeShow(Index)} className="accordion">{monthsList[new Date(parseInt(totalSeconds)).getMonth()]}
                                                            {props.show[Index] ? <img src={vec1} className="arrow-vector" /> : <img src={vec2} className="arrow-vector" />}
                                                        </button>
                                                        <div className="panel">

                                                            {props.show[Index] &&
                                                                <div className="quiz-list">
                                                                    {quiz[totalSeconds].map((quizItem, keyIndex) => {

                                                                        return (
                                                                            <div className="quiz-list-item" key={keyIndex}>
                                                                                <div className="quiz-day radius-primary">
                                                                                    <span className="quiz-date font-bold">{getDateAndDayname(quizItem.start_date).date}</span>
                                                                                    <span className="quiz-weekday">{getDateAndDayname(quizItem.start_date).day}</span>
                                                                                </div>
                                                                                <div className="quiz-title df row-center">
                                                                                    {quizItem.title}
                                                                                    {checkDateBetween(quizItem.start_date, quizItem.end_date, new Date()) && <><img src={LiveImage} className="m-h-primary live-indicator-image" alt="" /> Live Now</>}
                                                                                </div>
                                                                            </div>
                                                                        )

                                                                    })}


                                                                </div>
                                                            }

                                                        </div>
                                                    </React.Fragment>
                                                )
                                            })
                                        }                                         */}

                                    {props.data && props.data.length > 0 && props.data.map((quizItem, index) => {                                        
                                        return (
                                            <div  key={index} className="df m-v-primary row border-primary p-primary radius-primary" style={{marginBottom:"0px"}} >
                                               
                                                <div className="df center bg-primary column calendar-date-circle" style={{ borderRadius: "100%",flex:"none" }}>
                                                    <span className="typo-Description txt-primary " style={{color:"#fff"}}>{getDateAndDayname(quizItem.start_date).month}</span>
                                                    <span className="typo-Description font-bold" style={{color:"#fff"}}>{getDateAndDayname(quizItem.start_date).date}</span>
                                                </div>
                                                <div className="typo-headings font-bold df row-center m-h-primary">
                                                    {quizItem.title}
                                                    {checkDateBetween(quizItem.start_date, quizItem.end_date, new Date()) && <><img src={LiveImage} className="m-h-primary live-indicator-image" alt="" /> Live Now</>}
                                                </div>
                                            </div>
                                        )
                                    })}

                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>

    )
}
export default Calendar;