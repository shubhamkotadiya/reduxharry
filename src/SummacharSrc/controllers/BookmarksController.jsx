import React, { useContext, useEffect, useState } from "react";
import Loader from "../components/Loader";
import axios from "axios";
import apiUrl from "../common/apiUrl";
import BookmarksPage from "../pages/privatePages/Profile/Bookmarks"
import { getHeaders, getMaximumLatestStroy, getUserUuid, handleError, isFromLastMonth, resetToken } from "../common/helper";
import { BreadCrumbContext, Store } from "../App";
import { useHistory, Switch, Route, useRouteMatch } from "react-router";
import NoBook from "../pages/privatePages/Profile/NoBookmark"
import NewsPopUpController from "./NewsPopUpController";
import {  useLocation } from "react-router-dom";
const BookmarksPageController = () => {
const location = useLocation();
  const { path, url } = useRouteMatch();
  const [bookmarks, changeBookmark] = useState([]);
  const [loading, setLoading] = useState(false);
  const news = useContext(Store).news;
  const history = useHistory()

  const bookMark = async (data, staus, index) => {
    setLoading(true)
    await news.setBookMark("from_bookmark", data.slug, data.uuid, staus)
    const temp = [...bookmarks];
    temp.splice(index, 1);
    changeBookmark(temp)
    setLoading(false)
  }
  const openPopUp = (data, keyIndex) => {
    history.push(path+'/' + data.slug)
    news.setcurrentTarget("from_bookmark")
  }
  // const breadCrumb = useContext(BreadCrumbContext);
  // useEffect(()=>{
  //     breadCrumb.set([<span className="color-blue" onClick={()=>{history.push("/profile")}}>Profile</span>,'Bookmarks'])
  // },[])
  const mainbreadCrumb = useContext(BreadCrumbContext);
  useEffect(()=>{
    
      mainbreadCrumb.set([<span className="color-blue">Profile</span>,'Bookmarks'] ,["/profile/profile"] );
  },[location,url])
  
  const getData = async () => {
   
    return await axios({
      url: apiUrl.bookMarkedUrl + "?user-uuid=" + getUserUuid(),
      method: "GET",
      headers: getHeaders()
    }).then(res => {
      if (res.status == 200 || res.status == 201) {
        changeBookmark(res.data.results)
      }
    })
      .catch(error => {
        handleError(error)
      })
  }

  useEffect(async () => {
    if (bookmarks.length == 0) {
      setLoading(true)
      await getData();
      setLoading(false)
    }

  }, [])
  const RemoveFromSel = (num) => {
    let tempSel = [...bookmarks]
    tempSel.splice(num, 1);
    changeBookmark(tempSel)
  }




  return (
    <Switch>
      <Route exact path={path + '/'}  >
        <>
          {loading ? <Loader /> : (bookmarks.length > 0 ? <BookmarksPage bookMark={bookMark} openPopUp={openPopUp} data={bookmarks} removeBook={RemoveFromSel}></BookmarksPage> : <NoBook></NoBook>)}
        </>
      </Route>
      <Route  path={`${path}/:slug`} component={NewsPopUpController} />
    </Switch>

  )
}



export default BookmarksPageController;