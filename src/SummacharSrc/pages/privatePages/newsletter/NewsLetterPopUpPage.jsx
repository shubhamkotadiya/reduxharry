import React from "react";
import { useHistory } from "react-router";
import NewsLetterStoryComponent from "./NewsLetterStoryComponent";
const NewsLetterPopUpPage = (Props) => {
    const data = Props.data;
    const history = useHistory();
    return (
        <div className="news_container" style={{height:"100%",maxHeight:"100%",paddingTop:"0px"}} id="newsletter_container" >
            <div className="letter_container">
                <div className="newsletter_main_container row">
                    <div className="df row row-center" style={{marginBottom:"10px"}}>
                        <button className="functionality_btn df center" onClick={()=>{history.goBack()}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                                <path d="M20.6663 10.6667C20.6663 9.93029 20.0694 9.33333 19.333 9.33333H4.43967L10.9463 2.82667C11.4686 2.30438 11.4671 1.45712 10.943 0.936678C10.4215 0.41883 9.57936 0.420319 9.05967 0.940006L0.747223 9.25245C-0.0338258 10.0335 -0.033827 11.2998 0.747222 12.0809L9.05925 20.3929C9.57863 20.9123 10.4207 20.9123 10.9401 20.3929C11.4591 19.8739 11.4595 19.0324 10.9409 18.5129L4.43967 12H19.333C20.0694 12 20.6663 11.403 20.6663 10.6667Z" fill="#5C56D4" />
                            </svg>
                        </button>
                        <h1 className="txt-extraalarge" style={{color:"#000",cursor:"default"}}>{data.headline}</h1>
                    </div>
                    <div className="df row" style={{flexDirection:"column"}}>

                    {data && Object.keys(data).length>0 && data.content_associated &&
                        data.content_associated.map((Tempdata,index)=>{
                            return <NewsLetterStoryComponent popUpData={data} popUpdataIndex={index} setPopUpData={Props.setPopUpData} key={index} data={Tempdata} loading={Props.loading} />
                        })
                    }
                        
                    </div>
                </div>
            </div>

        </div>
    )
}
export default NewsLetterPopUpPage;