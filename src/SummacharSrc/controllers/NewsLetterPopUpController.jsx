import axios from "axios";
import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router";
import { Store } from "../App";
import apiUrl from "../common/apiUrl";
import { getHeaders, getUserUuid, handleError } from "../common/helper";
import Loader from "../components/Loader";
import NewsLetterPopUpPage from "../pages/privatePages/newsletter/NewsLetterPopUpPage";
const getDataBySlug = async(slug)=>{
    return await axios({
        url:apiUrl.newsLetterUrl+"?user-uuid="+getUserUuid()+"&slug="+slug,
        method:"GET",
        headers:getHeaders(),
    }).then((res)=>{
        return {status:true,data:res.data}
    }).catch((error)=>{   
        handleError(error)     
        return {status:false,error:error}
    })

}
const NewsLetterPopUpController = () => {
    const params = useParams();
    const history = useHistory()
    const news = useContext(Store).newsletter;
    const [popUpData, setPopUpData] = useState({});
    const [loading, setLoaidng] = useState(false);
    
   
    useEffect(async () => {
        // if (news.data[news.currentTarget] && news.data[news.currentTarget][params.slug]) {
        //     setLoaidng(true)            
        //     await setPopUpData(news.data[news.currentTarget][params.slug])
        //     setLoaidng(false)
        // } else {
            setLoaidng(true)
            const response = await getDataBySlug(params.slug);
            if(response.status==true){
                if(response.data && response.data.results.length<=0){
                    history.replace("/not-found")
                setLoaidng(false)
                }else{
                    setPopUpData(response.data.results[0]);
                setLoaidng(false)
                }
                
            }else{
                setLoaidng(false)
                
                alert("OOPS.. Something went wrong!!")
            }
            
            
        // }
    }, [params.slug])
    if(!loading){
        return (
            <NewsLetterPopUpPage setPopUpData={setPopUpData} data={popUpData} loading={loading} />
        )
    } else {
        return (
            <div className="wrapper_container" id="newsletter_container" >
            <div className="letter_container">
                <div className="newsletter_main_container row">
                    <Loader />
                </div>
            </div>
            </div>

        )
    }
    
}
export default NewsLetterPopUpController;