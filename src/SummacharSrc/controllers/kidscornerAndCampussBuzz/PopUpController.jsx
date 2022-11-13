import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { toast } from "react-toastify";
import { Store } from "../../App";
import apiUrl from "../../common/apiUrl";
import { getHeaders, getUserUuid, handleError, setAuthToken } from "../../common/helper";
import Loader from "../../components/Loader";
import KidsCornerAndCampusBuzzPopUp from "../../pages/privatePages/kidscornerAndCampuusBuzz/KidsCornerAndCampusBuzzPopUp";
// import KidsCornerAndCampusBuzzPopUp from "../../../pages/kidscornerAndCampuusBuzz/KidsCornerAndCampusBuzzPopUp";
// import { Store } from "../../App";
// import apiUrl from "../../common/apiUrl";
// import { getHeaders, getUserUuid } from "../../common/helper";
// import Loader from "../../components/Loader";
// import NewsPopUp from "../pages/privatePages/news/NewsPopUp";

// src/pages/privatePages/Infographic.jsx

export const getDataBySlug = async (slug) => {
    return await axios({
        url: apiUrl.newsUrl + slug + "/?user-uuid=" + getUserUuid(), //"&slug="+slug,
        method: "GET",
        headers: getHeaders(),
    })
        .then((res) => {
            return { status: true, data: res.data };
        })
        .catch((error) => {
            if (error.response.code === 401) {
                setAuthToken(async () => { await getDataBySlug(slug) })
            } else {
                handleError(error)
                return { status: false, error: error, code: error.response.code };
            }
            
        });
};

const PopUpController = (props) => {
    const params = useParams();
    const history = useHistory();

    const [popUpData, setPopUpData] = useState({});
    const [loading, setLoading] = useState(false);




    useEffect(async () => {
        
        setPopUpData(props.data)        
        
        return () => {
            props.onClosePopUp()
        }
    }, []);

    const onPopState = () => {
        props.onClosePopUp()
    }
    useEffect(() => {
        window.addEventListener('popstate', onPopState)
        return () => {
            return window.removeEventListener('popstate', onPopState)
        }
    }, [])
   

    if (!loading) {
        return (
            <>
                <KidsCornerAndCampusBuzzPopUp data={popUpData} />
            </>
        );
    } else {
        return (
            <div className="pop_up_container row df center">
                
                <div className="news_popUp_Box df">
                    <Loader />
                </div>
            </div>
        );
    }
};
export default PopUpController;
