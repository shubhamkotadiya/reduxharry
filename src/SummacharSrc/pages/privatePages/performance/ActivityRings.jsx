import "../../../assets/css/PerformancePage.css";
import { useState,  useEffect, useContext } from "react";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import {infographicReadShowContext} from '../../privatePages/performance/PerformancePage'

const ActivityRings = (props) => {

    const [ring1, setRing1] = useState(0);
    const [ring2, setRing2] = useState(0);
    const [ring3, setRing3] = useState(0);
    const [ring4, setRing4] = useState(0);
    const [infographicsRead, setInfographicsRead] = useState(0);
    const [infographicsReadTotal, setInfographicsReadTotal] = useState(0);
    const [instoryquizAttempt, setinstoryQuizAttempt] = useState(0);
    const [instoryquizAttemptTotal, setinstoryQuizAttemptTotal] = useState(0);
    const [instoryquizAccuracy, setinstoryQuizAccuracy] = useState(0);
    const [videoWatched, setVideoWatched] = useState(0);
    const [quizzesAttempted,setquizzesAttempted] = useState(0);
    const [quizzesAttemptedTotal,setquizzesAttemptedTotal] = useState(0);
    const [quizzAccuracy,setquizzAccuracy] = useState(0);

    useEffect(() => {
        // if(props.percent1 === undefined||props.percent2=== undefined ||props.percent3=== undefined|| props.percent4=== undefined || props.infographicsRead=== undefined||props.infographicsReadTotal=== undefined|| props.instoryquizAttempt=== undefined||props.instoryquizAttemptTotal=== undefined|| props.instoryquizAccuracy=== undefined ||props.videoWatched === undefined|| props.quizzesAttempted === undefined||props.quizzesAttemptedTotal=== undefined||props.quizzAccuracy=== undefined )
        // {
        // setRing1(0);
        // setRing2(0);
        // setRing3(0);
        // setRing4(0);
        // setInfographicsRead(0);
        // setInfographicsReadTotal(0);
        // setinstoryQuizAttempt(0);
        // setinstoryQuizAttemptTotal(0);
        // setinstoryQuizAccuracy(0);
        // setVideoWatched(0);
        // setquizzesAttempted(0);
        // setquizzesAttemptedTotal(0);
        // setquizzAccuracy(0);
        // }
        // else{
            setRing1(props.percent1);
        setRing2(props.percent2);
        setRing3(props.percent3);
        setRing4(props.percent4);
        setInfographicsRead(props.infographicsRead);
        setInfographicsReadTotal(props.infographicsReadTotal);
        setinstoryQuizAttempt(props.instoryquizAttempt);
        setinstoryQuizAttemptTotal(props.instoryquizAttemptTotal);
        setinstoryQuizAccuracy(props.instoryquizAccuracy);
        setVideoWatched(props.videoWatched);
        setquizzesAttempted(props.quizzesAttempted);
        setquizzesAttemptedTotal(props.quizzesAttemptedTotal);
        setquizzAccuracy(props.quizzAccuracy);
        // }
        

    }, [props])

    let text1 = `Infographics read :  ${infographicsRead}  / ${infographicsReadTotal}` ;
    let text2 = `In-story quizzes attempted : ${instoryquizAttempt} / ${instoryquizAttemptTotal}`;
    let text3 = `Accuracy of in-story quizzes : ${instoryquizAccuracy}%` ;
    let text4 = `Videos watched : ${videoWatched}mins`;

    
    const infographicReadShowContexter = useContext(infographicReadShowContext);

    

    return (
        <>

            <svg className="ActivityRings" viewBox='0 0 37 37' style={{
                height: props.height,
                width: props.width,
                width: "50%"
            }}
            >
                <Tippy content={text1} trigger={'click'} theme="gray" 
                
                onShow={()=>{
                   if( document.getElementById("circleback1")&&
                    document.getElementById("circleback2")&&
                    document.getElementById("circleback3")&&
                    document.getElementById("circleback4")&&
                    document.getElementById("circlecomp1")&&
                    document.getElementById("circlecomp2")&&
                    document.getElementById("circlecomp3")&&
                    document.getElementById("circlecomp4")){
                        document.getElementById("circleback2").style.stroke = "#e1f3ff85";
                        document.getElementById("circleback3").style.stroke = "#e1fefd85";
                        document.getElementById("circleback4").style.stroke = "#fdf8e281";

                        document.getElementById("circlecomp2").style.stroke = "#e1f3ff85";
                        document.getElementById("circlecomp3").style.stroke = "#e1fefd85";
                        document.getElementById("circlecomp4").style.stroke = "#fdf8e281";

                    }
                       infographicReadShowContexter.setinstoryquizAttemptShowVal(false);
                       infographicReadShowContexter.setInstoryquizAccuracyShowVal(false);
                       infographicReadShowContexter.setVideosWatchedShowVal(false);
                    
                }}
                    
                    onHide={()=>{
                        if( document.getElementById("circleback1")&&
                    document.getElementById("circleback2")&&
                    document.getElementById("circleback3")&&
                    document.getElementById("circleback4")&&
                    document.getElementById("circlecomp1")&&
                    document.getElementById("circlecomp2")&&
                    document.getElementById("circlecomp3")&&
                    document.getElementById("circlecomp4")){
                        document.getElementById("circleback2").style.stroke = "#e1f3ff";
                        document.getElementById("circleback3").style.stroke = "#e1fefd";
                        document.getElementById("circleback4").style.stroke = "#fdf8e2";

                        document.getElementById("circlecomp2").style.stroke = "#017dcb";
                        document.getElementById("circlecomp3").style.stroke = "#05948f";
                        document.getElementById("circlecomp4").style.stroke = "#d7b00f";
                    }
                        infographicReadShowContexter.set(true);
                        infographicReadShowContexter.setinstoryquizAttemptShowVal(true);
                        infographicReadShowContexter.setInstoryquizAccuracyShowVal(true);
                        infographicReadShowContexter.setVideosWatchedShowVal(true);
                    
                    }}
                >
                
                <g className="ring ring1" id="ring1" style={{ transform: "scale(1) rotate(-90deg)" }} >
                
                    <circle strokeWidth="3.2" r="16" cx="50%" cy="50%" className="background" id="circleback1" />
                    {ring1 > 0 ? <circle strokeWidth="3.2" r="16" cx="50%" cy="50%" className="completed" strokeDasharray={ring1 + ", 100"} id="circlecomp1" /> : <div></div>}
                    
                </g>
                </Tippy>
                


                <Tippy content={text2} trigger={'click'} theme="gray"
                    onShow={()=>{
                        if( document.getElementById("circleback1")&&
                    document.getElementById("circleback2")&&
                    document.getElementById("circleback3")&&
                    document.getElementById("circleback4")&&
                    document.getElementById("circlecomp1")&&
                    document.getElementById("circlecomp2")&&
                    document.getElementById("circlecomp3")&&
                    document.getElementById("circlecomp4")){
                        document.getElementById("circleback1").style.stroke = "#fce4ec";
                        document.getElementById("circleback3").style.stroke = "#e1fefd85";
                        document.getElementById("circleback4").style.stroke = "#fdf8e281";

                        document.getElementById("circlecomp1").style.stroke = "#fce4ec";
                        document.getElementById("circlecomp3").style.stroke = "#e1fefd85";
                        document.getElementById("circlecomp4").style.stroke = "#fdf8e281";
                    }
                        infographicReadShowContexter.set(false);
                        infographicReadShowContexter.setInstoryquizAccuracyShowVal(false);
                        infographicReadShowContexter.setVideosWatchedShowVal(false);
                    
                    }}
                    onHide={()=>{
                        if( document.getElementById("circleback1")&&
                    document.getElementById("circleback2")&&
                    document.getElementById("circleback3")&&
                    document.getElementById("circleback4")&&
                    document.getElementById("circlecomp1")&&
                    document.getElementById("circlecomp2")&&
                    document.getElementById("circlecomp3")&&
                    document.getElementById("circlecomp4")){
                        document.getElementById("circleback1").style.stroke = "#fce4ec";
                        document.getElementById("circleback3").style.stroke = "#e1fefd";
                        document.getElementById("circleback4").style.stroke = "#fdf8e2";

                        document.getElementById("circlecomp1").style.stroke = "#e7316f";
                        document.getElementById("circlecomp3").style.stroke = "#05948f";
                        document.getElementById("circlecomp4").style.stroke = "#d7b00f";
                    }
                        infographicReadShowContexter.set(true);
                        infographicReadShowContexter.setinstoryquizAttemptShowVal(true);
                        infographicReadShowContexter.setInstoryquizAccuracyShowVal(true);
                        infographicReadShowContexter.setVideosWatchedShowVal(true);
                    
                    }}
                >
                <g className="ring ring2" style={{ transform: "scale(0.75) rotate(-90deg)" }} >
                    <circle strokeWidth="4.2" r="16" cx="50%" cy="50%" className="background" id="circleback2" />
                    {ring2 > 0 ? <circle strokeWidth="4.2" r="16" cx="50%" cy="50%" className="completed" strokeDasharray={ring2 + ", 100"} id="circlecomp2" /> : <div></div>}
                </g>
                </Tippy>
                
                {props.percent3 >= 0 &&

                    <Tippy content={text3} trigger={'click'} theme="gray"
                        onShow={()=>{
                            if( document.getElementById("circleback1")&&
                    document.getElementById("circleback2")&&
                    document.getElementById("circleback3")&&
                    document.getElementById("circleback4")&&
                    document.getElementById("circlecomp1")&&
                    document.getElementById("circlecomp2")&&
                    document.getElementById("circlecomp3")&&
                    document.getElementById("circlecomp4")){
                            document.getElementById("circleback1").style.stroke = "#fce4ec";
                            document.getElementById("circleback2").style.stroke = "#e1f3ff85";
                            document.getElementById("circleback4").style.stroke = "#fdf8e281";

                            document.getElementById("circlecomp1").style.stroke = "#fce4ec";
                            document.getElementById("circlecomp2").style.stroke = "#e1f3ff85";
                            document.getElementById("circlecomp4").style.stroke = "#fdf8e281";
                    }
                            infographicReadShowContexter.set(false);
                            infographicReadShowContexter.setinstoryquizAttemptShowVal(false);
                            infographicReadShowContexter.setVideosWatchedShowVal(false);
                    
                        }}

                        onHide={()=>{
                            if( document.getElementById("circleback1")&&
                    document.getElementById("circleback2")&&
                    document.getElementById("circleback3")&&
                    document.getElementById("circleback4")&&
                    document.getElementById("circlecomp1")&&
                    document.getElementById("circlecomp2")&&
                    document.getElementById("circlecomp3")&&
                    document.getElementById("circlecomp4")){
                            document.getElementById("circleback1").style.stroke = "#fce4ec";
                            document.getElementById("circleback2").style.stroke = "#e1f3ff";
                            document.getElementById("circleback4").style.stroke = "#fdf8e2";

                            document.getElementById("circlecomp1").style.stroke = "#e7316f";
                            document.getElementById("circlecomp2").style.stroke = "#017dcb";
                            document.getElementById("circlecomp4").style.stroke = "#d7b00f";
                    }
                            infographicReadShowContexter.set(true);
                        infographicReadShowContexter.setinstoryquizAttemptShowVal(true);
                        infographicReadShowContexter.setInstoryquizAccuracyShowVal(true);
                        infographicReadShowContexter.setVideosWatchedShowVal(true);
                    
                        }}
                    >
                    <g className="ring ring3" style={{ transform: "scale(0.5) rotate(-90deg)" }}>
                        <circle strokeWidth="6.4" r="16" cx="50%" cy="50%" className="background" id="circleback3" />
                        {ring3 > 0 ? <circle strokeWidth="6.4" r="16" cx="50%" cy="50%" className="completed" strokeDasharray={ring3 + ", 100"} id="circlecomp3" /> : <div></div>}
                    </g>
                    </Tippy>
                    
                }

                {
                    props.percent4 >= 0 &&
                    <Tippy content={text4} trigger={'click'} theme="gray"
                        onShow={()=>{
                            if( document.getElementById("circleback1")&&
                    document.getElementById("circleback2")&&
                    document.getElementById("circleback3")&&
                    document.getElementById("circleback4")&&
                    document.getElementById("circlecomp1")&&
                    document.getElementById("circlecomp2")&&
                    document.getElementById("circlecomp3")&&
                    document.getElementById("circlecomp4")){
                            document.getElementById("circleback1").style.stroke = "#fce4ec";
                            document.getElementById("circleback2").style.stroke = "#e1f3ff85";
                            document.getElementById("circleback3").style.stroke = "#e1fefd85";

                            document.getElementById("circlecomp1").style.stroke = "#fce4ec";
                            document.getElementById("circlecomp2").style.stroke = "#e1f3ff85";
                            document.getElementById("circlecomp3").style.stroke = "#e1fefd85";
                    }
                            infographicReadShowContexter.set(false);
                            infographicReadShowContexter.setinstoryquizAttemptShowVal(false);
                            infographicReadShowContexter.setInstoryquizAccuracyShowVal(false);
                    
                        }}

                        onHide={()=>{
                            if( document.getElementById("circleback1")&&
                    document.getElementById("circleback2")&&
                    document.getElementById("circleback3")&&
                    document.getElementById("circleback4")&&
                    document.getElementById("circlecomp1")&&
                    document.getElementById("circlecomp2")&&
                    document.getElementById("circlecomp3")&&
                    document.getElementById("circlecomp4")){
                            document.getElementById("circleback1").style.stroke = "#fce4ec";
                            document.getElementById("circleback2").style.stroke = "#e1f3ff";
                            document.getElementById("circleback3").style.stroke = "#e1fefd";

                            document.getElementById("circlecomp1").style.stroke = "#e7316f";
                            document.getElementById("circlecomp2").style.stroke = "#017dcb";
                            document.getElementById("circlecomp3").style.stroke = "#05948f";
                    }
                            infographicReadShowContexter.set(true);
                        infographicReadShowContexter.setinstoryquizAttemptShowVal(true);
                        infographicReadShowContexter.setInstoryquizAccuracyShowVal(true);
                        infographicReadShowContexter.setVideosWatchedShowVal(true);
                    
                        }}
                    >
                    <g className="ring ring4" style={{ transform: "scale(0.25) rotate(-90deg)" }}>
                        <circle strokeWidth="10.8" r="16" cx="50%" cy="50%" className="background" id="circleback4"/>
                        {ring4 > 0 ? <circle strokeWidth="10.8" r="16" cx="50%" cy="50%" className="completed" id="circlecomp4" strokeDasharray={ring4 + ", 100"} /> : <div></div>}
                    </g>
                    </Tippy>
                }

            </svg>
            
            
            
            
        </>
    )
}

export default ActivityRings;