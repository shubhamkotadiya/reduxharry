import { useState } from "react";

const FAQ = (props) => {
    const listIcon = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L']
    const [answerVisiblity, setAnswerVisiblity] = useState(props.visiblity ? props.visiblity : false)
    return (
        <>
            <div className="row column faq-border df m-v-primary p-relative radius-primary ">

                <div className="row df radius-primary row-center p-relative p-primary pointer faq-question" onClick={() => { setAnswerVisiblity(!answerVisiblity) }}>
                    {!answerVisiblity && <div className="faq-hover"></div>}
                    <h2 className="faq-main txt-primary df flex-1 p-relative" style={{zIndex:11}}>{props.question}</h2>
                    <div className="df center" style={{ height: "30px", width: "30px", transition: "all 0.3s linear", transform: answerVisiblity ? "rotate(-90deg)" : "rotate(90deg)" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="28" viewBox="0 0 17 28" fill="none">
                            <path d="M0.953818 26.6815C0.476756 26.2016 0.208983 25.5524 0.208983 24.8758C0.208983 24.1991 0.476756 23.5499 0.953818 23.07L10.0212 13.8746L0.953819 4.80721C0.476757 4.3273 0.208984 3.67811 0.208984 3.00143C0.208984 2.32475 0.476757 1.67555 0.953819 1.19565C1.19193 0.955569 1.47523 0.765016 1.78736 0.634977C2.09949 0.504938 2.43428 0.437988 2.77241 0.437988C3.11055 0.437988 3.44534 0.504938 3.75747 0.634977C4.0696 0.765016 4.35289 0.95557 4.591 1.19565L15.4513 12.056C15.6914 12.2941 15.882 12.5774 16.012 12.8895C16.142 13.2016 16.209 13.5364 16.209 13.8746C16.209 14.2127 16.142 14.5475 16.012 14.8596C15.882 15.1717 15.6914 15.455 15.4513 15.6932L4.591 26.6815C4.35289 26.9216 4.06959 27.1122 3.75746 27.2422C3.44533 27.3722 3.11055 27.4392 2.77241 27.4392C2.43428 27.4392 2.09949 27.3722 1.78736 27.2422C1.47523 27.1122 1.19193 26.9216 0.953818 26.6815Z" fill="#5C56D4" />
                        </svg>
                    </div>
                </div>
                {answerVisiblity &&
                    <div className="row df  column p-primary">
                        {/*{ props.answer &&  props.answer.list && */}
                        {/*    <ol  className="row df column" style={{paddingLeft:"inherit"}}>*/}
                        {/*        {props.answer.list.map((data,index)=>{*/}
                        {/*            return(*/}
                        {/*                <li className="df line-margin-small row" key={index} dangerouslySetInnerHTML={{__html: "<b >"+ listIcon[index] + '. </b> ' + data}}></li>*/}
                        {/*            )*/}
                        {/*        })}*/}
                        {/*    </ol>*/}
                        {/*}*/}
                        {props.answer && props.answer.otherContent && props.answer.otherContent.length > 0 &&
                            <div className="row df column">
                                {props.answer.otherContent.map((data, index) => {
                                    return (
                                        <span key={index} dangerouslySetInnerHTML={{ __html: data }}></span>
                                    )
                                })}
                            </div>
                        }
                    </div>}
            </div>
        </>
    )
}
export default FAQ;