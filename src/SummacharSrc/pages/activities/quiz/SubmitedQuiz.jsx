import { useHistory ,useParams} from "react-router";
import Bubble from "./Bubble";
import CloseBtn from "./CloseBtn";

const SubmitedQuiz = (Props) => {
    const total = parseInt(Props.correct) + parseInt(Props.inCorrect) + parseInt(Props.missed)
    const history = useHistory();
    const params = useParams()
    console.log(params)
    // Showing custom button based on score
    var result = Props.score / Props.totalScore;

    var text, result_txt;
    if (result < 0.35) {
        result_txt = <h1 className="option-typography" style={{ color: "#000", fontWeight: "600" }}>Oops! Better luck next time!</h1>
        text = <p className="sub-headings-typography txt-gray" > You can do better! All the best for your next activity!</p>
    }
    else if (result > 0.35 && result < 0.50) {
        result_txt = <h1 className="option-typography" style={{ color: "#000", fontWeight: "600" }}>Not bad! Better luck next time!</h1>
        text = <p className="sub-headings-typography txt-gray" > You can do better! All the best for your next activity!</p>
    } else if (result > 0.50 && result < 0.75) {
        result_txt = <h1 className="option-typography" style={{ color: "#000", fontWeight: "600" }}>Good performance!</h1>
        text = <p className="sub-headings-typography txt-gray" >There is still scope for improvement</p>
    } else if (result > 0.75) {
        result_txt = <h1 className="option-typography" style={{ color: "#000", fontWeight: "600" }}>Congratulations! You are a genius!</h1>
        text = <p className="sub-headings-typography txt-gray" >Amazing! Kudos to you for getting most questions correct! Keep up the good work.</p>
    } else {
        result_txt = <h1 className="option-typography" style={{ color: "#000", fontWeight: "600" }}>Oops! Better luck next time!</h1>
        text = <p className="sub-headings-typography txt-gray" > You can do better! All the best for your next activity!</p>
    }



    return (
        <div className="main_quiz_container_inner result_area main_quiz_body df flex-1 row-center p-primary" style={{ height: "auto", flexDirection: "column" }}>
            <div className="df row column">


                <div className="row df center" >
                    {/* <div><CloseBtn isSubmited={false} hide={true} submitQuiz={Props.submitQuiz} hasAttempted={Props.hasAttempted} /></div> */}
                    <h1 className="question-typography txt-primary">{Props.score + "/" + Props.totalScore}</h1>
                    {/* <div><CloseBtn isSubmited={false} submitQuiz={Props.submitQuiz} hasAttempted={Props.hasAttempted} /></div> */}
                </div>
                <div className="question-typography df center column m-v-primary" >
                    {result_txt}
                    {/* {Props.score/Props.totalScore<0.50 && <h1 className="txt-large" style={{color:"#000"}}>Not Bad! Better Luck Next Time!</h1>}
                {Props.score/Props.totalScore>=0.50  && <h1 className="txt-large" style={{color:"#000"}}>Great performance!</h1>} */}

                    {text}
                    {/* {Props.score/Props.totalScore<0.50 && <p className="txt-medium" style={{color:"#000"}}> You can do better! All the best for your next activity!</p>}
                {Props.score/Props.totalScore>=0.50  && <p className="txt-medium" style={{color:"#000"}}>Amazing! Kudos to you for getting most questions correct! Keep up the good work.</p>} */}
                </div>
            </div>
            <div className="row df row-center bubble_area m-v-primary">
                <div className="df center" style={{ flexDirection: "column" }}>
                    <Bubble
                        value={(Props.correct / total) * 100}
                        count={Props.correct}
                        type="success"
                    />
                    <h1 className="option-typography line-margin-small" style={{ fontWeight: "600", color: "#0C0A29" }}>Correct</h1>
                </div>
                <div className="df center" style={{ flexDirection: "column" }}>
                    <Bubble
                        value={(Props.inCorrect / total) * 100}
                        count={Props.inCorrect}
                        type="danger"
                    />
                    <h1 className="option-typography line-margin-small" style={{ fontWeight: "600", color: "#0C0A29" }}>Wrong</h1>
                </div>
                <div className="df center" style={{ flexDirection: "column" }}>
                    <Bubble
                        value={(Props.missed / total) * 100}
                        count={Props.missed}
                        type="default"
                    />
                    <h1 className="option-typography line-margin-small" style={{ fontWeight: "600", color: "#0C0A29" }}>Missed</h1>
                </div>

            </div>
            <div className="df column row" style={{ marginBottom: "100px" }}>
                <button className="btn btn-primary m-v-primary radius-primary row " onClick={() => {

                    if (params.from_notification && params.from_notification == 'true') {
                        history.push("/activities")
                    } else {
                        history.goBack()
                    }




                }} style={{ width: '95%', maxWidth: "500px" }}>
                    Done

                </button>
                <div className="df row  m-v-primary" style={{ height: "20px", flex: 0 }}>

                </div>
            </div>


        </div>
    )
}
export default SubmitedQuiz;