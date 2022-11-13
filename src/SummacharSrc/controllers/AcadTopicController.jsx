import React, { useContext, useEffect, useState } from "react";
import { Store } from "../App";
import { isFreeTrial, getHeaders, resetToken, getUserUuid, handleError } from "../common/helper";
import Loader from "../components/Loader"
import apiUrl from "../common/apiUrl";
import axios from "axios";
import { toast } from "react-toastify";
import AcadTopic from "../pages/privatePages/Academics/AcadTopic";
// import AcadInfoPopUpController from "./AcadInfoPopUpController";

import { useHistory, useParams, useRouteMatch } from "react-router";
import { Link, useLocation } from 'react-router-dom'


const AcadTopicController = (props) => {
    const params = useParams();
    const { path, url } = useRouteMatch();
    const history = useHistory();
    const [visibility, setVisibility] = useState(false);
    const [urls, setNext] = useState(apiUrl.storyUrl + "?user-uuid=" + getUserUuid() + "&chapters=" + params.chapter_name);
    const [loading, setLoading] = useState(false);
    const [TopicList, setTopic] = useState({ results: [] });
    const [popUpData, setPopUpData] = useState([]);
   
    useEffect(async () => {
        props.setBreadCrumb([{name:params.subject,redirect:"/concepts"},{name:params.chapter_name,redirect:"/concepts/"+params.chapter_name+"/topic"}])
        setLoading(true)
        await getTopicList()
        setLoading(false)

    }, [])
    //useEffect(async () => {
    //    //console.log(infoList)
    //}, [infoList])

    let tempTopic = [];
    let getTopicList = async () => {
        if (urls!=null) {
            return await axios({
                url: urls,
                method: "GET",
                headers: getHeaders(),
            }).then(
                async (res) => {                                        
                    const oldData = { ...TopicList };
                    const temp = res.data.results;
                    let next = "";

                   
                    if (temp && temp.length > 0) {
                        for (let row of temp) {
                            oldData.results.push(row)
                        }
                    }
                    await setTopic({ ...TopicList, results: oldData.results });

                    if (res.data.next != null) {
                        await setNext(res.data.next);
                    }
                    else {
                       await setNext(null);
                    }
                    return { status: true }

                }
            ).catch(
                async (error) => {

                    if (error.response && error.response.status == 401) {
                        await resetToken();
                        await getTopicList();
                    } else {
                        handleError(error)
                        return { status: false }
                    }
                    return { status: false }
                }
            )
        }


    }

    const [scrollLoading, setScrollLoading] = useState(false);
    const onScroll = async () => {
        var height = document.getElementById("acadInfo_container").clientHeight;
        var fullheight = document.getElementById("acadInfo_container").scrollHeight;
        var scrollTop = document.getElementById("acadInfo_container").scrollTop;

        if (scrollTop + height > fullheight - 200) {

            if (!scrollLoading) {

                if ( url!=null)

                setScrollLoading(true)
                await getTopicList();
                setScrollLoading(false)
            }

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


            { loading ? <Loader /> : <AcadTopic openPopUp={openPopUp} popUpData={popUpData} visibility={visibility} changeVisibility={changeVisibility} infoList={TopicList} setInfo={setTopic} onScroll={onScroll} scrollLoading={scrollLoading} ></AcadTopic>
            }

        </>
    );

}


export default AcadTopicController;