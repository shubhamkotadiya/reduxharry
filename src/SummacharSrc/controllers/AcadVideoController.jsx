import React, { useContext, useEffect, useState } from "react";
import { Store } from "../App";
import { isFreeTrial, getHeaders, resetToken, getUserUuid, isApp, handleError } from "../common/helper";
import Loader from "../components/Loader"
import apiUrl from "../common/apiUrl";
import axios from "axios";
import { toast } from "react-toastify";

import { Route, Switch, useHistory, useParams, useRouteMatch } from "react-router";
import AcadVideoPage from "../pages/privatePages/Academics/AcadVideo";
import AcademicsVideoPopUp from "../pages/privatePages/Academics/AcademicsVideoPopUp";
const AcadVideoController = (props) => {
    const params = useParams();
    const [loading, setLoading] = useState(false);
    const {path,url} = useRouteMatch()
    const history = useHistory()
    const [popUpData,setPopUpData] = useState({data:{},visiblity:false});
    const [videoList, setVideos] = useState({ data: [], pageNo: 1, next: "" })
    // const subjectname = ;

    useEffect(async () => {
        
        props.setBreadCrumb([{name:params.subject,redirect:"/concepts"},{name:"Videos",redirect:"/videos"}])
        setLoading(true)
        await getVideoList()
        setLoading(false)
        return ()=>{}
    }, []);
  

    

    const getVideoList = async () => {
        return await axios({
            url: apiUrl.subjectVideos + "?academic_subjects=" + params.subject + "&user-uuid=" + getUserUuid() ,
            method:"GET",
            headers:getHeaders()
        })
        .then(async(response)=>{
            const data = response.data;
            setVideos({...videoList,data:data});            
            return {status:true,data:response.data}
        })
        .catch(async(error)=>{
            if(error.response.status==401){
                await resetToken(async()=>{await getVideoList()});
                
                return {status:false,code:error.response.status}
            }else{
                handleError(error)
                return {status:false,code:error.response.status}
            }
            
        })
    }
    const openPopUp  = (data) => {
        setPopUpData({data:data,visiblity:true})
        history.push(url+"/"+data.slug)        
    }
    if (!loading) {
        return (
            <>
                {/* {popUpData.visiblity && } */}
                <Switch>
                    <Route path={url + "/:slug"}>
                        {isApp() ? <></>: <AcademicsVideoPopUp visiblity={popUpData.visiblity} data={popUpData.data} closePopUp={()=>{setPopUpData({data:{},visiblity:false});history.goBack()}} />}
                    </Route>
                </Switch>
                <AcadVideoPage openPopUp={openPopUp} data={videoList.data} />
            </>
        );
    } else {
        return (
            <Loader></Loader>
        )
    }


}

export default AcadVideoController;
