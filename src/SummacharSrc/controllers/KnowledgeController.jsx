import React, { useContext, useEffect, useState } from "react";
import { BreadCrumbContext, Store } from "../App";
import KnowledgePage from "../pages/privatePages/home/Knowledge";
import NavBar from "../pages/privatePages/navbar/NavBar";
import Loader from "../components/Loader"
import useActivityQuiz from "../customHooks/useActivityQuiz"
import apiUrl from "../common/apiUrl";
import axios from "axios";

import { getHeaders, getMaximumLatestStroyHomePage, resetToken, setAuthToken } from "../common/helper";
import { useHistory, useRouteMatch } from "react-router";




const KnowledgePageController = () => {

    const history = useHistory()
    const { path, url } = useRouteMatch();
    const context = useContext(Store);

    const subjectList = context.subject.data;

    const news = context.news;

    const popularQuizContext = context.popularQuiz;
    const popularQuiz = popularQuizContext.data;

    const [popUpData, setpopUpData] = useState({ type: "", slug: "", image: "", userHasAccess: "" });

    const [dropDown, setDropDown] = useState({ visiblity: false, value: "Popular" })
    const [newsData, setNewsData] = useState([])
    useEffect(() => {
        const newsarr = [];

        let i = 0;
        if (news.data && Object.keys(news.data).length > 0 && newsData.length <= 0) {

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

            setNewsData(newsarr)
        }
    }, [news])
    const openPopUp = (type, slug, image, access) => {
        setpopUpData({ type: type, slug: slug, image: image, user_has_access: access });

        if (type != "") {
            history.push(path + '/rules-and-eligibility')
        } else {
            history.goBack()
        }
    }
    const breadCrumb = useContext(BreadCrumbContext);
    const [loading, setLoading] = useState(false);
    useEffect(async () => {
        breadCrumb.set(['Knowledge'])
        if (!(news.data && Object.keys(news.data).length > 0)) {
            setLoading(true)
            await Promise.all([
                news.getData(),
            ])
            setLoading(false)
        }

        if (popularQuiz.data && popularQuiz.data.length <= 0) {
            popularQuizContext.getData("popular")
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

    if (!loading) {
        return (
            <>

                <KnowledgePage
                    popularQuiz={popularQuiz}
                    subjectList={subjectList}
                    setDropdownData={setDropdownData}
                    dropDown={dropDown}
                    popUpData={popUpData}
                    openPopUp={openPopUp}
                    path={path}
                    news={newsData}
                    setTargetForPopUp={setTargetForPopUp}
                />
            </>
        );
    } else {
        return (
            <Loader></Loader>
        )
    }


}
export default KnowledgePageController;