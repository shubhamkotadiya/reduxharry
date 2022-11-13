import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react"
import { Route, Switch, useHistory, useLocation, useRouteMatch } from "react-router-dom";

import { BreadCrumbContext, Store } from "../../App"
import { setMonthToStr } from "../../common/helper";
import Loader from "../../components/Loader";
import KidsCorner from "../../pages/privatePages/kidscornerAndCampuusBuzz/KidsCorner";
import KidsCornerAndCampusBuzzPopUp from "../../pages/privatePages/kidscornerAndCampuusBuzz/KidsCornerAndCampusBuzzPopUp";
import PopUpController from "./PopUpController";
// import Loader from "../../components/Loaderder";
// import KidsCorner from "../../pages/kidscornerAndCampuusBuzz/KidsCornerner";

const KidsCornerController = () => {

    const breadCrumb = useContext(BreadCrumbContext)
    const kidscornerContext = useContext(Store).kidsCorner
    const [loading, setLoading] = useState(false)
    const location = useLocation()
    const [data, setData] = useState({})
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
        if (fileData && Object.keys(fileData).length > 0) {
            history.push("/kids-corner/view")
        } else {
            history.push("/kids-corner")
        }
    }, [fileData])
    useEffect(() => {
        (async () => {
            breadCrumb.set(["Kids' Corner"])
            if (!(kidscornerContext.data && kidscornerContext.data.length > 0)) {
                await kidscornerContext.getData()
            }

        })()
    }, [])
    useEffect(() => {
        if (kidscornerContext.data && Object.keys(kidscornerContext.data).length > 0) {
            // let temp = { ...data }
            setData(kidscornerContext.data)
            // for (let row of kidscornerContext.data) {
            //     if (temp.latest && temp.latest.length >= 2) {
            //         const givenDate = new Date(row.created)
            //         const givenMonth = givenDate.getMonth()
            //         const givenYear = givenDate.getFullYear()
            //         const time = new Date(givenYear,givenMonth).getTime()
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


        }
    }, [kidscornerContext.data])


    const { path, url } = useRouteMatch()
    const getTitle = (title) => {
        switch (title) {
            case "latest": return "Latest";
            case "all_submissions": return "Wall of Fame";
            case "your_submissions": return "My Submissions"
            default: const date = new Date(parseInt(title));
                return setMonthToStr(date.getMonth(), true) + " " + date.getFullYear()
        }
        

    }
    return (
        <>
            <Switch>
                <Route exact path={path} render={(props) => (loading ? <Loader /> :
                    <KidsCorner
                        getTitle={getTitle}
                        showHideView={showHideView}
                        data={data}
                    />)} />
                <Route exact path={path + "/upload"} >
                    {loading ? <Loader /> :
                        <KidsCorner
                            showHideView={showHideView}
                            getTitle={getTitle}
                            withUpload={true}
                            data={data}
                        />}
                </Route>
                <Route exact path={path + '/view'}  >
                    <><PopUpController
                        onClosePopUp={() => { showHideView({}, false) }}
                        data={fileData} /></>
                </Route>
            </Switch>
            {/*  */}
        </>
    )

}
export default KidsCornerController