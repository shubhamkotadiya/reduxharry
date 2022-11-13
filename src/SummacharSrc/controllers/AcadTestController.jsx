import React, { useContext, useEffect, useState } from "react";
import { Store } from "../App";
import { isFreeTrial, getHeaders, resetToken, getUserUuid, handleError } from "../common/helper";
import Loader from "../components/Loader"
import apiUrl from "../common/apiUrl";
import axios from "axios";
import { toast } from "react-toastify";
import AcadTestPage from "../pages/privatePages/Academics/AcadTest";
import { Route, Switch, useHistory, useParams, useRouteMatch } from "react-router";
import ActivityCenterPopUp from "../pages/privatePages/activityCenter/ActivityCenterPopUp";


const AcadTestController = (props) => {
 
    const params = useParams();
    const { path, url } = useRouteMatch();
    const history = useHistory()
    const [loading, setLoading] = useState(false);
    const [testList, setTestData] = useState({ data: [], pageNo: 1, next: ''})
    const [popUpData, setpopUpData] = useState({ type: "", slug: "", image: "" });
    const [visibility, setVisibility] = useState(false);
    const [InfopopUpData, setInfopopUpData] = useState("");



    useEffect(async () => {
        // props.setBreadCrumb([{name:params.subject,redirect:"/concepts"},{name:"Quizzes",redirect:"/test"}])
        setLoading(true)
        await getTestList()
        setLoading(false)

    }, [])
    useEffect(async () => {

    }, [testList])


    const setInfoPopUpData = (str) => {
        setVisibility(true);
        setInfopopUpData(str)
    }
    let tempTest = [];
    let getTestList = async () => {
        return await axios({
            url: apiUrl.activitiesUrl + "all/" + "?academic_subjects=" + params.subject + "&user-uuid=" + getUserUuid() + "&chapters=" + params.chapter_name+"&page_size=10&page=" + testList.pageNo,
            method: "GET",
            headers: getHeaders()
        })
            .then(async (response) => {
                const data = response.data;
                const oldData = { ...testList };
                const temp = response.data.results;
                let next = "";
                let pageNo = oldData.pageNo;
                if (data && Object.keys(data).length > 0) {
                    for (let row of temp) {
                        oldData.data.push(row)
                    }
                    if (data.links && data.links.next && data.links.next != "") {
                        next = data.links.next;
                        pageNo = parseInt(pageNo) + 1;
                    }
                    setTestData({ ...testList, data: oldData.data, pageNo: pageNo, next: next });
                }


                return { status: true, data: response.data }
            })
            .catch(async (error) => {
                if (error.response.status == 401) {
                    await resetToken();
                    await getTestList();
                    return { status: false, code: error.response.status }
                } else {
                    handleError(error)
                    return { status: false, code: error.response.status }
                }

            })
    }
    const openPopUp = (type, slug, image) => {
        // setpopUpData({ type: type, slug: slug, image: image });
        // if (type != "") {
        //     history.push(url + "/rules-and-eligibility")
        // } else {
        //     history.goBack();
        // }
        history.push("/activity/" + slug)


    }

    const [scrollLoading, setScrollLoading] = useState(false);
    const onScroll = async (ref) => {

        if (!scrollLoading && (testList.next != null && testList.next != '') && ((ref.current.clientHeight + ref.current.scrollTop) > (ref.current.scrollHeight / 2))) {
            setScrollLoading(true);
            await getTestList();
            setScrollLoading(false);

        }
    }

    if (!loading) {
        return (
            <>
                <AcadTestPage
                    subjectStatus={props.subjectStatus}
                    size={props.size}
                    InfopopUpData={InfopopUpData}
                    visibility={visibility}
                    setInfopopUpData={setInfopopUpData}
                    setInfoPopUpData={setInfoPopUpData}
                    setVisibility={setVisibility}
                    openPopUp={openPopUp}
                    popUpData={popUpData}
                    data={testList.data}
                    onScroll={onScroll}
                    scrollLoading={scrollLoading} ></AcadTestPage>
                
                
            </>

        );
    } else {
        return (
            <Loader></Loader>
        )
    }


}

export default AcadTestController;