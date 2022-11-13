

import "../../../src/assets/css/NewsPage.css";
import "../../../src/assets/css/commonImgDivs.css";

import LaoderSmall from "../../../src/assets/images/common/loader_small.gif"
import Trial from "../../../src/assets/images/common/trial.jpg"

const SliderTrial = (props) => {

    return (
        <>
            
            {/* <div className="trial_container" id="news_container" >                  
                <div className="outer-main-container">
                    <div className="inner-main-container">
                                 <div className="container" >
                                        <div className="news_div" >
                                            <div className="title-div" >
                                                <div className="title"><b>Title</b></div>
                                                <div className="grayline"></div>
                                            </div>
                                            <div className="content-grid">
                                               
                                                            <div className="outer-grid" >
                                                                <img className="grid-item" src={Trial} alt="" />
                                                            </div>
                                                            <div className="outer-grid" >
                                                                <img className="grid-item" src={Trial} alt="" />
                                                            </div>
                                                            <div className="outer-grid" >
                                                                <img className="grid-item" src={Trial} alt="" />
                                                            </div>
                                                            <div className="outer-grid" >
                                                                <img className="grid-item" src={Trial} alt="" />
                                                            </div>
                                                            <div className="outer-grid" >
                                                                <img className="grid-item" src={LaoderSmall} alt="" />
                                                            </div>
                                                      
                                                
                                            </div>
                                        </div>
                                    </div>
                    </div>
                </div>

            </div> */}


<div className="outer_bookmarks" >
                <div className="bookmarks">
                    <div className="container">
                        <div className="content-grid">
                            <div className="outer-grid" >
                                            <img className="grid-item" src={Trial} alt="" />
                                            <div className="close_book" >
                                                <img src={Trial} />
                                            </div>
                                            <div className="hover" >
                                                <div className="hidden fit-content" >
                                                    {/* //ane na hatavti */}
                                                </div>
                                                <div className="bottom" >
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"  >
                                                        <path d="M17 3H7C5.9 3 5 3.9 5 5V21L12 18L19 21V5C19 3.9 18.1 3 17 3ZM17 18L12 15.82L7 18L6.5 19C6.5 18.45 10.45 17.5 11 17.5L17 18C17.55 18 17 5.45 17 6V18Z" fill="white" />
                                                    </svg>
                                                    
                                                </div>
                                            </div>
                                        </div>
                        </div>
                    </div>
                </div>
            </div>

            
        </>
    )
}
export default SliderTrial;