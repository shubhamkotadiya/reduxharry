import { useEffect, useRef } from "react";
import { useState } from "react";
import { useContext } from "react"
import { Route, Switch, useHistory, useLocation, useRouteMatch } from "react-router-dom";

import { BreadCrumbContext, Store } from "../../App"
import { setMonthToStr } from "../../common/helper";
import Loader from "../../components/Loader";
import StorykidsCornerAndCampusBuzz from "../../pages/privatePages/kidscornerAndCampuusBuzz/StorykidsCornerAndCampusBuzz";
import NewsPopUpController from "../NewsPopUpController";
import CampussBuzzSchoolController from "./CampussBuzzSchoolController";

// import Loader from "../../components/Loaderder";
// import KidsCorner from "../../pages/kidscornerAndCampuusBuzz/KidsCornerner";

const CampussBuzzController = () => {

    const breadCrumb = useContext(BreadCrumbContext)
    const campussBuzzContext = useContext(Store).campussBuzz
    const [loading, setLoading] = useState(false)
    const [scrollLoading, setScrollLoading] = useState(false)
    const location = useLocation()
    const [data, setData] = useState({})
    const history = useHistory()



    useEffect(() => {
        (async () => {
            breadCrumb.set(["Campus Buzz"])
            if (!(campussBuzzContext.data && Object.keys(campussBuzzContext.data).length > 0)) {
                setLoading(true)
                await campussBuzzContext.getData()
                setLoading(false)
            }

        })()
    }, [])
    useEffect(() => {
        if (campussBuzzContext.data && Object.keys(campussBuzzContext.data).length > 0) {
            const temp = {}
            if (campussBuzzContext.data.my_school && campussBuzzContext.data.my_school.length > 0) {
                temp['My School'] = campussBuzzContext.data.my_school
            }

            if (campussBuzzContext.data.all_schools) {
                for (let obj of campussBuzzContext.data.all_schools) {
                    Object.assign(temp, obj)
                }

            }
            // for (let row of campussBuzzContext.data) {
            //     if (temp.latest && temp.latest.length >= 2) {
            //         const givenDate = new Date(row.published_date)
            //         const givenMonth = givenDate.getMonth()
            //         const givenYear = givenDate.getFullYear()
            //         const time = new Date(givenYear, givenMonth).getTime()
            //         if (!temp[time]) {
            //             temp[time] = []
            //         }
            //         temp[time].push(row)
            //     } else {
            //         if (!temp['latest']) {
            //             temp['latest'] = []
            //         }
            //         temp['latest'].push(row)
            //     }
            // }

            // const sortedList = Object.keys(temp).sort((a, b) => { return b - a }).reduce((obj, key) => {
            //     obj[key] = temp[key]
            //     return obj;
            // }, {});
            // console.log(sortedList)            
            setData(temp)
        }

    }, [campussBuzzContext.data])



    const { path, url } = useRouteMatch()
    const getTitle = (title) => {
        // if (title === "latest") {
        //     return "Latest"
        // } else {
        //     const date = new Date(parseInt(title))
        //     return setMonthToStr(date.getMonth(), true) + " " + date.getFullYear()
        // }
        return title

    }

    const onScroll = async (ref) => {
        if (!scrollLoading && campussBuzzContext.next && campussBuzzContext.next != "" && ((ref.current.clientHeight + ref.current.scrollTop) > (ref.current.scrollHeight - 200))) {
            setScrollLoading(true)
            await campussBuzzContext.getData(true)
            setScrollLoading(false)
        }
    }
    return (
        <>
            <Switch>
                <Route exact path={path} >
                    {loading ? <Loader /> :
                        <StorykidsCornerAndCampusBuzz
                            notMoreThan4={true}
                            getTitle={getTitle}
                            onScroll={onScroll}
                            scrollLoading={scrollLoading}
                            data={data}
                        />}
                </Route>
                <Route exact path={path + "/:slug"} >
                    {loading ? <Loader /> :
                        <NewsPopUpController hideFunctionButtons={true} />}
                </Route>
                <Route exact path={path + "/school/:school_name"} >
                    {loading ? <Loader /> :
                        <CampussBuzzSchoolController hideFunctionButtons={true} />}
                </Route>

            </Switch>
            {/*  */}
        </>
    )

}
export default CampussBuzzController