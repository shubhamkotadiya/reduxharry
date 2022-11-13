import axios from "axios";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import { setData } from "../actions/stuffAction";
import apiUrl from "../common/apiUrl";
import { getCorrectAnswer, getCurrentTimeString, getFirstQuizAttempt, getHeaders, getUserUuid, handleError, isFreeTrial, resetToken, setFirstQuizAttempt } from "../common/helper";

const useStuff = (state, dispatchStuff) => {
    const history = useHistory()
    const submitQuiz = async (answer, uuid) => {

        const data = { ...state };
        const pass_data = { "answer": answer };

        await axios({
            url: apiUrl.questionofTheDayUrl + uuid + "/?user-uuid=" + getUserUuid(),
            method: "POST",
            data: pass_data,
            headers: getHeaders()
        }).then((res) => {
            if (res.status == 200 || res.status == 201) {
                return { status: true, data: res.data }
            } else {
                return { status: false, message: "OOPS! Something went wrong!" }
            }
        }).catch((err) => {
            handleError(err)
            return { status: false, message: err.response.message, code: err.response.code }
        })
    }
    const pass_data = {
        data: state.data,
        getData: async () => {
            return await axios({
                url: apiUrl.stuffUrl + "?user-uuid=" + getUserUuid(),
                method: "GET",
                headers: getHeaders()
            }).then((response) => {
                if (response.status == 200 || response.status == 201) {
                    var data = response.data;
                    dispatchStuff(setData({ ...state, data: data }));
                }
                return { status: true, data: response.data };
            }).catch((err) => {
                handleError(err)
                return { status: true, message: err.response.status };
            })
        },
        submitAnswer: (answer, uuid) => {
            const data = { ...state }
            const questionData = data.data;
            let attempt = {
                attempt_answer: answer,
                attempt_file: null,
                attempt_time: null,
                is_correct: false
            }

            if (answer == questionData[3].question.answer) {
                attempt.is_correct = true;
            }
            else {
                attempt.is_correct = false;
            }

            questionData[3].is_attempted = true;
            questionData[3].question.attempt = attempt;

            const submit = submitQuiz(answer, uuid);



            dispatchStuff(setData({ ...state, data: questionData }))
        },
        submitRange: async (range, uuid) => {
            let body_ele = {
                "rating": range
            }

            const data = { ...state }
            const questionData = data.data;
            questionData[1].stuff_rating = range;
            dispatchStuff(setData({ ...state, data: questionData }))

            await axios({
                url: apiUrl.rateJokeUrl + uuid + "/?user-uuid=" + getUserUuid(),
                method: "POST",
                data: body_ele,
                headers: getHeaders()
            }).then((res) => {
                if (res.status == 200 || res.status == 201) {
                    return { status: true, data: res.data }
                } else {
                    return { status: false, message: "OOPS! Something went wrong!" }
                }
            }).catch((err) => {

                if (err.response.status === 401) {
                    return resetToken(async () => { await pass_data.submitRange(range, uuid) })
                }
                handleError(err)
                return { status: false, message: err.response.message, code: err.response.code }
            })
        }

    }
    return pass_data

}
export default useStuff;
