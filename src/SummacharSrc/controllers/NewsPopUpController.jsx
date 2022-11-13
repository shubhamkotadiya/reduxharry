import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Store } from "../App";
import apiUrl from "../common/apiUrl";
import { getHeaders, getUserUuid, handleError } from "../common/helper";
import Loader from "../components/Loader";
import NewsPopUp from "../pages/privatePages/news/NewsPopUp";
import Infographic from "../pages/privatePages/Infographic";
import { toast } from "react-toastify";
import { LockingSystemContext } from "../components/lockingsystem/LockingSysytemPopUp";
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
            handleError(error)
            return { status: false, error: error };
        });
};

const NewsPopUpController = (props) => {
    const params = useParams();
    const history = useHistory();
    const news = useContext(Store).news;
    const [popUpData, setPopUpData] = useState({});
    const [loading, setLoaidng] = useState(true);
    const [bookMarkLoader, setBookMarkLoader] = useState(false);

    const bookMark = async (value) => {
        if (news.currentTarget != "" && news.currentTarget != "from_bookmark") {
            setBookMarkLoader(true);
            await news.setBookMark(news.currentTarget, popUpData.slug, popUpData.uuid, value);
            setBookMarkLoader(false);
        } else {
            setBookMarkLoader(true);
            const response = await news.setBookMark(news.currentTarget, popUpData.slug, popUpData.uuid, value);
            if (response.status == true) {
                setPopUpData({ ...popUpData, has_bookmarked: response.data.has_bookmarked });
            }
            setBookMarkLoader(false);
        }
    };
    const lockSystem = useContext(LockingSystemContext)
    useEffect(async () => {
        if (news.data[news.currentTarget] && news.data[news.currentTarget][params.slug]) {
            setLoaidng(true);
            await setPopUpData(news.data[news.currentTarget][params.slug]);
            setLoaidng(false);
        } else {
            setLoaidng(true);
            const response = await getDataBySlug(params.slug);
            if (response.status == true) {
                if (!response.data.results[0].user_has_access) {
                    history.push("/news")
                    lockSystem.openPopUp("ONLY_TEXT", "This story is for our premium users. Go Premium to access all content.")
                    // toast.error("")
                    //

                }
                setPopUpData(response.data.results[0]);
                setLoaidng(false);
            } else {

                history.push("/news")
                lockSystem.openPopUp("ONLY_TEXT", "Oops, something went wrong. ")
                setLoaidng(false);
            }
        }
    }, [params.slug]);
    const onBackClick = () => {
        if (news.currentTarget == "from_bookmark") {
            // history.replace("/profile/bookmarks")
            history.goBack();
        } else if (news.currentTarget === "home") {
            history.goBack();
        } else {
            history.push("/news");
        }
    };
    if (!loading) {
        return (
            <>
                <div className="common-grid-outer" id="swipe_scrol_disabled" style={{ flex: 1, overflowY: "scroll", overflowX: "hidden" }}>
                    <NewsPopUp hideFunctionButtons={props.hideFunctionButtons ? props.hideFunctionButtons : false} onBackClick={onBackClick} bookMark={bookMark} bookMarkLoader={bookMarkLoader} data={popUpData} setPopUpData={setPopUpData} loading={loading} />
                </div> {/* <Infographic onBackClick={onBackClick} bookMark={bookMark} bookMarkLoader={bookMarkLoader} data={popUpData} setPopUpData={setPopUpData} loading={loading} /> */}
            </>
        );
    } else {
        return (
            <div className="pop_up_container row df center">
                {/* <div className="grayArea fit-content" onClick={() => { history.goBack() }}></div> */}
                <div className="news_popUp_Box df">
                    <Loader />
                </div>
            </div>
        );
    }
};
export default NewsPopUpController;
