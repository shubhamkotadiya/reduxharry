import axios from "axios";
import { setData } from "../actions/subjectListAction";
import apiUrl from "../common/apiUrl";
import { getCorrectAnswer, getCurrentTimeString, getHeaders, getUserUuid, handleError, resetToken, setFirstQuizAttempt } from "../common/helper";

const useSubjectList = (state, dispatch) => {
    const pass_data = {
        data: state.data,
        setData: (data) => {
            dispatch(setData(data))
        },
        getData: async () => {
            return await axios({
                url: apiUrl.subjectList + "?user-uuid=" + getUserUuid(),
                method: "GET",
                headers: getHeaders(),

            }).then(
                (res) => {
                    dispatch(setData(res.data))
                    return { status: true }
                }
            ).catch(
                async (error) => {
                    // if (error.length > 0) {
                    if (error.response.status == 401) {
                        await resetToken(() => { pass_data.getData() });
                    } else {
                        handleError(error)
                    }
                    return { status: false }
                    // }
                }
            )
        }
    }
    return pass_data;
}
export default useSubjectList;