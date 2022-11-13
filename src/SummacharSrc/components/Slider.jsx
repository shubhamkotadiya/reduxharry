import React, { createContext, useContext, useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import styleSheet, { focusStyle } from "../common/stylesheet";
import InStoryQuiz from "./InStoryQuiz";
import { Store } from "../App";
import { detect } from 'detect-browser'
import { PulltoRefreshWork } from "../routes/PrivateRoute";

const Indicator = (Props) => {
    return (

        <button className="df flex-1 center" style={{ height: "10px" }} onClick={() => { Props.onClick() }}>
            <div className="indicator" style={Props.isSelected ? { backgroundColor: styleSheet.primaryColor } : {}}>
                {Props.isQuiz && <div style={Props.isSelected ? { backgroundColor: styleSheet.primaryColor } : {}} className="round_dot"></div>}
            </div>

        </button>
    )
}

const ImageComponent = (Props) => {
    // const [animationTime, setAnimationTime]=useState(0);
    // const AnimStop = ()=>{
    //     let tempTime = 0.1;
    //     const timeAnimated = setInterval(()=>{
    //         if(tempTime<=1.3){
    //             tempTime=tempTime+0.1;
    //             setAnimationTime(tempTime);
    //         } else {
    //             clearInterval(timeAnimated)
    //         }
    //     },100)
    // }
    
    return (
        <div className="carousal_image fit-content radius-primary">
        {/* { window.innerWidth<=959 && Props.hasRead && animationTime <=1.3 ? <div className="read-tick-background-blur-animation" onLoad={()=>{AnimStop()}}></div>:<></>} */}

            <img className="row radius-primary " src={Props.image} alt="" />
        </div>
    )
}

// const PulltoRefreshWork = createContext(); 

const Slider = (Props) => {
    // const [pulltorefresh,setPulltorefresh] = useState(true);
    
    const [hideArrow, sethideArrow] = useState(true);
    const [slides, setSlides] = useState(Props.data.slides ? Props.data.slides : [])
    const [windowSize, setWindowSize] = useState({ width: window.innerWidth });
    const storyHasQuestion = Props.storyHasQuestion && Props.storyHasQuestion == true ? true : false;
    const [index, setIndex] = useState(0);

    const handleChange = (selectedIndex) => {
        setIndex(selectedIndex);
        if (!storyHasQuestion && selectedIndex === slides.length - 1) { Props.onRead() }
    }

    const onResize = () => {
        setWindowSize({ width: window.innerWidth })
    }
    useEffect(() => {
        if (Props.data.slides) {
            setSlides(Props.data.slides)
        }

    }, [Props.data.slides])
    useEffect(() => {
        onResize();
        window.addEventListener('resize', onResize)
        return () => { return window.removeEventListener('resize', onResize) }
    }, [])

    let selectedFound = slides.length;

    
        
        const showArrowsStop = ()=>{
            let tempTime = 0.25;
            const timeAnimated = setInterval(()=>{
                if(tempTime<0.5){
                    tempTime = tempTime + 0.25;
                    sethideArrow(false);
                } else {
                    clearInterval(timeAnimated)
                    sethideArrow(true);
                }
            },250)
        }
    const pullTorefreshContext = useContext(PulltoRefreshWork)
    
    return (
        <div style={{ width: "100%", marginLeft: "auto", marginRight: "auto" }} id="slider">
            
            <Carousel
                swipeScrollTolerance={100}
                preventMovementUntilSwipeScrollTolerance={true}
                onSwipeStart={() => {
                    const scrollablEle = document.getElementById('swipe_scrol_disabled')
                    if (scrollablEle && detect().name === "safari") {
                        scrollablEle.style.overflowY = "hidden"
                    }
                    sethideArrow(false);
                    pullTorefreshContext.set(false)
                    // document.body.addEventListener('touchmove', (e)=>{e.preventDefault();}, { passive: false });
                    document.getElementById("slider").addEventListener('touchmove', (e)=>{e.preventDefault();}, { passive: false });
                    
                }}
                onSwipeEnd={() => {
                    const scrollablEle = document.getElementById('swipe_scrol_disabled')
                    if (scrollablEle && detect().name === "safari") {
                        scrollablEle.style.overflowY = "scroll"
                    }
                    sethideArrow(true);
                    pullTorefreshContext.set(true)
                    // document.body.addEventListener('touchmove', (e)=>{e.preventDefault();}, { passive: true });
                    document.getElementById("slider").addEventListener('touchmove', (e)=>{e.preventDefault();}, { passive: true });
                }}
                onChange={handleChange}
                labels={{ leftArrow: 'previous slide / item', rightArrow: 'next slide / item' }}
                renderIndicator={
                    (fun, selected, index, labels) => {


                        if (selected) {
                            selectedFound = index
                        }
                        // if(index==slides.length-1 && !storyHasQuestion){
                        //      Props.onRead()
                        // }
                        if(slides.length==1){
                            return <></>
                        }
                        return <Indicator isSelected={index <= selectedFound || selected} isQuiz={slides[index].slide_type != "Media"}
                            onClick={() => {
                                fun();
                                selectedFound = slides.length;
                                // if (!storyHasQuestion && index == slides.length - 1) { Props.onRead() }
                            }
                            }

                        />
                    }}
                renderArrowNext={
                    (next, hasNext) => {
                        if ((windowSize.width > styleSheet.breakPointForSlider || (windowSize.width <= styleSheet.breakPointForSlider && !hideArrow)) && index < slides.length - 1) 
                        {

                            return (
                                
                                <>
                                {hasNext && 
                                <button className="next-btn" onClick={() => {showArrowsStop(); next(); }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                                        <path d="M12.3866 21.1733L17.5599 16L12.3866 10.8266C11.8666 10.3066 11.8666 9.46664 12.3866 8.94664C12.9066 8.42664 13.7466 8.42664 14.2666 8.94664L20.3866 15.0666C20.9066 15.5866 20.9066 16.4266 20.3866 16.9466L14.2666 23.0666C13.7466 23.5866 12.9066 23.5866 12.3866 23.0666C11.8799 22.5466 11.8666 21.6933 12.3866 21.1733Z" fill="#777777" />
                                    </svg>
                                </button>}
                                {hasNext &&
                                    <button className="next-btn-inimage" id="next-btn-inimage" onClick={(e) => {showArrowsStop();  next();e.preventDefault(); e.stopPropagation(); }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                                            <path d="M12.3866 21.1733L17.5599 16L12.3866 10.8266C11.8666 10.3066 11.8666 9.46664 12.3866 8.94664C12.9066 8.42664 13.7466 8.42664 14.2666 8.94664L20.3866 15.0666C20.9066 15.5866 20.9066 16.4266 20.3866 16.9466L14.2666 23.0666C13.7466 23.5866 12.9066 23.5866 12.3866 23.0666C11.8799 22.5466 11.8666 21.6933 12.3866 21.1733Z" fill="#777777" />
                                        </svg>
                                    </button>}
                                    
                                </>
                                
                            )
                        }
                        else if ((windowSize.width > styleSheet.breakPointForSlider || (windowSize.width <= styleSheet.breakPointForSlider )) && index < slides.length - 1)
                        {
                            return(
                                <>
                                {hasNext &&
                                    <button className="next-btn-inimage"  id="next-btn-inimage" onClick={(e) => {showArrowsStop(); next(); e.preventDefault(); e.stopPropagation();}}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                                            <path d="M12.3866 21.1733L17.5599 16L12.3866 10.8266C11.8666 10.3066 11.8666 9.46664 12.3866 8.94664C12.9066 8.42664 13.7466 8.42664 14.2666 8.94664L20.3866 15.0666C20.9066 15.5866 20.9066 16.4266 20.3866 16.9466L14.2666 23.0666C13.7466 23.5866 12.9066 23.5866 12.3866 23.0666C11.8799 22.5466 11.8666 21.6933 12.3866 21.1733Z" fill="#777777" />
                                        </svg>
                                    </button>
                                }
                                </>
                            )
                        }

                    }
                }
                renderArrowPrev={
                    (previous,hasPrev) => {
                        if ((windowSize.width > styleSheet.breakPointForSlider || (windowSize.width <= styleSheet.breakPointForSlider) && !hideArrow) && index > 0) 
                        {
                            return (
                                <>
                                   {hasPrev &&  
                                    <button className="previous-btn" onClick={() => {showArrowsStop(); previous(); }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none" >
                                            <path d="M19.6134 21.1733L14.4401 16L19.6134 10.8266C20.1334 10.3066 20.1334 9.46664 19.6134 8.94664C19.0934 8.42664 18.2534 8.42664 17.7334 8.94664L11.6134 15.0666C11.0934 15.5866 11.0934 16.4266 11.6134 16.9466L17.7334 23.0666C18.2534 23.5866 19.0934 23.5866 19.6134 23.0666C20.1201 22.5466 20.1334 21.6933 19.6134 21.1733Z" fill="#777777" />
                                        </svg>
                                    </button>}
                                    {hasPrev && 
                                    <button className="previous-btn-inimage" onClick={() => {showArrowsStop(); previous();  }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none" >
                                            <path d="M19.6134 21.1733L14.4401 16L19.6134 10.8266C20.1334 10.3066 20.1334 9.46664 19.6134 8.94664C19.0934 8.42664 18.2534 8.42664 17.7334 8.94664L11.6134 15.0666C11.0934 15.5866 11.0934 16.4266 11.6134 16.9466L17.7334 23.0666C18.2534 23.5866 19.0934 23.5866 19.6134 23.0666C20.1201 22.5466 20.1334 21.6933 19.6134 21.1733Z" fill="#777777" />
                                        </svg>
                                    </button>}
                                </>
                            )
                        }
                        else if ((windowSize.width > styleSheet.breakPointForSlider || (windowSize.width <= styleSheet.breakPointForSlider )) && index > 0)
                        {
                            return (
                                <>
                                    {hasPrev && 
                                    <button className="previous-btn-inimage" onClick={() => { previous(); showArrowsStop(); }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none" >
                                            <path d="M19.6134 21.1733L14.4401 16L19.6134 10.8266C20.1334 10.3066 20.1334 9.46664 19.6134 8.94664C19.0934 8.42664 18.2534 8.42664 17.7334 8.94664L11.6134 15.0666C11.0934 15.5866 11.0934 16.4266 11.6134 16.9466L17.7334 23.0666C18.2534 23.5866 19.0934 23.5866 19.6134 23.0666C20.1201 22.5466 20.1334 21.6933 19.6134 21.1733Z" fill="#777777" />
                                        </svg>
                                    </button>
                                    }
                                </>
                            )
                        }

                    }
                }

                onClickItem={
                    () => { }
                }
                // preventMovementUntilSwipeScrollTolerance={false}
                // swipeScrollTolerance={false}
                showArrows={true}
                showThumbs={false}
                interval={10000000}
                stopOnHover={false}
                autoPlay={false}
                showStatus={false}

            >
                {slides && slides.length > 0 &&
                    slides.map((data, index) => {
                        return data.slide_type == "Media" ? <ImageComponent  key={index} image={data.media} hasRead={Props.hasRead}/>
                            :
                            <InStoryQuiz onClick={(option) => {
                                Props.onClick(option, data, index);

                            }}
                                key={index}
                                windowSize={windowSize}
                                data={data} />
                    })
                }
            </Carousel>
            
        </div>
    );
}
export default Slider;

//---------------------------demo-----------------------------
{/* <Slider 

    data={slides}
 /> */}
// const slides =[
//     {
//         "uuid": "626d10d4-ec9d-49bb-acc7-87bd8ab04cdd",
//         "title": "Ever Wondered How A QR Code Generates Movie Tickets?-0",
//         "media": "https://summachar-school-backend-test.s3.amazonaws.com/media/story/Ever_Wondered_How_A_QR_Code_Generates_Movie_Tickets-0.jpg",
//         "categories": {},
//         "grade_range": "{\"bounds\": \"()\", \"lower\": null, \"upper\": null}",
//         "slide_type": "Media"
//     },
//     {
//         "uuid": "cf54a94a-afd9-447c-94ee-c653dd6ff6e6",
//         "title": "Ever Wondered How A QR Code Generates Movie Tickets?-1",
//         "media": "https://summachar-school-backend-test.s3.amazonaws.com/media/story/Ever_Wondered_How_A_QR_Code_Generates_Movie_Tickets-1.jpg",
//         "categories": {},
//         "grade_range": "{\"bounds\": \"()\", \"lower\": null, \"upper\": null}",
//         "slide_type": "Media"
//     },
//     {
//         "uuid": "7a746969-edd1-4c01-bddc-69b8db63eb1e",
//         "text": "Which of the following term defines a company which is controlled by a holding (larger) company?",
//         "answer": "Subsidiary",
//         "media": null,
//         "question_type": "MCQ",
//         "explanation": "",
//         "options": [
//             "Liability",
//             "Subsidiary",
//             "Parent Company"
//         ],
//         "options_count": [
//             0,
//             1,
//             0
//         ],
//         "time_per_question": 20,
//         "points_per_question": 10,
//         "categories": {},
//         "attempt": {
//             "attempt_answer": "Subsidiary",
//             "user_points": "10.00",
//             "is_correct": true,
//             "attempt_time": 0,
//             "attempt_file": null
//         },
//         "grade_range": "{\"bounds\": \"()\", \"lower\": null, \"upper\": null}",
//         "option1": "Liability",
//         "option2": "Subsidiary",
//         "option3": "Parent Company",
//         "option4": null,
//         "slide_type": "Question"
//     },
//     {
//         "uuid": "18140e71-5d7b-4967-87da-58afe6cb57d4",
//         "title": "Ever Wondered How A QR Code Generates Movie Tickets?-2",
//         "media": "https://summachar-school-backend-test.s3.amazonaws.com/media/story/Ever_Wondered_How_A_QR_Code_Generates_Movie_Tickets-2.jpg",
//         "categories": {},
//         "grade_range": "{\"bounds\": \"()\", \"lower\": null, \"upper\": null}",
//         "slide_type": "Media"
//     },
//     {
//         "uuid": "a0f94c68-6b78-4c73-b91b-5be00edffde9",
//         "title": "Ever Wondered How A QR Code Generates Movie Tickets?-3",
//         "media": "https://summachar-school-backend-test.s3.amazonaws.com/media/story/Ever_Wondered_How_A_QR_Code_Generates_Movie_Tickets-3.jpg",
//         "categories": {},
//         "grade_range": "{\"bounds\": \"()\", \"lower\": null, \"upper\": null}",
//         "slide_type": "Media"
//     },
//     {
//         "uuid": "cbbc6829-0411-4e76-950f-d6da937ce112",
//         "title": "Ever Wondered How A QR Code Generates Movie Tickets?-4",
//         "media": "https://summachar-school-backend-test.s3.amazonaws.com/media/story/Ever_Wondered_How_A_QR_Code_Generates_Movie_Tickets-4.jpg",
//         "categories": {},
//         "grade_range": "{\"bounds\": \"()\", \"lower\": null, \"upper\": null}",
//         "slide_type": "Media"
//     },
//     {
//         "uuid": "7598516e-d46a-47db-8b3f-95f99406b5b5",
//         "title": "Ever Wondered How A QR Code Generates Movie Tickets?-5",
//         "media": "https://summachar-school-backend-test.s3.amazonaws.com/media/story/Ever_Wondered_How_A_QR_Code_Generates_Movie_Tickets-5.jpg",
//         "categories": {},
//         "grade_range": "{\"bounds\": \"()\", \"lower\": null, \"upper\": null}",
//         "slide_type": "Media"
//     },
//     {
//         "uuid": "dac4ef2d-bf64-4766-9ffc-bc6cdc13959c",
//         "title": "Ever Wondered How A QR Code Generates Movie Tickets?-6",
//         "media": "https://summachar-school-backend-test.s3.amazonaws.com/media/story/Ever_Wondered_How_A_QR_Code_Generates_Movie_Tickets-6.jpg",
//         "categories": {},
//         "grade_range": "{\"bounds\": \"()\", \"lower\": null, \"upper\": null}",
//         "slide_type": "Media"
//     },
//     {
//         "uuid": "b5ba4cf2-c4e5-4847-9714-b14160c62bc8",
//         "text": "Which of the following companies is not Japanese?",
//         "answer": "Hyundai",
//         "media": null,
//         "question_type": "MCQ",
//         "explanation": "",
//         "options": [
//             "Hyundai",
//             "Toyota",
//             "Honda"
//         ],
//         "options_count": [
//             0,
//             0,
//             1
//         ],
//         "time_per_question": 20,
//         "points_per_question": 10,
//         "categories": {},
//         "attempt": {
//             "attempt_answer": "Honda",
//             "user_points": "0.00",
//             "is_correct": false,
//             "attempt_time": 0,
//             "attempt_file": null
//         },
//         "grade_range": "{\"bounds\": \"()\", \"lower\": null, \"upper\": null}",
//         "option1": "Hyundai",
//         "option2": "Toyota",
//         "option3": "Honda",
//         "option4": null,
//         "slide_type": "Question"
//     },
//     {
//         "uuid": "0e47631f-fe36-473d-ba4b-f4c77ddec2ed",
//         "title": "Ever Wondered How A QR Code Generates Movie Tickets?-7",
//         "media": "https://summachar-school-backend-test.s3.amazonaws.com/media/story/Ever_Wondered_How_A_QR_Code_Generates_Movie_Tickets-7.jpg",
//         "categories": {},
//         "grade_range": "{\"bounds\": \"()\", \"lower\": null, \"upper\": null}",
//         "slide_type": "Media"
//     },
//     {
//         "uuid": "81bbb950-ec58-4e8f-85f9-7ed29781eb05",
//         "title": "Ever Wondered How A QR Code Generates Movie Tickets?-8",
//         "media": "https://summachar-school-backend-test.s3.amazonaws.com/media/story/Ever_Wondered_How_A_QR_Code_Generates_Movie_Tickets-8.jpg",
//         "categories": {},
//         "grade_range": "{\"bounds\": \"()\", \"lower\": null, \"upper\": null}",
//         "slide_type": "Media"
//     },
//     {
//         "uuid": "21fb2392-68fa-4188-8dea-efcbb1197ef5",
//         "title": "Ever Wondered How A QR Code Generates Movie Tickets?-9",
//         "media": "https://summachar-school-backend-test.s3.amazonaws.com/media/story/Ever_Wondered_How_A_QR_Code_Generates_Movie_Tickets-9.jpg",
//         "categories": {},
//         "grade_range": "{\"bounds\": \"()\", \"lower\": null, \"upper\": null}",
//         "slide_type": "Media"
//     },
//     {
//         "uuid": "a9b0f65d-8667-4e38-aac0-d835ef4570d7",
//         "title": "Ever Wondered How A QR Code Generates Movie Tickets?-10",
//         "media": "https://summachar-school-backend-test.s3.amazonaws.com/media/story/Ever_Wondered_How_A_QR_Code_Generates_Movie_Tickets-10.jpg",
//         "categories": {},
//         "grade_range": "{\"bounds\": \"()\", \"lower\": null, \"upper\": null}",
//         "slide_type": "Media"
//     },
//     {
//         "uuid": "3403d8e6-b420-4ff1-98dd-9bfe4d109c25",
//         "title": "Ever Wondered How A QR Code Generates Movie Tickets?-11",
//         "media": "https://summachar-school-backend-test.s3.amazonaws.com/media/story/Ever_Wondered_How_A_QR_Code_Generates_Movie_Tickets-11.jpg",
//         "categories": {},
//         "grade_range": "{\"bounds\": \"()\", \"lower\": null, \"upper\": null}",
//         "slide_type": "Media"
//     },
//     {
//         "uuid": "0f15a5a9-1a96-4879-ae91-0729801cb8fc",
//         "title": "Ever Wondered How A QR Code Generates Movie Tickets?-12",
//         "media": "https://summachar-school-backend-test.s3.amazonaws.com/media/story/Ever_Wondered_How_A_QR_Code_Generates_Movie_Tickets-12.jpg",
//         "categories": {},
//         "grade_range": "{\"bounds\": \"()\", \"lower\": null, \"upper\": null}",
//         "slide_type": "Media"
//     },
//     {
//         "uuid": "b4e62e96-fb4e-4ff0-8e6f-151f13e1e8a0",
//         "title": "Ever Wondered How A QR Code Generates Movie Tickets?-13",
//         "media": "https://summachar-school-backend-test.s3.amazonaws.com/media/story/Ever_Wondered_How_A_QR_Code_Generates_Movie_Tickets-13.jpg",
//         "categories": {},
//         "grade_range": "{\"bounds\": \"()\", \"lower\": null, \"upper\": null}",
//         "slide_type": "Media"
//     },
//     {
//         "uuid": "dc2cc736-a838-47cb-b04f-477533f52d26",
//         "text": "Which Indian company first introduced QR code payment?",
//         "answer": "Paytm",
//         "media": null,
//         "question_type": "MCQ",
//         "explanation": "",
//         "options": [
//             "PhonePe",
//             "Paytm",
//             "Jio Payments"
//         ],
//         "options_count": [
//             0,
//             0,
//             0
//         ],
//         "time_per_question": 20,
//         "points_per_question": 10,
//         "categories": {},
//         "attempt": {},
//         "grade_range": "{\"bounds\": \"()\", \"lower\": null, \"upper\": null}",
//         "option1": "PhonePe",
//         "option2": "Paytm",
//         "option3": "Jio Payments",
//         "option4": null,
//         "slide_type": "Question"
//     }
// ]