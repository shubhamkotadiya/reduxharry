import React, { useContext, useEffect, useState } from "react"
import { Store } from "../../App";
import apiUrl  from "../../common/apiUrl"
import axios from "axios";
import { getHeaders} from "../../common/helper";
import { Route, Switch, useParams, useRouteMatch } from "react-router";
import { BsFillCheckCircleFill } from 'react-icons/bs'        
import { ImWarning } from 'react-icons/im'
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import "../../assets/css/verifyEmail.css";
import Loader from "../../components/Loader"

const VerifyEmail = () => {
    const history = useHistory()
    const [isLoading,setLoad] = useState(true);
    const [success, changeSuccess] = useState("");
    let { path, url } = useRouteMatch();
    const params = useParams();
    const [sec,Sec]=useState([5])
    const [show, Show] = useState(-1);
    let interval = 0;
    let img = [BsFillCheckCircleFill, ImWarning, ImWarning]
    let message = ["Your email has been verified", "Email verification failed. Please try again.", "The link is expired.Please try again.", "Something went wrong!"]
    let timer = 0;
    useEffect(async () => {
        await get();
    }, [])

    useEffect(() => {

        if (sec > 0) {
            interval = setInterval(() => {
                Sec(sec - 1);
            }, 1000);
        }
        else {

            clearInterval(interval)
            if(show==0)
                history.push('/home');
            else
                history.push('/profile/profile');
        }
        return () => clearInterval(interval)
    }, [sec]);

    let get = async () => {
        let str = window.location.href
        let arr = str.split("code=")
        let a1 = arr[1].split("&user-uuid=")[0];
        let a2 = arr[1].split("&user-uuid=")[1];
    
        await axios({
            url: apiUrl.emailVerification,
            method: "GET",
            params: {
                'code': a1,
                'user-uuid': a2
            },
            'content-type': 'application/json',
        }).then(
            (res) => {
                setLoad(false);
                Sec(5)
                Show(0)
                changeSuccess("Your email has been verified")
                // console.log(res);
            }
             
        ).catch((error) => {
            setLoad(false);
            Sec(5);
            if (error && error.response) {
                if (error.response.status == 400) {
                    if (error.response.details == "Invalid Code") {
                        Show(1)
                        changeSuccess("Email verification failed. Please try again.")

                    }
                    else {
                        Show(2)
                        changeSuccess("The link is expired. Please try again.")
                    }
                } else {
                    Show(3)
                    changeSuccess("Something went wrong!");
                 
                }
            }
        })
    }

   
    const setTimer = () => {
        if (sec[0] > 0) {
            Sec([sec - 1]);
         
        }
        else {
            clearInterval(timer);
           /* history.push("/home")*/
        }
    }
   

    return (
        <>
            {
                !isLoading ? (<div className="most-outer">
                    <div className="outer_sqaure">
                        <div className="" > {
                            show == 1 ? <ImWarning style={{ height: "40px", width: "40px", color: "#ECC249" }} />
                                : (show == 0 ? <BsFillCheckCircleFill style={{ height: "40px", width: "40px", color: "green" }} />
                                    : <ImWarning style={{ height: "40px", width: "40px", color: "#ECC249" }} />)}

                        </div>
                        <div className="success_msg">{success}</div>
                        {show==0 && <><div>You will be redirected to Pathshala Home In {sec} seconds..</div>
                        <button className="btn-primary radius-primary"><Link to="/home" style={{ color: "white" }}>Go To Home</Link></button>
                        </>}
                        {show !=0 && <><div>You will be redirected to Pathshala Profile In {sec} seconds..</div>
                            <button className="btn-primary radius-primary"><Link to="/profile/profile" style={{ color: "white" }}>Try Again</Link></button>
                        </>}
                    </div>
                     
                </div>) : (
                        <Loader/>
                    )
            }
        </>)
     
        }

export default VerifyEmail






