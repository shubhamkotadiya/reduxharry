import { onAuthStateChanged } from "@firebase/auth";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react"
import { auth, fireBaseConifg } from "./firebaseConfig";
import apiUrl from "../common/apiUrl";


export const setFireBaseErrorMessage = (code) => {
    switch (code) {
        case "auth/user-disabled": return "User is disabled.";
        case "auth/user-token-expired": return "Token is expired.";
        case "auth/too-many-requests": return "Sorry, you are blocked for some time due to too many attempts.";
        case "auth/invalid-password": return "Wrong password.";
        case "auth/wrong-password": return "Wrong password."
        case "INVALID_PASSWORD": return "Wrong password."
        case "EMAIL_NOT_FOUND": return "User not found."
        case "auth/user-not-found": return "User is not registered.";
        default: return "Oops! Something went wrong."
        // case "auth/user-disabled" : return "User is disabled";
        // case "auth/user-disabled" : return "User is disabled";
        // case "auth/user-disabled" : return "User is disabled";
        // case "auth/user-disabled" : return "User is disabled";

    }
}
//login tokens
export const getAuthToken = () => {
    return localStorage.getItem("AuthToken");
}
export const setAuthToken = (token) => {
    localStorage.setItem("AuthToken", token)
}
export const removeToken = () => {
    localStorage.removeItem("AuthToken");
}

//set free trial
export const setFreeTrialToken = (value = true) => {
    localStorage.setItem("freeTrial", value)
}
export const getFreeTrialToken = () => {
    return localStorage.getItem('freeTrial')
}
export const removeFreeTrialToken = () => {
    return localStorage.removeItem("freeTrial");
}

export const setRefereshToken = (token) => {
    localStorage.setItem("refreshToken", token);
}
export const getRefreshToken = () => {
    return localStorage.getItem('refreshToken');
}
export const removeRefreshToken = () => {
    localStorage.removeItem("refreshToken");
}

export const isFreeTrial = () => {

    if (localStorage.getItem('freeTrial')) {
        return true;
    } else {
        return false;
    }

    return true
}

export const setUserUuid = (user) => {
    localStorage.setItem("user-uuid", user)
}
export const getUserUuid = () => {
    return localStorage.getItem("user-uuid")
}
export const removeUserUuid = () => {
    localStorage.removeItem("user-uuid")
}

export const setFirstQuizAttempt = () => {
    localStorage.setItem("attempt", true)
}
export const getFirstQuizAttempt = () => {
    return localStorage.getItem("attempt")
}
export const removeFirstQuizAttempt = () => {
    localStorage.removeItem("attempt")
}

export const getHeaders = (isFile = false, userRequired = true) => {
    if (isFile) {
        return {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Token ${getAuthToken()}`
        }
    } else {
        // if(userRequired){
        //     return {
        // 'content-type': 'application/json',
        // 'Authorization': `Token ${getAuthToken()}`,
        // 'user-uuid' : getUserUuid()
        // }
        // }else{
        return {
            'content-type': 'application/json',
            'Authorization': `Token ${getAuthToken()}`

        }
        // }

    }

}
export const resetToken = async (callback = async () => { }, onFail = async () => { }) => {

    //return onAuthStateChanged(auth, async (user) => {
    //    if (user) {
    //        return await user.getIdToken().then(async (token) => {
    //            setAuthToken(token);
    //            await callback()
    //            return token;
    //        });

    //    } else {
    //        await onFail()
    //        return false;
    //    }

    //})

    const headers = { 'Content-Type': 'application / x - www - form - urlencoded' }
    const body = { "grant_type": "refresh_token", "refresh_token": getRefreshToken() };

    return await axios({
        url: "https://securetoken.googleapis.com/v1/token?key=" + fireBaseConifg.apiKey,
        headers: headers,
        method: "POST",
        data: body
    }).then(async (token) => {
        setAuthToken(token.data.access_token);
        await callback()
        return token.data.access_token;
    }).catch(async (error) => {
        await onFail()
        return false;
    })

}
export const todayDate = () => {
    const date = new Date()
    return date.getFullYear() + "-" + setZeroPrefix(date.getMonth() + 1) + "-" + setZeroPrefix(date.getDate());
}
export const getMaximumLatestStroy = () => {
    return {
        news: 8,
        newsletter: 1,
    };
}
export const getMaximumLatestStroyHomePage = () => {
    return {
        news: 4,
        academics: 4,
        newsletter: 1,
        quiz: 4,
    };
}

export const getMaximumLatestActivityKnowledgePage = () => {
    return {
        activity: 4,
    };
}

export const isFromLastMonth = (dateString) => {
    const current = new Date();
    const given = new Date(dateString);

    current.setMonth(current.getMonth() - 1)
    if (given.getTime() > current.getTime()) {
        return true;
    } else {
        return false
    }
}

export const getTitle = (titleKey) => {
    switch (titleKey) {
        case "top_news": return "Top News of the Month";
        case "this_week": return "This Week";
        case "more_news": return "More News";
        case 'this_month': return "Earlier this month";
        default: return titleKey
    }

    // if (titleKey == 'latest') {
    //     return "Latest"
    // }
    // else if (titleKey == 'older') {
    //     return "Older"
    // }
    // else if (titleKey == 'earlier_this_week') {
    //     return "More"
    // }
    // else if (titleKey == 'earlier_this_month') {
    //     return "More"
    // }
    // else if (titleKey == 'earlier_this_year') {
    //     return "Even More"
    // }
}


export const getNav = () => {
    return localStorage.getItem("nav")
}

export const setNav = (num) => {
    localStorage.setItem("nav", num);
}

export const getMenu = () => {
    return localStorage.getItem("menu")
}

export const setMenu = (num) => {
    localStorage.setItem("menu", num);
}

export const setText = (text) => {
    let temp = text;
    let Windowwidth = window.innerWidth;
    if (Windowwidth < 768) {
        temp = temp.slice(0, 350);
    }
    if (Windowwidth < 500) {
        temp = temp.slice(0, 250);
    }
    if (Windowwidth < 400) {
        temp = temp.slice(0, 200);
    }
    if (Windowwidth < 400) {
        temp = temp.slice(0, 150);
    }
    if (Windowwidth < 350) {
        temp = temp.slice(0, 100);
    }
    if (temp.length < text.length) {
        temp += "...";
    }
    return temp;
}

export const setInfoText = (text) => {


    let temp = text;
    let Windowwidth = window.innerWidth;
    if (Windowwidth > 768) {
        temp = temp.slice(0, 70);
    }
    if (Windowwidth < 768) {
        temp = temp.slice(0, 50);
    }
    if (Windowwidth < 500) {
        temp = temp.slice(0, 40);
    }
    if (Windowwidth < 400) {
        temp = temp.slice(0, 30);
    }
    if (Windowwidth < 400) {
        temp = temp.slice(0, 35);
    }
    if (Windowwidth < 350) {
        temp = temp.slice(0, 45);
    }
    if (temp.length < text.length) {
        temp += "...";
    }
    return temp;
}

export const getSelctionPercentage = (countArray = []) => {
    let totalCount = 0;
    for (let count of countArray) {
        totalCount += count;
    }
    if (totalCount == 0) {
        totalCount = 1;
    }
    let i = 0;
    let returnData = [];
    for (let count of countArray) {
        returnData[i] = Math.round((count / totalCount) * 100);
        i++;
    }
    let totalPercentage = 0;
    i = 0;
    for (let percentage of returnData) {
        if (totalPercentage + percentage >= 100) {

            returnData[i] = 100 - totalPercentage;
            i++;
            while (i < returnData.length) {
                returnData[i] = 0;
                i++;
            }

        } else {
            totalPercentage += percentage
        }
        i++;
    }

    return returnData;

}

export const getCorrectAnswer = (optionsArray, answer) => {

    let i = 0;
    for (let option of optionsArray) {
        if (option === answer) {
            break;
        }
        i++;
    }

    switch (i) {
        case 0: return 'A';
        case 1: return 'B';
        case 2: return 'C';
        case 3: return 'D';
    }


}

export const premiumInt = async (which) => {
    
    let uuid = await getUserUuid();
    await axios({
        url: apiUrl.preIntUrl + '?user-uuid=' + uuid,
        method: "POST",
        headers: getHeaders(),
        data: { section: which }
    }).then(
        (res) => {

        }
    )
}
export const setZeroPrefix = (val) => {
    if (val < 10) {
        return '0' + val;
    }
    return val;
}
export const getCurrentTimeString = () => {

    let date = new Date();
    let currentDate = setZeroPrefix(date.getDate());
    let month = setZeroPrefix(date.getMonth() + 1);
    let year = setZeroPrefix(date.getFullYear());
    let hour = setZeroPrefix(date.getHours());
    let minutes = setZeroPrefix(date.getMinutes());
    let seconds = setZeroPrefix(date.getSeconds());
    return year + "-" + month + "-" + currentDate + "T" + hour + ":" + minutes + ":" + seconds;

}
export const setDateToAppFormat = (dateString) => {

    const date = new Date(dateString);

    // alert();
    let updatedDate = "";
    return date.getDate() + " " + setMonthToStr(date.getMonth()) + " " + date.getFullYear();
}
export const setMonthToStr = (month, isFullName = false) => {
    if (isFullName) {
        switch (parseInt(month) + 1) {
            case 1: return "January";
            case 2: return "February";
            case 3: return "March";
            case 4: return "April";
            case 5: return "May";
            case 6: return "June";
            case 7: return "July";
            case 8: return "August";
            case 9: return "September";
            case 10: return "October";
            case 11: return "November";
            case 12: return "December";
        }
    } else {
        switch (parseInt(month) + 1) {
            case 1: return "Jan";
            case 2: return "Feb";
            case 3: return "Mar";
            case 4: return "Apr";
            case 5: return "May";
            case 6: return "Jun";
            case 7: return "Jul";
            case 8: return "Aug";
            case 9: return "Sep";
            case 10: return "Oct";
            case 11: return "Nov";
            case 12: return "Dec";
        }
    }

}
export const getTimerData = (string) => {
    const currentDate = new Date();
    const quizEndDate = new Date(string);
    const differnece = (quizEndDate.getTime() - currentDate);

    var day = Math.floor(differnece / (1000 * 60 * 60 * 24));
    var hours = Math.floor((differnece % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((differnece % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((differnece % (1000 * 60)) / 1000);


    if (differnece <= 0) {

        return {
            day: 0,
            hours: 0,
            minutes: 0,
            seconds: 0
        }
    } else {
        return {
            day: day,
            hours: hours,
            minutes: minutes,
            seconds: seconds
        }
    }

}

export const getDateAndDayname = (string) => {
    const date = new Date(string);
    // var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return {
        date: setZeroPrefix(date.getDate()),
        month: setMonthToStr(date.getMonth())
    }
}

export const isApp = () => {
    let app = localStorage.getItem("in_app")
    if (app == null) {
        return false;
    }
    else {
        return true;
    }
}
export const checkDateBetween = (start, end, mid) => {
    const startTime = new Date(start)
    const endTime = new Date(end)
    const current = new Date(mid)

    if (startTime <= current && endTime >= current) {
        return true;
    } return false

}
export const setReadStatus = async (storyuuid) => {
    let uuid = getUserUuid();
    return await axios({
        url: apiUrl.storyUrl + "read/" + storyuuid + '/?user-uuid=' + uuid,
        method: "GET",
        headers: getHeaders()
    });
}

export const setUserType = (subjectList = []) => {
    if (subjectList && subjectList.length > 0) {
        if (subjectList.length < 2 && subjectList.includes("News")) {
            return "NEWS_USER"
        } else if (subjectList.length >= 2) {
            return "ACAD_USER"
        } else {
            return "FREE_USER";
        }
    } else {
        return "FREE_USER";
    }
}

export const getFirstAndLastDayofWeek = () => {
    const current_date = new Date()
    const current_day_of_week = current_date.getDay()
    // setting date to start of the day
    const todays_starting_date = new Date(current_date.getFullYear(), current_date.getMonth(), current_date.getDate())

    //logi for finidng start and end of the the day
    const totalMilliSecondsOfCurrentDay = todays_starting_date.getTime()
    const firstDayOfweek = totalMilliSecondsOfCurrentDay - ((current_day_of_week - 1) * (1000 * 60 * 60 * 24))
    const lastDayOfWeek = totalMilliSecondsOfCurrentDay + ((7 - (current_day_of_week - 1)) * (1000 * 60 * 60 * 24))

    return {
        start: new Date(new Date().setTime(firstDayOfweek)),
        end: new Date(new Date().setTime(lastDayOfWeek)),
    }
}
export const getUserAddressDetails = () => {
    return JSON.parse(localStorage.getItem('user-address-data'))
}
export const setUserAddressDetails = (data) => {
    localStorage.setItem("user-address-data", JSON.stringify(data))
}
export const removeUserAddressDetails = () => {
    localStorage.removeItem("user-address-data")
}
export const removeSearchHistory = () => {
    localStorage.removeItem("searchHistory")
}
export const openLink = (type = "dialer", customValue = "") => {
    if (window.flutter_inappwebview) {
        window.flutter_inappwebview.callHandler('linkopener', {
            url: type === "mail" ? customValue ? customValue : 'mailto:namaskar@summachar.in' : customValue ? customValue : 'tel:+919880678169'
        }).then(function (result) {
            console.log(result);
        });
    }

}

export const handleError = (err) => {
    if (err.response.status == '404' || err.response.status == '403' || err.response.status == '500' || err.response.status == '502') {
        window.location.replace('/err-' + err.response.status)
        return 0;
    }


}