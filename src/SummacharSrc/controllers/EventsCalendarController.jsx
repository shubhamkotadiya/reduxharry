import React, { useContext, useEffect, useState } from "react";
import Loader from "../components/Loader";
import axios from "axios";
import Calendar from "../pages/privatePages/Calendar/Calendar";
import apiUrl from "../common/apiUrl";
import { getHeaders, getMaximumLatestStroy, getUserUuid, handleError, isFromLastMonth, resetToken } from "../common/helper";
import { BreadCrumbContext } from "../App";
const EventsCalendarController = (props) => {

    const [loading, setLoading] = useState(true);
    // const [quizList, setQuizList] = useState({});
    const [quizList, setQuizList] = useState([]);
    const maximumShowCount = 3;
    const [startIndex, setStartIndex] = useState(0);
    const [show, setShow] = useState([]);


    const changeShow = (ind) => {
        const temp = [...show];
        for (let i = 0; i < show.length; i++) {
            i == ind ? temp[i] = !temp[i] : temp[i] = false
        }
        setShow(temp);

    }

    const getData = async () => {

        return await axios({
            url: apiUrl.calendarUrl + "?user-uuid=" + getUserUuid(),
            method: "GET",
            headers: getHeaders()
        }).then(response => {
            const calendarList = response.data;

            const finalList = [...quizList,...calendarList];

            setQuizList(finalList)
            // finalList.sort({})
            
            // const customCalendarList = {};
            // let showing = [];
            // let i = 1;
            // for (let row of calendarList) {
            //     const date = new Date(row.start_date);

            //     const month = date.getMonth();
            //     const year = date.getFullYear();

            //     const totalSeconds = new Date(year, month).getTime();

            //     if (customCalendarList[totalSeconds]) {
            //         customCalendarList[totalSeconds].push(row)
            //     } else {

            //         customCalendarList[totalSeconds] = [row]
            //     }


                
            //     i++;
            // }

            // const sortedList = Object.keys(customCalendarList).sort().reduce((obj, key) => {
            //     obj[key] = customCalendarList[key].sort((a, b) => { return new Date(a.start_date).getTime() - new Date(b.start_date).getTime() });                

            //     return obj;
            // }, {});
            // const lengthOfMonthArr = Object.keys(sortedList).length;
            // let startIndexOfarr = 0
            // if (lengthOfMonthArr <= maximumShowCount) {                
            //     startIndexOfarr = 0;
            // } else {
            //     let tempStartIndex = 0;
            //     let i = 0;
            //     for (let timestr in Object.keys(sortedList)) {

            //         const dateObj = new Date(parseInt(timestr));
            //         const curDate = new Date();
            //         if (dateObj.getMonth() == curDate.getMonth() && dateObj.getFullYear() == curDate.getFullYear()) {
            //             tempStartIndex = i;
            //             break;
            //         }
            //         i++;
            //     }
            //     if (i == 0) {
            //         startIndexOfarr = lengthOfMonthArr - maximumShowCount

            //     } else {
            //         i + maximumShowCount >= lengthOfMonthArr ? startIndexOfarr = (lengthOfMonthArr - maximumShowCount) : startIndexOfarr = i;
            //     }
            // }
            // setStartIndex(startIndexOfarr);
            // setQuizList({ ...sortedList });
            // const keysOfSortedlist = Object.keys(sortedList);
            // for (let j = startIndexOfarr; j < startIndexOfarr + maximumShowCount; j++) {
            //     // showing
            //     const dateObj = new Date(parseInt(keysOfSortedlist[j]));
            //     const curDate = new Date();
            //     if (dateObj.getMonth() == curDate.getMonth() && dateObj.getFullYear() == curDate.getFullYear()) {
            //         showing.push(true);
            //     } else {
            //         showing.push(false)
            //     }
            // }
            // setShow([...showing]);
            return;
        }).catch(async (error) => {
            if (error.length > 0) {
                if (error.response.status == 401) {
                    await resetToken();
                    await getData();
                }else{
                    handleError(error)
                }
            }
        })
    }

    useEffect(async () => {
        setLoading(true)
        await getData()
        setLoading(false)

    }, [])
    const breadCrumb = useContext(BreadCrumbContext);
    useEffect(() => {
        breadCrumb.set(['Calendar'])
    }, [])
    let paddingBottom = "16px";
    if(window.innerWidth<=600){
        paddingBottom = "16px";
    }
    else{
        paddingBottom = "32px";
    }
    return (
        <div className="fit-content" style={{paddingBottom:'0px'}}>

            {loading ? <Loader /> : <Calendar startIndex={startIndex} maximumShowCount={maximumShowCount} data={quizList} show={show} changeShow={changeShow}></Calendar>}

        </div>
    )
}

export default EventsCalendarController;