import axios from "axios";
import { useContext, useEffect } from "react";
import { useState } from "react";
import { Store } from "../../App";
import apiUrl from "../../common/apiUrl";
import { getHeaders, getUserUuid, handleError, resetToken } from "../../common/helper";
import ActivityCenterMobileView from "../../pages/privatePages/activityCenter/ActivityCenterMobileView";

const ActivityCenterMobileViewController = (props) => {
    const [loading, setLoading] = useState(false)
    const [scrollLoading, setScrollLoading] = useState(false)
    const [dropDown, setDropDown] = useState({ visiblity: false, value: "Popular" })
    const context = useContext(Store);
    const user = context.user.data
    const liveQuizContext = context.liveQuiz;
    const liveQuiz = liveQuizContext.data;
    const setLiveQuiz = liveQuizContext.setData;
    const freeQuizContext = context.freeQuiz;
    const freeQuiz = freeQuizContext.data;
    const setfreeQuiz = freeQuizContext.setData;
    const [data, setData] = useState({});
    const [next, setNext] = useState({})

    const onScroll = (e) => {

    }

    const setDropdownData = (value, status = false) => {
        if (value != "") {
            setDropDown({ visiblity: status, value: value })
            if (!(data[value] && data[value].length > 0)) {
                getData(value)
            }
        } else {
            setDropDown({ ...dropDown, visiblity: status });

        }
    }

    const getData = async (type, fromScroll = false) => {
        !fromScroll ? setLoading(true) : setScrollLoading(true);
        let path = "";
        switch (type) {
            case "Popular": path = "popular"; break;
            case "Upcoming": path = "upcoming"; break;
            case "Attempted": path = "recent"; break;
            case "Practice": path = "practice"; break;
        }
        let url = path + "/" + "?user-uuid=" + getUserUuid() + "&academic_subjects=News";
        return await axios({
            url: apiUrl.activitiesUrl + url,
            method: "GET",
            headers: getHeaders()
        }).then((response) => {
            if (response.status == 200 || response.status == 201) {

                const responseData = response.data;
                const nextLink = responseData.links.next;

                const result = responseData.results;
                const tempdata = { ...data }
                if (tempdata[type] && tempdata[type].length > 0) {
                    tempdata[type].concat(result)
                } else {
                    tempdata[type] = result

                }
                setData(tempdata)
                setNext(nextLink)
                setLoading(false)
                setScrollLoading(false)
            }
        }).catch(async error => {
            if (error.response.status == 401) {
                await resetToken(getData());
            }else{
                 handleError(error)
            }
            
            setScrollLoading(false)
            setLoading(false)
        })
    }
    useEffect(() => {
        (async () => {
            if (!data[dropDown.value] || data[dropDown.value].length <= 0) {

                await getData(dropDown.value);
            }
        })()
    }, [])
    useEffect(() => {
        if (liveQuiz.data && liveQuiz.data.length <= 0) {
            liveQuizContext.getData("live", false, false)
        }
        if (freeQuiz.data && freeQuiz.data.length <= 0 && user.user_type === "FREE_USER") {
            freeQuizContext.getData("all")
        }
    }, [])
    return (<>
        <ActivityCenterMobileView
            setDropdownData={setDropdownData}
            dropDown={dropDown}
            data={data}
            liveQuiz={liveQuiz}
            freeQuiz={freeQuiz}
            setLiveQuiz={setLiveQuiz}
            popUpData={props.popUpData}
            openPopUp={props.openPopUp}
            getData={getData}
            loading={loading}
            scrollLoading={scrollLoading}
            lockSystem={props.lockSystem}
        />
    </>)
}
export default ActivityCenterMobileViewController