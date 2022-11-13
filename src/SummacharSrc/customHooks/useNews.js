import axios from "axios";
import { setData } from "../actions/newsAction";
import apiUrl from "../common/apiUrl";
import { getFirstAndLastDayofWeek, getHeaders, getMaximumLatestStroy, getUserUuid, handleError, isFreeTrial, isFromLastMonth, resetToken, setMonthToStr, setReadStatus } from "../common/helper";

const useNews = (state, newsDispatch) => {
    const getData = async (page_no, calledForFreeStories = "") => {
        let url = apiUrl.newsUrl + "?user-uuid=" + getUserUuid() + "&category=regular&academic_subjects=News&is_free_access=false" + '&page=' + page_no
        if (calledForFreeStories != "") {
            url = apiUrl.newsUrl + "?user-uuid=" + getUserUuid() + "&category=regular&academic_subjects=News&is_free_access=true" + '&page=' + page_no
        } else {
            url = apiUrl.newsUrl + "?user-uuid=" + getUserUuid() + "&category=regular&academic_subjects=News&is_free_access=false" + '&page=' + page_no
        }
        return await axios({
            url: url,
            method: "GET",
            headers: getHeaders()
        }).then(res => {
            if (res.status == 200 || res.status == 201) {
                return { status: true, code: res.status, data: res.data }
            }
        })
            .catch(error => {
                handleError(error)
                return { status: false, code: error.response.status }
            })
    }
    const pass_obj = {
        data: state.data,
        next: state.next,
        pageNo: state.pageNo,
        currentTarget: state.currentTarget,
        setData: (data) => {
            newsDispatch(setData(data));
        },
        getData: async (calledForFreeStories = "") => {
            const temp = { ...state }
            const response = await getData(temp.pageNo, calledForFreeStories);
            if (response.status) {
                const next = response.data.next;

                let pageNo = temp.pageNo;
                if (next && next != "") {
                    pageNo += 1
                }
                let data = temp.data;
                let latestStrories = 0;
                if (data.latest && Object.keys(data.latest).length > 0) {
                    latestStrories = data.latest.length;
                }


                const weekDetails = getFirstAndLastDayofWeek()
                const currentDate = new Date();
                const curentMonthStartTime = new Date(currentDate.getFullYear(), currentDate.getMonth()).getTime()
                for (let row of response.data.results) {
                    const date = new Date(row.published_date)

                    const totalTime = date.getTime()
                    const weekEndTime = weekDetails.end.getTime()
                    const weekStartTime = weekDetails.start.getTime()

                    if (!isFreeTrial()) {
                        if (totalTime <= weekEndTime && totalTime >= weekStartTime) {
                            if (!data.this_week) {
                                data['this_week'] = {}
                            }

                            Object.assign(data.this_week, { [row.slug]: row })
                        } else if (totalTime > curentMonthStartTime) {
                            if (!data.this_month) {
                                data['this_month'] = {}
                            }

                            Object.assign(data.this_month, { [row.slug]: row })
                        } else {
                            const month_str = setMonthToStr(date.getMonth(), true) + " " + date.getFullYear();

                            if (!data[month_str]) {
                                data[month_str] = {}
                            }
                            data[month_str][row.slug] = row
                        }
                    } else {
                        if (calledForFreeStories != "") {
                            if (!data.top_news) {
                                data['top_news'] = {}
                            }

                            Object.assign(data.top_news, { [row.slug]: row })
                        } else {
                            if (!data.more_news) {
                                data['more_news'] = {}
                            }

                            Object.assign(data.more_news, { [row.slug]: { ...row, user_has_access: false } })
                        }

                    }
                    // if(){

                    // }
                    // if (latestStrories < getMaximumLatestStroy().news) {
                    //     if (!data.latest) {
                    //         data['latest'] = {}
                    //     }
                    //     Object.assign(data.latest, { [row.slug]: row })
                    //     latestStrories += 1;
                    // } else if (isFromLastMonth(row.published_date)) {
                    //     if (!data['earlier_this_month']) {
                    //         data['earlier_this_month'] = {}
                    //     }
                    //     Object.assign(data['earlier_this_month'], { [row.slug]: row })
                    // } else {
                    //     if (!data['earlier_this_year']) {
                    //         data['earlier_this_year'] = {}
                    //     }
                    // Object.assign(data['earlier_this_year'], { [row.slug]: row })
                    // }

                }
                // console.log(data)
                newsDispatch(setData({ data: data, pageNo: pageNo, next: next, currentTarget: "" }));
            } else {
                if (response.code == 401) {
                    await resetToken(async () => { await pass_obj.getData() });
                    // await getData(temp.pageNo)
                }
            }

        },
        setQuiz: async (storySlug, storyUUid, QuestionUuid, answer, questinIndexInslides) => {
            let pass_data = {
                source: "story",
                source_id: storyUUid,
                attempt_answer: answer,
                attempt_time: 0
            };
            const temp = { ...state }
            const type = temp.currentTarget;
            // //console.log("type = ",type)
            // //console.log("storySlug = ",storySlug)
            // //console.log("storyUUid = ",storyUUid)

            // //console.log("QuestionUuid = ",QuestionUuid)
            // //console.log("answer = ",answer)
            // //console.log(questinIndexInslides)
            // //console.log("in")            

            if (type != "" && type != "from_bookmark") {

                const attempt = {
                    attempt_answer: answer,
                    user_points: 0.00,
                    is_correct: temp.data[type][storySlug].slides[questinIndexInslides].answer === answer,
                    attempt_time: 0,
                    attempt_file: null
                }
                if (temp.data[type][storySlug]) {
                    temp.data[type][storySlug].slides[questinIndexInslides].attempt = attempt
                    newsDispatch(setData(temp));
                }
            }
            if (type === "from_bookmark") {

                if (Object.keys(temp.data).length > 0) {
                    for (let tempType of Object.keys(temp.data)) {

                        if (temp.data[tempType][storySlug]) {
                            // //console.log(temp.data[tempType][storySlug].slides[questinIndexInslides])
                            const attempt = {
                                attempt_answer: answer,
                                user_points: 0.00,
                                is_correct: temp.data[tempType][storySlug].slides[questinIndexInslides].answer === answer,
                                attempt_time: 0,
                                attempt_file: null
                            }
                            temp.data[tempType][storySlug].slides[questinIndexInslides].attempt = attempt
                            newsDispatch(setData(temp));
                            break;
                        }
                    }

                }

            }
            pass_obj.setRead(storySlug, storyUUid, temp);

            return await axios({
                url: apiUrl.inStoryQuizSubmit + QuestionUuid + "/" + "?user-uuid=" + getUserUuid(),
                method: "POST",
                data: pass_data,
                headers: getHeaders(),
            }).then(() => {
                return { status: true }
            }).catch((error) => {
                handleError(error)
                return { status: false }
            })
        },
        setRead: (storySlug, storyUUid, updatedData = {}) => {
            const temp = updatedData && Object.keys(updatedData).length > 0 ? { ...updatedData } : { ...state }
            const type = temp.currentTarget;
            let total_instory_quiz = 0;
            let attepted_quiz = 0;
            let read_status = false;




            if (type != "" && type != "from_bookmark") {
                if (temp.data[type][storySlug]) {
                    if (temp.data[type][storySlug]) {
                        if (!temp.data[type][storySlug].has_read) {
                            for (let row of temp.data[type][storySlug].slides) {
                                if (row.slide_type === "Question") {
                                    total_instory_quiz += 1;
                                    if (row.attempt && Object.keys(row.attempt).length > 0) {
                                        attepted_quiz += 1;

                                    }
                                }

                            }
                            if (attepted_quiz === total_instory_quiz) {
                                read_status = true;
                                setReadStatus(temp.data[type][storySlug].uuid)
                            }
                        } else {
                            read_status = true;
                        }
                    }
                    temp.data[type][storySlug].has_read = read_status
                    temp.data[type][storySlug].read_timestamp = new Date().toISOString()

                    newsDispatch(setData(temp));
                }
            }
            if (type === "from_bookmark") {
                if (Object.keys(temp.data).length > 0) {
                    for (let tempType of Object.keys(temp.data)) {

                        if (temp.data[tempType] && temp.data[tempType][storySlug]) {

                            if (temp.data[tempType] && !temp.data[tempType][storySlug].has_read) {
                                for (let row of temp.data[tempType][storySlug].slides) {
                                    if (row.slide_type === "Question") {
                                        total_instory_quiz += 1;
                                        if (row.attempt && Object.keys(row.attempt).length > 0) {
                                            attepted_quiz += 1;
                                        }
                                    }

                                }
                                if (attepted_quiz === total_instory_quiz) {
                                    read_status = true;
                                    setReadStatus(temp.data[tempType][storySlug].uuid)
                                }
                            } else {
                                read_status = true;
                            }

                            temp.data[tempType][storySlug].has_read = read_status
                            temp.data[tempType][storySlug].read_timestamp = new Date().toISOString()
                            newsDispatch(setData(temp));
                            break;
                        }
                    }
                }
            }


        },
        setBookMark: async (type, slug, uuid, status) => {

            const temp = { ...state }

            const res = await axios({
                url: apiUrl.bookMarkUrl + uuid + "/" + "?user-uuid=" + getUserUuid(),
                method: "POST",
                data: {
                    has_bookmarked: status == true ? "True" : "False"
                },
                headers: getHeaders()
            }).then((res) => {
                if (type != "" && type != "from_bookmark") {
                    if (temp.data[type][slug]) {
                        temp.data[type][slug].has_bookmarked = status
                        newsDispatch(setData(temp));
                        return { status: true }
                    }
                }
                if (type == "" || !type) {

                    return { status: true, data: res.data }
                }
                if (type === "from_bookmark") {
                    if (Object.keys(temp.data).length > 0) {

                        for (let tempType of Object.keys(temp.data)) {
                            if (temp.data[tempType][slug]) {
                                temp.data[tempType][slug].has_bookmarked = status
                                newsDispatch(setData(temp));
                                return { status: true, data: res.data }
                            }
                        }


                    }
                    return { status: true, data: res.data }
                }
                return { status: false }
            }).catch((error) => {
                console.log(error)
                handleError(error)
                return { status: false, error: error }
            })

            if (res.status) {
                // if (type == "" || !type) {
                return { status: true, data: res.data }
                // }
                return { status: true }
            } else {
                if (res.error && res.error.response && res.error.response.status == 401) {
                    const response = await resetToken();

                    if (response) {
                        await this.setBookMark(type, slug, uuid, status);
                    } else {
                        return { status: false }
                    }

                } else {
                    return { status: false }
                }
            }


        },
        setcurrentTarget: (target) => {
            // target should be 
            // latest
            // earlier_this_month            
            // earlier_this_year
            newsDispatch(setData({ ...state, currentTarget: target }))
        }
    }
    return pass_obj;
}
export default useNews;