import axios from "axios";
import { useContext, useEffect, useReducer, useState } from "react";
import { useHistory, useParams, useRouteMatch } from "react-router";
import apiUrl from "../common/apiUrl";
import { getHeaders, getUserUuid, handleError, resetToken } from "../common/helper";
import Loader from "../components/Loader";
import AcademicConcept from "../pages/privatePages/Academics/AcaademicConcept";
import AcademicConceptReducer from "../reducers/AcademicConceptReducer";
import { AcademicContext } from "./AcademicController";

const AcademicConceptController = (props) => {
    const academicConceptData = useContext(AcademicContext);
    const params = useParams();
    const subject = params.subject;
    const chapter_name = params.chapter_name;
    const chapter_number = params.chapter_number;
    const { path, url } = useRouteMatch();

    const [storyPopUpData, setStoryPopUpData] = useState({ data: {} })
    const history = useHistory();
    const [scrollLoading, setScrollLoading] = useState(false);
    const [loading, setLoading] = useState(false);



    let getConceptList = async (url) => {

        return await axios({
            url: url && url != '' ? apiUrl.root + url.slice(1) : apiUrl.conceptList + chapter_name + '/?user-uuid=' + getUserUuid(),
            method: "GET",
            headers: getHeaders(),
        }).then(
            async (res) => {

                if (res.data) {
                    let tempData = { ...academicConceptData.data };

                    if (tempData[subject]) {
                        if (tempData[subject][chapter_name]) {
                            for (let temp of res.data.results) {
                                tempData[subject][chapter_name].push(temp)
                            }

                        } else {
                            tempData[subject][chapter_name] = res.data.results
                        }
                    } else {
                        tempData[subject] = {}
                        tempData[subject][chapter_name] = res.data.results
                    }
                    let tempNext = { ...academicConceptData.next };

                    if (res.data.next && res.data.next != null) {
                        if (tempNext[subject]) {
                            tempNext[subject][chapter_name] = res.data.next;
                        } else {
                            tempNext[subject] = {};
                            tempNext[subject][chapter_name] = res.data.next;
                        }
                    }
                    else {
                        if (tempNext[subject]) {
                            tempNext[subject][chapter_name] = res.data.next;
                        } else {
                            tempNext[subject] = {};
                            tempNext[subject][chapter_name] = res.data.next;
                        }

                    }


                    academicConceptData.setState(tempData, tempNext);
                    return { status: true }

                }
                return { status: true }

            }
        ).catch(
            async (error) => {

                if (error.response && error.response.status == 401) {
                    await resetToken(async () => { await getConceptList(url && url != '' ? apiUrl.root + url : apiUrl.conceptList + chapter_name + '/?user-uuid=' + getUserUuid()); });

                } else {
                    handleError(error)
                    return { status: false }
                }
                return { status: false }
            }
        )



    }


    const onScroll = async (ref) => {
        if (!scrollLoading && (academicConceptData.next[subject] && academicConceptData.next[subject][chapter_name] && academicConceptData.next[subject][chapter_name] != "" && academicConceptData.next[subject][chapter_name] != null) && ((ref.current.clientHeight + ref.current.scrollTop) > (ref.current.scrollHeight / 2))) {
            setScrollLoading(true)
            await getConceptList(academicConceptData.next[subject][chapter_name]);
            setScrollLoading(false)

        }
    }
    useEffect(async () => {

        props.setBreadCrumb([{ name: params.subject, redirect: "/concepts" }, { name: chapter_name, redirect: "" }, { name: chapter_number, redirect: '' }])

        if (academicConceptData.data && (!academicConceptData.data[subject] || !academicConceptData.data[subject][chapter_name] || academicConceptData.data[subject][chapter_name].length <= 0)) {
            setLoading(true)
            await getConceptList()
            setLoading(false)
        }

    }, [chapter_name, subject]);

    const openPopUp = (data) => {
        setStoryPopUpData({ ...storyPopUpData, data: data });
        history.push(url + "/story/" + data.slug)
    }
    const openVideoPopUp = (data) => {
        history.push(url + "/videos/" + data.slug)
    }

    if (!loading) {
        return (
            <>
                <AcademicConcept
                    storyPopUpData={storyPopUpData}
                    openPopUp={openPopUp}
                    openVideoPopUp={openVideoPopUp}
                    subject={subject}
                    chapter_name={chapter_name}
                    url={url}
                    path={path}
                    onScroll={onScroll}
                    scrollLoading={scrollLoading}
                    data={academicConceptData.data[subject] && academicConceptData.data[subject][chapter_name] ? academicConceptData.data[subject][chapter_name] : []}
                />
            </>
        )
    } else {
        return (
            <Loader />
        )
    }

}
export default AcademicConceptController;