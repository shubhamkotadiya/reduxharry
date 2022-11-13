import React, { useContext, useEffect, useState } from "react";
import { Store } from "../App";
import { isFreeTrial, getHeaders, resetToken, getUserUuid, handleError } from "../common/helper";
import Loader from "../components/Loader"
import apiUrl from "../common/apiUrl";
import axios from "axios";
import { toast } from "react-toastify";
import AcadInfoPage from "../pages/privatePages/Academics/AcadSubChapterPage";
// import AcadInfoPopUpController from "./AcadInfoPopUpController";

import { useHistory, useParams, useRouteMatch } from "react-router";
import { Link, useLocation } from 'react-router-dom'
import { AcademicRevisionContext, AcademicSubChapterContext } from "./AcademicSubjectsController";


const AcadSubChapteController = (props) => {
 
    const params = useParams();
    const subject = params.subject;
    const SubChapterContext = useContext(AcademicSubChapterContext);
    const { path, url } = useRouteMatch();     
    const history = useHistory();
    const [visibility, setVisibility] = useState(false);

    const [loading, setLoading] = useState(false);

    const [popUpData, setPopUpData] = useState([]);

    useEffect(async () => {
        props.setBreadCrumb([{ name: params.subject, redirect: "/concepts" }])

        if (SubChapterContext.data && (!SubChapterContext.data[subject] || (SubChapterContext.data[subject] && SubChapterContext.data[subject].length <= 0))) {
            setLoading(true)
            await getInfoList()
            setLoading(false)
        }


    }, [params.subject]);


    let tempInfo = [];
    let getInfoList = async (url) => {
        // if (pageNo != -1) {
        return await axios({
            url: url ? url : apiUrl.topicUrl + "?user-uuid=" + getUserUuid() + "&subject=" + subject,
            method: "GET",
            headers: getHeaders(),
        }).then(
            async (res) => {

                if (res.data) {
                    let tempData = { ...SubChapterContext.data };


                    if (tempData[subject]) {
                        for (let row of res.data) {
                            tempData[subject].push(row)
                        }
                    } else {
                        tempData[subject] = res.data
                    }

                    let tempNext = { ...SubChapterContext.next };

                    res.data.next && res.data.next != null ? tempNext[subject] = res.data.next : tempNext[subject] = ""


                    SubChapterContext.setState(tempData, tempNext);
                    return { status: true }

                }
                return { status: true }

            }
        ).catch(
            async (error) => {

                if (error.response && error.response.status == 401) {
                    await resetToken(async () => { await getInfoList(url ? url : apiUrl.topicUrl + "?user-uuid=" + getUserUuid() + "&subject=" + subject); });

                } else {
                    return { status: false }
                }
                handleError(error)
                return { status: false }
            }
        )
        // }


    }

    const [scrollLoading, setScrollLoading] = useState(false);
    const onScroll = async (ref) => {

        if (!scrollLoading && (SubChapterContext.next[subject] && SubChapterContext.next[subject] != "") && ((ref.current.clientHeight + ref.current.scrollTop) > (ref.current.scrollHeight / 2))) {
            setScrollLoading(true)
            await getInfoList(SubChapterContext.next[subject]);
            setScrollLoading(false)

        }
    }


    const openPopUp = async (data) => {
        setPopUpData(data)

        setVisibility(true)
        history.push(url + "/details")
    }

    const changeVisibility = () => {
        if (visibility) {
            setVisibility(!visibility)
            history.goBack()
        } else {
            setVisibility(!visibility)
        }


    }

    return (
        <>


            {loading ? <Loader /> :
                <AcadInfoPage
                    openPopUp={openPopUp}
                    popUpData={popUpData}
                    visibility={visibility}
                    changeVisibility={changeVisibility}
                    data={SubChapterContext.data[subject] && SubChapterContext.data[subject].length > 0 ? SubChapterContext.data[subject] : []}
                    onScroll={onScroll}
                    scrollLoading={scrollLoading} ></AcadInfoPage>
            }
          
        </>
    );

}


export default AcadSubChapteController;