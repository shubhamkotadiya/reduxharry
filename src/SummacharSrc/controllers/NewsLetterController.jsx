import React, { useContext, useEffect, useState } from "react";
import { Store } from "../App";
import NewsLetterPage from "../pages/privatePages/newsletter/NewsLetterPage";
import "../../src/assets/css/news-letter.css";
import "../../src/assets/css/commonImgDivs.css";
import "../../src/index.css";
import Loader from "../components/Loader";
import { isFreeTrial } from "../common/helper";
const NewsLetterController = () => {
    const [isLoading, setLoading] = useState(false);
    const newsletter = useContext(Store).newsletter;
    useEffect(async()=>{
        if(!(newsletter.data && Object.keys(newsletter.data).length>0)){
            setLoading(true)
            await newsletter.getData();
            setLoading(false)
        }
    }, [])
    const [scrollLoading, setScrollLoading] = useState(false);
    const onScroll = async () => {
        var height = document.getElementById("newsletter_container").clientHeight;
        var fullheight = document.getElementById("newsletter_container").scrollHeight;
        var scrollTop = document.getElementById("newsletter_container").scrollTop;

        if (scrollTop + height > fullheight - 200) {

            if (!scrollLoading) {

                if (!isFreeTrial() && newsletter.next != null && newsletter.next != "") {
                    setScrollLoading(true)
                    await newsletter.getData();
                    setScrollLoading(false)
                }

            }
        }
    }


   
    if (isLoading) {
        return (
            <Loader />
        )

    } else {
        return (
            <NewsLetterPage 
                data={newsletter.data}
                onScroll={onScroll}
                scrollLoading={scrollLoading}
            />
        )
    }

    
}
export default NewsLetterController;