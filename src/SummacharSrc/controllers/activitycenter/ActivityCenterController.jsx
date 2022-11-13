import axios from "axios";
import React, { createContext, useContext, useEffect, useLayoutEffect, useState } from "react";
import { useHistory, useRouteMatch, useLocation } from "react-router";
import { setData } from "../../actions/newsAction";
import { BreadCrumbContext, Store } from "../../App";
import apiUrl from "../../common/apiUrl";
import { getHeaders, getUserUuid, handleError, resetToken, setAuthToken } from "../../common/helper";
import ActivityCenterPage from "../../pages/privatePages/activityCenter/ActivityCenterPage";
import { LockingSystemContext } from "../../components/lockingsystem/LockingSysytemPopUp";

const getData = async (quiz, setQuiz, path, wantPageSize = true, wantPageNo = true, setCurrentPage = 1) => {
    if (!quiz.loading) {
        setQuiz({ ...quiz, loading: true })
        let data = { ...quiz };
        let url = path + "/" + "?user-uuid=" + getUserUuid() + "&academic_subjects=News";
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


            setQuiz({ ...data, loading: false, currentPage: setCurrentPage })
            return { status: true }



        }).catch(async (error) => {
            if (error.response.status == 401) {
                await resetToken();
                await getData(quiz, setQuiz, path, wantPageSize, wantPageNo, setCurrentPage)
                setQuiz({ ...quiz, loading: false })
            } else {
                setQuiz({ ...quiz, loading: false })
                handleError(error)
            }

            return { status: false, error: error }
        })
    }


}
const ActivityCenterController = (props) => {

    // const [popularQuiz, setPopularQuiz] = useState({ loading: false, data: [], count: 0, pageSize: 4, page: 1, currentPage: 1 })
    // const [upcomingQuiz, setUpcomingQuiz] = useState({ loading: false, data: [], count: 0, pageSize: 4, page: 1, currentPage: 1 })
    // const [practice, setpractice] = useState({ loading: false, data: [], count: 0, pageSize: 4, page: 1, currentPage: 1 })
    // const [recent, setRecent] = useState({ loading: false, data: [], count: 0, pageSize: 4, page: 1, currentPage: 1 })

    const context = useContext(Store);
    const lockSystem = useContext(LockingSystemContext)

    const user = context.user.data

    const liveQuizContext = context.liveQuiz;
    const liveQuiz = liveQuizContext.data;
    const setLiveQuiz = liveQuizContext.setData;

    const freeQuizContext = context.freeQuiz;
    const freeQuiz = freeQuizContext.data;
    const setfreeQuiz = freeQuizContext.setData;


    const newestFirstContext = context.newestFirst;
    const newestFirst = newestFirstContext.data;
    const setnewestFirst = newestFirstContext.setData;

    const attemptedFirstContext = context.attemptedFirst;
    const attemptedFirst = attemptedFirstContext.data;
    const setattemptedFirst = attemptedFirstContext.setData;

    const unAttemptedFirstContext = context.unAttemptedFirst;
    const unAttemptedFirst = unAttemptedFirstContext.data;
    const setunAttemptedFirst = unAttemptedFirstContext.setData;

    const popularQuizContext = context.popularQuiz;
    const popularQuiz = popularQuizContext.data;
    const setPopularQuiz = popularQuizContext.setData;

    const upcomingQuizContext = context.upcomingQuiz;
    const upcomingQuiz = upcomingQuizContext.data;
    const setUpcomingQuiz = upcomingQuizContext.setData;

    const practiceQuizContext = context.practiceQuiz;
    const practice = practiceQuizContext.data;
    const setpractice = practiceQuizContext.setData;

    const recentQuizContext = context.recentQuiz;
    const recent = recentQuizContext.data;
    const setRecent = recentQuizContext.setData;


    const popUpData = props.popUpData;
    const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight })
    const [loading, setLoading] = useState(false)

    const onResize = () => {
        let height = window.innerHeight;
        let width = window.innerWidth;

        setWindowSize({ width: width, height: height })
    }
    useEffect(() => {
        onResize();
        window.addEventListener('resize', onResize)
        return () => { return window.removeEventListener('resize', onResize) }
    }, [])
    const [dropDown, setDropDown] = useState({ visiblity: false, value: "practice" })
    const openPopUp = (type, slug, image) => {
        // setpopUpData({ type: type, slug: slug, image: image });
        // if (type != "") {
        //     history.push(path + "/rules-and-eligibility")
        // } else {
        //     history.push(path);
        // }
        props.openPopUp(type, slug, image)

    }
    const location = useLocation()
    const history = useHistory()
    useLayoutEffect(() => {
        if (location.pathname == "/activities/rules-and-eligibility") {
            history.push("/activities")
        }
    }, [])
    useEffect(async () => {
        if (liveQuiz.data && liveQuiz.data.length <= 0) {
            liveQuizContext.getData("live", false, false)
        }

        if (freeQuiz.data && freeQuiz.data.length <= 0 && user.user_type === "FREE_USER") {
            freeQuizContext.getData("all")
        }

        if (upcomingQuiz.data && upcomingQuiz.data.length <= 0 && user.user_type !== "FREE_USER") {
            upcomingQuizContext.getData("upcoming")
        }      
    }, [])

    const changePage = async (direction, path, state, setState) => {
        const data = { ...state };
        if (direction == "next") {
            // alert(data.currentPage + 1 + " " + (data.count / data.pageSize))
            if (data.currentPage + 1 <= Math.ceil(data.count / data.pageSize)) {
                if (data.data.length < (((data.currentPage + 1) * data.pageSize) - (data.pageSize - 1))) {
                    const response = await getData(state, setState, path, true, true, data.currentPage + 1);
                } else {
                    setState({ ...state, currentPage: data.currentPage + 1 })
                }
            }
        } else {
            if (data.currentPage - 1 >= 1) {
                setState({ ...state, currentPage: data.currentPage - 1 })
            }
        }
    }

    useEffect(() => {
        (async () => {
            if (dropDown.value === "practice" && newestFirst.data && newestFirst.data.length <= 0) {
                setLoading(true)
                await newestFirstContext.getData(dropDown.value)
                setLoading(false)
            }
            if (dropDown.value === "unattempted_first" && unAttemptedFirst.data && unAttemptedFirst.data.length <= 0) {
                setLoading(true)
                await unAttemptedFirstContext.getData(dropDown.value)
                setLoading(false)
            }
            if (dropDown.value === "attempted_first" && attemptedFirst.data && attemptedFirst.data.length <= 0) {
                setLoading(true)
                await attemptedFirstContext.getData(dropDown.value)
                setLoading(false)
            }
        })()
    }, [dropDown.value])

    const setDropdownData = (value, status = false) => {
        if (value != "") {
            setDropDown({ visiblity: status, value: value })
        } else {
            setDropDown({ ...dropDown, visiblity: status });
        }
    }

    const [scrollLoading, setScrollLoading] = useState(false)
    const onScroll = async(e) => {

        // const height
        if ((e.target.clientHeight + e.target.scrollTop) > (e.target.scrollHeight / 2)) {
            
            if (dropDown.value === "practice" && !newestFirst.loading) {
                setScrollLoading(true)
                await changePage("next", "practice", newestFirst, setnewestFirst)
                setScrollLoading(false)

            }
            if (dropDown.value === "unattempted_first" && !unAttemptedFirst.loading) {

                setScrollLoading(true)
                await  changePage("next", "unattempted_first", unAttemptedFirst, setunAttemptedFirst)
                setScrollLoading(false)

            }
            if (dropDown.value === "attempted_first" && !attemptedFirst.loading) {
                setScrollLoading(true)
                await  changePage("next", "attempted_first", attemptedFirst, setattemptedFirst)
                setScrollLoading(false)
            }
        }

    }
    return (
        <>        
            <ActivityCenterPage

                changePage={changePage}
                onScroll={onScroll}
                setDropdownData={setDropdownData}
                dropDown={dropDown}
                popUpData={popUpData}
                openPopUp={openPopUp}
                freeQuiz={freeQuiz}
                liveQuiz={liveQuiz}
                setLiveQuiz={setLiveQuiz}
                scrollLoading={scrollLoading}
                popularQuiz={popularQuiz}
                setPopularQuiz={setPopularQuiz}

                newestFirst={newestFirst}
                attemptedFirst={attemptedFirst}
                unAttemptedFirst={unAttemptedFirst}

                upcomingQuiz={upcomingQuiz}
                setUpcomingQuiz={setUpcomingQuiz}

                loading={loading}

                practice={practice}
                setpractice={setpractice}

                recent={recent}
                setRecent={setRecent}
                lockSystem={props.lockSystem}

            />
        </>
    )
}
export default ActivityCenterController;