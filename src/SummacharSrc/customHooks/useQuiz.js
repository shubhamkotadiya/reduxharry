import axios from "axios";
import { useContext } from "react";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import { setData } from "../actions/quizAction";
import apiUrl from "../common/apiUrl";
import { getCorrectAnswer, getCurrentTimeString, getFirstQuizAttempt, getHeaders, getUserUuid, handleError, isFreeTrial, setFirstQuizAttempt } from "../common/helper";
import { LockingSystemContext } from "../components/lockingsystem/LockingSysytemPopUp";

const useQuiz = (state, dispatchQuiz) => {
    const history = useHistory()
    const lockSystem = useContext(LockingSystemContext)
    return {
        data: state.data,
        hasAttempted: state.hasAttempted,
        score: state.score,
        totalScore: state.totalScore,
        getData: async (slug) => {
            return await axios({
                url: apiUrl.quizUrl + slug + "/?user-uuid=" + getUserUuid(),
                method: "GET",
                headers: getHeaders()
            }).then((response) => {
                if (response.status == 200 || response.status == 201) {
                    const data = response.data;
                    const questions = response.data.questions_associated;
                    const hasAttempted = response.data.has_attempted;
                    let score = 0;
                    let totalScore = 0
                    if (hasAttempted) {
                        for (let question of questions) {
                            if (Object.keys(question.attempt).length > 0) {
                                if (question.attempt.user_points) {
                                    score += parseInt(question.attempt.user_points);
                                }

                            }
                            if (question.points_per_question) {
                                totalScore += parseInt(question.points_per_question);
                            }
                        }
                    }else{
                        if(!data.user_has_access){
                            
                            history.push('/home');
                            lockSystem.openPopUp("ONLY_TEXT","This story is for our premium users. Go Premium to access all content.")
                        }
                    }

                    dispatchQuiz(setData({ ...state, data: questions, hasAttempted: hasAttempted, score: score, totalScore: totalScore }));
                }
                return { status: true, data: response.data.questions_associated };
            }).catch((err) => {
                handleError(err)
                return { status: true, message: err.response.status };
            })
        },
        submitAnswer: (answer, optionIndex, questionIndex, timeTaken) => {
            const data = { ...state }
            const questionData = data.data;

            let attempt = {
                attempt_answer: answer,
                attempt_file: null,
                attempt_time: timeTaken,
                is_correct: false
            }
            let score = data.score
            if (answer == questionData[questionIndex].answer) {
                attempt.is_correct = true;
                score += Math.round(questionData[questionIndex].points_per_question * (1 - ((timeTaken) / (2 * questionData[questionIndex].time_per_question))))
            }

            questionData[questionIndex].attempt = attempt;
            //adding his answer in option_count
            const count = questionData[questionIndex].options_count[optionIndex] + 1
            questionData[questionIndex].options_count[optionIndex] = count
            //change score 
            
            // this.score += Math.round(this.getQuiz().data[this.current].points_per_question * (1-((this.getQuiz().data[this.current].time_per_question - this.attemptTime[this.current].time_taken_seconds) / (2 * this.getQuiz().data[this.current].time_per_question))));            
            
            dispatchQuiz(setData({ ...state, data: questionData, score: score }))
        },
        submitQuiz: async (slug) => {


            const data = { ...state };
            const startTime = data.quizStartedTime;
            const endTime = getCurrentTimeString();
            const questionDetails = data.data;
            let pass_data = {
                user_start_time: startTime,
                user_end_time: endTime,
                submit_flag: "submit",
                user_attempts: []
            }
            let i = 0
            for (let question of questionDetails) {
                if (Object.keys(question.attempt).length > 0) {
                    pass_data.user_attempts[i] = {
                        uuid: question.uuid,
                        attempt_answer: question.attempt.attempt_answer,
                        time_taken_seconds: question.attempt.attempt_time
                    }
                    i++;
                }
            }
            
           return axios({
                url:apiUrl.submitQuizUrl + slug + "/"+"?user-uuid="+getUserUuid(),
                method:"POST",
                data:pass_data,
                headers:getHeaders()
            }).then((res)=>{
                if(res.status==200 || res.status==201){
                    setFirstQuizAttempt()
                    return {status:true,data:res.data}
                }else{
                    return {status:false,message:"OOPS! Something went wrong!"}
                }
            }).catch((err)=>{
                handleError(err)
                return {status:false,message:err.response.message,code:err.response.code}
            })
        }
    }
}
export default useQuiz;