import { useEffect, useRef } from "react";
import { useState } from "react";
import { useContext } from "react"
import { Route, Switch, useHistory, useLocation, useRouteMatch } from "react-router-dom";

import { BreadCrumbContext, Store } from "../../App"
import { setMonthToStr } from "../../common/helper";
import Loader from "../../components/Loader";
import StorykidsCornerAndCampusBuzz from "../../pages/privatePages/kidscornerAndCampuusBuzz/StorykidsCornerAndCampusBuzz";
import NewsPopUpController from "../NewsPopUpController";
import PopUpController from "./PopUpController";

// import Loader from "../../components/Loaderder";
// import KidsCorner from "../../pages/kidscornerAndCampuusBuzz/KidsCornerner";

const StoryKidsCornerController = () => {
    const kidscornerContext = useContext(Store).kidsCorner
    const breadCrumb = useContext(BreadCrumbContext)

    const storykidsCornerContext = useContext(Store).storykidsCorner
    const [loading, setLoading] = useState(false)
    const [scrollLoading, setScrollLoading] = useState(false)
    const location = useLocation()
    const [data, setData] = useState({})
    const [mySubmissionData, setMySubmissionData] = useState([])
    const history = useHistory()

    const [fileData, setFileData] = useState({})
    const showHideView = (data, show = true) => {
        if (!show) {
            setFileData({})
        } else {
            setFileData(data)
        }
    }

    useEffect(() => {
        (async () => {
            breadCrumb.set(["Kids' Corner"])
            setLoading(true)
            if (!(kidscornerContext.data && kidscornerContext.data.length > 0) && !(storykidsCornerContext.data && storykidsCornerContext.data.length > 0)) {
                await Promise.all(
                    [
                        kidscornerContext.getData(),
                        storykidsCornerContext.getData()
                    ]
                )
            } else if (!(storykidsCornerContext.data && storykidsCornerContext.data.length > 0)) {
                await storykidsCornerContext.getData()
            }
            else if (!(kidscornerContext.data && kidscornerContext.data.length > 0)) {
                await kidscornerContext.getData()

            }
            setLoading(false)
        })()
    }, [])
    useEffect(() => {
        if (storykidsCornerContext.data && storykidsCornerContext.data.length > 0) {
            const temp = {}

            for (let row of storykidsCornerContext.data) {
                if (temp.latest && temp.latest.length >= 2) {
                    const givenDate = new Date(row.published_date)
                    const givenMonth = givenDate.getMonth()
                    const givenYear = givenDate.getFullYear()
                    const time = new Date(givenYear, givenMonth).getTime()
                    if (!temp[time]) {
                        temp[time] = []
                    }
                    temp[time].push(row)
                } else {
                    if (!temp['latest']) {
                        temp['latest'] = []
                    }
                    temp['latest'].push(row)
                }
            }

            const sortedList = Object.keys(temp).sort((a, b) => { return b - a }).reduce((obj, key) => {
                obj[key] = temp[key]
                return obj;
            }, {});
            setData(sortedList)
        }
    }, [storykidsCornerContext.data])

    useEffect(() => {
        if (kidscornerContext.data && Object.keys(kidscornerContext.data).length > 0) {
            if (kidscornerContext.data.your_submissions) {
                setMySubmissionData(kidscornerContext.data.your_submissions)
            }
        }

    }, [kidscornerContext.data])



    const { path, url } = useRouteMatch()
    const getTitle = (title) => {
        if (title === "latest") {
            return "Fresh on the Corner"
        } else {
            const date = new Date(parseInt(title))
            return setMonthToStr(date.getMonth()) + " " + date.getFullYear()
        }
    }

    const onScroll = async (ref) => {
        // if (!scrollLoading && storykidsCornerContext.next && storykidsCornerContext.next != "" && ((ref.current.clientHeight + ref.current.scrollTop) > (ref.current.scrollHeight - 200))) {
        //     setScrollLoading(true)
        //     await storykidsCornerContext.getData(true)
        //     setScrollLoading(false)
        // }
    }
    const onUpload = async () => {
        await kidscornerContext.getData()
    }
    const onDltBtnClick = async (data) => {
        await kidscornerContext.deleteData(data)
        await kidscornerContext.getData()
        
    }
    useEffect(() => {
        if (fileData && Object.keys(fileData).length > 0) {
            history.push("/kids-corner/my-submission/view")
        } else {
            history.push("/kids-corner")
        }
    }, [fileData])
    return (
        <>
            <Switch>
                <Route exact path={path} >
                    {loading ? <Loader /> :
                        <StorykidsCornerAndCampusBuzz
                            onViewClick={showHideView}
                            fromKidsCorner={true}
                            mySubmissionData={mySubmissionData}
                            onDltBtnClick={onDltBtnClick}
                            getTitle={getTitle}
                            onScroll={onScroll}
                            scrollLoading={scrollLoading}
                            data={data}
                        />}
                </Route>
                <Route exact path={path + "/upload"} >
                    {loading ? <Loader /> :
                        <StorykidsCornerAndCampusBuzz
                            onViewClick={showHideView}
                            onDltBtnClick={onDltBtnClick}
                            fromKidsCorner={true}
                            onUpload={onUpload}
                            getTitle={getTitle}
                            mySubmissionData={mySubmissionData}
                            onScroll={onScroll}
                            withUpload={true}
                            scrollLoading={scrollLoading}
                            data={data}
                        />}
                </Route>
                <Route exact path={path + "/:slug"} >
                    {loading ? <Loader /> :
                        <NewsPopUpController hideFunctionButtons={true} />}
                </Route>
                <Route exact path={path + '/my-submission/view'}  >
                    <><PopUpController
                        onClosePopUp={() => { showHideView({}, false) }}
                        data={fileData} /></>
                </Route>

            </Switch>
            {/*  */}
        </>
    )

}
export default StoryKidsCornerController