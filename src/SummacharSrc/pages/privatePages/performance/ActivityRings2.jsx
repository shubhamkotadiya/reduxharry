import "../../../assets/css/PerformancePage.css";
import { useState,  useEffect, useContext } from "react";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import {infographicReadShowContextactivityring2} from '../../privatePages/performance/PerformancePage'

const ActivityRings = (props) => {

    const [ring1, setRing1] = useState(0);
    const [ring2, setRing2] = useState(0);
    const [ring3, setRing3] = useState(0);
    const [ring4, setRing4] = useState(0);
    
    const [quizzesAttempted,setquizzesAttempted] = useState(0);
    const [quizzesAttemptedTotal,setquizzesAttemptedTotal] = useState(0);
    const [quizzAccuracy,setquizzAccuracy] = useState(0);

    useEffect(() => {

        
        setRing1(props.percent1);
        setRing2(props.percent2);
        setRing3(props.percent3);
        setRing4(props.percent4);
        
        setquizzesAttempted(props.quizzesAttempted);
        setquizzesAttemptedTotal(props.quizzesAttemptedTotal);
        setquizzAccuracy(props.quizzAccuracy);

        

    }, [props])

    let text1 = `Quizzes attempted : ${quizzesAttempted} / ${quizzesAttemptedTotal}`;
    let text2 = `Accuracy of quizzes : ${quizzAccuracy}%`;
    

    
    const infographicReadShowContexteractivityring2 = useContext(infographicReadShowContextactivityring2);

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
                    if(document.getElementById("circleback1r2") &&
                    document.getElementById("circleback2r2") &&
                    document.getElementById("circlecomp1r2") &&
                    document.getElementById("circlecomp2r2") 
                        ) {
                        document.getElementById("circleback2r2").style.stroke = "#e1f3ff85";
                        // document.getElementById("circleback3").style.stroke = "#e1fefd85";
                        // document.getElementById("circleback4").style.stroke = "#fdf8e281";

                        document.getElementById("circlecomp2r2").style.stroke = "#e1f3ff85";
                        // document.getElementById("circlecomp3").style.stroke = "#e1fefd85";
                        // document.getElementById("circlecomp4").style.stroke = "#fdf8e281";
                        
                        }
                        infographicReadShowContexteractivityring2.setQuizzesAccuracyVal(false);
                        infographicReadShowContexteractivityring2.setQuizAverageTimeVal(false);

                }}
                    
                    onHide={()=>{
                        if(document.getElementById("circleback1r2") &&
                    document.getElementById("circleback2r2") &&
                    document.getElementById("circlecomp1r2") &&
                    document.getElementById("circlecomp2r2") 
                        ) {
                        document.getElementById("circleback2r2").style.stroke = "#e1f3ff";
                        // document.getElementById("circleback3").style.stroke = "#e1fefd";
                        // document.getElementById("circleback4").style.stroke = "#fdf8e2";

                        document.getElementById("circlecomp2r2").style.stroke = "#017dcb";
                        // document.getElementById("circlecomp3").style.stroke = "#05948f";
                        // document.getElementById("circlecomp4").style.stroke = "#d7b00f";

                        }
                        infographicReadShowContexteractivityring2.setQuizzesAttemptedVal(true);
                        infographicReadShowContexteractivityring2.setQuizzesAccuracyVal(true);
                        infographicReadShowContexteractivityring2.setQuizAverageTimeVal(true);

                    }}
                >
                <g className="ring ring1" style={{ transform: "scale(1) rotate(-90deg)" }} >
                
                    <circle strokeWidth="3.2" r="16" cx="50%" cy="50%" className="background" id="circleback1r2" />
                    {ring1 > 0 ? <circle strokeWidth="3.2" r="16" cx="50%" cy="50%" className="completed" strokeDasharray={ring1 + ", 100"} id="circlecomp1r2" /> : <div></div>}
                    
                </g>
                </Tippy>
                


                <Tippy content={text2} trigger={'click'} theme="gray"
                    onShow={()=>{
                        if(document.getElementById("circleback1r2") &&
                    document.getElementById("circleback2r2") &&
                    document.getElementById("circlecomp1r2") &&
                    document.getElementById("circlecomp2r2") 
                        ) {
                        document.getElementById("circleback1r2").style.stroke = "#fce4ec";
                        // document.getElementById("circleback3").style.stroke = "#e1fefd85";
                        // document.getElementById("circleback4").style.stroke = "#fdf8e281";

                        document.getElementById("circlecomp1r2").style.stroke = "#fce4ec";
                        // document.getElementById("circlecomp3").style.stroke = "#e1fefd85";
                        // document.getElementById("circlecomp4").style.stroke = "#fdf8e281";
                        }
                        infographicReadShowContexteractivityring2.setQuizzesAttemptedVal(false);
                        infographicReadShowContexteractivityring2.setQuizAverageTimeVal(false);

                    }}
                    onHide={()=>{
                        if(document.getElementById("circleback1r2") &&
                    document.getElementById("circleback2r2") &&
                    document.getElementById("circlecomp1r2") &&
                    document.getElementById("circlecomp2r2") 
                        ) {
                        document.getElementById("circleback1r2").style.stroke = "#fce4ec";
                        // document.getElementById("circleback3").style.stroke = "#e1fefd";
                        // document.getElementById("circleback4").style.stroke = "#fdf8e2";

                        document.getElementById("circlecomp1r2").style.stroke = "#e7316f";
                        // document.getElementById("circlecomp3").style.stroke = "#05948f";
                        // document.getElementById("circlecomp4").style.stroke = "#d7b00f";
                        }
                        infographicReadShowContexteractivityring2.setQuizzesAttemptedVal(true);
                        infographicReadShowContexteractivityring2.setQuizzesAccuracyVal(true);
                        infographicReadShowContexteractivityring2.setQuizAverageTimeVal(true);
                    }}
                >
                <g className="ring ring2" style={{ transform: "scale(0.75) rotate(-90deg)" }} >
                    <circle strokeWidth="4.2" r="16" cx="50%" cy="50%" className="background" id="circleback2r2" />
                    {ring2 > 0 ? <circle strokeWidth="4.2" r="16" cx="50%" cy="50%" className="completed" strokeDasharray={ring2 + ", 100"} id="circlecomp2r2" /> : <div></div>}
                </g>
                </Tippy>
                
                {/* {props.percent3 >= 0 &&

                    <Tippy content={text3} trigger={'click'} theme="gray"
                        onShow={()=>{
                            document.getElementById("circleback1r2").style.stroke = "#fce4ec";
                            document.getElementById("circleback2r2").style.stroke = "#e1f3ff85";
                            document.getElementById("circleback4").style.stroke = "#fdf8e281";

                            document.getElementById("circlecomp1r2").style.stroke = "#fce4ec";
                            document.getElementById("circlecomp2r2").style.stroke = "#e1f3ff85";
                            document.getElementById("circlecomp4").style.stroke = "#fdf8e281";

                            // infographicReadShowContexter.set(false);
                            // infographicReadShowContexter.setinstoryquizAttemptShowVal(false);
                            // infographicReadShowContexter.setVideosWatchedShowVal(false);
                        }}

                        onHide={()=>{
                            document.getElementById("circleback1r2").style.stroke = "#fce4ec";
                            document.getElementById("circleback2r2").style.stroke = "#e1f3ff";
                            document.getElementById("circleback4").style.stroke = "#fdf8e2";

                            document.getElementById("circlecomp1r2").style.stroke = "#e7316f";
                            document.getElementById("circlecomp2r2").style.stroke = "#017dcb";
                            document.getElementById("circlecomp4").style.stroke = "#d7b00f";

                            // infographicReadShowContexter.set(true);
                            // infographicReadShowContexter.setinstoryquizAttemptShowVal(true);
                            // infographicReadShowContexter.setVideosWatchedShowVal(true);
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
                            document.getElementById("circleback1r2").style.stroke = "#fce4ec";
                            document.getElementById("circleback2r2").style.stroke = "#e1f3ff85";
                            document.getElementById("circleback3").style.stroke = "#e1fefd85";

                            document.getElementById("circlecomp1r2").style.stroke = "#fce4ec";
                            document.getElementById("circlecomp2r2").style.stroke = "#e1f3ff85";
                            document.getElementById("circlecomp3").style.stroke = "#e1fefd85";

                            // infographicReadShowContexter.set(false);
                            // infographicReadShowContexter.setinstoryquizAttemptShowVal(false);
                            // infographicReadShowContexter.setInstoryquizAccuracyShowVal(false);
                        }}

                        onHide={()=>{
                            document.getElementById("circleback1r2").style.stroke = "#fce4ec";
                            document.getElementById("circleback2r2").style.stroke = "#e1f3ff";
                            document.getElementById("circleback3").style.stroke = "#e1fefd";

                            document.getElementById("circlecomp1r2").style.stroke = "#e7316f";
                            document.getElementById("circlecomp2r2").style.stroke = "#017dcb";
                            document.getElementById("circlecomp3").style.stroke = "#05948f";

                            // infographicReadShowContexter.setinstoryquizAttemptShowVal(true);
                            // infographicReadShowContexter.setInstoryquizAccuracyShowVal(true);
                            // infographicReadShowContexter.setVideosWatchedShowVal(true);
                        }}
                    >
                    <g className="ring ring4" style={{ transform: "scale(0.25) rotate(-90deg)" }}>
                        <circle strokeWidth="10.8" r="16" cx="50%" cy="50%" className="background" id="circleback4"/>
                        {ring4 > 0 ? <circle strokeWidth="10.8" r="16" cx="50%" cy="50%" className="completed" id="circlecomp4" strokeDasharray={ring4 + ", 100"} /> : <div></div>}
                    </g>
                    </Tippy>
                } */}

            </svg>
            
            
            
            
        </>
    )
}

export default ActivityRings;