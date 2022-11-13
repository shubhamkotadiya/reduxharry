import React, { useContext, useEffect, useState } from 'react'
import { isApp, premiumInt } from "../common/helper";


import {
    useHistory,
    useLocation,
    useRouteMatch,
    useParams,
} from "react-router";
import { Store } from "../App";
import { Box, Modal } from '@mui/material';
import { useLayoutEffect } from 'react';

const QuizStartTimeAndTimePopUp = props => {


    const history = useHistory();

    const start_time = props.heading === "NOT_STARTED_QUIZ" ? new Date(props.description).getTime() : 0
    const [remainingTime, setRemainingTime] = useState(props.heading === "NOT_STARTED_QUIZ" ? (new Date(props.description).getTime() - new Date().getTime()) : 0)
    useLayoutEffect(() => {

        let i = 0;
        const intervalRef = setInterval(() => {
            if (props.heading === "NOT_STARTED_QUIZ") {
                const time = new Date().getTime()
                const remaining_time = start_time - time
                if (remaining_time >= 0) {
                    setRemainingTime(remaining_time)
                } else {
                    clearInterval(intervalRef)
                }

            } else {
                if (i < 3) {
                    setRemainingTime(i)
                    i++
                } else {
                    clearInterval(intervalRef)
                }
            }
        }, 1000)
        return () => {
            clearInterval(intervalRef)
        }
    }, [])
    useEffect(() => {
        if (remainingTime >= 3 && props.heading === "QUIZ_ENDED") {
            props.onClosePopUp()
        }
    }, [remainingTime])
    const getTimerData = () => {
        const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24))
        const minutes = Math.floor(remainingTime / (1000 * 60)) - (days * 24 * 60)
        const second = Math.floor(remainingTime / (1000)) - (days * 24 * 60 * 60) - (minutes * 60)
        return {
            day: days,
            minutes: minutes,
            seconds: second,
        }
    }
    return (
        <Modal
            open={true}

            onClose={() => {
                if (props.changeVisibility) {
                    props.changeVisibility(false)
                } else if (props.onClosePopUp) {
                    props.onClosePopUp()
                }
            }}
            classes={'df center'}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div
                className='fit-content row center df '

            >

                <div
                    className=' fit-content '
                    style={{ position: "absolute", top: "0px", left: "0px", zIndex: 0 }}
                    onClick={() => {
                        if (props.changeVisibility) {
                            props.changeVisibility(false)
                        } else if (props.onClosePopUp) {
                            props.onClosePopUp()
                        }
                    }}
                ></div>

                {props.heading === "NOT_STARTED_QUIZ" &&
                    <div className='p-relative radius-primary df row column innerPopUp pop-up-animation'>
                        <h1 className='txt-extraalarge' style={{ color: '#000' }}>
                            This quiz will start in
                        </h1>
                        <div className='df row center m-v-primary'>
                            <div className="timer_box btn-primary df center">
                                <span className=" typo-sub-headings" style={{ color: "white" }}>{getTimerData().day} days</span>
                            </div>
                            <div className="timer_box btn-primary df center">
                                <span className=" typo-sub-headings" style={{ color: "white" }}>{getTimerData().minutes} min</span>
                            </div>
                            <div className="timer_box btn-primary df center">
                                <span className=" typo-sub-headings" style={{ color: "white" }}>{getTimerData().seconds} s</span>
                            </div>
                        </div>
                    </div>}
                {props.heading === "QUIZ_ENDED" &&
                    <div className='p-relative radius-primary df row column innerPopUp pop-up-animation'>
                        <h1 className='txt-extraalarge' style={{ color: '#000' }}>
                            This quiz has ended.
                        </h1>
                    </div>}
            </div>

        </Modal>
    )
}
export default QuizStartTimeAndTimePopUp
