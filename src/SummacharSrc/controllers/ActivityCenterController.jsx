import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router";
import { setData } from "../actions/newsAction";
import { BreadCrumbContext, Store } from "../App";
import apiUrl from "../common/apiUrl";
import { getHeaders, getUserUuid, handleError, resetToken, setAuthToken } from "../common/helper";
import ActivityCenterPage from "../pages/privatePages/activityCenter/ActivityCenterPage";

const getData = async (quiz, setQuiz, path, wantPageSize = true, wantPageNo = true, setCurrentPage = 1) => {
    if (!quiz.loading) {
        setQuiz({ ...quiz, loading: true })
        let data = { ...quiz };
        let url = path + "/" + "?user-uuid="+getUserUuid()+"&academic_subjects=News";
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
            url: apiUrl.activitiesUrl + url ,
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
const ActivityCenterController = () => {
    const history = useHistory();
    const {path,url} = useRouteMatch()
    // const [popularQuiz, setPopularQuiz] = useState({ loading: false, data: [], count: 0, pageSize: 4, page: 1, currentPage: 1 })
    // const [upcomingQuiz, setUpcomingQuiz] = useState({ loading: false, data: [], count: 0, pageSize: 4, page: 1, currentPage: 1 })
    // const [practice, setpractice] = useState({ loading: false, data: [], count: 0, pageSize: 4, page: 1, currentPage: 1 })
    // const [recent, setRecent] = useState({ loading: false, data: [], count: 0, pageSize: 4, page: 1, currentPage: 1 })

    const context = useContext(Store);

    const liveQuizContext = context.liveQuiz; 
    const liveQuiz = liveQuizContext.data;
    const setLiveQuiz = liveQuizContext.setData;

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

    const [popUpData, setpopUpData] = useState({ type: "", slug: "", image: "" });

    const [dropDown,setDropDown] = useState({visiblity:false,value:"Popular"})
    const openPopUp = (type, slug, image) => {
        setpopUpData({ type: type, slug: slug, image: image });        
        if(type!=""){
            history.push(path + "/rules-and-eligibility")
        }else{
            history.push(path);
        }
        
    }
    const breadCrumb = useContext(BreadCrumbContext);
    useEffect(()=>{
        breadCrumb.set(['Activities'])
    },[])
    useEffect(async () => {
        
        if(liveQuiz.data && liveQuiz.data.length<=0){
            liveQuizContext.getData("live", false, false)
        }
        if(popularQuiz.data && popularQuiz.data.length<=0){
            popularQuizContext.getData("popular")
        }
        
        if(upcomingQuiz.data && upcomingQuiz.data.length<=0){
            upcomingQuizContext.getData("upcoming")
        }

        if(practice.data && practice.data.length<=0){
            practiceQuizContext.getData("practice")
        }
        if(recent.data && recent.data.length<=0){
            recentQuizContext.getData("recent")
        }
        
        // getData(liveQuiz, setLiveQuiz, "live", false, false);
        // getData(popularQuiz, setPopularQuiz, "popular");
        // getData(upcomingQuiz, setUpcomingQuiz, "upcoming");
        // getData(practice, setpractice, "practice");
        // getData(recent, setRecent, "recent");
    }, [])
    useEffect(() => {
        
    }, [popularQuiz])
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

    const setDropdownData = (value,status=false) => {
        if(value!=""){  
            setDropDown({visiblity:status,value:value})
        }else{
            setDropDown({...dropDown,visiblity:status});
        }
    }
    // const getDataByDropDown = ()=>{

    // }
    return (
        <ActivityCenterPage

            changePage={changePage}
            setDropdownData={setDropdownData}
            dropDown={dropDown}
            popUpData={popUpData}
            openPopUp={openPopUp}

            liveQuiz={liveQuiz}
            setLiveQuiz={setLiveQuiz}

            popularQuiz={popularQuiz}
            setPopularQuiz={setPopularQuiz}

            upcomingQuiz={upcomingQuiz}
            setUpcomingQuiz={setUpcomingQuiz}


            practice={practice}
            setpractice={setpractice}

            recent={recent}
            setRecent={setRecent}
        />
    )
}
export default ActivityCenterController;