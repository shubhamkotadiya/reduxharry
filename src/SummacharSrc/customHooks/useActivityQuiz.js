import { setData } from "../actions/activityQuizAction"
import { getUserUuid, handleError, resetToken } from "../common/helper";
import axios from "axios";
import apiUrl from "../common/apiUrl";
import { getHeaders } from "../common/helper";
const useActivityQuiz = (state, dispatch) => {

    const getData = async (quiz, path, wantPageSize = true, wantPageNo = true, setCurrentPage = 1) => {
        if (!quiz.loading) {
            dispatch(setData({ ...quiz, loading: true }))
            let data = { ...quiz };
            let url = path + "/?user-uuid=" + getUserUuid() + "&academic_subjects=News";
            if (path === "all") {
                url = path + "/?user-uuid=" + getUserUuid() + "&academic_subjects=News&is_free_access=true";
            }
            if (wantPageNo && !wantPageSize) {
                url += "&page=" + data.page;
            }
            if (wantPageSize && !wantPageNo) {
                url += "&page_size=" + data.pageSize
            }
            if (wantPageSize && wantPageNo) {
                url += "&page=" + data.page + "&" + "page_size=" + data.pageSize
            }


            return await axios({
                url: apiUrl.activitiesUrl + url,
                method: "GET",
                headers: getHeaders()
            }).then((response) => {
                if (response.status == 200 || response.status == 201) {

                    if (response.data.links.next && response.data.links.next != null) {
                        data.page = parseInt(response.data.page) + 1;
                    }
                    if (response.data.total && response.data.total != 0) {
                        data.count = parseInt(response.data.total);
                    }
                    if (response.data.page_size && response.data.page_size != 0) {
                        data.pageSize = parseInt(response.data.page_size);
                    }
                    if (response.data.results && response.data.results.length > 0) {
                        data.data = data.data.concat(response.data.results)
                    }


                }


                dispatch(setData({ ...data, loading: false, currentPage: setCurrentPage }))
                return { status: true }



            }).catch(async (error) => {
                if (error.response.status == 401) {
                    await resetToken();
                    await getData(quiz, path, wantPageSize, wantPageNo, setCurrentPage)
                    dispatch(setData({ ...quiz, loading: false }))
                } else {
                    handleError(error)
                    dispatch(setData({ ...quiz, loading: false }))
                }

                return { status: false, error: error }
            })
        }


    }



    return {
        data: state,
        getData: async (path, wantPageSize = true, wantPageNo = true, setCurrentPage = 1) => {
            return await getData({ ...state }, path, wantPageSize, wantPageNo, setCurrentPage);
        },
        setData: (data) => {
            dispatch(setData(data))
        }
    }
}
export default useActivityQuiz;