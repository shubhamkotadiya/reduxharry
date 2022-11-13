import React, { useContext, useEffect, useState } from "react";
import { BreadCrumbContext, Store } from "../App";
import HomePage from "../pages/privatePages/home/HomePage";
import NavBar from "../pages/privatePages/navbar/NavBar";
import Loader from "../components/Loader"
import useActivityQuiz from "../customHooks/useActivityQuiz"
import apiUrl from "../common/apiUrl";
import axios from "axios";

// import { getHeaders, getMaximumLatestStroyHomePage, resetToken, setAuthToken } from "../common/helper";
import useStuff from "../customHooks/useStuff"
import { getHeaders, getMaximumLatestStroyHomePage, getUserUuid, resetToken, setAuthToken } from "../common/helper";
import { useHistory, useRouteMatch } from "react-router";
import { Link } from "react-router-dom";




const HomePageController = (props) => {
    // console.log(props)
    const history = useHistory()
    const { path, url } = useRouteMatch();
    const context = useContext(Store);
    const breadCrumb = useContext(BreadCrumbContext);

    const news = context.news;
    const newsletter = context.newsletter;
    
    const subjectList = context.subject.data;
    const liveQuizContext = context.liveQuiz;
    const liveQuiz = liveQuizContext.data;
    const popularQuizContext = context.popularQuiz;
    const popularQuiz = popularQuizContext.data;
    const freeQuizContext = context.freeQuiz;
    const freeQuiz = freeQuizContext.data;
    const stuffContext = context.stuff;
    const stuffData = stuffContext.data;
    const user = context.user;
    const upcomingQuizContext = context.upcomingQuiz;
    const upcomingQuiz = upcomingQuizContext.data;


    const [popUpData, setpopUpData] = useState({ type: "", slug: "", image: "" });

    const [dropDown, setDropDown] = useState({ visiblity: false, value: "Popular" })

    const [newsData, setNewsData] = useState([])

    const openPopUp = (type, slug, image) => {
        setpopUpData({ type: type, slug: slug, image: image });

        if (type != "") {
            history.push(path + '/rules-and-eligibility')
        } else {
            history.goBack()
        }
    }

    const submitRange = async (range, uuid) => {
        let pass_data = {
            "rating": range
        }
        await stuffContext.submitRange(range, uuid)

    }

    const submitQue = (ans, uuid) => {
        console.log(ans, uuid)
        let submit = stuffContext.submitAnswer(ans, uuid);

    }

    const [loading, setLoading] = useState(false);
    useEffect(async () => {
        breadCrumb.set(['Dashboard'])
        if (!(news.data && Object.keys(news.data).length > 0)) {
            setLoading(true)
            if (user.data.user_type === "FREE_USER") {
                await news.getData("free_user")
            }
            await Promise.all([
                news.getData(),                
                // newsletter.getData(),
            ])
            setLoading(false)
        }

        // if (!(newsletter.data && Object.keys(newsletter.data).length > 0)) {
        //     setLoading(true)

        //     setLoading(false)
        // }
        if (user.data.user_type !== "FREE_USER") {
            if (popularQuiz.data && popularQuiz.data.length <= 0) {
                popularQuizContext.getData("popular")
            }
            // if (liveQuiz.data && liveQuiz.data.length <= 0) {
            //     liveQuizContext.getData("live", false, false)
            // }

            // if (upcomingQuiz.data && upcomingQuiz.data.length <= 0) {
            //     upcomingQuizContext.getData("upcoming")
            // }
        } else {
            if (freeQuiz.data && freeQuiz.data.length <= 0) {
                freeQuizContext.getData("all")
            }
        }



        if (stuffContext.data && stuffContext.data.length <= 0) {
            stuffContext.getData();
            console.log(stuffData)
        }

    }, [])
    const setTargetForPopUp = (target) => {
        news.setcurrentTarget(target)
    }

    const setDropdownData = (value, status = false) => {
        if (value != "") {
            setDropDown({ visiblity: status, value: value })
        } else {
            setDropDown({ ...dropDown, visiblity: status });
        }
    }
    useEffect(() => {
        const newsarr = [];

        let i = 0;
        if (news.data && Object.keys(news.data).length > 0 && newsData.length <= 0) {
            if (user.data.user_type === "FREE_USER") {
                let obj_keys = Object.keys(news.data)[0]
                for (let slug of Object.keys(news.data[obj_keys])) {
                    if (i <= getMaximumLatestStroyHomePage().news - 1) {
                        i++;
                        newsarr.push(news.data[obj_keys][slug])
                    } else {
                        break;
                    }
                    // console.log(row)
                }
            } else {
                for (let obj_keys of Object.keys(news.data)) {
                    for (let slug of Object.keys(news.data[obj_keys])) {
                        if (i <= getMaximumLatestStroyHomePage().news - 1) {
                            i++;
                            newsarr.push(news.data[obj_keys][slug])
                        } else {
                            break;
                        }
                        // console.log(row)
                    }
                }
            }


            setNewsData(newsarr)
        }
    }, [news])

    // const changePage = async (direction, path, state, setState) => {

    //     const data = { ...state };
    //     if (direction == "next") {            
    //         if (data.currentPage + 1 >= Math.ceil(data.count / data.pageSize)) {

    //             if (data.data.length < (((data.currentPage + 1) * data.pageSize) - (data.pageSize - 1))) {
    //                 const response = await getData(state, setState, path, true, true, data.currentPage + 1);
    //             } else {
    //                 setState({ ...state, currentPage: data.currentPage + 1 })
    //             }
    //         }
    //     } else {
    //         if (data.currentPage - 1 >= 1) {
    //             setState({ ...state, currentPage: data.currentPage - 1 })
    //         }
    //     }
    // }

    // if (!loading) {
        return (
            <>

                <HomePage liveQuiz={liveQuiz}
                    freeQuiz={freeQuiz}
                    popularQuiz={popularQuiz}
                    user={user}
                    upcomingQuiz={upcomingQuiz}
                    subjectList={subjectList}
                    setDropdownData={setDropdownData}
                    dropDown={dropDown}
                    popUpData={popUpData}
                    openPopUp={openPopUp}
                    path={path}
                    news={newsData}
                    setTargetForPopUp={setTargetForPopUp}
                    stuffData={stuffData}
                    letter={newsletter.data}
                    submitQue={submitQue}
                    submitRange={submitRange}
                    loading={loading}
                />
            </>
        );
    // } else {
    //     return (
    //         <Loader></Loader>
    //     )
    // }


}
export default HomePageController;