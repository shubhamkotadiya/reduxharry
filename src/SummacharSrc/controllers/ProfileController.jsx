import React, { useContext, useEffect, useState } from "react";
import { BreadCrumbContext, Store } from "../App";
import ProfilePage from "../pages/privatePages/Profile/Profile";
import NavBar from "../pages/privatePages/navbar/NavBar";
import { isFreeTrial, getHeaders, resetToken, getUserUuid } from "../common/helper";
import apiUrl from "../common/apiUrl";
import axios from "axios";
import { toast } from "react-toastify";
import { setLoginAction, setLogOut, setUserDataAction } from "../actions/userActions";
import { useLocation } from "react-router-dom";

const ProfilePageController = () => {
    let userData = useContext(Store).user.data;
    const [user, setUser] = useState(userData);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let i = 0;
    let uuid = getUserUuid();
    let [school, changeSchool] = useState(user.associated_school == null ? "-" : user.associated_school);
    let [grade, changeGrade] = useState(user.grade == null ? "-" : user.grade);
    let [board, changeBoard] = useState(user.board == null ? "-" : user.board);
    let [pathshalaList, changePathshala] = useState([]);
    let [boardsList, changeBoards] = useState([]);
    let [fullboardsList, changefullBoards] = useState([]);
    let [username, changeUsername] = useState(user.username == null ? "-" : user.username);
    let [name, changeName] = useState(user.full_name == null ? "-" : user.full_name);
    let [email, changeEmail] = useState(user.email == null ? "-" : user.email);
    let [birth_date, changeBirth] = useState(user.birth_date == null ? "-" : user.birth_date);
    let [emailChanged, EmailChanged] = useState(false);
    let [isExpired, setExpired] = useState(false);
    let [end_date, setEnd] = useState("");
    let [change, isChanged] = useState(false);
    let sub_details;
    let [datesArr, setArr] = useState([]);
    let [grades, changeGrades] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    let useCont = useContext(Store);
    let properties = ["username", "name"];
    let partners = [];
    let boards = [];
    let boardsFull = []
    let getPartnerList = async () => {
        await axios({
            url: apiUrl.partnerListUrl + "?user-uuid=" + uuid,
            method: "get",
            headers: getHeaders(),
        }).then((res) => {
            for (let i = 0; i < res.data.length; i++) partners.push(res.data[i].school_name);
        });
        changePathshala(partners);
    };
    let getBoards = async () => {
        await axios({
            url: apiUrl.boardsListUrl + "?user-uuid=" + uuid,
            method: "get",
            headers: getHeaders(),
        }).then((res) => {

            for (let i = 0; i < res.data.data.length; i++) {
                boards.push(res.data.data[i].board_short_name);
                boardsFull.push(res.data.data[i].board_name);

            }
        });
        changeBoards(boards);
        changefullBoards(boardsFull);

    };

    let e = 0;
    useEffect(() => {
        getPartnerList();
        getBoards();
        if (user.is_email_verification_link_active && !user.is_email_verified) {
            EmailChanged(true);
        }
        setArr(new Date().toDateString().split(" "));


    }, []);

    useEffect(() => {
        setExpiry();
    }, [user])

    useEffect(() => {
        setExpiry();
    }, [datesArr])


    let setExpiry = () => {
        if (datesArr.length > 0 && user.subscription_endtime) {
            if (parseInt(datesArr[3]) >= parseInt(user.subscription_endtime.slice(0, 4))) {
                if (parseInt(datesArr[3]) > parseInt(user.subscription_endtime.slice(0, 4))) {
                    setExpired(true);
                    setEnd(user.subscription_endtime.slice(8, 10) + " " + months[parseInt(user.subscription_endtime.slice(5, 7)) - 1] + " " + user.subscription_endtime.slice(0, 4));

                }
                else if (months.indexOf(datesArr[1]) + 1 >= parseInt(user.subscription_starttime.slice(5, 7))) {
                    if (months.indexOf(datesArr[1]) + 1 > parseInt(user.subscription_starttime.slice(5, 7))) {
                        setExpired(true);
                        setEnd(user.subscription_endtime.slice(8, 10) + " " + months[parseInt(user.subscription_endtime.slice(5, 7)) - 1] + " " + user.subscription_endtime.slice(0, 4));
                    }
                    else if (datesArr[2] >= user.subscription_endtime.slice(8, 10)) {
                        if (datesArr[2] > parseInt(user.subscription_starttime.slice(8, 10))) {
                            setExpired(true);
                            setEnd(user.subscription_endtime.slice(8, 10) + " " + months[parseInt(user.subscription_endtime.slice(5, 7)) - 1] + " " + user.subscription_endtime.slice(0, 4));
                        }

                    }
                }
            }

        }


    }
    let verifyEmail = async (id) => {
        let newData = {};
        newData.email = id;
        await axios({
            url: apiUrl.emailVerify + "?user-uuid=" + uuid,
            method: "POST",
            headers: getHeaders(),
            data: newData,
        })
            .then((res) => {
                toast.success("Please verify email address by cliciking the link sent on mail id");
                EmailChanged(true);
                // console.log(res);
                e = 0;
            })
            .catch(async (error) => {
                if (error && error.response) {
                    if (error.response.status == 401 && e < 3) {
                        await resetToken();
                        await setUserDeatils();
                        e++;
                    } else {
                        toast.error("Verification email could not be sent. Please try again!");

                    }
                }
            });
    };
    let setDeatils = async (which, value) => {
        {
            isChanged(true);

            if (which == "associated_school") {
                changeSchool(value);
            } else if (which == "grade") {
                changeGrade(value);
            }
            else {
                changeBoard(value);
            }
        }
    };

    let saveUserDeatils = async (which, event) => {
        //if (which == "birth_date" && event.target.value != '-' && (event.target.value.length != 10 || event.target.value[4] != '-' || event.target.value[7] != '-')) {
        //    success = false;
        //    toast.info("Please write date in shownn format");
        //}
        //else if (which == 'email' && event.target.value != '-' && event.target.value != null && event.target.value != "") {
        //    console.log(event.target.value)
        //    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        //    success = emailPattern.test(event.target.value);
        //    if (!success) {
        //        toast.info("Please write appropriate mail id");
        //    }
        //}
        //else if (which == 'grade' && event.target.value != '-' && event.target.value <= 0) {
        //    success = false;
        //    toast.info("Grade should be positive number");
        //}
        isChanged(true);
        if (which == "associated_school") {
            changeSchool(event.target.value);
        } else if (which == "grade") {
            changeGrade(event.target.value);
        } else if (which == "board") {
            changeBoard(event.target.value);
        } else if (which == "full_name") {
            changeName(event.target.value);
        } else if (which == "username") {
            changeUsername(event.target.value);
        } else if (which == "birth_date") {
            changeBirth(event.target.value);
        } else if (which == "email") {
            let str = event.target.value;
            if (event.target.value[0] == "-") {
                if (str.length > 1) str = str.substring(1);
            } else if (str == "") {
                str = "-";
            }
            EmailChanged(false);
            changeEmail(str);
        }
    };

    let cancel = async () => {
        isChanged(false);
        changeSchool(user.associated_school == null ? "-" : user.associated_school);
        changeGrade(user.grade == null ? "-" : user.grade);
        changeBoard(user.board == null ? "-" : user.board);
        changeName(user.full_name == null ? "-" : user.full_name);
        changeUsername(user.username == null ? "-" : user.username);
        changeBirth(user.birth_date == null ? "-" : user.birth_date);
        changeEmail(user.email == null ? "-" : user.email);
    };

    let setUserDeatils = async () => {
        let success = true;
        let newData = {};
        if (school != user.associated_school && school != "-") {
            newData.associated_school = school;
        }
        if (grade != user.grade && grade != "-") {
            if (grade <= 0) {
                success = false;
                toast.info("Grade should be positive number");
            } else newData.grade = grade;
        }

        if (board != user.board && board != "-") {
            newData.board = board;
        }

        if (name != user.full_name && name != "" && name != '-') {
            newData.full_name = name;
        }
        else if (name == "" || name == '-') {
            toast.info("Fullname is required");
            changeName(user.full_name)
            name = user.full_name;

        }

        if (username != user.username && username != "" && username != '-') {
            newData.username = username;
        }
        else if (username == "" || username == '-') {
            toast.info("Username required");
            changeUsername(user.username);
            username = user.username;
        }

        if (birth_date != user.birth_date && birth_date != "-") {
            if (birth_date.length != 10 || birth_date[4] != "-" || birth_date[7] != "-") {
                success = false;
                toast.info("Please write date in shownn format");
            } else newData.birth_date = birth_date;
        }
        if (email != user.email && email != "-") {
            var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            success = emailPattern.test(email);
            if (success) {
                newData.email = email;
                e = 0;
                await verifyEmail(email);
            } else toast.info("Please write appropriate mail id");
        } else if (user.email != null && email == "-") {
            newData.email = null;
        }

        if (success && Object.keys(newData).length != 0) {
            await axios({
                url: apiUrl.profileUrl + "?user-uuid=" + uuid,
                method: "PATCH",
                headers: getHeaders(),
                data: newData,
            })
                .then((res) => {
                    toast.success("Updated data Successfully");
                    isChanged(false);
                    userData = res.data;
                    setUser(res.data);
                    useCont.user.setUserData(res.data);
                    // console.log(useCont.user)

                    i = 0;
                })
                .catch(async (error) => {
                    if (error && error.response) {
                        if (error.response.status == 401 && i < 3) {
                            await resetToken();
                            await setUserDeatils();

                            i++;
                        } else if (error.response.status == 400) {
                            toast.error("Username already taken");
                            cancel();
                        } else {
                            toast.error("Something went wrong!");
                            cancel();
                        }
                    }
                });
        }
    };



    if (isFreeTrial()) {
        sub_details = "Free Trial";
    } else {
        sub_details = user.duration + " (" + user.subscription_starttime.slice(8, 10) + " " + months[parseInt(user.subscription_starttime.slice(5, 7)) - 1] + " " + user.subscription_starttime.slice(0, 4) + " - " + user.subscription_endtime.slice(8, 10) + " " + months[parseInt(user.subscription_endtime.slice(5, 7)) - 1] + " " + user.subscription_endtime.slice(0, 4) + " )";
    }
    const breadCrumb = useContext(BreadCrumbContext);
    const location = useLocation()
    useEffect(() => {
        breadCrumb.set(['Profile'])
        
    }, [])
    return <ProfilePage from={location.state && location.state.from?location.state.from:''} user={user} change={change} emailChanged={emailChanged} isExpired={isExpired} end_date={end_date} email={email} changeBirth={changeBirth} birth_date={birth_date} name={name} changeEmail={changeEmail} username={username} changeUsername={changeUsername} changeName={changeName} school={school} grade={grade} board={board} subscription={sub_details} grades={grades} setDeatils={setDeatils} pathshala={pathshalaList} boards={boardsList} fullboards={fullboardsList} saveUserDeatils={saveUserDeatils} setUserDeatils={setUserDeatils} cancel={cancel}></ProfilePage>;
};

export default ProfilePageController;
